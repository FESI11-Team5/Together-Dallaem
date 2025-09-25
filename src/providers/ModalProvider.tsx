'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect, useState } from 'react';
import { type ModalStore, createModalStore } from '@/app/stores/modal';

export type ModalStoreApi = ReturnType<typeof createModalStore>;

export const ModalStoreContext = createContext<ModalStoreApi | undefined>(undefined);

// 모달 컴포넌트가 자신을 닫을 수 있도록 하는 Context
export const ModalCloseContext = createContext<(() => void) | undefined>(undefined);

export interface ModalStoreProviderProps {
	children: ReactNode;
}

export const ModalStoreProvider = ({ children }: ModalStoreProviderProps) => {
	const storeRef = useRef<ModalStoreApi | null>(null);

	if (storeRef.current === null) {
		storeRef.current = createModalStore();
	}

	return <ModalStoreContext.Provider value={storeRef.current}>{children}</ModalStoreContext.Provider>;
};

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
