import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categories, IToDo, toDoState } from './atoms';
interface IForm {
  toDo: string;
}

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryIndex = useRecoilValue(categories);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id == id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <li>
      <span>{text}</span>
      {categoryIndex?.map((cat) => {
        if (cat != category) {
          return (
            <button name={cat} onClick={onClick}>
              {cat}
            </button>
          );
        }
      })}
    </li>
  );
}

export default ToDo;
