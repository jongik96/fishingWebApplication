import { useRouter } from "next/dist/client/router";
import React, { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RecommendCard from "../components/RecommendCard";
import fishingData from "../dummy/json/fishingDump.json";

const RecommendCategory = () => {
  const router = useRouter();

  const { category } = router.query;
  const [cateParse, setCateParse] = useState(category);

  useEffect(() => {
    setCateParse(category);
  }, [cateParse]);
  const Routing = (value) => {
    router.push({
      pathname: "/RecommendCategory",
      query: {
        category: value,
      },
    });
  };
  const HandlerSelected = (value) => {
    setCateParse(value);
    Routing(value);
  };

  return (
    <div>
      <Header />

      <main className="max-w-7xl mx-auto px-8 pt-8 sm:px-16 mb-16">
        <section>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p
              className={cateParse === "all" ? `button_selected` : `button`}
              onClick={() => HandlerSelected("all")}
            >
              전체 보기
            </p>
            <p
              className={cateParse === "rock" ? `button_selected` : `button`}
              onClick={() => HandlerSelected("rock")}
            >
              갯바위 포인트
            </p>
            <p
              className={cateParse === "sea" ? `button_selected` : `button`}
              onClick={() => HandlerSelected("sea")}
            >
              선상 포인트
            </p>
          </div>
        </section>
        <section className="pt-5">
          <div className="flex flex-wrap -mx-1 overflow-hidden md:-mx-2 lg:-mx-4 xl:-mx-2">
            {fishingData.map(({ id, img, point_name, address, rate, description, category }) => (
              <div className="my-5 px-9 w-full overflow-hidden md:my-2 md:px-2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2 xl:my-2 xl:px-2 xl:w-1/3">
                <RecommendCard
                  key={id}
                  img={img}
                  point_name={point_name}
                  address={address}
                  rate={rate}
                  description={description}
                  category={category}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendCategory;
