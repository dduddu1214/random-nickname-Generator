export type Language = 'korean' | 'english';

export interface GeneratorSettings {
  language: Language;
  targetLength: number; // 목표 글자수
  includeJobs: boolean;
  customWords: string[];
}

export interface NicknameData {
  korean: {
    adjectives: string[];
    nouns: string[];
    jobs: string[];
  };
  english: {
    adjectives: string[];
    nouns: string[];
    jobs: string[];
  };
}

export interface NicknameHistoryItem {
  id: string;
  nickname: string;
  timestamp: number;
  isFavorite: boolean;
  settings: GeneratorSettings;
}