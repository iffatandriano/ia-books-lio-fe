import React, { useCallback } from 'react';

import useBookStore from '../../../store/books';

import { BiSearchAlt } from 'react-icons/bi'

const Search = ({ searchBook, setSearchBook }) => {
    const { params, setParams } = useBookStore();

    const onSearch = useCallback((e) => {
        const search = e.target.value;
        setSearchBook(search);

        setParams({
            ...params,
            search: search,
            page: search === "" || params.page !== 1 ? 1 : params.page
        })
    }, [params, setParams, setSearchBook])

    return (
        <section className='section p-b-30'>
                <div className='container'>
                    <div className='has-text-centered' id="services-text-centered">
                        <h2 className='subtitle is-block'>Search hundreds of thousands of books, and writer.</h2>
                        <h1 className="title is-1 is-block">Find A Book You Want To Know.</h1>
                        <div className="columns is-centered">
                            <div className="column is-7">
                                <div className="search-form">
                                        <div className="field has-addons has-shadow-field">
                                            <div className="control has-icons-left has-icons-right is-expanded">
                                                <input type="text" id="mainSearch" defaultValue={searchBook} placeholder="Search Book Titles, Authors, Publishers" className="input is-large is-rounded is-focused" onChange={onSearch} /> 
                                                <span className='icon is-small is-left'>
                                                    <BiSearchAlt />
                                                </span>
                                            </div> 
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default Search;