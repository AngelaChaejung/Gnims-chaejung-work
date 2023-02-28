import React, { useState } from "react";
import Label from "../layout/Label";
import LoginSignupInputBox from "../layout/input/LoginSignupInputBox";
import IsModal from "../modal/Modal";
import { useRef } from "react";
import { LoginApi } from "../../api/LoginApi";

const InputEmail = () => {
  const emailRef = useRef();
  const authenticationNumberRef = useRef();
  const [style, setStyle] = useState({
    bgColorEmail: "bg-inputBox",
    shadowEmail: "",
    bgColorAuthenticationNumber: "bg-inputBox",
    shadowAuthenticationNumber: "",
  });
  const [regulation, setRegulation] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [ModalStr, setModalStr] = useState({
    modalTitle: "",
    modalMessage: "",
  });
  const [isLoding, setIsLoding] = useState(false);
  const [InputCheck, setInputCheck] = useState(false);
  const onModalOpen = () => {
    setOpen({ isOpen: true });
  };
  const onMoalClose = () => {
    setOpen({ isOpen: false });
  };

  const onInputColor = (event) => {
    const { id, value } = event.target;
    if (id === "email") {
      console.log("email입니다");
      setStyle(() => ({
        ...style,
        bgColorEmail: "bg-inputBoxFocus",
        shadowEmail: "drop-shadow-inputBoxShadow",
      }));
      if (value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorEmail: "bg-inputBox",
          shadowEmail: "",
        }));
      }
    } else {
      setStyle(() => ({
        ...style,
        bgColorAuthenticationNumber: "bg-inputBoxFocus",
        shadowAuthenticationNumber: "drop-shadow-inputBoxShadow",
      }));
      if (value.trim() === "") {
        setStyle(() => ({
          ...style,
          bgColorAuthenticationNumber: "bg-inputBox",
          shadowAuthenticationNumber: "",
        }));
      }
    }
  };

  const onSendEmail = () => {
    const email = emailRef.current;
    if (email.value.trim() === "") {
      setRegulation(() => "이메일을 입력해주세요");
    } else {
      setRegulation(() => "");
    }
    sendEmail({ email: email.value });
  };

  const sendEmail = async (payload) => {
    try {
      setIsLoding(() => true);
      onModalOpen();
      const data = await LoginApi.SendEmailAuthenticationNumber(payload);
      setIsLoding(() => false);
      setModalStr({
        modalTitle: "이메일함을 확인해주세요",
        modalMessage: "인증번호를 입력해주세요",
      });
      setInputCheck(() => true);
    } catch (error) {
      console.log(error.response);
      const { data } = error.response;
      if (data.status === 400) {
        setIsLoding(() => false);
        setModalStr({
          modalTitle: data.message,
          modalMessage: "이메일을 확인해주세요.",
        });
      }
    }
  };

  const onSubmitNextPage = () => {
    const email = emailRef.current;
    const authenticationNumber = authenticationNumberRef.current;

    if (email.value.trim() === "") {
      setRegulation(() => "이메일을 입력해주세요");
      email.focus();
      return;
    } else if (authenticationNumber.value.trim() === "") {
      setRegulation(() => "인증번호를 입력해주세요");
      authenticationNumber.focus();
      return;
    }

    if (InputCheck) {
      onSubmitNextPageAxios({
        email: email.value,
        code: authenticationNumber.value,
      });
    }
  };

  const onSubmitNextPageAxios = async (payload) => {
    try {
      setIsLoding(() => true);
      onModalOpen();
      const data = await LoginApi.SendAuthenticationNumber(payload);
      setIsLoding(() => false);
      console.log(data);
    } catch (error) {
      console.log(error.response);
      const { data } = error.response;
      if (data.status === 400) {
        setIsLoding(() => false);
        setModalStr({
          modalTitle: "인증번호 실패",
          modalMessage: `인증번호가 잘못 입력되었습니다. \n 인증요청을 재시도 해주세요.`,
        });
      }
    }
  };

  return (
    <div className="container ">
      <div className=" grid grid-flow-row ml-[20px] mr-[20px] mt-[55px]">
        <div className="mb-[4px]">
          <Label>비밀번호를 분실한 아이디를 입력해주세요</Label>
        </div>
        <div className="w-full">
          <div className="flex flex-col gap-[12px]">
            <div className="flex items-center gap-[20px] w-full">
              <input
                id="email"
                type={"email"}
                ref={emailRef}
                onChange={onInputColor}
                autoComplete="off"
                placeholder="아이디(이메일) 입니다."
                className={`w-[234px] px-3 h-[50px] ${style.bgColorEmail} ${style.shadowEmail} placeholder-inputPlaceHoldText`}
              />
              <div
                onClick={onSendEmail}
                className="bg-[#FFFFFF] border-solid border-2 text-[16px] font-[600] border-[#002C51] p-[10px] rounded-[4px] leading-[28px] cursor-pointer"
              >
                인증 요청
              </div>
            </div>
            <div className="flex items-center h-[20px]">
              <p className=" w-full font-[500] text-[16px]  text-[#DE0D0D] flex items-center">
                {regulation}
              </p>
            </div>
            <div className="h-[full]">
              <LoginSignupInputBox
                id="AuthenticationNumber"
                type="text"
                placeholder="인증번호 입력"
                onChange={onInputColor}
                bgColor={style.bgColorAuthenticationNumber}
                shadow={style.shadowAuthenticationNumber}
                ref={authenticationNumberRef}
              />
            </div>
          </div>
          <div>
            <button
              className="mt-[65px] w-full bg-[#002C51] h-[40px] rounded-[4px] font-[600] text-[#fff]"
              onClick={onSubmitNextPage}
            >
              확인
            </button>
          </div>
        </div>
        <IsModal
          isModalOpen={isOpen.isOpen}
          onMoalClose={onMoalClose}
          message={{ ModalStr }}
          isLoding={isLoding}
        />
      </div>
    </div>
  );
};

export default InputEmail;
