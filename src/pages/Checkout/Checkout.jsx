//react component
import { useSearchParams } from "react-router-dom";
import classsname from 'classnames/bind'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

//style
import style from './Checkout.model.scss'
const cx = classsname.bind(style)

function Checkout() {
    const [searchParams] = useSearchParams()
    return (
        <div className={cx('container')}>
            <div className={cx('card-swap', 'card-address-swap')}>
                <div className={cx('card-address-swap_header')}>
                    <div className={cx('header-logo')}>
                        <FontAwesomeIcon icon={faLocationDot} />
                    </div>
                    <div className={cx('header-title')}>
                        Địa Chỉ Nhận Hàng
                    </div>
                </div>

                <div className={cx('card-address-swap_content')}>
                    <div className={cx('content-info')}>
                        Nguyễn Thanh Nhân <br />(+84) 363677492
                    </div>

                    <div className={cx('content-location')}>
                        <div className={cx('content-location_detail')}>
                            Fpt Software Hồ Chí Minh, lô t2, Đường D 1, Khu Cnc Quận 9, Phường Tân Phú, Thành Phố Thủ Đức, TP. Hồ Chí Minh
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
                    Sản phẩm
                </div>
                <div className={cx('card-main-swap_content')}>
                    <div className={cx('content-grouplable')}>

                    </div>
                    <div className={cx('content-groupitems')}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
