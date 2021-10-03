import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  createdAt: null,
  nickname: null,
  profileimg: null,
  rating: null,
  reviewContent: null,
  username: null,
}; // 초기 상태 정의
const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setReview: (state, action) => {
      state = action.payload;
    },
  },
});
export const { setReview } = reviewSlice.actions; // 액션 생성함수
export default reviewSlice.reducer; // 리듀서
