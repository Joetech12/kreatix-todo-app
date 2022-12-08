import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
// import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const style = {
  li: `flex justify-between items-center bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between items-center bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-[10px] cursor-pointer font-bold`,
  text2: `ml-[10px] cursor-pointer font-semibold`,
  text3: `ml-[10px] text-[14px] cursor-pointer`,
  textComplete: `ml-[10px] cursor-pointer line-through font-bold`,
  textComplete2: `ml-[10px] cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  buttonContainer: `flex gap-x-[15px]`,
};

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? 'checked' : ''}
          className="cursor-pointer"
        />
        <div className="">
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}
          >
            {todo.title}
          </p>
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete2 : style.text2}
          >
            {todo.desc}
          </p>
          <p className={style.text3}>{todo.date}</p>
        </div>
      </div>
      <div className={style.buttonContainer}>
        <span onClick={() => deleteTodo(todo.id)} className="cursor-pointer">
          {<FaRegTrashAlt />}
        </span>
      </div>
    </li>
  );
};

export default Todo;
