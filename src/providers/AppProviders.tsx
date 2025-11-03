import ModalContainer from '@/components/commons/ModalContainer';
import { ModalStoreProvider } from '@/providers/ModalProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';

export default function AppProviders({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryProvider>
			<ModalStoreProvider>
				<ModalContainer />
				{children}
			</ModalStoreProvider>
		</ReactQueryProvider>
	);
}
