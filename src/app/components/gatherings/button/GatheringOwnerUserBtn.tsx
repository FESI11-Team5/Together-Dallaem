export default function GatheringOwnerUserBtn() {
	return (
		<div className="flex w-full gap-2">
			<button className="flex-1 rounded-md border border-orange-500 px-6 py-2 text-sm font-bold text-orange-500 hover:bg-orange-50">
				취소하기
			</button>
			<button className="flex-1 rounded-md bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600">
				공유하기
			</button>
		</div>
	);
}
