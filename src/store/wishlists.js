import { create } from "zustand";

const useWishlistStore = create((set) => ({
    isLoading: false,
    isLoadingMore: false,
    records: [],
    record: {},
    error: false,
    emptyMoreWishlist: false,
    paramsWishlist: {
        page: 0,
    },
    setIsLoading: (values) => set({ isLoading: values}),
    setIsLoadingMore: (values) => set({isLoadingMore: values}),
    setRecords: (datas) => set((prev) => ({
        records: [...prev.records, ...datas]
    })),
    setNewRecords: (datas) => set({ records: datas}),
    setRecord: (data) => set({ record: data}),
    setParamsWishlist: (params) => set({ paramsWishlist: params}),
    setPage: () => set((prev) => set({
        page: prev.page + 1,
    })),
    setEmptyMoreWishlist: (values) => set({ emptyMoreWishlist: values }),
    resetRecord: () => set({
        record: {}
    })
}));

export default useWishlistStore;