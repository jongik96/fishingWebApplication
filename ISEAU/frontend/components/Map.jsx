import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

const Map = ({ searchData }) => {
  const [clickedLocation, setClickedLocation] = useState({});
  console.log("맵 데이터들 : ", searchData);

  // 검색된 위치의 결과 객체를 {위도: ~~~ , 경도 : ~~~ } 처럼 바꾸는 작업

  const changing = searchData?.map((res) => ({
    latitude: Number(res.latitude),
    longitude: Number(res.longitude),
  }));

  //   지도 중심부위 (처음 보여주는 곳) {위도, 경도} 객체로 변환
  //   지도 중심부위는 해당 지역의 모든 포인트들의 중심부라고 생각하면 됨.
  const center = getCenter(changing);

  const [viewport, setViewport] = useState({
    width: "110%",
    height: "100%",
    longitude: Number(center.longitude),
    latitude: Number(center.latitude),
    zoom: 11,
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jaedenist/cktspge5j5d5418opcln0d1jx"
      mapboxApiAccessToken={process.env.map_key}
      {...viewport}
      onViewportChange={(nextView) => {
        setViewport(nextView);
      }}
    >
      {searchData?.map((res) => (
        <div key={Number(res.longitude)}>
          <Marker longitude={Number(res.longitude)} latitude={Number(res.latitude)}>
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setClickedLocation(res)}
              aria-label="push-pin"
            >
              🐳
            </p>
          </Marker>

          {/* 지도에서 포인트 클릭할 때 띄워주는 것들 */}
          {Number(clickedLocation.longitude) === Number(res.longitude) ? (
            <Popup
              className="z-50"
              closeOnClick={true}
              onClose={() => setClickedLocation({})}
              latitudeitude={Number(res.latitude)}
              longitude={Number(res.longitude)}
              offsetLeft={10}
              offsetTop={-10}
            >
              {res.pointName}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default Map;
