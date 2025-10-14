import { renderHook } from '@testing-library/react';
import { useKeyActions } from '../useKeyActions';

/**
 * @file useKeyActions.test.ts
 * @description
 * `useKeyActions` 훅의 주요 동작을 검증하는 단위 테스트입니다.
 *
 * 테스트 시나리오:
 * 1. Enter 키 입력 시 `onEnter` 콜백이 정상적으로 호출되는지 확인
 * 2. Escape 키 입력 시 `onEscape` 콜백이 정상적으로 호출되는지 확인
 * 3. `enabled = false` 상태에서는 어떤 키 입력에도 콜백이 실행되지 않는지 확인
 *
 * `window` 객체에 KeyboardEvent를 디스패치(dispatch)하여 실제 키 입력을 시뮬레이션합니다.
 */
describe('useKeyActions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('Enter키를 누르면 onEnter 콜백이 호출되는지 확인', () => {
		const onEnter = jest.fn();
		renderHook(() => useKeyActions({ onEnter }));

		const event = new KeyboardEvent('keydown', { key: 'Enter' });
		window.dispatchEvent(event);

		expect(onEnter).toHaveBeenCalledTimes(1);
	});

	test('Escape키를 누르면 onEscape 콜백이 호출되는지 확인', () => {
		const onEscape = jest.fn();
		renderHook(() => useKeyActions({ onEscape }));

		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		window.dispatchEvent(event);

		expect(onEscape).toHaveBeenCalledTimes(1);
	});

	test('enabled = false일 때는 키 이벤트가 작동하지 않는지 확인', () => {
		const onEnter = jest.fn();
		const onEscape = jest.fn();

		renderHook(() => useKeyActions({ onEnter, onEscape, enabled: false }));

		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
		window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

		expect(onEnter).not.toHaveBeenCalled();
		expect(onEscape).not.toHaveBeenCalled();
	});
});
