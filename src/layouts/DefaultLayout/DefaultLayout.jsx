import classNames from 'classnames/bind';

import HeaderTop from '~/layouts/components/Header/HeaderTop';
import HeaderSearchCart from '~/layouts/components/Header/HeaderSearchCart';
import Footer from '~/layouts/components/Footer';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <header className={cx('header')}>
                <div className="grid">
                    <HeaderTop />
                    <HeaderSearchCart />
                </div>
            </header>
            <div className={cx('body')}>{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
