import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { sendLocalStressNotification } from '@services/notifications';

type Emotion = 'Happy' | 'Sad' | 'Stressed' | 'Neutral' | null;
type Gesture = 'DoubleBlink' | 'SingleBlink' | 'LookLeft' | 'LookRight' | null;

type EmotionContextType = {
  currentEmotion: Emotion;
  lastGesture: Gesture;
  isPlaying: boolean;
  lastAction: string | null;
  setEmotion: (e: Emotion) => void;
  setGesture: (g: Gesture) => void;
};

const EmotionContext = createContext<EmotionContextType | undefined>(undefined);

export const EmotionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>(null);
  const [lastGesture, setLastGesture] = useState<Gesture>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const stressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const emotionRef = useRef<Emotion>(null);

  useEffect(() => { emotionRef.current = currentEmotion; }, [currentEmotion]);

  useEffect(() => {
    if (currentEmotion === 'Stressed') {
      if (stressTimerRef.current) return;
      stressTimerRef.current = setTimeout(() => {
        if (emotionRef.current === 'Stressed') {
          sendLocalStressNotification();
        }
        stressTimerRef.current && clearTimeout(stressTimerRef.current);
        stressTimerRef.current = null;
      }, 120000);
    } else {
      if (stressTimerRef.current) {
        clearTimeout(stressTimerRef.current);
        stressTimerRef.current = null;
      }
    }
  }, [currentEmotion]);

  useEffect(() => {
    if (!lastGesture) return;
    if (lastGesture === 'DoubleBlink') {
      setIsPlaying(prev => {
        const next = !prev;
        setLastAction(next ? 'Play' : 'Pause');
        return next;
      });
    } else if (lastGesture === 'LookLeft') {
      setLastAction('Undo');
    } else if (lastGesture === 'LookRight') {
      setLastAction('Redo');
    }
  }, [lastGesture]);
  return (
    <EmotionContext.Provider value={{ currentEmotion, lastGesture, isPlaying, lastAction, setEmotion: setCurrentEmotion, setGesture: setLastGesture }}>
      {children}
    </EmotionContext.Provider>
  );
};

export const useEmotion = () => {
  const ctx = useContext(EmotionContext);
  if (!ctx) throw new Error('useEmotion must be used within EmotionProvider');
  return ctx;
};

