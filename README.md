# 🎯 랜덤 닉네임 생성기

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**특별한 닉네임을 만들어주는 스마트한 웹 애플리케이션** ✨

사용자의 필요에 맞춰 정확한 글자수로 자연스럽고 기억하기 쉬운 닉네임을 생성합니다.

## 🌟 주요 기능

### 🎯 정밀한 글자수 제어
- **2~20글자** 범위에서 정확한 글자수 설정
- **직접 입력** 또는 **빠른 선택** 버튼으로 편리한 설정
- **용도별 추천**: SNS(4글자), 게임(8글자), 비즈니스(12글자)

### 🌏 다국어 지원
- **한글**: 자연스러운 조합과 의성어/의태어 포함
- **영어**: CamelCase 형태의 세련된 닉네임

### 🎨 풍부한 단어 데이터
- **형용사**: 감정, 상태, 동작을 나타내는 다양한 표현
- **명사**: 동물, 자연, 사물, 추상 개념
- **의성어/의태어**: 소근소근, 반짝반짝, 쿨쿨 등
- **직업 단어**: 개발자, 디자이너, 음악가 등
- **어미 형태**: ~하는이, ~되는이 등

### 🛠 사용자 맞춤 기능
- **사용자 단어 추가**: 원하는 단어를 포함한 닉네임 생성
- **직업 단어 토글**: 직업 관련 단어 포함/제외
- **스마트 조합**: 형용사 + 명사 형태로 자연스러운 구성

### 📚 히스토리 & 즐겨찾기
- **생성 히스토리**: 모든 생성된 닉네임을 시간순으로 저장
- **즐겨찾기**: ❤️ 마음에 드는 닉네임을 별도 관리
- **원클릭 복사**: 생성된 닉네임을 클립보드로 즉시 복사

### 🎨 현대적인 UI/UX
- **글래스모피즘 디자인**: 투명하고 세련된 인터페이스
- **반응형 레이아웃**: 모바일부터 데스크톱까지 완벽 지원
- **부드러운 애니메이션**: 자연스러운 상호작용
- **직관적인 조작**: 원클릭으로 모든 기능 접근

## 🚀 설치 및 실행

### 사전 요구사항
- Node.js 18.0 이상
- npm 또는 yarn

### 로컬 개발 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/random-nickname-generator.git
cd random-nickname-generator

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm run dev
# 또는
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
# 빌드
npm run build

# 프로덕션 서버 실행
npm run start
```

## 🛠 기술 스택

### 프론트엔드
- **[Next.js 14](https://nextjs.org/)** - React 프레임워크 (App Router)
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안정성
- **[Tailwind CSS](https://tailwindcss.com/)** - 유틸리티 우선 CSS 프레임워크
- **[Lucide React](https://lucide.dev/)** - 아이콘 라이브러리

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **PostCSS** - CSS 처리

## 📱 사용법

### 1. 기본 사용
1. **글자수 설정**: 직접 입력하거나 빠른 선택 버튼 클릭
2. **언어 선택**: 한글 또는 영어 선택
3. **생성**: "새로 생성" 버튼 클릭
4. **복사**: 마음에 드는 닉네임을 클립보드로 복사

### 2. 고급 설정
- **직업 단어 포함**: 전문적인 느낌의 닉네임
- **사용자 단어 추가**: 특정 단어를 포함한 닉네임
- **히스토리 관리**: 과거 생성된 닉네임 확인 및 즐겨찾기

### 3. 용도별 추천 설정
- **📱 SNS (4글자)**: 인스타그램, 트위터 등
- **🎮 게임 (8글자)**: 온라인 게임 아이디
- **💼 비즈니스 (12글자)**: 전문적인 용도
- **✨ 일반 (6글자)**: 균형잡힌 길이

## 🎯 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 메인 페이지
├── components/            # React 컴포넌트
│   ├── RandomNicknameGenerator.tsx  # 메인 컴포넌트
│   ├── NicknameDisplay.tsx         # 닉네임 표시
│   ├── GeneratorControls.tsx       # 설정 패널
│   ├── NicknameHistory.tsx         # 히스토리 패널
│   └── ui/                         # 재사용 가능한 UI 컴포넌트
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Select.tsx
├── lib/                   # 유틸리티 라이브러리
│   ├── nicknameData.ts    # 닉네임 단어 데이터
│   └── nicknameGenerator.ts # 닉네임 생성 로직
└── types/                 # TypeScript 타입 정의
    └── nickname.ts
```

## 🎨 디자인 특징

### 글래스모피즘 (Glassmorphism)
- 반투명 배경과 블러 효과
- 부드러운 그라데이션
- 미니멀하고 현대적인 느낌

### 컬러 팔레트
- **Primary**: Purple to Pink 그라데이션
- **Background**: 동적 그라데이션 배경
- **Accent**: 화이트 기반의 반투명 요소

### 반응형 디자인
- 모바일 우선 설계
- 유연한 그리드 레이아웃
- 터치 친화적인 인터페이스

## 🔄 업데이트 로그

### v1.0.0 (2024-12-19)
- 🎉 초기 릴리즈
- ✨ 기본 닉네임 생성 기능
- 🎯 정확한 글자수 제어
- 🌏 한글/영어 지원
- 📚 히스토리 & 즐겨찾기
- 🎨 글래스모피즘 UI

## 🤝 기여하기

프로젝트에 기여해주세요! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### 기여 가이드라인
- 코드 스타일: ESLint + Prettier 설정 준수
- 커밋 메시지: [Conventional Commits](https://www.conventionalcommits.org/) 형식
- 타입 안정성: TypeScript 컴파일 오류 없이

## 📝 라이선스

이 프로젝트는 [MIT License](LICENSE)를 따릅니다.

## 🔗 링크

- **라이브 데모**: [링크 추가 예정]
- **블로그 포스트**: [개발기 링크 추가 예정]
- **이슈 신고**: [GitHub Issues](https://github.com/your-username/random-nickname-generator/issues)

## 💬 문의

프로젝트에 대한 문의나 제안사항이 있으시면 언제든 연락주세요!

---

**Made with ❤️ by devdduddu**

*특별한 닉네임으로 새로운 시작을 만들어보세요!*