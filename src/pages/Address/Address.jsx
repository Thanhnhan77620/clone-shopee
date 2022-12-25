//react component
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

//custom component
import Button from '~/components/Button';
import CreateAddress from './Form/CreateAddress';
import Popup from '~/components/Popup';

//service
import * as addressService from '~/services/addressService';

//style
import styles from './Address.module.scss';
import { toastError } from '~/assets/js/toast-message';
import { useEffect } from 'react';
import EditAddress from './Form/EditAddress';
const cx = classnames.bind(styles);

function Address() {
    // const addresses = [
    //     {
    //         fullName: 'Nguyễn Tấn Quốc Khánh',
    //         phone: '363677492',
    //         location: 'Số 1, ấp 1 Xã Núi Tượng, Huyện Tân Phú, Đồng Nai',
    //         isDefault: 1,
    //     },
    //     {
    //         fullName: 'Nguyễn Thanh Nhàn',
    //         phone: '363677493',
    //         location: 'Số 2, ấp 2 Xã Phú Lập, Huyện Tân Phú, Đồng Nai',
    //         isDefault: 0,
    //     },
    //     {
    //         fullName: 'Nguyễn Thanh Nhẫn',
    //         phone: '363677494',
    //         location: 'Số 4, ấp 4 Xã Phú An, Huyện Tân Phú, Đồng Nai',
    //         isDefault: 0,
    //     },
    // ];

    const [addresses, setAddresses] = useState([]);
    const [addressSelected, setAddressSelected] = useState();
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormEdit, setShowFormEdit] = useState(false);

    const handleClose = () => {
        setShowFormCreate(false);
        setShowFormEdit(false);
    };

    const getAllAddress = async () => {
        const req = await addressService.getAll();
        if (req.status === 200) {
            setAddresses(req.data.data);
        } else {
            toastError(req.errors.message);
        }
    };

    const handleClickEdit = (address) => {
        setAddressSelected(address);
        setShowFormEdit(true);
    };

    const handleRemove = async (id) => {
        const req = await addressService.remove(id);
        if (req.status === 200) {
            getAllAddress();
        } else {
            toastError(req.errors.message);
        }
    };

    const handleSetDefaultAddress = async (id) => {
        const body = {
            id,
            isDefault: true,
        };
        const req = await addressService.update(body);
        if (req.status === 200) {
            getAllAddress();
        } else {
            toastError(req.errors.message);
        }
    };

    useEffect(() => {
        getAllAddress();
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1 className={cx('header-title')}>Địa Chỉ Của Tôi</h1>
                <Button
                    primary
                    normal
                    leftIcon={<FontAwesomeIcon icon={faPlus} className={cx('header-button-icon')} />}
                    onClick={() => {
                        setShowFormCreate(true);
                    }}
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
                                        <div className={cx('item-left__text')}>{address.phoneNumber}</div>
                                    </div>
                                </div>

                                <div className={cx('item-left-wrap')}>
                                    <div className={cx('item-left__label')}>Địa chỉ</div>
                                    <div className={cx('item-left__content')}>
                                        <div className={cx('item-left__text')}>{address.address}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('item-right')}>
                                <div className={cx('item-right-control')}>
                                    <div
                                        className={cx('item-right-control__edit')}
                                        onClick={() => handleClickEdit(address)}
                                    >
                                        Sửa
                                    </div>
                                    {!address.isDefault ? (
                                        <div
                                            className={cx('item-right-control__remove')}
                                            onClick={() => handleRemove(address.id)}
                                        >
                                            Xóa
                                        </div>
                                    ) : undefined}
                                </div>

                                <Button
                                    disabled={address.isDefault}
                                    normal={!address.isDefault}
                                    className={cx('item-right__button')}
                                    onClick={() => handleSetDefaultAddress(address.id)}
                                >
                                    Thiết Lập Mặc Định
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Popup
                FormComponent={<CreateAddress handleClose={handleClose} fetchData={getAllAddress} />}
                isShow={showFormCreate}
            />
            <Popup
                FormComponent={
                    <EditAddress handleClose={handleClose} item={addressSelected} fetchData={getAllAddress} />
                }
                isShow={showFormEdit}
            />
        </div>
    );
}

export default Address;
