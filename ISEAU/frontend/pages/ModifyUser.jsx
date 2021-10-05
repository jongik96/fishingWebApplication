import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
const ModifyUser = () => {

    const [inputs, setInputs] = useState({
        Email: '',
        Password: '',
        Nickname: '',
        Address: '',
        PhoneNumber: '',
        PasswordConfirm: '',
        introduce: '',
        profileImg: '',
    })
    const [isNicknameRight, setIsNicknameRight] = useState(false);
    const { Email, Password, PasswordConfirm, Nickname, Address, PhoneNumber, introduce, profileImg } = inputs; // 비구조화 할당을 통해 값 추출
    
    const onChange = (e) => {
        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
          ...inputs, // 기존의 input 객체를 복사한 뒤
          [name]: value // name 키를 가진 값을 value 로 설정
        });
    };
    
    


      // Nickname 유효성검사 특수문자 불가
    const isNickname = (Nickname) => {
        const nicknameRegex = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        return nicknameRegex.test(Nickname)

    }


    const em = useSelector(state => state.user.username)
    const nn = useSelector(state => state.user.nickname)
    const ad = useSelector(state => state.user.address)
    const pn = useSelector(state => state.user.phonenumber)
    const it = useSelector(state => state.user.introduce)


    // 미리정보받아오기
    useEffect(() =>{
        inputs.Email = em;
        inputs.Address = ad;
        inputs.Nickname = nn;
        inputs.PhoneNumber = pn;
        inputs.introduce = it;
    },[em, ad, nn, pn, it])


    useEffect(()=>{
        const token = sessionStorage.getItem('is_login')
        axios({
            method: "get",
            url:"http://j5d204.p.ssafy.io:8000/user/current",
            headers: `JWT ${token}`,
        }).then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    })


    const [isRight, setIsRight] = useState(false);
    useEffect(() => {
        {
          (Password.length >= 10 || Password.length < 21) &&
          (Nickname.length >= 2 && Nickname.length < 11) &&
          (Password == PasswordConfirm) &&
          !isNickname(Nickname) 
            ? setIsRight(true)
            : setIsRight(false);
        }
      }, [inputs, isRight]);
      // nickname 유효성검사
      useEffect(()=>{
        isNickname(Nickname) || (Nickname.length >= 2 && Nickname.length < 11) ? setIsNicknameRight(true) :
        setIsNicknameRight(false);
      })
    const checkNickname = () => {
        axios({
        method: "post",
        url: "http://j5d204.p.ssafy.io:8000/user/nickname/uniquecheck",
        data:{
            nickname:inputs.Nickname,
            
        }
        }).then(()=>{
        alert("사용가능한 Nickname입니다.")
        }).catch((err)=>{
        alert("이미 사용중인 Nickname입니다.")
        console.log(err)
        })
    }
    // modify Request
    const Modify = () => {
        let result = confirm("회원정보를 변경하시겠습니까?")
        if(result == true){
        const token = sessionStorage.getItem('is_login')
        const id = sessionStorage.getItem('id')
        axios({
            method: "put",
            url: 'http://j5d204.p.ssafy.io:8000/user/modify/'+id,
            headers: {
                Authorization: `JWT ${token}`
            }, 
            data: {
                password : inputs.Password,
                nickname : inputs.Nickname,
                address : inputs.Address,
                phoneNumber : inputs.PhoneNumber,         
                introduce: inputs.introduce,
            }
        }).then(() =>{
            sessionStorage.removeItem('pw')
            router.push({
                pathname:"/"
            })
        }).catch((error)=> {
            console.log(error)
        })
    }
    }    

    // delete User
    const Delete = () => {

        let result = confirm("회원정보를 삭제하시겠습니까?")
        if(result == true){
            const token = sessionStorage.getItem('is_login')
            const id = sessionStorage.getItem('id')
            axios({
                method: "delete",
                url: 'http://j5d204.p.ssafy.io:8000/user/delete/'+id,
                // headers: {
                //     Authorization: `Bearer ${token}`
                // },
            }).then(()=>{
                sessionStorage.removeItem('is_login')
                sessionStorage.removeItem('id')
                sessionStorage.removeItem('pw')
                alert("삭제가 완료되었습니다.")
                
                router.push({
                    pathname:"/"
                })
            }).catch(()=>{
            })
        }
    }

    const router = useRouter();
    // 취소버튼
    const Login = () =>{
        sessionStorage.removeItem('pw')
        router.push({
            pathname: "/",
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
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 className="text-3xl font-semibold">
                Modify
            </h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
            {/*profileImage*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
            Profile Image
            </p>
            <input
              type="file"
              name="profileImg"
              id="profileImg"
              className=""
            />
            {/*Email*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
            E-mail
            </p>
            <input type="text" name="Email" disabled onChange = {onChange} placeholder={Email} className="text-lg w-full rounded-lg border-2 border-gray-400" />
            
            {/*Password*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
            Password
            </p>
            <input type="password" name="Password" onChange = {onChange} placeholder="" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            {(Password.length!=0)&&(Password.length<10 || Password.length>20) &&
             (<p className="text-gray-500">비밀번호는 10자 이상 20자 이하여야 합니다.</p>)}
            {/*Confirm Password*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">Check Password</p>
              <input
                type="password"
                name="PasswordConfirm"
                onChange={onChange}
                placeholder=" Password"
                className="text-lg w-full rounded-lg border-2 border-gray-400"
              />
              {Password != PasswordConfirm && (
                <p className="text-red-500">비밀번호와 동일하게 입력해주세요.</p>
              )}
            {/*Nickname*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
            Nickname
            </p>
            <input type="text" name="Nickname" value={Nickname} onChange = {onChange} placeholder="" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            {   (Nickname.length!=0) &&
                (Nickname.length<2 || Nickname.length>10) && 
                (<p className="text-gray-500">Nickname은 2자이상 10자 이하여야합니다</p>
            )}
            { isNickname(Nickname) && (
                <p className="text-red-500">Nickname은 특수문자를 포함할 수 없습니다.</p>
              )}
            <button
                  className={isNicknameRight ? `checkbutton_active` : `checkbutton_unactive`}
                  type="button"
                  onClick={checkNickname}
                >
                  중복검사
                </button>

            {/*Introduce*/}
            <p className="my-2 text-black-900 font-bold text-lg leading-relaxed">
            Introduce
            </p>
            <input type="text" name="introduce" value={introduce} onChange = {onChange} placeholder="" className="text-lg w-full rounded-lg border-2 border-gray-400" />
            </div>
            {/*footer*/}
            <div className="rounded-lg flex flex-col items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <div>
                    <button
                        className="text-gray-500 w-52 border-gray-500 rounded-xl font-bold uppercase px-6 py-2 text-sm  mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={Login}                    >
                        취소
                    </button>
                </div>
                <div className="mt-2">
                    <button
                        className={isRight ? `button_active` : `button_unactive`}
                        type="button"
                        onClick={Modify}
                        
                    >
                        변경
                    </button>
                </div>
                <div className="mt-2">
                    <button
                        className="text-gray-300 bg-red-500 w-52 font-bold uppercase px-6 py-2 text-sm border-2 rounded-xl border-red-300 focus:outline-none mt-3 mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={Delete}
                        
                    >
                        회원탈퇴
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

