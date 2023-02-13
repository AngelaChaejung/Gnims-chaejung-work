/* 
카카오 인가코드를 받기 위한 URL 페이지로 넘어가기 위한 세팅
REST API KEY와 REDIRECT URI는 왠만하면 한명의 키로 사용할것 
REST_API_KEY 는 다를수 있어도 REDIRECT URI만큼은 백앤드와 프론트 모두 맞춰서 사용할것 
*/

const REDIRECT_URI = "http://localhost:3000/auth/kakao/callback";
//민우님 카카오 api
const REST_API_KEY = "6e659b5f78ef7ca493658b8cefa98aa2";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export const REACT_APP_NAVER_CALLBACK_URL = "http://localhost:3000/callback";
export const REACT_APP_NAVER_CLIENT_ID = "T9R5hFNUTuTa1UqoVBcO";
// { REACT_APP_NAVER_CLIENT_ID, REACT_APP_NAVER_CALLBACK_URL } =
//   process.env;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${REACT_APP_NAVER_CALLBACK_URL}&state=state`;
