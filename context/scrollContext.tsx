// ScrollContext.tsx
import React, { createContext, useContext } from 'react';
import { Easing, type SharedValue, useSharedValue, withTiming } from 'react-native-reanimated';

type ScrollContextTuple = {
  scrollY: SharedValue<number>;
  resetScroll: () => void;
}

const ScrollContext = createContext<ScrollContextTuple | null>(null);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within a ScrollContextProvider');
  }
  return context;
};

export const ScrollContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const scrollY = useSharedValue(0);
  
  const resetScroll = () => {
    scrollY.value = withTiming(0, { 
      duration: 150, 
      easing: Easing.out(Easing.cubic) 
    });
  };

  return (
    <ScrollContext.Provider value={{ scrollY, resetScroll }}>
      {children}
    </ScrollContext.Provider>
  );
};