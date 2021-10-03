import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";

const ModifyUser = () => {

    const [inputs, setInputs] = useState({
        image: '',
        Email: '',
        Password: '',
        Nickname: '',
        Address: '',
        PhoneNumber: '',
    })

    const { image, Email, Password, Nickname, Address, PhoneNumber } = inputs; // 비구조화 할당을 통해 값 추출
    
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };
    
    
    useEffect(()=>{
        const token = 'Bearer '+ sessionStorage.getItem('is_login')
        const id = sessionStorage.getItem('userid')
        axios({
            method:'get',
            url:'http://j5d204.p.ssafy.io:8000/user/modify/'+id,
            headers: token,
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    })


    // 전화번호 유효성검사
    const isNumber = (PhoneNumber) => {
        const numberRegex = 
        /^[0-9]{1,100}$/g;
        return numberRegex.test(PhoneNumber);
    }

    // modify Request
    const Modify = () => {
        axios({
            method: "put",
            url: 'http://j5d204.p.ssafy.io:8000/user/modify',
            data: {
                profileImg: inputs.image,
                email: inputs.Email,
                password : inputs.Password,
                Nickname : inputs.Nickname,
                Address : inputs.Address,
                PhoneNumber : inputs.PhoneNumber,
                username : inputs.Username,
            }
        }).then((res) =>{
            console.log("email: ")
            console.log(res.data)
        }).catch((error)=> {
            console.log(error)
        })
    }    

    const router = useRouter();
    const Login = () =>{
        router.push({
            pathname: "/Login",
        })
    }
  return (
    <div>
        <Header/>
        <div
        className=""
        >
        <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 rounded-lg relative flex flex-col w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
                Modify
            </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
            {/*profileImage*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            Profile Image
            </p>
            <input
              type="file"
              name="image"
              id="image"
              className=""
            />
            {/*Email*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            E-mail
            </p>
            <input type="text" disabled name="Email" onChange = {onChange} placeholder={Email} className="text-lg w-full rounded-lg border-2 border-gray-400" />
            
            {/*Password*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            Password
            </p>
            <input type="password" name="Password" onChange = {onChange} placeholder=" Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            {(Password.length!=0)&&(Password.length<10 || Password.length>20) &&
             (<p className="text-gray-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>)}
            {/*Nickname*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            Nickname
            </p>
            <input type="text" name="Nickname" value={Nickname} onChange = {onChange} placeholder=" Nickname" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            {   (Nickname.length!=0) &&
                (Nickname.length<2 || Nickname.length>6) && 
                (<p className="text-gray-500">Nickname은 2자이상 6자 이하여야합니다</p>
            )}
            {/*Address*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            Address
            </p>
            <input type="text" name="Address" value={Address} onChange = {onChange} placeholder=" 경상북도구미시진평동" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            {/*PhoneNumber*/}
            <p className="my-2 text-black-900 text-lg leading-relaxed">
            Phone Number
            </p>
            <input type="text" name="PhoneNumber" value={PhoneNumber} onChange = {onChange} placeholder=" 010XXXXXXXX" className="appearance-textfield text-lg w-full rounded-lg border-2 border-gray-400" />
            { (PhoneNumber.length!=0) && !isNumber(PhoneNumber) && (<p className="text-gray-500">숫자만 입력해주세요</p>)}
            </div>
            {/*footer*/}
            <div className="rounded-lg flex flex-col items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                    <button
                        className="text-gray-500 background-transparent rounded-lg font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={Login}                    >
                        취소
                    </button>
                </div>
                <div className="mt-2">
                    <button
                        className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm border-2 rounded-lg border-blue-300 focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={Modify}
                        
                    >
                        변경
                    </button>
                </div>
            </div>
        </div>
        </div>
    </div>
    </div>
  );
};

export default ModifyUser;

