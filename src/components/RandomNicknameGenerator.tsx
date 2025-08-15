"use client";

import React, { useState, useCallback } from 'react';
import { Sparkles, History } from 'lucide-react';
import { GeneratorSettings, NicknameHistoryItem } from '@/types/nickname';
import { generateNickname } from '@/lib/nicknameGenerator';
import NicknameDisplay from './NicknameDisplay';
import GeneratorControls from './GeneratorControls';
import NicknameHistory from './NicknameHistory';

const RandomNicknameGenerator = () => {
  const [settings, setSettings] = useState<GeneratorSettings>({
    language: 'korean',
    targetLength: 4,
    includeJobs: false,
    customWords: []
  });
  
  const [currentNickname, setCurrentNickname] = useState<string>('');
  const [customWordInput, setCustomWordInput] = useState<string>('');
  const [copiedMessage, setCopiedMessage] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, setHistory] = useState<NicknameHistoryItem[]>([]);

  const handleGenerateNickname = useCallback(() => {
    const nickname = generateNickname(settings);
    setCurrentNickname(nickname);
    
    // 히스토리에 추가
    const historyItem: NicknameHistoryItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      nickname,
      timestamp: Date.now(),
      isFavorite: false,
      settings: { ...settings }
    };
    
    setHistory(prev => [...prev, historyItem]);
  }, [settings]);

  const copyToClipboard = async (nickname?: string) => {
    const textToCopy = nickname || currentNickname;
    if (textToCopy) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedMessage('복사되었습니다!');
        setTimeout(() => setCopiedMessage(''), 2000);
      } catch (err) {
        setCopiedMessage('복사 실패');
        setTimeout(() => setCopiedMessage(''), 2000);
      }
    }
  };

  const handleAddCustomWord = () => {
    if (customWordInput.trim() && !settings.customWords.includes(customWordInput.trim())) {
      setSettings(prev => ({
        ...prev,
        customWords: [...prev.customWords, customWordInput.trim()]
      }));
      setCustomWordInput('');
    }
  };

  const handleRemoveCustomWord = (word: string) => {
    setSettings(prev => ({
      ...prev,
      customWords: prev.customWords.filter(w => w !== word)
    }));
  };

  const handleToggleFavorite = (id: string) => {
    setHistory(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  React.useEffect(() => {
    handleGenerateNickname();
  }, [handleGenerateNickname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20">
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              랜덤 닉네임 생성기
            </h1>
            <p className="text-white/80">
              특별한 닉네임을 만들어보세요!
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl border border-white/20 mb-6">
          <NicknameDisplay
            nickname={currentNickname}
            onGenerate={handleGenerateNickname}
            onCopy={() => copyToClipboard()}
            copiedMessage={copiedMessage}
            onSettingsToggle={() => setShowSettings(!showSettings)}
            onHistoryToggle={() => setShowHistory(!showHistory)}
            showHistory={showHistory}
          />
          
          {/* Settings Panel */}
          {showSettings && (
            <GeneratorControls
              settings={settings}
              onSettingsChange={setSettings}
              customWordInput={customWordInput}
              onCustomWordInputChange={setCustomWordInput}
              onAddCustomWord={handleAddCustomWord}
              onRemoveCustomWord={handleRemoveCustomWord}
            />
          )}

          {/* History Panel */}
          {showHistory && (
            <NicknameHistory
              history={history}
              onToggleFavorite={handleToggleFavorite}
              onCopyNickname={copyToClipboard}
              onDeleteItem={handleDeleteHistoryItem}
              onClearHistory={handleClearHistory}
            />
          )}
        </div>
        
        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-sm font-semibold">
            Made by devdduddu💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default RandomNicknameGenerator;