'use client';

import BasicDropbox, { type OptionType } from '@/components/commons/basic/BasicDropbox';
import { createContext, useCallback, useContext, useEffect, useReducer, useRef, type RefObject } from 'react';

interface DropdownMenuContextProps {
	isOpen: boolean;
	toggle: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextProps>({
	isOpen: false,
	toggle: () => {}
});

const useDropdwonMenuContext = () => {
	const ctx = useContext(DropdownMenuContext);
	if (!ctx) {
		throw new Error('DropDownMenu Context 내에서만 사용 가능합니다.');
	}
	return ctx;
};

interface DropdownMenuRootProps {
	children: React.ReactNode;
}

function DropdownMenuRoot({ children }: DropdownMenuRootProps) {
	const [isOpen, toggle] = useReducer(state => !state, false);

	return (
		<DropdownMenuContext.Provider value={{ isOpen, toggle }}>
			<div role="menu" aria-label="DropdownMenu" className="relative inline-block">
				{children}
			</div>
		</DropdownMenuContext.Provider>
	);
}

interface DropdownMenuTriggerProps {
	children: React.ReactNode;
}

function DropdownMenuTrigger({ children }: DropdownMenuTriggerProps) {
	const { toggle } = useDropdwonMenuContext();
	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation();
		toggle();
	};

	return (
		<div role="button" aria-label="DropdownMenu Trigger" className="cursor-pointer select-none" onClick={handleClick}>
			{children}
		</div>
	);
}

interface DropdownMenuContentProps {
	options: OptionType[];
	onClick: (value: string | number) => void;
}

function DropdownMenuContent({ options, onClick }: DropdownMenuContentProps) {
	const { isOpen, toggle } = useDropdwonMenuContext();
	const ref = useRef<HTMLDivElement>(null);

	const handleOutsideClick = useCallback(
		(e: MouseEvent) => {
			if (!ref.current?.contains(e.target as Node)) {
				toggle();
			}
		},
		[toggle]
	);

	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener('click', handleOutsideClick);
		return () => document.removeEventListener('click', handleOutsideClick);
	}, [isOpen, handleOutsideClick]);

	const handleClick = (value: string | number) => {
		toggle();
		onClick(value);
	};

	if (!isOpen) {
		return null;
	}

	return (
		<BasicDropbox
			className="pc:left-0"
			ref={ref as RefObject<HTMLDivElement>}
			options={options}
			callbackOnclick={handleClick}
		/>
	);
}

export const DropdownMenu: typeof DropdownMenuRoot & {
	Trigger: typeof DropdownMenuTrigger;
	Content: typeof DropdownMenuContent;
} = Object.assign(DropdownMenuRoot, {
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent
});
