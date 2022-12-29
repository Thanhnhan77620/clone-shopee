import classnames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import ImageUploader from '~/components/ImageUploader';
import RatingStar from '~/components/RatingStar';

//style
import style from './FormComment.module.scss';
const cx = classnames.bind(style);

function FormComment({ handleClose, products = [] }) {
    const [score, setScore] = useState(5);
    const [images, setImages] = useState([]);

    const handleOnClick = (score) => {
        setScore(score);
    };

    const showSatisfaction = () => {
        switch (score) {
            case 1:
                return 'Tệ';
            case 2:
                return 'Không hài lòng';
            case 3:
                return 'Bình thường';
            case 4:
                return 'Hài lòng';
            default:
                return 'Tuyệt vời';
        }
    };

    const getColorSatisfaction = () => {
        switch (score) {
            case 1:
                return 'red';
            case 2:
                return 'red';
            case 3:
                return '';
            case 4:
                return 'rgb(237, 165, 0)';
            default:
                return 'Green';
        }
    };
    
    const handleOnChange = (imageList) => {
        setImages(imageList);
    };
    const handleOnError = () => {
        setImages([]);
    };


    return (
        <div className={cx('card-layout', 'form-comment-swap')}>
            {/* header */}
            <div className={cx('form-comment_header')}>Đánh Giá Sản Phẩm</div>

            {/* list product */}
            <div className={cx('form-comment_main')}>
                {products.length > 0 &&
                    products.map((item, index) => (
                        <div className={cx('comment-item')} key={index}>
                            <div className={cx('comment-item_main')}>
                                <div className={cx('item-main-info')}>
                                    <div
                                        className={cx('info_img')}
                                        style={{
                                            backgroundImage: `url(https://cf.shopee.vn/file/sg-11134201-22110-e3njur9xh9jv80_tn)`,
                                        }}
                                    ></div>
                                    <div className={cx('info_name')}>
                                        Ốp Điện Thoại TPU Mềm Họa Tiết Hoạt Hình Cho iPhone 14 13 12 11 Pro Max X XR Xs
                                        Max 8 7 6 6s Plus SE 2020
                                    </div>
                                </div>
                                <div className={cx('item-main-rating')}>
                                    <div className={cx('rating_label')}>
                                        <strong>Chất lượng sản phẩm</strong>
                                    </div>
                                    <div className={cx('rating_star')}>
                                        <RatingStar size={20} score={score} onClick={handleOnClick} />
                                    </div>
                                    <div
                                        className={cx('rating_satisfaction')}
                                        style={{ color: getColorSatisfaction() }}
                                    >
                                        {showSatisfaction()}
                                    </div>
                                </div>
                                <div className={cx('item-main-content')}>
                                    <textarea
                                        className={cx('form-control')}
                                        style={{ resize: 'vertical', height: 100, width: '100%' }}
                                    />
                                </div>
                                <ImageUploader
                                images={images}
                                OnChange={handleOnChange}
                                OnError={handleOnError}
                                />
                            </div>
                        </div>
                    ))}
            </div>

            {/* footer control */}
            <div className={cx('form-comment_footer')}>
                <Button normal onClick={handleClose}>
                    TRỞ LẠI
                </Button>
                <Button primary>Hoàn Thành</Button>
            </div>
        </div>
    );
}

export default FormComment;
