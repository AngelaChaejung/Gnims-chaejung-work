import axios from "axios";
import React, { useEffect } from "react";

function NaverLoginLoding() {
  const userAccessToken = () => {
    window.location.href.includes("access_token") && getToken();
  };

  const getToken = async () => {
    const navertoken = window.location.href.split("=")[1].split("&")[0];
    console.log(navertoken);

    // sessionStorage.setItem("NaverAuthorization", navertoken);
  };

  const sendTokenAndGetAuthorization = async () => {
    await axios
      .post(
        "https://eb.jxxhxxx.shop/social/naver-login",

        { token: window.location.href.split("=")[1].split("&")[0] }
      )

      .then((res) => {
        //이미 멤버라면 Authorization이 담겨 올 것이고, member라고
        console.log("res", res);
        console.log("email?", res.data.data.email);
        console.log("member?", res.data.message);
        const email = res.data.data.email;
        if (res.data.message !== "non-member") {
          const accessToken = res.headers.get("Authorization");
          const nickname = res.data.data.nickname;
          const userId = res.data.data.userId;
          const profileImage = res.data.data.profileImage;
          console.log(nickname);
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("nickname", nickname);
          sessionStorage.setItem("profileImage", profileImage);
          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("email", email);
          alert("그님스에 오신걸 환영합니다");
          return window.location.assign("/main");

          //멤버가 아닐시 프로필 정보를 받는 페이지로 돌려야함
        } else if (res.data.message === "non-member") {
          alert("그님스를 이용하려면 프로필 정보를 입력해줘야합니다.");
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("socialCode", "NAVER");
          return window.location.assign("/signup/setProfileName");
        }
      });
    // console.log(data);
  };

  useEffect(() => {
    userAccessToken();
    getToken();
    sendTokenAndGetAuthorization();
  }, []);

  return (
    <div>
      <div>loding...</div>
    </div>
  );
}

export default NaverLoginLoding;
