export default function ProfileEditCardSkeleton() {
	return (
		<div className="pc:mb-7.5 mb-4 rounded-3xl border-2 border-gray-200 bg-root">
			<div className="relative flex items-center justify-between rounded-3xl bg-root px-6 py-4 before:absolute before:bottom-1.5 before:left-0 before:h-0.5 before:w-full before:bg-gray-200 before:content-['']">
				<div className="absolute top-12.5 flex h-16 w-16 items-center justify-center rounded-4xl bg-root">
					<div className="h-14 w-14 rounded-full bg-gray-200" />
				</div>

				<div className="z-base h-7 w-[67px] rounded-3xl bg-gray-200" />

				<div className="z-base h-8 w-8 cursor-pointer rounded-full bg-gray-200" />
			</div>

			<div className="tb:pt-3 tb:pb-4 pt-3.5 pb-4.5 pl-23">
				<div className="flex flex-col gap-[9px]">
					<div className="h-7 w-14 rounded-3xl bg-gray-200" />
					<div className="flex flex-col gap-1">
						<div className="flex gap-1.5">
							<div className="h-5 w-17 rounded-3xl bg-gray-200" />
							<div className="h-5 w-10 rounded-3xl bg-gray-200" />
						</div>

						<div className="flex gap-1.5 text-sm">
							<div className="h-5 w-11 rounded-3xl bg-gray-200" />
							<div className="h-5 w-31 rounded-3xl bg-gray-200" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
