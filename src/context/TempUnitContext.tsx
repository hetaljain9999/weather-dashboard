import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TempUnitContextProps {
  isCelsius: boolean;
  toggleUnit: () => void;
}

interface TempUnitProviderProps {
  children: ReactNode;  // Ensure 'children' is typed correctly
}

const TempUnitContext = createContext<TempUnitContextProps | undefined>(undefined);

export const TempUnitProvider: React.FC<TempUnitProviderProps> = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleUnit = () => setIsCelsius(!isCelsius);

  return (
    <TempUnitContext.Provider value={{ isCelsius, toggleUnit }}>
      {children}
    </TempUnitContext.Provider>
  );
};

export const useTempUnit = (): TempUnitContextProps => {
  const context = useContext(TempUnitContext);
  if (!context) {
    throw new Error('useTempUnit must be used within a TempUnitProvider');
  }
  return context;
};
