import React from 'react';
import Dashboard from './components/Dashboard'; 
import { TempUnitProvider } from './context/TempUnitContext';

const App: React.FC = () => {
  return (
    <TempUnitProvider>
      <Dashboard />
    </TempUnitProvider>
  );
};

export default App;
