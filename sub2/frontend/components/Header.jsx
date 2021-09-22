import React, { useCallback, useState } from "react";
import Image from "next/image";
import logo from "../img/logo.png";
import {
  SearchIcon,
  GlobeAltIcon,
  UsersIcon,
  UserIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/dist/client/router";
//dropdown menu
import DropdownMenu from "./DropdownMenu";

const Header = ({ placeholder }) => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const inputHandler = useCallback((e) => {
    setSearchInput(e.target.value);
  });

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-2 md:px-12">
      {/* 왼쪽 로고 영역 */}
      <div className="relative flex items-center h-12 cursor-pointer my-auto">
        <Image src={logo} layout="fill" objectFit="contain" objectPosition="left" />
      </div>

      {/* 중앙 검색바 영역 */}
      <div className="flex items-center md:border-2 rounded-full py-1 md:shadow-sm">
        <input
          value={searchInput}
          className="flex-grow pl-5 
          bg-transparent outline-none 
          text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "검색을 시작해볼까요 ?"}
          onChange={inputHandler}
        />
        <SearchIcon
          className="hidden md:inline-flex h-8 text-white bg-blue-300
          rounded-full p-2 cursor-pointer md:mx-2"
          onClick={search}
        />
      </div>

      {/* 우측 회원관련 영역 */} 
      <DropdownMenu></DropdownMenu>
      {/* <div className="flex items-center space-x-4 justify-end text-gray-500">
        <div className="flex items-center border-2 p-1 rounded-full cursor-pointer">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
        </div>
      </div> */}

      {/* 검색창에 입력된 것이 있을때 아래항목 보여주게 */}
      {searchInput && (
        <>
          <div className="flex flex-col col-span-3 mx-auto bg-green-400">
            <p>자동완성 영역sdfadfdafadfdfafdafdafdfdaf</p>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
