import React, { useState, useCallback } from "react";
import { Avatar } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from "../store/modules/review";
import * as reviewArrActions from "../store/modules/reviewArr";
import * as detailPointActions from "../store/modules/detailPoint";

const ReviewWriteCard = () => {
  const dispatch = useDispatch();

  const point = useSelector(({ detailPoint }) => detailPoint);
  const user = useSelector(({ user }) => user);
  const review = useSelector(({ review }) => review);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

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
  const setDetailPoint = useCallback(
    (value) => {
      dispatch(detailPointActions.setDetailPoint(value));
    },
    [dispatch]
  );
  const textChange = (e) => {
    const newReview = Object.assign({}, review);
    newReview.reviewContent = e.target.value;
    setReview(newReview);
  };
  const ratingChange = (value) => {
    const newReview = Object.assign({}, review);
    newReview.rating = value;
    setReview(newReview);
  };
  const writeReview = async () => {
    if (review.rating === 0 || review.rating === null) {
      alert("평점을 입력해주세요");
      return;
    }
    const Review = {
      rating: review.rating,
      reviewContent: review.reviewContent,
    };

    const token = sessionStorage.getItem("is_login");
    await axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/" + point.id + "/review/create",
      method: "post",
      data: Review,
      headers: {
        Authorization: `JWT ${token}`,
      },
      withCredentials: true,
      crossDomain: true,
      credentials: "include",
    })
      .then((response) => {
        // console.log(Review);
        console.log(response);
        getReview();
        getDetailPoint();
      })
      .catch((error) => {
        console.log(error);
        console.log(Review);
      });
  };

  const getReview = async () => {
    await axios({
      url: "http://j5d204.p.ssafy.io:8000/fishing/" + point.id + "/review",
      dataType: "json",
      method: "GET",
    })
      .then(async (response) => {
        console.log(response.data);
        // 내가 쓴 글이 있는지 체크
        response.data.forEach((element) => {
          if (element.username === user.username) {
            setReview(element);
          }
        });
        await setReviewArr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDetailPoint = async () => {
    const response = await axios.get("http://j5d204.p.ssafy.io:8000/fishing/" + point.id);
    setDetailPoint(response.data[0]);
  };
  return (
    <div className="my-2  p-2  ">
      <div className="flex flex-row  w-[350px]">
        <Avatar className="post-avatar" />
        <p className="grid-rows-2">
          <p className="pl-2 text-sm ">{user.nickname}</p>
          {/* 로그인한 사용자 닉네임으로 수정필요 */}
          <p className="pl-2 text-sm ">
            {year}년 {month}월 {date}일
          </p>
          <p>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={review.rating}
              onStarClick={(value) => ratingChange(value)}
            />
          </p>
        </p>
      </div>
      <textarea
        className="mt-3 h-40 w-full border-solid border-2 border-black resize-none"
        value={review.reviewContent}
        onChange={(e) => textChange(e)}
        placeholder="리뷰를 작성해주세요!"
      ></textarea>
      <div className=" w-full text-right">
        <button
          className="p-2 cursor-pointer hover:scale-105 transform transition duration-300 ease-out bg-blue-600 text-white text-lg  "
          onClick={writeReview}
        >
          리뷰 작성
        </button>
      </div>
    </div>
  );
};

export default ReviewWriteCard;
