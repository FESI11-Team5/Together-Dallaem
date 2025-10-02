import type { Preview } from '@storybook/nextjs-vite';
import '../src/app/globals.css';

const customViewports = {
	desktop: {
		name: 'Desktop',
		styles: {
			width: '1920px',
			height: '800px'
		}
	},
	tablet: {
		name: 'Tablet',
		styles: {
			width: '745px',
			height: '800px'
		}
	},
	mobile: {
		name: 'Mobile',
		styles: {
			width: '375px',
			height: '800px'
		}
	}
};

const preview: Preview = {
	parameters: {
		viewport: {
			options: {
				...customViewports
			}
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo'
		}
	}
};

export default preview;
