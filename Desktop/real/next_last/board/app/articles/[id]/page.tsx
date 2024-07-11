'use client';

import BaseLayout from '@/components/BaseLayout';
import db from '@/net/db';
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Firestore 문서 데이터 타입 정의
interface Article {
  id?: string;
  subject?: string;
  author?: string;
  created_at?: number;
  content?: string | number;
  point?: number; // Firestore 타임스탬프는 milliseconds로 처리
}

type Params = { params: { id: string } };
export default function Articles({ params }: Params) {
  const [list, setList] = useState<Article[]>([]);
  useEffect(() => {
    const q = query(collection(db, 'articles'), orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (results) => {
      const newList: Article[] = [];
      results.forEach((doc) => {
        const data = doc.data() as Omit<Article, 'id'>; // 문서 데이터를 가져오면서 id를 제외한 타입 적용
        newList.push({
          id: doc.id,
          ...data,
        });
      });
      setList(newList);
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);
  console.log(list);
  const finalData = list.find((object: Article) => object.id === params.id);
  console.log(finalData);
  console.log(params.id);
  return (
    <BaseLayout>
      <ul>
        <>
          <h1>게시글</h1>
          <h1>제목: {finalData?.subject}</h1>
          <h2>작성자:{finalData?.author}</h2>
          <h3>내용: {finalData?.content}</h3>
          {/* <button onClick={update} className='btn-primary'>
            수정하기
          </button>
          <button onClick={Boarddelete} className='btn-danger'>
            삭제하기
          </button> */}
        </>
      </ul>
      <div className='mb-8 w-full flex justify-end'>
        <Link href='/create'>
          <button className='border p-2 bg-black text-white'>글쓰기</button>
        </Link>
      </div>
    </BaseLayout>
  );
}
