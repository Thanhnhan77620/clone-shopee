import classNames from 'classnames/bind';

import Slider from '../Slider';
import { TopSearchHeader, TopSearchItem } from '.';

import styles from './TopSearch.module.scss';
import styleTopSearchItem from '../TopSearch/TopSearchItem/TopSearchItem.module.scss';

const cx = classNames.bind(styles);
const cxTopSearchItem = classNames.bind(styleTopSearchItem);
function TopSearch({ data = [] }) {
    // const data = [];
    // const item = {
    //     name: 'Áo Thun Form Rộng Ngắn Tay Unisex Áo Thun Form Rộng Ngắn Tay Unisex',
    //     imageURL: '	https://cf.shopee.vn/file/96ebd654d5f96234c688dffdc5702a71',
    // };
    // const total = 15;
    // for (let i = 1; i <= total; i++) {
    //     data.push({ ...item, id: i });
    // }
    return (
        <div className={cx('section-top-search')}>
            <Slider
                CarouselHeaderComponent={TopSearchHeader}
                listItem={data}
                step={5}
                defaultInfiniteItems={6}
                CarouselItemComponent={TopSearchItem}
                cssCarouselItem={cxTopSearchItem('carousel__item')}
            />
        </div>
    );
}

export default TopSearch;
