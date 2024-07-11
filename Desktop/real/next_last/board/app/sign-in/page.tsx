"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/net/auth";
import BaseLayout from "@/components/BaseLayout";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const submit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        router.push("/"); // 메인페이지로 이동!
      })
      .catch((error:string) => {
        console.warn(error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <BaseLayout>
      <div className='flex justify-center'>
        <div className='w-full max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-4 text-center'>로그인</h1>

          <div className='mb-4'>
            <input
              type='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
              placeholder='이메일'
            />
          </div>

          <div className='mb-4'>
            <input
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500'
              placeholder='비밀번호'
            />
          </div>

          <div className='flex justify-end'>
            <button
              className='w-full font-bold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
              onClick={submit}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}
