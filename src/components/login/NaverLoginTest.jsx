import { NAVER_AUTH_URL } from "../../shared/OAuth";
import naverlogo from "../../img/naverlogo.png";
import axios from "axios";
import { useEffect } from "react";
const NaverLoginTest = () => {
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = () => {
    console.log(window.location.href);
    const navertoken = window.location.href.split("=")[1].split("&")[0];
    console.log(navertoken);
    // URL에서 추출한 access token을 로컬 스토리지에 저장
    localStorage.setItem("NaverAuthorization", navertoken);
  };

  const sendTokenAndGetAuthorization = async () => {
    const { data } = await axios
      .get(`http://hayangaeul.shop/naver/login`, {
        headers: { token: localStorage.getItem("NaverAuthorization") },
      })
      .then((res) => {
        localStorage.setItem("Authorization", res.headers.get("Authorization"));
      });
    console.log(data);
  };
  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
    userAccessToken();
    sendTokenAndGetAuthorization();
  };
  // 화면 첫 렌더링이후 바로 실행
  //   useEffect(() => {
  //     //   initializeNaverLogin();
  //     userAccessToken();
  //     sendTokenAndGetAuthorization();
  //   }, []);

  return (
    <img
      alt="naverlogin"
      className="w-[20px] h-[19px]"
      type="button"
      onClick={handleLogin}
      src={naverlogo}
    ></img>
  );
};

export default NaverLoginTest;
