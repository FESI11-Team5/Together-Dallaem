import { cn } from '@/utils/cn';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="bg-root flex w-full flex-1">
			<div className="pc:flex-row pc:gap-30 pc:max-w-300 mb:px-16 pc:justify-between m-auto flex h-full w-full flex-col items-center justify-center gap-10 px-4 py-8">
				<div className="flex flex-col items-center justify-center gap-4">
					<div
						className={cn(
							'text-primary-50 flex flex-col gap-2 text-center',
							'[text-shadow:0_0_2px_#b3b3b3,0_0_4px_#b3b3b3,0_0_8px_#b3b3b3,0_0_16px_#b3b3b3,0_0_32px_#b3b3b3]'
						)}>
						<h2 className="mb:text-2xl text-xl font-semibold">Gameow에 오신 걸 환영해요!</h2>
						<p className="mb:text-base text-sm font-medium">게임도 친구도, 같이 즐겨요 🎮</p>
					</div>
					<div className="pc:h-[388px] pc:w-[350px] mb:h-[333px] mb:w-[300px] relative h-[222px] w-[200px]">
						<Image priority src="/images/glow_logo.svg" alt="메인 일러스트" fill className="object-cover" />
					</div>
				</div>
				<section className="mb:px-16 pc:max-w-[510px] tb:max-w-[600px] border-primary-50 flex w-full flex-1 flex-col gap-4 rounded-3xl border-2 px-4 py-6 shadow-[0_0_30px_var(--color-primary-100)]">
					{children}
				</section>
			</div>
		</div>
	);
}
