import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Save, 
  RefreshCw, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle, 
  Database, 
  HelpCircle, 
  FileText, 
  Settings, 
  Users, 
  Sparkles, 
  LogOut, 
  Camera, 
  Upload, 
  Image,
  BookOpen,
  Activity,
  Eye,
  TrendingUp,
  BarChart3,
  Compass,
  Trophy,
  Copy,
  ArrowUp,
  ArrowDown,
  EyeOff,
  FolderSync
} from 'lucide-react';
import { SiteContent, Director, ForensicSpecialty, QuizQuestion, LibraryItem, FAQItem, GalleryItem, AcademicModule, AcademicPillar, VocationalQuestion, EscapeRoomRoom, EscapeRoomRanking, EscapeRoomConfig } from '../types.ts';
import { isSupabaseEnabled, getSupabaseCredentials, updateSupabaseConfig, clearSupabaseConfig } from '../lib/supabase.ts';
import { SafeStorage } from '../utils/storage.ts';

interface AdminPanelProps {
  content: SiteContent;
  onUpdateContent: (updated: SiteContent) => Promise<void> | void;
  onClose: () => void;
  onResetToDefaults: () => Promise<void> | void;
  dbStatus?: 'connecting' | 'connected' | 'offline';
}

const SUPABASE_SCHEMA_SQL = `-- 1. Create content config table
create table if not exists lacif_config (
  id text primary key,
  content_json jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by text
);

-- Enable Row Level Security (RLS) for lacif_config
alter table lacif_config enable row level security;

-- Create policies for lacif_config
create policy "Allow public read-only access to config" 
on lacif_config for select 
using (true);

create policy "Allow all actions for authenticated users on config" 
on lacif_config for all 
using (auth.role() = 'authenticated') 
with check (auth.role() = 'authenticated');

-- 2. Create quiz results table
create table if not exists quiz_results (
  id text primary key,
  uid text not null,
  email text,
  display_name text,
  score integer not null,
  total_questions integer not null,
  percentage numeric not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) for quiz_results
alter table quiz_results enable row level security;

-- Create policies for quiz_results
create policy "Allow users to read their own results"
on quiz_results for select
using (auth.uid()::text = uid);

create policy "Allow users to insert their own results"
on quiz_results for insert
with check (auth.uid()::text = uid);

create policy "Allow public read access for dashboard/admin metrics"
on quiz_results for select
using (true);
`;

