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
import FormCancel from '~/components/Form/FormCancel';
import { convertStatusOrderCode, formatMoney } from '~/utils';

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
    const [showPopupCmt, setShowPopupCmt] = useState(false);
    const [showPopupCancel, setShowPopupCancel] = useState(false);
    const [productCmt, setProductCmt] = useState([]);
    const [order, setOrder] = useState({});

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

    const handleShowPopupComment = (order) => {
        setProductCmt(order.products);
        setShowPopupCmt(true);
    };

    const handleShowPopupCancel = (order) => {
        setOrder(order);
        setShowPopupCancel(true);
    };

    const getCancelBy = (params) => {
        if (params && params.isCancel) {
            return 'H???y b???i b???n';
        } else if (params && params.isCancelByAdmin) {
            return 'H???y b???i h??? th???ng';
        }
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
                    <span onClick={() => setFilter('')}>T???t c???</span>
                </div>
                <div className={cx('header-item', filter === PENDING && 'active')}>
                    <span onClick={() => setFilter(PENDING)}>Ch??? duy???t</span>
                </div>
                <div className={cx('header-item', filter === DELIVERING && 'active')}>
                    <span onClick={() => setFilter(DELIVERING)}>??ang giao</span>
                </div>
                <div className={cx('header-item', filter === SUCCESSFUL && 'active')}>
                    <span onClick={() => setFilter(SUCCESSFUL)}>Ho??n th??nh</span>
                </div>
                <div className={cx('header-item', filter === CANCEL && 'active')}>
                    <span onClick={() => setFilter(CANCEL)}>???? h???y</span>
                </div>
            </div>

            {ordersFiltered.length > 0 ? (
                <>
                    {/* search */}
                    <div className={cx('search-swap')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        <input type="text" placeholder="Nh???p t??n s???n ph???m ????? t??m ki???m" className={cx('search-input')} />
                    </div>

                    {/* cart item */}
                    {ordersFiltered.map((order, index) => (
                        <div className={cx('item-top-container')} key={index}>
                            <div className={cx('cart', 'item-top-swap')}>
                                <div className={cx('top-header')}>
                                    <span>{convertStatusOrderCode(order.status)}</span>
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
                                                    Ph??n lo???i h??ng: {getTypeProduct(product)}
                                                </div>
                                                <div className={cx('item-info_quantity')}>x{product.quantity}</div>
                                            </div>
                                            <div className={cx('item-price')}>
                                                {product.discount > 0 ? (
                                                    <>
                                                        <div className={cx('item-price_old')}>
                                                            {formatMoney(product.priceBeforeDiscount)}
                                                        </div>
                                                        <div className={cx('item-price_new')}>
                                                            {formatMoney(product.price)}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className={cx('item-price_new')}>
                                                        {formatMoney(product.priceBeforeDiscount)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('cart', 'item-bottom-swap')}>
                                <div className={cx('bottom-header')}>
                                    <div className={cx('bottom-header_label')}>Th??nh ti???n:</div>
                                    <div className={cx('bottom-header_total')}>{formatMoney(order.totalAmount)}</div>
                                </div>
                                <div className={cx('bottom-main')}>
                                    <div className={cx('bottom-control-status')}>{getCancelBy(order.params)}</div>
                                    <div className={cx('bottom-control-group')}>
                                        {order.status === SUCCESSFUL && (
                                            <Button primary className={cx('bottom-control-group_btnRebuy')}
                                                onClick={() => handleShowPopupComment(order)}>
                                                ????nh gi??
                                            </Button>
                                        )}

                                        {order.status === PENDING && (
                                            <Button
                                                primary
                                                className={cx('bottom-control-group_btnRebuy')}
                                                onClick={() => handleShowPopupCancel(order)}
                                            >
                                                H???y ????n h??ng
                                            </Button>
                                        )}
                                        {/* <Button primary>Mua l???i</Button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <div className={cx('cart', 'bs-t', 'cart-empty-swap')}>
                    <img src={images.emptyCart} alt="images" className={cx('cart-empty-swap_logo')} />
                    <div className={cx('cart-empty-swap_text')}>Ch??a c?? ????n h??ng</div>
                </div>
            )}
            <Popup
                FormComponent={<FormComment handleClose={() => setShowPopupCmt(false)} products={productCmt} />}
                isShow={showPopupCmt}
            />
            <Popup
                FormComponent={
                    <FormCancel handleClose={() => setShowPopupCancel(false)} order={order} fetchData={getAllOrder} />
                }
                isShow={showPopupCancel}
            />
        </div>
    );
}

export default Purchase;
