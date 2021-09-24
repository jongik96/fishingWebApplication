import React, {useState} from "react";
import Header from "../components/Header";
const Signup = () => {

    const [inputs, setInputs] = useState({
        Email: '',
        Password: '',
        Nickname: '',
        Address: '',
        PhoneNumber: '',
    })

    const { Email, Password, Nickname, Address, PhoneNumber } = inputs; // 비구조화 할당을 통해 값 추출
    
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };

    
    // const Signup = () => {
    //     router.push({
    //       pathname: "/Signup",
    //     });
    //   };
  return (
    <div>
        <Header/>
        <div
        className=""
        >
        <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg relative flex flex-col w-full">
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
            <input type="text" name="Email" onChange = {onChange} placeholder="Email" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Password
            </p>
            <input type="password" name="Password" onChange = {onChange} placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Nickname
            </p>
            <input type="text" name="Nickname" onChange = {onChange} placeholder="Nickname" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Address
            </p>
            <input type="text" name="Address" onChange = {onChange} placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            <p className="my-4 text-black-900 text-lg leading-relaxed">
            Phone Number
            </p>
            <input type="number" name="PhoneNumber" onChange = {onChange} placeholder="Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />

            </div>
            {/*footer*/}
            <div className="rounded-lg flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <button
                className="text-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={Signup}
            >
                변경하기
            </button>
            <button
                className="text-gray-500 background-transparent rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                
            >
                취소
            </button>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default Signup;
<h1>회원가입화면</h1>;
