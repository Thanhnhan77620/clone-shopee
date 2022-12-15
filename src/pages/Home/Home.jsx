//react component
import classnames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//custom component
import Banner from '~/components/Banner/Banner';
import { Category } from '~/components/Category';
import ProductItem from '~/components/Product/ProductItem';
import { TopSearch } from '~/components/TopSearch';
import { Brand } from '~/components/Brand';
import toast from '~/assets/js/toast-message';

//services
import * as bannerService from '~/services/bannerService';
import * as categoryService from '~/services/categoryService';

//style
import styles from './Home.module.scss';

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
    const [mainBanners, setMainBanners] = useState([]);
    const [listHorizontal, setListHorizontal] = useState([]);
    const [categories, setCategories] = useState([]);

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

        //get banner
        const getBanner = async () => {
            await bannerService
                .getAll()
                .then((res) => {
                    const data = res.data.data;
                    setMainBanners(() => {
                        const list = [];
                        data.filter((item) => {
                            return (
                                (item.type === 1 || item.type === 2) &&
                                list.push({ type: item.type, url: item.photo.path })
                            );
                        });
                        return list;
                    });
                    setListHorizontal(() => {
                        const list = [];
                        data.filter((item) => {
                            return item.type === 3 && list.push({ type: item.type, url: item.photo.path });
                        }, list);
                        return list;
                    });
                })
                .catch((error) => {
                    alert('error load banner', error);
                });
        };

        //get category
        const getCate = async () => {
            let data = [];
            const item = {
                name: 'máy tính & laptop máy tính & laptop máy tính & laptop máy tính & laptop',
                imageURL: 'https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn',
            };
            for (let i = 1; i <= 17; i++) {
                data.push({ id: i, name: item.name, imageURL: item.imageURL });
            }
            const repCate = await categoryService.getAll();
            if (repCate.status === 200) {
                repCate.data.data.forEach((cate) => {
                    data.push({ id: cate.id, name: cate.name, imageURL: cate.logo.path });
                });
            }

            setCategories(repCate);
        };
        getCate();
        getBanner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className={cx('container-banner')}>
                <div className="grid">
                    <Banner data={mainBanners} />
                </div>
            </div>
            <div className={cx('container-body')}>
                <div className="grid">
                    <Category data={categories} />
                    <Banner type="horizontal" data={listHorizontal} />
                    <Brand listBanner={listHorizontal} />
                    <div className={cx('section-suggest')}>
                        <div className={cx('section-suggest-header')}>
                            <div className={cx('section-suggest-header__title')}>gợi ý hôm nay</div>
                        </div>
                        <div className={cx('section-suggest-body')}>
                            <div className="grid__row">
                                {data.map((item) => (
                                    <div key={item.id} className="grid__column-2">
                                        {/* <ProductItem item={item} /> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <TopSearch data={data} />
                </div>
            </div>
        </>
    );
}

export default Home;
