import axios from 'axios';
import env from '../configs/environment';
import useBookStore from '../store/books';

const axiosInstance = axios.create({
    baseURL: env.BASE_URL
})

const endpoint = {
    search: 'books',
    category: 'books/category'
}

const getCategoryBooks = (params) => axiosInstance.get(endpoint.category, { params })
                                        .then((response) => {
                                            return response.data;
                                        })
                                        .catch((error) => {
                                            useBookStore.setState(() => ({
                                                isLoading: false,
                                                error: error?.message
                                            }));

                                            return error;
                                        });

const getSearchBook = (params) => axiosInstance.get(endpoint.search, { params })
                                        .then((response) => {
                                            return response.data;
                                        })
                                        .catch((error) => {
                                            useBookStore.setState(() => ({
                                                isLoading: false,
                                                error: error?.message
                                            }));

                                            return error;
                                        });

export {
    axiosInstance,
    getCategoryBooks,
    getSearchBook
}