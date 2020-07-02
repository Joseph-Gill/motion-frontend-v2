import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import searchIcon from '../../../assets/search_icon.svg';
import {Icon} from "../../../style/GlobalIcons";
import {Input} from "../../../style/GlobalInputs";
import {setActiveFilter} from '../../../store/actions/feedActions';

// Styling

const Tab = styled.button`
    border: none;
    background: none;
    outline: none;
    padding: 0 0.5em;
    min-width: 70px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.9rem;
    color: grey;
    border-bottom: 1px solid transparent;

    // https://stackoverflow.com/questions/48502647/conditional-rendering-in-styled-components 
    ${({ active }) => active && `
        border-bottom-color: black;
        font-weight: 700;
    `}
`;

const FilterMainContainer = styled.div`
    display: flex;
    padding: 0 10.5% 0 10%;
    margin-bottom: 20px;
    justify-content: space-between;
    border-bottom: solid 2px rgba(240,240,240,0.67);
    height: 80px;
    background: linear-gradient(to bottom, #f1f1f3 5%, #fafafb);
    
`;

const FilterTabs = styled.div`
    display: flex;
    /* width: 300px; */
    justify-content: space-between;
    height: 100%;
    font-size: 11px;
    font-weight: lighter;
    cursor:pointer;
`;

const Search = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: space-between;
    width: 225px;
`;

const SearchInput = styled(Input)`
    margin-left: 2rem;
    background: none;
    
    &::placeholder {
       color: rgba(102,102,102,0.53);
    }
`;

// Component

// Add the filterIds you want to display as a <Tab> to this array (you can find them in FILTER_ENTRIES)
const filterIds = ['allPosts', 'likedPosts', 'friendsPosts', 'followingPosts'];

const FilterPosts = ({filters, activeFilterId, setActiveFilter}) => {
    const handleChangeTab = (e) => { setActiveFilter(e.target.dataset['filter_id']); }

    return <>
        <FilterMainContainer>
            <Search>
                <Icon src={searchIcon}/>
                <SearchInput placeholder='Search posts...'/>
            </Search>
            <FilterTabs onClick={handleChangeTab}>
                {filterIds.map(filterId => {
                    const filter = filters[filterId];
                    return (
                        <Tab key={filter.id} active={filter.id === activeFilterId} data-filter_id={filter.id}>
                            {filter.displayName}
                        </Tab>
                    )
                })}
            </FilterTabs>
        </FilterMainContainer>
        </>
};

const mapStateToProps = (state) => ({
    filters: state.feedReducer.filter.filters,
    activeFilterId: state.feedReducer.filter.activeFilterId
});

export default connect(mapStateToProps, {setActiveFilter})(FilterPosts);

