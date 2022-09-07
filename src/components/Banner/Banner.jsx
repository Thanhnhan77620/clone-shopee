import classnames from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import styles from './Banner.module.scss';
const cx = classnames.bind(styles);

function Banner({ type = 'main' }) {
    const images = [];
    for (let i = 0; i < 3; i++) {
        images.push({ id: i, url: 'https://cf.shopee.vn/file/075d5e27fdb5366ab12a89ab8a6e264e_xxhdpi' });
    }
    if (type === 'simple-banner') {
        return (
            <div className={cx('banner-container')}>
                {images.map((item) => (
                    <img key={item.id} src={item.url} alt="images" className={cx('banner-section')} />
                ))}
            </div>
        );
    }
    return (
        <div className={cx('banner-swapper')}>
            <div className={cx('banner-carousel')}>
                <Carousel showStatus={false} showThumbs={false} infiniteLoop={true} autoPlay={true}>
                    {images.map((item) => (
                        <div key={item.id} className={cx('banner-carousel-item')}>
                            <img src={item.url} alt="images" />
                        </div>
                    ))}
                </Carousel>
            </div>
            <div className={cx('side-banner')}>
                <img className={cx('side-banner-item')} src={images[0].url} alt="images" />
                <img className={cx('side-banner-item')} src={images[0].url} alt="images" />
            </div>
        </div>
    );
}

export default Banner;
