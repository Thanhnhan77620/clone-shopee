import classnames from 'classnames/bind';

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
            </nav>
        </>
    );
}

export default SideBarFilter;
