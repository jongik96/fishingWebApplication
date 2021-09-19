import React from 'react';

const SignupModal = ( props ) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { setShowSignupModal } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div>
            <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Sign Up
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowSignupModal(false)}
                  >
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-black-900 text-lg leading-relaxed">
                   E-mail
                  </p>
                  <input type="text" placeholder="Email" className="border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Password
                  </p>
                  <input type="password" placeholder="Password" className="border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Nickname
                  </p>
                  <input type="text" placeholder="Email" className="border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Address
                  </p>
                  <input type="text" placeholder="Password" className="border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Phone Number
                  </p>
                  <input type="number" placeholder="Password" className="border-2 border-gray-400" />

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowSignupModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-blue-500 active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowSignupModal(false)}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}
export default SignupModal;