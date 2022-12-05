import { faCheck, faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import images from '~/assets/images';
import Button from '~/components/Button';
import style from './Cart.module.scss';
import { Fragment, useState } from 'react';

const cx = classnames.bind(style);

function Cart() {
    const [toggleIndex, setToggleIndex] = useState(-1);

    const widths = ['5%', '40%', '20%', '15%', '10%', '10%'];

    return (
        <div className={cx('cart-container')}>
            {false ? (
                <div className={cx('cart-empty-swap')}>
                    <img src={images.noCart} alt="images" className={cx('cart-empty_img')} />
                    <strong className={cx('cart-empty_text')}>Giỏ hàng của bạn còn trống</strong>
                    <Button primary to="/" className={cx('cart-empty_btn')}>
                        MUA NGAY
                    </Button>
                </div>
            ) : (
                <div className={cx('cart-swap')}>
                    <div className={cx('card-swap', 'cart-swap-header')}>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[0] }}>
                            <input id="check-item" type="checkbox" className={cx('cart-swap-header_item-checkbox')} />
                            <label htmlFor="check-item"></label>
                        </div>
                        <div
                            className={cx('cart-swap-header_item')}
                            style={{ color: 'var(--text-color)', width: widths[1], textAlign: 'left' }}
                        >
                            Sản Phẩm
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[2] }}>
                            Đơn Giá
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[3] }}>
                            Số Lượng
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[4] }}>
                            Số Tiền
                        </div>
                        <div className={cx('cart-swap-header_item')} style={{ width: widths[5] }}>
                            Thao Tác
                        </div>
                    </div>

                    <div className={cx('cart-swap-main')}>
                        <div className={cx('card-swap')}>
                            {widths.map((item, index) => (
                                <Fragment key={index}>
                                    <div className={cx('cart-main-item')}>
                                        <div className={cx('item-checkbox')} style={{ width: widths[0] }}>
                                            <input type="checkbox" className={cx('item-checkbox-input')} />
                                        </div>

                                        <div
                                            className={cx('item-info-group')}
                                            style={{ color: 'var(--text-color)', width: widths[1], textAlign: 'left' }}
                                        >
                                            <img
                                                src={images.sample}
                                                alt="images"
                                                className={cx('item-info-group_img')}
                                            />

                                            <div className={cx('item-info-group_name')}>
                                                Nắp mica che bụi bàn phím, cover key board, tấm mica bảo vệ cover key
                                                board, tấm mica bảo vệ, cover key board, tấm mica bảo vệ
                                            </div>

                                            <div
                                                className={cx('item-info-group_type')}
                                                onClick={() => {
                                                    toggleIndex === index ? setToggleIndex(-1) : setToggleIndex(index);
                                                }}
                                            >
                                                <HeadlessTippy
                                                    interactive
                                                    placement="bottom"
                                                    visible={index === toggleIndex}
                                                    onClickOutside={() => {
                                                        toggleIndex === index
                                                            ? setToggleIndex(-1)
                                                            : setToggleIndex(index);
                                                    }}
                                                    render={(attrs) => (
                                                        <div className={cx('headless-tippy')}>
                                                            <div className={cx('headless-tippy-arrow-outer')}>
                                                                <div className={cx('headless-tippy-arrow-inner')}></div>
                                                            </div>
                                                            <div
                                                                className={cx('headless-tippy-main')}
                                                                tabIndex="-1"
                                                                {...attrs}
                                                            >
                                                                <div className={cx('headless-tippy-container')}>
                                                                    <div className={cx('headless-tippy_content')}>
                                                                        <div className={cx('group-color-swapper')}>
                                                                            <label className={cx('group-color-label')}>
                                                                                Màu Sắc
                                                                            </label>
                                                                            <div className={cx('group-color-list')}>
                                                                                <Button
                                                                                    normal
                                                                                    border
                                                                                    className={cx(
                                                                                        'group-color-list__item',
                                                                                        'active',
                                                                                    )}
                                                                                >
                                                                                    Bạc (N3 Ver 1)
                                                                                    <div
                                                                                        className={cx(
                                                                                            'group-color-list__item--tick',
                                                                                        )}
                                                                                    >
                                                                                        <FontAwesomeIcon
                                                                                            icon={faCheck}
                                                                                            className={cx(
                                                                                                'group-color-list__item-icon',
                                                                                            )}
                                                                                        />
                                                                                    </div>
                                                                                </Button>
                                                                                <Button
                                                                                    normal
                                                                                    border
                                                                                    className={cx(
                                                                                        'group-color-list__item',
                                                                                    )}
                                                                                >
                                                                                    Bạc (N3 Ver 1) Bạc (N3 Ver 1)
                                                                                </Button>
                                                                                <Button
                                                                                    normal
                                                                                    border
                                                                                    className={cx(
                                                                                        'group-color-list__item',
                                                                                    )}
                                                                                >
                                                                                    Bạc (N3 Ver 1)
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className={cx('headless-tippy_footer')}>
                                                                        <Button
                                                                            normal
                                                                            style={{ width: '46%' }}
                                                                            onClick={() => {
                                                                                toggleIndex === index
                                                                                    ? setToggleIndex(-1)
                                                                                    : setToggleIndex(index);
                                                                            }}
                                                                        >
                                                                            TRỞ LẠI
                                                                        </Button>
                                                                        <Button primary style={{ width: '46%' }}>
                                                                            XÁC NHẬN
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                >
                                                    <div>
                                                        <div className={cx('item-info-group_type-title')}>
                                                            <span>Phân loại hàng:</span>
                                                            <button className={cx('item-info-group_type-btn')}></button>
                                                        </div>
                                                        <div className={cx('item-info-group_type-content')}>
                                                            85%, đen
                                                        </div>
                                                    </div>
                                                </HeadlessTippy>
                                            </div>
                                        </div>

                                        <div className={cx('item-price')} style={{ width: widths[2] }}>
                                            <span className={cx('item-price_old')}>₫100.700.500</span>
                                            <span className={cx('item-price_new')}>₫100.100.500</span>
                                        </div>

                                        <div className={cx('group-quantity-swapper')} style={{ width: widths[3] }}>
                                            <div className={cx('group-quantity-select')}>
                                                <button
                                                    className={cx(
                                                        'group-quantity-select__btn',
                                                        'group-quantity-select__btn-left',
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon={faSubtract} />
                                                </button>
                                                <input
                                                    type="text"
                                                    className={cx('group-quantity-select__input')}
                                                    defaultValue={index + 1}
                                                />
                                                <button
                                                    className={cx(
                                                        'group-quantity-select__btn',
                                                        'group-quantity-select__btn-right',
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className={cx('item-total')} style={{ width: widths[4] }}>
                                            ₫100.700.500
                                        </div>
                                        <div className={cx('item-action-group')} style={{ width: widths[5] }}>
                                            <div className={cx('item-action-group_action')}>Xóa</div>
                                        </div>
                                    </div>

                                    {index < widths.length - 1 ? <div className={cx('separate')}></div> : null}
                                </Fragment>
                            ))}
                        </div>
                    </div>

                    <div className={cx('card-swap cart-swap-footer')}></div>
                </div>
            )}
        </div>
    );
}

export default Cart;
