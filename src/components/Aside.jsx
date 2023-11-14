import React from "react";

const Aside = () => {
  return (
    <div className="hidden p-6 lg:flex justify-start items-start">
      <ul className="border p-4 rounded border-gray">
        <li className="border-b-[1px] cursor-pointer mb-2 border-gray pb-2">
          #Global
        </li>
        <li className="border-b-[1px] cursor-pointer mb-2 border-gray pb-2">
          #Trend
        </li>
        <li className="border-b-[1px] cursor-pointer mb-2 border-gray pb-2">
          #Community
        </li>
        <li className=" cursor-pointer">#Local News</li>
      </ul>
    </div>
  );
};

export default Aside;
