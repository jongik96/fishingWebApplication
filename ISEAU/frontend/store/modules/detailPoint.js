import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  id: 25,
  reviewCnt: 4,
  rating: 2.8,
  name: "백아도·굴업도",
  pointName: "백아도 오도 부근",
  address: "인천광역시 옹진군",
  category: 0,
  longitude: "125.9461389",
  latitude: "37.06466667",
  tide: "",
  dpwt: "6.2~10",
  material: "펄",
  fishingimg: "/media/fishingdefault.png",
  obsCode: "IE_0062",
  obsPostId: "웅진소청초",
}; // 초기 상태 정의
const detailPointSlice = createSlice({
  name: "detailPoint",
  initialState,
  reducers: {
    setDetailPoint: (state, action) => {
      const {
        id,
        reviewCnt,
        rating,
        name,
        pointName,
        address,
        category,
        longitude,
        latitude,
        tide,
        dpwt,
        material,
        fishingimg,
        obsCode,
        obsPostId,
      } = action.payload;
      state.id = id;
      state.reviewCnt = reviewCnt;
      state.rating = rating;
      state.name = name;
      state.pointName = pointName;
      state.address = address;
      state.category = category;
      state.longitude = longitude;
      state.latitude = latitude;
      state.tide = tide;
      state.dpwt = dpwt;
      state.material = material;
      state.fishingimg = fishingimg;
      state.obsCode = obsCode;
      state.obsPostId = obsPostId;
    },

  },
});
export const { setDetailPoint } = detailPointSlice.actions; // 액션 생성함수
export default detailPointSlice.reducer; // 리듀서
