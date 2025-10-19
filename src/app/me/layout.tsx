'use client';

import RequiredLoginPopup from '@/components/auth/Popup/RequiredLoginPopup';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModal';
import { useEffect } from 'react';
/**
 * `MeLayout` 컴포넌트
 *
 * 로그인된 사용자만 접근 가능한 페이지의 레이아웃을 제공합니다.
 * - 페이지 접근 시 사용자가 인증되어 있지 않으면 `RequiredLoginPopup` 모달을 표시합니다.
 * - 모달에는 현재 경로(`pathname`)를 전달하여 로그인 후 돌아올 수 있도록 지원합니다.
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

	useEffect(() => {
		if (!isAuthenticated) {
			openModal(<RequiredLoginPopup next="/me" />);
		}
	}, [openModal, isAuthenticated]);

	if (!isAuthenticated) {
		return <div className="box-border bg-gray-100"></div>;
	}

	return children;
}
