import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';

import Button from '../../../components/Button';
import CardContainer from '../../../components/card/CardContainer';
import CardItem from '../../../components/card/CardItem';

import useBookStore from '../../../store/books';
import useWishlistStore from '../../../store/wishlists';

import { createWishlist, deleteWishlistById, getAllWishlist } from '../../../services/wishlist';

const ListBook = ({ books, emptyMoreBooks }) => {
    const { isLoadingMore, params, setParams, setIsLoadingMore } = useBookStore();
    const { records, setNewRecords, setRecords, paramsWishlist, setIsLoading } = useWishlistStore();

    useEffect(() => {
        if(paramsWishlist) {
            async function fetchWishlist(params) {
                const resp = await getAllWishlist(params);
    
                setNewRecords(resp.data);
            }
            
            fetchWishlist(paramsWishlist);
        }
    }, [paramsWishlist, setNewRecords])

    const onLoadMoreBook = useCallback(() => {
        setIsLoadingMore(true);
        setParams({
            ...params,
            page: params.page + 1,
        })
    }, [setIsLoadingMore, params, setParams]);

    const handleAddWishlist = useCallback(async (data) => {
        if(_.some(records, (wishlist) => wishlist.id === data.id)) {
            await setIsLoading(true);
            const wishlistId = _.filter(records, (item) => item.id === data.id)[0];
            await deleteWishlistById(wishlistId._id);

            const getWishlist = await getAllWishlist(paramsWishlist);

            setNewRecords(getWishlist?.data);
    
            setIsLoading(false);
        } else {
            const datas = {
                ...data,
                images: JSON.stringify(data.images),
            }
    
            await setIsLoading(true);
            await createWishlist(datas);

            const getWishlist = await getAllWishlist(paramsWishlist);

            if(_.isEmpty(records)) {
                setNewRecords(getWishlist?.data);
            } else {
                setRecords(getWishlist?.data);
            }
    
            setIsLoading(false);
        }
    }, [setNewRecords, setRecords, paramsWishlist, setIsLoading, records])

    return (
        <CardContainer>
            <div className='columns is-multiline'>
                {
                    books?.map((book, bookIndex) => (
                        <CardItem 
                            key={bookIndex}
                            books={books}
                            id={book.id}
                            title={book.title}
                            description={book.description}
                            wishlists={records}
                            authors={book.authors}
                            rating={book.rating}
                            thumbnail={book.images.thumbnail}
                            onClick={() => handleAddWishlist(book)}
                        />
                    ))
                }
            </div>
                {
                    !emptyMoreBooks && books.length >= 8 ? (
                        <div className='buttons'>
                            <Button 
                                label="View More books"
                                styles="is-primary"
                                isLoading={isLoadingMore}
                                onClick={onLoadMoreBook}
                                disabled={isLoadingMore}
                            />
                        </div>
                    ) : null
                }
        </CardContainer>
    );
};

export default ListBook;