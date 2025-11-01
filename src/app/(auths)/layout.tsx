import { cn } from '@/utils/cn';
import Image from 'next/image';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<div className="tb:flex-row tb:gap-20 mb:px-16 bg-root flex h-full w-screen flex-1 flex-col items-center justify-center gap-10 px-4 py-16">
			<div className="flex flex-col gap-4">
				<div
					className={cn(
						'text-primary-50 flex flex-col gap-2 text-center',
						'[text-shadow:0_0_1px_#e6fffa,0_0_0px_#e6fffa,0_0_0px_#e6fffa,0_0_2px_#e6fffa]'
					)}>
					<h2 className="mb:text-2xl text-xl font-semibold">Gameow에 오신 걸 환영해요!</h2>
					<p className="mb:text-base text-sm font-medium">게임도 친구도, 같이 즐겨요 🎮</p>
				</div>
				<div className="mb:max-w-[407px] tb:max-w-[588px] relative h-[444px] w-[400px] max-w-[290px]">
					<Image priority src="/images/glow_logo.svg" alt="메인 일러스트" fill className="object-cover" />
				</div>
			</div>

			<section className="mb:px-16 tb:px-[54px] tb:max-w-[510px] mb:max-w-[608px] shadow-primary-50/50 border-primary-50 box-border flex w-full max-w-[343px] flex-col gap-8 rounded-3xl border-2 px-4 py-8 whitespace-nowrap shadow-lg">
				{children}
			</section>
		</div>
	);
}
