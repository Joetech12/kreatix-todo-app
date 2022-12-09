import React, { useState } from 'react';
import { db } from '../util/firebase';
import { collection, addDoc } from 'firebase/firestore';
import SpinnerButton from './SpinnerButton';

const style = {
  form: `flex flex-col w-full gap-y-[17px] mt-[20px] justify-between`,
  input: `border p-2 w-full text-[16px] hover:border-red-300 hover:border-[1px] focus:ring focus:ring-red-300 focus:ring-[2px] outline-none rounded-lg`,
  button: `border p-2 flex justify-center bg-[#db6345] hover:bg-[#ba4021] text-slate-100 rounded-lg duration-300`,
  buttonText: `font-semibold`,
};

const AddTodo = ({
  setShowError,
  toggleSpinner,
  setToggleSpinner,
  showError,
}) => {
  const [input, setInput] = useState('');
  const [input2, setInput2] = useState('');
  const [showButtonText, setShowButtonText] = useState(true);

  const showSpinner = () => {
    // setTimeout(() => {
    //   setToggleSpinner(true);
    //   setShowButtonText(false);
    // }, 500);
    // setTimeout(() => {
    //   setToggleSpinner(false);
    //   setShowButtonText(true);
    // }, 1600);
    setToggleSpinner(true);
    setShowButtonText(false);
  };

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

    await addDoc(collection(db, 'todos'), {
      title: input,
      desc: input2,
      completed: false,
      date: update,
    });
    setToggleSpinner(false);
    setShowButtonText(true);
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

      <button
        className={style.button}
        onClick={() => {
          if (input !== '') {
            showSpinner();
            return;
          }
        }}
      >
        {/* <AiOutlinePlus size={30} /> */}
        <span>{toggleSpinner && <SpinnerButton />}</span>
        {showButtonText && <p className={style.buttonText}>Add Todo</p>}
      </button>
    </form>
  );
};

export default AddTodo;
