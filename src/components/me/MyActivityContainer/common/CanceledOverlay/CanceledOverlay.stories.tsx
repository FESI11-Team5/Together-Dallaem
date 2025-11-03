import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import CanceledOverlay from './CanceledOverlay';

// 1. Meta 정의: 컴포넌트의 메타데이터와 기본 설정을 정의합니다.
// CSF3에서는 default export가 Meta 객체입니다.
const meta: Meta<typeof CanceledOverlay> = {
	// 스토리북 내비게이션 경로
	title: 'Me/Common/CanceledOverlay',
	// 대상 컴포넌트
	component: CanceledOverlay,
	// props 설명을 자동으로 생성하기 위해 필수
	tags: ['autodocs'],
	// 스토리의 기본 인자 (args)를 정의합니다.
	args: {
		// 기본적으로 오버레이가 보이지 않는 상태를 기본 스토리로 설정합니다.
		canceledAt: null
	},
	// 데코레이터: 컴포넌트의 시각적 컨텍스트를 제공
	decorators: [
		Story => (
			// absolute 포지션을 위한 relative 컨테이너 설정 및 크기 지정
			<div
				style={{
					position: 'relative',
					height: '200px'
				}}>
				<div style={{ padding: '10px', backgroundColor: '#333', color: 'white', height: '100%', borderRadius: '24px' }}>
					모임 카드 내용 (배경)
				</div>
				<Story />
			</div>
		)
	],
	// Controls 패널의 필드 상세 설정
	argTypes: {
		canceledAt: {
			control: 'text',
			description: '모임 취소 일시 (`string`) 또는 취소되지 않은 경우 `null`'
		}
	}
};

export default meta;

// 2. StoryObj 타입 정의
type Story = StoryObj<typeof CanceledOverlay>;

// --- 개별 스토리 정의 ---

/**
 * ### 1. Not Canceled (취소되지 않은 상태)
 * `canceledAt`이 `null`일 때, 오버레이가 **렌더링되지 않는** 상태를 테스트합니다.
 * 이 경우, 데코레이터에 설정된 배경만 보여야 합니다.
 */
export const NotCanceled: Story = {
	name: '취소되지 않음 (Hidden)',
	// args는 meta의 기본 args를 사용합니다 (canceledAt: null)
	parameters: {
		docs: {
			description: {
				story: '`canceledAt`이 `null`이므로 오버레이 컴포넌트는 아무것도 렌더링하지 않습니다.'
			}
		}
	}
};

/**
 * ### 2. Canceled (취소된 상태)
 * 취소 일시를 전달하여 **오버레이가 정상적으로 표시되는** 상태를 테스트합니다.
 * 네온 글로우 스타일, 반투명 배경, 문구 등이 올바르게 적용되었는지 확인합니다.
 */
export const Canceled: Story = {
	name: '취소됨 (Visible)',
	args: {
		// 기본 args (null)를 덮어쓰고, 취소된 상태를 나타내는 값을 전달합니다.
		canceledAt: '2025-11-01T14:30:00Z'
	},
	parameters: {
		docs: {
			description: {
				story: '취소 일시가 있을 때, 반투명 배경과 함께 취소 안내 메시지 및 버튼이 표시됩니다.'
			}
		}
	}
};
