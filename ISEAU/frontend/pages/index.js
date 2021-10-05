import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SmallCard from "../components/SmallCard";
import exploreData from "../dummy/json/locationDump.json";
import categoryData from "../dummy/json/categoryDump.json";
import MediumCard from "../components/MediumCard";
import LargeCard from "../components/LargeCard";
import Footer from "../components/Footer";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("lat : ", position.coords.latitude);
      console.log("long : ", position.coords.longitude);
    });
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div className="">
      <Head>
        <title>I SEA U</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* 헤더 */}
      <Header />

      {/* 배너 */}
      <Banner />

      {/* 메인화면의 목록들 */}
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        {/* 가까운 낚시터 정보 */}
        <section data-aos="fade-up" className="pt-8">
          <h2 className="text-2xl font-semibold pb-5">가까운 낚시터 둘러보기</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exploreData?.map(({ img, distance, location }) => (
              <SmallCard key={img} img={img} location={location} distance={distance} />
            ))}
          </div>
        </section>

        {/* 카테고리별 둘러보기 (갯바위, 선상) */}
        <section data-aos="fade-up" className="mt-5">
          <h2 className="text-2xl font-semibold py-8">장소가 어디든, 당신은 전문 낚시꾼입니다 !</h2>
          <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-2">
            {categoryData?.map(({ img, title }) => (
              <MediumCard key={img} img={img} title={title} />
            ))}
          </div>
        </section>

        <LargeCard
          img="https://c4.wallpaperflare.com/wallpaper/775/468/883/nature-landscape-mist-forest-wallpaper-preview.jpg"
          title="The best Fishing Info Service"
          description="We always with you"
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}
