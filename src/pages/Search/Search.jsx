import SideBarFilter from '~/components/SideBarFilter';
import ResultSearch from '~/components/ResultSearch';

function Search(props) {
    return (
        <div className="app__container">
            <div className="grid">
                {/* app__content global */}
                <div className="grid__row app__content">
                    <div className="grid__column-2">
                        <SideBarFilter />
                    </div>
                    <div className="grid__column-10">
                        <ResultSearch />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
