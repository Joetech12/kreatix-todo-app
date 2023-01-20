import React from 'react';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { AiOutlineSortDescending } from 'react-icons/ai';

const SortMenu = ({ sortTitleAsc, sortTitleDes, sortDateAsc, sortDateDes }) => {
  return (
    <div className="flex justify-between font-bold w-full mb-[5px]">

        {/* Title menu */}
      <div className="flex items-center">
        <span className="material-icons text-red-300">school</span>
        <p className="mr-[10px] text-[13px]">Title</p>
        <button
          onClick={() => {
            sortTitleAsc();
          }}
          className="text-[20px] cursor-pointer mr-[5px] hover:bg-slate-300 duration-300 p-[5px]"
        >
          <AiOutlineSortAscending />
        </button>
        <button onClick={() =>{
            sortTitleDes()
        }}className="text-[20px] cursor-pointer hover:bg-slate-300 duration-300 p-[5px]">
          <AiOutlineSortDescending />
        </button>
      </div>

      {/* Date menu */}
      <div className="flex items-center">
        <p className="mr-[10px] text-[13px]">Date</p>
        <button
          onClick={() => {
            sortDateAsc();
          }}
          className="text-[20px] cursor-pointer mr-[5px] hover:bg-slate-300 duration-300 p-[5px]"
        >
          <AiOutlineSortAscending />
        </button>
        <button onClick={() =>{
            sortDateDes()
        }}className="text-[20px] cursor-pointer hover:bg-slate-300 duration-300 p-[5px]">
          <AiOutlineSortDescending />
        </button>
      </div>
      
    </div>
  );
};

export default SortMenu;
