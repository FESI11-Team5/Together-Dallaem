import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NoDataMessage from './NoDataMessage';

// 1. Meta 정의: 컴포넌트의 메타데이터와 기본 설정을 정의합니다.
const meta: Meta<typeof NoDataMessage> = {
	// 스토리북 내비게이션 경로
	title: 'Me/Common/NoDataMessage',
	// 대상 컴포넌트
	component: NoDataMessage,
	// props 설명을 자동으로 생성하기 위해 필수
	tags: ['autodocs'],
	// 스토리의 기본 인자 (args)를 정의합니다.
	args: {
		text: '표시할 데이터가 존재하지 않습니다.'
	},
	// 데코레이터: 컴포넌트가 중앙에 잘 표시되도록 높이를 설정합니다.
	decorators: [
		Story => (
			// 컴포넌트가 flex 컨테이너 내부의 height: full을 사용하므로,
			// 부모 컨테이너에 명확한 높이를 제공합니다.
			<div style={{ height: '400px', backgroundColor: '#1A1A1A', padding: '20px' }}>
				<Story />
			</div>
		)
	],
	// Controls 패널의 필드 상세 설정
	argTypes: {
		text: {
			control: 'text',
			description: '사용자에게 표시할 안내 메시지입니다.'
		}
	}
};

export default meta;

// 2. StoryObj 타입 정의
type Story = StoryObj<typeof NoDataMessage>;

// --- 개별 스토리 정의 ---

/**
 * ### 1. Default (기본 메시지)
 * 가장 일반적인 '데이터 없음' 메시지를 표시합니다.
 * 텍스트 섀도우(`NO_DATA_TEXT_GLOW`)와 이미지의 배치를 확인합니다.
 */
export const Default: Story = {
	name: '기본 안내 메시지',
	args: {
		// meta의 기본 args를 사용
	},
	parameters: {
		docs: {
			description: {
				story: '기본 `text` prop을 사용하여 데이터가 없는 상황을 나타냅니다.'
			}
		}
	}
};

/**
 * ### 2. Message (메시지)
 * 텍스트가 존재할 때 중앙 정렬을 확인합니다.
 */
export const ShortMessage: Story = {
	name: '메시지',
	args: {
		text: '크루가 없습니다.'
	},
	parameters: {
		docs: {
			description: {
				story: '`text` prop을 사용했을 때 중앙 정렬을 확인합니다.'
			}
		}
	}
};

/**
 * ### 3. Empty Text (빈 메시지)
 * 메시지가 비어있을 때의 렌더링 상태를 테스트합니다. (이미지만 표시됨)
 */
export const EmptyText: Story = {
	name: '빈 텍스트',
	args: {
		text: ''
	},
	parameters: {
		docs: {
			description: {
				story: '`text` prop이 빈 문자열일 때, 이미지만 정상적으로 표시되는지 확인합니다.'
			}
		}
	}
};
