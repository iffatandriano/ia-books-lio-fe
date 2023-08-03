import axios from 'axios';
import env from '../configs/environment';
import useWishlistStore from '../store/wishlists';

const axiosInstance = axios.create({
    baseURL: env.BASE_URL
});

const endpoint = {
    wishlist: 'wishlist'
}

const getAllWishlist = (params) => axiosInstance.get(endpoint.wishlist, {
    params
})
                                .then((response) => {
                                    return response.data;
                                })
                                .catch((error) => {
                                    useWishlistStore.setState(() => ({
                                        isLoading: false,
                                        error: error?.message
                                    }));

                                    return error;
                                });

const createWishlist = (data) => axiosInstance.post(endpoint.wishlist, data)
                                    .then((response) => {
                                        return response.data;
                                    })
                                    .catch((error) => {
                                        useWishlistStore.setState(() => ({
                                            isLoading: false,
                                            error: error?.message
                                        }))

                                        return error;
                                    })

const deleteWishlistById = (id) => axiosInstance.delete(`${endpoint.wishlist}/${id}`)
                                        .then((response) => {
                                            return response.data;
                                        })
                                        .catch((error) => {
                                            useWishlistStore.setState(() => ({
                                                isLoading: false,
                                                error: error?.message
                                            }))

                                            return error;
                                        })

export {
    axiosInstance,
    createWishlist,
    getAllWishlist,
    deleteWishlistById
}                                