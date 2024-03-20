import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 초기화
const auth = getAuth(app);

// Google 로그인 함수
const signInWithGoogle = () => {
  console.log('signInWithGoogle called');
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // 로그인 성공 처리
      console.log(result);
    })
    .catch((error) => {
      // 로그인 실패 처리
      console.error(error);
    });
};

export { signInWithGoogle };
