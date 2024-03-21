import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Firebase 프로젝트 설정에서 환경 변수 사용
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Auth 인스턴스 export
export const auth = getAuth(app);

// Google 로그인 함수
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // 로그인 성공 처리
    console.log('Google 로그인 성공:', result.user);
    return result.user; // 로그인한 사용자 정보 반환
  } catch (error) {
    // 로그인 실패 처리
    console.error('Google 로그인 실패:', error);
    throw error; // 에러를 다시 던져서 호출한 곳에서 처리할 수 있도록 함
  }

};
