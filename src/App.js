import React, { useState, useEffect } from 'react';
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
import AddTodo from './components/AddTodo';

//   bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
// button: `border p-4 ml-2 bg-purple-500 text-slate-100`,

const style = {
  bg: `h-screen w-screen bg-[#707070] to-[#1CB5E0] flex justify-center space-x-[20px]`,
  container: `bg-slate-100 max-w-[500px] w-full rounded-lg shadow-xl p-4 max-h-screen flex flex-col my-[2rem]`,
  container2: `flex flex-col items-center mt-[7rem] h-full px-[20px]`,
  container3: `overflow-auto grow`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl hover:border-red-300 hover:border-[1px] focus:ring focus:ring-red-300 focus:ring-[2px] outline-none rounded-lg`,
  button: `border p-4 ml-2 bg-[#db6345] hover:bg-[#ba4021] text-slate-100 rounded-lg duration-300`,
  count: `text-center p-2 font-semibold`,
};

function App() {
  const [todos, setTodos] = useState([]);

  const [showError, setShowError] = useState(false);

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
  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, 'todos', todo.id), { text: title });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      {/* left login section */}
      <div className={style.container}>
        <div className={style.container2}>
          <div className="flex flex-col items-center">
              <img src="/logo2.png" alt="" width="100px" />
              <h3 className={style.heading}>Kreatix Todo App</h3>
              <h3 className="">Version 1.1.5</h3>
          </div>
          <AddTodo setShowError={setShowError} />
          {showError && (
            <div className="flex justify-center w-full bg-red-100 py-4 my-2">
              <p className="">Please enter a Todo detail</p>
            </div>
          )}
          <p className="text-[14px] mt-[30px]">© Kreatix Technologies - 2022</p>
        </div>
      </div>
      {/* Right Todo section */}
      <div className={style.container}>
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
