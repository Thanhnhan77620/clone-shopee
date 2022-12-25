//react component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames/bind';

//custom component
import Button from '~/components/Button';
import images from '~/assets/images';

//style
import style from './Purchase.module.scss';
import { useSelector } from 'react-redux';
const cx = classnames.bind(style);

function Purchase(prps) {
    const arr = [1, 2, 3, 4];
    const { orders } = useSelector((state) => state.order);
    console.log(orders);
    return (
        <div>
            {/* header */}
            <div className={cx('cart', 'bs-t', 'header')}>
                <div className={cx('header-item', 'active')}>
                    <span>Tất cả</span>
                </div>
                <div className={cx('header-item')}>
                    <span>Chờ duyệt</span>
                </div>
                <div className={cx('header-item')}>
                    <span>Đang giao</span>
                </div>
                <div className={cx('header-item')}>
                    <span>Hoàn thành</span>
                </div>
                <div className={cx('header-item')}>
                    <span>Đã hủy</span>
                </div>
            </div>

            {orders.length > 0 ? (
                <>
                    {/* search */}
                    <div className={cx('search-swap')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        <input type="text" placeholder="Nhập tên sản phẩm để tìm kiếm" className={cx('search-input')} />
                    </div>

                    {/* cart item */}
                    {orders.map((order, index) => (
                        <div className={cx('item-top-container')} key={index}>
                            <div className={cx('cart', 'item-top-swap')}>
                                <div className={cx('top-header')}>
                                    <span>Đã hủy</span>
                                </div>
                                <div className={cx('top-main')}>
                                    {arr.map((item, index) => (
                                        <div className={cx('top-main-item')} ke={index}>
                                            <div className={cx('item-img')}></div>
                                            <div className={cx('item-info')}>
                                                <div className={cx('item-info_name')}>
                                                    Ốp Điện Thoại TPU Mềm Họa Tiết Hoạt Hình Cho iPhone 14 13 12 11 Pro
                                                    Max X XR Xs Max 8 7 6 6s Plus SE 2020
                                                </div>
                                                <div className={cx('item-info_type')}>
                                                    Phân loại hàng: 208, Iphone 14 Pro Max
                                                </div>
                                                <div className={cx('item-info_quantity')}>x5</div>
                                            </div>
                                            <div className={cx('item-price')}>
                                                <div className={cx('item-price_old')}>đ31.000.000</div>
                                                <div className={cx('item-price_new')}>đ25.000.000</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={cx('cart', 'item-bottom-swap')}>
                                <div className={cx('bottom-header')}>
                                    <div className={cx('bottom-header_label')}>Thành tiền:</div>
                                    <div className={cx('bottom-header_total')}>đ25.000.000</div>
                                </div>
                                <div className={cx('bottom-main')}>
                                    <div className={cx('bottom-control-status')}>Đã hủy bởi bạn</div>
                                    <div className={cx('bottom-control-group')}>
                                        <Button primary className={cx('bottom-control-group_btnRebuy')}>
                                            Đánh giá
                                        </Button>
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
        </div>
    );
}

export default Purchase;
