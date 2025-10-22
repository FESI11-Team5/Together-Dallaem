'use client';

import { createContext, useContext } from 'react';
import type { Gathering } from '@/types/response/gatherings';

interface GatheringContextProps {
	gathering: Gathering | null;
}

const GatheringContext = createContext<GatheringContextProps>({ gathering: null });

export const GatheringProvider = ({ children, value }: { children: React.ReactNode; value: GatheringContextProps }) => (
	<GatheringContext.Provider value={value}>{children}</GatheringContext.Provider>
);

export const useGathering = () => useContext(GatheringContext);
