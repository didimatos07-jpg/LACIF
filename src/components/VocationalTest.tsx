import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Trophy, ArrowRight, Check, Compass, ShieldAlert } from 'lucide-react';
import { VocationalQuestion, VocationalResult } from '../types.ts';

interface VocationalTestProps {
  questions: VocationalQuestion[];
  results: Record<string, VocationalResult>;
}

export default function VocationalTest({ questions, results }: VocationalTestProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<VocationalQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [completed, setCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<VocationalResult | null>(null);

  // Initialize and shuffle questions
  useEffect(() => {
    initTest();
  }, [questions]);

  const initTest = () => {
    // Basic array shuffling (Fisher-Yates)
    const arrayCopy = [...questions];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    setShuffledQuestions(arrayCopy);
    setCurrentIndex(0);
    setScores({});
    setCompleted(false);
    setFinalResult(null);
  };

  const handleSelectOption = (pointsFor: string) => {
    const updatedScores = {
      ...scores,
      [pointsFor]: (scores[pointsFor] || 0) + 1,
    };
    setScores(updatedScores);

    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Calculate highest scoring forensic profile
      let topCategory = 'investigacao'; // fallback
      let highestScore = -1;

      (Object.entries(updatedScores) as [string, number][]).forEach(([category, pts]) => {
        if (pts > highestScore) {
          highestScore = pts;
          topCategory = category;
        }
      });

      // Retrieve result details
      const matched = results[topCategory] || results['investigacao'];
      setFinalResult(matched);
      setCompleted(true);
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center font-mono text-gray-400 py-12">
        <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-500" />
        Carregando console vocacional...
      </div>
    );
  }

  const currentQuestion = shuffledQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / shuffledQuestions.length) * 100);

  return (
    <div className="w-full">
      {!completed ? (
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-white/10 max-w-3xl mx-auto">
          
          {/* Header Progress Counter */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-mono text-xs text-blue-400 font-bold tracking-wider uppercase">
              Consola Vocacional de Perícia
            </span>
            <span className="font-mono text-xs text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md border border-yellow-400/20">
              Questão {currentIndex + 1} de {shuffledQuestions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-600 to-yellow-400 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="font-display text-xl md:text-2xl text-white font-medium leading-relaxed">
              {currentQuestion.question}
            </h3>
          </div>

          {/* Interactive Multiple Choice Cards */}
          <div className="space-y-4">
            {currentQuestion.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleSelectOption(opt.pointsFor)}
                className="w-full text-left p-5 rounded-xl border border-white/10 hover:border-blue-500/40 bg-white/5 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,123,255,0.15)] transition-all duration-300 group flex items-start justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="text-gray-200 group-hover:text-white transition-colors text-sm md:text-base pr-4">
                    {opt.text}
                  </p>
                </div>
                <div className="h-6 w-6 rounded-md border border-white/20 group-hover:border-blue-500 flex items-center justify-center transition-all bg-black/40">
                  <ArrowRight className="h-3 w-3 text-transparent group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                </div>
              </button>
            ))}
          </div>

          {/* Security note footer */}
          <div className="flex justify-between font-mono text-[9px] text-gray-600 mt-8 border-t border-white/5 pt-4">
            <span>SISTEMA DE DIAGNÓSTICO: LACiF v5.2</span>
            <span>CRIPTO-SOMA ATIVA</span>
          </div>
        </div>
      ) : (
        /* Results Section */
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-white/10 max-w-4xl mx-auto shadow-2xl animated-fade-in text-white">
          <div className="text-center pb-6 border-b border-white/10 mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 mb-4 animate-bounce">
              <Compass className="h-8 w-8" />
            </div>
            <h3 className="font-mono text-xs text-yellow-400 font-bold uppercase tracking-widest">
              RESULTADO DO MAPEAMENTO VOCACIONAL DE CARREIRA
            </h3>
            <h2 className="font-display text-2xl md:text-4xl text-white font-bold mt-2">
              Sua Área de Perfeita Sinergia é:
            </h2>
            <p className="text-xl md:text-2xl text-blue-400 font-medium font-display mt-2">
              {finalResult?.title}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Image & Main stats */}
            <div className="md:col-span-5 space-y-4">
              <div className="relative group rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img 
                  src={finalResult?.image || null} 
                  alt={finalResult?.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 bg-blue-600/90 px-3 py-1 text-xs font-mono font-medium rounded-md uppercase tracking-wider">
                  PERÍCIA CRIMINAL
                </span>
              </div>
              
              {/* Profile Card */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                <h4 className="font-mono text-xs text-blue-400 uppercase tracking-widest font-bold mb-1">
                  MÉTRICA INVESTIGATIVA
                </h4>
                <p className="text-xs text-gray-300 font-sans leading-relaxed">
                  {finalResult?.profile}
                </p>
              </div>
            </div>

            {/* In depth summary details */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="font-display text-lg text-white font-semibold mb-2">
                  Visão Geral do Seu Perfil
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {finalResult?.description}
                </p>
              </div>

              <div>
                <h4 className="font-display text-sm text-yellow-400 font-semibold mb-3 tracking-widest uppercase">
                  DURAÇÃO / HABILIDADES ESSENCIAIS A DESENVOLVER:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {finalResult?.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md text-gray-200 flex items-center gap-1.5"
                    >
                      <Check className="h-3.5 w-4 text-green-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-display text-sm text-blue-400 font-semibold mb-2 tracking-widest uppercase">
                  VOCÊ SABIA? (Curiosidades Históricas)
                </h4>
                <ul className="space-y-2">
                  {finalResult?.curiosities.map((item, key) => (
                    <li key={key} className="text-xs text-gray-300 leading-relaxed bg-white/5 p-2.5 rounded border border-white/10">
                      💡 {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-yellow-500/5 border border-yellow-400/10 p-4 rounded-xl">
                <span className="text-xs text-yellow-400 font-bold font-mono tracking-wider block mb-1">
                  DIAGNÓSTICO ACADÊMICO:
                </span>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {finalResult?.explanation}
                </p>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-10 pt-6 border-t border-white/5">
            <button
              onClick={initTest}
              className="px-6 py-2.5 bg-yellow-400 text-black rounded-xl font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              RECOMEÇAR TESTE VOCACIONAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
