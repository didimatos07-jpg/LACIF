import React, { useState, useEffect } from 'react';
import { 
  Dna, 
  Fingerprint, 
  Award, 
  Trophy, 
  CheckCircle, 
  RotateCcw, 
  User, 
  Check, 
  Sparkles,
  Play,
  ChevronRight,
  Eye,
  Beaker,
  Crosshair,
  Search,
  FileText,
  AlertCircle,
  Video,
  FileDown,
  Activity,
  Flame
} from 'lucide-react';
import { SiteContent, EscapeRoomConfig, EscapeRoomRoom, EscapeRoomRanking } from '../types.ts';

// 50 Educational Forensic Trivia Facts (Portuguese)
const FORENSIC_CURIOSITIES = [
  "O primeiro caso documentado de medicina forense ocorreu na China no século XIII, solucionado através do comportamento de moscas atraídas por vestígios invisíveis de sangue em uma foice.",
  "Estudos mostram que gêmeos idênticos compartilham o exato mesmo DNA, mas possuem impressões digitais diferentes devido aos movimentos uterinos e pressão do líquido amniótico.",
  "A dactiloscopia (perícia por digitais) foi trazida para o Brasil em 1903 pelo pioneiro perito criminal José Félix Alves de Sousa.",
  "Diferente do que mostram nos seriados como CSI, os exames toxicológicos ou testes de DNA podem demorar semanas para serem totalmente processados.",
  "A temperatura corporal pós-morte (algor mortis) decai aproximadamente 1 a 1,5 grau Celsius por hora nas primeiras doze horas.",
  "A entomologia forense estuda o ciclo de vida dos insetos encontrados em cadáveres para estimar o Intervalo Pós-Morte (IPM) exato.",
  "O Luminol é uma substância química que brilha azul-luminescente quando entra em contato com o ferro contido na hemoglobina do sangue humano.",
  "O padrão das estrias longitudinais na lateral de um projétil disparado funciona como a assinatura dactiloscópica única de cada cano de arma.",
  "Documentoscopia estuda se o papel ou tinta foram adulterados fisicamente através de exames microscópicos em incidência espectral oblíqua.",
  "A saliva ou suor deixados em uma bituca de cigarro ou copo de plástico contém epitélios suficientes para gerar um perfil genético completo.",
  "As manchas de sangue em formato de gotas perfeitamente redondas indicam queda em ângulo reto (90 graus) em relação ao solo plano.",
  "As digitais latentes invisíveis a olho nu são formadas por compostos expelidos pelas glândulas sudoríparas, compostas de 99% de água e 1% de óleos biológicos.",
  "A primeira autópsia conhecida na história foi realizada em Júlio César em 44 a.C., revelando que de 23 facadas sofridas, apenas uma foi letal.",
  "A balística de efeitos ou balística terminada analisa a trajetória espacial de projéteis e ferimentos causados ao impactar o alvo flácido.",
  "Em odontologia forense, dentes são excelentes arquivos de evidência por suportarem calor de até 1000°C e não degradarem facilmente na terra.",
  "A 'Cadeia de Custódia' é regulamentada estritamente no Brasil pelo Pacote Anticrime (Lei 13.964/2019), garantindo idoneidade probatória.",
  "Drogas apreendidas passam obrigatoriamente por dois testes: um laudo preliminar de constatação e um laudo definitivo de cromatografia gasosa.",
  "A espectrometria de massas quebra moléculas de substâncias tóxicas em fragmentos iônicos, agindo como uma 'balança de pesagem elementar'.",
  "Vestígios cibernéticos deletados de discos rígidos em computadores podem ser reconstruídos através de análise hexadecimal bit-a-bit de blocos de alocação.",
  "O cianoacrilato (fórmula básica do Super Bonder) volatiza com calor e umidade, fixando-se de forma branca e estável nas gorduras das digitais.",
  "Insetos necrofagos colonizam restos mortais de acordo com uma sucessão ecológica calculável sob condições climatológicas registradas por sensores.",
  "O sulfato de cobre ou reagente cobaltoso reage com cocaína e seus alcaloides produzindo precipitados de tom esmeralda ou azul cobalto.",
  "Os fios de cabelo humano possuem padrões cuticulares que diferenciam amostras humanas de penugens e pelos de mamíferos selvagens.",
  "Marcas de frenagem no asfalto permitem calcular a velocidade mínima vetorial do veículo no instante imediato anterior à rota de colisão rígida.",
  "O sangue seco de crime mantém marcadores de DNA integras por décadas caso seja conservado ao abrigo de luz ultravioleta e umidade extrema.",
  "Em antropologia legal, as suturas cranianas e a inclinação da sínfise púbica bacia indicam com precisão o gênero biológico e idade estimada do esqueleto.",
  "A combustão de acelerantes inflamáveis como gasolina de postos deixa assinaturas gasosas residuais mesmo após queima intensa e água de resfriamento.",
  "Laudos grafotécnicos utilizam leis físicas de dinâmica de punho, analisando pressão de escrita, paradas bruscas, linhas de orientação e calibre de letra.",
  "O termo 'Forense' vem do latim 'Forensis', significando público, em referência aos debates judiciais no fórum romano clássico.",
  "Poligrafoscopia analisa variações de frequência cardíaca, sudorese palmar e respiração simpática, mas no Brasil possui baixa soberania como prova pericial.",
  "Veneno por arsênico bloqueia o ciclo respiratório mitocondrial celular e se acumula na queratina das unhas e cabelos do indivíduo por anos.",
  "O teste de Reagente de Kastle-Meyer usa fenolftaleína para dar cor rosa brilhante instantânea em contato com enzimas peroxidases do sangue.",
  "Eletroforese capilar separa moléculas de DNA carregadas negativamente ao fazê-las migrar por canais microscópicos sob tensão elétrica mensurada.",
  "A balística interna analisa o deslocamento de gases, pressão da câmara do percussor e iniciação das estrias no interior de canos de metal.",
  "O microscópio comparador estala duas imagens ao mesmo patamar central permitindo sobrepor perfeitamente marcas de agulha percutora de cápsulas.",
  "A química verde forense desenvolve solventes analíticos biodegradáveis e reagentes à base de pigmentos alimentares atóxicos.",
  "Pegadas de calçados deixadas na areia ou lama são moldadas através de aplicação técnica de gesso ou ceras de baixa retração térmica.",
  "A antropologia biológica calcula estatura corporal multiplicando o comprimento de ossos longos isolados (fêmur e úmero) por constantes matemáticas.",
  "Maus tratos à fauna silvestre e tráfico ilegal de animais exóticos são investigados pericialmente através de testes de metagenômica ambiental de fezes.",
  "Incêndios de origem elétrica exibem pérolas de fusão microscópicas nos condutores de cobre que se distinguem das causadas pelo calor externo.",
  "Pólenes microscópicos de flores grudados em roupas de um suspeito podem indicar a sua passagem recente por ecossistemas florestais restritos.",
  "Vidros temperados quebram em formato de mosaico de pequenos cubos diletos, enquanto vidros comuns exibem fraturas radiais tangenciais concêntricas.",
  "A espectroscopia Raman irradia laser sobre substâncias químicas sem destruí-las, ideal para interrogar vestígios de explosivos lacrados em sacos plásticos.",
  "Marcas de mordidas na pele humana podem conter DNA de contato nas adjacências celulares além de padrões de espaçamento dentário calculados em 3D.",
  "Morte por monóxido de carbono (CO) confere ao sangue de cadáveres uma coloração vermelho de cereja extremamente brilhante e atípica.",
  "O método de rádio-carbono C-14 é empregado em arqueologia forense para datar tecidos velhos, dentes fósseis ou sedimentos de séculos passados.",
  "Um laudo pericial falso ou intencionalmente corrompido tipifica crime de falsa perícia segundo o Código Penal Brasileiro, punível com prisão.",
  "Impressões de orelhas deixadas ao escutar portas em cenas de furtos residenciais possuem características dactilares únicas chamadas otoscopia.",
  "Microvestígios têxteis de nylon, poliéster ou algodão ligam com precisão as vestes do autor do crime com as fibras recolhidas no veículo de fuga.",
  "A documentografia holográfica moderna adiciona películas plásticas micro-gravadas a laser que impedem e desmascaram duplicações por scanners digitais fotolitográficos."
];

interface ForensicEscapeRoomProps {
  content: SiteContent;
  onUpdateContent?: (updated: SiteContent) => Promise<void> | void;
}

