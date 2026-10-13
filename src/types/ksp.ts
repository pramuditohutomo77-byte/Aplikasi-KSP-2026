export type EducationLevel = 'PAUD' | 'SD' | 'SMP' | 'SMA' | 'SMK' | 'SLB';

export type PaperSize = 'A4' | 'F4' | 'Letter';

export type CoverTheme = 
  | 'kemdikbud-blue' 
  | 'geosmart-emerald' 
  | 'nusantara-navy' 
  | 'maroon-royal' 
  | 'minimalist-slate';

export interface Margins {
  top: number;    // cm
  bottom: number; // cm
  left: number;   // cm
  right: number;  // cm
}

export interface PrintSettings {
  paperSize: PaperSize;
  margins: Margins;
  marginPreset: '4-4-3-3' | '4-3-3-3' | '3-3-3-3' | 'custom';
  fontFamily: 'Plus Jakarta Sans' | 'Times New Roman' | 'Calibri' | 'Arial' | 'Merriweather';
  fontSize: '11pt' | '12pt';
  lineHeight: '1.15' | '1.5' | '1.25';
  showPageNumbers: boolean;
  showWatermark: boolean;
  watermarkText: string;
}

export interface SchoolIdentity {
  name: string;
  npsn: string;
  curriculumName: string; // e.g., "KURIKULUM GEOSMART" or "KURIKULUM SATUAN PENDIDIKAN"
  curriculumSubtitle: string; // e.g., "Berbasis Pembelajaran Mendalam (Deep Learning)"
  status: 'Negeri' | 'Swasta';
  educationType: 'Formal' | 'Non-Formal';
  ownership: string; // e.g., "Pemerintah Daerah", "Yayasan Pendidikan X"
  skEstablishment: string;
  skEstablishmentDate: string;
  skOperational: string;
  skOperationalDate: string;
  principalName: string;
  principalNip: string;
  address: string;
  village: string;
  district: string;
  regency: string;
  province: string;
  postalCode: string;
  website: string;
  email: string;
  phone: string;
  academicYear: string; // e.g., "2025/2026"
  logoUrl?: string;
  level: EducationLevel;
}

export interface CoverConfig {
  theme: CoverTheme;
  title: string;
  curriculumBrand: string;
  schoolName: string;
  regencyInfo: string;
  academicYear: string;
  npsn: string;
  showLogo: boolean;
  showMinistryLogo: boolean;
  coverImage?: string;
}

export interface EndorsementConfig {
  city: string;
  date: string;
  schoolName: string;
  academicYear: string;
  statementText: string;
  principalName: string;
  principalNip: string;
  showCommitteeSignature: boolean;
  committeeName: string;
  showSupervisorSignature: boolean;
  supervisorName: string;
  supervisorNip: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  affiliationOrSubject: string;
}

export interface DraftingTeamConfig {
  advisors: TeamMember[];
  draftingTeam: TeamMember[];
  reviewers: TeamMember[];
}

export interface ForewordConfig {
  paragraphs: string[];
  signingDate: string;
  signingPlace: string;
  signatoryTitle: string;
  signatoryName: string;
}

export interface TableOfContentItem {
  id: string;
  code: string;
  title: string;
  level: 1 | 2;
  pageNumber: number;
}

export interface PTKItem {
  id: string;
  name: string;
  qualification: string;
  position: string;
  subject: string;
  employmentStatus: string;
}

export interface StudentCohort {
  id: string;
  cohortName: string; // e.g., "Kelas VII", "Fase D", etc.
  rombelCount: number;
  maleCount: number;
  femaleCount: number;
  totalCount: number;
}

export interface FacilityBuildingItem {
  id: string;
  name: string;
  count: number;
  unit: string;
  condition: string;
}

export interface LearningMediaItem {
  id: string;
  name: string;
  count: number;
  unit: string;
  condition: string;
}

export interface PartnershipItem {
  id: string;
  institution: string;
  scope: string;
}

export interface Chapter1Data {
  profileDescription: string[];
  socioEconomicCulture: string[];
  localWisdom: string[];
  ptkSummary: string;
  ptkList: PTKItem[];
  studentSummary: string;
  studentCohorts: StudentCohort[];
  facilitySummary: string;
  facilities: FacilityBuildingItem[];
  learningMedia: LearningMediaItem[];
  partnershipSummary: string;
  partnerships: PartnershipItem[];
}

export interface Chapter2Data {
  vision: string;
  visionNarrative: string[];
  missions: string[];
  goals: string[];
  smartAnalysisNotes: string;
}

