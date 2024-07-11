"use client";

import BaseLayout from "@/components/BaseLayout";
import Link from "next/link";
import db from "@/net/db";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

// Firestore 문서 데이터 타입 정의
interface Article {
  id: string;
  subject: string;
  author: string;
  created_at: number; // Firestore 타임스탬프는 milliseconds로 처리
}

export default function Home() {
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
  return (
<BaseLayout>
      <ul>
        <li className='flex flex-row w-full border-b p-2 mb-4'>
          <div className='flex-1 font-bold'>제목</div>
          <div className='w-64 font-bold'>작성자</div>
          <div className='w-64 font-bold'>작성일시</div>
        </li>
        {list.map((item) => (
          <li key={item.id} className='flex flex-row w-full border-b p-2 mb-4'>
            <div className='flex-1'>
              <Link href={`/articles/${item.id}`}>{item.subject}</Link>
            </div>
            <div className='w-64'>{item.author}</div>
            <div className='w-64'>
              {DateTime.fromMillis(item.created_at).toFormat(
                "yyyy-LL-dd HH:mm:ss"
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className='mb-8 w-full flex justify-end'>
        <Link href='/create'>
          <button className='border p-2 bg-black text-white'>글쓰기</button>
        </Link>
      </div>
    </BaseLayout>
  );
}
