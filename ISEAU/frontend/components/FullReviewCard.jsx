import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
import { Avatar } from "@material-ui/core";
const FullReviewCard = ({ img, nickname, date, desc }) => {
  const router = useRouter();
  return (
    <div className="my-2 cursor-pointer hover:scale-105 transform transition duration-300 ease-out border-solid border-4 rounded-2xl p-2 ">
      <div className="flex flex-row  w-[350px] ">
        <Avatar className="post-avatar" src={img} />
        <p className="grid-rows-2">
          <p className="pl-2 text-sm "> {nickname}</p>
          <p className="pl-2 text-sm ">
            {date.slice(0, 4)}년 {date.slice(4, 6)}월 {date.slice(6)}일
          </p>
        </p>
      </div>
      <p className=" pl-2 text-sm ">{desc}</p>
    </div>
  );
};

export default FullReviewCard;
