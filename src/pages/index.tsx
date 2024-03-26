import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '../firebase/clientApp';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    router.push('/login');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-semibold mt-8">홈 페이지</h1>
      {user ? (
        <div className="mt-4">
          <p>환영합니다, {user.email}!</p>
          <Link href="/products">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">상품 보기</button>
          </Link>
          <Link href="/cart">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2">장바구니</button>
          </Link>
          <Link href="/checkout">
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg">체크아웃</button>
          </Link>
          <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg">로그아웃</button>
        </div>
      ) : (
        <div className="mt-4">
          <Link href="/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">로그인</button>
          </Link>
          <Link href="/signup">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">회원가입</button>
          </Link>
        </div>
      )}
    </div>
  );
}
