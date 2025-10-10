import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="pc:flex-row pc:h-screen pc:gap-20 tb:px-16 flex w-screen flex-col items-center justify-center gap-10 bg-gray-100 px-4 py-16">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2 text-center">
					<h2 className="tb:text-2xl text-xl font-semibold">Welcome to 같이 달램!</h2>
					<p className="tb:text-base text-sm font-medium whitespace-pre-line">
						바쁜 일상 속 잠깐의 휴식,
						<br />
						이제는 같이 달램과 함께 해보세요
					</p>
				</div>
				<Image
					priority
					src="/images/img_login.svg"
					alt="메인 일러스트"
					width={588}
					height={486}
					className="tb:max-w-[407px] pc:max-w-[588px] max-w-[290px]"
				/>
			</div>

			<section className="tb:px-16 pc:px-[54px] flex max-w-[510px] flex-col gap-8 rounded-3xl bg-white px-4 py-8 whitespace-nowrap">
				{children}
			</section>
		</div>
	);
}
