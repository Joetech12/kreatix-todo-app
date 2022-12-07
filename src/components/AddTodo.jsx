import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';

const style = {
  form: `flex flex-col w-full gap-y-[17px] mt-[20px] justify-between`,
  input: `border p-2 w-full text-[16px] hover:border-red-300 hover:border-[1px] focus:ring focus:ring-red-300 focus:ring-[2px] outline-none rounded-lg`,
  button: `border p-2  bg-[#db6345] hover:bg-[#ba4021] text-slate-100 rounded-lg duration-300`,
  buttonText: `font-semibold`
};

const AddTodo = ({ setShowError }) => {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '' || input2 === '') {
      setShowError(true);
      return;
    }
    await addDoc(collection(db, 'todos'), {
      title: input,
      desc: input2,
      completed: false,
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
        placeholder="Todo Title"
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
        <p className={style.buttonText}>Add Todo</p>
      </button>
    </form>
  );
};

export default AddTodo;
