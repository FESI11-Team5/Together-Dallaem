'use client';

import { postSignout } from '@/apis/auths/signout';
import type { OptionType } from '@/components/commons/basic/BasicDropbox';
import { DropdownMenu } from '@/components/commons/GNB/DropdownMenu';
import { useUserStore } from '@/stores/user';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function GNB() {
	const router = useRouter();
	const pathname = usePathname();
	const user = useUserStore(state => state.user);
	const signoutUser = useUserStore(state => state.signoutUser);

	const DROPDOWN_MENU_OPTIONS: OptionType[] = [
		{ value: 'myPage', text: '마이페이지' },
		{ value: 'signout', text: '로그아웃' }
	];

	const handleClick = async (value: string | number) => {
		if (value === DROPDOWN_MENU_OPTIONS[0].value) {
			router.push('/me');
			return;
		}

		await postSignout();
		signoutUser();
		if (pathname === '/me') {
			router.push('/');
		}
	};

	return (
		<header className="tb:h-15 tb:px-6 pc:px-[360px] flex h-14 w-full items-center justify-between border-b-2 border-gray-900 bg-orange-600 px-4">
			<div className="tb:gap-4 flex items-center gap-3">
				<h1 className="text-lg font-extrabold text-white">
					<Link href="/">같이 달램</Link>
				</h1>
				<nav className="tb:text-base leading-sm tb:leading-base tb:gap-6 flex items-center gap-3 text-sm font-semibold text-orange-50">
					<Link href="/">모임 찾기</Link>
					<Link href="/favorites">찜한 모임</Link>
					<Link href="/reviews">모든 리뷰</Link>
				</nav>
			</div>

			{user?.token ? (
				<DropdownMenu>
					<DropdownMenu.Trigger>
						<Image
							priority
							src={user?.image || '/images/profile.svg'}
							alt="프로필 사진"
							width={40}
							height={40}
							className="rounded-full"
						/>
					</DropdownMenu.Trigger>
					<DropdownMenu.Items options={DROPDOWN_MENU_OPTIONS} onClick={handleClick} />
				</DropdownMenu>
			) : (
				<Link href="/signin" className="leading-sm tb:leading-base tb:text-base text-sm font-semibold text-white">
					로그인
				</Link>
			)}
		</header>
	);
}
