import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SignupApi } from "../../api/Signup";
import IsModal from "../modal/Modal";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import {
  __nickNameCheck,
  userInfoState,
  setSingup,
} from "../../redux/modules/SingupSlice";

const Signup = () => {
  //=============변수정리====================
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [style, setStyle] = useState({
    bgColorName: "bg-inputBox",
    bgColorEmail: "bg-inputBox",
    bgColorNickname: "bg-inputBox",
    bgColorPassword: "bg-inputBox",
    bgColorPasswordCheck: "bg-inputBox",
    shadowName: "",
    shadowEmail: "",
    shadowNickname: "",
    shadowPassword: "",
    shadowPasswordCheck: "",
  });
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });

  const { singup } = useSelector((state) => state.SingupSlice);

  const userNameRef = useRef();
  const userEmailRef = useRef();
  const userNickNameRef = useRef();
  const userPasswordRef = useRef();
  const PasswordCheckRef = useRef();

  //이름, 이메일, 비밀번호, 닉네임 정규 표현식
  const nameRegulationExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/;
  const emailRegulationExp =
    /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  const passwordRegulationExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{9,20}$/;
  const nickNameReglationExp = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;

  //아이디 비밀번호가 틀렸을시 문구
  const [regulation, SetRegulation] = useState({
    regulationName: "",
    regulationEmail: "",
    regulationPassword: "",
    regulationPasswordCheck: "",
    regulationNickName: "",
  });

  const [hidden, Sethidden] = useState({
    hiddenErrorMeassageName: true,
    hiddenErrorMeassaEmail: true,
    hiddenErrorMeassaNickName: true,
    hiddenErrorMeassaName: true,
    hiddenErrorMeassaPassword: true,
    hiddenErrorMeassaPasswordCheck: true,
  });

  //중복확인여부
  const [doubleCheck, setDoubleCheck] = useState({
    emailDoubleCheck: false,
    passwordDoubleCheck: false,
    nickNameDoubleCheck: false,
  });
  console.log(doubleCheck);
  //모달창
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  //=============== 항목별 유효성검사===================

  //이름
  const nameValidationTest = (nameValidation) => {
    if (!nameRegulationExp.test(nameValidation.value)) {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "한글 또는 영어로 작성해주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaName: false,
      }));
      nameValidation.focus();
      return;
    } else {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaName: true,
      }));
    }
  };

  //이메일
  const emailValidationTest = (emailValidation) => {
    if (emailRegulationExp.test(emailValidation.value)) {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: true,
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "올바른 이메일 형식이 아닙니다.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: false,
      }));
      emailValidation.focus();
      return;
    }
  };

  //닉네임
  const nickNameValidationTest = (nickNameValidation) => {
    if (nickNameReglationExp.test(nickNameValidation.value)) {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: true,
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "글자수 2~8자와 한글,영문,숫자만 포함해주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: false,
      }));
      nickNameValidation.focus();
      return;
    }
  };

  //비밀번호
  const passwordValidationTest = (passwordValidation) => {
    if (passwordRegulationExp.test(passwordValidation.value)) {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaPassword: true,
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword:
          "최소 8 자리에서 영대소문자와 숫자를 포함시켜주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaPassword: false,
      }));
      passwordValidation.focus();
      return;
    }
  };

  //비밀번호 확인
  const passwordCheckValidationTest = (passwordCheckValidation) => {
    const passwordvalue = userPasswordRef.current.value;

    if (passwordCheckValidation.value === passwordvalue) {
      setDoubleCheck(() => ({ ...doubleCheck, passwordDoubleCheck: true }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaPasswordCheck: true,
      }));
    } else {
      SetRegulation(() => ({
        ...regulation,
        regulationPasswordCheck: "비밀번호와 일치하는지 확인해주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaPasswordCheck: false,
      }));
      passwordCheckValidation.focus();
      return;
    }
  };

  //====================중복확인===========================

  //이메일중복체크악시오스
  const emailDoubleCheckAxios = async (payload) => {
    await SignupApi.emailDoubleCheck(payload)
      .then((response) => {
        setDoubleCheck(() => ({ ...doubleCheck, emailDoubleCheck: true }));
        Sethidden(() => ({ ...hidden, hiddenErrorMeassaEmail: true }));
        setModalStr({
          modalTitle: response.message,
          modalMessage: "",
        });
        onModalOpen();
      })
      .catch((error) => {
        const { data } = error.response;
        if (data.status === 400) {
          setModalStr({
            modalTitle: data.message,
            modalMessage: "이메일을 확인해주세요.",
          });
          setDoubleCheck(() => ({
            ...doubleCheck,
            emailDoubleCheck: false,
          }));
          onModalOpen();
        } else {
          console.log(error);
        }
      });
  };

  //이메일 중복확인
  const onEmailDoubleCheck = (event) => {
    event.preventDefault();

    const emailCurrent = userEmailRef.current;

    if (emailCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: false,
      }));
      emailCurrent.focus();
      return;
    } else if (!doubleCheck.emailDoubleCheck) {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: true,
      }));
    } else {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: false,
      }));
      emailCurrent.focus();
    }

    emailDoubleCheckAxios({
      email: emailCurrent.value,
    });
  };

  //닉네임 중복확인
  const onNickNameCheck = (event) => {
    event.preventDefault();

    const nickNameCurrent = userNickNameRef.current;

    if (nickNameCurrent.value.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: false,
      }));
      nickNameCurrent.focus();
      return;
    } else if (!doubleCheck.nickNameDoubleCheck) {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: true,
      }));
    } else {
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaNickName: true,
      }));
    }
    dispatch(
      __nickNameCheck({
        nickname: nickNameCurrent.value,
        onModalOpen,
        setModalStr,
        doubleCheck,
        setDoubleCheck,
        hidden,
        Sethidden,
      })
    );
  };

  //==============유효성 검사==========================
  const onValidity = (event) => {
    const { id } = event.target;

    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userEmailCurrent = userEmailRef.current;
    const userNickNameCurrent = userNickNameRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const userPasswordCheckCurrnet = PasswordCheckRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const emailValue = userEmailCurrent.value;
    const nickNameValue = userNickNameCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const passwordCheckValue = userPasswordCheckCurrnet.value;

    if (id === "userName") {
      setStyle(() => ({
        ...style,
        bgColorName: "bg-inputBoxFocus",
        shadowName: "drop-shadow-inputBoxShadow",
      }));
      if (nameValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorName: "bg-inputBox",
          shadowName: "",
        }));
      }
      nameValidationTest(userNameCurrent);
    } else if (id === "userEmail") {
      setStyle(() => ({
        ...style,
        bgColorEmail: "bg-inputBoxFocus",
        shadowEmail: "drop-shadow-inputBoxShadow",
      }));
      if (emailValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorEmail: "bg-inputBox",
          shadowEmail: "",
        }));
      }
      emailValidationTest(userEmailCurrent);
    } else if (id === "userNickName") {
      setStyle(() => ({
        ...style,
        bgColorNickname: "bg-inputBoxFocus",
        shadowNickname: "drop-shadow-inputBoxShadow",
      }));
      if (nickNameValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorNickname: "bg-inputBox",
          shadowNickname: "",
        }));
      }
      nickNameValidationTest(userNickNameCurrent);
    } else if (id === "userPassword") {
      setStyle(() => ({
        ...style,
        bgColorPassword: "bg-inputBoxFocus",
        shadowPassword: "drop-shadow-inputBoxShadow",
      }));
      if (passwordValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPassword: "bg-inputBox",
          shadowPassword: "",
        }));
      }
      passwordValidationTest(userPasswordCurrent);
    } else if (id === "passwordCheck") {
      setStyle(() => ({
        ...style,
        bgColorPasswordCheck: "bg-inputBoxFocus",
        shadowPasswordCheck: "drop-shadow-inputBoxShadow",
      }));
      if (passwordCheckValue.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorPasswordCheck: "bg-inputBox",
          shadowPasswordCheck: "",
        }));
      }
      passwordCheckValidationTest(userPasswordCheckCurrnet);
    }
  };

  //=======================회원가입=============================
  const onSubmit = (event) => {
    event.preventDefault();

    //ref 객체
    const userNameCurrent = userNameRef.current;
    const userEmailCurrent = userEmailRef.current;
    const userNickNameCurrent = userNickNameRef.current;
    const userPasswordCurrent = userPasswordRef.current;
    const passwordCheckCurrent = PasswordCheckRef.current;

    //ref 값
    const nameValue = userNameCurrent.value;
    const emailValue = userEmailCurrent.value;
    const nickNameValue = userNickNameCurrent.value;
    const passwordValue = userPasswordCurrent.value;
    const passwordCheckValue = passwordCheckCurrent.value;

    if (nameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationName: "이름을 입력해주세요.",
      }));
      userNameCurrent.focus();
      return;
    } else {
      nameValidationTest(userNameCurrent);
      if (!hidden.hiddenErrorMeassaName) {
        return;
      }
    }
    console.log("어디찍혀?0");

    if (emailValue.trim() === "") {
      console.log("어디찍혀?1");
      Sethidden(() => ({
        ...hidden,
        hiddenErrorMeassaEmail: false,
      }));
      SetRegulation(() => ({
        ...regulation,
        regulationEmail: "이메일을 입력해주세요.",
      }));
      userEmailCurrent.focus();
      return;
    } else {
      emailValidationTest(userEmailCurrent);
      if (!doubleCheck.emailDoubleCheck) {
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaEmail: false,
        }));
        SetRegulation(() => ({
          ...regulation,
          regulationEmail: "이메일 중복확인 해주세요.",
        }));
        userEmailCurrent.focus();
        return;
      }
      if (!hidden.hiddenErrorMeassaEmail) {
        return;
      }
    }
    console.log("어디찍혀?2");

    if (nickNameValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationNickName: "닉네임을 입력해주세요.",
      }));
      userNickNameCurrent.focus();
      return;
    } else {
      nickNameValidationTest(userNickNameCurrent);
      if (!doubleCheck.nickNameDoubleCheck) {
        Sethidden(() => ({
          ...hidden,
          hiddenErrorMeassaNickName: false,
        }));
        SetRegulation(() => ({
          ...regulation,
          regulationNickName: "닉네임 중복확인 해주세요.",
        }));
        userNickNameCurrent.focus();
        return;
      }
      if (!hidden.hiddenErrorMeassaNickName) {
        return;
      }
    }

    if (passwordValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationPassword: "비밀번호를 입력해주세요.",
      }));
      userPasswordCurrent.focus();
      return;
    } else {
      passwordValidationTest(userPasswordCurrent);
      if (!hidden.hiddenErrorMeassaPassword) {
        return;
      }
    }

    if (passwordCheckValue.trim() === "") {
      SetRegulation(() => ({
        ...regulation,
        regulationPasswordCheck: "비밀번호 중복확인을 입력해주세요.",
      }));
      passwordCheckCurrent.focus();
    } else {
      if (!doubleCheck.passwordDoubleCheck) {
        SetRegulation(() => ({
          ...regulation,
          regulationPasswordCheck: "비밀번호를 확인해 주세요",
        }));
        passwordCheckCurrent.focus();
        return;
      } else {
        passwordCheckValidationTest(passwordCheckCurrent);
        if (!hidden.hiddenErrorMeassaPasswordCheck) {
          return;
        }
      }
    }
    sessionStorage.setItem("userName", nameValue);
    sessionStorage.setItem("nickname", nickNameValue);
    sessionStorage.setItem("email", emailValue);
    sessionStorage.setItem("password", passwordValue);
    sessionStorage.setItem("profileImage", null);
    navigate("/signup/setProfileImg");
  };

  useEffect(() => {
    if (singup === "emailLogin") {
      navigate("/signup/setProfileImg");
    }
  }, [dispatch, navigate, singup]);

  return (
    <>
      <div className="container">
        <div className=" grid grid-flow-row ml-[20px] mr-[20px] gap-[32px]">
          <div className=" grid grid-flow-row gap-[10px] mt-[106px]">
            <div>
              <h1 className="font-[700] text-textBlack text-[32px] mb-[10px]">
                Welcome Gnims!
              </h1>
            </div>
            <div className="font-[500] text-textBlack text-[24px] ">
              <p className="mb-[15px]">일정관리, 공유의 샛별</p>
              <p>그님스는 여러분을 환영해요!</p>
            </div>
          </div>
          <form className="">
            <div className="grid gird-rows-5 gap-[20px]">
              <div>
                <Label htmlFor="userName">이름</Label>
                <LoginSignupInputBox
                  type="text"
                  id="userName"
                  ref={userNameRef}
                  onChange={onValidity}
                  placeholder="사용자의 이름을 입력해주세요."
                  bgColor={style.bgColorName}
                  shadow={style.shadowName}
                />
                <div
                  className="flex items-center"
                  hidden={hidden.hiddenErrorMeassaName}
                >
                  <p className="h-[40px] w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                    {regulation.regulationName}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="userEmail">이메일</Label>
                <div>
                  <input
                    type="email"
                    id="userEmail"
                    ref={userEmailRef}
                    placeholder="아이디로 사용할 이메일을 입력해주세요."
                    onChange={onValidity}
                    disabled={doubleCheck.emailDoubleCheck}
                    className={`${style.bgColorEmail} ${style.shadowEmail} w-full px-1 h-[50px] text-[16px]  placeholder-inputPlaceHoldText`}
                    autoComplete="off"
                  ></input>
                  <button
                    className="absolute right-[5px] mt-[18px] font-[600] text-textBlack text-[16px]"
                    onClick={onEmailDoubleCheck}
                  >
                    중복 확인
                  </button>
                </div>
                <div hidden={hidden.hiddenErrorMeassaEmail}>
                  <p className=" w-full font-[500] mt-[20px] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationEmail}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="userNickName">닉네임</Label>
                <div>
                  <input
                    id="userNickName"
                    ref={userNickNameRef}
                    placeholder="2~8자리 숫자,한글,영문을 입력해주세요."
                    onChange={onValidity}
                    className={`${style.bgColorNickname} ${style.shadowNickname} w-full px-1 h-[50px] text-[16px]  placeholder-inputPlaceHoldText`}
                    disabled={doubleCheck.nickNameDoubleCheck}
                    autoComplete="off"
                  ></input>
                  <button
                    className="absolute right-[5px] mt-[18px] font-[600] text-textBlack text-[16px]"
                    onClick={onNickNameCheck}
                  >
                    중복 확인
                  </button>
                </div>
                <div hidden={hidden.hiddenErrorMeassaNickName}>
                  <p className=" w-full font-[500] mt-[20px] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationNickName}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="userPassword">비밀번호</Label>
                <div>
                  <LoginSignupInputBox
                    type="password"
                    id="userPassword"
                    ref={userPasswordRef}
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                    bgColor={style.bgColorPassword}
                    shadow={style.shadowPassword}
                  />
                </div>
                <div
                  hidden={hidden.hiddenErrorMeassaPassword}
                  className="mt-[10px]"
                >
                  <p className="w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationPassword}
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="passwordCheck">비밀번호 확인</Label>
                <div>
                  <LoginSignupInputBox
                    type="password"
                    id="passwordCheck"
                    placeholder="8~16자리 영문 대소문자, 숫자 조합"
                    onChange={onValidity}
                    ref={PasswordCheckRef}
                    bgColor={style.bgColorPasswordCheck}
                    shadow={style.shadowPasswordCheck}
                  />
                </div>
                <div
                  hidden={hidden.hiddenErrorMeassaPasswordCheck}
                  className="mt-[10px]"
                >
                  <p className="w-full font-[500] text-[16px] text-[#DE0D0D] flex items-center">
                    {regulation.regulationPasswordCheck}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={onSubmit}
                className="h-[50px] rounded w-full bg-[#002C51] font-[700] text-[#ffff] mt-[24px] mb-[69px]"
              >
                회원가입 완료
              </button>
            </div>
          </form>
          <IsModal
            isModalOpen={isOpen.isOpen}
            onMoalClose={onMoalClose}
            message={{ ModalStr }}
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
