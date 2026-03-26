"use client";

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { RefreshCw, Copy, Check, ChevronDown, ChevronUp, Heart, Trash2, Plus, X } from 'lucide-react';
import { GeneratorSettings, NicknameHistoryItem, Language } from '@/types/nickname';
import { generateNickname } from '@/lib/nicknameGenerator';

const HISTORY_STORAGE_KEY = 'nickname-history';
const SETTINGS_STORAGE_KEY = 'nickname-settings';
const MAX_HISTORY = 100;

const defaultSettings: GeneratorSettings = {
  language: 'korean',
  targetLength: 4,
  includeJobs: false,
  customWords: []
};

const loadFromStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const BATCH_COUNT = 8;

const RandomNicknameGenerator = () => {
  const [settings, setSettings] = useState<GeneratorSettings>(defaultSettings);
  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [candidates, setCandidates] = useState<string[]>([]);
  const [customWordInput, setCustomWordInput] = useState<string>('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<NicknameHistoryItem[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const isInitialized = useRef(false);

  useEffect(() => {
    setSettings(loadFromStorage(SETTINGS_STORAGE_KEY, defaultSettings));
    setHistory(loadFromStorage(HISTORY_STORAGE_KEY, []));
    isInitialized.current = true;
  }, []);

  useEffect(() => {
    if (isInitialized.current) {
      setCurrentNickname(generateNickname(settings));
      generateCandidates(settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized.current]);

  const generateCandidates = (s: GeneratorSettings) => {
    const set = new Set<string>();
    while (set.size < BATCH_COUNT) {
      set.add(generateNickname(s));
    }
    setCandidates(Array.from(set));
  };

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    }
  }, [history]);

  const handleGenerate = useCallback(() => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 400);
    generateCandidates(settings);
  }, [settings]);

  const selectNickname = useCallback((nickname: string) => {
    setCurrentNickname(nickname);

    setHistory(prev => {
      const updated = [...prev, {
        id: crypto.randomUUID(),
        nickname,
        timestamp: Date.now(),
        isFavorite: false,
        settings: { ...settings }
      }];
      if (updated.length > MAX_HISTORY) {
        const favorites = updated.filter(i => i.isFavorite);
        const rest = updated.filter(i => !i.isFavorite);
        return [...favorites, ...rest.slice(rest.length - (MAX_HISTORY - favorites.length))]
          .sort((a, b) => a.timestamp - b.timestamp);
      }
      return updated;
    });
  }, [settings]);

  const copyToClipboard = async (text?: string) => {
    const toCopy = text || currentNickname;
    if (!toCopy) return;
    try {
      await navigator.clipboard.writeText(toCopy);
      setCopiedText(toCopy);
      setTimeout(() => setCopiedText(null), 1500);
    } catch { /* ignore */ }
  };

  const updateSettings = (patch: Partial<GeneratorSettings>) => {
    setSettings(prev => ({ ...prev, ...patch }));
  };

  const addCustomWord = () => {
    const word = customWordInput.trim();
    if (word && !settings.customWords.includes(word)) {
      updateSettings({ customWords: [...settings.customWords, word] });
      setCustomWordInput('');
    }
  };

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(i => i.id === id ? { ...i, isFavorite: !i.isFavorite } : i));
  };

  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(i => i.id !== id));
  };

  const favorites = history.filter(i => i.isFavorite);
  const recent = history.slice(-10).reverse();

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });

  const lengthPresets = [3, 4, 6, 8, 10, 12];

  const presetPool = {
    animal: {
      icon: '🐾', name: '귀여운 동물', length: 4,
      korean: ['고양이', '강아지', '토끼', '햄스터', '다람쥐', '여우', '판다', '코알라', '수달', '펭귄', '오리', '참새', '나비', '꿀벌', '반딧불이', '알파카', '미어캣', '고슴도치', '백조', '앵무새', '달팽이', '사슴', '두루미', '부엉이', '라쿤'],
      english: ['cat', 'dog', 'rabbit', 'hamster', 'squirrel', 'fox', 'panda', 'koala', 'otter', 'penguin', 'duck', 'sparrow', 'butterfly', 'bee', 'firefly', 'alpaca', 'meerkat', 'hedgehog', 'swan', 'parrot', 'snail', 'deer', 'crane', 'owl', 'raccoon'],
    },
    nature: {
      icon: '✨', name: '자연·천체', length: 6,
      korean: ['별', '달', '해', '구름', '바람', '비', '눈', '무지개', '노을', '새벽', '안개', '이슬', '서리', '오로라', '유성', '은하', '행성', '하늘', '여명', '황혼', '꽃', '나무', '숲', '바다', '폭포'],
      english: ['star', 'moon', 'sun', 'cloud', 'wind', 'rain', 'snow', 'rainbow', 'sunset', 'dawn', 'fog', 'dew', 'frost', 'aurora', 'meteor', 'galaxy', 'planet', 'sky', 'comet', 'twilight', 'flower', 'tree', 'forest', 'ocean', 'waterfall'],
    },
    job: {
      icon: '💼', name: '전문가', length: 8,
      korean: ['개발자', '디자이너', '작가', '화가', '음악가', '요리사', '의사', '선생님', '과학자', '연구원', '건축가', '엔지니어', '파일럿', '사진작가', '발명가', '탐험가', '천문학자', '식물학자', '큐레이터', '프로듀서', '바리스타', '제빵사', '수의사', '안무가', '편집자'],
      english: ['developer', 'designer', 'writer', 'artist', 'musician', 'chef', 'doctor', 'teacher', 'scientist', 'researcher', 'architect', 'engineer', 'pilot', 'photographer', 'inventor', 'explorer', 'astronomer', 'botanist', 'curator', 'producer', 'barista', 'baker', 'detective', 'captain', 'director'],
    },
    art: {
      icon: '🎨', name: '예술·창작', length: 5,
      korean: ['음악', '노래', '춤', '그림', '사진', '영화', '시', '소설', '만화', '피아노', '기타', '드럼', '바이올린', '플루트', '붓', '물감', '무대', '캔버스', '악보', '멜로디', '하모니', '리듬', '조각', '도자기', '수채화'],
      english: ['music', 'song', 'dance', 'art', 'photo', 'movie', 'poem', 'novel', 'comic', 'piano', 'guitar', 'drum', 'violin', 'flute', 'brush', 'canvas', 'stage', 'melody', 'harmony', 'rhythm', 'sketch', 'mosaic', 'palette', 'sculpture', 'mural'],
    },
    food: {
      icon: '🍰', name: '맛있는 음식', length: 5,
      korean: ['떡볶이', '붕어빵', '호떡', '인절미', '솜사탕', '마카롱', '초콜릿', '젤리', '쿠키', '푸딩', '케이크', '빵', '도넛', '와플', '아이스크림', '타르트', '크레페', '팬케이크', '브라우니', '캔디', '카스테라', '슈크림', '에클레어', '머핀', '크루아상'],
      english: ['cookie', 'muffin', 'waffle', 'cupcake', 'brownie', 'macaron', 'truffle', 'pudding', 'candy', 'biscuit', 'cake', 'donut', 'crepe', 'tart', 'pancake', 'pie', 'fudge', 'caramel', 'pretzel', 'sorbet', 'gelato', 'croissant', 'scone', 'mousse', 'eclair'],
    },
    fantasy: {
      icon: '🔮', name: '판타지', length: 6,
      korean: ['마법사', '기사', '궁수', '연금술사', '요정', '드래곤', '유니콘', '피닉스', '정령', '엘프', '난쟁이', '거인', '인어', '그리핀', '켄타우로스', '마왕', '현자', '예언자', '수호자', '방랑자', '성기사', '암살자', '소환사', '치유사', '마도사'],
      english: ['wizard', 'knight', 'archer', 'alchemist', 'fairy', 'dragon', 'unicorn', 'phoenix', 'spirit', 'elf', 'dwarf', 'giant', 'mermaid', 'griffin', 'centaur', 'sage', 'oracle', 'guardian', 'wanderer', 'paladin', 'ranger', 'healer', 'sorcerer', 'druid', 'bard'],
    },
  };

  const pickRandom = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const applyPreset = (key: keyof typeof presetPool) => {
    const preset = presetPool[key];
    const pool = preset[settings.language];
    updateSettings({
      targetLength: preset.length,
      customWords: pickRandom(pool, 3),
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-lg mx-auto space-y-4">

        {/* Header */}
        <div className="text-center pt-4 pb-2">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            닉네임 생성기
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            클릭 한 번으로 특별한 닉네임을 만들어보세요
          </p>
        </div>

        {/* ── Selected Nickname ── */}
        {currentNickname && (
          <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6">
            <button
              onClick={() => copyToClipboard()}
              className="w-full group"
              aria-label="닉네임 복사"
            >
              <div className="bg-[var(--color-surface-alt)] rounded-xl px-6 py-8 transition-colors group-hover:bg-[#ede9fe]">
                <div className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] break-all leading-tight">
                  {currentNickname}
                </div>
                <div className="mt-2 text-xs text-[var(--color-text-secondary)]">
                  {currentNickname.length}자
                </div>
                <div className={`mt-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                  copiedText === currentNickname ? 'text-emerald-500' : 'text-[var(--color-text-secondary)]'
                }`}>
                  {copiedText === currentNickname ? (
                    <><Check className="w-3.5 h-3.5" /> 복사 완료!</>
                  ) : (
                    <><Copy className="w-3.5 h-3.5" /> 클릭하면 복사됩니다</>
                  )}
                </div>
              </div>
            </button>
          </div>
        )}

        {/* ── Candidates Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              마음에 드는 닉네임을 골라보세요
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {candidates.map(name => (
              <button
                key={name}
                onClick={() => selectNickname(name)}
                className={`group relative px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                  currentNickname === name
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-[var(--color-surface-alt)] text-[var(--color-text)] hover:bg-[#ede9fe] hover:text-[var(--color-primary)]'
                }`}
              >
                <span className="block truncate">{name}</span>
                <span className={`text-xs mt-0.5 block ${
                  currentNickname === name ? 'text-white/70' : 'text-[var(--color-text-secondary)]'
                }`}>
                  {name.length}자
                </span>
                {/* Copy button on hover */}
                <span
                  onClick={e => { e.stopPropagation(); copyToClipboard(name); }}
                  className={`absolute top-2 right-2 p-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${
                    currentNickname === name
                      ? 'hover:bg-white/20'
                      : 'hover:bg-[var(--color-primary)]/10'
                  }`}
                  role="button"
                  aria-label={`${name} 복사`}
                >
                  {copiedText === name
                    ? <Check className={`w-3.5 h-3.5 ${currentNickname === name ? 'text-white' : 'text-emerald-500'}`} />
                    : <Copy className={`w-3.5 h-3.5 ${currentNickname === name ? 'text-white/70' : 'text-[var(--color-text-secondary)]'}`} />
                  }
                </span>
              </button>
            ))}
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-semibold py-3.5 rounded-xl transition-colors active:scale-[0.98]"
          >
            <RefreshCw className={`w-4.5 h-4.5 ${isSpinning ? 'animate-spin' : ''}`} />
            다시 생성
          </button>
        </div>

        {/* ── Settings Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-5 space-y-5">

          {/* Language Toggle */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              언어
            </label>
            <div className="mt-2 flex bg-[var(--color-surface-alt)] rounded-lg p-1">
              {([['korean', '한국어'], ['english', 'English']] as const).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => updateSettings({ language: val as Language })}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    settings.language === val
                      ? 'bg-white text-[var(--color-primary)] shadow-sm'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Target Length */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                글자수
              </label>
              <span className="text-sm font-bold text-[var(--color-primary)]">
                {settings.targetLength}자
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {lengthPresets.map(n => (
                <button
                  key={n}
                  onClick={() => updateSettings({ targetLength: n })}
                  className={`h-9 min-w-[2.5rem] px-3 rounded-lg text-sm font-medium transition-all ${
                    settings.targetLength === n
                      ? 'bg-[var(--color-primary)] text-white shadow-sm'
                      : 'bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[#ede9fe] hover:text-[var(--color-primary)]'
                  }`}
                >
                  {n}
                </button>
              ))}
              {/* Custom input */}
              <div className="flex items-center gap-1 bg-[var(--color-surface-alt)] rounded-lg px-2">
                <input
                  type="number"
                  min={2}
                  max={20}
                  value={settings.targetLength}
                  onChange={e => {
                    const v = parseInt(e.target.value);
                    if (v >= 2 && v <= 20) updateSettings({ targetLength: v });
                  }}
                  className="w-10 h-9 text-center text-sm font-medium bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  aria-label="글자수 직접 입력"
                />
              </div>
            </div>
            <p className="mt-1.5 text-xs text-[var(--color-text-secondary)]">
              {settings.language === 'english'
                ? '알파벳 글자수 기준 (예: CoolCat = 7자)'
                : '2~20자 사이에서 선택하세요'}
            </p>
          </div>

          {/* Jobs Toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                checked={settings.includeJobs}
                onChange={e => updateSettings({ includeJobs: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer-checked:bg-[var(--color-primary)] transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors">
              직업 단어 포함
            </span>
          </label>

          {/* Custom Words */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              나만의 단어
            </label>
            <div className="mt-2 flex gap-2">
              <input
                type="text"
                value={customWordInput}
                onChange={e => setCustomWordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addCustomWord()}
                placeholder="단어 입력 후 Enter"
                className="flex-1 h-10 px-3 text-sm bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 focus:border-[var(--color-primary)] placeholder:text-gray-400 transition-all"
              />
              <button
                onClick={addCustomWord}
                aria-label="단어 추가"
                className="h-10 w-10 flex items-center justify-center bg-[var(--color-surface-alt)] border border-[var(--color-border)] rounded-lg text-[var(--color-text-secondary)] hover:bg-[#ede9fe] hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {settings.customWords.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {settings.customWords.map(word => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1 bg-[#ede9fe] text-[var(--color-primary)] pl-2.5 pr-1.5 py-1 rounded-full text-xs font-medium"
                  >
                    {word}
                    <button
                      onClick={() => updateSettings({ customWords: settings.customWords.filter(w => w !== word) })}
                      aria-label={`${word} 제거`}
                      className="p-0.5 rounded-full hover:bg-[var(--color-primary)]/10 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Presets */}
          <div>
            <label className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
              빠른 설정
            </label>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1 mb-2">
              누를 때마다 테마에 맞는 랜덤 단어가 적용됩니다
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(presetPool) as (keyof typeof presetPool)[]).map(key => {
                const preset = presetPool[key];
                return (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className="flex flex-col items-center gap-1 px-3 py-3 bg-[var(--color-surface-alt)] rounded-lg text-[var(--color-text)] hover:bg-[#ede9fe] hover:text-[var(--color-primary)] transition-colors active:scale-95"
                  >
                    <span className="text-lg">{preset.icon}</span>
                    <span className="text-xs font-medium">{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── History Card ── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)]">
          <button
            onClick={() => setShowHistory(!showHistory)}
            aria-expanded={showHistory}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-[var(--color-text)]"
          >
            <span>히스토리 {history.length > 0 && `(${history.length})`}</span>
            {showHistory
              ? <ChevronUp className="w-4 h-4 text-[var(--color-text-secondary)]" />
              : <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
            }
          </button>

          {showHistory && (
            <div className="px-5 pb-5 space-y-4">
              {history.length === 0 ? (
                <p className="text-center text-sm text-[var(--color-text-secondary)] py-6">
                  아직 생성된 닉네임이 없습니다
                </p>
              ) : (
                <>
                  {/* Favorites */}
                  {favorites.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">
                        즐겨찾기
                      </h4>
                      <div className="space-y-1">
                        {favorites.map(item => (
                          <HistoryRow
                            key={item.id}
                            item={item}
                            onToggleFavorite={toggleFavorite}
                            onCopy={copyToClipboard}
                            onDelete={deleteItem}
                            formatTime={formatTime}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recent */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                        최근 생성
                      </h4>
                      <button
                        onClick={() => setHistory([])}
                        aria-label="히스토리 전체 삭제"
                        className="text-xs text-[var(--color-text-secondary)] hover:text-red-500 transition-colors"
                      >
                        전체 삭제
                      </button>
                    </div>
                    <div className="space-y-1 max-h-64 overflow-y-auto">
                      {recent.map(item => (
                        <HistoryRow
                          key={item.id}
                          item={item}
                          onToggleFavorite={toggleFavorite}
                          onCopy={copyToClipboard}
                          onDelete={deleteItem}
                          formatTime={formatTime}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-[var(--color-text-secondary)] pb-4">
          Made by devdduddu
        </p>
      </div>
    </div>
  );
};

/* ── History Row ── */
interface HistoryRowProps {
  item: NicknameHistoryItem;
  onToggleFavorite: (id: string) => void;
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
  formatTime: (ts: number) => string;
}

const HistoryRow: React.FC<HistoryRowProps> = ({ item, onToggleFavorite, onCopy, onDelete, formatTime }) => (
  <div className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-surface-alt)] transition-colors">
    <button
      onClick={() => onToggleFavorite(item.id)}
      aria-label={item.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
      className="shrink-0"
    >
      <Heart className={`w-4 h-4 transition-colors ${
        item.isFavorite ? 'text-red-400 fill-red-400' : 'text-gray-300 hover:text-red-300'
      }`} />
    </button>
    <button
      onClick={() => onCopy(item.nickname)}
      className="flex-1 text-left min-w-0"
      aria-label={`${item.nickname} 복사`}
    >
      <span className="text-sm font-medium text-[var(--color-text)] truncate block">
        {item.nickname}
      </span>
    </button>
    <span className="text-xs text-[var(--color-text-secondary)] shrink-0 tabular-nums">
      {formatTime(item.timestamp)}
    </span>
    <button
      onClick={() => onDelete(item.id)}
      aria-label={`${item.nickname} 삭제`}
      className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400 transition-colors" />
    </button>
  </div>
);

export default RandomNicknameGenerator;
