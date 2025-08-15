import React from 'react';
import { GeneratorSettings, Language } from '@/types/nickname';
import Select from './ui/Select';
import Input from './ui/Input';
import Button from './ui/Button';

interface GeneratorControlsProps {
  settings: GeneratorSettings;
  onSettingsChange: (settings: GeneratorSettings) => void;
  customWordInput: string;
  onCustomWordInputChange: (value: string) => void;
  onAddCustomWord: () => void;
  onRemoveCustomWord: (word: string) => void;
}

const GeneratorControls: React.FC<GeneratorControlsProps> = ({
  settings,
  onSettingsChange,
  customWordInput,
  onCustomWordInputChange,
  onAddCustomWord,
  onRemoveCustomWord
}) => {
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSettingsChange({ ...settings, language: e.target.value as Language });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, targetLength: parseInt(e.target.value) });
  };

  const handleJobsToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, includeJobs: e.target.checked });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAddCustomWord();
    }
  };

  return (
    <div className="bg-white/10 rounded-2xl p-6 space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">생성 설정</h3>
      
      {/* Language Selection */}
      <div>
        <label className="block text-white font-medium mb-2">언어</label>
        <Select
          value={settings.language}
          onChange={handleLanguageChange}
          options={[
            { value: 'korean', label: '한글' },
            { value: 'english', label: '영어' }
          ]}
        />
      </div>
      
      {/* Target Length Selection */}
      <div>
        <label className="block text-white font-medium mb-3">
          목표 글자수
        </label>
        
        {/* 현재 선택된 글자수 표시 */}
        <div className="bg-white/20 rounded-xl p-4 mb-4 text-center">
          <div className="text-2xl font-bold text-white mb-1">
            {settings.targetLength}글자
          </div>
          <div className="text-white/60 text-sm">
            {settings.targetLength <= 4 ? '짧고 간결한' : 
             settings.targetLength <= 8 ? '적당한 길이' : '길고 독특한'} 닉네임
          </div>
        </div>

        {/* 직접 입력 */}
        <div className="mb-4">
          <label className="block text-white/80 text-sm mb-2">🎯 정확한 글자수 입력</label>
          <div className="flex gap-2">
            <Input
              type="number"
              min="2"
              max="20"
              value={settings.targetLength}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 2 && value <= 20) {
                  onSettingsChange({ ...settings, targetLength: value });
                }
              }}
              placeholder="2-20"
              className="flex-1 text-center font-medium text-lg"
            />
            <button
              onClick={() => onSettingsChange({ ...settings, targetLength: Math.min(20, settings.targetLength + 1) })}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl transition-all duration-200"
            >
              +
            </button>
            <button
              onClick={() => onSettingsChange({ ...settings, targetLength: Math.max(2, settings.targetLength - 1) })}
              className="px-3 py-2 bg-white/15 hover:bg-white/25 text-white rounded-xl transition-all duration-200"
            >
              -
            </button>
          </div>
          <div className="text-white/50 text-xs mt-1 text-center">
            게임 아이디, SNS 등의 글자수 제한에 맞춰 설정하세요
          </div>
        </div>
        
        {/* 빠른 선택 프리셋 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {[3, 4, 6, 8, 10, 12, 15, 16].map((length) => (
            <button
              key={length}
              onClick={() => onSettingsChange({ ...settings, targetLength: length })}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                settings.targetLength === length
                  ? 'bg-white text-purple-600 shadow-lg'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {length}
            </button>
          ))}
        </div>
        
                 {/* 용도별 추천 설정 */}
         <div className="pt-4 border-t border-white/20">
           <div className="text-white/80 text-sm mb-2">💡 용도별 추천</div>
           <div className="grid grid-cols-2 gap-2">
             <button
               onClick={() => onSettingsChange({ 
                 ...settings, 
                 targetLength: 4,
                 customWords: settings.language === 'korean' ? ['고양이', '강아지', '토끼'] : ['cat', 'dog', 'bird']
               })}
               className="py-2 px-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 text-white rounded-lg text-xs transition-all duration-200"
             >
               🐾 귀여운 (동물)
             </button>
             <button
               onClick={() => onSettingsChange({ 
                 ...settings, 
                 targetLength: 6,
                 customWords: settings.language === 'korean' ? ['별', '달', '해', '구름'] : ['star', 'moon', 'sun', 'cloud']
               })}
               className="py-2 px-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 hover:from-green-500/30 hover:to-blue-500/30 text-white rounded-lg text-xs transition-all duration-200"
             >
               ✨ 자연 (천체)
             </button>
             <button
               onClick={() => onSettingsChange({ 
                 ...settings, 
                 targetLength: 8,
                 customWords: settings.language === 'korean' ? ['개발자', '디자이너', '작가'] : ['developer', 'designer', 'writer']
               })}
               className="py-2 px-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white rounded-lg text-xs transition-all duration-200"
             >
               💼 직업 (전문가)
             </button>
             <button
               onClick={() => onSettingsChange({ 
                 ...settings, 
                 targetLength: 5,
                 customWords: settings.language === 'korean' ? ['음악', '노래', '춤', '그림'] : ['music', 'song', 'dance', 'art']
               })}
               className="py-2 px-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 text-white rounded-lg text-xs transition-all duration-200"
             >
               🎨 예술 (창작)
             </button>
           </div>
         </div>
      </div>
      
      {/* Include Jobs */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="includeJobs"
          checked={settings.includeJobs}
          onChange={handleJobsToggle}
          className="w-5 h-5 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
        />
        <label htmlFor="includeJobs" className="text-white font-medium">
          직업 단어 포함
        </label>
      </div>
      
      {/* Custom Words */}
      <div>
        <label className="block text-white font-medium mb-2">사용자 단어 추가</label>
        <div className="flex gap-2 mb-3">
          <Input
            type="text"
            value={customWordInput}
            onChange={(e) => onCustomWordInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="단어를 입력하세요"
            className="flex-1"
          />
          <Button onClick={onAddCustomWord} variant="secondary">
            추가
          </Button>
        </div>
        
        {settings.customWords.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {settings.customWords.map((word, index) => (
              <span
                key={index}
                className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {word}
                <button
                  onClick={() => onRemoveCustomWord(word)}
                  className="text-white/60 hover:text-white"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeneratorControls;