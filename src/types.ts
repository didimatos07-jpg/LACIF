export interface Director {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  instagram: string;
  lattes: string;
  image: string;
}

export interface ForensicSpecialty {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  image: string;
  glowColor: string; // e.g., 'blue', 'yellow'
  skills: string[];
}

export interface VocationalQuestion {
  id: string;
  question: string;
  options: {
    text: string;
    pointsFor: string; // e.g. 'dna', 'ballistics', 'toxicology', etc.
  }[];
}

export interface VocationalResult {
  id: string;
  title: string;
  description: string;
  image: string;
  profile: string;
  skills: string[];
  curiosities: string[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ExternalQuizLink {
  id: string;
  title: string;
  url: string;
  description: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: 'Livro' | 'Artigo' | 'Documentário' | 'Técnica' | 'PDF' | 'Protocolo' | 'Estudo de Caso';
  url: string;
  description: string;
  fileSize?: string;
  fileType?: 'image' | 'pdf' | 'link';
  fileName?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  description: string;
  fileType?: 'image' | 'pdf';
  fileName?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface SelectiveProcess {
  editalUrl: string;
  subscriptionUrl: string;
  requirements: string[];
  schedule: {
    event: string;
    date: string;
  }[];
  isOpen?: boolean;
}

export interface ContactInfo {
  instagram: string;
  tiktok: string;
  youtube: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface AcademicModule {
  id: string;
  tag: string;
  title: string;
  description: string;
  skills: string[];
}

export interface AcademicPillar {
  id: string;
  title: string;
  description: string;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  mission: string;
  vision: string;
  values: string[];
  historyText: string;
  historyImage: string;
  directors: Director[];
  specialties: ForensicSpecialty[];
  academicModules?: AcademicModule[];
  academicPillars?: AcademicPillar[];
  vocationalQuestions: VocationalQuestion[];
  vocationalResults: Record<string, VocationalResult>;
  quizQuestions: QuizQuestion[];
  externalQuizzes: ExternalQuizLink[];
  libraryItems: LibraryItem[];
  galleryItems: GalleryItem[];
  faqs: FAQItem[];
  selectiveProcess: SelectiveProcess;
  contact: ContactInfo;
  googleDriveUrl?: string;
  libraryDriveUrl?: string;
  escapeRoomConfig?: EscapeRoomConfig;
  escapeRoomRankings?: EscapeRoomRanking[];
  quizRankings?: QuizRanking[];
}

export interface QuizRanking {
  name: string;
  score: number;
  totalQuestions: number;
  date: string;
  email?: string;
  classification?: string;
}

export interface EscapeRoomRoom {
  id: string;
  name: string;
  theme: string;
  challengeTitle: string;
  challengeDesc: string;
  vestigios?: string; // Vestígios do caso
  difficulty?: 'Fácil' | 'Médio' | 'Difícil'; // Dificuldade do caso
  isActive?: boolean; // Se a questão está ativa no jogo
  order?: number; // Ordem da questão
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  optionExplanations?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'pdf';
  curiosity: string;
}

export interface EscapeRoomCase {
  id: string;
  title: string;
  story: string;
  finalCulpritIndex: number;
  culpritOptions: string[];
}

export interface EscapeRoomAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface EscapeRoomRanking {
  name: string;
  score: number;
  time: string;
  date: string;
  classification: string;
}

export interface EscapeRoomConfig {
  introText: string;
  rooms: EscapeRoomRoom[];
  cases: EscapeRoomCase[];
  achievements: EscapeRoomAchievement[];
  pointsPerCorrect: number;
  pointsPerIncorrect: number;
  pointsPerRoom: number;
  pointsPerGame: number;
  stats?: {
    totalAccesses?: number;
    totalCompleted?: number;
    totalCorrectAttempts?: number;
    totalAttempts?: number;
    completedGames?: number;
    averageAccuracy?: number;
    averageScore?: number;
  };
}
