import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";

const DetailMap = ({ fishingData }) => {
  const [clickedLocation, setClickedLocation] = useState({});
  function getWindowDimensions() {
    if (typeof window !== "undefined") {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }else
    {
      return {
        width=0,
        height=0,
      };
    }
  }

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);

    return windowDimensions;
  }

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    setViewport((state) => ({
      ...state,
      width: width,
    }));
    console.log(width);
  }, [width]);

  // 검색된 위치의 결과 객체를 {위도: ~~~ , 경도 : ~~~ } 처럼 바꾸는 작업

  const changing = fishingData.map((res) => ({
    latitude: res.lat,
    longitude: res.long,
  }));

  //   지도 중심부위 (처음 보여주는 곳) {위도, 경도} 객체로 변환
  //   지도 중심부위는 해당 지역의 모든 포인트들의 중심부라고 생각하면 됨.
  const center = getCenter(changing);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 10,
  });
  useEffect(() => {
    let newViewport = Object.assign({}, viewport);
    newViewport.width = nowWidth;
  }, []);
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/jaedenist/cktspge5j5d5418opcln0d1jx"
      mapboxApiAccessToken={process.env.map_key}
      {...viewport}
      onViewportChange={(nextView) => {
        setViewport(nextView);
      }}
    >
      {fishingData.map((res) => (
        <div key={res.long}>
          <Marker longitude={res.long} latitude={res.lat}>
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
          {clickedLocation.long === res.long ? (
            <Popup
              className="z-50"
              closeOnClick={true}
              onClose={() => setClickedLocation({})}
              latitude={res.lat}
              longitude={res.long}
              offsetLeft={10}
              offsetTop={-10}
            >
              {res.point_name}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
};

export default DetailMap;
