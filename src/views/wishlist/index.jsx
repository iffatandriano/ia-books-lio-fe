import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

import Button from '../../components/Button';
import CardContainer from '../../components/card/CardContainer';
import CardItem from '../../components/card/CardItem';

import useWishlistStore from '../../store/wishlists';

import { deleteWishlistById, getAllWishlist } from '../../services/wishlist';

const WishlistPage = () => {
    const { 
        paramsWishlist, 
        setParamsWishlist,
        setRecords,
        setNewRecords, 
        emptyMoreWishlist,
        setEmptyMoreWishlist,
        records, 
        setIsLoading,
        isLoadingMore,
        setIsLoadingMore,
    } = useWishlistStore();

    useEffect(() => {
        if(paramsWishlist) {
            async function fetchWishlist(params) {
                const resp = await getAllWishlist(params);

                if(_.isEmpty(resp.data)) {
                    return setEmptyMoreWishlist(true);
                }
    
                if(params.page !== 0) {
                    setRecords(resp.data);
                    setIsLoadingMore(false);
                } else {
                    setNewRecords(resp.data);
                    setIsLoadingMore(false);
                }
                
            }

            setEmptyMoreWishlist(false);
            fetchWishlist(paramsWishlist);
        }
            
    }, [paramsWishlist, setNewRecords, setRecords, setIsLoadingMore, setEmptyMoreWishlist]);

    const onLoadMoreWishlist = useCallback(() => {
        setIsLoadingMore(true);
        setParamsWishlist({
            ...paramsWishlist,
            page: paramsWishlist.page + 1,
        })
    }, [setIsLoadingMore, paramsWishlist, setParamsWishlist]);

    const onDeleteWishlist = useCallback(async (id) => {
        await setIsLoading(true);

        await deleteWishlistById(id);

        const getWishlist = await getAllWishlist(paramsWishlist);

        setNewRecords(getWishlist?.data);

    }, [setNewRecords, setIsLoading, paramsWishlist]);

    return (
        <React.Fragment>
            <section className='section p-b-30'>
                <div className='container'>
                    <h1 className='title'>
                        <span className='has-text-centered is-block'>Your Favorite / Wishlist Book's</span>
                    </h1>
                </div>
            </section>
            <CardContainer>
                {
                    _.isEmpty(records) ? (
                        <h4 className='subtitle has-text-centered i-5' style={{color: 'red'}}>
                            You don't have any wishlist yet.
                        </h4>
                    ) : (
                        <React.Fragment>
                            <div className='columns is-multiline'>
                                {
                                    records?.map((book, bookIndex) => (
                                        <CardItem 
                                            key={bookIndex}
                                            books={records}
                                            id={book.id}
                                            title={book.title}
                                            description={book.description}
                                            wishlists={records}
                                            authors={book.authors}
                                            rating={book.rating}
                                            thumbnail={JSON.parse(book.images)?.thumbnail}
                                            onClick={() => onDeleteWishlist(book._id)}
                                        />
                                    ))
                                }
                            </div>
                            {
                                !emptyMoreWishlist && records?.length >= 8 ? (
                                    <div className='buttons'>
                                        <Button 
                                            label="View More Wishlist"
                                            styles="is-primary"
                                            isLoading={isLoadingMore}
                                            onClick={onLoadMoreWishlist}
                                            disabled={isLoadingMore}
                                        />
                                    </div>
                                ) : null
                            }
                        </React.Fragment>
                    )
                }
            </CardContainer>
        </React.Fragment>
    );
};

export default WishlistPage;