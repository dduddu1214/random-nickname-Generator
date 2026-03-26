import { GeneratorSettings } from '@/types/nickname';
import { nicknameData } from './nicknameData';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const join = (words: string[], language: string) =>
  language === 'korean' ? words.join('') : words.map(capitalize).join('');

export const generateNickname = (settings: GeneratorSettings): string => {
  const { language, targetLength, includeJobs, customWords } = settings;
  const data = nicknameData[language];

  // 명사 후보 풀 구성 (기본 명사 + 직업 + 사용자 단어)
  const nounPool = [
    ...data.nouns,
    ...(includeJobs ? data.jobs : []),
    ...customWords,
  ];

  const maxAttempts = 200;
  let bestResult = '';
  let bestDiff = Infinity;

  for (let i = 0; i < maxAttempts; i++) {
    // 형용사 1개 + 명사 1개
    const adj = pick(data.adjectives);
    const noun = pick(nounPool);
    const combined = join([adj, noun], language);
    const diff = Math.abs(combined.length - targetLength);

    // 사용자 단어가 있으면 포함된 조합 우선
    const hasCustom = customWords.length === 0 || customWords.includes(noun);

    if (diff === 0 && hasCustom) return combined;

    // 가장 가까운 조합 기록
    if (diff < bestDiff || (diff === bestDiff && hasCustom)) {
      bestDiff = diff;
      bestResult = combined;
    }

    // ±1 이내이고 사용자 단어 조건 충족하면 조기 반환
    if (diff <= 1 && hasCustom && i > maxAttempts / 2) return combined;
  }

  return bestResult || (language === 'korean' ? '멋진고양이' : 'CoolCat');
};
