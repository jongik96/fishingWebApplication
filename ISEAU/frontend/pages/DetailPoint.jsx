import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState, useRef, useEffect, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReviewCard from "../components/ReviewCard";
import FullReviewCard from "../components/FullReviewCard";
import Image from "next/image";
import DetailMap from "../components/DetailMap";
import axios from "axios";
import DatePicker from "react-datepicker";
import { StarIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import "react-datepicker/dist/react-datepicker.css";
import fisherman from "../img/fisherman.jpg";
import ReviewWriteCard from "../components/ReviewWriteCard";
import ReviewUpdateCard from "../components/ReviewUpdateCard";
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../store/modules/review";
import * as reviewArrActions from "../store/modules/reviewArr";

const DetailPoint = () => {
  const [tideArr, setTideArr] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isScraped, setIsScraped] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [topReviewArr, setTopReviewArr] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const point = useSelector(({ detailPoint }) => detailPoint);
  const user = useSelector(({ user }) => user);
  const review = useSelector(({ review }) => review);
  const reviewArr = useSelector(({ reviewArr }) => reviewArr);
  // id값으로 detailpoint 상태값 저장
  const dispatch = useDispatch();
  const setReview = useCallback(
    (value) => {
      dispatch(reviewActions.setReview(value));
    },
    [dispatch]
  );
  const setReviewArr = useCallback(
    (value) => {
      dispatch(reviewArrActions.setReviewArr(value));
    },
    [dispatch]
  );
  const getToday = () => {
    const today = new Date(selectedDate);
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2);
    const day = ("0" + today.getDate()).slice(-2);
    const dateString = year + "" + month + "" + day;
    return dateString;
  };
  // open api 사용
  // XRsWF0UdqsOAqAZVJgqPOw==
  const getTideInfo = () => {
    axios({
      url:
        "http://www.khoa.go.kr/oceangrid/grid/api/tideObsPreTab/search.do?ServiceKey=XRsWF0UdqsOAqAZVJgqPOw==&ObsCode=" +
        point.obsCode +
        "&Date=" +
        getToday() +
        "&ResultType=json",
      dataType: "json",
      method: "GET",
    })
      .then((response) => {
        setTideArr(response.data.result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTideInfo();
  }, [selectedDate]);

  // 모달

  function closeModal() {
    setIsOpen(false);
  }
  const scroll = useRef(null);
  function openModal() {
    setIsOpen(true);
    if (scroll.current != null) scroll.current.scrollTop = 0;
  }

  // 스크랩 기능 백엔드 통신
  useEffect(() => {
    getIsScraped();
    getReview();
    const newReviewArr = Object.assign([], reviewArr);
    setTopReviewArr(newReviewArr);
  }, [point]);

  // 현재 포인트가 스크랩됐는지 받아오기
  const getIsScraped = async () => {
    await axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/scrap/list/" + user.id,
      dataType: "json",
      method: "GET",
    })
      .then((response) => {
        console.log("in getIsScraped");
        console.log(response);
        let check = false;
        response.data.forEach((element) => {
          if (element.id === point.id) {
            setIsScraped(true);
            check = true;
          }
          if (!check) {
            setIsScraped(false);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //현재 포인트의 리뷰 받아오기
  const getReview = async () => {
    await axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/" + point.id + "/review",
      dataType: "json",
      method: "GET",
    })
      .then(async (response) => {
        console.log(response.data);
        // 내가 쓴 글이 있는지 체크
        let check = true;
        response.data.forEach((element) => {
          if (element.username === user.username) {
            setReview(element);
            check = false;
          }
          if (check) {
            setReview({
              createdAt: null,
              id: null,
              rating: null,
              reviewContent: null,
              nickname: null,
              username: null,
            });
          }
        });
        await setReviewArr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const setScrap = () => {
    setIsScraped(!isScraped);
    const token = sessionStorage.getItem("is_login");

    if (!isScraped == true) {
      alert("저장되었습니다.");
    }
    axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/scrap/" + point.id,
      dataType: "json",
      method: "post",
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 리뷰 5개 렌더링
  const rendering = () => {
    const result = [];
    if (reviewArr[0] === undefined) return;
    const size = Math.min(5, reviewArr[0].length);
    for (let i = 0; i < size; i++) {
      result.push(
        <ReviewCard
          key={i}
          rating={reviewArr[0][i].rating}
          date={reviewArr[0][i].createdAt}
          desc={reviewArr[0][i].reviewContent}
          img={reviewArr[0][i].profileimg}
          nickname={reviewArr[0][i].nickname}
          username={reviewArr[0][i].username}
        />
      );
    }
    return result;
  };

  return (
    <div>
      <Header />

      <main className="">
        <section className="flex-grow pt-14 px-6">
          <div className="flex flex-rows space-x-3">
            <h1 className="text-3xl font-semibold mt-2 mb-6">{point.pointName}</h1>
            <p className="flex items-center hover:underline cursor-pointer" onClick={setScrap}>
              {isScraped ? (
                <HeartIcon className="h-4 text-red-400 " fill="red" />
              ) : (
                <HeartIcon className="h-4 text-red-400" />
              )}
              저장
            </p>
          </div>
          {/* 평점, 저장*/}
          <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
              <StarIcon className="h-4 text-red-400" />
              {point.rating}
              <p className="pl-2 text-sm text-gray-500">({point.reviewCnt}개의 리뷰)</p>
            </p>
          </div>
          {/* 사진 부분 */}
          <div className="flex lg:flex-row flex-col">
            <div className="flex flex-row lg:w-2/5 space-x-1 mb-1 h-[500px] lg:h-auto">
              <div className="relative w-2/3 flex-shrink-0 ">
                <Image
                  // src={point.fishingimg}
                  src={fisherman}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl"
                />
              </div>
              <div className="grid-rows-2 w-1/3 h-max ">
                <div className="relative w-full h-1/2 ">
                  <Image
                    // src={point.fishingimg}
                    src={fisherman}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl scale-y-99"
                  />
                </div>
                <div className="relative w-full h-1/2">
                  <Image
                    // src={point.fishingimg}
                    src={fisherman}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl scale-y-99 "
                  />
                </div>
              </div>
            </div>
            {/* 조위 예측 부분 */}
            <div className="w-full  text-center items-center text-lg lg:text-2xl mt-3 lg:w-2/5">
              {tideArr ? tideArr[0].tph_time.slice(0, 10) : ""}
              <div className="w-full  lg:w-full grid grid-cols-2 justify-items-center">
                {tideArr?.map((value) => (
                  <div className="flex flex-row my-10">
                    <p className="flex justify-center items-center m-1">
                      {value.tph_time.slice(10, 16)}
                    </p>
                    <p
                      className={
                        "w-10 h-10 rounded-full flex justify-center items-center font-bold text-white mx-1 " +
                        (value.hl_code === "저조" ? "bg-red-600" : "bg-blue-600")
                      }
                    >
                      {value.hl_code.slice(0, 1)}
                    </p>
                    <p className="flex justify-center items-center m-1">{value.tph_level}cm</p>
                  </div>
                ))}
              </div>
            </div>
            {/* 달력 부분 */}
            <div className="mt-5 lg:w-1/5 text-center ">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
              />
            </div>
          </div>
          <hr />
        </section>
        {/* tide */}
        <section className="flex-grow pt-14 px-6">
          <h3 className="text-2xl font-semibold mt-2 mb-6">{point.tide}</h3>
          {/* 물고기 정보*/}
          <div className="grid grid-flow-row grid-cols-2 justify-around pt-5">
            {/* {fishArr.map((value, index) => (
              <p className="flex items-center " key={index}>
                <HeartIcon className="h-4 text-red-400" />
                {value}
              </p>
            ))} */}
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
        <section className=" flex-grow pt-14 px-6 ">
          <h3 className="text-2xl font-semibold mt-2 mb-6">포인트 지역</h3>
          <div className={"h-[500px] "}>
            <DetailMap />
          </div>
          <h5 className="text-xl font-semibold mt-2 mb-6">{point.address}</h5>
          <hr />
        </section>

        {/* 리뷰 */}
        <section className="flex-grow pt-14 px-6">
          <h3 className="text-2xl font-semibold mt-2 mb-6 flex flex-row">
            <p className="flex items-center">
              <StarIcon className="h-4 text-red-400" />
              {point.rating + `  `}
              {point.reviewCnt}개의 리뷰
            </p>
          </h3>
          {/* 리뷰 컴포넌트*/}
          <div className=" justify-around pt-5">
            <p className="flex items-center"></p>
            <div className="flex space-x-3  overflow-scroll scrollbar-hide h-40 ">
              {rendering()}
            </div>
          </div>
          {/* 리뷰 모두 보기 */}
          <div
            className="my-3 p-3 border-solid border-2 rounded-xl w-max cursor-pointer hover:scale-105 transform transition duration-300 ease-out "
            onClick={openModal}
          >
            <p>{point.reviewCnt}개의 리뷰 모두 보기</p>
          </div>

          {/* 리뷰 모달 다이얼로그 */}
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
                  <div className="inline-block w-full max-w-sm lg:max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform ">
                    {user.id != -1 ? (
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        {review.id === null ? "리뷰 쓰기" : "내 리뷰"}
                      </Dialog.Title>
                    ) : (
                      false
                    )}
                    {user.id != -1 ? (
                      <div className="mb-10">
                        <p className="text-sm text-gray-500">
                          {review.id === null ? <ReviewWriteCard /> : <ReviewUpdateCard />}
                        </p>
                      </div>
                    ) : (
                      false
                    )}
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      전체 리뷰 보기
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {reviewArr[0]?.map(
                          (
                            { profileimg, username, nickname, createdAt, rating, reviewContent },
                            index
                          ) => (
                            <FullReviewCard
                              key={index}
                              img={profileimg}
                              username={username}
                              nickname={nickname}
                              rating={rating}
                              date={createdAt}
                              desc={reviewContent}
                            />
                          )
                        )}
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
