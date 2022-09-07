import classnames from 'classnames/bind';

import Slider from '~/components/Slider';
import { CategoryHeader, CategoryItem } from '.';

import styles from './Category.module.scss';
import stylesCategoryItem from '../Category/CategoryItem/CategoryItem.module.scss';

const cx = classnames.bind(styles);
const cxCategoryItem = classnames.bind(stylesCategoryItem);
function Category() {
    const data = [];
    const item = {
        name: 'máy tính & laptop máy tính & laptop máy tính & laptop máy tính & laptop',
        imageURL: 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn',
    };
    const total = 17;
    for (let i = 1; i <= total; i++) {
        data.push({ ...item, id: i - 1 });
    }

    return (
        <div className={cx('section-category')}>
            <Slider
                CarouselHeaderComponent={CategoryHeader}
                listItem={data}
                CarouselItemComponent={CategoryItem}
                cssCarouselItem={cxCategoryItem('carousel__item')}
                infiniteLoop={true}
            />
        </div>
    );
}

export default Category;
