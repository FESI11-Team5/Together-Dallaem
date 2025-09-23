'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GatheringType } from './types/gatheringType';

export default function Home() {
	const router = useRouter();
	const [data, setData] = useState<GatheringType[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gatherings`, {
					method: 'GET'
				});

				if (!response.ok) {
					throw new Error('데이터를 가져오는 중 오류가 발생하였습니다.');
				}

				const data = await response.json();
				setData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	console.log(data);
	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<h1 className="tb:text-orange-300 mb:text-gray-800 pc:text-3xl pc:leading-xl pc:text-orange-950 items-center justify-center text-xs font-light underline">
				TEAM5 화이팅 !!
			</h1>
			<button onClick={() => router.push('/gatherings')}>모임 만들기 (모달 컴포넌트로 바뀔 예정)</button>
		</div>
	);
}
