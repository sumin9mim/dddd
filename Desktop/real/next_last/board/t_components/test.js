"use client";

import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "@/net/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loadTossPayments } from '@tosspayments/payment-widget-sdk';
import { v4 as uuidv4 } from 'uuid';


export default function Header() {
  const [user, setUser] = useState(null);
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

  const handlePayment = async () => {
    const tossPayments = await loadTossPayments(test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm); // 클라이언트 키를 설정하세요.
  const orderId = uuidv4(); // UUID를 사용하여 고유한 주문 ID 생성

    tossPayments.requestPayment('카드', {
      amount: 5000, // 결제 금액 설정
      orderId: orderId, // 주문 ID 설정
      orderName: '충전', // 주문명 설정
      customerName: user.displayName, // 고객명 설정
      successUrl: 'http://localhost:3000/', // 결제 성공 시 리디렉션 URL 설정
      failUrl: 'http://localhost:3000/', // 결제 실패 시 리디렉션 URL 설정
    });
  };

  return (
    <header className='mb-9 border-b border-gray-400 p-3 flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <div className='text-xl font-bold'>QuantumJump NoticeBoard</div>
        {user && (
          <button
            onClick={handlePayment}
            className='bg-yellow-500 text-white font-bold text-sm px-3 py-1 rounded-full hover:bg-yellow-600 transition duration-300'
          >
            충전
          </button>
        )}
      </div>
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
    </header>
  );
}