import { atom, selector } from 'recoil';

export enum Categories {
  'TO_DO',
  'DOING',
  'DONE',
}
type categories = 'TO_DO' | 'DOING' | 'DONE';

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}
export const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});
export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category == category);
  },
});
