import React, { useState, useEffect } from 'react';
import { HelpCircle, RefreshCw, Trophy, CheckCircle, XCircle, ArrowRight, BookOpen, ExternalLink } from 'lucide-react';
import { QuizQuestion, ExternalQuizLink } from '../types.ts';

interface ForensicQuizProps {
  questions: QuizQuestion[];
  externalQuizzes: ExternalQuizLink[];
}

export default function ForensicQuiz({ questions, externalQuizzes }: ForensicQuizProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ question: string; isCorrect: boolean }[]>([]);

  // Shuffle questions on load
  useEffect(() => {
    initQuiz();
  }, [questions]);

  const initQuiz = () => {
    const arrayCopy = [...questions];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    // Limit to 10 questions
    setShuffledQuestions(arrayCopy.slice(0, 10));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setCompleted(false);
    setAnswersLog([]);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const currentQ = shuffledQuestions[currentIndex];
    const isCorrect = selectedOption === currentQ.correctAnswerIndex;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setAnswersLog((prev) => [
      ...prev,
      { question: currentQ.question, isCorrect }
    ]);

    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="text-center font-mono text-gray-400 py-12">
        <RefreshCw className="animate-spin h-8 w-8 mx-auto mb-4 text-blue-500" />
        Carregando cenário pericial...
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex];
  const progressPercent = Math.round(((currentIndex) / shuffledQuestions.length) * 100);

  return (
    <div className="w-full">
      {!completed ? (
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-blue-500/20 max-w-3xl mx-auto">
          
          {/* Header Stats */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-mono text-xs text-blue-400 font-bold tracking-wider uppercase flex items-center gap-1">
              <HelpCircle className="h-3.5 w-3.5" /> SIMULADOR CRIMINALÍSTICA UFF
            </span>
            <span className="font-mono text-xs text-yellow-500 font-bold px-2 py-1 rounded bg-yellow-400/10 border border-yellow-400/20">
              Questão {currentIndex + 1} de {shuffledQuestions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#111] h-1.5 rounded-full mb-8 overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Case Scenario text */}
          <div className="mb-6 bg-white/5 border border-white/10 p-4 rounded-xl">
            <span className="font-mono text-[9px] text-blue-400 block mb-1 uppercase tracking-widest">
              Caso / Cenário Técnico:
            </span>
            <p className="font-display text-base md:text-lg text-white font-medium leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Core options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, oIdx) => {
              let btnClass = 'border-white/5 bg-white/5 hover:bg-white/10';
              
              if (selectedOption === oIdx && !isAnswered) {
                btnClass = 'border-blue-500 bg-blue-950/20 shadow-[0_0_10px_rgba(0,123,255,0.2)] text-blue-300';
              } else if (isAnswered) {
                if (oIdx === currentQ.correctAnswerIndex) {
                  btnClass = 'border-green-500 bg-green-950/20 text-green-300';
                } else if (selectedOption === oIdx) {
                  btnClass = 'border-red-500 bg-red-950/20 text-red-300';
                } else {
                  btnClass = 'border-white/5 bg-white/5 text-gray-500 cursor-not-allowed';
                }
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 text-sm md:text-base flex items-start gap-3 ${btnClass}`}
                >
                  <span className="font-mono text-xs text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span className="flex-1">{opt}</span>
                  {isAnswered && oIdx === currentQ.correctAnswerIndex && (
                    <CheckCircle className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                  )}
                  {isAnswered && selectedOption === oIdx && oIdx !== currentQ.correctAnswerIndex && (
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 animated-fade-in text-gray-300">
              <span className="font-mono text-[9px] text-yellow-400 tracking-wider font-bold block mb-1 uppercase">
                PARECER DO PERITO CIENTÍFICO:
              </span>
              <p className="text-xs md:text-sm leading-relaxed font-sans">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/5">
            <span className="font-mono text-[9px] text-gray-600 uppercase">
              Score atual: {score}/{currentIndex + (isAnswered ? 1 : 0)} acertos
            </span>

            {!isAnswered ? (
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                  selectedOption !== null 
                    ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_10px_rgba(0,123,255,0.2)]' 
                    : 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                CONFIRMAR VESTÍGIO
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                Próximo Caso <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Finished Summary */
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-white/10 max-w-3xl mx-auto shadow-2xl text-white">
          <div className="text-center pb-6 border-b border-white/10 mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 mb-4 animate-pulse">
              <Trophy className="h-8 w-8" />
            </div>
            <h3 className="font-mono text-xs text-blue-400 font-bold uppercase tracking-widest">
              DIAGNÓSTICO ACADÊMICO CONCLUÍDO
            </h3>
            <h2 className="font-display text-3xl font-extrabold mt-1">
              Laudo de Aproveitamento
            </h2>
            <div className="mt-4 inline-block bg-white/5 px-6 py-2 rounded-xl border border-white/10 font-mono text-xl">
              Taxa de Acerto: <span className="text-yellow-400 font-bold">{score * 10}%</span> ({score} de 10)
            </div>
            <p className="text-gray-400 mt-3 text-sm max-w-md mx-auto">
              {score >= 8
                ? "Incrível! Excelente discernimento e rigor metodológico pericial de nível profissional."
                : score >= 5
                ? "Bom trabalho. Possui conceitos básicos sólidos, mas requer aprofundamento nos protocolos."
                : "Aproveitamento limítrofe. Excelente oportunidade para revisar a Biblioteca Criminal da LACIF!"}
            </p>
          </div>

          <div className="space-y-3 mb-8">
            <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold">
              Registro das Tentativas do Laudo:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {answersLog.map((log, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg text-xs"
                >
                  <span className="text-gray-300 font-sans truncate max-w-[200px]" title={log.question}>
                    Caso 0{index + 1}: {log.question}
                  </span>
                  {log.isCorrect ? (
                    <span className="text-green-400 font-bold font-mono bg-green-500/5 px-2 py-0.5 rounded border border-green-500/10">CORRETO</span>
                  ) : (
                    <span className="text-red-400 font-bold font-mono bg-red-500/5 px-2 py-0.5 rounded border border-red-500/10">INCORRETO</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Section: Outros Quizzes de Perícia */}
          {externalQuizzes.length > 0 && (
            <div className="border-t border-white/10 pt-6 mt-6">
              <h4 className="font-display text-sm text-yellow-400 tracking-wider font-semibold mb-3 uppercase flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" /> Outros Quizzes de Perícia Recomendados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {externalQuizzes.map((q) => (
                  <a
                    key={q.id}
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h5 className="font-sans font-medium text-white text-xs hover:text-blue-400 flex items-center gap-1.5">
                        {q.title} <ExternalLink className="h-3 w-3 inline text-gray-400" />
                      </h5>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        {q.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
            <button
              onClick={initQuiz}
              className="px-6 py-2.5 bg-yellow-400 text-black font-mono font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-yellow-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              TENTAR NOVAMENTE (NOVO CASO)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
