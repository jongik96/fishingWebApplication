import React from "react";
import Header from "../components/Header";
import { useRouter } from 'next/dist/client/router';
const Signup = () => {
    const router = useRouter();
    const Signup = () => {
        router.push({
          pathname: "/Signup",
        });
      };
  return (
    <div>
        <Header/>
        <div
        className=""
        >
        <div className="relative w-1/2 my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
                Sign Up
            </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            E-mail
            </p>
            <input type="text" placeholder="Email" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Password
            </p>
            <input type="password" placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Nickname
            </p>
            <input type="text" placeholder="Nickname" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Address
            </p>
            <input type="text" placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Phone Number
            </p>
            <input type="number" placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />

            </div>
            {/*footer*/}
            <div className="rounded-lg flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                className="text-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={Signup}
            >
                Sign Up
            </button>
            <button
                className="text-red-500 background-transparent rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                
            >
                Close
            </button>
            </div>
        </div>
        </div>
    </div>
    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Signup;
<h1>회원가입화면</h1>;
