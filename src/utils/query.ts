import { SORT_CONFIG } from '@/constants/options';

export const getGatheringQuery = (filters: {
	type?: string;
	location?: string | number;
	date?: Date;
	sort?: string;
	limit?: number;
	offset?: number;
}) => {
	const params = new URLSearchParams();

	if (filters.type) params.append('type', filters.type);
	if (filters.location) params.append('location', String(filters.location));
	if (filters.date) params.append('date', filters.date.toISOString().split('T')[0]);
	if (filters.sort) {
		const sortConfig = SORT_CONFIG[filters.sort as keyof typeof SORT_CONFIG];
		if (sortConfig) {
			params.append('sortBy', sortConfig.sortBy);
			params.append('sortOrder', sortConfig.sortOrder);
		}
	}
	if (filters.limit) params.append('limit', filters.limit.toString());
	if (filters.offset) params.append('offset', filters.offset.toString());

	return params.toString();
};
