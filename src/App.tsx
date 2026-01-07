import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CalculatorForm } from './components/CalculatorForm';
import { Results } from './components/Results';
import { Footer } from './components/Footer';
import { InstallPWA } from './components/InstallPWA';
import type { CalculationResult } from './utils/calculations';

function App() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [key, setKey] = useState(0); // Used to reset the form

  const handleCalculate = (newResult: CalculationResult) => {
    setResult(newResult);
  };

  const handleReset = () => {
    setResult(null);
    setKey(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main>
        {!result && <Hero />}
        
        <div className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10">
          <CalculatorForm 
            key={key} 
            onCalculate={handleCalculate} 
          />
          
          <Results result={result} />
        </div>
      </main>

      <Footer onReset={handleReset} />
      <InstallPWA />
    </div>
  );
}

export default App;
