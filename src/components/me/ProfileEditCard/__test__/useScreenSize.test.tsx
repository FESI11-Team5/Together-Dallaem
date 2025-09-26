import { renderHook, act } from '@testing-library/react';
import { useScreenSize } from '../useScreenSize';

/**
 * useScreenSize 훅 테스트
 *
 * 화면 너비에 따라 'mobile', 'tablet', 'desktop'을 반환하는 커스텀 훅.
 * - 초기 width 값에 따른 반환값 확인
 * - resize 이벤트 발생 시 상태 업데이트 확인
 */
describe('useScreenSize', () => {
	const resizeWindow = (width: number) => {
		// window.innerWidth 변경
		(window.innerWidth as number) = width;

		// resize 이벤트
		window.dispatchEvent(new Event('resize'));
	};

	test('초기 width에 따라 올바른 값이 반환되는지 확인', () => {
		resizeWindow(400);
		const { result } = renderHook(() => useScreenSize());

		expect(result.current).toBe('mobile');
	});

	test('width가 745xp이면 tablet을 반환하는지 확인', () => {
		resizeWindow(745);
		const { result } = renderHook(() => useScreenSize());

		expect(result.current).toBe('tablet');
	});

	test('width가 1201px이면 desktop을 반환하는지 확인', () => {
		resizeWindow(1201);
		const { result } = renderHook(() => useScreenSize());

		expect(result.current).toBe('desktop');
	});

	test('resize 이벤트가 발생하면 상태가 업데이트 되는지 확인', () => {
		const { result } = renderHook(() => useScreenSize());

		act(() => {
			resizeWindow(1201);
		});

		expect(result.current).toBe('desktop');

		act(() => {
			resizeWindow(400);
		});

		expect(result.current).toBe('mobile');
	});
});
