import React from "react";
import Header from "../components/Header";
const Login = () => {
  return (
        <div>
          <Header/>
          <div
            className=""
          >
            <div className="relative w-1/2 my-6 mx-auto max-w-3xl bg-white outline-none focus:outline-none">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Log In
                  </h3>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black-400 text-lg leading-relaxed">
                   E-mail
                  </p>
                  <input type="text" placeholder="Email" className="text-lg w-full rounded-lg border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Password
                  </p>
                  <input type="password" placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    
                    // showLoginModal이 true일 경우에 setshowloginmodal 을 false로 
                    // 
                  >
                    Close
                  </button>
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    
                  >
                    Log In
                  </button>
                  
                  <button className="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  
                  >
                    Signup
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40"></div>
        </div>
  );
};

export default Login;
<h1>로그인화면</h1>;
