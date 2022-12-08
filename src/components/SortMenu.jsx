import React from 'react';
import { FaSortDown } from 'react-icons/fa';
import { FaSortUp } from 'react-icons/fa';

const SortMenu = () => {
  return (
    <div className="flex justify-between font-bold w-full">
      <div className="flex cursor-pointer">
        <p className="mr-[5px] text-[13px]">Sort by title</p>
        <FaSortDown />
      </div>
      <div className="flex cursor-pointer">
        <p className="mr-[5px] text-[13px]">Sort by date</p>
        <FaSortDown />
      </div>
    </div>
  );
};

export default SortMenu;
