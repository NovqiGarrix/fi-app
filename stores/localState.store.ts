import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface LocalStateStore {
    selectedCategoryForExpenseListFilter: string;
    excludedCategoriesForExpenseChartFilter: string[];

    setSelectedCategoryForExpenseListFilter: (categoryId: string) => void;
    setExcludedCategoriesForExpenseChartFilter: (categoryIds: string[]) => void;
}

const useLocalStateStore = create(
    persist<LocalStateStore>(
        (set) => ({
            selectedCategoryForExpenseListFilter: 'all',
            excludedCategoriesForExpenseChartFilter: [],

            setSelectedCategoryForExpenseListFilter: (categoryId) => set(() => ({ selectedCategoryForExpenseListFilter: categoryId })),
            setExcludedCategoriesForExpenseChartFilter: (categoryIds) => set(() => ({ excludedCategoriesForExpenseChartFilter: categoryIds })),
        }),
        {
            name: "local-state-store",
            storage: createJSONStorage(() => ({
                getItem: AsyncStorage.getItem,
                setItem: AsyncStorage.setItem,
                removeItem: AsyncStorage.removeItem,
            }))
        }
    )
);

export const useSelectedCategoryForExpenseListFilter = () => useLocalStateStore((state) => state.selectedCategoryForExpenseListFilter);
export const useSetSelectedCategoryForExpenseListFilter = () => useLocalStateStore((state) => state.setSelectedCategoryForExpenseListFilter);
export const useSetExcludedCategoriesForExpenseChartFilter = () => useLocalStateStore((state) => state.setExcludedCategoriesForExpenseChartFilter);

export const useExcludedCategoriesForExpenseChartFilter = () => useLocalStateStore((state) => state.excludedCategoriesForExpenseChartFilter);
