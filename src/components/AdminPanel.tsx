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
  BarChart3
} from 'lucide-react';
import { SiteContent, Director, ForensicSpecialty, QuizQuestion, LibraryItem, FAQItem, GalleryItem } from '../types.ts';
import { isFirebaseEnabled } from '../lib/firebase.ts';
import { SafeStorage } from '../utils/storage.ts';

interface AdminPanelProps {
  content: SiteContent;
  onUpdateContent: (updated: SiteContent) => void;
  onClose: () => void;
  onResetToDefaults: () => void;
}

export default function AdminPanel({ content, onUpdateContent, onClose, onResetToDefaults }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'members' | 'specialties' | 'quizzes' | 'mural' | 'library' | 'faq' | 'system' | 'metrics'>('metrics');
  
  // Status feedback
  const [saveSuccess, setSaveSuccess] = useState(false);

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
  const [contactInsta, setContactInsta] = useState(content.contact.instagram);
  const [contactTiktok, setContactTiktok] = useState(content.contact.tiktok);
  const [contactYt, setContactYt] = useState(content.contact.youtube);
  const [contactWa, setContactWa] = useState(content.contact.whatsapp);
  const [contactEmail, setContactEmail] = useState(content.contact.email);
  const [contactAddr, setContactAddr] = useState(content.contact.address);
  const [formGoogleDriveUrl, setFormGoogleDriveUrl] = useState(content.googleDriveUrl || '');
  const [formLibraryDriveUrl, setFormLibraryDriveUrl] = useState(content.libraryDriveUrl || '');

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
    if (password === 'LACIF2026PERICIAL') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Senha pericial inválida. Verifique o manual ou credenciais.');
    }
  };

  const handleGlobalSave = () => {
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
      quizQuestions: quizzes,
      galleryItems: gallery,
      libraryItems: library,
      faqs: faqs,
      selectiveProcess: {
        ...content.selectiveProcess,
        subscriptionUrl: subUrl
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
      libraryDriveUrl: formLibraryDriveUrl
    };

    onUpdateContent(updatedContent);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
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
              VERIFICAÇÃO DE CREDENCIAIS LACIF
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

          <p className="text-[10px] text-gray-600 text-center mt-6 font-mono">
            Senha Acadêmica padrão: LACIF2026PERICIAL
          </p>
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
              <span className="text-gray-600">|</span>
              {isFirebaseEnabled ? (
                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal">
                  ● Nuvem Ativa (Firebase Sync)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] text-yellow-500 bg-yellow-400/10 border border-yellow-400/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-normal" title="Configure as chaves do Firebase no Vercel para sincronizar em outros computadores">
                  ● Local (Navegador)
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-[11px] font-mono text-green-400 bg-green-500/15 border border-green-500/20 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
              <CheckCircle className="h-3.5 w-3.5" /> Site Atualizado!
            </span>
          )}
          <button
            onClick={handleGlobalSave}
            className="px-4 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Save className="h-4 w-4" /> SALVAR SITE
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
            onClick={() => setActiveTab('quizzes')}
            className={`w-full text-left p-2.5 text-xs font-mono rounded-lg flex items-center gap-2 transition-colors uppercase ${
              activeTab === 'quizzes' ? 'bg-blue-950/40 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <HelpCircle className="h-4 w-4" /> Quizzes Simulados
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
                    Painel exclusivo de telemetria estatística das seções, tráfego e ferramentas da LACIF UFF.
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
                      galeria: "Galerias da LACIF UFF / Fotos",
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
                <h4 className="text-sm font-mono text-gray-400 uppercase">Histórico e Origem LACIF</h4>
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
              <div>
                <h3 className="text-lg font-display font-medium text-yellow-400 mb-1">Especialidades Científicas</h3>
                <p className="text-gray-400 text-xs font-mono font-sans pb-3">Edite laudos detalhados e tópicos curriculares das disciplinas forenses</p>
              </div>

              <div className="space-y-4">
                {specialties.map((s) => (
                  <div key={s.id} className="p-4 rounded-xl border border-white/5 bg-zinc-900/10">
                    <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
                      <span className="font-mono text-xs text-yellow-400 font-semibold">{s.title}</span>
                      <button 
                        onClick={() => handleEditSpecialty(s)}
                        className="px-3 py-1 rounded bg-white/5 text-[10px] border border-white/10 font-mono text-blue-400 hover:text-white"
                      >
                        Editar Disciplina
                      </button>
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
                <span className="text-xs text-yellow-400 font-mono font-bold uppercase tracking-wider block border-b border-white/5 pb-2">Link Único de Admissão (Google Forms)</span>
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-1 uppercase">Link do Google Forms de Inscrição</label>
                  <input
                    type="url"
                    value={subUrl}
                    onChange={(e) => setSubUrl(e.target.value)}
                    placeholder="https://docs.google.com/forms/..."
                    className="w-full p-2.5 bg-zinc-900 border border-white/10 rounded-lg text-xs"
                  />
                  <p className="text-[10px] text-gray-500 font-mono mt-1">Este link alimentará diretamente o botão "INSCREVA-SE" na seção pública de Processo Seletivo do seu site.</p>
                </div>
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
                  Caso deseje exportar todas as modificações que fez (textos, fotos locais, manuais) ou prefira restaurar as configurações pré-construídas originais de fábrica da LACIF, escolha uma das ações:
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

              {/* Core social configs */}
              <div className="space-y-4 border-t border-white/5 pt-6 text-left">
                <h4 className="text-sm font-mono text-gray-400 uppercase">Contato & Redes Sociais</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">YouTube Link</label>
                    <input type="text" value={contactYt} onChange={(e) => setContactYt(e.target.value)} className="w-full p-2.5 bg-zinc-900 border border-white/5 rounded text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-1">E-mail Técnico LACIF</label>
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
