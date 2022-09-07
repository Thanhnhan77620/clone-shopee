import classnames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styles from './SideBarUser.module.scss';
import images from '~/assets/images';
import config from '~/config';

const cx = classnames.bind(styles);
function SideBarUser(props) {
    return (
        <div className={cx('sidebar_container')}>
            {/* User group */}
            <div className={cx('sidebar-user')}>
                <img
                    className={cx('sidebar-user__avatar')}
                    src="https://cf.shopee.vn/file/52c35ff5a3f3b0f7a2ba81faa90cc2d4_tn"
                    alt="Avatar"
                />

                <div className={cx('sidebar-user-group')}>
                    <div className={cx('sidebar-user-group__username')}>thanhnhan02677</div>
                    <Link to={config.routes.user.profile} className={cx('sidebar-user-group__edit')}>
                        <FontAwesomeIcon icon={faPen} /> Sửa Hồ Sơ
                    </Link>
                </div>
            </div>

            {/* User account group */}
            <div className={cx('sidebar-profile')}>
                {/* Profile item */}
                <div className={cx('profile-item')}>
                    {/* Profile item header */}
                    <Link to={config.routes.user.profile} className={cx('profile-item__header')}>
                        <img src={images.user} alt="User" className={cx('profile-item__header-icon')} />
                        <div className={cx('profile-item__header-name')}>Tài khoản Của Tôi</div>
                    </Link>
                    {/* Profile item body */}
                    <div className={cx('profile-item__body')}>
                        <NavLink
                            to={config.routes.user.profile}
                            className={({ isActive }) =>
                                cx('profile-item__body-link', isActive ? 'profile-item__link--active' : undefined)
                            }
                        >
                            Hồ Sơ
                        </NavLink>
                        <NavLink
                            to={config.routes.user.address}
                            className={({ isActive }) =>
                                cx('profile-item__body-link', isActive ? 'profile-item__link--active' : undefined)
                            }
                        >
                            Địa Chỉ
                        </NavLink>
                        <NavLink
                            to={config.routes.user.password}
                            className={({ isActive }) =>
                                cx('profile-item__body-link', isActive ? 'profile-item__link--active' : undefined)
                            }
                        >
                            Đổi Mật Khẩu
                        </NavLink>
                    </div>
                </div>

                <div className={cx('profile-item')}>
                    {/* Profile item header */}
                    <Link
                        to={config.routes.user.purchase}
                        className={cx(
                            'profile-item__header',
                            document.location.pathname === config.routes.user.password
                                ? 'profile-item__link--active'
                                : '',
                        )}
                    >
                        <img src={images.clipboard} alt="User" className={cx('profile-item__header-icon')} />
                        <div className={cx('profile-item__header-name')}>Đơn Mua</div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBarUser;
