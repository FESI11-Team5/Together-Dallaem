'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect, useState } from 'react';
import { type ModalStore, createModalStore } from '@/stores/modal';

/**
 * Zustand 모달 스토어 인스턴스 타입
 *
 * createModalStore()가 반환하는 스토어 객체의 전체 인터페이스를 나타냅니다.
 * 모달 상태와 함께 subscribe, getState 등의 내부 메서드도 포함됩니다.
 */
export type ModalStoreInstance = ReturnType<typeof createModalStore>;

/** 모달 스토어를 관리하는 컨텍스트 */
export const ModalStoreContext = createContext<ModalStoreInstance | undefined>(undefined);

/**
 * 모달 컴포넌트가 자신을 닫을 수 있도록 하는 컨텍스트
 * 현재 열린 모달의 닫기 함수를 제공합니다.
 */
export const ModalCloseContext = createContext<(() => void) | undefined>(undefined);

/** ModalStoreProvider의 props 타입 */
export interface ModalStoreProviderProps {
	/** 자식 컴포넌트들 */
	children: ReactNode;
}

/**
 * 모달 상태를 관리하는 Provider 컴포넌트
 *
 * 애플리케이션 전체에서 모달 상태를 공유할 수 있도록
 * 모달 스토어를 컨텍스트로 제공합니다.
 *
 * @param props - ModalStoreProviderProps 객체
 * @returns JSX.Element
 */

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
	const storeRef = useRef<ModalStoreInstance | null>(null);

	if (storeRef.current === null) {
		storeRef.current = createModalStore();
	}

	return <ModalStoreContext.Provider value={storeRef.current}>{children}</ModalStoreContext.Provider>;
};

/**
 * 모달 스토어를 사용하기 위한 커스텀 훅
 *
 * 지정된 셀렉터로 모달 상태를 구독하고, 상태가 변경될 때마다 리렌더링을 트리거합니다.
 *
 * @template T 반환 타입
 * @param selector - 스토어에서 원하는 상태를 선택하는 함수
 * @returns 스토어 상태
 * @throws {Error} ModalStoreProvider 외부에서 사용할 경우 에러 발생
 *
 * @example
 * // 모달 목록 가져오기
 * const modals = useModalStore(state => state.modals);
 *
 * // 모달 열기 함수만 가져오기
 * const openModal = useModalStore(state => state.openModal);
 */
export const useModalStore = <T,>(selector: (store: ModalStore) => T): T => {
	const context = useContext(ModalStoreContext);

	if (!context) {
		throw new Error('useModalStore must be used within ModalStoreProvider');
	}

	const [state, setState] = useState<T>(() => selector(context.getState()));

	useEffect(() => {
		const unsubscribe = context.subscribe(state => {
			setState(selector(state));
		});

		return unsubscribe;
	}, [context, selector]);

	return state;
};
