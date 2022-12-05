import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import Button from '../Button';
import RatingStar from '../RatingStar';

import styles from './SideBarFilter.module.scss';

const cx = classnames.bind(styles);
function SideBarFilter() {
    return (
        <>
            <nav className={cx('category')}>
                <h3 className={cx('category__heading')}>
                    <i className={cx('category__heading-icon', 'fa-solid fa-list')}></i>
                    Danh mục
                </h3>
                <ul className={cx('category-list')}>
                    <li className={cx('category-item', 'category-item--active')}>
                        <a href="/" className={cx('category-item__link')}>
                            Trang điểm mặt
                        </a>
                    </li>
                    <li className={cx('category-item')}>
                        <a href="/" className={cx('category-item__link')}>
                            Trang điểm môi
                        </a>
                    </li>
                </ul>

                <h3 className={cx('category__heading')}>
                    <i className={cx('category__heading-icon', 'fa-solid fa-filter')}></i>
                    BỘ LỌC TÌM KIẾM
                </h3>
                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Thương Hiệu</span>
                    <ul className={cx('brand-list')}>
                        <li className={cx('brand-item')}>
                            <div className={cx('brand-item__checkbox')}></div>
                            <div className={cx('brand-item__link')}>Trang điểm mặt</div>
                        </li>
                        <li className={cx('brand-item', 'brand-item--active')}>
                            <div className={cx('brand-item__checkbox')}>
                                <FontAwesomeIcon icon={faCheck} />
                            </div>
                            <div className={cx('brand-item__link')}>Trang điểm mặt</div>
                        </li>
                    </ul>
                </div>

                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Khoảng Giá</span>
                    <ul className={cx('brand-list')}>
                        <li className={cx('brand-item')}>
                            <input type="text" defaultValue={0} className={cx('brand-item__input')} />
                            <span className={cx('brand-item__icon')}>-</span>
                            <input type="text" defaultValue={10} className={cx('brand-item__input')} />
                        </li>
                    </ul>
                </div>

                <Button primary normal className={cx('custom-button')}>
                    ÁP DỤNG
                </Button>

                <div className={cx('brand-group')}>
                    <span className={cx('brand-header')}>Đánh Giá</span>
                    <ul className={cx('brand-list')}>
                        <li className={cx('brand-item')}>
                            <RatingStar size={20} score={5} colorFill="yellow" />
                        </li>
                        <li className={cx('brand-item')}>
                            <RatingStar size={20} score={4} colorFill="yellow" />
                        </li>
                        <li className={cx('brand-item')}>
                            <RatingStar size={20} score={3} colorFill="yellow" />
                        </li>
                        <li className={cx('brand-item')}>
                            <RatingStar size={20} score={2} colorFill="yellow" />
                        </li>
                        <li className={cx('brand-item')}>
                            <RatingStar size={20} score={1} colorFill="yellow" />
                        </li>
                    </ul>
                </div>
            </nav>
            <Button primary normal className={cx('custom-button')}>
                XÓA TẤT CẢ
            </Button>
        </>
    );
}

export default SideBarFilter;
