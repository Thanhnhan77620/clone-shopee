//react component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

//custom component
import Button from '~/components/Button';
import images from '~/assets/images';
import { PENDING, CANCEL, DELIVERING, SUCCESSFUL } from '~/commons';
import { toastError } from '~/assets/js/toast-message';
import Popup from '~/components/Popup';
import FormComment from '~/components/Form/FormComment';

//service
import * as orderService from '~/services/orderService';

//style
import style from './Purchase.module.scss';
const cx = classnames.bind(style);

function Purchase() {
    // const { orders } = useSelector((state) => state.order);
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('');
    const [ordersFiltered, setOrdersFiltered] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const getAllOrder = async () => {
        const req = await orderService.getAll();
        if (req.status === 200) {
            setOrders(req.data.data);
        } else {
            toastError(req.errors.message);
        }
    };

    const filterOrder = () => {
        setOrdersFiltered((prev) => {
            if (filter) {
                return orders.filter((item) => item.status === filter);
            } else {
                return orders;
            }
        });
    };

    const getTypeProduct = (product) => {
        const { discount, params } = product;
        const tierModelString = [];
        if (discount) {
            tierModelString.push(`${discount}%`);
        }
        params.tierModels.forEach((model) => {
            tierModelString.push(model.modelName);
        });
        return tierModelString.join(', ');
    };

    useEffect(() => {
        filterOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, orders]);

    useEffect(() => {
        getAllOrder();
    }, []);

    return (
        <div>
            {/* header */}
            <div className={cx('cart', 'bs-t', 'header')}>
                <div className={cx('header-item', filter === '' && 'active')}>
                    <span onClick={() => setFilter('')}>Tất cả</span>
                </div>
                <div className={cx('header-item', filter === PENDING && 'active')}>
                    <span onClick={() => setFilter(PENDING)}>Chờ duyệt</span>
                </div>
                <div className={cx('header-item', filter === DELIVERING && 'active')}>
                    <span onClick={() => setFilter(DELIVERING)}>Đang giao</span>
                </div>
                <div className={cx('header-item', filter === SUCCESSFUL && 'active')}>
                    <span onClick={() => setFilter(SUCCESSFUL)}>Hoàn thành</span>
                </div>
                <div className={cx('header-item', filter === CANCEL && 'active')}>
                    <span onClick={() => setFilter(CANCEL)}>Đã hủy</span>
                </div>
            </div>

            {ordersFiltered.length > 0 ? (
                <>
                    {/* search */}
                    <div className={cx('search-swap')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        <input type="text" placeholder="Nhập tên sản phẩm để tìm kiếm" className={cx('search-input')} />
                    </div>

                    {/* cart item */}
                    {ordersFiltered.map((order, index) => (
                        <div className={cx('item-top-container')} key={index}>
                            <div className={cx('cart', 'item-top-swap')}>
                                <div className={cx('top-header')}>
                                    <span>{order.status}</span>
                                </div>
                                <div className={cx('top-main')}>
                                    {order.products.map((product, index) => (
                                        <div className={cx('top-main-item')} key={index}>
                                            <div
                                                className={cx('item-img')}
                                                style={{ backgroundImage: `url(${product.params.imagePath})` }}
                                            ></div>
                                            <div className={cx('item-info')}>
                                                <div className={cx('item-info_name')}>{product.params.productName}</div>
                                                <div className={cx('item-info_type')}>
                                                    Phân loại hàng: {getTypeProduct(product)}
                                                </div>
                                                <div className={cx('item-info_quantity')}>x{product.quantity}</div>
                                            </div>
                                            <div className={cx('item-price')}>
                                                {product.discount > 0 ? (
                                                    <>
                                                        <div className={cx('item-price_old')}>
                                                            đ{product.priceBeforeDiscount}
                                                        </div>
                                                        <div className={cx('item-price_new')}>đ{product.price}</div>
                                                    </>
                                                ) : (
                                                    <div className={cx('item-price_new')}>
                                                        đ{product.priceBeforeDiscount}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('cart', 'item-bottom-swap')}>
                                <div className={cx('bottom-header')}>
                                    <div className={cx('bottom-header_label')}>Thành tiền:</div>
                                    <div className={cx('bottom-header_total')}>đ{order.totalAmount}</div>
                                </div>
                                <div className={cx('bottom-main')}>
                                    <div className={cx('bottom-control-status')}>Đã hủy bởi bạn</div>
                                    <div className={cx('bottom-control-group')}>
                                        {order.status === SUCCESSFUL && (
                                            <Button primary className={cx('bottom-control-group_btnRebuy')}>
                                                Đánh giá
                                            </Button>
                                        )}

                                        <Button
                                            primary
                                            className={cx('bottom-control-group_btnRebuy')}
                                            onClick={() => setShowPopup(true)}
                                        >
                                            Đánh giá
                                        </Button>

                                        {order.status === PENDING && (
                                            <Button primary className={cx('bottom-control-group_btnRebuy')}>
                                                Hủy đơn hàng
                                            </Button>
                                        )}
                                        <Button primary>Mua lại</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className={cx('cart', 'bs-t', 'cart-empty-swap')}>
                    <img src={images.emptyCart} alt="images" className={cx('cart-empty-swap_logo')} />
                    <div className={cx('cart-empty-swap_text')}>Chưa có đơn hàng</div>
                </div>
            )}
            <Popup FormComponent={<FormComment handleClose={() => setShowPopup(false)} />} isShow={showPopup} />
        </div>
    );
}

export default Purchase;
