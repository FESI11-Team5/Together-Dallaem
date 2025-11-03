import GNB from '@/components/commons/GNB';
import AppProviders from '@/providers/AppProviders';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const pretendard = localFont({
	src: '../fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
	variable: '--font-pretendard'
});

export const metadata: Metadata = {
	title: 'GAMEOW',
	description: '친구와 함께 즐기는 새로운 게임 커뮤니티, GAMEOW에서 소통하고 플레이하세요 🎮'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${pretendard.variable} antialiased`}>
				<AppProviders>
					{/* TODO: 공통 디자인 뽑기 */}
					<div className="box-border flex min-h-screen w-full flex-col bg-gray-900">
						<GNB />
						{children}
					</div>
				</AppProviders>
			</body>
		</html>
	);
}
