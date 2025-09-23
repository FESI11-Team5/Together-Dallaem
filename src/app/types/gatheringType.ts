export type GatherType = 'OFFICE_STRETCHING' | 'MINDFULNESS' | 'WORKATION';

export type GatherLocation = '건대입구' | '을지로3가' | '신림' | '홍대입구';

export interface GatheringType {
	teamId: string;
	location: GatherLocation | '';
	type: GatherType | '';
	name: string;
	dateTime: string;
	capacity: number;
	image: File | '';
	registrationEnd: string;
}
