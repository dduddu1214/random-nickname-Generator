import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#a855f6",
};

export const metadata: Metadata = {
  title: "랜덤 닉네임 생성기 | 게임·SNS 닉네임 추천",
  description:
    "한국어, 영어 랜덤 닉네임을 글자수에 맞춰 생성하세요. 게임 아이디, SNS 닉네임, 캐릭터 이름 등 다양한 용도로 활용할 수 있습니다.",
  keywords: [
    "닉네임 생성기",
    "랜덤 닉네임",
    "게임 닉네임",
    "닉네임 추천",
    "닉네임 만들기",
    "영어 닉네임",
    "한글 닉네임",
    "캐릭터 이름",
    "아이디 생성기",
    "nickname generator",
    "random nickname",
  ],
  openGraph: {
    title: "랜덤 닉네임 생성기",
    description:
      "한국어·영어 랜덤 닉네임을 글자수에 맞춰 생성하세요. 게임, SNS, 캐릭터 이름 등 다양한 용도!",
    type: "website",
    locale: "ko_KR",
    siteName: "랜덤 닉네임 생성기",
  },
  twitter: {
    card: "summary_large_image",
    title: "랜덤 닉네임 생성기",
    description:
      "한국어·영어 랜덤 닉네임을 글자수에 맞춰 생성하세요.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="81abc6e43a9388aae73b4069c919f5a5318aef69" />
        <meta name="google-site-verification" content="UuP-XAG-bcvmnubldYMWhTIVRRuDlSmrbSYc1FEcTvU" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "랜덤 닉네임 생성기",
              description:
                "한국어, 영어 랜덤 닉네임을 글자수에 맞춰 생성하는 무료 온라인 도구",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              inLanguage: ["ko", "en"],
            }),
          }}
        />
      </head>
      <body className={`${notoSansKr.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
