'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
/**
 * `MeLayout` 컴포넌트
 *
 * 로그인된 사용자만 접근 가능한 페이지의 레이아웃을 제공합니다.
 * - 페이지 접근 시 사용자가 인증되어 있지 않으면 `RequiredLoginPopup` 모달을 표시합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링될 자식 컴포넌트
 * @returns {JSX.Element} 자식 컴포넌트를 포함한 레이아웃
 *
 * @example
 * ```tsx
 * <MeLayout>
 *   <UserProfile />
 * </MeLayout>
 * ```
 */
export default function MeLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	const { openModal } = useModal();

	const hasOpenedRef = useRef(false);

	useEffect(() => {
		if (isAuthenticated === false && !hasOpenedRef.current) {
			openModal(<RequiredLoginPopup next="/me" />);
			hasOpenedRef.current = true;
			console.log(isAuthenticated);
		}
	}, [isAuthenticated, openModal]);

	if (!isAuthenticated) {
		return <div className="box-border bg-gray-100"></div>;
	}

	return children;
}
