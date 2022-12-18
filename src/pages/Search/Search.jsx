//react component
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

//custom component
import SideBarFilter from '~/components/SideBarFilter';
import ResultSearch from '~/components/ResultSearch';

//service
import * as productService from '~/services/productService';
import { useEffect } from 'react';
import { useState } from 'react';

function Search() {
    let params = { page: 1, limit: 5 };
    const url = new URL(window.location.href);
    const keyword = new URLSearchParams(url.search).getAll('keyword');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productSearching = async () => {
            const resultSearch = await productService.searching({ keyword: keyword[0] }, params);
            if (resultSearch.status === 200) {
                setProducts(resultSearch.data.data);
            } else {
                setProducts([]);
            }
        };
        productSearching();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="app__container">
            <div className="grid">
                {/* app__content global */}
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <SideBarFilter />
                    </div>
                    <div className="grid__column-10">
                        <ResultSearch data={products} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
