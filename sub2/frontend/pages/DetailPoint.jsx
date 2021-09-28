import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import Image from "next/image";
import Map from "../components/Map";
import reviewData from "../dummy/json/reviewDump.json";
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
      url: "http://www.khoa.go.kr/oceangrid/grid/api/fcIndexOfType/search.do?ServiceKey=XRsWF0UdqsOAqAZVJgqPOw==&Type=SF&ResultType=json",
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
  // 5개의 데이터만 보여주기
  let topReview = Object.assign([], reviewData);
  topReview.length = 5;
  // 모달
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  const scroll = useRef(null);
  function openModal() {
    setIsOpen(true);
  }
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

        {/* 리뷰 */}
        <section className="flex-grow pt-14 px-6">
          <h3 className="text-2xl font-semibold mt-2 mb-6 flex flex-row">
            <p className="flex items-center">
              <StarIcon className="h-4 text-red-400" />
              {rate + `  `}
              {reviewCnt}개의 리뷰
            </p>
          </h3>
          {/* 리뷰 컴포넌트*/}
          <div className=" justify-around pt-5">
            <p className="flex items-center"></p>
            <div className="flex space-x-3 overflow-scroll scrollbar-hide ">
              {topReview.map(({ img, nickname, date, desc }, index) => (
                <ReviewCard key={index} img={img} nickname={nickname} date={date} desc={desc} />
              ))}
            </div>
          </div>
          <div
            className="my-3 p-3 border-solid border-2 rounded-xl w-max cursor-pointer hover:scale-105 transform transition duration-300 ease-out "
            onClick={openModal}
          >
            <p>{reviewCnt}개의 리뷰 모두 보기</p>
          </div>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-y-0 left-1/2 -translate-x-1/2 z-10 "
              onClose={closeModal}
              initialFocus={scroll}
            >
              <div className="max-h-3/4 text-center mt-20 w-max bg-white shadow-xl rounded-2xl border-solid border-4 border-gray-500 overflow-auto scrollbar-hide">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 " />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span className="inline-block h-screen align-middle" aria-hidden="true">
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform ">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      전체 리뷰 보기
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {reviewData.map(({ img, nickname, date, desc }, index) => (
                          <ReviewCard
                            key={index}
                            img={img}
                            nickname={nickname}
                            date={date}
                            desc={desc}
                          />
                        ))}
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                        ref={scroll}
                      >
                        창 닫기
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>

          <hr />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DetailPoint;
