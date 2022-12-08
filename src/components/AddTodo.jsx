import React, { useState } from 'react';
import { db } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';

const style = {
  form: `flex flex-col w-full gap-y-[17px] mt-[20px] justify-between`,
  input: `border p-2 w-full text-[16px] hover:border-red-300 hover:border-[1px] focus:ring focus:ring-red-300 focus:ring-[2px] outline-none rounded-lg`,
  button: `border p-2 flex justify-center bg-[#db6345] hover:bg-[#ba4021] text-slate-100 rounded-lg duration-300`,
  buttonText: `font-semibold`,
};

const AddTodo = ({ setShowError }) => {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      setShowError(true);
      return;
    }
    let dates = new Date();
    let date =
      dates.getDate() + '/' + dates.getMonth() + '/' + dates.getFullYear();

    let times = new Date();
    let time =
      times.getHours() + ':' + times.getMinutes() + ':' + times.getSeconds();

    const update = date + ' ' + time;

    const update2 =
      dates.getDate() +
      dates.getMonth() +
      dates.getFullYear() +
      times.getHours() +
      times.getMinutes() +
      times.getSeconds();

    await addDoc(collection(db, 'todos'), {
      title: input,
      desc: input2,
      completed: false,
      date: update,
      ide: update2
    });

    setInput('');
    setInput2('');
  };

  return (
    <form onSubmit={createTodo} className={style.form}>
      <input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowError(false);
        }}
        className={style.input}
        type="text"
        placeholder="Todo Title*"
      />
      <input
        value={input2}
        onChange={(e) => {
          setInput2(e.target.value);
          setShowError(false);
        }}
        className={style.input}
        type="text"
        placeholder="Todo Description"
      />

      <button className={style.button}>
        {/* <AiOutlinePlus size={30} /> */}
        <span>{/* <SpinnerButton /> */}</span>
        <p className={style.buttonText}>Add Todo</p>
      </button>
    </form>
  );
};

export default AddTodo;
