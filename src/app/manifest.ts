import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '랜덤 닉네임 생성기',
    short_name: '닉네임 생성기',
    description: '한국어, 영어 랜덤 닉네임을 글자수에 맞춰 생성하세요.',
    start_url: '/',
    display: 'standalone',
    background_color: '#6d28d9',
    theme_color: '#6d28d9',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
