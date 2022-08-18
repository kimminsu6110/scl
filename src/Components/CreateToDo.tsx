import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categories, categoryState, IToDo, toDoState } from './atoms';

interface IForm {
  toDo: string;
  category: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const toDos = useRecoilValue(toDoState);

  const [cat, setCat] = useRecoilState(categories);

  const currentCategory = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: currentCategory },
      ...oldToDos,
    ]);
    localStorage.setItem('tdl', '');
    localStorage.setItem('tdl', JSON.stringify(toDos));
    setValue('toDo', '');
    console.log(cat);
  };

  const handleValidCategory = ({ category }: IForm) => {
    setCat((oldToDos) => [...oldToDos, category]);
    let c = localStorage.getItem('cat');
    if (c == null) {
    } else {
      let ca = JSON.parse(c);
      console.log(ca);
      ca.push(category);
      localStorage.setItem('cat', JSON.stringify(ca));
      setValue('category', '');
    }
  };

  return (
    <>
      {currentCategory != 'other' ? (
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            {...register('toDo', {
              required: 'Please write a To Do',
            })}
            placeholder='Write a to do'
          />
          <button>Add</button>
        </form>
      ) : (
        <form onSubmit={handleSubmit(handleValidCategory)}>
          <input
            {...register('category', {
              required: 'Please write your custom category',
            })}
            placeholder='Write your coustom category'
          />
          <button>Add</button>
        </form>
      )}
    </>
  );
}

export default CreateToDo;
