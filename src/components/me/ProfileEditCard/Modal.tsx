'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ModalProps {
	setModal: () => void;
}

export default function Modal({ setModal }: ModalProps) {
	// 모달 내부를 클릭했을 때, 모달 창이 꺼지는 것 방지
	function preventOffModal(event: React.MouseEvent) {
		event.stopPropagation();
	}

	// 모달창이 뜬 상태에서는 뒤 화면 스크롤 방지
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		/* Modal 외부 */
		<div
			className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-gray-500/50"
			onClick={setModal}>
			{/* Modal 내부*/}
			<div className="relative z-50 rounded-xl bg-white p-6" onClick={preventOffModal}>
				<form className="text-base font-semibold">
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
								placeholder="회사명"
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

						<button className="tb:w-57 w-35 cursor-pointer rounded-xl bg-orange-600 py-[11px] text-white hover:bg-orange-700 active:bg-orange-800 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-white">
							수정하기
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
