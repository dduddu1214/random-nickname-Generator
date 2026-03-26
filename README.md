# 랜덤 닉네임 생성기

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

한국어/영어 랜덤 닉네임을 글자수에 맞춰 생성하는 웹앱입니다.
게임 아이디, SNS 닉네임, 캐릭터 이름 등 다양한 용도로 활용할 수 있습니다.

## 주요 기능

- **8개 후보 한번에 생성** — 비교하면서 마음에 드는 닉네임을 선택
- **형용사 + 명사 조합** — "반짝이는고양이", "GoldenFox" 같은 자연스러운 닉네임
- **글자수 제어** — 2~20자 범위에서 정확한 글자수 설정 (프리셋 + 직접 입력)
- **한국어 / 영어** — 언어별 최적화된 단어 데이터 (한국어 343개, 영어 360개)
- **빠른 설정 6종** — 동물, 자연, 전문가, 예술, 음식, 판타지 테마 (누를 때마다 랜덤 단어 적용)
- **나만의 단어** — 원하는 단어를 직접 추가하여 닉네임에 포함
- **직업 단어 토글** — 마법사, 개발자 등 직업 단어 포함/제외
- **클릭 복사** — 닉네임 클릭 한 번으로 클립보드 복사
- **히스토리 & 즐겨찾기** — 생성된 닉네임 저장, 즐겨찾기 관리
- **설정 영속화** — localStorage로 새로고침 후에도 설정/히스토리 유지

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 폰트 | Noto Sans KR (next/font) |
| 아이콘 | Lucide React |
| SEO | Open Graph, JSON-LD, sitemap, robots.txt |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm run start

# 린트
npm run lint
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
src/
├── app/
│   ├── globals.css          # 전역 스타일 (CSS 변수, 테마)
│   ├── icon.svg             # SVG 파비콘
│   ├── layout.tsx           # 루트 레이아웃 (SEO 메타데이터)
│   ├── manifest.ts          # PWA 매니페스트
│   ├── page.tsx             # 메인 페이지
│   ├── robots.ts            # 크롤러 설정
│   └── sitemap.ts           # 사이트맵
├── components/
│   └── RandomNicknameGenerator.tsx  # 메인 컴포넌트 (UI + 상태 관리)
├── lib/
│   ├── nicknameData.ts      # 단어 데이터 (형용사/명사/직업)
│   └── nicknameGenerator.ts # 생성 알고리즘 (형용사 1개 + 명사 1개)
└── types/
    └── nickname.ts          # TypeScript 타입 정의
```

## 라이선스

[MIT License](LICENSE)

---

**Made with ❤️ by devdduddu**
