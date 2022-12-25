import classnames from 'classnames/bind';
import Button from '~/components/Button';
import RatingStar from '~/components/RatingStar';

//style
import style from './FormComment.module.scss';
const cx = classnames.bind(style);

function FormComment({ handleClose }) {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    return (
        <div className={cx('card-layout', 'form-comment-swap')}>
            {/* header */}
            <div className={cx('form-comment_header')}>Đánh Giá Sản Phẩm</div>

            {/* list product */}
            <div className={cx('form-comment_main')}>
                {arr.length > 0 &&
                    arr.map((item, index) => (
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
                                        <RatingStar />
                                    </div>
                                </div>
                                <div className={cx('item-main-content')}>
                                    <textarea
                                        className={cx('form-control')}
                                        style={{ resize: 'vertical', height: 100, width: '100%' }}
                                    />
                                </div>
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
