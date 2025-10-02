'use client';

import { isAuthenticated } from '@/utils/token';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	useEffect(() => {
		if (!isAuthenticated()) {
			router.push('/login?next=' + encodeURIComponent(pathname));
		}
	}, [pathname, router]);

	// TODO: 로그인 해주세요 팝업 창으로 이동

	return <>{children}</>;
}
