import React from 'react';
import { Shuffle, Copy, Settings, History } from 'lucide-react';
import Button from './ui/Button';

interface NicknameDisplayProps {
  nickname: string;
  onGenerate: () => void;
  onCopy: () => void;
  copiedMessage: string;
  onSettingsToggle: () => void;
  onHistoryToggle: () => void;
  showHistory: boolean;
}

const NicknameDisplay: React.FC<NicknameDisplayProps> = ({
  nickname,
  onGenerate,
  onCopy,
  copiedMessage,
  onSettingsToggle,
  onHistoryToggle,
  showHistory
}) => {
  return (
    <div className="text-center mb-8">
      <div className="bg-white/20 rounded-2xl p-6 mb-4">
        <div className="text-4xl font-bold text-white mb-2 min-h-[3rem] flex items-center justify-center">
          {nickname || '생성해보세요!'}
        </div>
        {copiedMessage && (
          <div className="text-green-300 text-sm font-medium">
            {copiedMessage}
          </div>
        )}
      </div>
      
      <div className="flex gap-3 justify-center flex-wrap">
        <Button onClick={onGenerate} icon={Shuffle}>
          새로 생성
        </Button>
        
        {nickname && (
          <Button onClick={onCopy} icon={Copy}>
            복사
          </Button>
        )}
        
        <Button onClick={onSettingsToggle} icon={Settings}>
          설정
        </Button>

        <Button 
          onClick={onHistoryToggle} 
          icon={History}
          variant={showHistory ? 'primary' : 'secondary'}
        >
          히스토리
        </Button>
      </div>
    </div>
  );
};

export default NicknameDisplay;