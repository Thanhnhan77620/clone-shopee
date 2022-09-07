import { faAngleLeft, faAngleRight, faStar, faThumbsUp, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Carousel from '../Slider';
import RatingStar from '../RatingStar';

import styles from './FilterComment.module.scss';

const cx = classnames.bind(styles);
function FilterComment() {
    const listStar = [];
    for (let i = 0; i < 5; i++) {
        listStar.push({ id: i, name: 'Sao' });
    }
    return (
        <div className="card-layout">
            <div className={cx('product-detail__description')}>
                <div className={cx('description-header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                <div className={cx('description-content')}>
                    <div className={cx('product-rating-overview')}>
                        <div className={cx('product-rating-overview__briefing')}>
                            <div className={cx('product-rating__score-swapper')}>
                                <span className={cx('product-rating__score')}>4.3 </span>
                                trên 5
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <RatingStar size={20} score={4} colorFill="#ee4d2d" />
                            </div>
                        </div>
                        <div className={cx('product-rating-overview__filters')}>
                            <Button
                                normal
                                border
                                className={cx('filter-star__item')} //'filter-star__item--active'
                            >
                                Tất Cả
                            </Button>
                            {listStar.map((item, index) => (
                                <Button
                                    key={index}
                                    normal
                                    border
                                    className={cx('filter-star__item')} //'filter-star__item--active'
                                >
                                    {item.id} {item.name} {item.id + 1}
                                </Button>
                            ))}
                            <Button
                                normal
                                border
                                className={cx('filter-star__item', 'filter-star__item--active')} //'filter-star__item--active'
                            >
                                Có Bình Luận (3)
                            </Button>
                            <Button
                                normal
                                border
                                className={cx('filter-star__item')} //'filter-star__item--active'
                            >
                                Có Hình Ảnh/Video (2)
                            </Button>
                        </div>
                    </div>

                    {/* comment */}
                    <div className={cx('product-rating-comment-list')}>
                        <div className={cx('product-rating-comment')}>
                            <a href="/" className={cx('product-rating-comment__avatar')}>
                                <img src="https://cf.shopee.vn/file/ce18a46cd7604dae55be703ba45c8e8d_tn" alt="avatar" />
                            </a>
                            <div className={cx('product-rating-comment__main')}>
                                <a href="/" className={cx('product-rating-comment__author')}>
                                    thanhnhan77620
                                </a>
                                <div style={{ marginTop: 2 }}>
                                    <RatingStar score={3.5} colorFill="#ee4d2d" />
                                </div>

                                <div className={cx('product-rating-comment__time')}>2022-03-30 22:54</div>
                                <div className={cx('product-rating-comment__content')}>
                                    Giá đỡ khá chắc chắn, mua về để laptop cho đở mỏi lưng
                                </div>
                                <div className={cx('product-rating-comment__media-image-list-swapper')}>
                                    <div className={cx('rating-media-list')}>
                                        <div className={cx('rating-media-list__container')}>
                                            <div
                                                className={cx(
                                                    'rating-media-list__image-wrapper',
                                                    'rating-media-list__image-wrapper--inactive',
                                                )}
                                            >
                                                <img
                                                    src="https://cf.shopee.vn/file/b1505012de0fff9ae8a8669b13684332_tn"
                                                    alt="avatar"
                                                    className={cx('rating-media-list-image__wrapper')}
                                                />

                                                <div className={cx('rating-media-list__video-cover')}>
                                                    <FontAwesomeIcon icon={faVideo} />
                                                    <span>0:07</span>
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'rating-media-list__image-wrapper',
                                                    'rating-media-list__image-wrapper--inactive',
                                                )}
                                            >
                                                <img
                                                    src="https://cf.shopee.vn/file/b1505012de0fff9ae8a8669b13684332_tn"
                                                    alt="avatar"
                                                    className={cx('rating-media-list-image__wrapper')}
                                                />
                                            </div>
                                            <div
                                                className={cx(
                                                    'rating-media-list__image-wrapper',
                                                    'rating-media-list__image-wrapper--inactive',
                                                )}
                                            >
                                                <img
                                                    src="https://cf.shopee.vn/file/b1505012de0fff9ae8a8669b13684332_tn"
                                                    alt="avatar"
                                                    className={cx('rating-media-list-image__wrapper')}
                                                />

                                                <div className={cx('rating-media-list__video-cover')}>
                                                    <FontAwesomeIcon icon={faVideo} />
                                                    <span>0:07</span>
                                                </div>
                                            </div>
                                            <div
                                                className={cx(
                                                    'rating-media-list__image-wrapper',
                                                    'rating-media-list__image-wrapper--inactive',
                                                )}
                                            >
                                                <img
                                                    src="https://cf.shopee.vn/file/b1505012de0fff9ae8a8669b13684332_tn"
                                                    alt="avatar"
                                                    className={cx('rating-media-list-image__wrapper')}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('rating-media-list__zoom-image')}>{/* <Carousel/> */}</div>
                                    </div>
                                </div>
                                <div className={cx('product-rating-comment__action')}>
                                    <div
                                        className={cx(
                                            'product-rating-comment__like-button',
                                            'product-rating-comment__like-button--active',
                                        )}
                                    >
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </div>
                                    <div className={cx('product-rating-comment__like-count')}>2</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product-rating-comment-list')}>
                        <div className={cx('product-rating-comment')}>
                            <a href="/" className={cx('product-rating-comment__avatar')}>
                                <img src="https://cf.shopee.vn/file/ce18a46cd7604dae55be703ba45c8e8d_tn" alt="avatar" />
                            </a>
                            <div className={cx('product-rating-comment__main')}>
                                <a href="/" className={cx('product-rating-comment__author')}>
                                    thanhnhan77620
                                </a>
                                {/* rating star component */}
                                <div style={{ marginTop: 2 }}>
                                    <RatingStar score={4.3} colorFill="#ee4d2d" />
                                </div>

                                <div className={cx('product-rating-comment__time')}>2022-03-30 22:54</div>
                                <div className={cx('product-rating-comment__content')}>
                                    Giá đỡ khá chắc chắn, mua về để laptop cho đở mỏi lưng
                                </div>
                                <div className={cx('product-rating-comment__media-image-list-swapper')}>
                                    <div className={cx('rating-media-list')}>
                                        <div className={cx('rating-media-list__container')}>
                                            <div
                                                className={cx(
                                                    'rating-media-list__image-wrapper',
                                                    'rating-media-list__image-wrapper--inactive',
                                                )}
                                            >
                                                <img
                                                    src="https://cf.shopee.vn/file/b1505012de0fff9ae8a8669b13684332_tn"
                                                    alt="avatar"
                                                    className={cx('rating-media-list-image__wrapper')}
                                                />

                                                <div className={cx('rating-media-list__video-cover')}>
                                                    <FontAwesomeIcon icon={faVideo} />
                                                    <span>0:07</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('rating-media-list__zoom-image')}></div>
                                    </div>
                                </div>
                                <div className={cx('product-rating-comment__action')}>
                                    <div className={cx('product-rating-comment__like-button')}>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </div>
                                    <div className={cx('product-rating-comment__like-count')}>2</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Pagination --> */}
                    <ul className={cx('pagination', 'pagination-wrapper')}>
                        <li className="pagination-item ">
                            <Link to="/" className="pagination-item__link">
                                <FontAwesomeIcon icon={faAngleLeft} className="pagination-item__icon" />
                            </Link>
                        </li>
                        <li className="pagination-item pagination-item--active">
                            <Link to="/" className="pagination-item__link">
                                1
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                2
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                3
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                4
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                5
                            </Link>
                        </li>
                        <li className="pagination-item">
                            <Link to="/" className="pagination-item__link">
                                <FontAwesomeIcon icon={faAngleRight} className="pagination-item__icon" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default FilterComment;
