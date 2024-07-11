'use client';

import BaseLayout from '@/components/BaseLayout';
import auth from '@/net/auth';
import db from '@/net/db';
import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Create() {
  const [subject, setSubject] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [user, setUser] = useState<User | null>(null); // User 또는 null 타입 지정
  const router = useRouter();
  const submit = async () => {
    if (user) {
      await addDoc(collection(db, 'articles'), {
        subject,
        content,
        author: user.email,
        created_at: new Date().getTime(),
      }); // articles라는 collection 안에 문서를 추가하겠다.
      alert('저장되었습니다.');
      setSubject('');
      setContent('');
      router.push('/');
    } else {
      alert('사용자가 인증되지 않았습니다.');
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });

  return (
    <BaseLayout>
      <h1 className='text-2xl font-bold mb-8'>글쓰기</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          return false;
        }}
      >
        <div className='mb-4'>
          <input
            className='border-b w-full'
            type='text'
            placeholder='제목을 입력하세요.'
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          />
        </div>

        <div className='mb-4'>
          <textarea
            className='border-b w-full'
            placeholder='내용을 입력하세요.'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>
        <div>
          <button className='border p-2' onClick={submit}>
            전송
          </button>
        </div>
      </form>
    </BaseLayout>
  );
}
