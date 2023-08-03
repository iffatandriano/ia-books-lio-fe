import React, { useState } from 'react';

import PopularCategories from './property/PopularCategories';
import Search from './property/Search';
import ListBook from './property/ListBook';

import useBookStore from '../../store/books';
import useFetchBook from '../../utils/hooks/useFetchBook';

const BooksPage = () => {
    const [searchBook, setSearchBook] = useState('');
    const { params } = useBookStore()

    const { isLoading, isLoadingMore, records, emptyMoreBooks } = useFetchBook(params, searchBook);

    return (
        <React.Fragment>
            <Search 
                searchBook={searchBook}
                setSearchBook={setSearchBook}
            />
            {
                searchBook === "" ? (
                    <PopularCategories />
                ) : (
                    <section className='section'>
                        <div className='container'>
                            <h1 className='title'>
                                Search Results..
                            </h1>
                        </div>
                    </section>
                )
            }
            {
                isLoading && !isLoadingMore ? null : (
                    <ListBook books={records} emptyMoreBooks={emptyMoreBooks} />
                )
            }
        </React.Fragment>
    );
};

export default BooksPage;