"use client";

import BaseLayout from "@/components/BaseLayout";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "@/net/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // 오류 상태 추가
  const router = useRouter();

  const submit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert("회원가입이 완료되었습니다.");
        router.push("/");
      })
      .catch((error) => {
        setError(error.message); // 오류 메시지 설정
      });
  };

  return (
    <BaseLayout>
      <div className='flex justify-center'>
        <div className='w-full max-w-md mx-auto mt-12 p-6 bg-white rounded shadow-md'>
          <h1 className='text-2xl font-bold mb-6 text-center'>회원 가입</h1>

          {error && <div className='text-red-500 text-sm mb-4'>{error}</div>}

          <div className='mb-4'>
            <input
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className='border border-solid border-gray-300 w-full p-2 rounded'
              placeholder='이메일'
            />
          </div>

          <div className='mb-4'>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='border border-solid border-gray-300 w-full p-2 rounded'
              placeholder='비밀번호'
            />
          </div>

          <div>
            <button
              className='w-full font-bold bg-blue-500 hover:bg-blue-600 text-white py-2 rounded'
              onClick={submit}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
