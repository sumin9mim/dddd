"use client";

import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import auth from '@/net/auth'; // auth의 타입이 올바르게 정의되어 있어야 합니다.
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/sign-in"); // 로그아웃 후 로그인 페이지로 이동
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return (
    <header className='mb-9 border-b border-gray-400 p-3 flex justify-between items-center'>
      <div className='text-xl font-bold'>QuantumJump NoticeBoard</div>
      <div className='flex items-center'>
        {user ? (
          <button
            onClick={handleSignOut}
            className='bg-red-500 text-white font-bold text-xs px-3 py-1 rounded-full hover:bg-red-600 transition duration-300'
          >
            로그아웃
          </button>
        ) : (
          <div className='flex space-x-4'>
            <Link href='/sign-in'>
              <button className='bg-green-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-green-600 transition duration-300'>
                로그인
              </button>
            </Link>
            <Link href='/sign-up'>
              <button className='bg-blue-500 text-white font-bold text-sm px-3 py-1 rounded-full  hover:bg-blue-600 transition duration-300'>
                회원가입
              </button>
            </Link>
          </div>
        )}
      </div>
    </header> // 삼항연산자 사용 --> 즉, user가 존재하면(로그인 상태) 로그아웃을 보이고 존재하지 않으면(로그인 안한 상태) 로그인을 보여라.
  );
}
