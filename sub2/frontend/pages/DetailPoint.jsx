import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Map from "../components/Map";
import fishingData from "../dummy/json/fishingDump.json";
import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

const DetailPoint = () => {
  const router = useRouter();

  const {
    id,
    img,
    point_name,
    name,
    address,
    rate,
    reviewCnt,
    category,
    dpwt,
    fish,
    material,
    tide,
  } = router.query;
  const fishArr = fish.split("·");

  // open api 사용
  // XRsWF0UdqsOAqAZVJgqPOw==
  const getInfo = () => {
    axios({
      // url: "http://www.khoa.go.kr/oceangrid/grid/api/ObsServiceObj/search.do",
      // data: {
      //   ServiceKey: "XRsWF0UdqsOAqAZVJgqPOw==",
      //   ResultType: "json",
      // },
      url: "http://www.khoa.go.kr/oceangrid/grid/api/ObsServiceObj/search.do?ServiceKey=XRsWF0UdqsOAqAZVJgqPOw==&ResultType=json",
      dataType: "json",
      method: "GET",
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getInfo();
  return (
    <div>
      <Header />

      <main className="">
        <section className="flex-grow pt-14 px-6">
          <h1 className="text-3xl font-semibold mt-2 mb-6">{point_name}</h1>

          {/* 평점, 저장*/}
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-4 text-red-400" />
              {rate}
              <p className="pl-2 text-sm text-gray-500">({reviewCnt}개의 리뷰)</p>
            </p>
            <p className="flex items-center">
              <HeartIcon className="h-4 text-red-400" />
              저장
            </p>
          </div>
          {/* 사진 부분 */}
          <div className="flex flex-row ">
            <div className="relative h-24 w-40 md:h-72 md:w-96 flex-shrink-0 m-1">
              <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
            </div>
            <div className="grid-rows-2">
              <div className="relative h-24 w-40 md:h-36 md:w-52 flex-shrink-0 mx-1 my-0.5">
                <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
              </div>
              <div className="relative h-24 w-40 md:h-36 md:w-52 flex-shrink-0 mx-1 my-0.5">
                <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
              </div>
            </div>
            <div className="relative h-24 w-40 md:h-72 md:w-96 flex-shrink-0 m-1">
              <Image src={img} layout="fill" objectFit="cover" className="rounded-2xl" />
            </div>
          </div>
          <hr />
        </section>
        {/* tide */}
        <section className="flex-grow pt-14 px-6">
          <h3 className="text-2xl font-semibold mt-2 mb-6">{tide}</h3>
          {/* 물고기 정보*/}
          <div className="grid grid-flow-row grid-cols-2 justify-around pt-5">
            {fishArr.map((value, index) => (
              <p className="flex items-center " key={index}>
                <HeartIcon className="h-4 text-red-400" />
                {value}
              </p>
            ))}
          </div>
          <hr />
        </section>

        {/* 지역소개 */}
        <section className="flex-grow pt-14 px-6">
          <h3 className="text-2xl font-semibold mt-2 mb-6">지역소개</h3>
          {/* 지역 정보*/}
          <div className=" justify-around pt-5">지역소개입니다.</div>
          <hr />
        </section>

        {/* 지도 부분 */}
        <section className=" flex-grow pt-14 px-6 w-max">
          <h3 className="text-2xl font-semibold mt-2 mb-6">포인트 지역</h3>
          <div className="h-[500px] w-[1200px]">
            <Map fishingData={fishingData} />
          </div>
          <h5 className="text-xl font-semibold mt-2 mb-6">{address}</h5>
          <hr />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPoint;
