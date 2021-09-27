import React from "react";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";

const ReviewCard = ({
  id,
  img,
  point_name,
  name,
  address,
  rate,
  reviewCnt,
  category,
  description,
}) => {
  const router = useRouter();
  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer
    hover:opacity-80 hover:shadow-lg transition duration-200 ease-out
    first:border-t 
    "
    >
      {/* 사진 부분 */}
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
      </div>
      {/* 설명 부분 */}
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>
            [{name}] {address}
          </p>
          <HeartIcon className="h-7 cursor-pointer" />
        </div>
        <h4 className="text-xl">
          {point_name} ({category})
        </h4>
        <div className="border-b w-10 pt-2" />
        <p className="pt-2 text-sm text-gray-500 flex-grow">어종 : {description.fish}</p>
        <p className="pt-2 text-sm text-gray-500 flex-grow">적정 물때 : {description.tide}</p>
        <p className="pt-2 text-sm text-gray-500 flex-grow">
          수심 : {description.dpwt}m / 지면 : {description.material}
        </p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-4 text-red-400" />
            {rate}
            <p className="pl-2 text-sm text-gray-500">({reviewCnt}개의 리뷰)</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
