import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './HeaderSearchCart.module.scss';
import SearchBox from '../../SearchBox/SearchBox';
import { LogoIcon } from '~/components/Icons';
import CartLayout from '~/layouts/components/Header/CartLayout';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function HeaderSearchCart() {
    const { isLogged } = useSelector((state) => state.auth);
    return (
        <>
            {/*  Header with search */}
            <div className={cx('header-with-search')}>
                {/*  Logo */}
                <div className={cx('header__logo')}>
                    <Link to="/" className={cx('header__logo-link')}>
                        <LogoIcon className="header__logo-img" />
                    </Link>
                </div>

                {/* //  Group input search */}
                <SearchBox />

                {/*  Cart layout */}
                <CartLayout logged={isLogged} countItemOrder={10} />
            </div>
        </>
    );
}

export default HeaderSearchCart;
