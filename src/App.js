import React, { useState, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from './util/firebase';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import Todo from './components/Todo';

//   bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
// button: `border p-4 ml-2 bg-purple-500 text-slate-100`,

const style = {
  bg: `h-screen w-screen  bg-[#707070] to-[#1CB5E0] flex `,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-lg shadow-xl p-4 max-h-screen flex flex-col mb-[2rem]`,
  container2: `flex-1`,
  container3: `flex-2 overflow-auto mt-[20px]`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl hover:border-red-300 hover:border-[1px] focus:ring focus:ring-red-300 focus:ring-[2px] outline-none rounded-lg`,
  button: `border p-4 ml-2 bg-[#db6345] hover:bg-[#ba4021] text-slate-100 rounded-lg duration-300`,
  count: `text-center p-2 font-semibold`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [showError, setShowError] = useState(false);

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      setShowError(true);
      return;
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    });
    setInput('');
  };

  // Read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  //   Edit todo in firebase

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.container2}>
          <h3 className={style.heading}>Kreatix Todo App</h3>
          <form onSubmit={createTodo} className={style.form}>
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowError(false);
              }}
              className={style.input}
              type="text"
              placeholder="Add Todo"
            />
            <button className={style.button}>
              <AiOutlinePlus size={30} />
            </button>
          </form>
          {showError && (
            <div className="flex justify-center bg-red-100 py-4 my-2">
              <p className="">Please enter a Todo detail</p>
            </div>
          )}
        </div>
        <div className={style.container3}>
          <ul>
            {todos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        </div>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`Created Todos: ${todos.length}`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
