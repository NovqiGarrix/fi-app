import { atom } from 'jotai';

export const selectedCategoryFilterAtom = atom<string>('all');

export const excludeCategoryChartFilterAtom = atom<string[]>([]);