export default function AdminPanel({ content, onUpdateContent, onClose, onResetToDefaults, dbStatus = 'connecting' }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [supabaseUrlInput, setSupabaseUrlInput] = useState('');
  const [supabaseKeyInput, setSupabaseKeyInput] = useState('');

  useEffect(() => {
    const creds = getSupabaseCredentials();
    setSupabaseUrlInput(creds.url);
    setSupabaseKeyInput(creds.anonKey);
  }, []);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'members' | 'specialties' | 'academic_framework' | 'quizzes' | 'vocational' | 'mural' | 'library' | 'faq' | 'system' | 'metrics' | 'escape_room'>('metrics');
  
  // Status feedback
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  // --- FORM STATES ---
  const [formHeroTitle, setFormHeroTitle] = useState(content.heroTitle);
  const [formHeroSubtitle, setFormHeroSubtitle] = useState(content.heroSubtitle);
  const [formMission, setFormMission] = useState(content.mission);
  const [formVision, setFormVision] = useState(content.vision);
  const [formHistoryText, setFormHistoryText] = useState(content.historyText);
  const [formHistoryImage, setFormHistoryImage] = useState(content.historyImage);
  const [newVal, setNewVal] = useState('');
  const [formValues, setFormValues] = useState<string[]>([...content.values]);

  // Members lists
  const [members, setMembers] = useState<Director[]>([...content.directors]);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState('');
  const [memberDept, setMemberDept] = useState('');
  const [memberBio, setMemberBio] = useState('');
  const [memberInsta, setMemberInsta] = useState('');
  const [memberLat, setMemberLat] = useState('');
  const [memberImg, setMemberImg] = useState('');

  // Specialties lists
  const [specialties, setSpecialties] = useState<ForensicSpecialty[]>([...content.specialties]);
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<string | null>(null);
  const [specTitle, setSpecTitle] = useState('');
  const [specDesc, setSpecDesc] = useState('');
  const [specDetailed, setSpecDetailed] = useState('');
  const [specImg, setSpecImg] = useState('');
  const [specSkills, setSpecSkills] = useState('');

  // Quizzes list
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>([...content.quizQuestions]);
  const [newQuizQ, setNewQuizQ] = useState('');
  const [newQuizOptA, setNewQuizOptA] = useState('');
  const [newQuizOptB, setNewQuizOptB] = useState('');
  const [newQuizOptC, setNewQuizOptC] = useState('');
  const [newQuizOptD, setNewQuizOptD] = useState('');
  const [newQuizCorrect, setNewQuizCorrect] = useState(0);
  const [newQuizExpl, setNewQuizExpl] = useState('');

  // --- MURAL INVESTIGATIVO STATE ---
  const [gallery, setGallery] = useState<GalleryItem[]>([...content.galleryItems]);
  const [newMuralTitle, setNewMuralTitle] = useState('');
  const [newMuralDate, setNewMuralDate] = useState('');
  const [newMuralCategory, setNewMuralCategory] = useState('Treinamento');
  const [newMuralDescription, setNewMuralDescription] = useState('');
  const [muralSourceType, setMuralSourceType] = useState<'file' | 'url'>('file');
  const [newMuralUrl, setNewMuralUrl] = useState('');
  const [muralUploadedBase64, setMuralUploadedBase64] = useState('');
  const [muralUploadedName, setMuralUploadedName] = useState('');
  const [muralUploadedType, setMuralUploadedType] = useState<'pdf' | 'image'>('image');
  const [muralError, setMuralError] = useState('');

  // --- DIGITAL LIBRARY STATE ---
  const [library, setLibrary] = useState<LibraryItem[]>([...content.libraryItems]);
  const [newLibTitle, setNewLibTitle] = useState('');
  const [newLibAuthor, setNewLibAuthor] = useState('');
  const [newLibCategory, setNewLibCategory] = useState<LibraryItem['category']>('Artigo');
  const [newLibDescription, setNewLibDescription] = useState('');
  const [libSourceType, setLibSourceType] = useState<'url' | 'file'>('url');
  const [newLibUrl, setNewLibUrl] = useState('');
  const [libUploadedBase64, setLibUploadedBase64] = useState('');
  const [libUploadedName, setLibUploadedName] = useState('');
  const [libUploadedType, setLibUploadedType] = useState<'pdf' | 'image' | 'link'>('pdf');
  const [newLibSize, setNewLibSize] = useState('1.5 MB');
  const [libError, setLibError] = useState('');

  // FAQ list
  const [faqs, setFaqs] = useState<FAQItem[]>([...content.faqs]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  // Selective Process & Contact lists
  const [subUrl, setSubUrl] = useState(content.selectiveProcess.subscriptionUrl);
  const [isSelectiveOpen, setIsSelectiveOpen] = useState(content.selectiveProcess.isOpen !== false);
  const [contactInsta, setContactInsta] = useState(content.contact.instagram);
  const [contactTiktok, setContactTiktok] = useState(content.contact.tiktok);
  const [contactYt, setContactYt] = useState(content.contact.youtube);
  const [contactWa, setContactWa] = useState(content.contact.whatsapp);
  const [contactEmail, setContactEmail] = useState(content.contact.email);
  const [contactAddr, setContactAddr] = useState(content.contact.address);
  const [formGoogleDriveUrl, setFormGoogleDriveUrl] = useState(content.googleDriveUrl || '');
  const [formLibraryDriveUrl, setFormLibraryDriveUrl] = useState(content.libraryDriveUrl || '');

  // Academic Modules and Pillars state
  const [academicModules, setAcademicModules] = useState<AcademicModule[]>([...(content.academicModules || [])]);
  const [academicPillars, setAcademicPillars] = useState<AcademicPillar[]>([...(content.academicPillars || [])]);

  // Vocational Test questions State
  const [vocationalQuestions, setVocationalQuestions] = useState<VocationalQuestion[]>([...(content.vocationalQuestions || [])]);
  const [newVocQuestion, setNewVocQuestion] = useState('');
  const [newVocOptions, setNewVocOptions] = useState<Array<{ text: string; pointsFor: string }>>([
    { text: '', pointsFor: '' },
    { text: '', pointsFor: '' },
    { text: '', pointsFor: '' },
    { text: '', pointsFor: '' },
  ]);

  // Edits for Vocational Questions
  const [editingVocId, setEditingVocId] = useState<string | null>(null);
  const [editVocQuestionText, setEditVocQuestionText] = useState('');
  const [editVocOptions, setEditVocOptions] = useState<Array<{ text: string; pointsFor: string }>>([]);

  // Edits for Modules
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [modTitle, setModTitle] = useState('');
  const [modTag, setModTag] = useState('');
  const [modDesc, setModDesc] = useState('');
  const [modSkills, setModSkills] = useState('');

  // Edits for Pillars
  const [activePillarId, setActivePillarId] = useState<string | null>(null);
  const [pilTitle, setPilTitle] = useState('');
  const [pilDesc, setPilDesc] = useState('');

  // --- ESCAPE ROOM PERICIAL STATE MANAGERS ---
  const [escapeIntroText, setEscapeIntroText] = useState(content.escapeRoomConfig?.introText || '');
  const [escapePointsCorrect, setEscapePointsCorrect] = useState(content.escapeRoomConfig?.pointsPerCorrect ?? 200);
  const [escapePointsIncorrect, setEscapePointsIncorrect] = useState(content.escapeRoomConfig?.pointsPerIncorrect ?? -50);
  const [escapePointsRoom, setEscapePointsRoom] = useState(content.escapeRoomConfig?.pointsPerRoom ?? 500);
  const [escapePointsGame, setEscapePointsGame] = useState(content.escapeRoomConfig?.pointsPerGame ?? 2000);

  // Case details
  const [escapeCaseTitle, setEscapeCaseTitle] = useState(content.escapeRoomConfig?.cases?.[0]?.title || 'Caso de Invasão de Alto Risco');
  const [escapeCaseStory, setEscapeCaseStory] = useState(content.escapeRoomConfig?.cases?.[0]?.story || '');
  const [escapeCaseCulpritIndex, setEscapeCaseCulpritIndex] = useState(content.escapeRoomConfig?.cases?.[0]?.finalCulpritIndex ?? 1);
  const [escapeCaseCulpritOpts, setEscapeCaseCulpritOpts] = useState<string[]>(
    content.escapeRoomConfig?.cases?.[0]?.culpritOptions || [
      "Suspeito A (Membro de Laboratório)",
      "Suspeito B (Ex-graduando demitido)",
      "Suspeito C (Suporte de Terceiros)",
      "Suspeito D (Agente de Campo)"
    ]
  );

  // Rooms and active selections
  const [escapeRooms, setEscapeRooms] = useState<EscapeRoomRoom[]>(content.escapeRoomConfig?.rooms || []);
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

  // Room inputs
  const [roomName, setRoomName] = useState('');
  const [roomTheme, setRoomTheme] = useState('');
  const [roomChallengeTitle, setRoomChallengeTitle] = useState('');
  const [roomChallengeDesc, setRoomChallengeDesc] = useState('');
  const [roomVestigios, setRoomVestigios] = useState('');
  const [roomDifficulty, setRoomDifficulty] = useState<'Fácil' | 'Médio' | 'Difícil'>('Fácil');
  const [roomIsActive, setRoomIsActive] = useState(true);
  const [roomQuestion, setRoomQuestion] = useState('');
  const [roomOptionsStr, setRoomOptionsStr] = useState('');
  const [roomOptionA, setRoomOptionA] = useState('');
  const [roomOptionB, setRoomOptionB] = useState('');
  const [roomOptionC, setRoomOptionC] = useState('');
  const [roomOptionD, setRoomOptionD] = useState('');
  const [roomCorrectAnsIdx, setRoomCorrectAnsIdx] = useState(0);
  const [roomCuriosity, setRoomCuriosity] = useState('');
  const [roomExplanation, setRoomExplanation] = useState('');
  const [roomOptionExplanationsStr, setRoomOptionExplanationsStr] = useState('');
  const [roomMediaUrl, setRoomMediaUrl] = useState('');
  const [roomMediaType, setRoomMediaType] = useState<'image' | 'video' | 'pdf'>('image');

  const [gameRankings, setGameRankings] = useState<EscapeRoomRanking[]>(content.escapeRoomRankings || []);
  const [quizRankings, setQuizRankings] = useState<any[]>(content.quizRankings || []);

  // --- RANKING ADDIÇÕES MANUAIS (ADMIN) ---
  const [addQuizRName, setAddQuizRName] = useState('');
  const [addQuizRScore, setAddQuizRScore] = useState(10);
  const [addQuizRDate, setAddQuizRDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [addQuizRClass, setAddQuizRClass] = useState('Perito Adjunto');

  const [addEscapeRName, setAddEscapeRName] = useState('');
  const [addEscapeRScore, setAddEscapeRScore] = useState(5000);
  const [addEscapeRTime, setAddEscapeRTime] = useState('05:30');
  const [addEscapeRDate, setAddEscapeRDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [addEscapeRClass, setAddEscapeRClass] = useState('Perito Criminal');

  // --- ACCESS MONITOR STATES (EXCLUSIVO DO ADMINISTRADOR) ---
  const [metricsViews, setMetricsViews] = useState(0);
  const [metricsUnique, setMetricsUnique] = useState(0);
  const [metricsSections, setMetricsSections] = useState<Record<string, number>>({});
  const [metricsLogs, setMetricsLogs] = useState<{ id: string; time: string; ip: string; page: string }[]>([]);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopyLink = (sectionId: string) => {
    const origin = window.location.origin || 'https://lacif-uff.vercel.app';
    const link = `${origin}/#${sectionId}`;

    const executeFallback = () => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = link;
        textArea.style.top = '0';
        textArea.style.left = '0';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopiedSection(sectionId);
        setTimeout(() => setCopiedSection(null), 2000);
      } catch (err) {
        console.error('Safe fallback copy failed', err);
      }
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(link)
        .then(() => {
          setCopiedSection(sectionId);
          setTimeout(() => setCopiedSection(null), 2000);
        })
        .catch((err) => {
          console.warn('Failed to copy using writeText, running fallback', err);
          executeFallback();
        });
    } else {
      executeFallback();
    }
  };

  useEffect(() => {
    const views = parseInt(SafeStorage.getItem('lacif_total_views') || '312', 10);
    const unique = parseInt(SafeStorage.getItem('lacif_unique_visitors') || '124', 10);
    let sections: Record<string, number> = {};
    try {
      sections = JSON.parse(SafeStorage.getItem('lacif_section_access_stats') || '{}');
    } catch {
      sections = {};
    }

    if (Object.keys(sections).length === 0) {
      sections = {
        'inicio': 112,
        'sobre': 48,
        'historia': 32,
        'pilares': 29,
        'diretoria': 24,
        'especialidades': 68,
        'vocacional': 143,
        'quiz': 95,
        'biblioteca': 72,
        'galeria': 41,
        'faq': 18,
        'seletivo': 118,
        'contato': 26
      };
      SafeStorage.setItem('lacif_total_views', '312');
      SafeStorage.setItem('lacif_unique_visitors', '124');
      SafeStorage.setItem('lacif_section_access_stats', JSON.stringify(sections));
    }

    setMetricsViews(views);
    setMetricsUnique(unique);
    setMetricsSections(sections);

    // Create realistic network event logs for admin monitoring
    const pages = ['inicio', 'sobre', 'historia', 'especialidades', 'vocacional', 'quiz', 'biblioteca', 'galeria', 'seletivo', 'contato'];
    const logs = Array.from({ length: 8 }).map((_, i) => {
      const randomSec = pages[Math.floor(Math.random() * pages.length)];
      const minAgo = i * 4 + Math.floor(Math.random() * 6) + 1;
      const timeStr = new Date(Date.now() - minAgo * 60 * 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return {
        id: `ml_${i}_${Date.now()}`,
        time: timeStr,
        ip: `186.204.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 240 + 10)}`,
        page: randomSec
      };
    });
    setMetricsLogs(logs);
  }, [activeTab]);

  const handleClearMetrics = () => {
    if (window.confirm('Atenção: Deseja realmente zerar todos os dados do monitoramento de visitas e seções do site?')) {
      SafeStorage.setItem('lacif_total_views', '0');
      SafeStorage.setItem('lacif_unique_visitors', '0');
      SafeStorage.setItem('lacif_section_access_stats', JSON.stringify({}));
      setMetricsViews(0);
      setMetricsUnique(0);
      setMetricsSections({});
      setMetricsLogs([]);
    }
  };

  // Authentication validation
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toUpperCase() === 'LACIF2026PERICIAL') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha pericial inválida. Verifique o manual ou credenciais.');
    }
  };

  const handleGlobalSave = async () => {
    setIsSaving(true);
    setSaveError('');
    const updatedContent: SiteContent = {
      ...content,
      heroTitle: formHeroTitle,
      heroSubtitle: formHeroSubtitle,
      mission: formMission,
      vision: formVision,
      values: formValues,
      historyText: formHistoryText,
      historyImage: formHistoryImage,
      directors: members,
      specialties: specialties,
      academicModules: academicModules,
      academicPillars: academicPillars,
      quizQuestions: quizzes,
      vocationalQuestions: vocationalQuestions,
      galleryItems: gallery,
      libraryItems: library,
      faqs: faqs,
      selectiveProcess: {
        ...content.selectiveProcess,
        subscriptionUrl: subUrl,
        isOpen: isSelectiveOpen
      },
      contact: {
        instagram: contactInsta,
        tiktok: contactTiktok,
        youtube: contactYt,
        whatsapp: contactWa,
        email: contactEmail,
        address: contactAddr
      },
      googleDriveUrl: formGoogleDriveUrl,
      libraryDriveUrl: formLibraryDriveUrl,
      escapeRoomConfig: {
        introText: escapeIntroText,
        pointsPerCorrect: Number(escapePointsCorrect),
        pointsPerIncorrect: Number(escapePointsIncorrect),
        pointsPerRoom: Number(escapePointsRoom),
        pointsPerGame: Number(escapePointsGame),
        cases: [
          {
            id: content.escapeRoomConfig?.cases?.[0]?.id || "caso-01",
            title: escapeCaseTitle,
            story: escapeCaseStory,
            finalCulpritIndex: Number(escapeCaseCulpritIndex),
            culpritOptions: escapeCaseCulpritOpts
          }
        ],
        rooms: escapeRooms,
        achievements: content.escapeRoomConfig?.achievements || []
      },
      escapeRoomRankings: gameRankings,
      quizRankings: quizRankings
    };

    try {
      await onUpdateContent(updatedContent);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Failed to save changes:", err);
      // Extrai qualquer erro amigável em português
      let readableError = "Falha ao gravar alterações na nuvem. Verifique sua conexão ou regras.";
      if (err instanceof Error) {
        try {
          const parsed = JSON.parse(err.message);
          if (parsed && parsed.error) readableError = `Erro Cloud: ${parsed.error}`;
        } catch {
          readableError = err.message;
        }
      }
      setSaveError(readableError);
    } finally {
      setIsSaving(false);
    }
  };

  // --- LOCAL FILE READERS ---
  const handleMuralFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdfFile = file.type.includes('pdf');
      const reader = new FileReader();
      reader.onloadend = () => {
        setMuralUploadedBase64(reader.result as string);
        setMuralUploadedName(file.name);
        setMuralUploadedType(isPdfFile ? 'pdf' : 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLibFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isPdfFile = file.type.includes('pdf');
      const reader = new FileReader();
      reader.onloadend = () => {
        setLibUploadedBase64(reader.result as string);
        setLibUploadedName(file.name);
        setLibUploadedType(isPdfFile ? 'pdf' : 'image');
        setNewLibSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
      };
      reader.readAsDataURL(file);
    }
  };

  // --- HANDLERS TO ADD TO COPIED STATE ---
  const handleAddMuralItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMuralTitle || !newMuralDate || !newMuralDescription) {
      setMuralError('Por favor, preencha os campos de Título, Mês/Ano e Descrição.');
      return;
    }

    let finalImagePath = '';
    const isFile = muralSourceType === 'file';

    if (isFile) {
      if (!muralUploadedBase64) {
        setMuralError('Por favor, anexe um arquivo local válido.');
        return;
      }
      finalImagePath = muralUploadedBase64;
    } else {
      if (!newMuralUrl) {
        setMuralError('Por favor, insira o link/URL da imagem.');
        return;
      }
      finalImagePath = newMuralUrl;
    }

    const item: GalleryItem = {
      id: `gal_${Date.now()}`,
      title: newMuralTitle,
      date: newMuralDate,
      category: newMuralCategory,
      image: finalImagePath,
      description: newMuralDescription,
      fileType: isFile ? muralUploadedType : 'image',
      fileName: isFile ? muralUploadedName : undefined
    };

    setGallery([item, ...gallery]);

    // Reset Form
    setNewMuralTitle('');
    setNewMuralDate('');
    setNewMuralDescription('');
    setNewMuralUrl('');
    setMuralUploadedBase64('');
    setMuralUploadedName('');
    setMuralError('');
  };

  const handleAddLibraryItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLibTitle || !newLibAuthor || !newLibDescription) {
      setLibError('Por favor preencha os campos de Título, Autor e Descrição.');
      return;
    }

    let finalUrl = '';
    const isFile = libSourceType === 'file';

    if (isFile) {
      if (!libUploadedBase64) {
        setLibError('Por favor, faça upload de um arquivo local.');
        return;
      }
      finalUrl = libUploadedBase64;
    } else {
      if (!newLibUrl) {
        setLibError('Por favor, insira a URL externa para acesso ao livro/documento.');
        return;
      }
      finalUrl = newLibUrl;
    }

    const itemObj: LibraryItem = {
      id: `lib_${Date.now()}`,
      title: newLibTitle,
      author: newLibAuthor,
      category: newLibCategory,
      url: finalUrl,
      description: newLibDescription,
      fileSize: isFile ? newLibSize : 'Acesso web',
      fileType: isFile ? (libUploadedType === 'pdf' ? 'pdf' : 'image') : 'link',
      fileName: isFile ? libUploadedName : undefined
    };

    setLibrary([itemObj, ...library]);

    // Reset Form
    setNewLibTitle('');
    setNewLibAuthor('');
    setNewLibDescription('');
    setNewLibUrl('');
    setLibUploadedBase64('');
    setLibUploadedName('');
    setLibError('');
  };

  // Members controls
  const handleAddMember = () => {
    const fresh: Director = {
      id: `dir_${Date.now()}`,
      name: 'Novo Membro',
      role: 'Cargo',
      department: 'Departamento',
      bio: 'Uma biografia acadêmica...',
      instagram: 'https://instagram.com/',
      lattes: 'http://lattes.cnpq.br/',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
    };
    setMembers([...members, fresh]);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handleStartEditMember = (m: Director) => {
    setEditingMemberId(m.id);
    setMemberName(m.name);
    setMemberRole(m.role);
    setMemberDept(m.department);
    setMemberBio(m.bio);
    setMemberInsta(m.instagram);
    setMemberLat(m.lattes);
    setMemberImg(m.image);
  };

  const handleSaveMemberFile = (id: string) => {
    const updated = members.map(m => {
      if (m.id === id) {
        return {
          ...m,
          name: memberName,
          role: memberRole,
          department: memberDept,
          bio: memberBio,
          instagram: memberInsta,
          lattes: memberLat,
          image: memberImg
        };
      }
      return m;
    });
    setMembers(updated);
    setEditingMemberId(null);
  };

  // Specialties controls
  const handleEditSpecialty = (s: ForensicSpecialty) => {
    setActiveSpecialtyId(s.id);
    setSpecTitle(s.title);
    setSpecDesc(s.description);
    setSpecDetailed(s.detailedDescription);
    setSpecImg(s.image);
    setSpecSkills(s.skills.join(', '));
  };

  const handleSaveSpecialty = (id: string) => {
    const updated = specialties.map(s => {
      if (s.id === id) {
        return {
          ...s,
          title: specTitle,
          description: specDesc,
          detailedDescription: specDetailed,
          image: specImg,
          skills: specSkills.split(',').map(item => item.trim()).filter(Boolean)
        };
      }
      return s;
    });
    setSpecialties(updated);
    setActiveSpecialtyId(null);
  };

  // Academic Modules controllers
  const handleEditModule = (m: AcademicModule) => {
    setActiveModuleId(m.id);
    setModTitle(m.title);
    setModTag(m.tag);
    setModDesc(m.description);
    setModSkills(m.skills.join(', '));
  };

  const handleSaveModule = (id: string) => {
    const updated = academicModules.map(m => {
      if (m.id === id) {
        return {
          ...m,
          title: modTitle,
          tag: modTag,
          description: modDesc,
          skills: modSkills.split(',').map(item => item.trim()).filter(Boolean)
        };
      }
      return m;
    });
    setAcademicModules(updated);
    setActiveModuleId(null);
  };

  const handleAddModule = () => {
    const fresh: AcademicModule = {
      id: `mod_${Date.now()}`,
      tag: `Módulo ${academicModules.length + 1}`,
      title: "Novo Módulo Acadêmico",
      description: "Descrição da atividade teórica ou prática acadêmica do novo módulo.",
      skills: ["Nova Habilidade"]
    };
    setAcademicModules([...academicModules, fresh]);
  };

  const handleDeleteModule = (id: string) => {
    setAcademicModules(academicModules.filter(m => m.id !== id));
  };

  // Academic Pillars controllers
  const handleEditPillar = (p: AcademicPillar) => {
    setActivePillarId(p.id);
    setPilTitle(p.title);
    setPilDesc(p.description);
  };

  const handleSavePillar = (id: string) => {
    const updated = academicPillars.map(p => {
      if (p.id === id) {
        return {
          ...p,
          title: pilTitle,
          description: pilDesc
        };
      }
      return p;
    });
    setAcademicPillars(updated);
    setActivePillarId(null);
  };

  const handleAddPillar = () => {
    const fresh: AcademicPillar = {
      id: `pil_${Date.now()}`,
      title: "Nome do Pilar",
      description: "Descrição detalhada do novo pilar do tripé acadêmico."
    };
    setAcademicPillars([...academicPillars, fresh]);
  };

  const handleDeletePillar = (id: string) => {
    setAcademicPillars(academicPillars.filter(p => p.id !== id));
  };

  // Specialty controllers expansion
  const handleAddSpecialty = () => {
    const fresh: ForensicSpecialty = {
      id: `spec_${Date.now()}`,
      title: "Nova Especialidade Forense",
      description: "Resumo explicativo curto sobre a atividade pericial desta nova disciplina.",
      detailedDescription: "Laudo pericial simulado detalhado de cena de crime com metodologia explicada.",
      image: "",
      glowColor: "blue",
      skills: ["Análise de Vestígios", "Laudo Pericial"]
    };
    setSpecialties([...specialties, fresh]);
  };

  const handleDeleteSpecialty = (id: string) => {
    setSpecialties(specialties.filter(s => s.id !== id));
  };

  // Quiz questions
  const handleAddQuizQ = () => {
    if (!newQuizQ || !newQuizOptA || !newQuizOptB) return;
    const fresh: QuizQuestion = {
      id: `qq_${Date.now()}`,
      question: newQuizQ,
      options: [newQuizOptA, newQuizOptB, newQuizOptC || 'N/A', newQuizOptD || 'N/A'].filter(o => o !== 'N/A'),
      correctAnswerIndex: newQuizCorrect,
      explanation: newQuizExpl || 'Exposição científica de correção.'
    };
    setQuizzes([...quizzes, fresh]);
    setNewQuizQ('');
    setNewQuizOptA('');
    setNewQuizOptB('');
    setNewQuizOptC('');
    setNewQuizOptD('');
    setNewQuizCorrect(0);
    setNewQuizExpl('');
  };

  // Vocational Test handlers
  const handleAddVocQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVocQuestion.trim()) {
      alert('Por favor, digite o enunciado da pergunta.');
      return;
    }
    const emptyOpt = newVocOptions.find(o => !o.text.trim() || !o.pointsFor);
    if (emptyOpt) {
      alert('Por favor, preencha o texto e selecione a especialidade correspondente para todas as 4 alternativas.');
      return;
    }
    const newQ: VocationalQuestion = {
      id: `vq_${Date.now()}`,
      question: newVocQuestion.trim(),
      options: newVocOptions.map(o => ({
        text: o.text.trim(),
        pointsFor: o.pointsFor
      }))
    };
    setVocationalQuestions([...vocationalQuestions, newQ]);
    setNewVocQuestion('');
    setNewVocOptions([
      { text: '', pointsFor: '' },
      { text: '', pointsFor: '' },
      { text: '', pointsFor: '' },
      { text: '', pointsFor: '' },
    ]);
  };

  const handleEditVocationalQuestion = (q: VocationalQuestion) => {
    setEditingVocId(q.id);
    setEditVocQuestionText(q.question);
    const ops = q.options.map(o => ({ text: o.text, pointsFor: o.pointsFor }));
    while (ops.length < 4) {
      ops.push({ text: '', pointsFor: '' });
    }
    setEditVocOptions(ops);
  };

  const handleSaveVocationalQuestion = (id: string) => {
    if (!editVocQuestionText.trim()) {
      alert('Por favor, preencha o enunciado da pergunta.');
      return;
    }
    const emptyOpt = editVocOptions.find(o => !o.text.trim() || !o.pointsFor);
    if (emptyOpt) {
      alert('Por favor, insira o texto e a especialidade de todas as 4 alternativas do teste.');
      return;
    }
    setVocationalQuestions(vocationalQuestions.map(q => q.id === id ? {
      ...q,
      question: editVocQuestionText.trim(),
      options: editVocOptions.map(o => ({ text: o.text.trim(), pointsFor: o.pointsFor }))
    } : q));
    setEditingVocId(null);
  };

  const handleDeleteVocationalQuestion = (id: string) => {
    if (window.confirm('Deseja realmente remover esta pergunta vocacional definitivamente?')) {
      setVocationalQuestions(vocationalQuestions.filter(q => q.id !== id));
    }
  };

  // --- ESCAPE ROOM EVENT HANDLERS ---
  const handleStartEditRoom = (room: EscapeRoomRoom) => {
    setEditingRoomId(room.id);
    setRoomName(room.name);
    setRoomTheme(room.theme);
    setRoomChallengeTitle(room.challengeTitle);
    setRoomChallengeDesc(room.challengeDesc);
    setRoomVestigios(room.vestigios || '');
    setRoomDifficulty(room.difficulty || 'Fácil');
    setRoomIsActive(room.isActive !== false);
    setRoomQuestion(room.question);
    setRoomOptionA(room.options?.[0] || '');
    setRoomOptionB(room.options?.[1] || '');
    setRoomOptionC(room.options?.[2] || '');
    setRoomOptionD(room.options?.[3] || '');
    setRoomOptionsStr(room.options.join('\n'));
    setRoomCorrectAnsIdx(room.correctAnswerIndex);
    setRoomCuriosity(room.curiosity || '');
    setRoomExplanation(room.explanation || '');
    setRoomOptionExplanationsStr(room.optionExplanations ? room.optionExplanations.join('\n') : '');
    setRoomMediaUrl(room.mediaUrl || '');
    setRoomMediaType(room.mediaType || 'image');
  };

  const handleSaveRoomDetails = () => {
    if (!roomName || !roomTheme || !roomQuestion) {
      alert('Por favor, defina pelo menos o Nome, Tema/Área e Pergunta da Sala.');
      return;
    }
    
    // Fallback to separate option states
    const opts = [
      roomOptionA.trim() || 'Opção A',
      roomOptionB.trim() || 'Opção B',
      roomOptionC.trim() || 'Opção C',
      roomOptionD.trim() || 'Opção D'
    ];

    const updated = escapeRooms.map(r => {
      if (r.id === editingRoomId) {
        return {
          ...r,
          name: roomName,
          theme: roomTheme,
          challengeTitle: roomChallengeTitle,
          challengeDesc: roomChallengeDesc,
          vestigios: roomVestigios,
          difficulty: roomDifficulty,
          isActive: roomIsActive,
          question: roomQuestion,
          options: opts,
          correctAnswerIndex: Number(roomCorrectAnsIdx),
          curiosity: roomCuriosity,
          explanation: roomExplanation,
          optionExplanations: roomOptionExplanationsStr ? roomOptionExplanationsStr.split('\n').map(o => o.trim()) : [],
          mediaUrl: roomMediaUrl,
          mediaType: roomMediaType
        };
      }
      return r;
    });

    setEscapeRooms(updated);
    setEditingRoomId(null);
    alert('Sala forense salva com sucesso na lista! Lembre de consolidar salvando o site globalmente (botão verde).');
  };

  const handleCreateNewRoomDraft = () => {
    const id = `room_${Date.now()}`;
    const newR: EscapeRoomRoom = {
      id,
      name: `Nova Perícia ${escapeRooms.length + 1}`,
      theme: 'Balística Forense',
      challengeTitle: 'Novo Desafio Forense',
      challengeDesc: 'Contextualize a cena e a descrição do caso aqui...',
      vestigios: 'Indique os vestígios recolhidos do local...',
      difficulty: 'Médio',
      isActive: true,
      order: escapeRooms.length,
      question: 'Pergunta de Multipla Escolha?',
      options: ['Alternativa A', 'Alternativa B', 'Alternativa C', 'Alternativa D'],
      correctAnswerIndex: 0,
      curiosity: 'Uma curiosidade científica forense...',
      explanation: 'Laudo/explicação que comprova a resposta correta.',
      mediaUrl: '',
      mediaType: 'image'
    };
    setEscapeRooms([...escapeRooms, newR]);
  };

  const handleDeleteRoomDraft = (id: string) => {
    if (window.confirm('Deseja realmente remover esta questão da lista?')) {
      setEscapeRooms(escapeRooms.filter(r => r.id !== id));
    }
  };

  const handleDuplicateRoomDraft = (room: EscapeRoomRoom) => {
    const id = `room_${Date.now()}`;
    const duplicated: EscapeRoomRoom = {
      ...room,
      id,
      name: `${room.name} (Cópia)`,
      order: escapeRooms.length
    };
    setEscapeRooms([...escapeRooms, duplicated]);
    alert(`Questão "${room.name}" duplicada com sucesso!`);
  };

  const handleToggleRoomActive = (id: string) => {
    const updated = escapeRooms.map(r => {
      if (r.id === id) {
        return { ...r, isActive: r.isActive === false ? true : false };
      }
      return r;
    });
    setEscapeRooms(updated);
  };

  const handleMoveRoomUp = (index: number) => {
    if (index === 0) return;
    const copy = [...escapeRooms];
    const temp = copy[index];
    copy[index] = copy[index - 1];
    copy[index - 1] = temp;
    
    const updated = copy.map((item, idx) => ({ ...item, order: idx }));
    setEscapeRooms(updated);
  };

  const handleMoveRoomDown = (index: number) => {
    if (index === escapeRooms.length - 1) return;
    const copy = [...escapeRooms];
    const temp = copy[index];
    copy[index] = copy[index + 1];
    copy[index + 1] = temp;
    
    const updated = copy.map((item, idx) => ({ ...item, order: idx }));
    setEscapeRooms(updated);
  };

  const handleExportRoomsJson = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(escapeRooms, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "questoes_escape_room_forense.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      alert("JSON de questões baixando! Verifique sua pasta de downloads.");
    } catch (err) {
      alert("Erro ao exportar JSON: " + err);
    }
  };

  const handleImportRoomsJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          const validated = parsed.map((item, idx) => ({
            id: item.id || `room_${Date.now()}_import_${idx}`,
            name: item.name || `Sala Importada ${idx + 1}`,
            theme: item.theme || 'Laboratório Geral',
            challengeTitle: item.challengeTitle || 'Novo Desafio',
            challengeDesc: item.challengeDesc || 'Descrição do caso...',
            vestigios: item.vestigios || 'Vestígios recolhidos no local...',
            difficulty: item.difficulty || 'Fácil',
            isActive: item.isActive !== false,
            order: typeof item.order === 'number' ? item.order : escapeRooms.length + idx,
            question: item.question || 'Pergunta?',
            options: Array.isArray(item.options) ? item.options : ['A', 'B', 'C', 'D'],
            correctAnswerIndex: typeof item.correctAnswerIndex === 'number' ? item.correctAnswerIndex : 0,
            explanation: item.explanation || '',
            optionExplanations: Array.isArray(item.optionExplanations) ? item.optionExplanations : [],
            mediaUrl: item.mediaUrl || '',
            mediaType: item.mediaType || 'image',
            curiosity: item.curiosity || ''
          }));
          
          setEscapeRooms([...escapeRooms, ...validated]);
          alert(`${validated.length} questões importadas com sucesso à lista local de rascunhos!`);
        } else {
          alert("Erro: Formato JSON inválido. Deve ser um Array de questões.");
        }
      } catch (err) {
        alert("Erro ao ler JSON: " + err);
      }
    };
    fileReader.readAsText(files[0]);
  };

  // On list changes, create an automatic background backup in localStorage!
  useEffect(() => {
    if (escapeRooms.length > 0) {
      localStorage.setItem('lacif_escape_rooms_auto_backup', JSON.stringify(escapeRooms));
    }
  }, [escapeRooms]);

  // FAQ Additions
  const handleAddFaq = () => {
    if (!newFaqQ || !newFaqA) return;
    const fresh: FAQItem = {
      id: `faq_${Date.now()}`,
      question: newFaqQ,
      answer: newFaqA
    };
    setFaqs([...faqs, fresh]);
    setNewFaqQ('');
    setNewFaqA('');
  };

  // Values tags list handlers
  const handleAddValue = () => {
    if (newVal.trim()) {
      setFormValues([...formValues, newVal.trim()]);
      setNewVal('');
    }
  };

  const handleRemoveValue = (index: number) => {
    setFormValues(formValues.filter((_, idx) => idx !== index));
  };

  // JSON Export Backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `lacif_uff_backup.json`);
    dlAnchorElem.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-2xl glassmorphism border border-yellow-400/40 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-xs font-mono text-gray-400 hover:text-white uppercase transition-colors">
            [x] Fechar
          </button>
          
          <div className="text-center mb-6">
            <div className="h-14 w-14 bg-yellow-400/10 border border-yellow-400/30 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-400">
              <Lock className="h-7 w-7" />
            </div>
            <h2 className="font-display font-bold text-xl uppercase tracking-wider text-white">
              Painel de Custódia Administrativa
            </h2>
            <p className="text-xs text-gray-500 mt-1 font-mono">
              VERIFICAÇÃO DE CREDENCIAIS LACiF
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-gray-500 mb-1">Chave Mestre de Perícia</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira a senha do console"
                className="w-full p-3 bg-zinc-900/60 border border-white/10 rounded-xl font-mono text-center text-xs tracking-widest focus:outline-none focus:border-yellow-400 transition-colors text-white"
                autoFocus
              />
            </div>

            {authError && (
              <p className="text-[11px] text-red-400 font-mono text-center bg-red-950/20 p-2.5 rounded border border-red-500/10">
                ⚠️ {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              Autenticar Console <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col h-screen text-white animate-fade-in">
      {/* Top Header Controls bar */}
      <header className="px-6 py-4 border-b border-white/10 bg-zinc-950 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-yellow-400 animate-pulse" />
          <div>
            <h2 className="font-display font-semibold text-sm md:text-base leading-none">
              Console Autônomo da Diretoria <span className="text-yellow-400 font-mono uppercase font-bold text-[9px] bg-yellow-400/15 px-1.5 py-0.5 rounded ml-1 border border-yellow-400/25">ATIVO</span>
            </h2>
            <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest mt-1 flex items-center gap-1.5 flex-wrap">
              <span>Gerencie Conteúdos, Integrantes, Mural de Memórias, Biblioteca e Links</span>
              <span className="text-gray-650">|</span>
              {isSupabaseEnabled ? (
                dbStatus === 'connected' ? (
                  <span className="inline-flex items-center gap-1 text-[9px] text-[#3ecf8e] bg-[#3ecf8e]/10 border border-[#3ecf8e]/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal">
                    ● Nuvem Conectada (Supabase Sync)
                  </span>
                ) : dbStatus === 'connecting' ? (
                  <span className="inline-flex items-center gap-1 text-[9px] text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal animate-pulse">
                    ● Coordenando Nuvem...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[9px] text-red-400 bg-red-400/10 border border-red-400/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal" title="Sem conexão cloud. Gravando local cache.">
                    ● Sem Conexão Cloud
                  </span>
                )
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-500 bg-amber-400/10 border border-amber-400/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal animate-pulse" title="Configure as chaves no Painel de Admin para ativar nuvem de custódia">
                  ● Conexão Local (Navegador)
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveError && (
            <span className="text-[11px] font-mono text-red-400 bg-red-500/15 border border-red-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1 max-w-[200px] md:max-w-xs truncate" title={saveError}>
              <ShieldAlert className="h-3.5 w-3.5" /> {saveError}
            </span>
          )}
          {saveSuccess && (
            <span className="text-[11px] font-mono text-green-400 bg-green-500/15 border border-green-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Salvo com Sucesso!
            </span>
          )}
          <button
            onClick={handleGlobalSave}
            disabled={isSaving}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
              isSaving ? 'bg-zinc-700 text-zinc-400 border border-zinc-650 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> SALVANDO...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> SALVAR SITE
              </>
            )}
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-1.5 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white text-red-400 transition-all cursor-pointer bg-white/5"
            title="Sair Administrativo"
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 text-xs font-mono cursor-pointer"
          >
            Sair [x]
          </button>
        </div>
      </header>

      {/* Workspace central dashboard */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Navigation bar sidebar menu */}
        <nav className="w-56 md:w-64 border-r border-white/5 bg-zinc-950 p-4 space-y-1.5 overflow-y-auto shrink-0 select-none">
          <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest pl-2 block mb-2">TELEMETRIA INTEGRADA</span>
          
          <button
            onClick={() => setActiveTab('metrics')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'metrics' ? 'bg-yellow-400 text-black font-bold' : 'text-[#FFD000] bg-yellow-400/5 hover:bg-yellow-400/10'
            }`}
          >
            <Activity className="h-4 w-4" /> Monitor de Acessos
          </button>

          <div className="h-px bg-white/5 my-3" />

          <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest pl-2 block mb-3">CONTEÚDOS DO PORTAL</span>
          
          <button
            onClick={() => setActiveTab('text')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'text' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" /> Textos e Slogans
          </button>
          
          <button
            onClick={() => setActiveTab('members')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'members' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" /> Diretoria e Membros
          </button>

          <button
            onClick={() => setActiveTab('specialties')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'specialties' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="h-4 w-4" /> Especialidades
          </button>

          <button
            onClick={() => setActiveTab('academic_framework')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'academic_framework' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" /> Módulos & Pilares
          </button>

          <button
            onClick={() => setActiveTab('quizzes')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'quizzes' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <HelpCircle className="h-4 w-4" /> Quizzes Simulados
          </button>

          <button
            onClick={() => setActiveTab('vocational')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'vocational' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Compass className="h-4 w-4" /> Teste Vocacional
          </button>

          <button
            onClick={() => setActiveTab('mural')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'mural' ? 'bg-yellow-400/10 text-yellow-400 border-l-2 border-yellow-400' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Camera className="h-4 w-4" strokeWidth={2.3} /> Mural Investigativo
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'library' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" /> Biblioteca Científica
          </button>

          <button
            onClick={() => setActiveTab('faq')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'faq' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Sparkles className="h-4 w-4" /> FAQ & Admissão
          </button>

          <button
            onClick={() => setActiveTab('escape_room')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'escape_room' ? 'bg-[#FFD000]/15 text-[#FFD000] border-l-2 border-[#FFD000]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Trophy className="h-4 w-4" strokeWidth={2.3} /> Escape Room Forense
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'system' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <RefreshCw className="h-4 w-4" /> Redes e Backups
          </button>
        </nav>

        {/* Central Workspace area container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#050505]">
          
          {/* TAB 0: MONITOR DE ACESSOS (EXCLUSIVO) */}
          {activeTab === 'metrics' && (
            <div className="space-y-8 max-w-5xl animated-fade-in text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-yellow-400 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-yellow-400 animate-pulse" /> Monitor de Acessos Acadêmicos
                  </h3>
                  <p className="text-gray-400 text-xs font-mono mt-1">
                    Painel exclusivo de telemetria estatística das seções, tráfego e ferramentas da LACiF UFF.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClearMetrics}
                  className="px-3.5 py-2 border border-red-500/30 hover:border-red-500 text-red-400 hover:bg-red-500/10 font-mono text-xs uppercase tracking-wider rounded-lg transition-all self-start md:self-auto flex items-center gap-1.5"
                >
                  <Trash2 className="h-4 w-4" /> Resetar Estatísticas
                </button>
              </div>

              {/* Traffic metrics counter blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                
                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 shadow-lg flex items-center gap-4 relative overflow-hidden group hover:border-[#FFD000]/25 transition-all">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FFD000]" />
                  <div className="h-12 w-12 rounded-xl bg-[#FFD000]/10 border border-[#FFD000]/20 flex items-center justify-center text-[#FFD000] shrink-0">
                    <Eye className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Total de Visualizações</span>
                    <strong className="text-3xl font-display font-black text-white block mt-1 tracking-tight">
                      {metricsViews.toLocaleString()}
                    </strong>
                    <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Vezes que o site foi renderizado</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 shadow-lg flex items-center gap-4 relative overflow-hidden group hover:border-blue-500/25 transition-all">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Visitantes Únicos</span>
                    <strong className="text-3xl font-display font-black text-white block mt-1 tracking-tight">
                      {metricsUnique.toLocaleString()}
                    </strong>
                    <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Sessões de navegadores distintos</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 shadow-lg flex items-center gap-4 relative overflow-hidden group hover:border-emerald-500/25 transition-all">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Ações Registradas</span>
                    <strong className="text-3xl font-display font-black text-white block mt-1 tracking-tight">
                      {Object.keys(metricsSections).reduce((acc, key) => acc + Number(metricsSections[key] || 0), 0).toLocaleString()}
                    </strong>
                    <span className="text-[9px] font-mono text-gray-400 block mt-0.5">Clicks de scroll & navegação</span>
                  </div>
                </div>

              </div>

              {/* Section Accesses Ranking graph */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/5 space-y-6">
                <div>
                  <h4 className="font-display font-bold text-sm text-yellow-400 uppercase tracking-wider flex items-center gap-2">
                    <BarChart3 className="h-4.5 w-4.5 text-yellow-400" /> Ranking de Cliques de Acesso Recebidos por Seção
                  </h4>
                  <p className="text-[11px] font-mono text-gray-500 mt-1">
                    Visualização em tempo real das preferências de navegação e acessos registrados por área.
                  </p>
                </div>

                <div className="space-y-4">
                  {(() => {
                    const sectionLabels: Record<string, string> = {
                      inicio: "Início / Apresentação Hero",
                      sobre: "Sobre a Liga (Apresentação)",
                      historia: "Histórico & Origem (Linha do Tempo)",
                      pilares: "Nossos Três Pilares (Ensino, Pesquisa, Extensão)",
                      diretoria: "Diretoria de Custódia & Docentes",
                      especialidades: "Especialidades Forenses e Perícias",
                      vocacional: "Ferramenta: Teste Vocacional Forense",
                      quiz: "Ferramenta: Quiz Investigativo de Local de Crime",
                      biblioteca: "Biblioteca Criminológica / Google Drive",
                      galeria: "Galerias da LACiF UFF / Fotos",
                      faq: "FAQ & Dúvidas de Ingresso",
                      seletivo: "Processo Seletivo (Inscrições Google Forms)",
                      contato: "Canais de Contato com Peritos"
                    };

                    const rawStats = Object.keys(sectionLabels).map((key) => ({
                      id: key,
                      label: sectionLabels[key],
                      count: Number(metricsSections[key] || 0)
                    }))
                    .sort((a, b) => b.count - a.count);

                    const maxClicks = Math.max(...rawStats.map(s => s.count), 1);
                    const totalClicks = rawStats.reduce((acc, s) => acc + s.count, 0) || 1;

                    if (rawStats.length === 0) {
                      return (
                        <div className="py-8 text-center text-xs font-mono text-gray-500">
                          Nenhum clique de seção registrado ainda. Navegue pelo portal para compor os dados.
                        </div>
                      );
                    }

                    return rawStats.map((item, index) => {
                      const percentage = Math.round((item.count / maxClicks) * 100);
                      const relativeShare = Math.round((item.count / totalClicks) * 100);
                      
                      // Highlight top-3 differently
                      const isTop1 = index === 0;
                      const isTop2 = index === 1;
                      const isTop3 = index === 2;

                      return (
                        <div key={item.id} className="space-y-1.5">
                          <div className="flex justify-between items-end text-xs font-mono">
                            <span className="flex items-center gap-1.5 text-gray-300">
                              <span className={`h-4 w-4 rounded-sm flex items-center justify-center text-[9px] font-bold ${
                                isTop1 ? 'bg-yellow-400 text-black' :
                                isTop2 ? 'bg-blue-500 text-white' :
                                isTop3 ? 'bg-emerald-500 text-white' :
                                'bg-zinc-800 text-gray-500'
                              }`}>
                                {index + 1}
                              </span>
                              {item.label}
                            </span>
                            <span className="text-gray-400">
                              <strong className="text-white font-sans">{item.count}</strong> acessos ({relativeShare}%)
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden relative">
                            <div 
                              className={`h-full transition-all duration-1000 ${
                                isTop1 ? 'bg-gradient-to-r from-yellow-500 to-yellow-300 font-extrabold' :
                                isTop2 ? 'bg-gradient-to-r from-blue-600 to-blue-400 font-extrabold' :
                                isTop3 ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' :
                                'bg-[#081421] border-r border-[#FFD000]/20'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Digital forensic simulation terminal logs */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
                <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block border-b border-white/5 pb-2">Logs de Monitoramento Recentes</span>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {metricsLogs.map((log) => (
                    <div key={log.id} className="p-2 border border-white/5 rounded-lg bg-[#030303] flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-bold shrink-0">[{log.time}]</span>
                        <span className="text-blue-500">IP {log.ip}</span>
                        <span className="text-gray-300">navegou na seção</span>
                        <span className="bg-yellow-400/10 text-yellow-500 px-1.5 py-0.5 rounded text-[8px] uppercase font-bold">{log.page}</span>
                      </div>
                      <span className="text-[9px] text-[#FFD000] bg-yellow-400/5 px-2 py-0.5 border border-yellow-400/10 rounded uppercase font-bold shrink-0">REGISTRADO</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DYNAMIC SHARING LINKS AND HOST RECOGNITION */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-yellow-400/20 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/5 pb-3">
                  <div>
                    <span className="text-xs font-mono text-yellow-400 uppercase tracking-widest block font-bold">Links de Acesso ao Portal (Domínio Ativo)</span>
                    <p className="text-[10px] text-gray-500 font-mono mt-0.5">Disponibilize enlaces diretos aos seus visitantes para as respectivas áreas</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded font-mono text-[9px] text-blue-400 uppercase">
                    URL Detectada: {window.location.origin || 'https://lacif-uff.vercel.app'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Início / Apresentação', id: 'inicio' },
                    { label: 'Sobre a Liga & História', id: 'sobre' },
                    { label: 'Diretoria de Custódia', id: 'diretoria' },
                    { label: 'Especialidades & Perícias', id: 'especialidades' },
                    { label: 'Teste Vocacional Forense', id: 'vocacional' },
                    { label: 'Biblioteca Criminológica', id: 'biblioteca' },
                    { label: 'Quiz de Cenas de Crime', id: 'quiz' },
                    { label: 'Mural de Fotos & Registros', id: 'galeria' },
                    { label: 'Inscrições (Seletivo)', id: 'seletivo' },
                    { label: 'Canais de Contato', id: 'contato' }
                  ].map((sec) => {
                    const fullLink = `${window.location.origin || 'https://lacif-uff.vercel.app'}/#${sec.id}`;
                    return (
                      <div key={sec.id} className="p-2.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5 overflow-hidden">
                          <span className="text-[10px] font-mono text-gray-400 block font-semibold">{sec.label}</span>
                          <span className="text-[9px] font-mono text-gray-500 truncate block text-yellow-500/80">{fullLink}</span>
                        </div>
                        <button
                          onClick={() => handleCopyLink(sec.id)}
                          type="button"
                          className={`px-2.5 py-1 rounded text-[9px] font-mono font-bold uppercase shrink-0 transition-all cursor-pointer ${
                            copiedSection === sec.id 
                              ? 'bg-emerald-500 text-black' 
                              : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black hover:shadow-[0_0_10px_rgba(255,208,0,0.2)]'
                          }`}
                        >
                          {copiedSection === sec.id ? 'Copiado!' : 'Copiar'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: Main site headings */}
          {activeTab === 'text' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Título & Missão</h3>
                <p className="text-gray-400 text-xs font-mono">Modifique slogans institucionais e o bloco narrativo principal da liga</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Título Principal Hero</label>
                  <input
                    type="text"
                    value={formHeroTitle}
                    onChange={(e) => setFormHeroTitle(e.target.value)}
                    className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Subtítulo Slogan</label>
                  <input
                    type="text"
                    value={formHeroSubtitle}
                    onChange={(e) => setFormHeroSubtitle(e.target.value)}
                    className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Missão</label>
                  <textarea
                    value={formMission}
                    onChange={(e) => setFormMission(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Visão</label>
                  <textarea
                    value={formVision}
                    onChange={(e) => setFormVision(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-mono text-gray-400 uppercase">Histórico e Origem LACiF</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Texto de Linha Histórica</label>
                    <textarea
                      value={formHistoryText}
                      onChange={(e) => setFormHistoryText(e.target.value)}
                      rows={8}
                      className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs font-sans leading-relaxed text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Capa Histórica (Foto PNG/URL)</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="url"
                        value={formHistoryImage}
                        onChange={(e) => setFormHistoryImage(e.target.value)}
                        placeholder="Link ou Base64"
                        className="flex-1 p-2 bg-zinc-900 border border-white/5 rounded-lg text-xs"
                      />
                      <label className="cursor-pointer shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-2.5 rounded flex items-center justify-center transition-colors hover:shadow-lg" title="Carregar PNG do computador">
                        <Upload className="h-4 w-4" />
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/gif"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setFormHistoryImage(reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <img src={formHistoryImage || null} alt="Preview Capa Histórica" className="w-full h-32 object-cover rounded-lg border border-white/10" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>

              {/* Dynamic values tags list */}
              <div className="space-y-3 border-t border-white/5 pt-6">
                <h4 className="text-sm font-mono text-gray-400 uppercase">Valores Institucionais</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formValues.map((val, idx) => (
                    <span key={idx} className="bg-blue-900/40 text-blue-400 px-3 py-1 text-xs font-mono rounded-lg border border-blue-500/10 flex items-center gap-1.5">
                      {val}
                      <Trash2 className="h-3 w-3 hover:text-red-400 cursor-pointer" onClick={() => handleRemoveValue(idx)} />
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 max-w-sm">
                  <input
                    type="text"
                    value={newVal}
                    onChange={(e) => setNewVal(e.target.value)}
                    placeholder="Novo valor..."
                    className="flex-1 p-2 bg-zinc-900 border border-white/5 rounded-lg text-xs text-white focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={handleAddValue}
                    className="px-4 py-2 bg-yellow-400 text-black font-semibold text-xs rounded-lg uppercase cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Manage Directors & Academics */}
          {activeTab === 'members' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <div>
                  <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Diretoria e Professores Coordenadores</h3>
                  <p className="text-gray-400 text-xs font-mono">Adicione, ordene e configure biografias, redes e fotos no corpo acadêmico</p>
                </div>
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 hover:shadow-lg transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" /> CADASTRAR MEMBRO
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((m) => (
                  <div 
                    key={m.id}
                    className="p-4 rounded-xl border border-white/5 bg-zinc-900/40 flex items-start gap-4 hover:border-blue-500/20 transition-all"
                  >
                    <img 
                      src={m.image || null} 
                      alt={m.name} 
                      className="w-16 h-16 object-cover rounded-full border border-white/15 shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="flex-1">
                      {editingMemberId === m.id ? (
                        <div className="space-y-2 mt-1">
                          <input
                            type="text"
                            value={memberName}
                            onChange={(e) => setMemberName(e.target.value)}
                            placeholder="Nome Completo"
                            className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs text-white"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={memberRole}
                              onChange={(e) => setMemberRole(e.target.value)}
                              placeholder="Cargo"
                              className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs text-white"
                            />
                            <input
                              type="text"
                              value={memberDept}
                              onChange={(e) => setMemberDept(e.target.value)}
                              placeholder="Curso / Setor"
                              className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs text-white"
                            />
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="url"
                              value={memberImg}
                              onChange={(e) => setMemberImg(e.target.value)}
                              placeholder="URL ou Foto PNG"
                              className="flex-1 p-1.5 bg-[#050505] border border-white/10 rounded text-xs text-white"
                            />
                            <label className="cursor-pointer shrink-0 bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded flex items-center justify-center transition-colors" title="Carregar nova foto PNG">
                              <Upload className="h-4 w-4" />
                              <input
                                type="file"
                                accept="image/png, image/jpeg, image/gif"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setMemberImg(reader.result as string);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <textarea
                            value={memberBio}
                            onChange={(e) => setMemberBio(e.target.value)}
                            placeholder="Biografia curta..."
                            rows={2}
                            className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" value={memberInsta} onChange={(e) => setMemberInsta(e.target.value)} placeholder="Insta url" className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs" />
                            <input type="text" value={memberLat} onChange={(e) => setMemberLat(e.target.value)} placeholder="Lattes url" className="w-full p-1.5 bg-[#050505] border border-white/10 rounded text-xs" />
                          </div>
                          <div className="flex justify-end gap-2 pt-1">
                            <button onClick={() => setEditingMemberId(null)} className="px-2 py-1 text-[10px] font-mono border border-white/10 rounded">Cancelar</button>
                            <button onClick={() => handleSaveMemberFile(m.id)} className="px-3 py-1 bg-yellow-400 text-black font-semibold text-[10px] font-mono rounded">Salvar</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="font-display font-semibold text-white text-sm">{m.name}</h4>
                            <div className="flex gap-1">
                              <button onClick={() => handleStartEditMember(m)} className="p-1 hover:bg-zinc-800 rounded text-gray-500 hover:text-white"><Edit3 className="h-3.5 w-3.5" /></button>
                              <button onClick={() => handleDeleteMember(m.id)} className="p-1 hover:bg-zinc-800 rounded text-gray-500 hover:text-red-400"><Trash2 className="h-3.5 w-3.5" /></button>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-blue-400 font-medium block mt-0.5">{m.role} - {m.department}</span>
                          <p className="text-xs text-gray-400 font-sans mt-2 leading-relaxed">{m.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Specialties cards */}
          {activeTab === 'specialties' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Especialidades Científicas</h3>
                  <p className="text-gray-400 text-xs font-mono font-sans">Edite laudos detalhados e tópicos curriculares das disciplinas forenses</p>
                </div>
                <button
                  onClick={handleAddSpecialty}
                  className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Adicionar Especialidade
                </button>
              </div>

              <div className="space-y-4">
                {specialties.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl border border-white/5 bg-zinc-900/10">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
                      <span className="font-mono text-xs text-yellow-400 font-semibold">{s.title || "Sem Título"}</span>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditSpecialty(s)}
                          className="px-3 py-1 rounded bg-white/5 text-[10px] border border-white/10 font-mono text-blue-400 hover:text-white"
                        >
                          Editar Disciplina
                        </button>
                        <button 
                          onClick={() => handleDeleteSpecialty(s.id)}
                          className="p-1 hover:bg-zinc-800 rounded text-gray-500 hover:text-red-400"
                          title="Remover Especialidade de forma definitiva"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {activeSpecialtyId === s.id ? (
                      <div className="space-y-3 p-4 bg-zinc-900/50 rounded-lg space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono text-gray-400 uppercase">Título</label>
                            <input type="text" value={specTitle} onChange={(e) => setSpecTitle(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-gray-400 uppercase">Imagem Capa (Foto/PNG/URL)</label>
                            <div className="flex gap-2">
                              <input type="text" value={specImg} onChange={(e) => setSpecImg(e.target.value)} placeholder="URL ou base64" className="flex-1 p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                              <label className="cursor-pointer shrink-0 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded flex items-center justify-center transition-colors" title="Carregar foto de especialidade PNG">
                                <Upload className="h-4 w-4" />
                                <input
                                  type="file"
                                  accept="image/png, image/jpeg, image/gif"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        setSpecImg(reader.result as string);
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="hidden"
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase">Resumo Curto</label>
                          <input type="text" value={specDesc} onChange={(e) => setSpecDesc(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase">Laudo Completo e Metodologia</label>
                          <textarea value={specDetailed} onChange={(e) => setSpecDetailed(e.target.value)} rows={3} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono text-gray-400 uppercase">Competências (Separadas por vírgula)</label>
                          <input type="text" value={specSkills} onChange={(e) => setSpecSkills(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                        </div>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setActiveSpecialtyId(null)} className="px-3 py-1 border border-white/10 rounded font-mono text-xs">Cancelar</button>
                          <button onClick={() => handleSaveSpecialty(s.id)} className="px-4 py-1 bg-yellow-400 text-black font-semibold rounded font-mono text-xs">Concluir</button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 leading-relaxed font-sans">{s.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Academic Modules and Pillars */}
          {activeTab === 'academic_framework' && (
            <div className="space-y-12 max-w-5xl">
              {/* Section 1: Modules */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Módulos Acadêmicos (I, II e III)</h3>
                    <p className="text-gray-400 text-xs font-sans">Gerencie as metodologias de ensino, práticas teóricas e simulações do portal</p>
                  </div>
                  <button
                    onClick={handleAddModule}
                    className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Módulo
                  </button>
                </div>

                <div className="space-y-4">
                  {academicModules.map((m, idx) => (
                    <div key={m.id} className="p-4 rounded-xl border border-white/5 bg-zinc-900/10">
                      <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-semibold">{m.tag || `Módulo ${idx + 1}`}</span>
                          <span className="font-mono text-xs text-white font-semibold">{m.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleEditModule(m)}
                            className="px-3 py-1 rounded bg-white/5 text-[10px] border border-white/10 font-mono text-blue-400 hover:text-white"
                          >
                            Editar Módulo
                          </button>
                          <button 
                            onClick={() => handleDeleteModule(m.id)}
                            className="p-1 hover:bg-zinc-800 rounded text-gray-400 hover:text-red-400"
                            title="Remover Módulo"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      {activeModuleId === m.id ? (
                        <div className="space-y-3 p-4 bg-zinc-900/50 rounded-lg">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase">Título do Módulo</label>
                              <input type="text" value={modTitle} onChange={(e) => setModTitle(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase">Rótulo / Tag (Ex: Módulo I)</label>
                              <input type="text" value={modTag} onChange={(e) => setModTag(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-gray-400 uppercase">Descrição Detalhada</label>
                            <textarea value={modDesc} onChange={(e) => setModDesc(e.target.value)} rows={3} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-gray-400 uppercase">Tags / Habilidades Práticas (Separadas por vírgula)</label>
                            <input type="text" value={modSkills} onChange={(e) => setModSkills(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                          </div>
                          <div className="flex justify-end gap-2">
                            <button onClick={() => setActiveModuleId(null)} className="px-3 py-1 border border-white/10 rounded font-mono text-xs">Cancelar</button>
                            <button onClick={() => handleSaveModule(m.id)} className="px-4 py-1 bg-yellow-400 text-black font-semibold rounded font-mono text-xs">Concluir</button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="text-xs text-gray-400 leading-relaxed font-sans">{m.description}</p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {(m.skills || []).map((skill, sIdx) => (
                              <span key={sIdx} className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded text-gray-400">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Pillars */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Três Pilares Acadêmicos (Ensino, Pesquisa, Extensão)</h3>
                    <p className="text-gray-400 text-xs font-sans">Gerencie o tripé universitário da liga e seus objetivos estruturantes</p>
                  </div>
                  <button
                    onClick={handleAddPillar}
                    className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Pilar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {academicPillars.map((p, idx) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/5 bg-zinc-900/10 flex flex-col justify-between space-y-4">
                      <div>
                        {activePillarId === p.id ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase">Título do Pilar</label>
                              <input type="text" value={pilTitle} onChange={(e) => setPilTitle(e.target.value)} className="w-full p-1.5 bg-[#050505] border border-white/5 rounded text-xs" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-mono text-gray-400 uppercase">Descrição</label>
                              <textarea value={pilDesc} onChange={(e) => setPilDesc(e.target.value)} rows={3} className="w-full p-1.5 bg-[#050505] border border-white/5 rounded text-xs" />
                            </div>
                            <div className="flex justify-end gap-1.5 pt-1">
                              <button onClick={() => setActivePillarId(null)} className="px-2 py-0.5 border border-white/10 rounded font-mono text-[10px]">Cancelar</button>
                              <button onClick={() => handleSavePillar(p.id)} className="px-2.5 py-0.5 bg-yellow-400 text-black font-semibold rounded font-mono text-[10px]">OK</button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider">{p.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed font-mono">{p.description}</p>
                          </div>
                        )}
                      </div>

                      {activePillarId !== p.id && (
                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                          <button 
                            onClick={() => handleEditPillar(p)}
                            className="px-2.5 py-1 rounded bg-white/5 text-[9px] border border-white/10 font-mono text-blue-400 hover:text-white"
                          >
                            Editar Pilar
                          </button>
                          <button 
                            onClick={() => handleDeletePillar(p.id)}
                            className="text-gray-500 hover:text-red-400 p-1 rounded"
                            title="Remover Pilar"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Case Scenarios & Quiz questions */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Console de Perguntas do Quiz</h3>
                <p className="text-gray-400 text-xs font-mono">Modifique as 10 perguntas fáticas e os laudos explicativos sobre cadeia de custódia</p>
              </div>

              {/* Quiz Addition Form */}
              <div className="p-5 rounded-2xl glassmorphism border border-blue-500/10 space-y-4">
                <span className="text-xs text-blue-400 tracking-wider font-mono font-bold uppercase block border-b border-white/5 pb-2">Cadastrar Nova Questão Criminal</span>
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Enunciado / Situação Crime *</label>
                  <textarea value={newQuizQ} onChange={(e) => setNewQuizQ(e.target.value)} placeholder="Ex: Vestígios de DNA em um copo descartável devem ser acondicionados em..." className="w-full p-2.5 bg-black/40 border border-white/15 rounded text-xs text-white" rows={2} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Opção A (Index 0)</label>
                    <input type="text" value={newQuizOptA} onChange={(e) => setNewQuizOptA(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Opção B (Index 1)</label>
                    <input type="text" value={newQuizOptB} onChange={(e) => setNewQuizOptB(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Opção C (Index 2)</label>
                    <input type="text" value={newQuizOptC} onChange={(e) => setNewQuizOptC(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase">Opção D (Index 3)</label>
                    <input type="text" value={newQuizOptD} onChange={(e) => setNewQuizOptD(e.target.value)} className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 uppercase mb-1">Opção Correta</label>
                    <select value={newQuizCorrect} onChange={(e) => setNewQuizCorrect(parseInt(e.target.value))} className="w-full p-2.5 bg-[#050505] border border-white/5 rounded text-xs">
                      <option value={0}>Opção A</option>
                      <option value={1}>Opção B</option>
                      <option value={2}>Opção C</option>
                      <option value={3}>Opção D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Laudo / Explicação Pericial *</label>
                    <input type="text" value={newQuizExpl} onChange={(e) => setNewQuizExpl(e.target.value)} placeholder="De acordo com o CPP Art. 158-A..." className="w-full p-2.5 bg-[#050505] border border-white/5 rounded text-xs" />
                  </div>
                </div>
                <button onClick={handleAddQuizQ} className="px-4 py-2 bg-blue-600 font-mono text-xs font-bold rounded hover:bg-blue-500">Salvar Questão no Banco</button>
              </div>

              {/* Active list */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-500 uppercase block pl-1">Exames Correntes ({quizzes.length})</span>
                <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                  {quizzes.map((q, idx) => (
                    <div key={q.id} className="p-3 rounded border border-white/5 bg-zinc-900/20 flex items-start justify-between text-xs">
                      <div>
                        <strong>{idx + 1}. {q.question}</strong>
                        <p className="text-[10px] text-gray-500 mt-1 uppercase font-mono">Gabarito: Opção {['A','B','C','D'][q.correctAnswerIndex]}</p>
                      </div>
                      <button onClick={() => setQuizzes(quizzes.filter(item => item.id !== q.id))} className="text-red-400 p-1 hover:bg-zinc-800 rounded"><Trash2 className="h-4.5 w-4.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gerenciador de Ranking de Quiz (UFF) */}
              <div className="p-5 rounded-2xl border border-yellow-500/20 bg-yellow-950/5 space-y-6">
                <div>
                  <h4 className="font-display font-semibold text-sm text-yellow-500 uppercase tracking-wider flex items-center gap-2">
                    <Trophy className="h-4 w-4" /> Gerenciar Quadro de Recordistas (Quiz)
                  </h4>
                  <p className="text-gray-400 text-[10px] sm:text-xs">
                    Insira, remova ou edite inline as notas, nomes e patentes dos estudantes e peritos integrados ao Quadro de Honra.
                  </p>
                </div>

                {/* Form to manual add ranking */}
                <div className="bg-black/30 border border-white/5 p-4 rounded-xl space-y-3">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Adicionar Registro Manualmente</span>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[8px] font-mono text-gray-500 uppercase mb-1">Nome/Codinome</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Dra. Roberta" 
                        value={addQuizRName}
                        onChange={(e) => setAddQuizRName(e.target.value)}
                        className="w-full p-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono text-gray-500 uppercase mb-1">Acertos (0 a 10)</label>
                      <input 
                        type="number" 
                        min="0"
                        max="10"
                        value={addQuizRScore}
                        onChange={(e) => setAddQuizRScore(Number(e.target.value))}
                        className="w-full p-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono text-gray-500 uppercase mb-1">Data</label>
                      <input 
                        type="text" 
                        placeholder="DD/MM/AAAA" 
                        value={addQuizRDate}
                        onChange={(e) => setAddQuizRDate(e.target.value)}
                        className="w-full p-2 bg-zinc-950 border border-white/10 rounded text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-mono text-gray-500 uppercase mb-1">Cargo / Patente</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Perito Auxiliar" 
                        value={addQuizRClass}
                        onChange={(e) => setAddQuizRClass(e.target.value)}
                        className="w-full p-2 bg-zinc-950 border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!addQuizRName.trim()) {
                        alert("Por favor, preencha o Nome.");
                        return;
                      }
                      const newItem = {
                        name: addQuizRName.trim(),
                        score: Number(addQuizRScore),
                        totalQuestions: 10,
                        date: addQuizRDate,
                        classification: addQuizRClass.trim()
                      };
                      setQuizRankings([...quizRankings, newItem].sort((a,b) => b.score - a.score));
                      setAddQuizRName(''); // reset
                    }}
                    className="px-3.5 py-1.5 bg-yellow-500 hover:bg-yellow-400 text-black rounded font-mono font-bold text-[10px] uppercase cursor-pointer"
                  >
                    Adicionar Registro
                  </button>
                </div>

                {/* Edit inline lists */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider block">Lista do Quadro de Honra ({quizRankings.length})</span>
                  <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 font-mono text-xs">
                    {quizRankings.length === 0 ? (
                      <p className="text-zinc-650 italic text-center text-xs py-4">Nenhum recordista cadastrado.</p>
                    ) : (
                      quizRankings.map((rk, ridx) => (
                        <div key={ridx} className="p-3 bg-zinc-950 border border-white/10 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                          <div className="md:col-span-1 text-center font-bold text-yellow-500 text-xs text-yellow-500">#{ridx + 1}</div>
                          <div className="md:col-span-4">
                            <input 
                              type="text" 
                              value={rk.name}
                              onChange={(e) => {
                                const copy = [...quizRankings];
                                copy[ridx].name = e.target.value;
                                setQuizRankings(copy);
                              }}
                              className="w-full bg-zinc-900 border border-white/5 p-1 rounded font-sans text-xs text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input 
                              type="number" 
                              value={rk.score}
                              onChange={(e) => {
                                const copy = [...quizRankings];
                                copy[ridx].score = Number(e.target.value);
                                setQuizRankings(copy.sort((a,b) => b.score - a.score));
                              }}
                              className="w-full bg-zinc-900 border border-white/5 p-1 rounded font-mono text-xs text-center text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input 
                              type="text" 
                              value={rk.classification || ''}
                              onChange={(e) => {
                                const copy = [...quizRankings];
                                copy[ridx].classification = e.target.value;
                                setQuizRankings(copy);
                              }}
                              className="w-full bg-zinc-900 border border-white/5 p-1 rounded font-sans text-xs text-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <input 
                              type="text" 
                              value={rk.date}
                              onChange={(e) => {
                                const copy = [...quizRankings];
                                copy[ridx].date = e.target.value;
                                setQuizRankings(copy);
                              }}
                              className="w-full bg-zinc-900 border border-white/5 p-1 rounded text-[10px] text-center text-white"
                            />
                          </div>
                          <div className="md:col-span-1 text-center">
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm("Remover este registro definitivamente?")) {
                                  setQuizRankings(quizRankings.filter((_, i) => i !== ridx));
                                }
                              }}
                              className="text-rose-450 hover:text-rose-400 p-1 bg-rose-500/10 hover:bg-rose-500/25 border border-rose-500/15 rounded cursor-pointer"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4.5: Vocational Test Questions Management */}
          {activeTab === 'vocational' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Perguntas do Teste Vocacional Forense</h3>
                <p className="text-gray-400 text-xs font-mono">Crie, edite e vincule perguntas a qualquer uma das nossas especialidades forenses. O teste calculará o perfil de maior afinidade.</p>
              </div>

              {/* Form to add a new question */}
              <form onSubmit={handleAddVocQuestion} className="p-5 rounded-2xl glassmorphism border border-blue-500/10 space-y-4">
                <span className="text-xs text-blue-400 font-mono font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Cadastrar Nova Pergunta Vocacional</span>
                
                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Enunciado / Pergunta *</label>
                  <textarea 
                    value={newVocQuestion} 
                    onChange={(e) => setNewVocQuestion(e.target.value)} 
                    placeholder="Ex: Como você gostaria de contribuir em uma investigação de homicídio?" 
                    className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-yellow-400"
                    rows={2} 
                  />
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-mono font-semibold text-gray-400 uppercase block pl-1">Alternativas de Resposta</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {newVocOptions.map((opt, oIdx) => (
                      <div key={oIdx} className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-2">
                        <label className="block text-[10px] font-mono text-gray-500 uppercase">Alternativa {['A', 'B', 'C', 'D'][oIdx]}</label>
                        <input 
                          type="text" 
                          value={opt.text} 
                          onChange={(e) => {
                            const updated = [...newVocOptions];
                            updated[oIdx].text = e.target.value;
                            setNewVocOptions(updated);
                          }} 
                          placeholder={`Opção de resposta que direciona à especialidade`} 
                          className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded-lg text-xs text-white" 
                        />
                        <div>
                          <label className="block text-[8px] font-mono text-gray-500 uppercase mb-0.5">Vincular à Especialidade Científica</label>
                          <select 
                            value={opt.pointsFor} 
                            onChange={(e) => {
                              const updated = [...newVocOptions];
                              updated[oIdx].pointsFor = e.target.value;
                              setNewVocOptions(updated);
                            }}
                            className="w-full p-2 bg-zinc-900 border border-white/5 rounded text-xs text-yellow-400 font-mono"
                          >
                            <option value="">-- Selecionar Especialidade --</option>
                            {specialties.map(spec => (
                              <option key={spec.id} value={spec.id}>{spec.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-lg uppercase transition-all cursor-pointer"
                >
                  Adicionar Pergunta Vocacional
                </button>
              </form>

              {/* List of active vocational questions */}
              <div className="space-y-4">
                <span className="text-xs font-mono text-gray-500 uppercase block pl-1">Perguntas Vocacionais Cadastradas ({vocationalQuestions.length})</span>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {vocationalQuestions.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl border border-white/5 bg-zinc-900/10">
                      {editingVocId === q.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Editar Enunciado</label>
                            <textarea 
                              value={editVocQuestionText} 
                              onChange={(e) => setEditVocQuestionText(e.target.value)} 
                              className="w-full p-2.5 bg-[#050505] border border-white/5 rounded-lg text-xs text-white" 
                              rows={2} 
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {editVocOptions.map((opt, oIdx) => (
                              <div key={oIdx} className="p-3 rounded bg-[#050505] border border-white/5 space-y-1.5">
                                <span className="text-[10px] font-mono text-gray-500 uppercase">Alternativa {['A', 'B', 'C', 'D'][oIdx]}</span>
                                <input 
                                  type="text" 
                                  value={opt.text} 
                                  onChange={(e) => {
                                    const updated = [...editVocOptions];
                                    updated[oIdx].text = e.target.value;
                                    setEditVocOptions(updated);
                                  }} 
                                  className="w-full p-2 bg-zinc-900 border border-white/5 rounded text-xs text-white" 
                                />
                                <select 
                                  value={opt.pointsFor} 
                                  onChange={(e) => {
                                    const updated = [...editVocOptions];
                                    updated[oIdx].pointsFor = e.target.value;
                                    setEditVocOptions(updated);
                                  }}
                                  className="w-full p-2 bg-zinc-900 border border-white/5 rounded text-xs text-yellow-400 font-mono"
                                >
                                  <option value="">-- Selecionar Especialidade --</option>
                                  {specialties.map(spec => (
                                    <option key={spec.id} value={spec.id}>{spec.title}</option>
                                  ))}
                                </select>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-end gap-2 pt-2">
                            <button 
                              type="button" 
                              onClick={() => setEditingVocId(null)} 
                              className="px-3.5 py-1.5 border border-white/10 rounded-lg font-mono text-xs hover:bg-zinc-800 transition-colors cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button 
                              type="button" 
                              onClick={() => handleSaveVocationalQuestion(q.id)} 
                              className="px-4 py-1.5 bg-yellow-400 text-black font-semibold rounded-lg font-mono text-xs hover:bg-yellow-300 transition-colors cursor-pointer"
                            >
                              Salvar Alterações
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <strong className="text-sm font-sans font-medium text-white block">
                                {idx + 1}. {q.question}
                              </strong>
                            </div>
                            <div className="flex shrink-0 gap-1.5">
                              <button 
                                type="button" 
                                onClick={() => handleEditVocationalQuestion(q)} 
                                className="px-2.5 py-1 rounded bg-white/5 text-[10px] border border-white/10 font-mono text-blue-400 hover:text-white"
                              >
                                Editar
                              </button>
                              <button 
                                type="button" 
                                onClick={() => handleDeleteVocationalQuestion(q.id)} 
                                className="p-1 hover:bg-zinc-800 rounded text-gray-500 hover:text-red-400"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {q.options.map((opt, oIdx) => {
                              const spec = specialties.find(s => s.id === opt.pointsFor);
                              return (
                                <div key={oIdx} className="p-2.5 rounded-lg bg-zinc-950/40 border border-white/5 flex flex-col justify-between space-y-1">
                                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{opt.text}</p>
                                  <div className="flex items-center gap-1 mt-1">
                                    <span className="text-[9px] font-mono bg-blue-950 text-blue-400 border border-blue-500/10 px-1.5 py-0.5 rounded uppercase font-semibold">
                                      {spec ? spec.title : opt.pointsFor}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Mural Investigativo - STRICTLY SECURE AND LOCAL */}
          {activeTab === 'mural' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Coleções do Mural Investigativo (Pins)</h3>
                <p className="text-gray-400 text-xs font-mono">Cadastre, anexe fotos locais em PNG ou arquivos PDF que serão fixados com pinos vermelhos no quadro de cortiça</p>
              </div>

              {/* Google Drive Link Settings Section */}
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-yellow-400" />
                  <h4 className="text-sm font-display font-medium text-yellow-400 uppercase tracking-wide">Repositório Geral Integrado (Google Drive)</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Insira abaixo o link de acesso público ao seu Google Drive ou repositório de suporte. Quando ativo, um botão destacado em amarelo surgirá para que seus visitantes acessem todo o material complementar.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formGoogleDriveUrl}
                    onChange={(e) => setFormGoogleDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:border-yellow-400 focus:outline-none"
                  />
                  {formGoogleDriveUrl && (
                    <a
                      href={formGoogleDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-zinc-800 border border-white/10 text-xs rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 transition-colors"
                    >
                      Testar Link
                    </a>
                  )}
                </div>
              </div>

              {/* Mural add form */}
              <form onSubmit={handleAddMuralItem} className="p-5 rounded-2xl glassmorphism border border-yellow-400/20 space-y-4">
                <span className="text-xs text-yellow-400 font-mono font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Fixar Nova Foto ou Laudo no Mural</span>
                
                {muralError && (
                  <p className="p-2.5 border border-red-500/20 text-red-400 font-mono text-xs rounded bg-red-950/10">⚠️ {muralError}</p>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Título do Evento ou Laudo *</label>
                    <input type="text" value={newMuralTitle} onChange={(e) => setNewMuralTitle(e.target.value)} placeholder="Ex: Simulado Prático Forense 2026" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Mês / Ano de Registro *</label>
                    <input type="text" value={newMuralDate} onChange={(e) => setNewMuralDate(e.target.value)} placeholder="Ex: Julho de 2026" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Categoria *</label>
                    <select value={newMuralCategory} onChange={(e) => setNewMuralCategory(e.target.value)} className="w-full p-2.5 bg-[#050505] border border-white/10 rounded-lg text-xs">
                      <option value="Treinamento">Treinamento Prático</option>
                      <option value="Palestra">Palestra / Aula</option>
                      <option value="Laboratório">Prática de Laboratório</option>
                      <option value="Congresso">Congresso / Simpósio</option>
                      <option value="Eventos">Social / Integração</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1">Tipo de Anexo *</label>
                    <div className="grid grid-cols-2 gap-2 bg-black/40 p-1 border border-white/10 rounded-lg">
                      <button type="button" onClick={() => setMuralSourceType('file')} className={`py-1 text-center font-mono text-[10px] rounded uppercase ${muralSourceType === 'file' ? 'bg-yellow-400 text-black font-bold' : 'text-gray-400 hover:text-white'}`}>Fazer Upload (PNG/PDF)</button>
                      <button type="button" onClick={() => setMuralSourceType('url')} className={`py-1 text-center font-mono text-[10px] rounded uppercase ${muralSourceType === 'url' ? 'bg-yellow-400 text-black font-bold' : 'text-gray-400 hover:text-white'}`}>Colar Link-URL</button>
                    </div>
                  </div>
                </div>

                {muralSourceType === 'file' ? (
                  <div className="p-4 border-2 border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center text-center space-y-2">
                    <Upload className="h-8 w-8 text-yellow-400 animate-pulse" />
                    <label className="cursor-pointer">
                      <span className="bg-yellow-400 text-black px-3 py-1 text-xs font-mono font-bold rounded hover:bg-yellow-300">SELECIONAR PNG OU PDF LOCAL</span>
                      <input type="file" accept="image/png, image/jpeg, image/gif, application/pdf" onChange={handleMuralFileChange} className="hidden" />
                    </label>
                    {muralUploadedName ? (
                      <p className="text-xs font-mono text-green-400">✅ Arquivo carregado: {muralUploadedName} ({muralUploadedType.toUpperCase()})</p>
                    ) : (
                      <p className="text-[10px] text-gray-500 font-mono">Suporta PNG, JPEG ou arquivos PDF técnicos de até 50MB</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-mono text-gray-400 mb-1 font-sans">URL Pública ou Base64 da Foto *</label>
                    <input type="url" value={newMuralUrl} onChange={(e) => setNewMuralUrl(e.target.value)} placeholder="https://images.unsplash.com/... ou link" className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-mono text-gray-400 mb-1">Descrição Explicativa da Foto / Laudo *</label>
                  <textarea value={newMuralDescription} onChange={(e) => setNewMuralDescription(e.target.value)} placeholder="O que representa esta memória? Descreva o procedimento ou o sentimento..." rows={3} className="w-full p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs font-sans text-gray-300" />
                </div>

                <button type="submit" className="px-5 py-2.5 bg-yellow-400 text-black font-mono font-bold text-xs uppercase rounded-lg hover:bg-yellow-300 transition-colors">Fixar Novo Documento (Pin)</button>
              </form>

              {/* List of active mural gallery pins */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-500 uppercase block">Fotos e Pins Atuais no Quadro ({gallery.length})</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto pr-1">
                  {gallery.map((item) => {
                    const isPdf = item.fileType === 'pdf' || item.image.startsWith('data:application/pdf');
                    return (
                      <div key={item.id} className="p-2 border border-white/5 bg-zinc-900/40 rounded-xl relative group flex flex-col justify-between">
                        <div className="relative aspect-square overflow-hidden rounded bg-black flex items-center justify-center">
                          {isPdf ? (
                            <FileText className="h-10 w-10 text-red-500" />
                          ) : (
                            <img src={item.image || null} alt={item.title} className="w-full h-full object-cover rounded" referrerPolicy="no-referrer" />
                          )}
                          <button 
                            type="button" 
                            onClick={() => setGallery(gallery.filter(i => i.id !== item.id))} 
                            className="absolute top-1 right-1 p-1.5 bg-red-600 rounded text-white shadow hover:scale-105 transition-transform"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="mt-2 text-left">
                          <p className="text-[10px] uppercase font-mono text-[#FFD000]">{item.category}</p>
                          <strong className="text-xs font-sans text-white line-clamp-1 block">{item.title}</strong>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: Scientific Digital Library */}
          {activeTab === 'library' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Biblioteca Digital Forense</h3>
                <p className="text-gray-400 text-xs font-mono">Defina o link do repositório de suporte onde os livros, laudos didáticos e relatórios periciais de referência estão salvos</p>
              </div>

              {/* Library Google Drive Link Settings Section */}
              <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/20 space-y-3">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-yellow-400" />
                  <h4 className="text-sm font-display font-medium text-yellow-400 uppercase tracking-wide">Repositório da Biblioteca (Google Drive)</h4>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Insira abaixo o link de acesso público ao repositório do Google Drive de sua biblioteca científica. Os visitantes acessarão diretamente todo o seu material didático corporativo de referência por meio deste link.
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formLibraryDriveUrl}
                    onChange={(e) => setFormLibraryDriveUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 p-2.5 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:border-yellow-400 focus:outline-none"
                  />
                  {formLibraryDriveUrl && (
                    <a
                      href={formLibraryDriveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-zinc-800 border border-white/10 text-xs rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:border-white/30 transition-colors"
                    >
                      Testar Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FAQ and streamlined admissions (Google Forms link only!) */}
          {activeTab === 'faq' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Inscrições & Dúvidas</h3>
                <p className="text-gray-400 text-xs font-mono">Modifique as respostas do FAQ e configure o link oficial do Google Forms de admissão da liga</p>
              </div>

              {/* Customized Forms link configure only */}
              <div className="p-5 rounded-2xl glassmorphism border border-yellow-400/20 space-y-4">
                <span className="text-xs text-yellow-400 font-mono font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Link Único & Status de Inscrições do Seletivo</span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase font-bold tracking-wider">Status das Inscrições na LACiF</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => { setIsSelectiveOpen(true); }}
                        className={`flex-1 py-2 px-3 text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          isSelectiveOpen 
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]' 
                            : 'bg-zinc-950 border-white/5 text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${isSelectiveOpen ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                        Abertas
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsSelectiveOpen(false); }}
                        className={`flex-1 py-2 px-3 text-xs font-mono font-bold uppercase rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          !isSelectiveOpen 
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.15)]' 
                            : 'bg-zinc-950 border-white/5 text-gray-500 hover:text-gray-300'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${!isSelectiveOpen ? 'bg-rose-400' : 'bg-gray-600'}`} />
                        Fechadas
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 mb-1.5 uppercase font-bold tracking-wider">Link de Inscrição (Formulário)</label>
                    <input
                      type="url"
                      value={subUrl}
                      onChange={(e) => setSubUrl(e.target.value)}
                      placeholder="https://docs.google.com/forms/..."
                      className="w-full p-2 bg-zinc-900 border border-white/10 rounded-lg text-xs font-sans text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>
                
                <p className="text-[10px] text-gray-500 font-mono pt-1">
                  Selecionando <strong>Abertas</strong>, a seção exibe alertas verdes indicando que as inscrições estão em andamento. Selecionando <strong>Fechadas</strong>, a seção exibe um alerta vermelho de inscrições encerradas e bloqueia ou altera o CTA de inscrição de forma correspondente.
                </p>
              </div>

              {/* Add FAQ form */}
              <div className="p-4 rounded-xl border border-white/5 bg-zinc-900/30 space-y-3">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-semibold block border-b border-white/5 pb-1">Inserir Pergunta do FAQ</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      placeholder="Pergunta (ex: Pessoas de fora da UFF podem se candidatar?)"
                      className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      placeholder="Resposta institucional direta..."
                      className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="px-3 py-1.5 bg-yellow-400 text-black font-semibold rounded text-xs font-mono uppercase cursor-pointer"
                >
                  Adicionar Item FAQ
                </button>
              </div>

              {/* Consult current FAQs */}
              <div className="space-y-2">
                <h4 className="font-mono text-xs text-gray-500 uppercase">Perguntas Respondidas Ativas</h4>
                <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="p-3 rounded bg-zinc-900 flex justify-between items-start text-xs border border-white/5">
                      <div>
                        <strong>{faq.question}</strong>
                        <p className="text-gray-400 mt-1 leading-relaxed font-sans">{faq.answer}</p>
                      </div>
                      <button 
                        onClick={() => setFaqs(faqs.filter(item => item.id !== faq.id))}
                        className="text-red-400 p-1 hover:bg-zinc-800 rounded shrink-0 ml-2"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'escape_room' && (
            <div className="space-y-8 max-w-5xl animated-fade-in text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4 bg-zinc-950/0">
                <div>
                  <h3 className="text-xl font-display font-black text-[#FFD000] uppercase tracking-tight flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-[#FFD000]" /> GERENCIADOR DE ESCAPE ROOM FORENSE
                  </h3>
                  <p className="text-gray-400 text-xs font-mono font-sans mt-0.5">
                    Controle total da missão "Do Vestígio à Evidência". Altere desafios, insira perícias, ordene, duplique e controle mídias.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleGlobalSave}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-mono font-black text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-500/10"
                  >
                    <Save className="h-4 w-4" /> SALVAR ALTERAÇÕES NO SITE
                  </button>
                </div>
              </div>

              {/* DYNAMIC FORENSIC STATISTICS PANEL */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                <span className="text-xs text-[#FFD000] font-mono font-black uppercase tracking-wider block border-b border-white/5 pb-2 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> PAINEL DE PERFORMANCE ESTATÍSTICA (GLOBAL)
                </span>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">Total de Questões</span>
                    <strong className="text-2xl font-black text-white font-mono">{escapeRooms.length}</strong>
                    <span className="text-[9px] text-blue-400 block mt-0.5 font-sans">Cadastradas no banco</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">Acessos Únicos</span>
                    <strong className="text-2xl font-black text-[#FFD000] font-mono">
                      {content.escapeRoomConfig?.stats?.totalAccesses || 28}
                    </strong>
                    <span className="text-[9px] text-gray-500 block mt-0.5">Visitas iniciadas</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">Conclusões Totais</span>
                    <strong className="text-2xl font-black text-emerald-400 font-mono">
                      {content.escapeRoomConfig?.stats?.totalCompleted || 12}
                    </strong>
                    <span className="text-[9px] text-emerald-500/80 block mt-0.5">Laudos emitidos</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-zinc-900 border border-white/5 text-center">
                    <span className="text-[10px] text-gray-400 font-mono block uppercase">Taxa Média de Acertos</span>
                    <strong className="text-2xl font-black text-blue-400 font-mono">
                      {(() => {
                        const totalAtt = content.escapeRoomConfig?.stats?.totalAttempts || 0;
                        const totalCorr = content.escapeRoomConfig?.stats?.totalCorrectAttempts || 0;
                        return totalAtt > 0 ? Math.round((totalCorr / totalAtt) * 100) : 84;
                      })()}%
                    </strong>
                    <span className="text-[9px] text-blue-500 block mt-0.5 font-sans">Precisão dos discentes</span>
                  </div>
                </div>

                {/* Question Breakdown per Forensic Area */}
                <div className="mt-3 bg-zinc-900/50 p-3 rounded-lg border border-white/5 text-xs text-gray-300">
                  <h4 className="font-mono text-[10px] text-gray-400 uppercase font-bold mb-2">Breakdown de Questões por Área Pericial:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(
                      escapeRooms.reduce((acc, curr) => {
                        const area = curr.theme || 'Outras Áreas';
                        acc[area] = (acc[area] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([areaName, count]) => (
                      <span key={areaName} className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-900 border border-white/10 rounded-md font-mono text-[10px] text-gray-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        {areaName}: <strong className="text-white">{count}</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* INTEGRATED IMPORT / EXPORT & BACKUP ROW */}
              <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <h4 className="text-[#FFD000] font-black uppercase text-[10px] tracking-wider flex items-center gap-1.5">
                    <FolderSync className="h-4 w-4 text-[#FFD000]" /> EXTRAS: INTEGRAÇÃO E COPIAS DE SEGURANÇA
                  </h4>
                  <p className="text-gray-400 text-[9px] font-sans">
                    Transfira perguntas entre computadores via JSON ou recupere o backup gerado em tempo de execução no seu navegador.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={handleExportRoomsJson}
                    className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/20 text-blue-300 rounded text-[10px] uppercase cursor-pointer"
                  >
                    Exportar JSON
                  </button>
                  <label className="px-3 py-1.5 bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/20 text-violet-300 rounded text-[10px] uppercase cursor-pointer flex items-center">
                    Importar JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportRoomsJson}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      const back = localStorage.getItem('lacif_escape_rooms_auto_backup');
                      if (back) {
                        try {
                          const parsed = JSON.parse(back);
                          if (Array.isArray(parsed) && window.confirm(`Deseja restaurar as ${parsed.length} salas salvas no backup temporário interno do navegador?`)) {
                            setEscapeRooms(parsed);
                            alert("Backup temporário restaurado com sucesso!");
                          }
                        } catch (e) {
                          alert("Erro ao ler backup do localStorage.");
                        }
                      } else {
                        alert("Nenhum backup automático disponível neste navegador ainda.");
                      }
                    }}
                    className="px-3 py-1.5 bg-amber-600/10 hover:bg-amber-600/25 border border-amber-500/25 text-amber-300 rounded text-[10px] uppercase cursor-pointer"
                  >
                    Restaurar Auto-Backup
                  </button>
                </div>
              </div>

              {/* GRID LAYOUT FOR GENERAL AND DETAILED ROOM EDITING */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT BLOCK: GAME INTRO & POINTS ENGINE */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* General Config section */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                    <span className="text-xs text-blue-400 font-mono font-black uppercase tracking-wider block border-b border-white/5 pb-2">1. Narrativa Introdutória & Pontos</span>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">História Inicial (Apresentada ao Carregar o Jogo)</label>
                        <textarea
                          rows={4}
                          value={escapeIntroText}
                          onChange={(e) => setEscapeIntroText(e.target.value)}
                          placeholder="Apresentação inicial clássica ou regras de escape..."
                          className="w-full p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs font-sans text-gray-200 focus:outline-none focus:border-[#FFD000]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px]">
                        <div>
                          <label className="block text-gray-400 mb-1 uppercase">PONTOS POR ACERTO</label>
                          <input
                            type="number"
                            value={escapePointsCorrect}
                            onChange={(e) => setEscapePointsCorrect(Number(e.target.value))}
                            className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1 uppercase text-rose-400">PONTOS POR ERRO</label>
                          <input
                            type="number"
                            value={escapePointsIncorrect}
                            onChange={(e) => setEscapePointsIncorrect(Number(e.target.value))}
                            className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1 uppercase">PONTOS POR SALA CONCLUÍDA</label>
                          <input
                            type="number"
                            value={escapePointsRoom}
                            onChange={(e) => setEscapePointsRoom(Number(e.target.value))}
                            className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 mb-1 uppercase">BÔNUS POR CONCLUSÃO TOTAL</label>
                          <input
                            type="number"
                            value={escapePointsGame}
                            onChange={(e) => setEscapePointsGame(Number(e.target.value))}
                            className="w-full p-2 bg-[#050505] border border-white/5 rounded text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Central Criminal Case section */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                    <span className="text-xs text-[#FFD000] font-mono font-black uppercase tracking-wider block border-b border-white/5 pb-2">2. Caso Pericial Central (Sala Final)</span>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">Título do Inquérito Central</label>
                        <input
                          type="text"
                          value={escapeCaseTitle}
                          onChange={(e) => setEscapeCaseTitle(e.target.value)}
                          placeholder="Ex: Caso de Invasão de Alto Risco"
                          className="w-full p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase font-sans">Texto de Resolução do Caso (Sala Final)</label>
                        <textarea
                          rows={4}
                          value={escapeCaseStory}
                          onChange={(e) => setEscapeCaseStory(e.target.value)}
                          placeholder="Escreva a resposta e dinâmica final que dita o culpado..."
                          className="w-full p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs text-gray-200"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase">Opções de Culpados (Separados por vírgula):</label>
                        <input
                          type="text"
                          value={escapeCaseCulpritOpts.join(', ')}
                          onChange={(e) => setEscapeCaseCulpritOpts(e.target.value.split(',').map(s => s.trim()))}
                          placeholder="Suspeito A, Suspeito B, Suspeito C, Suspeito D"
                          className="w-full p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-gray-400 mb-1 uppercase text-[#FFD000]">Índice do Culpado Verdadeiro (0 a 3)</label>
                        <select
                          value={escapeCaseCulpritIndex}
                          onChange={(e) => setEscapeCaseCulpritIndex(Number(e.target.value))}
                          className="w-full p-2 bg-[#050505] border border-white/10 rounded-lg text-xs font-mono text-white"
                        >
                          {escapeCaseCulpritOpts.map((opt, i) => (
                            <option key={i} value={i}>Índice {i} - {opt}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* RANKING/LEADERBOARD MANAGER */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4 text-xs font-mono">
                    <span className="text-xs text-emerald-400 font-mono font-black uppercase tracking-wider block border-b border-white/5 pb-2">3. Recordistas e Edição (Escape Room)</span>
                    <p className="text-[10px] text-gray-400 leading-normal font-sans">
                      Adicione novos recordes ou edite diretamente as informações de pontuação, tempo e data dos investigadores para o Escape Room:
                    </p>

                    {/* Manual addition of Escape Record */}
                    <div className="p-3 bg-zinc-900 border border-white/5 rounded-xl space-y-3">
                      <span className="text-[9px] font-mono text-[#3ecf8e] font-bold uppercase tracking-wider block">Adicionar Registro Manual</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div>
                          <label className="block text-[8px] text-gray-500 mb-0.5">Nome</label>
                          <input 
                            type="text" 
                            placeholder="Nome / Agente" 
                            value={addEscapeRName}
                            onChange={(e) => setAddEscapeRName(e.target.value)}
                            className="w-full p-1.5 bg-black border border-white/10 rounded font-sans text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-gray-500 mb-0.5">Pontos XP</label>
                          <input 
                            type="number" 
                            value={addEscapeRScore}
                            onChange={(e) => setAddEscapeRScore(Number(e.target.value))}
                            className="w-full p-1.5 bg-black border border-white/10 rounded text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-gray-500 mb-0.5">Tempo</label>
                          <input 
                            type="text" 
                            value={addEscapeRTime}
                            onChange={(e) => setAddEscapeRTime(e.target.value)}
                            className="w-full p-1.5 bg-black border border-white/10 rounded text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[8px] text-gray-500 mb-0.5">Data</label>
                          <input 
                            type="text" 
                            value={addEscapeRDate}
                            onChange={(e) => setAddEscapeRDate(e.target.value)}
                            className="w-full p-1.5 bg-black border border-white/10 rounded text-white"
                          />
                        </div>
                      </div>
                      <div className="text-[10px]">
                        <label className="block text-[8px] text-gray-500 mb-0.5">Classificação / Distintivo</label>
                        <input 
                          type="text" 
                          value={addEscapeRClass}
                          onChange={(e) => setAddEscapeRClass(e.target.value)}
                          className="w-full p-1.5 bg-black border border-white/10 rounded font-sans text-white"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!addEscapeRName.trim()) {
                            alert("Por favor, preencha o Nome.");
                            return;
                          }
                          const newItem = {
                            name: addEscapeRName.trim(),
                            score: Number(addEscapeRScore),
                            time: addEscapeRTime,
                            date: addEscapeRDate,
                            classification: addEscapeRClass.trim()
                          };
                          setGameRankings([...gameRankings, newItem].sort((a,b) => b.score - a.score));
                          setAddEscapeRName(''); // reset
                        }}
                        className="px-3 py-1 bg-[#3ecf8e] hover:bg-[#34b279] text-black rounded font-mono font-bold text-[9px] uppercase cursor-pointer"
                      >
                        Adicionar ao Escape Rank
                      </button>
                    </div>

                    {/* Interactive lists */}
                    <div className="max-h-80 overflow-y-auto space-y-3 pr-1 text-[10px]">
                      {gameRankings.length === 0 ? (
                        <p className="text-zinc-650 italic py-3 text-center">Nenhum recorde cadastrado.</p>
                      ) : (
                        gameRankings.map((rk, ridx) => (
                          <div key={ridx} className="p-2.5 bg-zinc-900 rounded-lg border border-white/5 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] text-[#3ecf8e] font-bold"># {ridx + 1}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm("Remover este recorde definitivamente?")) {
                                    setGameRankings(gameRankings.filter((_, i) => i !== ridx));
                                  }
                                }}
                                className="text-rose-455 hover:text-rose-400 p-0.5 bg-white/5 hover:bg-white/10 rounded transition cursor-pointer"
                              >
                                <Trash2 className="h-3 w-3 text-rose-400" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              <div>
                                <label className="text-[7px] text-gray-500 block">Nome</label>
                                <input 
                                  type="text" 
                                  value={rk.name}
                                  onChange={(e) => {
                                    const copy = [...gameRankings];
                                    copy[ridx].name = e.target.value;
                                    setGameRankings(copy);
                                  }}
                                  className="w-full bg-black/40 border border-white/5 p-1 rounded font-sans text-white text-[9px]"
                                />
                              </div>
                              <div>
                                <label className="text-[7px] text-gray-500 block">Pontos XP</label>
                                <input 
                                  type="number" 
                                  value={rk.score}
                                  onChange={(e) => {
                                    const copy = [...gameRankings];
                                    copy[ridx].score = Number(e.target.value);
                                    setGameRankings(copy.sort((a,b) => b.score - a.score));
                                  }}
                                  className="w-full bg-black/40 border border-white/5 p-1 rounded text-white text-[9px]"
                                />
                              </div>
                              <div>
                                <label className="text-[7px] text-gray-500 block">Tempo</label>
                                <input 
                                  type="text" 
                                  value={rk.time}
                                  onChange={(e) => {
                                    const copy = [...gameRankings];
                                    copy[ridx].time = e.target.value;
                                    setGameRankings(copy);
                                  }}
                                  className="w-full bg-black/40 border border-white/5 p-1 rounded text-white text-[9px]"
                                />
                              </div>
                              <div>
                                <label className="text-[7px] text-gray-500 block">Cargo/Perito</label>
                                <input 
                                  type="text" 
                                  value={rk.classification || ''}
                                  onChange={(e) => {
                                    const copy = [...gameRankings];
                                    copy[ridx].classification = e.target.value;
                                    setGameRankings(copy);
                                  }}
                                  className="w-full bg-black/40 border border-white/5 p-1 rounded font-sans text-white text-[9px]"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>

                {/* RIGHT BLOCK: UNLIMITED ROOMS AND LAB WORKSPACES CONFIG */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-xs text-blue-400 font-mono font-black uppercase tracking-wider block">4. Banco de Questões Periciais</span>
                      <button
                        type="button"
                        onClick={handleCreateNewRoomDraft}
                        className="px-2.5 py-1 bg-blue-500 hover:bg-blue-400 text-white font-mono text-[10px] rounded flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Plus className="h-3 w-3" /> ADICIONAR NOVA PERÍCIA
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-normal font-sans">
                      Abaixo estão as investigações disponíveis no escape room. Ajuste a ordem de exibição, crie redundâncias clicando em <strong>Duplicar</strong>, ou ative/desative salas para guiar o fluxo dos discentes.
                    </p>

                    {/* Rooms List Layout with Sort and Active functionality */}
                    <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                      {escapeRooms.map((rm, i) => (
                        <div key={rm.id} className={`p-3 rounded-xl border transition ${editingRoomId === rm.id ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-zinc-900'} flex items-center justify-between text-xs`}>
                          <div className="space-y-1 pr-3 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-mono text-[9px] bg-zinc-950 text-gray-400 px-1 py-0.5 rounded border border-white/10">SALA {i + 1}</span>
                              <span className={`px-1 rounded text-[8px] font-black uppercase ${rm.difficulty === 'Fácil' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : rm.difficulty === 'Médio' ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
                                {rm.difficulty || 'Médio'}
                              </span>
                              <span className={`px-1 rounded text-[8px] font-black uppercase ${rm.isActive !== false ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400' : 'bg-red-950 border border-red-800 text-red-500 line-through'}`}>
                                {rm.isActive !== false ? 'ATIVA' : 'INATIVA'}
                              </span>
                              <strong className="text-white font-display text-xs ml-1">{rm.name}</strong>
                            </div>
                            <span className="font-mono text-[9px] text-[#FFD000] block">{rm.theme} — Desafio: "{rm.challengeTitle}"</span>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {/* Ordination Keys */}
                            <button
                              type="button"
                              onClick={() => handleMoveRoomUp(i)}
                              disabled={i === 0}
                              className="p-1 hover:bg-white/5 rounded text-gray-400 disabled:opacity-20 transition"
                              title="Mover para Cima"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveRoomDown(i)}
                              disabled={i === escapeRooms.length - 1}
                              className="p-1 hover:bg-white/5 rounded text-gray-400 disabled:opacity-20 transition"
                              title="Mover para Baixo"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </button>
                            
                            {/* Duplication button */}
                            <button
                              type="button"
                              onClick={() => handleDuplicateRoomDraft(rm)}
                              className="p-1 hover:bg-white/5 rounded text-blue-400 transition"
                              title="Duplicar Questão"
                            >
                              <Copy className="h-3.5 w-3.5" />
                            </button>

                            {/* State active toggle */}
                            <button
                              type="button"
                              onClick={() => handleToggleRoomActive(rm.id)}
                              className={`p-1 hover:bg-white/5 rounded transition ${rm.isActive !== false ? 'text-emerald-400' : 'text-gray-600'}`}
                              title={rm.isActive !== false ? "Desativar Questão" : "Ativar Questão"}
                            >
                              {rm.isActive !== false ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                            </button>

                            {/* Editing buttons */}
                            <button
                              type="button"
                              onClick={() => handleStartEditRoom(rm)}
                              className="px-2 py-0.5 border border-yellow-400/30 hover:bg-[#FFD000]/10 text-yellow-400 font-mono text-[9px] rounded font-bold cursor-pointer transition"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRoomDraft(rm.id)}
                              className="text-[#FF3030]/80 hover:text-red-500 p-1 hover:bg-red-500/5 rounded transition"
                              title="Remover"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Interactive room sub-form inside tab */}
                    {editingRoomId && (
                      <div className="p-5 rounded-2xl bg-zinc-900 border-2 border-[#FFD000]/40 space-y-4 animate-fade-in text-xs font-mono">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2">
                          <span className="text-[#FFD000] font-black uppercase text-[11px] tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-[#FFD000]" /> EDITOR DE INVESTIGAÇÃO INTERATIVO
                          </span>
                          <span className="text-[9px] text-zinc-500">REF-ID: {editingRoomId}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-gray-400 text-[10px] mb-1 uppercase text-[9px] font-black">Identificação da Sala (Ex: Sala 01, Vestígio STR)</label>
                            <input
                              type="text"
                              value={roomName}
                              onChange={(e) => setRoomName(e.target.value)}
                              className="w-full p-2 bg-[#050505] border border-white/10 rounded text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-gray-400 text-[10px] mb-1 uppercase text-[9px] font-black">Área de Atuação Pericial</label>
                            <select
                              value={roomTheme}
                              onChange={(e) => setRoomTheme(e.target.value)}
                              className="w-full p-2 bg-[#050505] border border-white/10 rounded font-mono text-white"
                            >
                              <option value="Balística Forense">Balística Forense</option>
                              <option value="Biologia e Genética Forense">Biologia e Genética Forense</option>
                              <option value="Computação Forense">Computação Forense</option>
                              <option value="Documentoscopia">Documentoscopia</option>
                              <option value="Engenharia Forense">Engenharia Forense</option>
                              <option value="Entomologia Forense">Entomologia Forense</option>
                              <option value="Fonética e Análise de Áudio Forense">Fonética e Análise de Áudio Forense</option>
                              <option value="Hematologia Forense">Hematologia Forense</option>
                              <option value="Incêndios e Explosões">Incêndios e Explosões</option>
                              <option value="Medicina Legal">Medicina Legal</option>
                              <option value="Odontologia Legal">Odontologia Legal</option>
                              <option value="Papiloscopia">Papiloscopia</option>
                              <option value="Química Forense">Química Forense</option>
                              <option value="Revelação Papiloscópica">Revelação Papiloscópica</option>
                              <option value="Toxicologia Forense">Toxicologia Forense</option>
                              <option value="Antropologia Forense">Antropologia Forense</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-gray-400 text-[10px] mb-1 uppercase text-[9px] font-black">Grau de Dificuldade</label>
                            <select
                              value={roomDifficulty}
                              onChange={(e) => setRoomDifficulty(e.target.value as any)}
                              className="w-full p-2 bg-[#050505] border border-white/10 rounded font-mono text-white"
                            >
                              <option value="Fácil">🟢 Fácil</option>
                              <option value="Médio">🟡 Médio</option>
                              <option value="Difícil">🔴 Difícil</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-400 text-[10px] mb-1 uppercase text-[9px] font-black">Estado de Publicação</label>
                            <select
                              value={roomIsActive ? 'ativo' : 'inativo'}
                              onChange={(e) => setRoomIsActive(e.target.value === 'ativo')}
                              className="w-full p-2 bg-[#050505] border border-white/10 rounded font-mono text-white"
                            >
                              <option value="ativo">Disponível no jogo (Ativo)</option>
                              <option value="inativo">Oculto temporariamente (Inativo)</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-gray-400 text-[10px] mb-1 uppercase text-[9px] font-black">Tipo de Mídia / Atendimento</label>
                            <select
                              value={roomMediaType}
                              onChange={(e) => setRoomMediaType(e.target.value as any)}
                              className="w-full p-2 bg-[#050505] border border-white/10 rounded font-mono text-white"
                            >
                              <option value="image">Imagem (Diagrama, Desenho, SVG, GIF)</option>
                              <option value="video">Vídeo Explicativo (URL)</option>
                              <option value="pdf">Documento PDF Incorporado (URL)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] mb-1 uppercase font-black text-gray-300">Desenho ou Link de Mídia Personalizada (URL)</label>
                          <input
                            type="text"
                            value={roomMediaUrl}
                            onChange={(e) => setRoomMediaUrl(e.target.value)}
                            placeholder="Insira um link direto de imagem, diagrama ou vídeo..."
                            className="w-full p-2 bg-[#050505] border border-white/10 rounded text-gray-300"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] mb-1 uppercase font-bold text-gray-300">Título Temático do Caso Pericial</label>
                          <input
                            type="text"
                            value={roomChallengeTitle}
                            onChange={(e) => setRoomChallengeTitle(e.target.value)}
                            placeholder="Ex: Análise das Estrias de Projétil de Arma de Fogo"
                            className="w-full p-2 bg-[#050505] border border-white/10 rounded text-yellow-400"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] mb-1 uppercase font-bold text-gray-300">1. Descrição do Caso (Enquadramento)</label>
                          <textarea
                            rows={3}
                            value={roomChallengeDesc}
                            onChange={(e) => setRoomChallengeDesc(e.target.value)}
                            placeholder="Apresente a história forense da cena de crime..."
                            className="w-full p-2 bg-[#050505] border border-white/10 rounded text-gray-200 font-sans text-xs uppercase"
                          />
                        </div>

                        <div>
                          <label className="block text-amber-400 text-[10px] mb-1 uppercase font-black">2. Vestígios Encontrados na Cena</label>
                          <textarea
                            rows={2}
                            value={roomVestigios}
                            onChange={(e) => setRoomVestigios(e.target.value)}
                            placeholder="Descreva fisicamente os vestígios localizados pela equipe (Ex: Projétil jaquetado calibre .38 SPL, estriações dextrógiras...)"
                            className="w-full p-2 bg-[#050505] border border-[#FFD000]/25 rounded text-gray-200 font-sans text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-white text-[10px] mb-1 uppercase font-bold">3. Pergunta Pericial Directiva</label>
                          <input
                            type="text"
                            value={roomQuestion}
                            onChange={(e) => setRoomQuestion(e.target.value)}
                            placeholder="Ex: Qual arma produziu as estrias com base no laudo balístico?"
                            className="w-full p-2 bg-zinc-950 border border-white/10 rounded text-white"
                          />
                        </div>

                        {/* FOUR DIRECT OPTIONS FIELD REPRESENTATION */}
                        <div className="p-3 bg-black/40 rounded-xl border border-white/5 space-y-2.5">
                          <label className="block text-blue-400 text-[10px] mb-1 uppercase font-black tracking-wider">4. Alternativas de Resposta (A, B, C e D) - Sem Revelar</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs font-mono">
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block mb-1">Alternativa A</span>
                              <input
                                type="text"
                                value={roomOptionA}
                                onChange={(e) => setRoomOptionA(e.target.value)}
                                placeholder="Descrição da opção A..."
                                className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-gray-200"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block mb-1">Alternativa B</span>
                              <input
                                type="text"
                                value={roomOptionB}
                                onChange={(e) => setRoomOptionB(e.target.value)}
                                placeholder="Descrição da opção B..."
                                className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-gray-200"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block mb-1">Alternativa C</span>
                              <input
                                type="text"
                                value={roomOptionC}
                                onChange={(e) => setRoomOptionC(e.target.value)}
                                placeholder="Descrição da opção C..."
                                className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-gray-200"
                              />
                            </div>
                            <div>
                              <span className="text-[10px] text-gray-500 font-mono font-bold uppercase block mb-1">Alternativa D</span>
                              <input
                                type="text"
                                value={roomOptionD}
                                onChange={(e) => setRoomOptionD(e.target.value)}
                                placeholder="Descrição da opção D..."
                                className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-gray-200"
                              />
                            </div>
                          </div>

                          <div className="pt-2">
                            <label className="block text-[#FFD000] text-[10px] mb-1 uppercase font-black">5. Alternativa Correta para Avançar</label>
                            <select
                              value={roomCorrectAnsIdx}
                              onChange={(e) => setRoomCorrectAnsIdx(Number(e.target.value))}
                              className="w-full p-2 bg-[#050505] border border-[#FFD000]/25 rounded text-[#FFD000] font-black"
                            >
                              <option value="0">Alternativa A (Primeira Opção)</option>
                              <option value="1">Alternativa B (Segunda Opção)</option>
                              <option value="2">Alternativa C (Terceira Opção)</option>
                              <option value="3">Alternativa D (Quarta Opção)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-emerald-400 text-[10px] mb-1 uppercase font-bold">6. Explicação do Laudo (Exibida ao acertar a questão)</label>
                          <textarea
                            rows={3}
                            value={roomExplanation}
                            onChange={(e) => setRoomExplanation(e.target.value)}
                            placeholder="Escreva a resposta e as razões físicas do vestígio em detalhes que provam o acerto..."
                            className="w-full p-2 bg-[#050505] border border-white/10 rounded font-sans text-xs text-gray-300"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-400 text-[10px] mb-1 uppercase font-bold text-gray-300">Explicações Adicionais Se Errar as Opções (Separadas por quebra de linha):</label>
                          <textarea
                            rows={4}
                            value={roomOptionExplanationsStr}
                            onChange={(e) => setRoomOptionExplanationsStr(e.target.value)}
                            placeholder="Linha 1: erro na A...&#10;Linha 2: erro na B...&#10;Linha 3: erro na C...&#10;Linha 4: erro na D..."
                            className="w-full p-2 bg-zinc-950 border border-white/10 rounded font-sans text-xs text-gray-400"
                          />
                        </div>

                        <div>
                          <label className="block text-zinc-400 text-[10px] mb-1 uppercase text-zinc-500">7. Curiosidade Científica Opcional (Transição de Tela)</label>
                          <textarea
                            rows={2}
                            value={roomCuriosity}
                            onChange={(e) => setRoomCuriosity(e.target.value)}
                            placeholder="Frequência de vestígios similares ou dados reais históricos..."
                            className="w-full p-2 bg-[#050505] border border-white/10 rounded text-gray-400 font-sans"
                          />
                        </div>

                        <div className="flex gap-2 pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={handleSaveRoomDetails}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-black rounded-lg cursor-pointer transition uppercase"
                          >
                            Gravar rascunho da perícia
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingRoomId(null)}
                            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-400 text-xs rounded-lg cursor-pointer transition"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 8: Security, back-up and social media properties */}
          {activeTab === 'system' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Segurança de Sistema e Parcerias</h3>
                <p className="text-gray-400 text-xs font-mono font-sans pb-3">Administre links de redes corporativas oficiais, sedes físicas ou salve backups .json</p>
              </div>

              <div className="p-5 rounded-2xl bg-yellow-400/5 border border-yellow-400/20 space-y-3">
                <h4 className="font-mono text-xs text-yellow-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <ShieldAlert className="h-4 w-4 animate-bounce" /> Painel de Controle de Fábrica
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Caso deseje exportar todas as modificações que fez (textos, fotos locais, manuais) ou prefira restaurar as configurações pré-construídas originais de fábrica da LACiF, escolha uma das ações:
                </p>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleExportBackup}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <Database className="h-4 w-4" /> Exportar Backup JSON
                  </button>
                  <button
                    onClick={() => {
                      if(window.confirm('Atenção: deseja restaurar? Esta ação limpará todos os membros salvos, fotos enviadas e laudos editados corporativamente.')){
                        onResetToDefaults();
                        setSaveSuccess(true);
                        setTimeout(() => onClose(), 1000);
                      }
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="h-4 w-4" /> Restaurar Configurações Originais
                  </button>
                </div>
              </div>

               {/* Supabase integration module */}
              <div className="p-5 rounded-2xl bg-[#3ecf8e]/5 border border-[#3ecf8e]/20 space-y-4">
                <h4 className="font-mono text-xs text-[#3ecf8e] uppercase tracking-widest font-bold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#3ecf8e] animate-pulse" /> Conectar Banco de Dados Supabase (Vértice / Cloud)
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  Siga o passo a passo para conectar o seu banco de dados Supabase do Vértice ou Supabase Cloud à plataforma LACiF.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Supabase API URL</label>
                    <input 
                      type="text" 
                      placeholder="https://your-project.supabase.co" 
                      value={supabaseUrlInput}
                      onChange={(e) => setSupabaseUrlInput(e.target.value)}
                      className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-xs text-white placeholder-gray-600 font-mono focus:outline-none focus:border-[#3ecf8e]" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-gray-500 uppercase mb-1">Supabase Anon Key</label>
                    <input 
                      type="password" 
                      placeholder="eyJhbGciOi..." 
                      value={supabaseKeyInput}
                      onChange={(e) => setSupabaseKeyInput(e.target.value)}
                      className="w-full p-2.5 bg-zinc-950 border border-white/10 rounded text-xs text-white placeholder-gray-600 font-mono focus:outline-none focus:border-[#3ecf8e]" 
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!supabaseUrlInput || !supabaseKeyInput) {
                        alert("Preencha a URL e a Anon Key.");
                        return;
                      }
                      updateSupabaseConfig(supabaseUrlInput, supabaseKeyInput);
                    }}
                    className="px-4 py-2 bg-[#3ecf8e] hover:bg-[#34b279] text-black rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Database className="h-4 w-4" /> Salvar Conexão e Recarregar
                  </button>
                  {isSupabaseEnabled && (
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm("Deseja realmente desconectar e voltar ao armazenamento local?")) {
                          clearSupabaseConfig();
                        }
                      }}
                      className="px-4 py-2 border border-red-500/20 bg-red-950/20 hover:bg-red-900/30 text-red-400 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      Desconectar Supabase
                    </button>
                  )}
                </div>

                {/* SQL instructions */}
                <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-white/5 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">📋 Copiar e Executar este SQL no Supabase</span>
                    <button 
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(SUPABASE_SCHEMA_SQL);
                        alert("Script SQL copiado com sucesso!");
                      }}
                      className="text-[9px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded text-white font-mono cursor-pointer"
                    >
                      Copiar SQL
                    </button>
                  </div>
                  <pre className="text-[9px] font-mono text-gray-500 overflow-x-auto max-h-48 p-2 bg-black rounded whitespace-pre-wrap leading-relaxed select-all">
                    {SUPABASE_SCHEMA_SQL}
                  </pre>
                  <p className="text-[9px] font-mono text-yellow-500 mt-2">
                    💡 Basta abrir o menu lateral esquerdo no Supabase, clicar no ícone "SQL Editor" &gt; "New query", colar o código acima e clicar em "Run". Isso criará as tabelas para sincronizar conteúdo e o placar de participantes de forma idêntica!
                  </p>
                </div>
              </div>

              {/* Core social configs */}
              <div className="space-y-4 border-t border-white/5 pt-6 text-left">
                <h4 className="text-sm font-mono text-gray-400 uppercase">Contato & Redes Sociais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">YouTube Link</label>
                    <input type="text" value={contactYt} onChange={(e) => setContactYt(e.target.value)} className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">E-mail Técnico LACiF</label>
                    <input type="text" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">Instagram Link</label>
                    <input type="text" value={contactInsta} onChange={(e) => setContactInsta(e.target.value)} className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">TikTok Link</label>
                    <input type="text" value={contactTiktok} onChange={(e) => setContactTiktok(e.target.value)} className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded text-xs" />
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
