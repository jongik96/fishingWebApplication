/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {   UserCircleIcon, MenuIcon, } from '@heroicons/react/solid'
import React, { useState } from 'react';
import LoginModal from './modal/LoginModal';
import SignupModal from './modal/SignupModal';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DropdownMenu=() => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  return (
    <Menu as="div" className="flex items-center space-x-6 justify-end text-gray-500">
      <div className="flex items-center border-2 p-1 rounded-full cursor-pointer">
        <Menu.Button className="flex">
            <MenuIcon className="h-6" />
            <UserCircleIcon className="h-6" />
        </Menu.Button>
      </div>
      {showLoginModal&&(
        // <LoginModal></LoginModal>
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
                    Log In
                  </h3>
                  
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black-400 text-lg leading-relaxed">
                   E-mail
                  </p>
                  <input type="text" placeholder="Email" className="border-2 border-gray-400" />
                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Password
                  </p>
                  <input type="password" placeholder="Password" className="border-2 border-gray-400" />

                  
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                    // showLoginModal이 true일 경우에 setshowloginmodal 을 false로 
                    // 
                  >
                    Close
                  </button>
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowLoginModal(false)}
                  >
                    Log In
                  </button>
                  
                  <button className="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  >
                    Signup
                    </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      )}
      {showSignupModal&&(
        <SignupModal></SignupModal>
      )}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-24 w-33 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={()=> setShowLoginModal(true)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  로그인
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={()=> setShowSignupModal(true)}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  회원가입
                </button>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  등록하기
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  About Us
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
export default DropdownMenu