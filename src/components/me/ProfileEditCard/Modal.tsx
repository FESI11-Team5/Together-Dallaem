'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface ModalProps {
	/** 모달을 닫는 함수 */
	setModal: () => void;
	onSubmit: (companyName: string) => void;
	currentCompanyName?: string;
}

/**
 * `Modal` 컴포넌트
 *
 * 프로필 수정 모달을 렌더링합니다.
 * - 모달 외부 클릭 시 모달이 닫힙니다.
 * - 모달 내부 클릭 시 이벤트 전파를 막아 닫히지 않도록 처리
 * - 모달이 열릴 때 스크롤을 막고, 닫히면 원래대로 복원
 * - 회사명 입력 필드 및 취소/수정 버튼 포함
 *
 * @component
 * @param {ModalProps} props - 모달 관련 props
 * @param {() => void} props.setModal - 모달을 닫는 함수
 * @returns {JSX.Element} 프로필 수정 모달 UI를 반환합니다.
 */
export default function Modal({ setModal, onSubmit, currentCompanyName }: ModalProps) {
	const [company, setCompany] = useState(currentCompanyName ?? '회사명');

	useEffect(() => {
		if (currentCompanyName) setCompany(currentCompanyName);
	}, [currentCompanyName]);

	// 모달 내부를 클릭했을 때, 모달 창이 꺼지는 것 방지
	const preventOffModal = (event: React.MouseEvent) => {
		event.stopPropagation();
	};

	// 모달창이 뜬 상태에서는 뒤 화면 스크롤 방지
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		if (!company.trim()) return;
		onSubmit(company.trim());
	};

	return (
		/* Modal 외부 */
		<div
			className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-500/50"
			onClick={setModal}>
			{/* Modal 내부*/}
			<div className="relative z-50 rounded-xl bg-white p-6" onClick={preventOffModal}>
				<form className="text-base font-semibold" onSubmit={handleSubmit}>
					<div className="mb-6 flex items-center justify-between">
						<p className="text-lg text-gray-900">프로필 수정하기</p>
						<button type="button" onClick={setModal} className="ml-2 cursor-pointer rounded p-1 text-sm">
							<Image src="/images/ic_cancle.svg" alt="취소 버튼" width={24} height={24} />
						</button>
					</div>

					<div className="mt-6">
						<div className="text-gray-800">회사</div>
						<div className="mt-3">
							<input
								id="company"
								name="company"
								value={company}
								onChange={e => setCompany(e.target.value)}
								className="w-full bg-gray-50 p-2.5 text-sm font-medium text-gray-800 placeholder-gray-400"
							/>
						</div>
					</div>

					<div className="mt-6 flex w-full items-center justify-center gap-4">
						<button
							type="button"
							onClick={setModal}
							className="tb:w-57 pointer-events-auto w-35 cursor-pointer rounded-xl border border-orange-600 py-2.5 text-orange-600 hover:border-orange-500 hover:text-orange-500 active:border-orange-700 active:text-orange-700">
							취소
						</button>

						<button
							type="submit"
							className="tb:w-57 w-35 cursor-pointer rounded-xl bg-orange-600 py-[11px] text-white hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white"
							disabled={!company.trim()}>
							수정하기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
