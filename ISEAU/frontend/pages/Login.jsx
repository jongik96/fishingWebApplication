import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import { useRouter } from "next/dist/client/router";

const Login = () => {

  const [inputs, setInputs] = useState({
    Email: '',
    Password: ''
  });
  const { Email, Password } = inputs; // 비구조화 할당을 통해 값 추출

  const [loginBtn, setLoginBtn] = useState(false);
  const changeBtn = () => {
   (Email.length!=0) && (Password.length!=0) && isEmail(Email) && (Password.length>=10 || Password.length<21) ? setLoginBtn(true) : setLoginBtn(false);
  }

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }; 
  
  // 이메일 유효성검사
  const isEmail = (Email) =>{
    const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(Email);
  }

  // signup 페이지로 이동
  const router = useRouter();
  const Signup = () =>{
    router.push({
      pathname:"/Signup"
    })
  }

  return (
        <div>
          <Header/>
          <div
            className=""
          >
            <div className="relative w-full md:w-1/3 my-6 mx-auto max-w-3xl bg-white">
              {/*content*/}
              <form className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Log In
                  </h3>
                  
                </div>
                {/*body*/}
                <div  className="relative p-6 flex-auto">
                  <p className="my-4 text-black-400 text-lg leading-relaxed">
                   E-mail
                  </p>
                  <input type="text" name="Email" value={Email} onChange = {onChange} placeholder=" Email" className="text-lg w-full rounded-lg border-2 border-gray-400" />
                  { ((Email.length!=0) && !isEmail(Email)) && (<p className="text-red-500">잘못된 이메일 형식입니다.</p>)}

                  <p className="my-4 text-black-900 text-lg leading-relaxed">
                   Password
                  </p>
                  <input type="password" name="Password" value={Password} onChange = {onChange} placeholder=" Password" className="text-lg w-full rounded-lg border-2 border-gray-400" />
                  { (Password.length!=0) && (Password.length<10 || Password.length>20) &&
                    (<p className="text-red-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>
                   )}

                </div>
                {/*footer*/}
                <div className="mt-3 flex flex-col items-center justify-end border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm border-2 rounded-lg border-blue-300 focus:outline-none mt-5 mr-1 mb-1 ease-linear transition-all duration-150"
                    
                    type="button"
                    disabled={!loginBtn}
                  >
                    Log In
                  </button>

                  <button className="text-yellow-500 background-transparent font-bold uppercase px-6 py-2 text-sm  focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={Signup}
                  >
                    아직 회원이 아니신가요?
                  </button>                 
                </div>
              </form>
            </div>
          </div>
          {/* <div className="opacity-25 fixed inset-0"></div> */}
        </div>

  );
};

export default Login;
