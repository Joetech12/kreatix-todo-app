import React from 'react';
import { AiOutlineSortAscending } from 'react-icons/ai';
import { AiOutlineSortDescending } from 'react-icons/ai';

const SortMenu = ({sortTodos}) => {
  return (
    <div className="flex justify-between font-bold w-full">
      <button className="flex items-center" onClick={sortTodos}>
        <p className="mr-[10px] text-[13px]">Title</p>
        <p className="text-[20px] cursor-pointer mr-[10px]">
            <AiOutlineSortAscending />
        </p>
        <p className="text-[20px] cursor-pointer">
            <AiOutlineSortDescending />
        </p>
      </button>
      <div className="flex items-center">
        <p className="mr-[10px] text-[13px]">Date</p>
        <p className="text-[20px] cursor-pointer mr-[10px]">
            <AiOutlineSortAscending />
        </p>
        <p className="text-[20px] cursor-pointer">
            <AiOutlineSortDescending />
        </p>
      </div>
    </div>
  );
};

export default SortMenu;
