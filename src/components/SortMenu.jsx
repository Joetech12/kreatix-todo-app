import React from 'react';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { AiOutlineSortDescending } from 'react-icons/ai';

const SortMenu = ({ sortTitleAsc, sortTitleDes, sortDateAsc, sortDateDes }) => {
  return (
    <div className="flex justify-between font-bold w-full mb-[15px]">

        {/* Title menu */}
      <div className="flex items-center">
        <p className="mr-[15px] text-[13px]">Title</p>
        <button
          onClick={() => {
            sortTitleAsc();
          }}
          className="text-[20px] cursor-pointer mr-[15px]"
        >
          <AiOutlineSortAscending />
        </button>
        <button onClick={() =>{
            sortTitleDes()
        }}className="text-[20px] cursor-pointer">
          <AiOutlineSortDescending />
        </button>
      </div>

      {/* Date menu */}
      <div className="flex items-center">
        <p className="mr-[15px] text-[13px]">Date</p>
        <button
          onClick={() => {
            sortDateAsc();
          }}
          className="text-[20px] cursor-pointer mr-[15px]"
        >
          <AiOutlineSortAscending />
        </button>
        <button onClick={() =>{
            sortDateDes()
        }}className="text-[20px] cursor-pointer">
          <AiOutlineSortDescending />
        </button>
      </div>
      
    </div>
  );
};

export default SortMenu;
