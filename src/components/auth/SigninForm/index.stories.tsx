import type { Meta, StoryObj } from '@storybook/nextjs';
import { SigninForm } from '.';

const meta: Meta<typeof SigninForm> = {
	title: 'Auth/SigninForm',
	component: SigninForm,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		viewport: { defaultViewport: 'desktop' },
		docs: {
			description: {
				component: `### 🔐 SigninForm
				React Hook Form + Zod 기반의 로그인 폼입니다.

				- 필드: 이메일, 비밀번호
				- 유효성 검사: \`zodResolver(signinSchema)\`
				- 제출 버튼 활성화 조건: \`isValid && isDirty && !isSubmitting\`
				- 서버 에러 처리: \`ApiError\` 상태 코드(401, 404)에 따라 폼 에러로 변환
				- 디자인 시스템 버튼: \`<BasicButton />\`
				`
			}
		}
	},
	args: {
		onSubmit: async data => {
			console.log('로그인 시도 데이터:', data);
			alert('로그인 시도!');
		}
	}
};

export default meta;
type Story = StoryObj<typeof SigninForm>;

export const Default: Story = {};
