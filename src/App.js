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
import Spinner from './components/Spinner';
import SortMenu from './components/SortMenu';

//   bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
// button: `border p-4 ml-2 bg-purple-500 text-slate-100`,

const style = {
  bg: `md:h-screen md:w-screen bg-[#707070] to-[#1CB5E0] flex justify-center items-center flex-col md:flex-row md:space-x-[20px]`,
  containerLeft: `bg-slate-100 max-w-[500px] w-full rounded-lg shadow-xl p-4 md:max-h-screen flex flex-col my-[0.2rem]`,
  containerRight: `bg-slate-100 max-w-[500px] w-full rounded-lg shadow-xl px-4 py-4 flex flex-col my-[0.2rem] md:my-[5rem] md:h-full md:my-[5rem] `,
  container2: `flex flex-col items-center justify-center h-full px-[20px]`,
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

  const [showSpinner, setShowSpinner] = useState(false);

  // Read todo from firebase
  useEffect(() => {
    setShowSpinner(true);
    const q = query(collection(db, 'todos'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
    //   const sortTodosArr = todosArr.sort((a, b) =>
    //     a.ide.localeCompare(b.ide)
    //   );

      // const sortTodosArr = todosArr.sort();

      setTodos(todosArr);
      setShowSpinner(false);
    });
    return () => unsubscribe();
  }, []);

  const newTodo = todos.sort((a, b) => a.title.localeCompare(b.title));

  //   const newTodo = todos.sort((a, b) =>
  //     a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  //   );
  const newTodo2 = newTodo.reverse();

  console.log(todos);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed,
    });
  };

  //   Edit todo in firebase
  //   const handleEdit = async (todo, title) => {
  //     await updateDoc(doc(db, 'todos', todo.id), { text: title });
  //   };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id));
  };

  return (
    <div className={style.bg}>
      {/* left login section */}
      <div className={style.containerLeft}>
        <div className={style.container2}>
          <div className="flex flex-col items-center">
            <img src="/logo2.png" alt="" width="100px" />
            <h3 className={style.heading}>Kreatix Todo App</h3>
            <h3 className="">Version 1.1.5</h3>
          </div>
          <AddTodo setShowError={setShowError} />
          {showError && (
            <div className="flex justify-center w-full bg-red-100 py-4 my-2">
              <p className="">Please add Todo Title</p>
            </div>
          )}
          <p className="text-[14px] mt-[30px] hidden md:block">
            © Kreatix Technologies - 2022
          </p>
        </div>
      </div>

      {/* Right Todo section */}
      <div className={style.containerRight}>
        <h3 className="text-[30px] font-bold my-[10px] flex justify-center">
          Todo Lists
        </h3>
        <SortMenu />
        <div className={style.container3}>
          <ul>
            {showSpinner && <Spinner fillColor="#db6345" />}
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

        {!todos && <p className="">Loading</p>}
        {todos.length < 1 ? null : (
          <p className={style.count}>{`Created Todos: ${todos.length}`}</p>
        )}

        <p className="text-[14px] mt-[30px] md:hidden w-full flex justify-center">
          © Kreatix Technologies - 2022
        </p>
      </div>
    </div>
  );
}

export default App;
