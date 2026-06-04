import React, { useState, useEffect } from 'react';
import { HelpCircle, RefreshCw, Trophy, CheckCircle, XCircle, ArrowRight, BookOpen, ExternalLink, User, Award, Calendar } from 'lucide-react';
import { QuizQuestion, ExternalQuizLink } from '../types.ts';
import { isSupabaseEnabled, supabase, saveQuizResult } from '../lib/supabase.ts';

interface ForensicQuizProps {
  questions: QuizQuestion[];
  externalQuizzes: ExternalQuizLink[];
  content?: any;
  onUpdateContent?: (updated: any) => Promise<void>;
  currentUser?: any;
}

export default function ForensicQuiz({ questions, externalQuizzes, content, onUpdateContent, currentUser }: ForensicQuizProps) {
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ question: string; isCorrect: boolean }[]>([]);
  
  // Tab control and submit states
  const [activeTab, setActiveTab] = useState<'quiz' | 'leaderboard'>('quiz');
  const [playerCohortName, setPlayerCohortName] = useState('');
  const [submittedScore, setSubmittedScore] = useState(false);

  // Sync player name with currentUser if available
  useEffect(() => {
    if (currentUser) {
      setPlayerCohortName(currentUser.displayName || currentUser.email?.split('@')[0] || '');
    }
  }, [currentUser]);

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
    setSubmittedScore(false);
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

  const handleNext = async () => {
    if (currentIndex + 1 < shuffledQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
      
      // Save result securely in Supabase if authenticated
      if (isSupabaseEnabled && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const user = session.user;
            const displayName = user.user_metadata?.display_name || user.user_metadata?.displayName || user.email?.split('@')[0] || 'Perito Acadêmico';
            await saveQuizResult(
              user.id,
              user.email || '',
              displayName,
              score,
              shuffledQuestions.length,
              score * 10
            );
            console.log('[LACiF BACKEND] Highscore saved successfully to Supabase DB!');
          }
        } catch (error) {
          console.warn('[LACiF BACKEND] Could not submit score to Supabase:', error);
        }
      }
    }
  };

  const handleSubmitQuizRanking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerCohortName.trim()) {
      alert("Por favor, insira o seu nome ou patente/cargo.");
      return;
    }

    // Determine honor class
    let cl = "Auxiliar Técnico";
    if (score === 10) cl = "Perito Geral Sênior";
    else if (score >= 8) cl = "Perito Auxiliar";
    else if (score >= 6) cl = "Analista de Local";
    else if (score >= 4) cl = "Investigador Jr.";
    else cl = "Estudante Forense";

    const newRecord = {
      name: playerCohortName.trim(),
      score: score,
      totalQuestions: shuffledQuestions.length,
      date: new Date().toLocaleDateString('pt-BR'),
      classification: cl,
      email: currentUser?.email || ''
    };

    const oldRankings = content?.quizRankings || [];
    const updatedRankings = [newRecord, ...oldRankings]
      .sort((a, b) => b.score - a.score)
      .slice(0, 50); // Keep top 50

    if (onUpdateContent && content) {
      try {
        await onUpdateContent({
          ...content,
          quizRankings: updatedRankings
        });
        setSubmittedScore(true);
        setActiveTab('leaderboard');
      } catch (err) {
        console.error("Falha ao registrar pontuação no ranking geral:", err);
        alert("Ocorreu um erro ao salvar o resultado no banco.");
      }
    } else {
      // Offline fallback state update locally inside session
      alert("Armazenamento local atualizado. Conecte ao banco para consolidar na nuvem!");
      setSubmittedScore(true);
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
  const quizLeaderboard = content?.quizRankings || [];

  return (
    <div className="w-full">
      {/* Visual Navigation Tabs */}
      <div className="flex justify-center border-b border-white/10 mb-8 max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'quiz' 
              ? 'border-blue-500 text-blue-400' 
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          <HelpCircle className="h-4 w-4" /> Simulado Investigativo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'leaderboard' 
              ? 'border-yellow-500 text-yellow-500' 
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          <Trophy className="h-4 w-4 text-yellow-500" /> Quadro de Honra UFF
        </button>
      </div>

      {activeTab === 'leaderboard' ? (
        /* ================= LEADERBOARD TAB VIEW ================= */
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-yellow-500/20 max-w-3xl mx-auto text-white shadow-2xl animate-fade-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500 mb-3 animate-pulse">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="font-mono text-xs text-yellow-500 font-bold uppercase tracking-widest">
              LIVRO DE ATAS DA CONGREGAÇÃO
            </h3>
            <h2 className="font-display text-2xl font-extrabold mt-1">
              Quadro de Recordistas do Simulado
            </h2>
            <p className="text-gray-400 text-xs mt-1.5 max-w-md mx-auto">
              Peritos acadêmicos licenciados e graduados que obtiveram a maior taxa de acerto no menor número de tentativas sob protocolo criminal.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#050505]/45">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="bg-zinc-950 text-gray-400 uppercase tracking-wider text-[9px] border-b border-white/5">
                  <th className="p-3.5 pl-4 text-center w-12 font-bold">Pos</th>
                  <th className="p-3.5">Nome do Perito</th>
                  <th className="p-3.5 text-center">Acertos</th>
                  <th className="p-3.5 text-center">Taxa</th>
                  <th className="p-3.5 text-center">Data</th>
                  <th className="p-3.5 pr-4 text-right">Patente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {quizLeaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-zinc-500 italic">
                      Nenhum resultado registrado ainda. Faça o quiz e envie seu nome para a congregação!
                    </td>
                  </tr>
                ) : (
                  quizLeaderboard.map((rk: any, ridx: number) => {
                    let badgeColor = "bg-zinc-800 text-gray-400 border-zinc-700/50";
                    let rowColor = "hover:bg-white/[0.02]";

                    if (ridx === 0) {
                      badgeColor = "bg-yellow-400/20 text-yellow-400 border-yellow-400/30 font-black";
                      rowColor = "bg-yellow-400/[0.01] hover:bg-yellow-400/[0.03]";
                    } else if (ridx === 1) {
                      badgeColor = "bg-slate-300/20 text-slate-300 border-slate-300/30";
                    } else if (ridx === 2) {
                      badgeColor = "bg-amber-750/20 text-amber-500 border-amber-700/30";
                    }

                    return (
                      <tr key={ridx} className={`transition-colors ${rowColor}`}>
                        <td className="p-3.5 pl-4 text-center">
                          <span className={`inline-block px-1.5 py-0.5 rounded border text-[9px] ${badgeColor}`}>
                            {ridx + 1}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold font-sans text-gray-200">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate max-w-[170px]" title={rk.name}>{rk.name}</span>
                            {rk.email && (
                              <span className="text-[8px] bg-blue-500/10 text-blue-400 font-mono px-1 rounded uppercase tracking-tighter" title="Usuário Logado">
                                Autenticado
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3.5 text-center text-gray-300 font-bold">{rk.score} / 10</td>
                        <td className="p-3.5 text-center text-yellow-500 font-bold">{(rk.score / (rk.totalQuestions || 10)) * 100}%</td>
                        <td className="p-3.5 text-center text-gray-400 text-[10px]">{rk.date}</td>
                        <td className="p-3.5 pr-4 text-right text-blue-400 font-sans text-[11px] font-medium">{rk.classification || "Perito Militar"}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : !completed ? (
        /* ================= QUIZ IN ACTION VIEW ================= */
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-blue-500/20 max-w-3xl mx-auto shadow-2xl">
          
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
                  <span className="flex-1 text-white">{opt}</span>
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
        /* ================= QUIZ COMPLETED DETAILED SUMMARY ================= */
        <div className="glassmorphism p-6 md:p-10 rounded-2xl border border-white/10 max-w-3xl mx-auto shadow-2xl text-white animate-fade-in">
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
                : "Aproveitamento limítrofe. Excelente oportunidade para revisar a Biblioteca Criminal da LACiF!"}
            </p>
          </div>

          {/* New Register Ranking Module inside ForensicQuiz completed view */}
          {!submittedScore ? (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/30 to-zinc-900/30 border border-blue-500/20 mb-8 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-mono text-xs text-yellow-500 uppercase tracking-widest font-bold">Registrar Laudo no Quadro de Honra</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                Grave seus acertos na ata nacional do simulador acadêmico. Insira seu nome ou patente desejada:
              </p>
              <form onSubmit={handleSubmitQuizRanking} className="flex flex-col sm:flex-row gap-2.5">
                <input 
                  type="text"
                  value={playerCohortName}
                  onChange={(e) => setPlayerCohortName(e.target.value)}
                  maxLength={25}
                  required
                  placeholder="Nome / Patente (ex: Perito Torres)"
                  className="flex-1 p-2.5 bg-zinc-950 border border-white/10 rounded-lg text-xs font-mono text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-mono text-xs font-bold uppercase rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow"
                >
                  Gravar Pontuação <ArrowRight className="h-3 w-3" />
                </button>
              </form>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/10 mb-8 text-center">
              <p className="text-xs text-emerald-400 font-mono font-bold">✓ Pontuação gravada com sucesso no Quadro de Honra da UFF!</p>
            </div>
          )}

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

          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('leaderboard')}
              className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-mono font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Trophy className="h-4 w-4" /> VER QUADRO GERAL
            </button>
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
