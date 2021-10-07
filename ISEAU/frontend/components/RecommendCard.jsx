import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import img from "../img/loc.jpeg";
const RecommendCard = ({ id, fishingimg, pointName, address, rating, category }) => {
  return (
    <div className="sm:w-[372px] cursor-pointer hover:opacity-70 hover:shadow-lg transition duration-300 ease-out">
      <div className="relative h-80 w-[372px]">
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-blue-500 ">[{category === 0 ? "갯바위" : "선상"}]</p>
      </div>
      <div className="flex justify-between mt-1">
        <h3 className="text-1xl font-bold">
          [{address}] {pointName}
        </h3>
        <p className="flex items-center ">
          <StarIcon className="h-4 text-red-400" />
          {rating}
        </p>
      </div>
      {/* <div className="flex justify-between">
        <p className="pt-1 text-sm text-gray-500 ">어종 : {description.fish}</p>
      </div> */}
    </div>
  );
};

export default RecommendCard;
