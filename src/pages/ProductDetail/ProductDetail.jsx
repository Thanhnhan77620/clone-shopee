//react component
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {
    faHeart,
    faAngleRight,
    faAngleLeft,
    faCartPlus,
    faCheck,
    faPlus,
    faSubtract,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//custom component
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import ProductItem from '~/components/Product/ProductItem';
import FilterComment from '~/components/FilterComment';
import RatingStar from '~/components/RatingStar';
import video from '~/assets/videos/video.mp4';
import CarouselCustom from '~/components/Carousel';
import images from '~/assets/images';
import { toastError, toastInfo, toastSuccess } from '~/assets/js/toast-message';

//service
import * as productService from '~/services/productService';
import * as bannerService from '~/services/bannerService';
import * as cartService from '~/services/cartService';

//slice
import { addItem, getAll } from '~/slices/cartSlice';

//style
import styles from './ProductDetail.module.scss';

const cx = classnames.bind(styles);
function ProductDetail(props) {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});
    const [currentModelSelect, setCurrentModelSelect] = useState('');
    const [modelCart, setModelCart] = useState({});
    const videoEl = useRef(null);

    const isParams = () => {
        if (Object.keys(productDetail).length && Object.keys(productDetail.params).length) {
            return true;
        }
        return false;
    };

    const listImage = 'https://play-ws.vod.shopee.com/c3/98934353/103/A3oxOAihAOwQjfgIER0FACc.mp4';
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({ id: i, label: 'Danh mụcdassssssssssssssads', content: 'Lenovo' });
    }

    const items = [];
    items.push({
        id: 0,
        name: 'Balo nam nữ giá rẻ, thời trang đi học nhiều ngăn siêu nhẹ phong cách ulzzang, đẹp đựng laptop ULZ015',
        imageURL: 'https://play-ws.vod.shopee.com/c3/98934353/103/A3oxOAihAOwQjfgIER0FACc.mp4',
        price: 200000,
        sale: 20,
        sold: '12k', //12k
    });

    for (let i = 1; i < 7; i++) {
        items.push({
            id: i,
            name: 'Balo nam nữ giá rẻ, thời trang đi học nhiều ngăn siêu nhẹ phong cách ulzzang, đẹp đựng laptop ULZ015',
            imageURL: 'https://ecomerce-shoppe.herokuapp.com/api/v1/files/69f1c42e-7360-421a-ba6d-ec84b3ebde78.jpg',
            price: 200000,
            sale: 20,
            sold: '12k', //12k
        });
    }

    const checkSelect = (key, value) => {
        const model = modelCart.tierModel.find((a) => a.name === key);
        if (model.currentModel.id === value) {
            return 'active';
        }
        return '';
    };

    const handleSelectModel = (key, model) => {
        setModelCart((preState) => {
            const indexTierModel = preState.tierModel.findIndex((item) => item.name === key);
            const tierModel = preState.tierModel[indexTierModel];
            tierModel.currentModel = { id: model.id, name: model.name };
            preState.tierModel[indexTierModel] = tierModel;
            return { ...modelCart, tierModel: preState.tierModel };
        });
    };

    const likeProduct = async () => {
        const req = await productService.like(id);
    };

    const handleAddCart = async () => {
        const req = await cartService.create(modelCart);
        if (req.status === 201) {
            toastSuccess('Add Item Into Cart Successfully!');
            const req = await cartService.getAll();
            if (req.status === 201) {
                dispatch(getAll(req.data));
            }
        } else {
            toastError('Add Item Into Cart Fail!');
        }
    };

    useEffect(() => {
        const attemptPlay = () => {
            videoEl &&
                videoEl.current &&
                videoEl.current.play().catch((error) => {
                    console.error('Error attempting to play', error);
                });
        };

        const getProductById = async () => {
            const req = await productService.getProductById(id);
            if (req.status === 200) {
                setProductDetail(req.data);
                setCurrentModelSelect(req.data.image.path);

                const { id, name, image, price, priceBeforeDiscount, tierModels, discount } = req.data;
                const product = { id, name, imagePath: image.path, price, priceBeforeDiscount, discount, quantity: 1 };
                var tierModel = [];
                if (tierModels && tierModels.length) {
                    tierModels.forEach((item, index) => {
                        const { id, name, models } = item;
                        tierModel.push({
                            id,
                            name,
                            currentModel: { id: models[0].id, name: models[0].name },
                        });
                    });
                }
                setModelCart({ product, tierModel });
            }
        };

        getProductById();
        attemptPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="app__container">
            <div className="grid app__content">
                <Breadcrumb />
                {/* Product info */}
                <div className={cx('card-layout', 'product-info-swapper')}>
                    <div className={cx('product-info-left')}>
                        {Object.keys(productDetail).length && (
                            <CarouselCustom
                                items={productDetail.images}
                                keyMap="path"
                                currentThumb={0}
                                defaultItems={5}
                            />
                        )}
                        {/* Like icon */}
                        <div className={cx('left-like')} onClick={likeProduct}>
                            <div className={cx('left-like__icon')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('fill')} />
                            </div>
                            <div className={cx('left-like__text')}>Đã thích {productDetail.likedCount}</div>
                        </div>
                    </div>

                    <div className={cx('product-info-right')}>
                        <div className={cx('title')}>{productDetail.name}</div>
                        <div className={cx('group-rating-vote')}>
                            <div className={cx('rating')}>
                                {isParams() && (
                                    <div className={cx('rating__score')}> {productDetail.params.ratingAvg} </div>
                                )}

                                <RatingStar score={isParams() ? productDetail.params.ratingAvg : 0} colorFill="red" />
                            </div>
                            <div className={cx('vote', 'separate')}>
                                <span className={cx('quantity')}>
                                    {' '}
                                    {isParams() ? productDetail.params.reviewTotal : 0}
                                </span>
                                <span className={cx('text')}> Đánh giá</span>
                            </div>
                            <div className={cx('vote', 'separate')}>
                                <span className={cx('quantity')}>{productDetail.sold}</span>
                                <span className={cx('text')}> Đã bán</span>
                            </div>
                        </div>
                        <div className={cx('group-price-swapper')}>
                            <div className={cx('group-price')}>
                                {productDetail.discount && (
                                    <div className={cx('group-price__old')}>{productDetail.priceBeforeDiscount}₫</div>
                                )}

                                <div className={cx('group-price__new')}>{productDetail.price}₫</div>
                                {productDetail.discount && (
                                    <div className={cx('group-price__sale')}>{productDetail.discount}% GIẢM</div>
                                )}
                            </div>
                        </div>

                        {/* list tier model */}
                        {Object.keys(productDetail).length &&
                            Object.keys(productDetail.tierModels).length &&
                            productDetail.tierModels.map((item, index) => (
                                <div key={index} className={cx('group-color-swapper')}>
                                    <label className={cx('group-color-label')}>{item.name}</label>
                                    <div className={cx('group-color-list')}>
                                        {item.models.map((model, index) => (
                                            <Button
                                                key={index}
                                                normal
                                                border
                                                className={cx(
                                                    'group-color-list__item',
                                                    checkSelect(item.name, model.id),
                                                )}
                                                onClick={() => handleSelectModel(item.name, model)}
                                            >
                                                {model.name}
                                                {checkSelect(item.name, model.id) && (
                                                    <div className={cx('group-color-list__item--tick')}>
                                                        <FontAwesomeIcon
                                                            icon={faCheck}
                                                            className={cx('group-color-list__item-icon')}
                                                        />
                                                    </div>
                                                )}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                        <div className={cx('group-quantity-swapper')}>
                            <div className={cx('group-quantity-label')}>Số Lượng</div>
                            <div className={cx('group-quantity-select')}>
                                <button
                                    className={cx('group-quantity-select__btn', 'group-quantity-select__btn-left')}
                                    onClick={() => {
                                        if (modelCart.product.quantity > 1) {
                                            setModelCart((prevState) => {
                                                prevState.product.quantity = prevState.product.quantity - 1;
                                                return { ...modelCart, product: prevState.product };
                                            });
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSubtract} />
                                </button>
                                <input
                                    type="number"
                                    pattern="[0-9]"
                                    className={cx('group-quantity-select__input')}
                                    value={Object.keys(modelCart).length ? modelCart.product.quantity : 1}
                                    onChange={(e) => {
                                        if (+e.target.value) {
                                            setModelCart((prevState) => {
                                                prevState.product.quantity = +e.target.value;
                                                return { ...modelCart, product: prevState.product };
                                            });
                                        }
                                    }}
                                />
                                <button
                                    className={cx('group-quantity-select__btn', 'group-quantity-select__btn-right')}
                                    onClick={(e) => {
                                        if (modelCart.product.quantity < 100) {
                                            setModelCart((prevState) => {
                                                prevState.product.quantity = prevState.product.quantity + 1;
                                                return { ...modelCart, product: prevState.product };
                                            });
                                        }
                                    }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            {productDetail.stock ? (
                                <span className={cx('item-available')}>{productDetail.stock} sản phẩm có sẵn</span>
                            ) : (
                                <span className={cx('item-available')}>
                                    <img src={images.outOfStock} alt="images" width={60} />
                                </span>
                            )}
                        </div>

                        <div className={cx('group-btn-swapper')}>
                            <Button
                                large
                                leftIcon={<FontAwesomeIcon icon={faCartPlus} className={cx('group-btn__icon')} />}
                                className={cx('group-btn')}
                                onClick={handleAddCart}
                            >
                                <span>thêm vào giỏ hàng</span>
                            </Button>
                            <Button large primary>
                                Mua Ngay
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product detail content */}
                <div className={cx('product-detail-swapper')}>
                    <div className={cx('product-detail__left')}>
                        <div className="card-layout">
                            <div className={cx('product-detail__description')}>
                                <div className={cx('description-header')}>CHI TIẾT SẢN PHẨM</div>
                                <div className={cx('description-content')}>
                                    {data.map((item) => (
                                        <div key={item.id} className={cx('description-content__item')}>
                                            <div className={cx('item-label')}>{item.label}</div>
                                            <div className={cx('item-content')}>{item.content}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={cx('product-detail__description')}>
                                <div className={cx('description-header')}>MÔ TẢ SẢN PHẨM</div>
                                <div className={cx('description-content')}>MÔ TẢ SẢN PHẨM</div>
                            </div>
                        </div>

                        {/* filter rating comment */}
                        <FilterComment />
                    </div>
                    <div className={cx('product-detail__right')}>
                        <div className={cx('card-layout')}>
                            <div className={cx('card-layout-item')}>
                                <div className={cx('card-layout-header')}>Top Sản Phẩm Bán Chạy</div>
                                <div className={cx('card-layout-content')}>
                                    <div className={cx('card-layout-content__item-swapper')}>
                                        {/* {items.map((item) => (
                                            <ProductItem key={item.id} item={item} />
                                        ))} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
