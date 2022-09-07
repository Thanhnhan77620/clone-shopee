import classnames from 'classnames/bind';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Banner from '~/components/Banner/Banner';
import { Category } from '~/components/Category';
import ProductItem from '~/components/Product/ProductItem';
import { TopSearch } from '~/components/TopSearch';
import styles from './Home.module.scss';
import toast from '~/assets/js/toast-message';
import * as authService from '~/services/authService';

const cx = classnames.bind(styles);
function Home() {
    const data = [];
    for (let i = 0; i < 10; i++) {
        data.push({
            id: i,
            name: 'Balo nam nữ giá rẻ, thời trang đi học nhiều ngăn siêu nhẹ phong cách ulzzang, đẹp đựng laptop ULZ015',
            imageURL: 'https://cf.shopee.vn/file/9e40b129903c4f5e3a48ef12cc69796d_tn',
            price: 200000,
            sale: 20,
            sold: '12k', //12k
        });
    }

    const location = useLocation();
    useEffect(() => {
        const icons = {
            success: 'fa-solid fa-circle-check',
            error: 'fa-solid fa-circle-exclamation',
        };
        if (location.state) {
            let title, type, iconToast;
            if (location.state.isSuccess) {
                iconToast = icons.success;
                title = 'Success';
                type = 'success';
            } else {
                iconToast = icons.error;
                title = 'Error';
                type = 'error';
            }
            toast({
                iconToast,
                title,
                message: location.state.message,
                type,
                duration: 2000,
            });
            console.log(window.history.replaceState({}, {}));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={cx('container-banner')}>
                <div className="grid">
                    <Banner />
                </div>
            </div>
            <div className={cx('container-body')}>
                <div className="grid">
                    <Category />
                    <Banner type="simple-banner" />
                    <TopSearch />
                    <div className={cx('section-suggest')}>
                        <div className={cx('section-suggest-header')}>
                            <div className={cx('section-suggest-header__title')}>gợi ý hôm nay</div>
                        </div>
                        <div className={cx('section-suggest-body')}>
                            <div className="grid__row">
                                {data.map((item) => (
                                    <div key={item.id} className="grid__column-2">
                                        <ProductItem item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
