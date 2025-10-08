import { FOOTER_MESSAGE } from '@/constants/messages';

function GatheringNormalUserBtn() {
	return <button className="rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white">참여하기</button>;
}

function GatheringOwnerUserBtn() {
	return (
		<div className="flex gap-2">
			<button className="flex-1 rounded-md border border-orange-500 px-6 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50">
				취소하기
			</button>
			<button className="flex-1 rounded-md bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600">
				공유하기
			</button>
		</div>
	);
}

export default function BasicFooter() {
	const isNormalUser = true;
	return (
		<footer className="fixed right-2 bottom-0 left-0 z-10 m-auto flex w-full items-center justify-center border-3 border-t-black bg-white p-4">
			{!isNormalUser ? (
				<div className="pc:w-[1200px] tb:w-[744px] mb:w-[375px] flex items-center justify-between">
					<div className="flex-1 pr-4">
						<h1 className="text-sm font-bold">{FOOTER_MESSAGE.title}</h1>
						<p className="text-xs text-gray-600">{FOOTER_MESSAGE.subTitle}</p>
					</div>

					<div className="shrink-0">
						<GatheringNormalUserBtn />
					</div>
				</div>
			) : (
				<div className="pc:w-[1200px] tb:w-[744px] mb:w-[375px] max-mb:flex-col max-mb:gap-4 flex w-full items-center justify-between">
					<div className="pr-4">
						<h1 className="text-sm font-bold">{FOOTER_MESSAGE.title}</h1>
						<p className="text-xs text-gray-600">{FOOTER_MESSAGE.subTitle}</p>
					</div>

					<div className="max-mb:w-full shrink-0">
						<GatheringOwnerUserBtn />
					</div>
				</div>
			)}
		</footer>
	);
}
