import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/clientApp';

export default function Signup()  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // 이메일/비밀번호로 회원가입
  const handleSignup = async (e:any) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('회원가입 성공:', userCredential.user);
      router.push('/'); // 회원가입 성공 시 홈 페이지로 리다이렉트
    } catch (error) {
      if (error instanceof Error) {
        console.error('회원가입 에러:', error.message);
        alert(error.message); 
      } else {
        console.error('회원가입 에러:', error);
        alert('An unexpected error occurred'); 
      }
  };

  // Google 로그인으로 회원가입
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google 회원가입 성공:', result.user);
      router.push('/'); // 회원가입 성공 시 홈 페이지로 리다이렉트
    }  catch (error) {
      if (error instanceof Error) {
        console.error('Google 회원가입 에러:', error.message);
        alert(error.message); 
      } else {
        console.error('Google 회원가입 에러:', error);
        alert('예상치 못한 에러가 발생했습니다'); 
      }
    }

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="email">이메일:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      <button onClick={handleGoogleSignup}>Google로 회원가입하기</button>
    </div>
  );
};
}
}