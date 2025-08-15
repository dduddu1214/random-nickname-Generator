import { GeneratorSettings } from '@/types/nickname';
import { nicknameData } from './nicknameData';

export const generateNickname = (settings: GeneratorSettings): string => {
  const data = nicknameData[settings.language];
  const targetLength = settings.targetLength;
  
  // 언어별 최대 시도 횟수
  const maxAttempts = 100;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    attempts++;
    const words: string[] = [];
    let currentLength = 0;
    let customWordUsed = false;
    
    // 목표 길이에 맞는 형용사 선택
    const suitableAdjectives = data.adjectives.filter((adj: string) => {
      // 형용사만으로 목표 길이를 초과하지 않고, 최소 1글자는 남겨둬야 함
      return adj.length < targetLength && adj.length <= Math.floor(targetLength * 0.7);
    });
    
    if (suitableAdjectives.length === 0) {
      // 적절한 형용사가 없으면 가장 짧은 형용사 사용
      const shortestAdj = data.adjectives.reduce((prev: string, curr: string) => 
        prev.length <= curr.length ? prev : curr
      );
      words.push(shortestAdj);
      currentLength = shortestAdj.length;
    } else {
      const randomAdjective = suitableAdjectives[Math.floor(Math.random() * suitableAdjectives.length)];
      words.push(randomAdjective);
      currentLength = randomAdjective.length;
    }
    
    // 목표 길이까지 단어 추가
    while (currentLength < targetLength) {
      const remainingLength = targetLength - currentLength;
      
      // 남은 길이가 1글자면 중단 (한글 특성상 1글자 단어는 부자연스러움)
      if (remainingLength <= 0) break;
      
      // 가능한 단어들 수집
      const availableWords: string[] = [];
      
      // 기본 명사 중 길이가 맞는 것들
      const suitableNouns = data.nouns.filter((noun: string) => 
        noun.length <= remainingLength && noun.length >= Math.min(2, remainingLength)
      );
      availableWords.push(...suitableNouns);
      
      // 직업 단어 추가 (설정되어 있으면)
      if (settings.includeJobs) {
        const suitableJobs = data.jobs.filter((job: string) => 
          job.length <= remainingLength && job.length >= Math.min(2, remainingLength)
        );
        availableWords.push(...suitableJobs);
      }
      
      // 사용자 단어 처리
      if (settings.customWords.length > 0) {
        const suitableCustomWords = settings.customWords.filter((word: string) => 
          word.length <= remainingLength && word.length >= Math.min(1, remainingLength)
        );
        
        // 사용자 단어가 아직 사용되지 않았고, 적절한 길이라면 우선 사용
        if (!customWordUsed && suitableCustomWords.length > 0) {
          // 50% 확률로 사용자 단어 우선 선택
          if (Math.random() < 0.5 || remainingLength <= 3) {
            const randomCustomWord = suitableCustomWords[Math.floor(Math.random() * suitableCustomWords.length)];
            words.push(randomCustomWord);
            currentLength += randomCustomWord.length;
            customWordUsed = true;
            continue;
          }
        }
        
        // 일반 선택지에도 포함
        availableWords.push(...suitableCustomWords);
      }
      
      // 사용 가능한 단어가 없으면 종료
      if (availableWords.length === 0) {
        break;
      }
      
      // 목표 길이에 딱 맞는 단어 우선 선택
      const perfectFitWords = availableWords.filter((word: string) => word.length === remainingLength);
      let selectedWord: string;
      
      if (perfectFitWords.length > 0) {
        selectedWord = perfectFitWords[Math.floor(Math.random() * perfectFitWords.length)];
      } else {
        // 딱 맞는 단어가 없으면 가능한 단어 중 랜덤 선택
        selectedWord = availableWords[Math.floor(Math.random() * availableWords.length)];
      }
      
      words.push(selectedWord);
      currentLength += selectedWord.length;
      
      // 사용자 단어였다면 표시
      if (settings.customWords.includes(selectedWord)) {
        customWordUsed = true;
      }
      
      // 목표 길이에 도달했으면 종료
      if (currentLength >= targetLength) {
        break;
      }
    }
    
    // 목표 길이와 정확히 일치하거나 ±1 글자 이내면 성공
    if (currentLength === targetLength || (currentLength >= targetLength - 1 && currentLength <= targetLength + 1)) {
      // 사용자 단어가 있는데 사용되지 않았고, 아직 시도 여지가 있으면 다시 시도
      if (settings.customWords.length > 0 && !customWordUsed && attempts < maxAttempts - 20) {
        continue;
      }
      
      // 언어별 조합 방식
      const nickname = settings.language === 'korean' 
        ? words.join('') 
        : words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
        
      return nickname;
    }
  }
  
  // 실패한 경우 간단한 조합으로 폴백
  const shortAdjectives = data.adjectives.filter((adj: string) => adj.length <= 2).slice(0, 5);
  const shortNouns = data.nouns.filter((noun: string) => noun.length <= Math.max(2, targetLength - 2)).slice(0, 10);
  
  if (shortAdjectives.length > 0 && shortNouns.length > 0) {
    const adj = shortAdjectives[Math.floor(Math.random() * shortAdjectives.length)];
    const noun = shortNouns[Math.floor(Math.random() * shortNouns.length)];
    
    const fallback = settings.language === 'korean' 
      ? adj + noun 
      : adj.charAt(0).toUpperCase() + adj.slice(1) + 
        noun.charAt(0).toUpperCase() + noun.slice(1);
        
    return fallback;
  }
  
  // 최후의 수단
  return settings.language === 'korean' ? '멋진고양이' : 'CoolCat';
};