export interface SubjectHourItem {
  id: string;
  subjectName: string;
  intraHoursPerWeek: number;
  intraHoursPerYear: number;
  kokoHoursPerYear: number;
  totalHoursPerYear: number;
  isMulok?: boolean;
}

export interface KokurikulerItem {
  id: string;
  classes: string;
  dimensions: string; // e.g. "Penalaran Kritis, Kolaborasi"
  theme: string;      // e.g. "Kearifan Lokal - Lindungi Geopark-ku"
  method: string;     // e.g. "Pembelajaran kolaboratif lintas disiplin ilmu"
  activities: string[];
  relatedSubjects: string;
  allocationJP: number;
}

export interface EkstrakurikulerItem {
  id: string;
  name: string;
  goals: string[];
  dimensions: string;
  timeWeekly: string;
  coach: string;
  location: string;
}

export interface Chapter3Data {
  learningApproach: 'Mata Pelajaran' | 'Tematik' | 'Terintegrasi' | 'Blok';
  approachRationale: string[];
  curriculumStructureTables: {
    title: string;
    gradeLabel: string;
    items: SubjectHourItem[];
  }[];
  kokurikulerDescription: string[];
  kokurikulerProjects: KokurikulerItem[];
  ekstrakurikulerDescription: string[];
  ekstrakurikulerList: EkstrakurikulerItem[];
  timeArrangementPrinciples: string[];
}

export interface ATPItem {
  id: string;
  subjectName: string;
  phase: string;
  grades: string;
  academicYear: string;
  learningOutcomes: string; // Capaian Pembelajaran
  learningObjectives: string[]; // Tujuan Pembelajaran
  progressionFlow: {
    grade: string;
    steps: string[];
  }[];
}

export interface DeepLearningLessonPlan {
  designerName: string;
  schoolName: string;
  classSemester: string;
  phaseGrade: string;
  academicYear: string;
  subject: string;
  duration: string;
  // A. Identifikasi
  studentBackground: string;
  learningMaterialContext: string;
  targetedDimensions: string[];
  // B. Desain Pembelajaran
  learningObjectives: string[];
  pedagogicalModel: string;
  pedagogicalApproach: string; // e.g. Pembelajaran Mendalam (Deep Learning), TPACK
  partnerships: string;
  learningEnvironments: {
    physical: string;
    virtual: string;
  };
  digitalTools: string[];
  // C. Langkah Pembelajaran (Mindful, Meaningful, Joyful)
  meetings: {
    meetingNo: number;
    title: string;
    mindfulMeaningfulActivities: string[];
    applyingJoyfulActivities: string[];
    reflectingActivities: string[];
  }[];
  // D. Asesmen
  formativeAssessment: string;
  summativeAssessment: string;
}

export interface Chapter4Data {
  satuanPendidikanRationale: string[];
  atpList: ATPItem[];
  sampleLessonPlan: DeepLearningLessonPlan;
}

export interface EvaluationItem {
  id: string;
  activityName: string;
  frequency: string;
  purpose: string;
  pic: string;
}

export interface ProfessionalDevItem {
  id: string;
  activityName: string;
  schedule: string;
  pic: string;
  speaker: string;
}

export interface MentoringItem {
  id: string;
  stage: 'Persiapan' | 'Pelaksanaan' | 'Tindak Lanjut';
  activityDescription: string;
  schedule: string;
  pic: string;
}

export interface Chapter5Data {
  evaluationIntro: string[];
  evaluationTable: EvaluationItem[];
  professionalDevIntro: string[];
  professionalDevTable: ProfessionalDevItem[];
  mentoringIntro: string[];
  mentoringTable: MentoringItem[];
}

export interface AppendixItem {
  id: string;
  number: string;
  title: string;
  description: string;
  included: boolean;
  type: 'sk_pbm' | 'roster_jadwal' | 'lkpd_projek' | 'custom';
  contentSnippet: string;
  uploadedFileName?: string;
  uploadedFileSize?: string;
  uploadedAt?: string;
  extractedText?: string;
  paragraphs?: string[];
  htmlContent?: string;
}

export interface KSPDocument {
  identity: SchoolIdentity;
  cover: CoverConfig;
  endorsement: EndorsementConfig;
  team: DraftingTeamConfig;
  foreword: ForewordConfig;
  chapter1: Chapter1Data;
  chapter2: Chapter2Data;
  chapter3: Chapter3Data;
  chapter4: Chapter4Data;
  chapter5: Chapter5Data;
  appendices: AppendixItem[];
  printSettings: PrintSettings;
}
