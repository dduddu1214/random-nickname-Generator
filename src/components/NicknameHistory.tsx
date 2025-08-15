import React from 'react';
import { Heart, Copy, Trash2, Clock } from 'lucide-react';
import { NicknameHistoryItem } from '@/types/nickname';

interface NicknameHistoryProps {
  history: NicknameHistoryItem[];
  onToggleFavorite: (id: string) => void;
  onCopyNickname: (nickname: string) => void;
  onDeleteItem: (id: string) => void;
  onClearHistory: () => void;
}

const NicknameHistory: React.FC<NicknameHistoryProps> = ({
  history,
  onToggleFavorite,
  onCopyNickname,
  onDeleteItem,
  onClearHistory
}) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const favorites = history.filter(item => item.isFavorite);
  const recent = history.slice(-10).reverse();

  return (
    <div className="bg-white/10 rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          히스토리
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-white/60 hover:text-white text-sm flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            전체 삭제
          </button>
        )}
      </div>

      {/* 즐겨찾기 */}
      {favorites.length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            즐겨찾기
          </h4>
          <div className="space-y-2">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="text-white font-medium">{item.nickname}</div>
                  <div className="text-white/60 text-xs">
                    {formatTime(item.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                  <button
                    onClick={() => onCopyNickname(item.nickname)}
                    className="text-white/60 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-white/60 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 최근 생성 */}
      {recent.length > 0 && (
        <div>
          <h4 className="text-white font-medium mb-3">최근 생성</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {recent.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 rounded-xl p-3 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="text-white font-medium">{item.nickname}</div>
                  <div className="text-white/60 text-xs">
                    {formatTime(item.timestamp)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(item.id)}
                    className={`${
                      item.isFavorite 
                        ? 'text-red-400 fill-current' 
                        : 'text-white/60 hover:text-red-400'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onCopyNickname(item.nickname)}
                    className="text-white/60 hover:text-white"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="text-white/60 hover:text-white"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {history.length === 0 && (
        <div className="text-center text-white/60 py-8">
          아직 생성된 닉네임이 없습니다.
        </div>
      )}
    </div>
  );
};

export default NicknameHistory;