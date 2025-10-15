export interface ReviewParams {
	gatheringId?: string;
	userId?: string;
	type?: GatheringType;
	location?: GatheringLocation;
	date?: string;
	registrationEnd?: string;
	sortBy?: 'createdAt' | 'score' | 'participantCount';
	sortOrder?: 'asc' | 'desc';
	limit?: number;
	offset?: number;
}

export interface ReviewScoreParams {
	gatheringId?: string;
	type?: GatheringType;
}
