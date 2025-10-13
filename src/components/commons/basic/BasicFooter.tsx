import { FOOTER_MESSAGE } from '@/constants/messages';

import GatheringNormalUserBtn from '../../gatherings/button/GatheringNormalUserBtn';
import GatheringOwnerUserBtn from '../../gatherings/button/GatheringOwnerUserBtn';

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
