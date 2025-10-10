import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SignupPage from './page';

const meta: Meta<typeof SignupPage> = {
	title: 'Pages/Signup',
	component: SignupPage,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `### 🧾 SignupPage
					회원가입 전체 페이지입니다.
					- 구성 요소: \`SignupForm\` + \`SignupSuccessPopup\` + \`SignupFailurePopup\`
					- 모달 상태 관리는 \`ModalStoreProvider\` / 실제 렌더링은 \`ModalContainer\`
					- 반응형 테스트: Desktop, Tablet, Mobile 각각 확인 가능
					`
			}
		}
	},
	globals: {
		viewport: { value: 'desktop', isRotated: false }
	}
};

export default meta;
type Story = StoryObj<typeof SignupPage>;

/**
 * 🖥️ Desktop 버전
 */
export const Desktop: Story = {
	render: () => (
		<ModalStoreProvider>
			<SignupPage />
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'desktop', isRotated: false }
	}
};

/**
 * 💻 Tablet 버전
 */
export const Tablet: Story = {
	render: () => (
		<ModalStoreProvider>
			<SignupPage />
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'tablet', isRotated: false }
	}
};

/**
 * 📱 Mobile 버전
 */
export const Mobile: Story = {
	render: () => (
		<ModalStoreProvider>
			<SignupPage />
			<ModalContainer />
		</ModalStoreProvider>
	),
	globals: {
		viewport: { value: 'mobile', isRotated: false }
	}
};
