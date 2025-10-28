'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import MeSkeleton from '@/components/me/skeleton';

/**
 * `MeLayout` 컴포넌트
 *
 * 로그인된 사용자만 접근 가능한 페이지의 레이아웃을 제공합니다.
 * - 페이지 접근 시 사용자가 인증되어 있지 않으면 `RequiredLoginPopup` 모달을 표시합니다.
 *
 * @param {object} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 레이아웃 내부에 렌더링될 자식 컴포넌트
 * @returns {JSX.Element} 자식 컴포넌트를 포함한 레이아웃
 */
// TODO: 페이지 가드에서 미들웨어로 바꾸기
export default function MeLayout({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuth();
	const { openModal } = useModal();
	const hasOpenedRef = useRef(false);

	useEffect(() => {
		if (isAuthenticated === null) return;
		if (!isAuthenticated && !hasOpenedRef.current) {
			openModal(<RequiredLoginPopup next="/me" />);
			hasOpenedRef.current = true;
		}
	}, [isAuthenticated]);

	// 하이드레이션 중 (인증 확인 중)
	if (isAuthenticated === null) return <MeSkeleton />;
	// 하이드레이션 후 로그인이 안된 경우
	if (!isAuthenticated) {
		return <div className="box-border bg-gray-100" />;
	}

	return children;
}
