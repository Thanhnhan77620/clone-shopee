//react component
import { useNavigate, useSearchParams } from 'react-router-dom';
import classsname from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faLocationDot } from '@fortawesome/free-solid-svg-icons';

//custom component
import Button from '~/components/Button';

//service
import * as paymentService from '~/services/paymentService';

//style
import style from './Checkout.model.scss';
import { toastError, toastInfo } from '~/assets/js/toast-message';
const cx = classsname.bind(style);

function Checkout() {
    const widths = ['45%', '35%', '10%', '20%', '10%'];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const cartForPayments = JSON.parse(window.atob(searchParams.get('state')));

    const productClassification = (cart) => {
        const arr = [];
        const { tierModel, discount } = cart.product;
        arr.push(`${discount}%`);
        tierModel.forEach((item) => arr.push(item.currentModel.name));
        return arr.join(', ');
    };

    const sum = () => {
        return cartForPayments.reduce(function (acc, cur) {
            return acc + cur.product.price * cur.product.quantity;
        }, 0);
    };

    const payment = () => {
        const body = {
            totalAmount: sum(),
            products: [],
            address: 1,
            note: 'note',
        };
        cartForPayments.forEach((item) => {
            const { id, discount, priceBeforeDiscount, quantity, tierModel } = item.product;
            const product = {
                productId: id,
                discount,
                priceBeforeDiscount,
                quantity,
                tierModels: [],
            };

            tierModel.forEach((item) => {
                const tierModel = {
                    tierModelId: item.id,
                    modelId: item.currentModel.id,
                };
                product.tierModels.push(tierModel);
            });

            body.products.push(product);
        });
        Promise.resolve(paymentService.paymentByMomo(body)).then((res) => {
            if (res.status === 201) {
                window.open(res.data);
            } else {
                toastError(res.errors.message);
            }
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('card-swap', 'card-address-swap')}>
                <div className={cx('card-address-swap_header')}>
                    <div className={cx('header-logo')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className={cx('header-title')}>Địa Chỉ Nhận Hàng</div>
                </div>

                <div className={cx('card-address-swap_content')}>
                    <div className={cx('content-info')}>
                        Nguyễn Tấn Quốc Khánh <br />
                        (+84) 363677492
                    </div>

                    <div className={cx('content-location')}>
                        <div className={cx('content-location_detail')}>
                            Fpt Software Hồ Chí Minh, lô t2, Đường D 1, Khu Cnc Quận 9, Phường Tân Phú, Thành Phố Thủ
                            Đức, TP. Hồ Chí Minh
                        </div>
                        <div className={cx('content-location_default')}>
                            <span>Mặc Định</span>
                        </div>
                    </div>

                    <div className={cx('content-action')}>
                        <span>Thay đổi</span>
                    </div>
                </div>
            </div>

            <div className={cx('card-swap', 'card-main-swap')}>
                <div className={cx('card-main-swap_header')}>
                    <div className={cx('header-name')} style={{ width: widths[0] }}>
                        Sản phẩm
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[1] }}></div>
                    <div className={cx('header-item')} style={{ width: widths[2], textAlign: 'right' }}>
                        Đơn giá
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[3], textAlign: 'center' }}>
                        Số lương
                    </div>
                    <div className={cx('header-item')} style={{ width: widths[4], textAlign: 'right' }}>
                        Thành tiền
                    </div>
                </div>

                <div className={cx('card-main-container')}>
                    {cartForPayments.map((item, index) => (
                        <div key={index} className={cx('card-main-swap_content')}>
                            <div className={cx('content-info')} style={{ width: widths[0] }}>
                                <div className={cx('content-info_img')}>
                                    <img
                                        src="https://cf.shopee.vn/file/sg-11134201-22110-e3njur9xh9jv80_tn"
                                        alt="images"
                                        width={50}
                                    />
                                </div>
                                <div className={cx('content-info_name')}>{item.product.name}</div>
                            </div>
                            <div className={cx('content-model')} style={{ width: widths[1] }}>
                                Loại: {productClassification(item)}
                            </div>
                            <div className={cx('content-price')} style={{ width: widths[2], textAlign: 'right' }}>
                                ₫{item.product.price}
                            </div>
                            <div className={cx('content-quantity')} style={{ width: widths[3], textAlign: 'center' }}>
                                {item.product.quantity}
                            </div>
                            <div className={cx('content-total')} style={{ width: widths[4], textAlign: 'right' }}>
                                ₫{item.product.price * item.product.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cx('card-swap', 'card-payment-swap')}>
                <div className={cx('card-payment-swap_header')}>
                    <div className={cx('header-title')}>Phương thức thanh toán</div>
                    <div className={cx('group-color-list')}>
                        <Button
                            normal
                            border
                            className={cx('group-color-list__item', 'active')}
                            // onClick={() => handleSelectModel(item.name, model)}
                        >
                            Ví MoMo
                            <div className={cx('group-color-list__item--tick')}>
                                <FontAwesomeIcon icon={faCheck} className={cx('group-color-list__item-icon')} />
                            </div>
                        </Button>
                        <Button
                            normal
                            border
                            className={cx('group-color-list__item')}
                            // onClick={() => handleSelectModel(item.name, model)}
                        >
                            Thanh toán khi nhận Hàng
                            {/* <div className={cx('group-color-list__item--tick')}>
                                <FontAwesomeIcon icon={faCheck} className={cx('group-color-list__item-icon')} />
                            </div> */}
                        </Button>
                    </div>
                </div>

                <div className={cx('card-payment-swap_main')}>
                    <div className={cx('main-detail')}>
                        <div style={{ flex: 1 }}></div>
                        <div className={cx('main-detail_label')} style={{ width: '15%' }}>
                            Tổng tiền hàng
                        </div>
                        <div className={cx('main-detail_total')} style={{ width: '20%', textAlign: 'right' }}>
                            ₫{sum()}
                        </div>
                    </div>
                    <div className={cx('main-detail')}>
                        <div style={{ flex: 1 }}></div>
                        <div className={cx('main-detail_label')} style={{ width: '15%' }}>
                            Tổng thanh toán:
                        </div>
                        <div className={cx('main-detail_total', 'final')} style={{ width: '20%', textAlign: 'right' }}>
                            ₫{sum()}
                        </div>
                    </div>
                </div>
                <div className={cx('card-payment-swap_footer')}>
                    <div className={cx('footer_policy')}>
                        Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo mọi điều khoản
                    </div>

                    <Button primary large className={cx('footer_btn')} onClick={payment}>
                        Đặt hàng
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