export default function ForensicEscapeRoom({ content, onUpdateContent }: ForensicEscapeRoomProps) {
  // Merge game configuration safely. All content was loaded from Firebase or cache dynamically!
  const config: EscapeRoomConfig = content.escapeRoomConfig || {
    introText: "Durante uma visita ao Laboratório Central de Ciências Forenses da LACIF UFF, o sistema de segurança eletrônica de biossegurança entrou em alerta crítico e bloqueou todas as saídas integradas...",
    pointsPerCorrect: 200,
    pointsPerIncorrect: -50,
    pointsPerRoom: 500,
    pointsPerGame: 2000,
    achievements: [],
    cases: [
      {
        id: "caso-lacif-01",
        title: "Caso de Invasão de Alto Risco",
        story: "Um intruso invadiu o setor de reagentes biológicos...",
        finalCulpritIndex: 1,
        culpritOptions: ["Suspeito A", "Suspeito B", "Suspeito C", "Suspeito D"]
      }
    ],
    rooms: []
  };

  const initialRankings: EscapeRoomRanking[] = content.escapeRoomRankings || [];

  // Filter and sort rooms properly by order (dynamic database-backed routing)
  const activeRooms = (config.rooms || [])
    .filter(r => r.isActive !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  
  const roomsToPlay = activeRooms.length > 0 ? activeRooms : (config.rooms || []);

  // Game States
  const [gameState, setGameState] = useState<'welcome' | 'playing' | 'completed'>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [currentRoomIndex, setCurrentRoomIndex] = useState<number>(0); 
  const [showAbortConfirm, setShowAbortConfirm] = useState<boolean>(false);
  
  // Quiz states
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerEvaluated, setAnswerEvaluated] = useState<boolean>(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Scoring/Analytics states
  const [firstAttemptFlag, setFirstAttemptFlag] = useState<boolean>(true);
  const [correctFirstAttemptsCount, setCorrectFirstAttemptsCount] = useState<number>(0);
  const [curiosityText, setCuriosityText] = useState<string>('');

  // Interactive mini-game variables (for default layout visual enhancements)
  const [dnaHighlightedBand, setDnaHighlightedBand] = useState<number | null>(null);
  const [fingerprintZoomed, setFingerprintZoomed] = useState<boolean>(false);
  const [hoveredMinutiae, setHoveredMinutiae] = useState<string | null>(null);
  const [microscopeAlignment, setMicroscopeAlignment] = useState<number>(50);
  const [chemSolutionColor, setChemSolutionColor] = useState<string>("text-yellow-400 bg-yellow-400/20");
  const [chemTestActive, setChemTestActive] = useState<boolean>(false);
  const [uvLightActive, setUvLightActive] = useState<boolean>(false);
  const [magnifierOn, setMagnifierOn] = useState<boolean>(false);
  const [entomologySlider, setEntomologySlider] = useState<number>(10);
  const [activeToxicologyPeak, setActiveToxicologyPeak] = useState<number | null>(null);
  const [pelvicAngle, setPelvicAngle] = useState<number>(90);

  // Tab control in Welcome Screen
  const [activeEscapeTab, setActiveEscapeTab] = useState<'mission' | 'leaderboard'>('mission');

  // Custom states for "Fixação de Lívores" and "Marcas de Mordida"
  const [livorOriginalPos, setLivorOriginalPos] = useState<'dorsal' | 'ventral'>('ventral'); 
  const [livorCurrentExamPos, setLivorCurrentExamPos] = useState<'dorsal' | 'ventral'>('dorsal');
  const [livorHours, setLivorHours] = useState<number>(12);
  const [biteSuspect, setBiteSuspect] = useState<'A' | 'B' | 'C'>('A');
  const [biteRotation, setBiteRotation] = useState<number>(35);
  const [biteScannerActive, setBiteScannerActive] = useState<boolean>(false);

  // Rankings and Local Cache
  const [leaderboard, setLeaderboard] = useState<EscapeRoomRanking[]>(() => {
    try {
      const offlineData = localStorage.getItem('lacif_offline_rankings');
      if (offlineData) {
        const parsed = JSON.parse(offlineData);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return initialRankings;
  });

  useEffect(() => {
    if (initialRankings && initialRankings.length > 0) {
      setLeaderboard(initialRankings);
      try {
        localStorage.setItem('lacif_offline_rankings', JSON.stringify(initialRankings));
      } catch (_) {}
    }
  }, [initialRankings]);

  // Sound generator helpers
  const playSound = (freq: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine', duration = 0.1) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // Audio context might be blocked or un-instantiated, ignore silently
    }
  };

  // Randomized curiosities on room progression
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * FORENSIC_CURIOSITIES.length);
    setCuriosityText(FORENSIC_CURIOSITIES[randomIndex]);
  }, [currentRoomIndex, gameState]);

  // Start game handler
  const handleStartMission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;

    setCurrentScore(0);
    setCurrentRoomIndex(0);
    setCorrectFirstAttemptsCount(0);
    setFirstAttemptFlag(true);
    setGameState('playing');

    // Reset sub-interactive variables
    setSelectedOption(null);
    setAnswerEvaluated(false);
    setFeedbackMsg(null);
    setUvLightActive(false);
    setMagnifierOn(false);
    setChemTestActive(false);
    setEntomologySlider(10);
    setActiveToxicologyPeak(null);
    setPelvicAngle(90);

    // Reset Custom interactive states
    setLivorOriginalPos('ventral');
    setLivorCurrentExamPos('dorsal');
    setLivorHours(12);
    setBiteSuspect('A');
    setBiteRotation(35);
    setBiteScannerActive(false);

    // Dynamic stats update: increment accesses in database!
    if (onUpdateContent) {
      const currentStats = config.stats || {
        totalAccesses: 0,
        totalCompleted: 0,
        totalCorrectAttempts: 0,
        totalAttempts: 0
      };
      const updatedConfig = {
        ...config,
        stats: {
          ...currentStats,
          totalAccesses: (currentStats.totalAccesses || 0) + 1
        }
      };
      onUpdateContent({
        ...content,
        escapeRoomConfig: updatedConfig
      });
    }

    playSound(600, 'sine', 0.2);
    setTimeout(() => playSound(800, 'triangle', 0.4), 180);
  };

  // Check answer logic with exactly requested Portuguese outputs
  const handleCheckAnswer = () => {
    if (selectedOption === null || answerEvaluated) return;

    const currentRoom = roomsToPlay[currentRoomIndex];
    const isCorrect = selectedOption === currentRoom.correctAnswerIndex;
    setIsAnswerCorrect(isCorrect);
    setAnswerEvaluated(true);

    if (isCorrect) {
      setFeedbackMsg("Resposta correta.");
      playSound(880, 'sine', 0.3);
      setCurrentScore(prev => prev + (config.pointsPerCorrect || 200));

      if (firstAttemptFlag) {
        setCorrectFirstAttemptsCount(prev => prev + 1);
      }
    } else {
      setFeedbackMsg("Resposta incorreta. Tente novamente.");
      playSound(220, 'square', 0.5);
      setCurrentScore(prev => Math.max(0, prev + (config.pointsPerIncorrect || -50)));
      setFirstAttemptFlag(false); // marked as incorrect once
    }
  };

  // Try again without hard blockage (lets player select another option)
  const handleTryAgain = () => {
    setSelectedOption(null);
    setAnswerEvaluated(false);
    setFeedbackMsg(null);
    playSound(450, 'sine', 0.15);
  };

  // Advance Room logic with exactly titled "Próxima Investigação" button release
  const handleNextRoom = () => {
    const nextIndex = currentRoomIndex + 1;
    setCurrentScore(prev => prev + (config.pointsPerRoom || 500));

    if (nextIndex >= roomsToPlay.length) {
      // Completed last room! Sort record, write to leaderboard & sync Firebase stats
      handleGameCompleted();
    } else {
      setCurrentRoomIndex(nextIndex);
      setSelectedOption(null);
      setAnswerEvaluated(false);
      setFeedbackMsg(null);
      setFirstAttemptFlag(true); // reset first attempt flag for next room
      
      // Reset variables
      setUvLightActive(false);
      setMagnifierOn(false);
      setChemTestActive(false);
      setMicroscopeAlignment(50);
      setEntomologySlider(10);
      setActiveToxicologyPeak(null);
      setPelvicAngle(90);

      // Reset Custom interactive states
      setLivorOriginalPos('ventral');
      setLivorCurrentExamPos('dorsal');
      setLivorHours(12);
      setBiteSuspect('A');
      setBiteRotation(35);
      setBiteScannerActive(false);

      playSound(450, 'triangle', 0.2);
    }
  };

  const handleGameCompleted = () => {
    setGameState('completed');
    playSound(1000, 'sine', 0.4);
    setTimeout(() => playSound(1200, 'triangle', 0.5), 150);

    const cl = getClassification(currentScore).title;
    const newRecord: EscapeRoomRanking = {
      name: playerName || "Candidato Anônimo",
      score: currentScore,
      time: "--:--", // Free play, no timer!
      date: new Date().toLocaleDateString('pt-BR'),
      classification: cl
    };

    const cleanRankings = [...leaderboard, newRecord]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(cleanRankings);

    // Increment completed count, correct tries and attempts inside database dynamically!
    if (onUpdateContent) {
      const currentStats = config.stats || {
        totalAccesses: 1,
        totalCompleted: 0,
        totalCorrectAttempts: 0,
        totalAttempts: 0
      };

      const updatedStats = {
        totalAccesses: currentStats.totalAccesses || 1,
        totalCompleted: (currentStats.totalCompleted || 0) + 1,
        totalCorrectAttempts: (currentStats.totalCorrectAttempts || 0) + (firstAttemptFlag ? correctFirstAttemptsCount + 1 : correctFirstAttemptsCount),
        totalAttempts: (currentStats.totalAttempts || 0) + roomsToPlay.length
      };

      onUpdateContent({
        ...content,
        escapeRoomRankings: cleanRankings,
        escapeRoomConfig: {
          ...config,
          stats: updatedStats
        }
      });
    }
  };

  const getClassification = (scoreValue: number) => {
    if (scoreValue >= roomsToPlay.length * 600) return { title: "Mestre das Ciências Forenses", color: "text-[#FFD000] border-[#FFD000]" };
    if (scoreValue >= roomsToPlay.length * 400) return { title: "Perito Criminal Sênior", color: "text-red-400 border-red-500/30" };
    if (scoreValue >= roomsToPlay.length * 250) return { title: "Perito Criminal Adjunto", color: "text-blue-400 border-blue-500/30" };
    return { title: "Agente Técnico de Custódia", color: "text-gray-400 border-gray-500/30" };
  };

  const renderMedia = (url?: string, type?: 'image' | 'video' | 'pdf') => {
    if (!url) return null;

    if (type === 'video' || url.includes('youtube.com') || url.includes('youtu.be')) {
      // Embed video beautifully
      let embedUrl = url;
      if (url.includes('youtube.com/watch?v=')) {
        embedUrl = url.replace('watch?v=', 'embed/');
      } else if (url.includes('youtu.be/')) {
        embedUrl = url.replace('youtu.be/', 'youtube.com/embed/');
      }
      return (
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg bg-black/40 mt-4">
          <iframe 
            src={embedUrl} 
            title="Video Tutorial PerICIAL" 
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>
      );
    }

    if (type === 'pdf') {
      return (
        <div className="mt-4 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400 animate-pulse" />
            <div>
              <strong className="text-white block font-sans">Documento Técnico Relevante</strong>
              <span className="text-gray-400 text-[10px]">Laudo de evidência ou diretrizes de contenção</span>
            </div>
          </div>
          <a 
            href={url} 
            target="_blank" 
            referrerPolicy="no-referrer" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-400 text-white px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all cursor-pointer"
          >
            <FileDown className="h-3.5 w-3.5" /> VISUALIZAR PDF
          </a>
        </div>
      );
    }

    // Default: Image
    return (
      <div className="mt-4 border border-white/10 rounded-xl overflow-hidden bg-black/45 shadow group">
        <img 
          src={url} 
          alt="Evidência Científica" 
          referrerPolicy="no-referrer"
          className="w-full max-h-64 object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
    );
  };

  const currentRoom = roomsToPlay[currentRoomIndex];

  return (
    <div id="escape-room-board" className="w-full bg-[#081421] rounded-3xl border border-blue-500/20 shadow-2xl p-4 md:p-8 relative overflow-hidden select-none">
      
      {/* Absolute futuristic confirmation modal overlay */}
      {showAbortConfirm && (
        <div id="abort-confirm-overlay" className="absolute inset-0 bg-[#030712]/95 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="p-6 rounded-2xl bg-[#090d16] border-2 border-red-500/40 max-w-sm w-full space-y-4 shadow-[0_0_30px_rgba(239,68,68,0.25)] text-center font-mono">
            <div className="mx-auto h-12 w-12 rounded-full bg-red-500/10 border border-red-500 flex items-center justify-center text-red-500 animate-pulse">
              <AlertCircle className="h-6 w-6" />
            </div>
            
            <div className="space-y-1">
              <h4 className="text-white text-xs font-black uppercase text-red-500 tracking-wider">CONFIRMAR ABORTAMENTO</h4>
              <p className="text-gray-400 text-[11px] font-sans leading-relaxed">
                Atenção Perito Criminal: Deseja de fato abortar a perícia neste laboratório e recomeçar a missão do absoluto zero? Todo o progresso recente nesta seção de testes será permanentemente apagado da memória.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                id="btn-confirm-abort-active"
                onClick={() => {
                  setGameState('welcome');
                  setPlayerName('');
                  setCurrentScore(0);
                  setCurrentRoomIndex(0);
                  setSelectedOption(null);
                  setAnswerEvaluated(false);
                  setIsAnswerCorrect(false);
                  setFeedbackMsg(null);
                  setFirstAttemptFlag(true);
                  setCorrectFirstAttemptsCount(0);
                  setShowAbortConfirm(false);
                }}
                className="py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-[10px] uppercase transition cursor-pointer"
              >
                SIM, ABORTAR
              </button>
              <button
                type="button"
                id="btn-cancel-abort"
                onClick={() => setShowAbortConfirm(false)}
                className="py-2.5 bg-[#172554] hover:bg-blue-900 border border-blue-500/20 text-gray-300 rounded-xl font-bold text-[10px] uppercase transition cursor-pointer"
              >
                VOLTAR AO CASO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Absolute futuristic background overlays */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FFD000]/5 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================== WELCOME SCREEN ========================================== */}
      {gameState === 'welcome' && (
        <div className="relative z-10 max-w-3xl mx-auto py-10 space-y-8 animate-fade-in text-center">
          
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full text-xs font-mono text-blue-400 uppercase tracking-widest block w-fit mx-auto animate-fade-in">
            <Sparkles className="h-4 w-4 text-[#FFD000] animate-pulse" /> ESCAPE ROOM PERICIAL — LACIF UFF
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-black text-3xl md:text-5xl text-white uppercase tracking-tight leading-tight">
              Escape Room <span className="text-[#FFD000]">Forense</span>
              <span className="block text-lg font-mono text-blue-400 mt-2 font-normal lowercase tracking-wide">
                "Do vestígio à evidência"
              </span>
            </h3>
            <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed max-w-xl mx-auto">
              {config.introText || "Assuma a posição de perito e resolva os desafios científicos reais da criminalística clássica. Analise amostras de DNA, impressões digitais latentes, calibre de projéteis e testes de reação química para fundamentar as evidências no inquérito civil."}
            </p>
          </div>

          {/* Visual Navigation Tabs */}
          <div className="flex justify-center border-b border-white/10 mb-8 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => { setActiveEscapeTab('mission'); playSound(380, 'sine', 0.1); }}
              className={`flex-1 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
                activeEscapeTab === 'mission' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              🚪 Iniciar Missão
            </button>
            <button
              type="button"
              onClick={() => { setActiveEscapeTab('leaderboard'); playSound(500, 'sine', 0.1); }}
              className={`flex-1 py-3 text-center font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 border-b-2 flex items-center justify-center gap-2 cursor-pointer ${
                activeEscapeTab === 'leaderboard' 
                  ? 'border-yellow-500 text-yellow-500' 
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              <Trophy className="h-4 w-4 text-yellow-500" /> Quadro de Honra UFF
            </button>
          </div>

          {activeEscapeTab === 'mission' ? (
            <div className="space-y-8 animate-fade-in w-full">
              <form onSubmit={handleStartMission} className="glassmorphism border border-blue-500/35 p-6 rounded-2xl max-w-md mx-auto space-y-6 text-left relative shadow-inner">
                <div className="absolute top-2 right-2 flex gap-1 font-mono text-[9px] text-blue-400">
                  <span>[READY_TO_INVESTIGATE]</span>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-[#FFD000] uppercase tracking-wider">Identificação do Perito (Nome):</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3.5 h-4 w-4 text-blue-400" />
                    <input 
                      type="text" 
                      value={playerName} 
                      onChange={(e) => setPlayerName(e.target.value)} 
                      placeholder="Seu nome ou iniciais para o inquérito..." 
                      maxLength={40}
                      className="w-full pl-9 pr-4 py-3 bg-[#050505]/85 border border-blue-500/30 rounded-xl font-mono text-white text-xs focus:outline-none focus:border-[#FFD000] transition-colors"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FFD000] hover:bg-yellow-400 text-black font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-yellow-400/20 hover:scale-[1.01]"
                >
                  🔬 INICIAR PERÍCIA <Play className="h-4 w-4 fill-black" />
                </button>
              </form>

              {/* Quick Summary Preview */}
              <div className="max-w-md mx-auto pt-4 border-t border-blue-500/10">
                <div className="bg-[#050505]/50 border border-white/5 rounded-xl p-3.5 flex justify-between items-center text-[10px] font-mono text-gray-500">
                  <span>MOMENTO DO INQUÉRITO: ACTIVE</span>
                  <span className="text-blue-400">{roomsToPlay.length} ESTAÇÕES CIENTÍFICAS</span>
                </div>
              </div>
            </div>
          ) : (
            /* ================= LEADERBOARD VIEW JUST LIKE THE QUIZ ================= */
            <div className="glassmorphism p-6 md:p-8 rounded-2xl border border-yellow-500/20 max-w-3xl mx-auto text-white shadow-2xl animate-fade-in w-full">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-500 mb-2">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-mono text-xs text-yellow-500 font-bold uppercase tracking-widest">
                  CONSELHO DE MINISTROS E CONGREGAÇÃO
                </h3>
                <h2 className="font-display text-xl font-extrabold mt-1">
                  Quadro de Recordistas do Escape Room
                </h2>
                <p className="text-gray-400 text-xs mt-1 max-w-md mx-auto">
                  Peritos que desvendaram todos os vestígios da LACIF UFF com máxima precisão e obtiveram o maior saldo de XP acumulado.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#050505]/45">
                <table className="w-full text-left border-collapse font-mono text-xs">
                  <thead>
                    <tr className="bg-zinc-950 text-gray-400 uppercase tracking-wider text-[9px] border-b border-white/5">
                      <th className="p-3 w-12 font-bold text-center">Pos</th>
                      <th className="p-3">Nome do Perito</th>
                      <th className="p-3 text-center">Pontuação</th>
                      <th className="p-3 text-center">Tempo</th>
                      <th className="p-3 text-center">Data</th>
                      <th className="p-3 text-right pr-4">Patente / Classificação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leaderboard.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-zinc-500 italic">
                          Nenhum recorde registrado ainda. Conclua os desafios e envie seu nome para a congregação!
                        </td>
                      </tr>
                    ) : (
                      [...leaderboard].sort((a,b) => b.score - a.score).map((lead, i) => {
                        let badgeColor = "bg-zinc-800 text-gray-400 border-zinc-700/50";
                        let rowColor = "hover:bg-white/[0.02]";

                        if (i === 0) {
                          badgeColor = "bg-yellow-400/20 text-yellow-400 border-yellow-400/30 font-black";
                          rowColor = "bg-yellow-400/[0.01] hover:bg-yellow-400/[0.03]";
                        } else if (i === 1) {
                          badgeColor = "bg-slate-300/20 text-slate-300 border-slate-300/30";
                        } else if (i === 2) {
                          badgeColor = "bg-amber-700/20 text-amber-500 border-amber-500/30";
                        }

                        return (
                          <tr key={i} className={`transition-colors text-[10px] ${rowColor}`}>
                            <td className="p-3 text-center">
                              <span className={`inline-block px-1.5 py-0.5 rounded border text-[9px] ${badgeColor}`}>
                                {i + 1}
                              </span>
                            </td>
                            <td className="p-3 font-bold font-sans text-gray-200">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate max-w-[150px]" title={lead.name}>{lead.name}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center text-[#FFD000] font-black">{lead.score} XP</td>
                            <td className="p-3 text-center text-gray-400 font-mono text-[9px]">{lead.time || "--:--"}</td>
                            <td className="p-3 text-center text-gray-400 text-[9px]">{lead.date || "03/06/2026"}</td>
                            <td className="p-3 text-right pr-4 text-blue-400 font-bold uppercase text-[9px]">{lead.classification || "Perito"}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================== ACTIVE PLAYING GAMEPLAY ========================================== */}
      {gameState === 'playing' && currentRoom && (
        <div className="relative z-10 space-y-6 md:space-y-8 animate-fade-in text-white">
          
          {/* HORIZONTAL PROGRESS BAR HUD AND LAB COUNTER */}
          <div className="space-y-2 bg-[#050505]/65 border border-blue-500/15 p-4 rounded-2xl backdrop-blur">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#FFD000]">
                <Award className="h-4 w-4" />
                <span>CASO EM ANÁLISE: {currentRoom.theme || "Laboratório Especializado"}</span>
              </div>
              <strong className="text-blue-400 text-sm">
                Questão {currentRoomIndex + 1} de {roomsToPlay.length}
              </strong>
            </div>
            
            {/* Smooth dynamic progress bar fill */}
            <div className="w-full bg-zinc-900 h-2.5 rounded-full overflow-hidden border border-white/5">
              <div 
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-[#FFD000] h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(30,144,255,0.5)]"
                style={{ width: `${((currentRoomIndex) / roomsToPlay.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-950/20 border-y border-blue-500/10 py-4 font-mono text-xs text-gray-300">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <User className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[9px] text-gray-500 uppercase tracking-widest block">PERITO CRIMINAL</span>
                <strong className="text-white text-xs uppercase">{playerName}</strong>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-[#FFD000]" />
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block">XP CONQUISTADO</span>
                  <strong className="text-emerald-400 font-extrabold">{currentScore} XP</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAbortConfirm(true);
                }}
                className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/35 px-3 py-1.5 rounded-lg text-red-400 hover:text-red-300 font-mono text-[10px] uppercase font-bold cursor-pointer transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> ABORTAR MISSAO
              </button>
            </div>
          </div>

          {/* ACTIVE ASSIGNMENT COMBINATORY SCREEN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT COLUMN: THE CASE DIRECTIVE (PASTA DO INQUÉRITO) */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 rounded-2xl bg-zinc-950/75 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                  <span className="text-[9px] font-mono text-[#FFD000] uppercase tracking-wider block">PASTA DO INQUÉRITO CRIMINAL</span>
                  {currentRoom.difficulty && (
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      currentRoom.difficulty === 'Fácil' ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25' :
                      currentRoom.difficulty === 'Médio' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' :
                      'bg-red-500/15 text-red-400 border border-red-500/25'
                    }`}>
                      {currentRoom.difficulty}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="font-display font-black text-xl text-white uppercase tracking-tight">
                    {currentRoom.challengeTitle}
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm font-sans leading-relaxed">
                    {currentRoom.challengeDesc}
                  </p>
                </div>

                {/* VESTÍGIOS ENCONTRADOS SECTION (MANDATORY REQUIREMENT) */}
                <div className="p-3 bg-blue-500/5 border border-blue-500/15 rounded-xl space-y-2">
                  <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest block font-bold border-b border-blue-500/10 pb-1">🔍 VESTÍGIOS RECOLHIDOS NO LOCAL</span>
                  <p className="text-gray-200 text-xs font-sans italic leading-relaxed">
                    {currentRoom.vestigios || "Vestígios estruturais, resíduos analíticos recolhidos com swab de algodão e preservados sob cadeia de custódia ininterrupta."}
                  </p>
                </div>

                {renderMedia(currentRoom.mediaUrl, currentRoom.mediaType)}
              </div>

              {/* CURIOUS CORNER EDUCATIONAL CONTAINER (DYNAMICS) */}
              <div className="p-4 rounded-xl border border-[#FFD000]/10 bg-[#FFD000]/5 text-xs text-gray-300 font-sans italic relative leading-relaxed shadow-inner">
                <span className="not-italic text-[9px] text-[#FFD000] font-mono block mb-1 uppercase font-black">CURIO-CURVE CRIMINALÍSTICA:</span>
                "{currentRoom.curiosity || curiosityText}"
              </div>

            </div>

            {/* RIGHT COLUMN: INTERACTIVE VISUAL CANVAS & VERIFICATION PROCESS */}
            <div className="lg:col-span-6 space-y-6">

              {/* INTERACTIVE WIDGET DESIGNS (Only triggered if ID or theme matches default list) */}
              {(currentRoom.id === 'room-dna' || currentRoom.theme?.toLowerCase().includes('genética') || currentRoom.theme?.toLowerCase().includes('dna')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 text-center space-y-4">
                  <span className="text-[9px] font-mono text-cyan-400 block tracking-wider uppercase font-bold">PROVA 01: ELETROFORESE DE ALINHAMENTO DE DNA (MICROEMISSOR EM GEL)</span>
                  <div className="bg-black/85 rounded-xl p-4 border border-blue-500/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none" />
                    <div className="grid grid-cols-5 gap-3 h-52 font-mono text-[9px] text-gray-500">
                      {[
                        { title: "Amostra", color: "bg-blue-400 shadow-blue-400/50", bands: [2, 4, 7, 9] },
                        { title: "Susp A", color: "bg-purple-500 shadow-purple-500/30", bands: [3, 4, 6, 8] },
                        { title: "Susp B", color: "bg-[#FFD000] shadow-yellow-400/50", bands: [2, 4, 7, 9] },
                        { title: "Susp C", color: "bg-rose-500 shadow-rose-500/30", bands: [1, 5, 7, 10] },
                        { title: "Susp D", color: "bg-emerald-500 shadow-emerald-500/30", bands: [2, 3, 8, 9] }
                      ].map((lane, i) => (
                        <div key={i} className="flex flex-col items-center justify-between border-r border-white/5 last:border-none">
                          <span className={`${i === 0 ? 'text-blue-400 font-bold' : i === 2 ? 'text-[#FFD000] font-bold' : 'text-gray-400'}`}>{lane.title}</span>
                          <div className="w-full relative flex-1 bg-zinc-900 rounded-lg mx-1 mt-2 mb-1 flex flex-col justify-around py-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((bNum) => {
                              const active = lane.bands.includes(bNum);
                              const isCurHighlight = dnaHighlightedBand === bNum;
                              return (
                                <div 
                                  key={bNum} 
                                  onClick={() => setDnaHighlightedBand(isCurHighlight ? null : bNum)}
                                  className={`h-2.5 mx-1.5 rounded transition-all cursor-pointer ${
                                    active 
                                      ? `${lane.color} shadow-[0_0_8px] opacity-100 scale-105` 
                                      : 'bg-zinc-950 opacity-15'
                                  } ${isCurHighlight ? 'ring-2 ring-white scale-125' : ''}`}
                                />
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 italic">Dica Interativa: Toque nos fragmentos de restrição (bandas) para marcar referências horizontais de alinhamento com a amostra coletada.</p>
                </div>
              )}

              {(currentRoom.id === 'room-papilo' || currentRoom.theme?.toLowerCase().includes('digital') || currentRoom.theme?.toLowerCase().includes('papilo')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA 02: INSPECTOR DIGITAL DE MINÚCIAS PAPILOSCÓPICAS</span>
                    <button 
                      type="button"
                      onClick={() => setFingerprintZoomed(!fingerprintZoomed)}
                      className="px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[#FFD000] rounded text-[8px] hover:bg-blue-500/20 transition-all uppercase font-bold"
                    >
                      {fingerprintZoomed ? "Lente: Zoom 2.5x" : "Lente: Zoom 1.0x"}
                    </button>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-center bg-black/65 p-4 rounded-xl border border-white/5">
                    <div className="relative h-44 w-44 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                      <Fingerprint className={`h-36 w-36 text-cyan-400 opacity-60 transition-transform duration-500 ${fingerprintZoomed ? 'scale-150 rotate-6' : 'scale-100'}`} />
                      
                      {/* Hoverable minutiae marks */}
                      <div className="absolute inset-0">
                        {[
                          { x: '45%', y: '30%', name: "Bifurcação Primária", color: "bg-red-500" },
                          { x: '60%', y: '45%', name: "Ilhota Glandular", color: "bg-emerald-500" },
                          { x: '35%', y: '55%', name: "Terminação de Sulco", color: "bg-amber-500" },
                          { x: '50%', y: '65%', name: "Laguna de Crista", color: "bg-indigo-500" }
                        ].map((pt, i) => (
                          <div 
                            key={i} 
                            style={{ left: pt.x, top: pt.y }}
                            onMouseEnter={() => setHoveredMinutiae(pt.name)}
                            onMouseLeave={() => setHoveredMinutiae(null)}
                            className={`absolute h-3 w-3 rounded-full cursor-help hover:scale-125 transition-transform ${pt.color} border border-white shadow-[0_0_6px_rgba(255,255,255,0.8)]`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 space-y-2 font-mono text-[10px] text-gray-300">
                      <span className="text-gray-500 text-[8px] uppercase block">MINÚCIA MAPILOSCÓPICA SELECIONADA:</span>
                      <div className="p-2.5 rounded-lg border border-white/5 bg-zinc-950 min-h-14 flex items-center">
                        {hoveredMinutiae ? (
                          <span className="text-[#FFD000] font-bold">🎯 {hoveredMinutiae} identificada com nexo estatístico.</span>
                        ) : (
                          <span className="text-gray-500 italic">Aproxime o mouse das marcações coloridas na digital para examinar as minúcias.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(currentRoom.id === 'room-balistica' || currentRoom.theme?.toLowerCase().includes('balística') || currentRoom.theme?.toLowerCase().includes('arma')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 text-center space-y-4">
                  <span className="text-[9px] font-mono text-cyan-400 block tracking-wider uppercase font-bold">PROVA 03: COMPARADOR DE RAIAMENTO BALÍSTICO (MICROSCOPIA ÓPTICA)</span>
                  <div className="bg-black/90 p-4 rounded-xl border border-white/5 relative">
                    <div className="flex justify-center items-center gap-1.5 mb-2.5">
                      <span className="text-[8px] font-mono text-gray-400">IMAGEM A (VESTÍGIO)</span>
                      <div className="w-10 h-0.5 bg-blue-500/30" />
                      <span className={`text-[9px] font-mono font-bold uppercase transition-all ${Math.abs(microscopeAlignment - 72) < 5 ? 'text-emerald-400 underline shadow-sm' : 'text-yellow-400'}`}>
                        {Math.abs(microscopeAlignment - 72) < 5 ? "✓ RAIAS ALINHADAS" : "✗ RAIAS DESALINHADAS"}
                      </span>
                      <div className="w-10 h-0.5 bg-blue-500/30" />
                      <span className="text-[8px] font-mono text-gray-400">IMAGEM B (COLEÇÃO)</span>
                    </div>

                    <div className="h-28 max-w-sm mx-auto bg-zinc-900 border border-white/10 rounded-lg relative overflow-hidden flex">
                      {/* Left side: bullet vestigio */}
                      <div className="w-1/2 h-full bg-indigo-950/20 border-r-2 border-red-500/80 relative flex flex-col justify-around py-1">
                        {[1, 2, 3, 4].map(idx => (
                          <div key={idx} className="h-2 bg-gradient-to-r from-gray-700 to-zinc-400/80 w-11/12 rounded-r" style={{ marginLeft: `${idx * 2}px` }} />
                        ))}
                        <span className="absolute bottom-1 left-2 text-[8px] font-mono text-gray-500">PROJÉTIL PAREDE</span>
                      </div>
                      
                      {/* Right side: standard bullet matching alignment */}
                      <div className="w-1/2 h-full bg-indigo-950/20 relative flex flex-col justify-around py-1">
                        <div className="absolute inset-0 transition-transform duration-100" style={{ transform: `translateY(${(microscopeAlignment - 72) * 1.5}px)` }}>
                          <div className="h-full flex flex-col justify-around py-0.5">
                            {[1, 2, 3, 4].map(idx => (
                              <div key={idx} className="h-2 bg-gradient-to-r from-zinc-400/80 to-gray-700 w-11/12 rounded-l" style={{ marginLeft: `${12 - idx * 2}px` }} />
                            ))}
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-2 text-[8px] font-mono text-gray-500">ARMA SUSPEITA</span>
                      </div>
                    </div>

                    <div className="mt-3.5 space-y-1.5 text-left font-mono text-[9px] text-gray-400">
                      <label className="flex justify-between">
                        <span>Lente: Ajuste micrométrico de foco:</span>
                        <strong className="text-[#FFD000]">{microscopeAlignment}%</strong>
                      </label>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={microscopeAlignment} 
                        onChange={(e) => setMicroscopeAlignment(Number(e.target.value))}
                        className="w-full accent-yellow-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {(currentRoom.id === 'room-quimica' || currentRoom.theme?.toLowerCase().includes('química') || currentRoom.theme?.toLowerCase().includes('constatação') || currentRoom.theme?.toLowerCase().includes('reativo')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <span className="text-[9px] font-mono text-cyan-400 block tracking-wider uppercase font-bold text-center">PROVA 04: TRILHA QUÍMICA — ANÁLISE DE COR EM TUBOS DE REAÇÃO COBALTOSA</span>
                  <div className="bg-black/75 p-5 rounded-xl border border-white/5 flex gap-4 justify-around items-center">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="h-24 w-6 rounded-b-xl border-3 border-t-0 border-white/40 bg-zinc-900 overflow-hidden relative flex items-end">
                        <div className="w-full h-8 bg-zinc-700/60 animate-pulse" />
                      </div>
                      <span className="font-mono text-[8px] text-gray-500"> Swab Branco </span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="h-24 w-6 rounded-b-xl border-3 border-t-0 border-white/40 bg-zinc-900 overflow-hidden relative flex items-end">
                        <div className={`w-full h-12 transition-all duration-1000 ${chemTestActive ? 'bg-blue-600 shadow-[0_0_12px_rgba(30,144,255,0.8)]' : 'bg-yellow-400/25'}`} />
                      </div>
                      <span className="font-mono text-[8px] text-gray-400"> Amostra B </span>
                    </div>

                    <div className="flex flex-col items-center gap-1.5">
                      <div className="h-24 w-6 rounded-b-xl border-3 border-t-0 border-white/40 bg-zinc-900 overflow-hidden relative flex items-end">
                        <div className="w-full h-12 bg-pink-500/50" />
                      </div>
                      <span className="font-mono text-[8px] text-gray-500"> Swab Acidulado </span>
                    </div>

                    <button 
                      type="button"
                      onClick={() => {
                        setChemTestActive(true);
                        playSound(350, 'triangle', 0.25);
                        setTimeout(() => playSound(650, 'sine', 0.1), 300);
                      }}
                      className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-[9px] uppercase tracking-wide rounded-xl transition-all cursor-pointer shadow border border-blue-500/30"
                      disabled={chemTestActive}
                    >
                      🧪 PINGAR REAGENTE
                    </button>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 text-center italic">Cocaína reage de forma imediata precipitando complexo quelato de azul-cobalto brilhante.</p>
                </div>
              )}

              {/* NEW MODULE: DOCUMENTOSCOPIA / ESCRITA / GRAFOTECNIA */}
              {(currentRoom.id === 'room-documentoscopia' || currentRoom.theme?.toLowerCase().includes('documentoscopia') || currentRoom.theme?.toLowerCase().includes('escrita') || currentRoom.theme?.toLowerCase().includes('grafotecnia') || currentRoom.theme?.toLowerCase().includes('moeda') || currentRoom.theme?.toLowerCase().includes('tinta')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA: ESPECTROSCOPIA E EXAME DE RELEVO GRAFOTÉCNICO</span>
                    <div className="flex gap-1.5">
                      <button 
                        type="button"
                        onClick={() => {
                          setUvLightActive(!uvLightActive);
                          playSound(450, 'sine', 0.1);
                        }}
                        className={`px-2 py-0.5 rounded text-[8px] transition uppercase font-bold border cursor-pointer ${uvLightActive ? 'bg-violet-600 border-violet-400 text-white shadow-[0_0_8px_rgba(139,92,246,0.6)]' : 'bg-zinc-900 border-white/15 text-gray-400'}`}
                      >
                        {uvLightActive ? "UV: 365nm Ativo" : "Espectro Visível"}
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setMagnifierOn(!magnifierOn);
                          playSound(520, 'sine', 0.1);
                        }}
                        className={`px-2 py-0.5 rounded text-[8px] transition uppercase font-bold border cursor-pointer ${magnifierOn ? 'bg-amber-600 border-amber-400 text-white shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-zinc-900 border-white/15 text-gray-400'}`}
                      >
                        {magnifierOn ? "Lente 8x Ativa" : "Sem Lente"}
                      </button>
                    </div>
                  </div>

                  <div className="relative h-44 bg-[#020617] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-center items-center p-4">
                    {/* Background spectral radiation glow */}
                    <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${uvLightActive ? 'bg-violet-950/45' : 'bg-black/25'}`} />
                    
                    {/* Simulated Document under spectrum examination */}
                    <div className={`relative z-10 w-full max-w-xs transition-all duration-300 p-3.5 rounded-lg border border-white/10 font-mono text-[9px] shadow-2xl ${uvLightActive ? 'bg-zinc-900/90' : 'bg-amber-50/5 text-gray-300'}`}>
                      <div className="flex justify-between items-center border-b border-white/5 pb-1">
                        <span className="text-gray-500 text-[7px] uppercase">Controle de Segurança Federal</span>
                        <span className="text-[#FFD000] font-black text-[8px]">★ DOCUMENTO DE CUSTÓDIA ★</span>
                      </div>
                      
                      <div className="space-y-1.5 py-1">
                        <p className="text-[9.5px]">"Declaro liberação de verbas correntes no montante de..."</p>
                        <div className="flex justify-between pt-1 font-mono">
                          <span className="text-gray-500 text-[8px]">VALOR ORIGINAL:</span>
                          <span className={`transition-all ${uvLightActive ? 'text-violet-400 font-extrabold line-through text-[10px]' : 'text-gray-300'}`}>
                            R$ 15.000,00 (Tinta de Sulfeto)
                          </span>
                        </div>
                        {uvLightActive && (
                          <div className="flex justify-between font-mono animate-pulse text-violet-300">
                            <span className="text-[8px]">SOBREPOSIÇÃO OCULTA:</span>
                            <span className="font-extrabold text-[10px] text-violet-400">R$ 95.000,00 [ALTERAÇÃO QUÍMICA DETECTADA]</span>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-white/5 pt-1.5 flex justify-between items-center">
                        <span className="text-[7.5px] text-gray-500">Sulcos do Punho:</span>
                        <span className={`text-[8.5px] font-sans transition-all ${magnifierOn ? 'text-amber-400 font-black scale-110 tracking-widest' : 'text-gray-400 italic'}`}>
                          {magnifierOn ? "✒ DEPOSIÇÃO TRASPASSO FORÇADO (FALSÁRIO)" : "Assinado: Dr. Cláudio R."}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 text-center italic">Dica Forense: Interaja com o espectro de iluminação ultravioleta e a lupa para evidenciar fraudes físicas ocultas na deposição de tintas ou no relevo do punho escritor.</p>
                </div>
              )}

              {/* NEW MODULE: ENTOMOLOGIA FORENSE */}
              {(currentRoom.id === 'room-entomologia' || currentRoom.theme?.toLowerCase().includes('entomologia') || currentRoom.theme?.toLowerCase().includes('inset') || currentRoom.theme?.toLowerCase().includes('larva') || currentRoom.theme?.toLowerCase().includes('morte') || currentRoom.theme?.toLowerCase().includes('ipm')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA: REGRESSÃO ETOLÓGICA LARVAL DO INTERVALO PÓS-MORTE (IPM)</span>
                    <span className="text-yellow-400 text-[10px] font-bold">TERMÔMETRO: {entomologySlider}°C</span>
                  </div>

                  <div className="bg-black/80 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-28 w-28 rounded-full border border-dashed border-cyan-500/30 flex flex-col items-center justify-center p-3 text-center bg-zinc-950 shadow-inner relative overflow-hidden shrink-0">
                      <div className="absolute inset-0 bg-cyan-400/[0.02] animate-pulse pointer-events-none" />
                      {entomologySlider < 15 ? (
                        <div className="space-y-1 animate-fade-in">
                          <span className="text-3xl block">🪺</span>
                          <strong className="text-[9px] font-mono text-yellow-400 block leading-tight uppercase font-black">Ovos Estáveis</strong>
                          <span className="text-[7.5px] text-gray-500 block">Eclosão: 12-24 horas</span>
                        </div>
                      ) : entomologySlider < 25 ? (
                        <div className="space-y-1 animate-fade-in">
                          <span className="text-3xl block">🐛</span>
                          <strong className="text-[9.5px] font-mono text-cyan-400 block leading-tight uppercase font-black">Larva Célula</strong>
                          <span className="text-[7.5px] text-gray-400 block">Estágio: 1º e 2º Ínstar</span>
                        </div>
                      ) : entomologySlider < 32 ? (
                        <div className="space-y-1 animate-fade-in">
                          <span className="text-3xl block">🪱</span>
                          <strong className="text-[10px] font-mono text-amber-500 block leading-tight uppercase font-black">3º Ínstar Ativo</strong>
                          <span className="text-[7.5px] text-gray-400 block">Atividade pré-pupal</span>
                        </div>
                      ) : (
                        <div className="space-y-1 animate-fade-in">
                          <span className="text-3xl block">🪰</span>
                          <strong className="text-[10px] font-mono text-red-400 block leading-tight uppercase font-black">Mosca Varejeira</strong>
                          <span className="text-[7.5px] text-red-500 block font-bold">Ciclo Turbinado</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2 text-left font-mono text-[9px] text-gray-300">
                      <span className="text-gray-500 text-[8px] uppercase block">IMPACTO CLIMATOLÓGICO DA SCENA NO BIOCICLO:</span>
                      <p className="text-[10px] font-sans text-gray-300 leading-normal">
                        {entomologySlider < 15 ? (
                          "O clima frio retarda o metabolismo larval e a postura de ovos pela mosca varejeira (Calliphoridae), ampliando o intervalo técnico estimado do cadáver."
                        ) : entomologySlider < 25 ? (
                          "Temperatura regulada favorável. Os insetos colonizam em ondas biológicas previsíveis baseadas no índice linear de Graus-Dia Acumulados."
                        ) : (
                          "O calor excessivo dispara taxas aceleradas de eclosão larval e pupação forçada, reduzindo artificialmente a amostragem de tempo de óbito."
                        )}
                      </p>
                      
                      <div className="pt-1.5 space-y-1">
                        <div className="flex justify-between font-mono text-[8px] text-gray-400">
                          <span>Influenciar temperatura do biotopo:</span>
                          <strong>{entomologySlider}°C</strong>
                        </div>
                        <input 
                          type="range" 
                          min="8" 
                          max="38" 
                          value={entomologySlider} 
                          onChange={(e) => {
                            setEntomologySlider(Number(e.target.value));
                            if (Number(e.target.value) % 5 === 0) {
                              playSound(300 + Number(e.target.value) * 8, 'triangle', 0.05);
                            }
                          }}
                          className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW MODULE: COMPUTAÇÃO FORENSE */}
              {(currentRoom.id === 'room-computacao' || currentRoom.theme?.toLowerCase().includes('computação') || currentRoom.theme?.toLowerCase().includes('tecnologia') || currentRoom.theme?.toLowerCase().includes('dispositivo') || currentRoom.theme?.toLowerCase().includes('celular') || currentRoom.theme?.toLowerCase().includes('cyber') || currentRoom.theme?.toLowerCase().includes('hex') || currentRoom.theme?.toLowerCase().includes('hd') || currentRoom.theme?.toLowerCase().includes('arquivo')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA: RECUPERAÇÃO DE CABEÇALHOS HEXADECIMAIS DE DISCO</span>
                    <span className="text-emerald-400 text-[8px] animate-pulse font-bold">● EXTRAÇÃO DE DADOS ATIVA</span>
                  </div>

                  <div className="bg-black border border-white/5 rounded-xl p-3.5 font-mono text-[9px] text-gray-400 space-y-3.5 shadow-inner">
                    <div className="grid grid-cols-4 gap-2 text-center text-[8px] text-gray-500 border-b border-white/5 pb-1 uppercase font-bold">
                      <span>SETOR HD</span>
                      <span>BUFFER BRUTO</span>
                      <span>ASSINATURA</span>
                      <span>DEXT</span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { sector: "Setor_0x4A", hex: "FF D8 FF E0 00 10 4A", type: "JFIF IMAGE", ext: ".jpeg", desc: "Foto armazenada comprovando o encontro secreto do fraudador com o cúmplice." },
                        { sector: "Setor_0x5F", hex: "25 50 44 46 2D 31 2E", type: "PDF DOCUMENT", ext: ".pdf", desc: "E-book descritivo de síntese química de toxinas de biossegurança furtado." },
                        { sector: "Setor_0x8E", hex: "7F 45 4C 46 01 01 01", type: "EXEC BINARY", ext: ".sh", desc: "Script de script que infectou o servidor de bloqueio eletromecânico do laboratório." }
                      ].map((item, idx) => (
                        <button 
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveToxicologyPeak(idx);
                            playSound(420 + idx * 80, 'sine', 0.08);
                          }}
                          className={`w-full grid grid-cols-4 gap-2 p-2.5 rounded border text-left cursor-pointer transition ${activeToxicologyPeak === idx ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-zinc-900/40 border-white/5 hover:bg-white/5'}`}
                        >
                          <span className="font-bold text-gray-300">{item.sector}</span>
                          <span className="text-[8px] tracking-tight">{item.hex}</span>
                          <span className="text-yellow-400 font-bold">{item.type}</span>
                          <span className="font-black text-white text-right">{item.ext}</span>
                        </button>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg border border-white/5 bg-[#020617] min-h-12 flex items-center font-sans text-xs text-center justify-center">
                      {activeToxicologyPeak !== null ? (
                        <p className="text-gray-200 leading-relaxed font-mono text-[10px]">
                          📂 <strong className="text-emerald-400 uppercase">[CONTEÚDO EXTRAÍDO]:</strong> {[
                            "Fotografia digital encontrada na lixeira do celular, registrando o laboratório de síntese de cocaína horas antes do flagrante.",
                            "Documento técnico criptografado contendo o laudo de controle de acesso fraudado e as transferências do dinheiro irregular.",
                            "Malware ativado via backdoor que forçou o bug nas travas eletrônicas e deu cobertura para a fuga do infectado."
                          ][activeToxicologyPeak]}
                        </p>
                      ) : (
                        <span className="text-gray-600 italic font-mono text-[8.5px]">Toque em um dos setores de disco rígido corrompidos acima para reconstruir os metadados do arquivo binário.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* NEW MODULE: ANTROPOLOGIA / ODONTOLOGIA FORENSE */}
              {(currentRoom.id === 'room-antropologia' || currentRoom.theme?.toLowerCase().includes('antropologia') || currentRoom.theme?.toLowerCase().includes('odontologia') || currentRoom.theme?.toLowerCase().includes('ossos') || currentRoom.theme?.toLowerCase().includes('esqueleto') || currentRoom.theme?.toLowerCase().includes('pelve') || currentRoom.theme?.toLowerCase().includes('bacia') || currentRoom.theme?.toLowerCase().includes('crânio')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA: CALIBRAÇÃO GONIOMÉTRICA PÉLVICA RECONSTRUTIVA (CRANIO/BACIA)</span>
                    <span className="text-yellow-400 font-bold">AFASTAMENTO: {pelvicAngle}°</span>
                  </div>

                  <div className="bg-black/80 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row gap-4 items-center">
                    <div className="h-28 w-28 rounded-lg bg-zinc-900 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
                      {/* Sub-pubic angle visual representation */}
                      <svg className="w-16 h-16 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.35)]" viewBox="0 0 100 100">
                        {/* Hip joints */}
                        <circle cx="20" cy="40" r="8" fill="currentColor" opacity="0.3" />
                        <circle cx="80" cy="40" r="8" fill="currentColor" opacity="0.3" />
                        {/* Pelvic girdle */}
                        <path d="M 20 40 Q 50 20 80 40 Q 75 75 50 85 Q 25 75 20 40" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        {/* Subpubic arch angle lines */}
                        <line x1="50" y1="65" x2={50 - Math.sin((pelvicAngle/2) * Math.PI / 180) * 20} y2={65 + Math.cos((pelvicAngle/2) * Math.PI / 180) * 20} stroke="#FFD000" strokeWidth="3" strokeLinecap="round" />
                        <line x1="50" y1="65" x2={50 + Math.sin((pelvicAngle/2) * Math.PI / 180) * 20} y2={65 + Math.cos((pelvicAngle/2) * Math.PI / 180) * 20} stroke="#FFD000" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="50" cy="65" r="3" fill="#FFD000" />
                      </svg>
                      
                      <div className="absolute bottom-1 text-[8.5px] font-mono text-[#FFD000] uppercase font-black animate-pulse">
                        {pelvicAngle < 88 ? "MACULINO (ESTREITA)" : "FEMININO (AMPLA)"}
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 text-left font-mono text-[9px] text-gray-300">
                      <span className="text-gray-500 text-[8px] uppercase block">DETERMINAÇÃO CRÍTICA DO BIOTIPO:</span>
                      <p className="text-[10px] font-sans text-gray-300 leading-normal">
                        {pelvicAngle < 88 ? (
                          "O ângulo subpúbico menor que 88° e sínfise em 'V' fechada indicam estreitamento característico da cintura pélvica biológica masculina."
                        ) : (
                          "O arco subpúbico obtuso maior que 90° e abertura ampla em 'U' indicam estrutura pélvica tipicamente feminina obstétrica."
                        )}
                      </p>

                      <div className="pt-1.5 space-y-1">
                        <div className="flex justify-between font-mono text-[8px] text-gray-400">
                          <span>Ajustar abertura do goniômetro:</span>
                          <strong>{pelvicAngle}°</strong>
                        </div>
                        <input 
                          type="range" 
                          min="65" 
                          max="115" 
                          value={pelvicAngle} 
                          onChange={(e) => {
                            setPelvicAngle(Number(e.target.value));
                            if (Number(e.target.value) % 5 === 0) {
                              playSound(180 + Number(e.target.value) * 3, 'sine', 0.04);
                            }
                          }}
                          className="w-full id-pelveaccent accent-[#FFD000] h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NEW MODULE: TOXICOLOGIA FORENSE */}
              {(currentRoom.id === 'room-toxicologia' || currentRoom.theme?.toLowerCase().includes('toxicologia') || currentRoom.theme?.toLowerCase().includes('veneno') || currentRoom.theme?.toLowerCase().includes('sangue') || currentRoom.theme?.toLowerCase().includes('drogas') || currentRoom.theme?.toLowerCase().includes('dosagem') || currentRoom.theme?.toLowerCase().includes('substância')) && (
                <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                  <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                    <span className="uppercase font-bold">PROVA: CROMATOGRAFIA ANALÍTICA DE ABSORÇÃO (GC-MS EXP)</span>
                    <span className="text-red-500 font-bold animate-pulse text-[8px]">● ESPECTRO ALIMENTADO</span>
                  </div>

                  <div className="bg-black/95 rounded-xl p-3.5 border border-white/5 space-y-3.5 shadow-inner font-mono text-[9px] text-gray-400">
                    {/* Simulated Chromatography chart */}
                    <div className="h-24 border-b border-l border-zinc-700/50 flex items-end justify-between px-4 relative pb-0.5">
                      <div className="absolute top-1 left-2 text-[7px] text-gray-600 font-bold">ABUNDÂNCIA SINAL</div>
                      <div className="absolute bottom-1 right-2 text-[7px] text-gray-600 font-bold">MINUTO RETENÇÃO</div>
                      
                      {[
                        { val: 12, h: 'h-6', id: 0, code: "Rt: 1.15min", chemical: "Álcool Metílico" },
                        { val: 40, h: 'h-14', id: 1, code: "Rt: 4.80min", chemical: "Anfetamina Pura" },
                        { val: 78, h: 'h-20', id: 2, code: "Rt: 8.55min", chemical: "Cianeto Potássio" }
                      ].map((item) => (
                        <div 
                          key={item.id}
                          className="flex flex-col items-center cursor-pointer group px-1"
                          onClick={() => {
                            setActiveToxicologyPeak(item.id);
                            playSound(330 + item.id * 150, 'sawtooth', 0.08);
                          }}
                        >
                          <span className={`text-[7.5px] transition-all opacity-80 group-hover:text-[#FFD000] font-bold ${activeToxicologyPeak === item.id ? 'text-[#FFD000]' : 'text-gray-500'}`}>{item.code}</span>
                          <div className={`w-4 bg-gradient-to-t transition-all ${activeToxicologyPeak === item.id ? 'from-[#FFD000] to-yellow-300 shadow-[0_0_12px_rgba(255,208,0,0.5)]' : 'from-indigo-600 to-indigo-400 opacity-60'} ${item.h} rounded-t`} />
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-lg border border-white/5 bg-[#020617] min-h-12 flex items-center font-sans text-xs">
                      {activeToxicologyPeak !== null ? (
                        <p className="text-gray-300 leading-relaxed font-mono text-[10px] text-left w-full">
                          🧪 <strong className="text-red-400 uppercase">[ISOLAMENTO MOLECULAR]:</strong> {[
                            "Metanol destilado - Derivado indolor muito empregado em adulteração de bebidas alcoólicas, destrói o nervo óptico.",
                            "Metanfetamina Estabilizada - Estimulante neurotransmissor de alta adicção física de circulação proibida.",
                            "Cianeto de Potássio (Sais de Prata) - Composto metalúrgico letal fatal, bloqueia respiração mitocondrial humana em segundos."
                          ][activeToxicologyPeak]}
                        </p>
                      ) : (
                        <span className="text-gray-600 italic font-mono text-[8.5px] text-center w-full">Toque nos picos do espectro de eluição gasosa acima para isolar substâncias e ver sua classificação forense.</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* NEW MODULE: SCANNER MICRO-FORENSE UNIVERSAL (FALLBACK PARA QUALQUER TEMA ADICIONAL/CUSTOMIZADO) */}
              {!(
                currentRoom.id === 'room-dna' || currentRoom.theme?.toLowerCase().includes('genética') || currentRoom.theme?.toLowerCase().includes('dna') ||
                currentRoom.id === 'room-papilo' || currentRoom.theme?.toLowerCase().includes('digital') || currentRoom.theme?.toLowerCase().includes('papilo') ||
                currentRoom.id === 'room-balistica' || currentRoom.theme?.toLowerCase().includes('balística') || currentRoom.theme?.toLowerCase().includes('arma') ||
                currentRoom.id === 'room-quimica' || currentRoom.theme?.toLowerCase().includes('química') || currentRoom.theme?.toLowerCase().includes('constatação') || currentRoom.theme?.toLowerCase().includes('reativo') ||
                currentRoom.id === 'room-documentoscopia' || currentRoom.theme?.toLowerCase().includes('documentoscopia') || currentRoom.theme?.toLowerCase().includes('escrita') || currentRoom.theme?.toLowerCase().includes('grafotecnia') || currentRoom.theme?.toLowerCase().includes('moeda') || currentRoom.theme?.toLowerCase().includes('tinta') ||
                currentRoom.id === 'room-entomologia' || currentRoom.theme?.toLowerCase().includes('entomologia') || currentRoom.theme?.toLowerCase().includes('inset') || currentRoom.theme?.toLowerCase().includes('larva') || currentRoom.theme?.toLowerCase().includes('morte') || currentRoom.theme?.toLowerCase().includes('ipm') ||
                currentRoom.id === 'room-computacao' || currentRoom.theme?.toLowerCase().includes('computação') || currentRoom.theme?.toLowerCase().includes('tecnologia') || currentRoom.theme?.toLowerCase().includes('dispositivo') || currentRoom.theme?.toLowerCase().includes('celular') || currentRoom.theme?.toLowerCase().includes('cyber') || currentRoom.theme?.toLowerCase().includes('hex') || currentRoom.theme?.toLowerCase().includes('hd') || currentRoom.theme?.toLowerCase().includes('arquivo') ||
                currentRoom.id === 'room-antropologia' || currentRoom.theme?.toLowerCase().includes('antropologia') || currentRoom.theme?.toLowerCase().includes('odontologia') || currentRoom.theme?.toLowerCase().includes('ossos') || currentRoom.theme?.toLowerCase().includes('esqueleto') || currentRoom.theme?.toLowerCase().includes('pelve') || currentRoom.theme?.toLowerCase().includes('bacia') || currentRoom.theme?.toLowerCase().includes('crânio') ||
                currentRoom.id === 'room-toxicologia' || currentRoom.theme?.toLowerCase().includes('toxicologia') || currentRoom.theme?.toLowerCase().includes('veneno') || currentRoom.theme?.toLowerCase().includes('sangue') || currentRoom.theme?.toLowerCase().includes('drogas') || currentRoom.theme?.toLowerCase().includes('dosagem') || currentRoom.theme?.toLowerCase().includes('substância')
              ) && (() => {
                const tName = (currentRoom.theme || "").toLowerCase();
                const qName = (currentRoom.question || "").toLowerCase();
                const titName = (currentRoom.challengeTitle || "").toLowerCase();
                
                const isLivores = tName.includes('livor') || tName.includes('lívores') || tName.includes('hipóstase') || tName.includes('necropsia') ||
                                  qName.includes('livor') || qName.includes('lívores') || qName.includes('hipóstase') ||
                                  titName.includes('livor') || titName.includes('lívores') || titName.includes('hipóstase') || titName.includes('necropsia') ||
                                  currentRoom.id === 'room-medicina';

                const isMordida = tName.includes('mordida') || tName.includes('mordidas') || tName.includes('arcada') || tName.includes('dentária') || tName.includes('odontologia') ||
                                  qName.includes('mordida') || qName.includes('mordidas') || qName.includes('arcada') || qName.includes('dentária') || qName.includes('odontologia') ||
                                  titName.includes('mordida') || titName.includes('mordidas') || titName.includes('arcada') || titName.includes('dentária') || titName.includes('odontologia') ||
                                  currentRoom.id === 'room-odontologia';

                const isBloodOrLuminol = !isLivores && !isMordida && (tName.includes('sangue') || tName.includes('luminol') || tName.includes('mancha') || tName.includes('hematologia') || tName.includes('manchas') ||
                                         qName.includes('sangue') || qName.includes('luminol') || qName.includes('mancha') || qName.includes('gotejamento') ||
                                         titName.includes('sangue') || titName.includes('luminol') || titName.includes('mancha'));

                const isTanatologia = !isLivores && (tName.includes('morte') || tName.includes('cronotanatologia') || tName.includes('resfriamento') || tName.includes('cadáver') || tName.includes('órbito') || tName.includes('horas') || tName.includes('tanatologia') ||
                                      qName.includes('morte') || qName.includes('cronotanatologia') || qName.includes('cadáver') || qName.includes('putrefação') ||
                                      titName.includes('morte') || titName.includes('cronotanatologia') || titName.includes('cadáver'));

                const isCenaOrFrenagem = tName.includes('local') || tName.includes('cena') || tName.includes('trânsito') || tName.includes('colisão') || tName.includes('impacto') || tName.includes('pista') || tName.includes('barricada') || tName.includes('frenagem') ||
                                         qName.includes('local') || qName.includes('cena') || qName.includes('trânsito') || qName.includes('veículo') ||
                                         titName.includes('local') || titName.includes('cena') || titName.includes('trânsito') || titName.includes('colisão');

                const isGasesOuPolvora = tName.includes('pólvora') || tName.includes('explosão') || tName.includes('resíduo') || tName.includes('chumbo') || tName.includes('gases') || tName.includes('fogo') || tName.includes('incêndio') ||
                                         qName.includes('pólvora') || qName.includes('disparo') || qName.includes('resíduo') || qName.includes('químicos') ||
                                         titName.includes('pólvora') || titName.includes('disparo') || titName.includes('resíduo');

                if (isLivores) {
                  const hasMismatch = livorOriginalPos !== livorCurrentExamPos && livorHours >= 8;
                  const isPartiallyMigrated = livorOriginalPos !== livorCurrentExamPos && livorHours < 8;

                  let anteriorOpacity = 0;
                  let posteriorOpacity = 0;

                  if (livorOriginalPos === 'ventral') {
                    anteriorOpacity = Math.min(1, livorHours / 12) * 0.8;
                    if (livorCurrentExamPos === 'dorsal') {
                      if (livorHours < 8) {
                        posteriorOpacity = Math.min(1, livorHours / 12) * 0.8 * (livorHours / 8);
                        anteriorOpacity = anteriorOpacity * (1 - (livorHours / 8));
                      }
                    }
                  } else {
                    posteriorOpacity = Math.min(1, livorHours / 12) * 0.8;
                    if (livorCurrentExamPos === 'ventral') {
                      if (livorHours < 8) {
                        anteriorOpacity = Math.min(1, livorHours / 12) * 0.8 * (livorHours / 8);
                        posteriorOpacity = posteriorOpacity * (1 - (livorHours / 8));
                      }
                    }
                  }

                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-rose-500/30 space-y-4 animate-fade-in text-slate-100">
                      <div className="flex items-center justify-between text-[9px] font-mono text-rose-400">
                        <span className="uppercase font-bold">🩺 INQUÉRITO DE HIPÓSTASE E FIXAÇÃO DE LÍVORES (REAL-TIME-LAB)</span>
                        <span className="text-yellow-400 font-bold uppercase text-[8px] animate-pulse">
                          {livorHours >= 8 ? "● LÍVORES FIXADOS (Morte > 8-12h)" : "○ LÍVORES MÓVEIS (Morte recente)"}
                        </span>
                      </div>

                      <div className="bg-black/90 rounded-xl p-4 border border-white/5 space-y-4">
                        
                        <div className="grid grid-cols-2 gap-4">
                          {/* Face Anterior / Ventral */}
                          <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-center flex flex-col items-center">
                            <span className="text-[8px] font-mono text-gray-500 uppercase block mb-2">Visão Ventral (Frente)</span>
                            <div className="relative w-16 h-28 bg-[#1e1a17] rounded-full flex flex-col items-center justify-center border border-orange-950/40 overflow-hidden shadow-inner shrink-0 scale-95">
                              {/* Stylized head, arms, torso */}
                              <div className="w-5 h-5 bg-[#3c322b] rounded-full mb-1 border border-orange-950/30 mt-1" />
                              <div className="w-10 h-14 bg-[#3c322b] rounded-xl relative flex justify-around">
                                <div className="w-2 h-10 bg-[#3c322b] rounded-full absolute -left-2 top-0 border border-orange-950/30" />
                                <div className="w-2 h-10 bg-[#3c322b] rounded-full absolute -right-2 top-0 border border-orange-950/30" />
                              </div>
                              <div className="w-8 h-8 flex justify-around gap-1 mt-1">
                                <div className="w-3 h-8 bg-[#3c322b] rounded-full border border-orange-950/30" />
                                <div className="w-3 h-8 bg-[#3c322b] rounded-full border border-orange-950/30" />
                              </div>

                              {/* Livores stain layer (Ventral) */}
                              <div 
                                className="absolute inset-0 bg-red-950/80 transition-all duration-300 pointer-events-none mix-blend-multiply flex flex-col justify-around py-4 opacity-70"
                                style={{ opacity: anteriorOpacity }}
                              >
                                <div className="h-4 bg-red-800 rounded-full blur-[4px] mx-2" />
                                <div className="h-6 bg-red-800 rounded-full blur-[6px] mx-1" />
                                <div className="h-8 bg-red-800 rounded-full blur-[8px] mx-2" />
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-gray-400 mt-2">
                              Mancha: <strong className="text-red-400">{(anteriorOpacity * 100).toFixed(0)}%</strong>
                            </span>
                          </div>

                          {/* Face Posterior / Dorsal */}
                          <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-center flex flex-col items-center">
                            <span className="text-[8px] font-mono text-gray-500 uppercase block mb-2">Visão Dorsal (Costas)</span>
                            <div className="relative w-16 h-28 bg-[#1e1a17] rounded-full flex flex-col items-center justify-center border border-orange-950/40 overflow-hidden shadow-inner shrink-0 scale-95">
                              <div className="w-5 h-5 bg-[#3c322b] rounded-full mb-1 border border-orange-950/30 mt-1" />
                              <div className="w-10 h-14 bg-[#352c26] rounded-xl relative flex justify-around">
                                <div className="w-2 h-10 bg-[#352c26] rounded-full absolute -left-2 top-0 border border-orange-950/30" />
                                <div className="w-2 h-10 bg-[#352c26] rounded-full absolute -right-2 top-0 border border-orange-950/30" />
                              </div>
                              <div className="w-8 h-8 flex justify-around gap-1 mt-1">
                                <div className="w-3 h-8 bg-[#352c26] rounded-full border border-orange-950/30" />
                                <div className="w-3 h-8 bg-[#352c26] rounded-full border border-orange-950/30" />
                              </div>

                              {/* Livores stain layer (Dorsal) */}
                              <div 
                                className="absolute inset-0 bg-red-950/80 transition-all duration-300 pointer-events-none mix-blend-multiply flex flex-col justify-around py-4 opacity-70"
                                style={{ opacity: posteriorOpacity }}
                              >
                                <div className="h-4 bg-red-800 rounded-full blur-[4px] mx-2" />
                                <div className="h-6 bg-red-800 rounded-full blur-[6px] mx-1" />
                                <div className="h-8 bg-red-800 rounded-full blur-[8px] mx-2" />
                              </div>
                            </div>
                            <span className="text-[9px] font-mono text-gray-400 mt-2">
                              Mancha: <strong className="text-purple-400">{(posteriorOpacity * 100).toFixed(0)}%</strong>
                            </span>
                          </div>
                        </div>

                        {/* Explanation and diagnostics block */}
                        <div className="bg-black/50 p-2.5 rounded-lg border border-white/5 space-y-1.5 text-left text-[9px] font-sans text-gray-300 leading-relaxed">
                          <strong className="text-[9.5px] font-mono uppercase text-rose-400 block font-bold">LAUDO TÉCNICO DE DIREÇÃO GRAVITACIONAL:</strong>
                          {hasMismatch ? (
                            <p className="text-[#ff6b6b]">
                              🚨 <strong>DESCONFORMIDADE DE GRAVIDADE DETECTADA!</strong> Os lívores se estabeleceram e fixaram solidamente na face <strong>{livorOriginalPos === 'ventral' ? "VENTRAL (Barriga/Peito)" : "DORSAL (Costas/Dorso)"}</strong> durante as primeiras 8-12 horas de morte. Como o cadáver foi encontrado em decúbito <strong>{livorCurrentExamPos === 'ventral' ? "VENTRAL" : "DORSAL (Costas deitadas)"}</strong>, há um alinhamento incompatível que <strong>prova manipulação e modificação da cena do crime horas após a morte</strong> (cadáver foi virado após fixação estável)!
                            </p>
                          ) : isPartiallyMigrated ? (
                            <p className="text-amber-400">
                              ⚠️ <strong>LIVORES MÓVEIS / MIGRATÓRIOS:</strong> Como a morte ocorreu há apenas {livorHours}h (menos de 8-12h), os livores ainda não se fixaram. Ao rotacionar o corpo, o sangue está em movimento gravitacional secundário e migrando para a face em contato direto com a maca.
                            </p>
                          ) : (
                            <p className="text-emerald-400">
                              🟢 <strong>CONGRUÊNCIA DE DECÚBITO GERAL:</strong> O posicionamento das manchas hipostáticas ({livorOriginalPos === 'ventral' ? "Ventral" : "Dorsal"}) corresponde de forma compatível e esperada com a gravidade de decúbito encontrada no local. Sem indícios de movimentação física do corpo pós-fixação.
                            </p>
                          )}
                        </div>

                        {/* Interactive adjustments and triggers */}
                        <div className="space-y-3 pt-2 border-t border-white/5">
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-[8px] text-gray-500 font-mono block uppercase">1. Decúbito de Morte</span>
                              <div className="flex gap-1 mt-1">
                                <button
                                  type="button"
                                  onClick={() => { setLivorOriginalPos('ventral'); playSound(250, 'sine', 0.1); }}
                                  className={`flex-1 py-1 text-[8px] font-mono font-bold uppercase rounded ${livorOriginalPos === 'ventral' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                  Ventral
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setLivorOriginalPos('dorsal'); playSound(250, 'sine', 0.1); }}
                                  className={`flex-1 py-1 text-[8px] font-mono font-bold uppercase rounded ${livorOriginalPos === 'dorsal' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                  Dorsal
                                </button>
                              </div>
                            </div>

                            <div>
                              <span className="text-[8px] text-gray-500 font-mono block uppercase">2. Decúbito de Exame</span>
                              <div className="flex gap-1 mt-1">
                                <button
                                  type="button"
                                  onClick={() => { setLivorCurrentExamPos('ventral'); playSound(350, 'triangle', 0.1); }}
                                  className={`flex-1 py-1 text-[8px] font-mono font-bold uppercase rounded ${livorCurrentExamPos === 'ventral' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                  Ventral
                                </button>
                                <button
                                  type="button"
                                  onClick={() => { setLivorCurrentExamPos('dorsal'); playSound(350, 'triangle', 0.1); }}
                                  className={`flex-1 py-1 text-[8px] font-mono font-bold uppercase rounded ${livorCurrentExamPos === 'dorsal' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-zinc-900 text-gray-400 border border-white/5'}`}
                                >
                                  Dorsal
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-[8px] text-gray-500 font-mono uppercase">
                              <span>Intervalo estimado pós-óbito:</span>
                              <strong className="text-white">{livorHours} horas decorridas</strong>
                            </div>
                            <input 
                              type="range" 
                              min="1" 
                              max="24" 
                              value={livorHours} 
                              onChange={(e) => {
                                setLivorHours(Number(e.target.value));
                                playSound(180 + Number(e.target.value) * 6, 'sine', 0.04);
                              }}
                              className="w-full accent-rose-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                            />
                          </div>

                        </div>

                      </div>
                    </div>
                  );
                }

                if (isMordida) {
                  const isSuspectB = biteSuspect === 'B';
                  const rotationDiff = Math.abs(biteRotation - 0);
                  
                  let alignmentScore = 0;
                  if (isSuspectB) {
                    alignmentScore = Math.max(12, Math.round(99.8 - (rotationDiff * 2.2)));
                  } else if (biteSuspect === 'A') {
                    alignmentScore = Math.round(42.1 - (Math.abs(biteRotation - 12) * 0.4));
                  } else {
                    alignmentScore = Math.round(12.4 - (Math.abs(biteRotation - 24) * 0.2));
                  }
                  if (alignmentScore < 5) alignmentScore = 5;

                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-cyan-500/30 space-y-4 animate-fade-in text-slate-100">
                      <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                        <span className="uppercase font-bold">🦷 ANÁLISE DE CONFRONTO ODONTOLÓGICO (MARCAS DE MORDIDA)</span>
                        <span className={`font-bold uppercase text-[8px] ${alignmentScore > 90 ? 'text-emerald-400' : 'text-gray-400'}`}>
                          {alignmentScore > 90 ? "● CONFLUÊNCIA ESTABELECIDA" : "CONFRONTANDO MODELOS DENTÁRIOS"}
                        </span>
                      </div>

                      <div className="bg-black/90 rounded-xl p-4 border border-white/5 space-y-4">
                        
                        <div className="h-44 bg-zinc-950 rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]" />
                          
                          {biteScannerActive && (
                            <div className="absolute inset-y-0 w-0.5 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-pulse" />
                          )}

                          <div className="absolute text-center flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full border border-red-500/30 relative flex items-center justify-center bg-red-950/10">
                              <div className="absolute text-[7px] text-red-500/60 font-mono -top-4 font-bold">PADRÃO NO ALIMENTO</div>
                              
                              <svg className="w-20 h-20 text-red-500/80 fill-current opacity-80" viewBox="0 0 100 100">
                                <path d="M 15,30 A 35,35 0 0,1 85,30" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="3,3" />
                                <rect x="18" y="22" width="6" height="8" rx="1" transform="rotate(-20 21 26)" />
                                <rect x="29" y="14" width="7" height="9" rx="1" transform="rotate(-5 32.5 18.5)" />
                                
                                {/* Rotated Central Tooth (Irregularity matching Suspect B!) */}
                                <rect x="42" y="11" width="7" height="9" rx="1" transform="rotate(25 45.5 15.5)" className="text-yellow-400" />
                                
                                <rect x="54" y="12" width="7" height="9" rx="1" transform="rotate(0 57.5 16.5)" />
                                <rect x="67" y="16" width="6" height="8" rx="1" transform="rotate(15 70 20)" />
                                <rect x="76" y="24" width="6" height="8" rx="1" transform="rotate(30 79 28)" />
                              </svg>
                            </div>
                          </div>

                          <div 
                            className="absolute flex items-center justify-center transition-transform duration-100 pointer-events-none"
                            style={{ transform: `rotate(${biteRotation}deg) scale(1.02)` }}
                          >
                            <div className="w-24 h-24 rounded-full border border-cyan-400/20 relative flex items-center justify-center">
                              <svg className="w-20 h-20 text-cyan-400 fill-current" viewBox="0 0 100 100">
                                <path d="M 15,30 A 35,35 0 0,1 85,30" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="1,2" />
                                
                                {biteSuspect === 'B' ? (
                                  <>
                                    <rect x="18" y="22" width="6" height="8" rx="1" transform="rotate(-20 21 26)" />
                                    <rect x="29" y="14" width="7" height="9" rx="1" transform="rotate(-5 32.5 18.5)" />
                                    <rect x="42" y="11" width="7" height="9" rx="1" transform="rotate(25 45.5 15.5)" stroke="#38bdf8" strokeWidth="1" />
                                    <rect x="54" y="12" width="7" height="9" rx="1" transform="rotate(0 57.5 16.5)" />
                                    <rect x="67" y="16" width="6" height="8" rx="1" transform="rotate(15 70 20)" />
                                    <rect x="76" y="24" width="6" height="8" rx="1" transform="rotate(30 79 28)" />
                                  </>
                                ) : biteSuspect === 'A' ? (
                                  <>
                                    <rect x="18" y="22" width="6" height="8" rx="1" transform="rotate(-20 21 26)" />
                                    <rect x="27" y="16" width="7" height="9" rx="1" transform="rotate(-10 30.5 20.5)" />
                                    <rect x="38" y="12" width="7" height="9" rx="1" transform="rotate(0 41.5 16.5)" />
                                    <rect x="49" y="12" width="7" height="9" rx="1" transform="rotate(0 52.5 16.5)" />
                                    <rect x="60" y="16" width="7" height="9" rx="1" transform="rotate(10 63.5 20.5)" />
                                    <rect x="71" y="22" width="6" height="8" rx="1" transform="rotate(20 74 26)" />
                                  </>
                                ) : (
                                  <>
                                    <rect x="18" y="22" width="6" height="8" rx="1" transform="rotate(-20 21 26)" />
                                    <rect x="30" y="14" width="4" height="2" rx="1" opacity="0.1" />
                                    <rect x="52" y="12" width="4" height="2" rx="1" opacity="0.1" />
                                    <rect x="67" y="16" width="6" height="8" rx="1" transform="rotate(15 70 20)" />
                                    <rect x="76" y="24" width="6" height="8" rx="1" transform="rotate(30 79 28)" />
                                  </>
                                )}
                              </svg>
                            </div>
                          </div>

                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => { setBiteSuspect('A'); playSound(220, 'sine', 0.1); }}
                            className={`p-2 rounded text-left border flex flex-col justify-between h-14 cursor-pointer ${biteSuspect === 'A' ? 'bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/40' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
                          >
                            <span className="text-[7px] font-mono text-gray-500 uppercase">Suspeito A</span>
                            <strong className="text-[8px] block truncate font-bold text-white">Suspeito Regular</strong>
                          </button>

                          <button
                            type="button"
                            onClick={() => { setBiteSuspect('B'); playSound(440, 'sine', 0.1); }}
                            className={`p-2 rounded text-left border flex flex-col justify-between h-14 cursor-pointer ${biteSuspect === 'B' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 animate-pulse' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
                          >
                            <span className="text-[7px] font-mono text-gray-500 uppercase font-black text-cyan-300">Suspeito B</span>
                            <strong className="text-[8px] block truncate font-bold text-cyan-200">Silva (Química)</strong>
                          </button>

                          <button
                            type="button"
                            onClick={() => { setBiteSuspect('C'); playSound(180, 'sine', 0.1); }}
                            className={`p-2 rounded text-left border flex flex-col justify-between h-14 cursor-pointer ${biteSuspect === 'C' ? 'bg-zinc-800 text-yellow-500 border-yellow-500/20' : 'bg-zinc-900 border-white/5 text-gray-400'}`}
                          >
                            <span className="text-[7px] font-mono text-gray-500 uppercase">Suspeito C</span>
                            <strong className="text-[8px] block truncate font-bold text-white">Aluno Visitante</strong>
                          </button>
                        </div>

                        <div className="bg-black/50 p-2.5 rounded-lg border border-white/5 text-left text-[9px] font-sans text-gray-300">
                          <span className="text-gray-500 text-[8px] uppercase block font-mono font-bold">CONGRUÊNCIA DE SOBREPOSIÇÃO DENTAL:</span>
                          <div className="flex items-center justify-between mt-1">
                            <div className="space-y-0.5">
                              {alignmentScore > 90 ? (
                                <p className="text-emerald-400 font-bold">🟢 CONGRUÊNCIA IDENTIFICADA: Anomalia de giroversão central e diastema canino assemelham perfeitamente!</p>
                              ) : (
                                <p className="text-amber-500">❌ DESALINHAMENTO: Ajuste a rotação da arcada para examinar correspondência de moldura.</p>
                              )}
                            </div>
                            <div className="text-right ml-4">
                              <span className="text-[8px] text-gray-500 font-mono block">CONCORDÂNCIA:</span>
                              <strong className="text-sm font-mono text-[#FFD000]">{alignmentScore}%</strong>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] text-gray-500 font-mono uppercase">
                            <span>Rotação angular da sobreposição:</span>
                            <strong className="text-cyan-400">{biteRotation}°</strong>
                          </div>
                          <input 
                            type="range" 
                            min="-25" 
                            max="25" 
                            value={biteRotation} 
                            onChange={(e) => {
                              setBiteRotation(Number(e.target.value));
                              if (Math.abs(Number(e.target.value)) % 2 === 0) {
                                playSound(340 + Number(e.target.value) * 5, 'sine', 0.03);
                              }
                            }}
                            className="w-full accent-cyan-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>

                      </div>
                    </div>
                  );
                }

                if (isBloodOrLuminol) {
                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-violet-500/30 space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-mono text-violet-400">
                        <span className="uppercase font-bold">🧪 REVELADOR DE MANCHAS LATENTES (LUMINOL & UV CLASSE A)</span>
                        <span className="text-pink-400 uppercase text-[8px] animate-pulse font-bold">
                          {chemTestActive ? "● LUMINESCÊNCIA ATIVADA" : "PRONTO PARA BORRIFAR"}
                        </span>
                      </div>

                      <div className="bg-black/90 rounded-xl p-4 border border-white/5 flex flex-col items-center justify-center space-y-3.5 relative overflow-hidden h-44">
                        <div className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${chemTestActive ? 'bg-violet-950/50' : 'bg-black/20'}`} />
                        
                        {chemTestActive && (
                          <div className="absolute left-0 right-0 h-1 bg-violet-400 shadow-[0_0_15px_#a78bfa] animate-bounce pointer-events-none" style={{ top: '40%' }} />
                        )}

                        <div className="z-10 w-full flex flex-col items-center justify-center">
                          {chemTestActive ? (
                            <div className="space-y-2 text-center w-full max-w-xs">
                              <div className="mx-auto w-12 h-12 flex items-center justify-center bg-violet-500/10 rounded-full border border-violet-400 animate-pulse text-cyan-300 font-bold text-lg shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                👣
                              </div>
                              <div className="flex justify-center gap-4 text-[24px]">
                                <span className="animate-bounce">💦</span>
                                <span className="animate-pulse text-[#00f0ff] filter drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]">🩸</span>
                                <span className="animate-bounce delay-75">💦</span>
                              </div>
                              <strong className="text-[10.5px] font-mono text-cyan-300 block uppercase font-bold animate-pulse">Luminiscência de Oxigênio Hematina (+)</strong>
                              <p className="text-[8.5px] text-gray-400 font-sans leading-tight">Catalisação imediata identificando formato de respingo ativo com arraste biológico sob fenda cega.</p>
                            </div>
                          ) : (
                            <div className="space-y-2 text-center">
                              <span className="text-3xl filter saturate-50">✨</span>
                              <strong className="text-[10px] font-mono text-gray-300 block uppercase font-black">Suporte de Exame Quimioluminescente</strong>
                              <span className="text-[8.5px] text-gray-500 block max-w-[260px] leading-relaxed mx-auto">Compostos de sangue ocultos e invisíveis no assoalho escuro reagirão emitindo luz fria sob borrifamento.</span>
                            </div>
                          )}
                        </div>

                        {!chemTestActive && (
                          <button
                            type="button"
                            onClick={() => {
                              setChemTestActive(true);
                              playSound(180, 'sine', 0.15);
                              setTimeout(() => playSound(380, 'sine', 0.12), 150);
                              setTimeout(() => {
                                playSound(490, 'sine', 0.1);
                                setChemTestActive(false);
                              }, 3500);
                            }}
                            className="relative z-10 px-4 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-mono font-black text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer border border-violet-400/35 shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                          >
                            💦 BORRIFAR REAGENTE LUMINOL
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                if (isTanatologia) {
                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-red-500/20 space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-mono text-red-400">
                        <span className="uppercase font-bold">🩺 INQUÉRITO CRONOTANATOLÓGICO REAL-TIME</span>
                        <div className="flex gap-2">
                          <span className="text-gray-500 text-[8px]">AMORTIZAÇÃO:</span>
                          <strong className="text-yellow-400">{entomologySlider} horas</strong>
                        </div>
                      </div>

                      <div className="bg-black/90 rounded-xl p-4 border border-white/5 space-y-3 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 rounded-lg bg-zinc-950 border border-white/10 flex flex-col justify-center items-center relative shrink-0">
                            <Activity className="h-8 w-8 text-red-500 animate-pulse" />
                            <div className="text-[8px] font-mono text-gray-500 uppercase mt-1">Temp Retal</div>
                            <span className="text-[10px] font-mono text-[#FFD000] font-bold">
                              {(37 - (entomologySlider * 0.95)).toFixed(1)} °C
                            </span>
                          </div>

                          <div className="flex-1 space-y-1 text-left font-mono text-[9px] text-gray-300">
                            <span className="text-gray-500 text-[8.5px] uppercase block">LIVOR & ESTADO DE RIGIDEZ CADAVÉRICA:</span>
                            <div className="p-2 bg-zinc-950 border border-white/5 rounded-lg text-[9px] leading-relaxed">
                              {entomologySlider < 3 ? (
                                <p className="text-green-400 font-bold">✗ Sem Rigidez Estável.</p>
                              ) : entomologySlider < 12 ? (
                                <p className="text-amber-500 font-black">⚡ Rigor Mortis Generalizado.</p>
                              ) : (
                                <p className="text-purple-400 font-semibold">✿ Rigor Desfeito / Livididades Fixas Estáveis.</p>
                              )}
                              <span className="text-[8px] text-gray-500 block font-normal leading-normal mt-1">
                                {entomologySlider < 3 ? "O sangue ainda coagula debilmente e a temperatura está próxima dos 37°C originais." :
                                 entomologySlider < 12 ? "A rigidez dos membros atingiu seu zênite (maxilar, pescoço e membros inferiores travados)." :
                                 "Autólise celular generalizada e manchas de hipóstase de coloração escura fixadas no dorso do corpo."}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[8px] text-gray-500 font-mono">
                            <span>Alterar tempo decorrido do óbito (curvatura térmica):</span>
                            <strong className="text-white">{entomologySlider}h</strong>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="36" 
                            value={entomologySlider} 
                            onChange={(e) => {
                              setEntomologySlider(Number(e.target.value));
                              if (Number(e.target.value) % 4 === 0) {
                                playSound(220 + Number(e.target.value) * 6, 'triangle', 0.05);
                              }
                            }}
                            className="w-full accent-red-500 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  );
                }

                if (isCenaOrFrenagem) {
                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-emerald-500/20 space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400">
                        <span className="uppercase font-bold">🚗 RECONSTRUÇÃO VETORIAL DA CINEMÁTICA DA COLISÃO</span>
                        <span className="text-yellow-400 font-bold uppercase text-[8px] animate-pulse">
                          {chemTestActive ? "ANALISANDO TRAJETÓRIA..." : "SIMULAÇÃO PRONTA"}
                        </span>
                      </div>

                      <div className="bg-black/90 rounded-xl p-4 border border-white/5 flex flex-col gap-3 relative overflow-hidden">
                        <div className="h-20 bg-zinc-900 border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-between px-6">
                          <div className="absolute left-0 right-0 h-0.5 border-t border-dashed border-gray-600 top-1/2" />
                          <div className="absolute bottom-1 left-2 text-[7px] text-gray-600 font-mono">MARCA FRENÁRIA ESTABELECIDA</div>
                          
                          <div className={`absolute bottom-6 left-12 h-1 bg-black rounded transition-all duration-[3000ms] ${chemTestActive ? 'w-48 opacity-100' : 'w-0 opacity-0'}`} />
                          
                          <div 
                            className={`h-5 w-8 bg-amber-500/80 rounded flex items-center justify-center font-bold text-[8px] font-mono text-black relative z-10 ${chemTestActive ? 'translate-x-32 scale-95' : 'translate-x-0'}`}
                            style={{ transition: chemTestActive ? 'transform 3.5s cubic-bezier(0.1, 0.8, 0.25, 1)' : 'none' }}
                          >
                            🚙
                          </div>
                          
                          <div className={`text-sm absolute right-12 bottom-4 transition-all duration-[2.5s] ${chemTestActive ? 'scale-125 opacity-100 rotate-12' : 'scale-50 opacity-0'}`}>
                            💥
                          </div>
                        </div>

                        <div className="text-[9px] font-mono text-gray-300 text-left">
                          <span className="text-gray-500 text-[8px] uppercase block">DADOS DE ATRELAMENTO DO LOCAL:</span>
                          <span className="block mt-1 font-sans text-xs">
                            {chemTestActive 
                              ? "Medindo coeficiente de atrito longitudinal (μ=0.65). O rastro de borracha de 28 metros indica frenagem súbita com velocidade estimada acima do regulamentar."
                              : "Utilize marcas de asfalto, marcas pneumáticas e deformações estruturais de colisão baterial para recalcular a velocidade máxima imediata de impacto."
                            }
                          </span>
                        </div>

                        {!chemTestActive && (
                          <button
                            type="button"
                            onClick={() => {
                              setChemTestActive(true);
                              playSound(120, 'sawtooth', 0.5);
                              setTimeout(() => playSound(480, 'sine', 0.15), 1800);
                              setTimeout(() => {
                                playSound(320, 'triangle', 0.08);
                                setChemTestActive(false);
                              }, 3500);
                            }}
                            className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-[9px] uppercase rounded-lg transition-all cursor-pointer font-black border border-emerald-500/35"
                          >
                            ⚡ MODELAR VETORES DE ARRASTE
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                if (isGasesOuPolvora) {
                  return (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-orange-500/20 space-y-4">
                      <div className="flex items-center justify-between text-[9px] font-mono text-orange-400">
                        <span className="uppercase font-bold">🔥 TERMOCORTES E ANALISADOR DE RESÍDUOS DE DISPARO</span>
                        <span className="text-yellow-400 uppercase text-[8px] font-bold">RODIZONATO DE SÓDIO</span>
                      </div>

                      <div className="bg-black/95 rounded-xl p-4 border border-white/5 space-y-3 relative overflow-hidden">
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 rounded-full border border-orange-500/30 bg-zinc-950 relative flex items-center justify-center overflow-hidden shrink-0">
                            <div className="absolute inset-2 border border-dashed border-zinc-800 rounded-full animate-spin" />
                            {chemTestActive ? (
                              <div className="space-y-1 text-center font-bold z-10 animate-pulse">
                                <div className="text-xs text-rose-500 animate-bounce">🔴 🔴</div>
                                <span className="text-[8px] text-rose-400 block uppercase font-mono leading-none">Chumbo (+)</span>
                              </div>
                            ) : (
                              <div className="text-gray-600 font-bold block text-[18px]">🔬</div>
                            )}
                          </div>

                          <div className="flex-1 space-y-1 text-left font-mono text-[9px] text-gray-300">
                            <span className="text-gray-500 text-[8px] uppercase block">DETERMINAÇÃO METALOGRÁFICA:</span>
                            <p className="text-[9.5px] font-sans leading-relaxed">
                              {chemTestActive 
                                ? "Partículas esferoidais condensadas de Chumbo, Antimônio e Bário insolúveis reagiram de imediato demonstrando nitidamente tiro a curta distância (<30cm)."
                                : "Investigue se o atirador residia próximo ao cano ou se o disparo foi realizado à distâncias seguras de segurança."
                              }
                            </p>
                          </div>
                        </div>

                        {!chemTestActive && (
                          <button
                            type="button"
                            onClick={() => {
                              setChemTestActive(true);
                              playSound(400, 'sawtooth', 0.15);
                              setTimeout(() => {
                                playSound(620, 'sine', 0.08);
                                setChemTestActive(false);
                              }, 2500);
                            }}
                            className="w-full py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-mono font-black text-[9px] uppercase rounded-lg transition-all cursor-pointer font-black border border-orange-500/35"
                          >
                            🧪 REAGIR COMPONENTES METÁLICOS (SPRAY)
                          </button>
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-blue-500/20 space-y-4">
                    <div className="flex items-center justify-between text-[9px] font-mono text-[#FFD000]">
                      <span className="uppercase font-bold">🔬 SCANNER LASER UNIVERSAL DE ADESIVIDADE PERICIAL</span>
                      <span className="text-cyan-400 uppercase text-[8px] animate-pulse font-bold">
                        {chemTestActive ? "COINCIDÊNCIA: 98.4%" : "SISTEMA SEGURO"}
                      </span>
                    </div>

                    <div className="bg-black/90 rounded-xl p-4 border border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between relative overflow-hidden min-h-40">
                      {chemTestActive && (
                        <div className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_15px_#22d3ee] animate-bounce pointer-events-none" style={{
                          top: '40%'
                        }} />
                      )}

                      <div className="h-24 w-24 rounded-lg bg-zinc-950 border border-white/10 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-blue-500/[0.02] pointer-events-none" />
                        <svg className="w-12 h-12 text-cyan-400 opacity-60 animate-spin" viewBox="0 0 100 100" style={{ animationDuration: '6s' }}>
                          <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="currentColor" strokeWidth="2.5" />
                          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,3" />
                          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="1" />
                          <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      <div className="flex-1 space-y-2 text-left z-10 w-full min-w-[170px]">
                        {chemTestActive ? (
                          <div className="space-y-1.5 animate-fade-in font-mono text-[9px]">
                            <strong className="text-[10px] font-mono text-cyan-400 block uppercase font-bold animate-pulse">Varredura de Espectro Ativo...</strong>
                            <div className="grid grid-cols-2 gap-1.5 text-[8.5px] text-gray-400 pt-1 border-t border-white/5">
                              <span>TIPO: Vestígio Fático</span>
                              <span>SINAL: Estável 2.4V</span>
                              <span>REF: LACIF-UFF V2</span>
                              <span>STATUS: INTEGRAL ✓</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1 font-mono text-[9px]">
                            <strong className="text-[10px] text-gray-300 block uppercase font-black">Emissor Laser Ultra-Forense</strong>
                            <p className="text-[8.5px] text-gray-500 leading-relaxed font-sans">
                              O algoritmo dinâmico de sensibilidade química isola moléculas residuais invisíveis na cena e confronta amostras instantaneamente com nosso catálogo central.
                            </p>
                          </div>
                        )}
                      </div>

                      {!chemTestActive && (
                        <button
                          type="button"
                          onClick={() => {
                            setChemTestActive(true);
                            playSound(260, 'sawtooth', 0.12);
                            setTimeout(() => {
                              playSound(580, 'sine', 0.08);
                              setChemTestActive(false);
                            }, 2500);
                          }}
                          className="px-3 py-1.5 bg-[#FFD000] hover:bg-yellow-400 text-zinc-950 font-mono font-black text-[9px] uppercase tracking-wider rounded-lg transition-all cursor-pointer border border-yellow-400/20 shadow-[0_4px_12px_rgba(255,208,0,0.15)] sm:self-end mt-2 md:mt-0"
                        >
                          ⚡ INICIAR LASER
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* MULTIPLE CHOICE / FORM LAB INTERACTION BLOCK */}
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/5 space-y-4">
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block font-bold border-b border-white/5 pb-2">📂 EVITAR CONFLITO DE PROVAS - INDIQUE O LAUDO CORRETO</span>
                
                <h4 className="font-sans text-sm font-bold text-white leading-relaxed">
                  {currentRoom.question}
                </h4>

                <div className="space-y-2.5">
                  {currentRoom.options.map((opt, idx) => {
                    const alphabet = ['A', 'B', 'C', 'D'];
                    const isSelected = selectedOption === idx;
                    
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          if (!answerEvaluated) {
                            setSelectedOption(idx);
                            playSound(400, 'sine', 0.05);
                          }
                        }}
                        disabled={answerEvaluated}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${
                          isSelected 
                            ? 'border-[#FFD000] bg-[#FFD000]/10 text-white font-black shadow-[0_0_12px_rgba(255,208,0,0.15)]' 
                            : 'border-white/5 bg-[#050505]/65 text-gray-300 hover:bg-white/5 hover:text-white'
                        } ${answerEvaluated ? 'opacity-90 cursor-not-allowed' : ''}`}
                      >
                        <span className={`h-5 w-5 rounded-full flex items-center justify-center font-mono text-[10px] shrink-0 font-bold ${
                          isSelected ? 'bg-[#FFD000] text-black' : 'bg-zinc-800 text-gray-400'
                        }`}>
                          {alphabet[idx]}
                        </span>
                        <span className="font-sans leading-relaxed text-xs">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* DYNAMIC ANSWER EXPLANATION / VERIFICATION RESULTS */}
                {!answerEvaluated ? (
                  <button
                    type="button"
                    onClick={handleCheckAnswer}
                    disabled={selectedOption === null}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-900 disabled:text-gray-600 disabled:border-zinc-800 disabled:cursor-not-allowed text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-1.5 border border-blue-500/30 cursor-pointer shadow-lg shadow-blue-500/10"
                  >
                    🔍 ANALISAR VESTÍGIO CIENTÍFICO <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="space-y-4 pt-2 border-t border-white/5 animate-fade-in text-xs font-mono">
                    <div className={`p-4 rounded-xl border leading-relaxed ${isAnswerCorrect ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400 animate-pulse' : 'border-red-500/20 bg-red-400/5 text-red-300'}`}>
                      {isAnswerCorrect ? (
                        <>
                          <strong className="block text-[#FFD000] mb-1 flex items-center gap-1.5">
                            <Check className="h-4 w-4 text-emerald-400 font-bold" /> ✓ {feedbackMsg}
                          </strong>
                          <span className="text-gray-300 font-sans block leading-relaxed text-xs mt-1">
                            {currentRoom.explanation}
                          </span>
                        </>
                      ) : (
                        <>
                          <strong className="block text-red-400 mb-1 flex items-center gap-1.5">
                            <AlertCircle className="h-4 w-4 text-red-400" /> ✗ Resposta incorreta. Tente novamente.
                          </strong>
                          <span className="text-gray-400 font-sans block leading-relaxed text-xs mt-1">
                            A alternativa indicada não possui suporte factual pericial nas evidências examinadas. Re-analise o inquérito e tente outra correlação!
                          </span>
                        </>
                      )}
                    </div>

                    {isAnswerCorrect ? (
                      <button
                        type="button"
                        onClick={handleNextRoom}
                        className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-mono font-black text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 border border-emerald-500/30"
                      >
                        Próxima Investigação <ChevronRight className="h-4 w-4 animate-bounce" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleTryAgain}
                        className="w-full py-3.5 bg-[#FFD000] hover:bg-yellow-400 text-black font-mono font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-yellow-500/20 font-black"
                      >
                        🔄 REVISAR PROVAS & TENTAR OUTRA OPÇÃO
                      </button>
                    )}
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ========================================== FINAL COMPLETED / CONGRATS SCREEN ========================================== */}
      {gameState === 'completed' && (
        <div className="relative z-10 max-w-xl mx-auto py-12 space-y-8 animate-fade-in text-center font-mono text-white">
          
          <div className="inline-block h-20 w-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
            <CheckCircle className="h-10 w-10" />
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-black text-2xl md:text-4xl text-emerald-400 uppercase tracking-tight">
              Parabéns! Todos os casos foram solucionados.
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto font-sans">
              Você solucionou com maestria os vestígios periciais e converteu incertezas fáticas em provas científicas irrefutáveis nas dependências da <strong>LACIF UFF</strong>.
            </p>
          </div>

          <div className="py-3.5 px-4 rounded-xl border border-yellow-400/20 bg-[#FFD000]/5 max-w-lg mx-auto italic text-xs text-[#FFC400] font-mono mt-3 leading-relaxed shadow-inner">
            "A ciência forense fala quando as demais vozes se calam, desvelando o oculto pela luz inabalável da verdade perante a justiça."
          </div>

          {/* Player Stats Summary Card */}
          <div className="bg-[#050505]/70 border border-white/10 rounded-2xl p-6 text-left grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-2">
              <strong className="text-[10px] text-gray-500 uppercase tracking-widest block font-bold">DESEMPENHO DO PERITO:</strong>
              <div className="font-sans text-xs space-y-1.5 text-gray-300">
                <p>Investigador: <span className="text-white font-mono uppercase font-black">{playerName}</span></p>
                <p>Quantidade de acertos: <span className="text-[#FFD000] font-mono font-black">{correctFirstAttemptsCount}</span> (no 1º lance)</p>
                <p>Quantidade de questões: <span className="text-blue-400 font-mono font-black">{roomsToPlay.length}</span></p>
                <p>Aproveitamento: <span className="text-emerald-400 font-mono font-extrabold">{Math.round((correctFirstAttemptsCount / roomsToPlay.length) * 100)}%</span></p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 flex flex-col justify-center items-center text-center">
              <div className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">PATAMAR DA MISSÃO</div>
              <strong className="text-sm text-white font-black uppercase tracking-tight leading-snug">
                {getClassification(currentScore).title}
              </strong>
              <div className="text-sm font-black text-emerald-400 mt-1.5">{currentScore} XP</div>
            </div>

          </div>

          {/* Action buttons exactly matching the requested "Recomeçar Investigação" & "Voltar ao Início" */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                setGameState('playing');
                setCurrentScore(0);
                setCurrentRoomIndex(0);
                setCorrectFirstAttemptsCount(0);
                setFirstAttemptFlag(true);
                setSelectedOption(null);
                setAnswerEvaluated(false);
                setFeedbackMsg(null);
                playSound(600, 'sine', 0.15);
              }}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-lg hover:shadow-emerald-500/20 border border-emerald-500/40"
            >
              🔄 Recomeçar Investigação
            </button>
            <button
              onClick={() => {
                setGameState('welcome');
                setPlayerName('');
              }}
              className="flex-1 py-4 bg-zinc-950 hover:bg-zinc-900 text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer border border-white/5"
            >
              🚪 Voltar ao Início
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
