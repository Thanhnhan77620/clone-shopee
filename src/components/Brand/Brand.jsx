import classnames from 'classnames/bind';

import { BrandHeader } from './BrandHeader';
import { TopSearchItem } from '../TopSearch';
import styleTopSearchItem from '../TopSearch/TopSearchItem/TopSearchItem.module.scss';
import styles from './Brand.module.scss';
import Slider from '../Slider';
import Banner from '../Banner/Banner';

const cx = classnames.bind(styles);
const cxTopSearchItem = classnames.bind(styleTopSearchItem);
function Brand({ listBanner = [] }) {
    const data = [];
    const item = {
        name: 'Áo Thun Form Rộng Ngắn Tay Unisex Áo Thun Form Rộng Ngắn Tay Unisex',
        imageURL: 'https://cf.shopee.vn/file/96ebd654d5f96234c688dffdc5702a71',
    };
    const total = 15;
    for (let i = 1; i <= total; i++) {
        data.push({ ...item, id: i });
    }
    return (
        <div className={cx('section-top-search')}>
            <BrandHeader />
            <div className={cx('body')}>
                <div className={cx('body-right')}>
                    <Banner type="carousel" data={listBanner} />
                </div>
                <div className={cx('body-left')}>
                    <Slider
                        listItem={data}
                        step={5}
                        defaultInfiniteItems={6}
                        CarouselItemComponent={TopSearchItem}
                        cssCarouselItem={cxTopSearchItem('carousel__item')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Brand;
