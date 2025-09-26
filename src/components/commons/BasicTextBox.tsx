//figma input component

import React from 'react';

interface TextBoxProps {
	/** 텍스트 박스 내부에 표시될 콘텐츠 */
	children: React.ReactNode;
	/** 추가할 커스텀 CSS 클래스명 */
	className?: string;
}

/**
 * 재기본 텍스트 박스 컴포넌트
 *
 * 단순한 컨테이너 역할을 하는 텍스트 박스로,
 * 스타일이 적용된 배경과 페딩이 있는 박스입니다.
 *
 * @param props - TextBoxProps 객체
 * @returns JSX.Element
 *
 * @example
 * // 기본 텍스트 박스
 * <BasicTextBox>
 *   <span>안전하게 저장된 텍스트</span>
 * </BasicTextBox>
 *
 * @example
 * // 커스텀 스타일과 함께 사용
 * <BasicTextBox className="border-blue-200">
 *   <span>강조된 텍스트 정보</span>
 * </BasicTextBox>
 */
export default function BasicTextBox({ children, className = '' }: TextBoxProps) {
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
