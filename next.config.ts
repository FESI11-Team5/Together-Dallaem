import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
<<<<<<< HEAD
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
				pathname: '/**' // 모든 경로 허용
			}
		]
=======
		remotePatterns: [new URL('https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/**')]
>>>>>>> origin/TD-3
	}
};

export default nextConfig;
