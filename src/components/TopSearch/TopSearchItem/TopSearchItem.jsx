import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './TopSearchItem.module.scss';

const cx = classnames.bind(styles);
function TopSearchItem({ item }) {
    return (
        <li className={cx('carousel__item')}>
            <div className={cx('carousel__item-group')}>
                <Link to="/" className={cx('carousel__item-grid')}>
                    <div className={cx('carousel__item-grid__content')}>
                        <div className={cx('carousel__item-grid__top')}>
                            <span>Top</span>
                        </div>
                        <div className={cx('carousel__item-grid__img')}>
                            <img src={item.imageURL} alt="images" />
                        </div>
                        <div className={cx('carousel__item-grid__sale')}>Bán 7k+ /tháng</div>
                    </div>
                    <div className={cx('carousel__item-grid__title')}>{item.name}</div>
                </Link>
            </div>
        </li>
    );
}

export default TopSearchItem;
