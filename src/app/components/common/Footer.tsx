import GatheringNormalUserBtn from '../gatherings/button/GatheringNormalUserBtn';
import GatheringOwnerUserBtn from '../gatherings/button/GatheringOwnerUserBtn';

export default function Footer() {
	const isNormalUser = true; // true: Normal User, false: Owner User
	return (
		<footer className="pc:w-[1200px] tb:w-[744px] mb:w-[375px] fixed right-2 bottom-0 left-0 z-10 m-auto w-full bg-white p-4">
			{isNormalUser ? (
				<div className="flex items-center justify-between">
					<div className="flex-1 pr-4">
						<h1 className="text-sm font-bold">더 건강한 나와 팀을 위한 프로그램 🏃🏻</h1>
						<p className="text-xs text-gray-600">모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요</p>
					</div>
					<div className="shrink-0">
						<GatheringNormalUserBtn />
					</div>
				</div>
			) : (
				<div className="flex items-center justify-between">
					{/* 텍스트 */}
					<div className="flex-1 pr-4">
						<h1 className="text-sm font-bold">더 건강한 나와 팀을 위한 프로그램 🏃🏻</h1>
						<p className="text-xs text-gray-600">모임을 공유해서 더 많은 사람들이 참여할 수 있도록 독려해봐요</p>
					</div>
					{/* 버튼 */}
					<div className="">
						<GatheringOwnerUserBtn />
					</div>
				</div>
			)}
		</footer>
	);
}
