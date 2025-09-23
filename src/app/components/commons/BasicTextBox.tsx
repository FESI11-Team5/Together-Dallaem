//figma input component

import React from 'react';

export default function BasicTextBox({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<div>
			<div
				// prettier-ignore
				className={`
          textBox flex w-full items-center justify-between font-medium
          rounded-[12px] bg-gray-50 px-[16px] py-[10px] text-gray-800 ${className}
        `}>
				{children}
			</div>
		</div>
	);
}
