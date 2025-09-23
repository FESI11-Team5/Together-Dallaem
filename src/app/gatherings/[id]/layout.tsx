import Footer from '@/app/components/common/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="">
			{children}
			<Footer />
		</div>
	);
}
