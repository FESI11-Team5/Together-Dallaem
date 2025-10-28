import { fireEvent, render, screen } from '@testing-library/react';
import type { ImageProps } from 'next/image';
import { useForm } from 'react-hook-form';
import SelectBox from '../SelectBox';
import BasicButton from './BasicButton';
import BasicInput from './BasicInput';
import BasicModal from './BasicModal';
import BasicPopup from './BasicPopup';
import BasicTextArea from './BasicTextArea';
import BasicTextBox from './BasicTextBox';

// Mock Next.js Image component
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt, onClick, ...props }: ImageProps) => <img src={src} alt={alt} onClick={onClick} {...props} />
}));

// Mock useModal hook
jest.mock('@/hooks/useModal', () => ({
	useModal: () => ({
		openModal: jest.fn(),
		closeModal: jest.fn(),
		closeAllModals: jest.fn(),
		isModalOpen: jest.fn()
	}),
	useModalClose: () => jest.fn()
}));

describe('BasicButton', () => {
	test('children text 잘 들어가는지 확인', () => {
		render(<BasicButton onClick={() => {}}>테스트 버튼</BasicButton>);
		expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
	});

	test('클릭시 onClick 잘 호출되는지 확인', () => {
		const handleClick = jest.fn();
		render(<BasicButton onClick={handleClick}>클릭</BasicButton>);

		fireEvent.click(screen.getByText('클릭'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test('isActive prop false일 때 버튼 비활성화 되는지 확인', () => {
		render(
			<BasicButton onClick={() => {}} isActive={false}>
				비활성 버튼
			</BasicButton>
		);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	test('mainColor prop 색상변경 잘 적용되는지 확인', () => {
		render(<BasicButton mainColor="primary-700">색상 변경 버튼</BasicButton>);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('bg-primary-700', 'text-white');
	});

	test('아웃라인 버튼 스타일 잘 적용되는지 확인', () => {
		render(
			<BasicButton onClick={() => {}} outlined>
				아웃라인 버튼
			</BasicButton>
		);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('border-primary-600', 'text-primary-600', 'bg-white');
	});

	test('아웃라인일때 mainColor 스타일 잘 적용되는지 확인', () => {
		render(
			<BasicButton mainColor="primary-800" outlined>
				색상 변경 버튼
			</BasicButton>
		);
		const button = screen.getByRole('button');
		expect(button).toHaveClass('border-primary-800', 'text-primary-800', 'bg-white');
	});

	test('isLarge prop true일 때 버튼이 부모 컴포넌트에 꽉 차게 적용되는지 확인', () => {
		render(
			<BasicButton onClick={() => {}} isLarge>
				큰 버튼
			</BasicButton>
		);
		expect(screen.getByRole('button')).toHaveClass('w-full');
	});

	test('커스텀 className 잘 적용되는지 확인', () => {
		render(
			<BasicButton onClick={() => {}} className="custom-class">
				커스텀 버튼
			</BasicButton>
		);
		expect(screen.getByRole('button')).toHaveClass('custom-class');
	});
});

describe('BasicInput', () => {
	test('placeholder 잘 적용되는지 확인', () => {
		render(<BasicInput placeholder="입력하세요" label="입력" id="입력" />);
		expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
	});

	test('isPassword prop true일 때 비밀번호 토글 버튼 잘 적용되는지 확인', () => {
		render(<BasicInput placeholder="비밀번호" isPassword label="비밀번호" id="비밀번호" />);
		expect(screen.getByAltText('password visible toggle button')).toBeInTheDocument();
	});

	test('비밀번호 토글버튼 클릭시 버튼 이미지 변경 잘 되는지 확인', () => {
		render(<BasicInput placeholder="비밀번호" isPassword label="비밀번호" id="비밀번호" />);
		const toggleButton = screen.getByAltText('password visible toggle button');

		// Initially should show password (visibility_off)
		expect(toggleButton).toHaveAttribute('src', '/icons/visibility_off.svg');

		fireEvent.click(toggleButton);
		expect(toggleButton).toHaveAttribute('src', '/icons/visibility_on.svg');
	});

	test('비밀번호 토글버튼 클릭시 input type 변경 잘 되는지 확인', () => {
		render(<BasicInput placeholder="비밀번호" isPassword label="비밀번호" id="비밀번호" />);
		const toggleButton = screen.getByAltText('password visible toggle button');

		expect(screen.getByPlaceholderText('비밀번호')).toHaveAttribute('type', 'password');

		fireEvent.click(toggleButton);
		expect(screen.getByPlaceholderText('비밀번호')).toHaveAttribute('type', 'text');
	});

	test('isValid prop false일 때 border red로 바뀌고 에러 메시지 나타나는지 확인', () => {
		render(<BasicInput placeholder="입력" isValid={false} invalidText="에러 메시지" value="" label="입력" id="입력" />);

		// 한번 focus 해야만 invalidText가 뜨기 때문에 focus 후 blur
		const input = screen.getByPlaceholderText('입력');
		fireEvent.focus(input);
		fireEvent.blur(input);

		expect(screen.getByText('에러 메시지')).toBeInTheDocument();
		expect(input.closest('div')).toHaveClass('border-red-600');
	});

	test('required이고 입력한 텍스트가 없을때 border red로 바뀌고 필수 메시지 나타나는지 확인', () => {
		render(<BasicInput placeholder="필수 입력" required value="" label="필수 입력" id="필수 입력" />);

		const input = screen.getByPlaceholderText('필수 입력');
		fireEvent.focus(input);
		fireEvent.blur(input);

		expect(screen.getByText('입력해주세요.')).toBeInTheDocument();
		expect(input.closest('div')).toHaveClass('border-red-600');
	});

	test('focus 되었을 때 border 색상 잘 바뀌는지 확인', () => {
		render(<BasicInput placeholder="입력" label="입력" id="입력" />);
		const input = screen.getByPlaceholderText('입력');

		fireEvent.focus(input);
		expect(input.closest('div')).toHaveClass('border-primary-300');
	});
});

describe('BasicModal', () => {
	test('children 잘 나타나는지 확인', () => {
		render(
			<BasicModal onClose={() => {}}>
				<div>모달 내용</div>
			</BasicModal>
		);
		expect(screen.getByText('모달 내용')).toBeInTheDocument();
	});

	test('x 버튼 클릭시 모달 닫히는지 확인', () => {
		const handleClose = jest.fn();
		render(
			<BasicModal onClose={handleClose}>
				<div>모달 내용</div>
			</BasicModal>
		);

		const closeButton = screen.getByAltText('close');
		fireEvent.click(closeButton);
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test('배경 클릭시 모달 닫히는지 확인', () => {
		const handleClose = jest.fn();
		render(
			<BasicModal onClose={handleClose}>
				<div>모달 내용</div>
			</BasicModal>
		);

		const backdrop = screen.getByRole('button', { name: 'close' }).closest('div')?.parentElement;
		fireEvent.click(backdrop!);
		expect(handleClose).toHaveBeenCalledTimes(1);
	});

	test('여러 개의 모달창이 겹쳐서 잘 뜨는지 확인', () => {
		render(
			<BasicModal onClose={() => {}}>
				<div>첫 번째 모달</div>
			</BasicModal>
		);

		render(
			<BasicModal onClose={() => {}}>
				<div>두 번째 모달</div>
			</BasicModal>
		);

		expect(screen.getByText('첫 번째 모달')).toBeInTheDocument();
		expect(screen.getByText('두 번째 모달')).toBeInTheDocument();
	});
});

describe('BasicSelectBox', () => {
	const mockOptions = [
		{ value: 'option1', text: '옵션 1' },
		{ value: 'option2', text: '옵션 2' }
	];

	test('placeholder 잘 나타나는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" />);
		expect(screen.getByText('선택하세요')).toBeInTheDocument();
	});

	test('셀렉트박스 클릭시 드롭다운 열리는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" />);

		const selectBox = screen.getByRole('button');
		fireEvent.click(selectBox);

		expect(screen.getByText('옵션 1')).toBeInTheDocument();
		expect(screen.getByText('옵션 2')).toBeInTheDocument();
	});

	test('옵션 클릭시 옵션 선택 잘 되는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" />);

		const selectBox = screen.getByRole('button');
		fireEvent.click(selectBox);

		const option1 = screen.getByText('옵션 1');
		fireEvent.click(option1);

		// 선택된 옵션이 표시되어야 함
		expect(screen.getByText('옵션 1')).toBeInTheDocument();
	});

	test('셀렉트박스 드롭다운 옵션들이 올바르게 렌더링되는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" />);

		const selectBox = screen.getByRole('button');
		fireEvent.click(selectBox);

		// 드롭다운이 열렸는지 확인
		expect(screen.getByText('옵션 1')).toBeInTheDocument();
		expect(screen.getByText('옵션 2')).toBeInTheDocument();

		// 옵션들이 role="option"으로 올바르게 렌더링되는지 확인
		expect(screen.getByRole('option', { name: 'option1-옵션 1' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'option2-옵션 2' })).toBeInTheDocument();
	});

	test('셀렉트박스 옵션 클릭시 드롭다운이 자동으로 닫히는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" />);

		const selectBox = screen.getByRole('button');
		fireEvent.click(selectBox);

		// 드롭다운 열림 확인
		expect(screen.getByText('옵션 1')).toBeInTheDocument();

		// 옵션 클릭
		const option1 = screen.getByRole('option', { name: 'option1-옵션 1' });
		fireEvent.click(option1);

		// 드롭다운이 닫혔는지 확인
		expect(screen.queryByRole('option', { name: 'option1-옵션 1' })).not.toBeInTheDocument();
	});

	test('size=expanded일 때 셀렉트박스가 부모 컴포넌트에 꽉 차게 적용되는지 확인', () => {
		render(<SelectBox options={mockOptions} placeholder="선택하세요" expanded />);
		expect(screen.getByText('선택하세요').closest('button')).toHaveClass('w-full');
	});
});

describe('BasicTextArea', () => {
	test('placeholder 잘 나타나는지 확인', () => {
		render(<BasicTextArea placeholder="텍스트를 입력하세요" />);
		expect(screen.getByPlaceholderText('텍스트를 입력하세요')).toBeInTheDocument();
	});

	test('invalid할때 Text 잘 나타나고 border 색상이 잘 바뀌는지 확인', () => {
		render(<BasicTextArea placeholder="입력" isValid={false} invalidText="에러 메시지" />);

		const textarea = screen.getByPlaceholderText('입력');
		fireEvent.focus(textarea);
		fireEvent.blur(textarea);

		expect(screen.getByText('에러 메시지')).toBeInTheDocument();
		expect(textarea).toHaveClass('border-red-600');
	});

	test('focus 시 border 색상 잘 바뀌는지 확인', () => {
		render(<BasicTextArea placeholder="입력" />);
		const textarea = screen.getByPlaceholderText('입력');

		fireEvent.focus(textarea);
		expect(textarea).toHaveClass('border-primary-300');
	});

	test('has correct default placeholder', () => {
		render(<BasicTextArea />);
		expect(
			screen.getByPlaceholderText('남겨주신 리뷰는 프로그램 운영 및 다른 회원 분들께 큰 도움이 됩니다.')
		).toBeInTheDocument();
	});
});

describe('BasicTextBox', () => {
	test('children 내용 잘 보이는지 확인', () => {
		render(<BasicTextBox>텍스트 내용</BasicTextBox>);
		expect(screen.getByText('텍스트 내용')).toBeInTheDocument();
	});

	test('custom className 잘 적용되는지 확인', () => {
		render(<BasicTextBox className="custom-class">텍스트</BasicTextBox>);
		expect(screen.getByText('텍스트')).toHaveClass('custom-class');
	});
});

// Integration test with React Hook Form
describe('React Hook Form으로 컴포넌트 연동 잘 되는지 테스트', () => {
	const TestForm = () => {
		const { register, watch } = useForm();
		const inputValue = watch('testInput') || '';

		return (
			<form>
				<BasicInput
					register={register('testInput')}
					placeholder="테스트 입력"
					value={inputValue}
					label="테스트 입력"
					id="테스트 입력"
				/>
				<BasicTextArea register={register('testTextArea')} placeholder="테스트 텍스트영역" />
				<SelectBox
					register={register('testSelect')}
					options={[
						{ value: 'test1', text: '테스트 1' },
						{ value: 'test2', text: '테스트 2' }
					]}
					placeholder="테스트 선택"
				/>
			</form>
		);
	};

	test('react hook form 잘 되는지 확인', () => {
		render(<TestForm />);

		const input = screen.getByPlaceholderText('테스트 입력');
		const textarea = screen.getByPlaceholderText('테스트 텍스트영역');
		const selectBox = screen.getByText('테스트 선택');

		expect(input).toBeInTheDocument();
		expect(textarea).toBeInTheDocument();
		expect(selectBox).toBeInTheDocument();
	});
});

describe('BasicPopup', () => {
	test('팝업 제목과 본문 메시지 잘 나타나는지 확인', () => {
		const handleConfirm = jest.fn();
		const handleCancel = jest.fn();

		render(
			<BasicPopup
				title="팝업 제목"
				subTitle="팝업 본문 메시지"
				confirmText="확인"
				cancelText="취소"
				onConfirm={handleConfirm}
				onCancel={handleCancel}
			/>
		);

		expect(screen.getByText('팝업 제목')).toBeInTheDocument();
		expect(screen.getByText('팝업 본문 메시지')).toBeInTheDocument();
		expect(screen.getByText('확인')).toBeInTheDocument();
		expect(screen.getByText('취소')).toBeInTheDocument();
	});
});
