import BasicButton from '@/components/commons/BasicButton';
import ModalContainer from '@/components/commons/ModalContainer';
import { useModal } from '@/hooks/useModal';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import type { Meta, StoryObj } from '@storybook/nextjs';
import SignupFailurePopup from './SignupFailurePopup';
import SignupSuccessPopup from './SignupSuccessPopup';

const meta: Meta = {
	title: 'Auth/SignupPopup',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `### 🧾 SignupPopup
				회원가입 성공/실패 시 표시되는 팝업입니다.

				- 모달 상태 관리는 \`ModalStoreProvider\`
				- 실제 렌더링은 \`ModalContainer\`
				- 내부 콘텐츠는 \`SignupSuccessPopup\`, \`SignupFailurePopup\`
				`
			}
		}
	}
};

export default meta;
type Story = StoryObj;

/**
 * ✅ 회원가입 성공 모달 (Container 포함)
 */
export const Success: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="success" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '회원가입 성공 (with ModalContainer)'
};

/**
 * ⚠️ 회원가입 실패 모달 (Container 포함)
 */
export const Failure: Story = {
	render: () => (
		<ModalStoreProvider>
			<DemoTrigger type="failure" />
			<ModalContainer />
		</ModalStoreProvider>
	),
	name: '회원가입 실패 (with ModalContainer)'
};

/**
 * 내부에서 openModal을 직접 호출할 수 있는 테스트 버튼
 */
function DemoTrigger({ type }: { type: 'success' | 'failure' }) {
	const { openModal } = useModal();

	const handleClick = () => {
		if (type === 'success') openModal(<SignupSuccessPopup />);
		else openModal(<SignupFailurePopup />);
	};

	return (
		<BasicButton isActive onClick={handleClick}>
			{type === 'success' ? '성공 모달 열기' : '실패 모달 열기'}
		</BasicButton>
	);
}
