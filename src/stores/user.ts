import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserData {
	userId: number;
	token: string;
	email?: string;
	name?: string;
	companyName?: string;
	image?: string;
}

interface UserState {
	user: UserData | null;
}

interface UserActions {
	signinUser: ({ userId, token }: Pick<UserData, 'userId' | 'token'>) => void;
	signoutUser: () => void;
	updateUser: (user: Partial<UserData>) => void;
}

export type UserStore = UserState & UserActions;

const initialState: UserState = { user: null };

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			set => {
				return {
					...initialState,
					signinUser: ({ userId, token }: Pick<UserData, 'userId' | 'token'>) =>
						set(
							state => ({
								user: {
									...(state.user ?? {}),
									userId,
									token
								}
							}),
							false,
							'signinUser'
						),
					signoutUser: () => set(initialState, false, 'signoutUser'),
					updateUser: (user: Partial<UserData>) =>
						set(
							state => ({
								user: {
									...(state.user as UserData),
									...user
								}
							}),
							false,
							'updateUser'
						)
				};
			},
			{
				name: 'user-store-persist'
			}
		),
		{
			name: 'user-store'
		}
	)
);
