'use client';

import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import { useModal } from '@/hooks/useModal';
import { isAuthenticated } from '@/utils/token';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MeLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { openModal } = useModal();

	useEffect(() => {
		if (!isAuthenticated()) {
			openModal(<RequiredLoginPopup next={pathname} />);
		}
	}, [pathname]);

	return <>{children}</>;
}
