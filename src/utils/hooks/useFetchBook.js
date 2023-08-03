import { useCallback, useEffect } from 'react'
import _ from 'lodash';

import useBookStore from '../../store/books'
import { getCategoryBooks, getSearchBook } from '../../services';

export default function useFetchBook(params, search) {
    const {
        isLoading,
        isLoadingMore,
        error,
        records,
        setIsLoading,
        setIsLoadingMore,
        setRecords,
        setNewRecords,
        setError,
        setEmptyMoreBooks,
        emptyMoreBooks
    } = useBookStore()

    const sendQuery = useCallback(async () => {
        try {
            await setIsLoading(true);
            await setEmptyMoreBooks(false);

            if(error) {
                setIsLoading(false);
                return;
            }

            await setError(false);

            if(search !== "") {
                const searchResp = await getSearchBook(params);

                if(_.isEmpty(searchResp.data)) {
                    setIsLoading(false);
                    setEmptyMoreBooks(true);
                    return;
                }

                if(params.page !== 1) {
                    setRecords(searchResp?.data);
                } else {
                    setNewRecords(searchResp?.data);
                }
            } else {
                const categoryResp = await getCategoryBooks(params);

                if(_.isEmpty(categoryResp?.data)) {
                    setIsLoading(false);
                    setEmptyMoreBooks(true);
                    return;
                }

                if(params.page !== 1) {
                    setRecords(categoryResp?.data);
                } else {
                    setNewRecords(categoryResp?.data);
                }
            }

            setIsLoading(false);
            setIsLoadingMore(false);
        } catch(error) {
            setError(error);
        }
    }, [
        params, 
        setIsLoading, 
        setIsLoadingMore,
        setError, 
        setRecords, 
        error, 
        setNewRecords, 
        search, 
        setEmptyMoreBooks
    ]);

    useEffect(() => {
        sendQuery(params);
    }, [params, sendQuery])

  return { isLoading, isLoadingMore, error, records, emptyMoreBooks }
}
