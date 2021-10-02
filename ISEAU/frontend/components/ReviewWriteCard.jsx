import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import StarRatingComponent from "react-star-rating-component";
import axios from "axios";

const ReviewWriteCard = () => {
  const [reviewData, setReviewData] = useState({
    text: "",
    rating: 0,
  });
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  const textChange = (e) => {
    const newReviewData = Object.assign({}, reviewData);
    newReviewData.text = e.target.value;
    setReviewData(newReviewData);
  };
  const ratingChange = (value) => {
    const newReviewData = Object.assign({}, reviewData);
    newReviewData.rating = value;
    setReviewData(newReviewData);
  };
  const writeReview = () => {
    if (reviewData.rating === 0) {
      alert("평점을 입력해주세요");
      return;
    }
    // axios({
    //   url: "http://j5d204.p.ssafy.io/fishing/" + fishingId + "/review/create",
    //   method: "post",
    //   data:
    // })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <div className="my-2  p-2  ">
      <div className="flex flex-row  w-[350px]">
        <Avatar className="post-avatar" /> {/* 로그인한 사용자 이미지로 수정필요 */}
        <p className="grid-rows-2">
          <p className="pl-2 text-sm ">사용자 닉네임</p> {/* 로그인한 사용자 닉네임으로 수정필요 */}
          <p className="pl-2 text-sm ">
            {year}년 {month}월 {date}일
          </p>
          <p>
            <StarRatingComponent
              name="rate1"
              starCount={5}
              value={reviewData.rating}
              onStarClick={(value) => ratingChange(value)}
            />
          </p>
        </p>
      </div>
      <textarea
        className="mt-3 h-40 w-full border-solid border-2 border-black resize-none"
        value={reviewData.text}
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
