import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCheck, faMagnifyingGlass, faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchServices from '~/services/searchService';
import { CartHistoryIcon } from '~/components/Icons';
import styles from './SearchBox.module.scss';
import { useDebounce } from '~/hooks';

const cx = classnames.bind(styles);

function SearchBox(props) {
    const searchHistoryRef = useRef();
    const inputSearch = useRef();

    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    // const [searchResult, setSearchResult] = useState([]);
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem('search-history')) || []);

    const debouncedValue = useDebounce(searchKey, 500);

    // const handleClickItemSearch = () => {
    //     searchHistoryRef.current.style.display = 'none';
    // };

    const handleChange = (e) => {
        const keySearch = e.target.value;
        if (!keySearch.startsWith(' ')) {
            setSearchKey(keySearch);
        }
    };

    const handleClear = () => {
        setSearchKey('');
        setLoading(false);
        setShowHistory(false);
    };
    // const handleHideResult = () => {
    //     setShowHistory(false);
    // };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            // setSearchResult([]);
            setData(JSON.parse(localStorage.getItem('search-history')) || []);
            return;
        }

        // call API name.startWith('search)
        const fetchApi = async () => {
            setLoading(true);
            const searchResult = await searchServices.search(debouncedValue);
            // setSearchResult(searchResult);
            setData(searchResult);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            search();
        }
    };

    const handleOnFocus = () => {
        setShowHistory(true);
        if (!searchKey) {
            setData(JSON.parse(localStorage.getItem('search-history')) || []);
        }
    };

    function search() {
        if (searchKey) {
            console.log('searchKey', searchKey);
            // set localStorage
            let searchHistory = JSON.parse(localStorage.getItem('search-history')) || [];
            if (searchHistory.length >= 10) {
                searchHistory = searchHistory.slice(1);
            }
            searchHistory.push({ nickname: searchKey });
            localStorage.setItem('search-history', JSON.stringify(searchHistory));

            // call api search name.contains('searchKey')
            // ....
        }
    }
    return (
        <div className={cx('header__search')}>
            <div className={cx('header__search-wrap')}>
                <HeadlessTippy
                    interactive
                    visible={showHistory && data.length > 0}
                    render={(attrs) => (
                        <div className={cx('header__search-history')} tabIndex="-1" {...attrs} ref={searchHistoryRef}>
                            {/* Mở rộng tìm kiếm trong shop */}
                            {/* <div className={cx('header__search-history-group')}>
                                <svg
                                    enableBackground="new 0 0 15 15"
                                    viewBox="0 0 15 15"
                                    x="0"
                                    y="0"
                                    strokeWidth="0"
                                    className={cx('header__search-history-icon')}
                                >
                                    <path
                                        fill="#ee4d2d"
                                        d="m13 1.9c-.2-.5-.8-1-1.4-1h-8.4c-.6.1-1.2.5-1.4 1l-1.4 4.3c0 .8.3 1.6.9 2.1v4.8c0 .6.5 1 1.1 1h10.2c.6 0 1.1-.5 1.1-1v-4.6c.6-.4.9-1.2.9-2.3zm-11.4 3.4 1-3c .1-.2.4-.4.6-.4h8.3c.3 0 .5.2.6.4l1 3zm .6 3.5h.4c.7 0 1.4-.3 1.8-.8.4.5.9.8 1.5.8.7 0 1.3-.5 1.5-.8.2.3.8.8 1.5.8.6 0 1.1-.3 1.5-.8.4.5 1.1.8 1.7.8h.4v3.9c0 .1 0 .2-.1.3s-.2.1-.3.1h-9.5c-.1 0-.2 0-.3-.1s-.1-.2-.1-.3zm8.8-1.7h-1v .1s0 .3-.2.6c-.2.1-.5.2-.9.2-.3 0-.6-.1-.8-.3-.2-.3-.2-.6-.2-.6v-.1h-1v .1s0 .3-.2.5c-.2.3-.5.4-.8.4-1 0-1-.8-1-.8h-1c0 .8-.7.8-1.3.8s-1.1-1-1.2-1.7h12.1c0 .2-.1.9-.5 1.4-.2.2-.5.3-.8.3-1.2 0-1.2-.8-1.2-.9z"
                                    ></path>
                                </svg>
                                <h3 className={cx('header__search-history-heading')}>Lịch sử tìm kiếm</h3>
                            </div> */}
                            <ul className={cx('header__search-history-list')}>
                                {data.map((item, index) => (
                                    <Link
                                        to="/search"
                                        key={index}
                                        onClick={() => (searchHistoryRef.current.style.display = 'none')}
                                        className={cx('header__search-history-item')}
                                    >
                                        {item.nickname}
                                    </Link>
                                ))}
                            </ul>
                        </div>
                    )}
                    onClickOutside={() => setShowHistory(false)}
                >
                    <div className={cx('header__search-wrap-header')}>
                        <input
                            type="text"
                            value={searchKey}
                            className={cx('header__search-input')}
                            placeholder="Nhập để tìm kiếm sản phẩm"
                            onChange={handleChange}
                            onFocus={handleOnFocus}
                            onKeyDown={handleEnter}
                        />
                        {!!searchKey && !loading && (
                            <button className={cx('header__search-clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {loading && (
                            <button className={cx('header__search-spinner')}>
                                <FontAwesomeIcon icon={faSpinner} className={cx('loading')} />
                            </button>
                        )}
                    </div>
                </HeadlessTippy>
            </div>

            {/* Mở rộng tìm kiếm trong shop Select search */}
            {/* <div className={cx('header__search-select')}>
                <span className={cx('header__search-select-label')}>Trong shop</span>{' '}
                <FontAwesomeIcon icon={faAngleDown} className={cx('header__search-select-icon')} />
                <ul className={cx('header__search-option')}>
                    <li className={cx('header__search-option-item')}>
                        <span>Trong shop</span> <FontAwesomeIcon icon={faCheck} />
                    </li>
                    <li className={cx('header__search-option-item')}>
                        <span>Ngoài shop</span>
                        <FontAwesomeIcon icon={faCheck} />
                    </li>
                </ul>
            </div> */}
            {/*  Button search */}
            <button className={cx('header__search-btn')} onClick={search}>
                {' '}
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('header__search-btn-icon')} />
            </button>
        </div>
    );
}

export default SearchBox;
