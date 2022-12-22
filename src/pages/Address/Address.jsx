import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';
import styles from './Address.module.scss';

const cx = classnames.bind(styles);
function Address() {
    const addresses = [
        {
            fullName: 'Nguyễn Tấn Quốc Khánh',
            phone: '363677492',
            location: 'Số 1, ấp 1 Xã Núi Tượng, Huyện Tân Phú, Đồng Nai',
            isDefault: 1,
        },
        {
            fullName: 'Nguyễn Thanh Nhàn',
            phone: '363677493',
            location: 'Số 2, ấp 2 Xã Phú Lập, Huyện Tân Phú, Đồng Nai',
            isDefault: 0,
        },
        {
            fullName: 'Nguyễn Thanh Nhẫn',
            phone: '363677494',
            location: 'Số 4, ấp 4 Xã Phú An, Huyện Tân Phú, Đồng Nai',
            isDefault: 0,
        },
    ];
    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Địa Chỉ Của Tôi</h1>
                <Button
                    primary
                    normal
                    leftIcon={<FontAwesomeIcon icon={faPlus} className={cx('header-button-icon')} />}
                >
                    Thêm Địa Chỉ Mới
                </Button>
            </div>
            <div className={cx('body')}>
                {addresses.map((address, index) => {
                    return (
                        <div key={index} className={cx('item')}>
                            <div className={cx('item-left')}>
                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Họ và tên</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.fullName}</div>
                                        {address.isDefault ? (
                                            <div className={cx('item-left__button')}>Mặc định</div>
                                        ) : undefined}
                                    </div>
                                </div>

                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Số điện thoại</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.phone}</div>
                                    </div>
                                </div>

                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Địa chỉ</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.location}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('item-right')}>
                                <div className={cx('item-right-control')}>
                                    <div className={cx('item-right-control__edit')}>Sửa</div>
                                    {!address.isDefault ? (
                                        <div className={cx('item-right-control__remove')}>Xóa</div>
                                    ) : undefined}
                                </div>

                                <Button
                                    disabled={address.isDefault === 1}
                                    normal={address.isDefault !== 1}
                                    className={cx('item-right__button')}
                                >
                                    Thiết Lập Mặc Định
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Address;
