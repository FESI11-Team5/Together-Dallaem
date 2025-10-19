import { deleteRequest } from '@/apis';

export const leaveGathering = (gatheringId: number) => {
	return deleteRequest({
		path: `/gatherings/${gatheringId}/leave`,
		options: { withAuth: true }
	});
};
