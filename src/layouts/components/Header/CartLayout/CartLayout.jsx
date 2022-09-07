import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import styles from './CartLayout.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';

const cx = classnames.bind(styles);

function CartLayout({ logged, countItemOrder, type = 'cart' }) {
    return (
        <div>
            {/*  Cart layout */}
            <div className={cx('header__cart')}>
                <div className={cx('header__cart-wrap')}>
                    {/* Cart logo */}
                    <Link to="/cart" className={cx('')}>
                        <FontAwesomeIcon icon={faCartShopping} className={cx('header__cart-icon')} />
                        <span className={cx('header__cart-notice')}>{countItemOrder}</span>
                    </Link>

                    {logged && countItemOrder > 0 ? (
                        <>
                            <div className={cx('header__cart-list')}>
                                {/*  Cart body has item */}
                                <h4 className={cx('header__cart-heading')}>Sản phẩm đã thêm</h4>
                                <ul className={cx('header__cart-list-item')}>
                                    <Link to="/product/detail" className={cx('header__cart-list-item_Link')}>
                                        <li className={cx('header__cart-item')}>
                                            <img
                                                src="https://cf.shopee.vn/file/d1bbf185c3d68db99dc6b5d318ecfe72_tn"
                                                alt=""
                                                className={cx('header__cart-img')}
                                            />
                                            <div className={cx('header__cart-item-info')}>
                                                <div className={cx('header__cart-item-head')}>
                                                    <h5 className={cx('header__cart-item-name')}>
                                                        Bộ kem đặc trị mụn Bộ kem đặc trị mụn Bộ kem đặc trị mụn Bộ kem
                                                        đặc trị mụn
                                                    </h5>
                                                    <div className={cx('header__cart-item-price-wrap')}>
                                                        <span className={cx('header__cart-item-price')}>2.000đ</span>
                                                        <span className={cx('header__cart-item-multiply')}>x</span>
                                                        <span className={cx('header__cart-item-qnt')}>2</span>
                                                    </div>
                                                </div>

                                                <div className={cx('header__cart-item-body')}>
                                                    <span className={cx('header__cart-item-description')}>
                                                        Phân loại: kem xử lý Phân loại: kem xử lý Phân loại: kem xử lý
                                                        Phân loại: kem xử lý
                                                    </span>
                                                    <span className={cx('header__cart-item-remove')}>Xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                    <Link to="/product/detail" className={cx('header__cart-list-item_Link')}>
                                        <li className={cx('header__cart-item')}>
                                            <img
                                                src="https://cf.shopee.vn/file/d1bbf185c3d68db99dc6b5d318ecfe72_tn"
                                                alt=""
                                                className={cx('header__cart-img')}
                                            />
                                            <div className={cx('header__cart-item-info')}>
                                                <div className={cx('header__cart-item-head')}>
                                                    <h5 className={cx('header__cart-item-name')}>Bộ kem đặc trị mụn</h5>
                                                    <div className={cx('header__cart-item-price-wrap')}>
                                                        <span className={cx('header__cart-item-price')}>
                                                            2.000.000đ
                                                        </span>
                                                        <span className={cx('header__cart-item-multiply')}>x</span>
                                                        <span className={cx('header__cart-item-qnt')}>2</span>
                                                    </div>
                                                </div>

                                                <div className={cx('header__cart-item-body')}>
                                                    <span className={cx('header__cart-item-description')}>
                                                        Phân loại: kem xử lý
                                                    </span>
                                                    <span className={cx('header__cart-item-remove')}>Xóa</span>
                                                </div>
                                            </div>
                                        </li>
                                    </Link>
                                </ul>
                                <Button primary to="/cart" className={cx('header__cart-view-cart')}>
                                    Xem giỏ hàng
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/*  No Cart: header__cart-list--no-cart */}
                            <div className={cx('header__cart-list', 'header__cart-list--no-cart')}>
                                <img src={images.noCart} alt="" className={cx('header__cart-no-cart-img')} />
                                <span className={cx('header__cart-list-msg')}>Chưa có sản phẩm</span>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CartLayout;
