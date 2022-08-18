import { format } from 'path';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categories, categoryState, toDoSelector, toDoState } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const categoryIndex = useRecoilValue(categories);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <div>
      <CreateToDo />
      <hr />
      <select value={category} onInput={onInput}>
        {categoryIndex?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option key='other' value='other'>
          other
        </option>
      </select>

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}
export default ToDoList;
