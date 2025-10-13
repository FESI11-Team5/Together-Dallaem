import BasicFooter from '@/components/commons/basic/BasicFooter';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			{children}
			<BasicFooter />
		</div>
	);
}
