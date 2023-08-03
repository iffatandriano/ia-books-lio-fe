import { create } from "zustand";

const useBookStore = create((set) => ({
    isLoading: false,
    isLoadingMore: false,
    records: [],
    record: {},
    error: false,
    emptyMoreBooks: false,
    params: {
        search: 'Autobiography',
        limit: 8,
        page: 1,
    },
    setIsLoading: (values) => set({ isLoading: values }),
    setIsLoadingMore: (values) => set({ isLoadingMore: values }),
    setRecords: (datas) => set((prev) => ({ records: [...prev.records, ...datas]})),
    setNewRecords: (datas) => set({ records: datas }),
    setRecord: (data) => set({ record: data }),
    setParams: (params) => set({ params: params }),
    setError: (error) => set({ error: error }),
    setPage: () => set((prev) => set({
        page: prev.page + 1,
    })),
    setEmptyMoreBooks: (values) => set({ emptyMoreBooks: values }),
    resetRecord: () => set({ record: {} })
}))

export default useBookStore;