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
import { useEffect, useRef } from 'react';

import styles from './ProductDetail.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import Button from '~/components/Button';
import ProductItem from '~/components/Product/ProductItem';
import FilterComment from '~/components/FilterComment';
import RatingStar from '~/components/RatingStar';
import video from '~/assets/videos/video.mp4';
import Carousel from '~/components/Carousel';
import * as bannerService from '~/services/bannerService';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

//service
import * as productService from '~/services/productService';

const cx = classnames.bind(styles);
function ProductDetail(props) {
    const { id } = useParams();
    const [productDetail, setProductDetail] = useState({});

    const listImage = 'https://cf.shopee.vn/file/3d6a3b229e348c5c78baddac823666ce';
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

    const videoEl = useRef(null);

    useEffect(() => {
        const attemptPlay = () => {
            videoEl &&
                videoEl.current &&
                videoEl.current.play().catch((error) => {
                    console.error('Error attempting to play', error);
                });
        };

        const getProductById = async () => {
            const productDetail = await productService.getProductById(id);
            if (productDetail.status === 200) {
                setProductDetail(productDetail.data.data);
            }
        };

        getProductById();

        attemptPlay();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app__container">
            <div className="grid app__content">
                <Breadcrumb />
                {/* Product info */}
                <div className={cx('card-layout', 'product-info-swapper')}>
                    <div className={cx('product-info-left')}>
                        {/* <img src={listImage} alt="images" className={cx('left-image')} /> */}
                        {/* <video
                            className={cx('left-image')}
                            playsInline
                            loop
                            muted
                            controls
                            alt="All the devices"
                            src={video}
                            ref={videoEl}
                        />
                        <div className={cx('left-image-list-swapper')}>
                            <ul className={cx('left-image-list')}>
                                <video
                                    className={cx('left-image-list__item', 'left-image-list__item--active')}
                                    alt="All the devices"
                                    src={video}
                                />
                                {items.map((item) => (
                                    <img
                                        key={item.id}
                                        src={item.imageURL}
                                        alt="images"
                                        className={cx('left-image-list__item')}
                                    />
                                ))}
                            </ul>

                            <div className={cx('arrow-btn', 'arrow-btn__left')}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                            </div>
                            <div className={cx('arrow-btn', 'arrow-btn__right')}>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </div> */}
                        <Carousel items={items} defaultItems={5} />

                        {/* Like icon */}
                        <div className={cx('left-like')}>
                            <div className={cx('left-like__icon')}>
                                <FontAwesomeIcon icon={faHeart} className={cx('fill')} />
                            </div>
                            <div className={cx('left-like__text')}>Đã thích (1,7k)</div>
                        </div>
                    </div>
                    <div className={cx('product-info-right')}>
                        <div className={cx('title')}>
                            Giá đỡ Laptop , Giá kê MacBook , Ultrabook chất liệu bằng nhôm điều chỉnh độ cao , chống mỏi
                            cổ, dễ gấp gọn
                        </div>
                        <div className={cx('group-rating-vote')}>
                            <div className={cx('rating')}>
                                <div className={cx('rating__score')}>3.6</div>
                                <RatingStar score={3.6} colorFill="red" />{' '}
                            </div>
                            <div className={cx('vote', 'separate')}>
                                <span className={cx('quantity')}>1.4K</span>
                                <span className={cx('text')}> Đánh giá</span>
                            </div>
                            <div className={cx('vote', 'separate')}>
                                <span className={cx('quantity')}>1.4K</span>
                                <span className={cx('text')}> Đã bán</span>
                            </div>
                        </div>
                        <div className={cx('group-price-swapper')}>
                            <div className={cx('group-price')}>
                                <div className={cx('group-price__old')}>₫129.000 - ₫349.000</div>
                                <div className={cx('group-price__new')}>₫64.500 - ₫179.400</div>
                                <div className={cx('group-price__sale')}>50% GIẢM</div>
                            </div>
                        </div>
                        <div className={cx('group-color-swapper')}>
                            <label className={cx('group-color-label')}>Màu Sắc</label>
                            <div className={cx('group-color-list')}>
                                <Button normal border className={cx('group-color-list__item', 'active')}>
                                    Bạc (N3 Ver 1)
                                    <div className={cx('group-color-list__item--tick')}>
                                        <FontAwesomeIcon icon={faCheck} className={cx('group-color-list__item-icon')} />
                                    </div>
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1) Bạc (N3 Ver 1)
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1)
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1)
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1)
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1) Bạc (N3 Ver 1)
                                </Button>
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1)
                                </Button>{' '}
                                <Button normal border className={cx('group-color-list__item')}>
                                    Bạc (N3 Ver 1) Bạc (N3 Ver 1)
                                </Button>
                            </div>
                        </div>
                        <div className={cx('group-quantity-swapper')}>
                            <div className={cx('group-quantity-label')}>Số Lượng</div>
                            <div className={cx('group-quantity-select')}>
                                <button className={cx('group-quantity-select__btn', 'group-quantity-select__btn-left')}>
                                    <FontAwesomeIcon icon={faSubtract} />
                                </button>
                                <input type="text" className={cx('group-quantity-select__input')} defaultValue={2} />
                                <button
                                    className={cx('group-quantity-select__btn', 'group-quantity-select__btn-right')}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>
                            <span className={cx('item-available')}>77 sản phẩm có sẵn</span>
                        </div>

                        <div className={cx('group-btn-swapper')}>
                            <Button
                                large
                                leftIcon={<FontAwesomeIcon icon={faCartPlus} className={cx('group-btn__icon')} />}
                                className={cx('group-btn')}
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
