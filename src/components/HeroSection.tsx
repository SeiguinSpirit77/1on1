import React, { useState, useEffect, useRef } from 'react';
import { 
  Check, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Clock, 
  Award, 
  Lock,
  CreditCard,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  Send,
  Sliders,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CloudDivider = ({ flipped = false, className = "" }: { flipped?: boolean; className?: string }) => {
  return (
    <div 
      className={`relative w-full h-24 sm:h-32 md:h-36 pointer-events-none select-none z-40 ${className}`}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
      }}
    >
      {/* Stereoscopic Depth Level 1: Deep Slow-Drifting Clouds */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          x: ["-2%", "2%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <img
          src="/src/assets/images/sekcje_chmury_1779527144416.png"
          alt="Głębokie chmury"
          className={`w-[160%] h-full object-fill opacity-45 mix-blend-screen absolute left-[-30%] ${flipped ? 'rotate-180' : ''}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Stereoscopic Depth Level 2: Foreground Billowing Clouds protruding and floating */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          y: [-5, 5],
          x: ["1%", "-1%"],
        }}
        transition={{
          y: {
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          },
          x: {
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <img
          src="/src/assets/images/sekcje_chmury_1779527144416.png"
          alt="Chmury pierwszego planu"
          className={`w-[160%] h-[120%] object-fill opacity-85 mix-blend-screen absolute -top-[10%] left-[-30%] filter blur-[0.3px] ${flipped ? 'rotate-180' : ''}`}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
};

// Classical Transformation Items
interface Transformation {
  name: string;
  metric1: string;
  metric2: string;
  beforeText: string;
  afterText: string;
  text: string;
  stats: { label: string; val: string }[];
  beforeImg?: string;
  afterImg?: string;
}

const TRANSFORMATIONS: Transformation[] = [
  {
    name: "Mateusz",
    metric1: "+48 kg na ławie / 8 mies.",
    metric2: "+10 kg suchej masy",
    beforeText: "Płaski profil, brak zdefiniowanej góry, regularne zmęczenie",
    afterText: "+10kg twardej muskulatury, wysunięta klatka, potężna gęstość pod sztangą",
    text: "Po 3 miesiącach progres lepszy niż po pierwszym roku na siłce. Dla mnie to coś więcej niż machanie ciężarem i jedzenie. System przeorganizował moją produktywność w pracy.",
    stats: [
      { label: "Wyciskanie leżąc", val: "85 kg → 133 kg" },
      { label: "Tkanka tłuszczowa", val: "16% → 11%" },
      { label: "Masa mięśniowa", val: "+10.4 kg" }
    ],
    beforeImg: "/src/assets/images/mateusz_przed.png",
    afterImg: "/src/assets/images/mateusz_po.png"
  },
  {
    name: "Sebastian",
    metric1: "−20 kg tkanki tłuszczowej",
    metric2: "Pewność siebie odbudowana",
    beforeText: "Utrata wigoru, zmęczenie o 14:00, sylwetka typu 'skinny-fat'",
    afterText: "Docięta talia, widoczne mięśnie brzucha, wysoka energia cały dzień",
    text: "Myślałem, że muszę głodować. Okazało się, że brakowało mi mądrej regeneracji i właściwej struktury makro. Wyniki w biznesie poszybowały razem z życiową formą.",
    stats: [
      { label: "Waga ciała", val: "94 kg → 74 kg" },
      { label: "Obwód pasa", val: "101 cm → 81 cm" },
      { label: "Sen głęboki", val: "45 min → 1h 50 min" }
    ],
    beforeImg: "/src/assets/images/seb_before_1779526276521.png",
    afterImg: "/src/assets/images/seb_after_1779526257997.png"
  },
  {
    name: "Marek",
    metric1: "+40 kg na ławie płaskiej",
    metric2: "+8 kg masy mięśniowej",
    beforeText: "Plateau siłowe od 2 lat, nawracający ból w stawie barkowym",
    afterText: "Pełny zakres ruchu bez bólu, potężna gęstość mięśnia, nowa dyscyplina",
    text: "Prowadzę firmę i mam mało czasu. Elastyczny system żywieniowy w podróży i mądre deloady uratowały moje stawy i pozwoliły pobić życiówki po trzydziestce.",
    stats: [
      { label: "Przysiad tylny", val: "110 kg → 155 kg" },
      { label: "Wyciskanie stojąc", val: "55 kg → 78 kg" },
      { label: "Waga ciała", val: "82 kg → 90 kg" }
    ],
    beforeImg: "/src/assets/images/marek_before_1779526318300.png",
    afterImg: "/src/assets/images/marek_after_1779526297579.png"
  },
  {
    name: "Antoni",
    metric1: "−14 kg tkanki tłuszczowej",
    metric2: "Lepsza ostrość umysłu i regeneracja",
    beforeText: "Brak energii po 15:00, bezsenność, słabe trawienie, oponka na brzuchu",
    afterText: "Docięcie do 10.5% BF, uregulowane zasypianie, doskonałe samopoczucie",
    text: "Dzięki precyzyjnemu protokołowi odżywiania i treningów siłowych odzyskałem koncentrację, którą traciłem w połowie dnia pracy. Sylwetka to tylko skutek uboczny nowej struktury dnia.",
    stats: [
      { label: "Waga ciała", val: "89 kg → 75 kg" },
      { label: "Tkanka tłuszczowa", val: "21% → 10.5%" },
      { label: "Ograniczenie stresu", val: "Redukcja kortyzolu o 40%" }
    ],
    beforeImg: "/src/assets/images/antoni_before_1779531281537.png",
    afterImg: "/src/assets/images/antoni_after_1779531298930.png"
  },
  {
    name: "Wojtek",
    metric1: "+35 kg w martwym ciągu / 6 mies.",
    metric2: "Pełna kontrola sylwetki bez wyrzeczeń",
    beforeText: "Siedzący tryb życia, chroniczny ból pleców, brak czasu na gotowanie",
    afterText: "Plecy bez jakiegokolwiek bólu, twarde i nabite mięśnie, zero ograniczeń w podróży",
    text: "Po 3 miesiącach progres lepszy niż po pierwszym roku na siłce. Dla mnie to coś więcej niż machanie ciężarem i jedzenie. System przeorganizował moją produktywność w pracy i poprawił jakość snu.",
    stats: [
      { label: "Martwy ciąg", val: "120 kg → 175 kg" },
      { label: "Obwód ramienia", val: "38 cm → 41.5 cm" },
      { label: "Sen głęboki", val: "50 min → 1h 45 min" }
    ],
    beforeImg: "/src/assets/images/wojtek_before_1779531363750.png",
    afterImg: "/src/assets/images/wojtek_after_1779531380196.png"
  }
];

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Quiz & Path states
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizStep, setQuizStep] = useState(0); // 0 = micro-commitment screen
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Form input answers state
  const [answers, setAnswers] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    budget: '',     // Q5 budget Invest
    hours: '',      // Q6 weekly commitment 
    bloodTest: '',  // Q7 blood lab work
    goals: [] as string[], // Q8 areas of focus (max 2)
    motivation: '', // Q9 why now essay (min 100 character check)
    experience: '', // Q10 years of lifting env
    coached: '',    // Q11 mentor history
    timeline: ''    // Q12 start readiness
  });

  // Score metrics
  const [computedScore, setComputedScore] = useState(0);
  const [assignedRoute, setAssignedRoute] = useState<'A' | 'B' | 'C' | null>(null);

  // Outcome interactions
  const [selectedMeetingDate, setSelectedMeetingDate] = useState('2026-05-25');
  const [selectedMeetingHour, setSelectedMeetingHour] = useState('14:30');
  const [meetingBooked, setMeetingBooked] = useState(false);

  // Interactive Před/Po active state for each transformation item
  const [activeTransIndex, setActiveTransIndex] = useState(0);
  const [showBeforeTab, setShowBeforeTab] = useState(false);

  // Group payment Checkout simulation state
  const [ccNumber, setCcNumber] = useState('');
  const [ccExpiry, setCcExpiry] = useState('');
  const [ccCvc, setCcCvc] = useState('');
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Quick evaluation algorithm on submit
  const evaluateApplication = () => {
    let score = 0;

    // Q5 Budget invest
    if (answers.budget === 'less-2k') score += 15;
    else if (answers.budget === 'from-2500') score += 15;
    else if (answers.budget === '5k-6k') score += 22;
    else if (answers.budget === 'price-no-matter') score += 25;

    // Q6 Weekly commitment
    if (answers.hours === '5-8') score += 5;
    else if (answers.hours === '8-12') score += 12;
    else if (answers.hours === '12-18') score += 20;
    else if (answers.hours === 'unlimited') score += 25;

    // Q7 Blood Labs
    if (answers.bloodTest === 'yes') score += 15;
    else if (answers.bloodTest === 'yes-help') score += 12;
    else if (answers.bloodTest === 'doubt') score += 3;

    // Q8 Areas of focus (max 2) - sum and cap at 20 pts
    let goalScoreSum = 0;
    answers.goals.forEach(g => {
      if (g === 'mass') goalScoreSum += 5;
      if (g === 'fat') goalScoreSum += 5;
      if (g === 'hormone') goalScoreSum += 8;
      if (g === 'nervous') goalScoreSum += 6;
      if (g === 'lifestyle') goalScoreSum += 10;
    });
    score += Math.min(goalScoreSum, 20);

    // Q9 Motivation text character length check
    const mLength = answers.motivation.trim().length;
    if (mLength >= 200) score += 10;
    else if (mLength >= 100) score += 3;

    // Q10 Experience in strength training
    if (answers.experience === 'none') score += 3;
    else if (answers.experience === '6m') score += 5;
    else if (answers.experience === '6m-2y') score += 10;
    else if (answers.experience === '2y-5y') score += 15; // sweet spot!
    else if (answers.experience === '5y+') score += 12;

    // Q11 Experience with coaches
    if (answers.coached === 'never') score += 3;
    else if (answers.coached === 'once-bad') score += 8;
    else if (answers.coached === 'complex-needs') score += 15;
    else if (answers.coached === 'current') score += 5;

    // Q12 Timeline decision readiness
    if (answers.timeline === 'now') score += 15;
    else if (answers.timeline === '2w') score += 10;
    else if (answers.timeline === '1m') score += 5;

    setComputedScore(score);

    // Route determination
    if (score >= 80) {
      setAssignedRoute('A');
    } else if (score >= 50) {
      setAssignedRoute('B');
    } else {
      setAssignedRoute('C');
    }
  };

  // Step state management
  const nextQuizStep = () => {
    // Basic validation per step
    if (quizStep === 1) {
      if (!answers.name || !answers.email || !answers.phone || !answers.age) {
        alert("Wypełnij wszystkie wymagane pola tożsamości.");
        return;
      }
      const ageVal = parseInt(answers.age, 10);
      if (isNaN(ageVal)) {
        alert("Podaj prawidłowy wiek.");
        return;
      }
      if (ageVal < 16) {
        // Child safety trigger handled inside render blocks immediately
        return;
      }
    }
    if (quizStep === 2 && !answers.budget) {
      alert("Proszę zaznaczyć jedną z dostępnych opcji finansowych.");
      return;
    }
    if (quizStep === 3 && (!answers.hours || !answers.bloodTest)) {
      alert("Proszę odpowiedzieć na oba pytania dotyczące zaangażowania.");
      return;
    }
    if (quizStep === 4) {
      if (answers.goals.length === 0) {
        alert("Wybierz przynajmniej jeden kluczowy obszar.");
        return;
      }
      if (answers.motivation.trim().length < 100) {
        alert("Twój opis motywacji musi zawierać co najmniej 100 znaków. To test szczegółu i determinacji.");
        return;
      }
    }
    if (quizStep === 5 && (!answers.experience || !answers.coached)) {
      alert("Proszę odpowiedzieć na pytania dotyczące doświadczenia i historii.");
      return;
    }
    if (quizStep === 6 && !answers.timeline) {
      alert("Proszę określić optymalny termin startu.");
      return;
    }

    if (quizStep === 6) {
      // Final submission triggered -> Launch simulating analytic evaluation matrix
      setIsAnalyzing(true);
      setAnalysisProgress(0);
      evaluateApplication();

      const interval = setInterval(() => {
        setAnalysisProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsAnalyzing(false);
              setQuizStep(7); // Show outputs
            }, 600);
            return 100;
          }
          return p + 4;
        });
      }, 80);
    } else {
      setQuizStep(prev => prev + 1);
    }
  };

  const selectGoalOption = (g: string) => {
    if (answers.goals.includes(g)) {
      setAnswers(prev => ({ ...prev, goals: prev.goals.filter(item => item !== g) }));
    } else {
      if (answers.goals.length < 2) {
        setAnswers(prev => ({ ...prev, goals: [...prev.goals, g] }));
      } else {
        // limit to max 2 choices
        setAnswers(prev => ({ ...prev, goals: [prev.goals[1], g] }));
      }
    }
  };

  const startQuiz = () => {
    setQuizStep(1);
  };

  const closeQuiz = () => {
    setShowQuizModal(false);
    // Reset states
    setQuizStep(0);
    setIsAnalyzing(false);
    setAnswers({
      name: '',
      email: '',
      phone: '',
      age: '',
      budget: '',
      hours: '',
      bloodTest: '',
      goals: [],
      motivation: '',
      experience: '',
      coached: '',
      timeline: ''
    });
    setMeetingBooked(false);
    setCheckoutCompleted(false);
    setCcNumber('');
    setCcExpiry('');
    setCcCvc('');
  };

  return (
    <div className="bg-[#0a0908] text-[#f5f1e8] min-h-screen relative font-sans leading-relaxed selection:bg-[#c9a84c] selection:text-[#0a0908]">
      
      {/* ===== GLOBAL BACKGROUND SOUND EFFECTS / STYLES ===== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-30%] left-[-20%] w-[100vw] h-[100vw] bg-[radial-gradient(circle,rgba(201,168,76,0.06)_0%,transparent_70%)] opacity-85" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[radial-gradient(circle,rgba(201,168,76,0.04)_0%,transparent_60%)]" />
      </div>

      {/* ===== NAV BAR ===== */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-5 transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0908]/95 backdrop-blur-xl border-b border-[#c9a84c]/20 py-4 shadow-xl' 
            : 'bg-gradient-to-b from-[#0a0908]/90 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-1.5 select-none">
            <span 
              className="text-2xl font-semibold tracking-[0.08em] text-[#f5f1e8] font-serif transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              IMPERIUM<span className="text-[#c9a84c] font-bold">.</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#poznaj-system" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">poznaj system</a>
            <a href="#4-filary" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">4 filary</a>
            <a href="#kim-jestem" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">kim jestem</a>
            <a href="#efekty" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">efekty</a>
            <a href="#selekcja" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">selekcja</a>
            <a href="#faq" className="text-xs font-mono uppercase tracking-[0.2em] text-[#a39c8d] hover:text-[#f5f1e8] transition-colors">faq</a>
          </div>

          <div className="relative group select-none">
            {/* Clean white ambient underglow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-white/10 opacity-25 blur-md rounded-full transition-all duration-500 group-hover:opacity-60 group-hover:blur-lg" />
            
            <button 
              onClick={() => setShowQuizModal(true)}
              className="relative font-sans text-[11px] tracking-[0.15em] uppercase font-bold bg-[#f5f1e8] hover:bg-white text-[#0a0a09] px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 active:scale-[0.97] hover:cursor-pointer shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
            >
              Aplikuj do prowadzenia
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HEADER HERO SECTION WITH THE ASSET IMAGE & CINEMATIC SPLIT ===== */}
      <header className="hero min-h-screen relative flex items-center pt-24 overflow-hidden z-20" id="hero">
        
        {/* Exact cinematic blur overlay components specified by the user */}
        <div className="blur-overlay blur-overlay-top pointer-events-none" />
        <div className="blur-overlay blur-overlay-bottom pointer-events-none" />

        {/* Backgroud asset image unchanged / static position */}
        <div 
          className="hero-bg absolute inset-0 select-none opacity-85 transition-all duration-700 ease-out brightness-[0.95]"
          style={{ 
            backgroundImage: "url('/src/assets/images/imperium_hero_1779451726409.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 24%",
            zIndex: 0
          }}
        />

        {/* Backdrop visual depth layer to allow complete central visibility of the seashell man */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-transparent to-[#0a0908] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] via-transparent to-[#0a0908] pointer-events-none z-10" />

        <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 relative z-30 py-16">
          
          {/* Symmetrical Split Grid Layout: Left text, Right description, empty middle block to show the figure */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Split Pillar 1 (Left Side of Screen) */}
            <div className="md:col-span-5 text-left py-4">
              <span className="eyebrow block">Prowadzenie 1:1</span>
              <h1 
                className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#f5f1e8] leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Sylwetka to <span className="italic block sm:inline text-[#c9a84c]">skutek uboczny</span>.
              </h1>
            </div>

            {/* Empty Center Spacing of Screen to completely visual-unblock the rising Seahshell figure */}
            <div className="hidden md:block md:col-span-2 min-h-[100px]" />

            {/* Split Pillar 2 (Right Side of Screen) */}
            <div className="md:col-span-5 text-left md:text-right bg-black/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-xs border border-white/5 md:border-none">
              <h2 
                className="text-2xl sm:text-3.5xl lg:text-4xl font-normal text-[#f5f1e8] mb-6 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Prawdziwa gra toczy się na czterech filarach
              </h2>
              
              <p className="text-[#a39c8d] text-sm sm:text-base font-light mb-8 max-w-md md:ml-auto leading-relaxed">
                Uwalniamy Cię od zgadywania, zmęczenia i bezcelowych treningów. Optymalizujemy Trening, Regenerację, Styl Życia i Odżywianie pod osobisty kod biologiczny. Sylwetka buduje się sama, jako rygorystyczna konsekwencja systemu.
              </p>

              {/* Magnificent Liquid Glass Call To Action leading directly to the qualifying application */}
              <div className="relative group w-full sm:w-auto inline-block">
                {/* Clean white/gold ambient underglow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gradient-to-r from-white via-[#c9a84c]/30 to-white opacity-25 blur-xl rounded-full transition-all duration-500 group-hover:opacity-45 group-hover:blur-2xl" />
                
                <button 
                  onClick={() => setShowQuizModal(true)}
                  className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4.5 px-12 bg-[#f5f1e8] hover:bg-white text-[#0a0a09] font-sans text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none text-center shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:cursor-pointer group/btn"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Aplikuj do prowadzenia
                    <ArrowRight className="w-4 h-4 text-[#0a0a09] transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                </button>
              </div>
            </div>

          </div>

          {/* Floating metadata validation elements - beautifully packaged as high-contrast minimalist white & gold badges with standardized elegant sizes */}
          <div className="mt-20 md:mt-32 max-w-4xl border-t border-white/10 pt-8 flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-3.5 bg-black/40 backdrop-blur-md border border-white/15 px-4.5 py-2 rounded-full transition-colors hover:border-white/30 select-none">
              <span className="text-[#f5f1e8] font-serif font-bold text-lg sm:text-xl leading-none">200+</span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[#a39c8d] uppercase">Zadowolonych klientów</span>
            </div>
            <div className="flex items-center gap-3.5 bg-black/40 backdrop-blur-md border border-white/15 px-4.5 py-2 rounded-full transition-colors hover:border-white/30 select-none">
              <div className="flex items-baseline gap-1 leading-none">
                <span className="text-[#f5f1e8] font-serif font-bold text-lg sm:text-xl">10</span>
                <span className="text-[10px] sm:text-xs font-serif italic text-[#a39c8d]">lat</span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[#a39c8d] uppercase">Doświadczenia treningowego</span>
            </div>
            <div className="flex items-center gap-3.5 bg-black/40 backdrop-blur-md border border-[#c9a84c]/30 px-4.5 py-2 rounded-full transition-all hover:border-[#c9a84c]/50 shadow-[0_0_15px_rgba(201,168,76,0.05)] select-none">
              <div className="flex items-baseline gap-1 leading-none text-[#c9a84c]">
                <span className="font-serif font-bold text-lg sm:text-xl">2</span>
                <span className="text-[10px] sm:text-xs font-serif italic opacity-85">na</span>
                <span className="font-serif font-bold text-lg sm:text-xl">5</span>
              </div>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] text-[#c9a84c] uppercase font-bold">Wolnych miejsc w miesiącu</span>
            </div>
          </div>

        </div>
      </header>

      <CloudDivider className="-my-8 sm:-my-12 relative z-35" />

      {/* ===== SECTION 1: DIAGNOZA (PROBLEM) ===== */}
      <section className="bg-[#131210] py-24 sm:py-32 relative z-30" id="poznaj-system">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          
          <div className="text-center sm:text-left mb-16">
            <span className="eyebrow block">poznaj system</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Dlaczego dotąd <span className="italic text-[#c9a84c]">nie działało</span>.
            </h2>
            <p className="text-base sm:text-lg text-[#a39c8d] font-light max-w-xl">
              Robisz wszystko, co Ci kazali. A organizm milczy.
            </p>
          </div>

          <ul className="divide-y divide-[#c9a84c]/10 border-y border-[#c9a84c]/10 mb-16">
            {[
              { num: "I", text: "Trenujesz coraz ciężej, a progres stoi w miejscu od miesięcy." },
              { num: "II", text: "Śpisz źle, budzisz się zmęczony, energia spada o 14:00." },
              { num: "III", text: "Liczysz kalorie z aplikacji, ale waga drgnęła raz i zamarła." },
              { num: "IV", text: "Masz plan z Excela, ale nikt nie powiedział Ci, że zajeżdżasz układ nerwowy." }
            ].map((prob, idx) => (
              <li 
                key={idx}
                className="py-6 flex items-start gap-6 group hover:pl-4 transition-all duration-300 hover:bg-white/[0.01]"
              >
                <span className="font-mono text-xs text-[#c9a84c] tracking-[0.2em] font-medium pt-1 min-w-[30px]">
                  {prob.num}
                </span>
                <p 
                  className="text-lg sm:text-xl text-[#a39c8d] group-hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {prob.text}
                </p>
              </li>
            ))}
          </ul>

          <div className="problem-close p-8 sm:p-10 border-l-2 sm:border-l-4 border-[#c9a84c] bg-[#1a1815] transition-all duration-500 hover:bg-[#201e1a]">
            <h4 
              className="display text-2xl sm:text-3xl lg:text-4xl text-[#f5f1e8] leading-snug"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Problem nie leży w Twojej dyscyplinie.<br />
              <span className="italic text-[#c9a84c]">Leży w architekturze.</span>
            </h4>
          </div>

          <div className="mt-16 text-center">
            <div className="relative group inline-block">
              {/* Imperial Gold Underglow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-7 bg-gradient-to-r from-[#c9a84c] via-[#ecd599] to-[#c9a84c] opacity-50 blur-xl rounded-full transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl shadow-[0_0_25px_rgba(201,168,76,0.3)]" />
              
              <button 
                onClick={() => setShowQuizModal(true)}
                className="relative inline-flex items-center justify-center gap-3 py-4.5 px-12 border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#161512] to-[#0a0a09] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none shadow-[inset_0_1px_2px_rgba(201,168,76,0.1),0_4px_20px_rgba(0,0,0,0.8)] hover:cursor-pointer font-sans"
              >
                Aplikuj do prowadzenia
              </button>
            </div>
          </div>

        </div>
      </section>

      <CloudDivider flipped className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 2: ZMIANA PARADYGMATU ===== */}
      <section className="py-24 sm:py-32 relative overflow-hidden z-30" id="paradigm">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10">
          
          <div className="mb-16">
            <span className="eyebrow block">Zmiana paradygmatu</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Nie ścigaj sylwetki.<br />
              <span className="italic text-[#c9a84c]">Zbuduj system, który ją produkuje.</span>
            </h2>
          </div>

          <div className="paradigm-content text-base sm:text-lg text-[#a39c8d] leading-relaxed font-light space-y-8 max-w-3xl">
            <p>
              Większość mężczyzn ściga sylwetkę bezpośrednio. Więcej powtórzeń, mniej kalorii, kolejna suplementacja z reklamy. Efekt: wypalenie, plateau i frustracja.
            </p>
            <p className="border-l border-[#c9a84c]/30 pl-6 text-[#f5f1e8] font-normal italic">
              "Imperium działa odwrotnie. Nie celujemy w sylwetkę — celujemy w system, który ją produkuje. Kiedy trening jest mądry, regeneracja głęboka, styl życia zoptymalizowany, a odżywianie ustawione pod cel — sylwetka pojawia się sama, jako skutek uboczny. Nie jako cel. Jako konsekwencja."
            </p>
            <p>
              To spektakularna różnica między mechaniczną walką z lustrem dzień po dniu a budowaniem precyzyjnej maszyny biologicznej.
            </p>
          </div>

          <div className="mt-16">
            <div className="relative group inline-block">
              {/* Imperial Gold Underglow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-7 bg-gradient-to-r from-[#c9a84c] via-[#ecd599] to-[#c9a84c] opacity-50 blur-xl rounded-full transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl shadow-[0_0_25px_rgba(201,168,76,0.3)]" />
              
              <button 
                onClick={() => setShowQuizModal(true)}
                className="relative inline-flex items-center justify-center gap-3 py-4.5 px-12 border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#161512] to-[#0a0a09] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none shadow-[inset_0_1px_2px_rgba(201,168,76,0.1),0_4px_20px_rgba(0,0,0,0.8)] hover:cursor-pointer font-sans"
              >
                Aplikuj do prowadzenia
              </button>
            </div>
          </div>

        </div>
      </section>

      <CloudDivider className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 3: RDZEŃ SYSTEMU (4 FILARY) ===== */}
      <section className="bg-[#131210]/50 py-24 sm:py-32 relative z-30" id="4-filary">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="mb-16 text-center md:text-left">
            <span className="eyebrow block">Rdzeń systemu</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Cztery filary, na których stoi <span className="italic text-[#c9a84c]">każda prawdziwa transformacja</span>.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Filar I */}
            <div className="filar group relative overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#131210] border border-[#c9a84c]/15 hover:border-[#c9a84c] rounded-xs p-8 sm:p-12 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c9a84c]/5">
              <div className="relative z-10 w-full mb-8">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#c9a84c] tracking-[0.3em] font-semibold block mb-4">
                  FILAR I
                </span>
                <h3 
                  className="display text-3xl sm:text-4xl text-[#f5f1e8] mb-2 font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Trening
                </h3>
                <p className="filar-hook font-serif italic text-lg sm:text-xl text-[#c9a84c]/80 mb-8">
                  Nie więcej. Mądrzej.
                </p>

                <ul className="space-y-4 border-t border-[#c9a84c]/10 pt-6">
                  {[
                    "Periodyzacja dopasowana do Twojego cyklu regeneracji",
                    "Intensywność dawkowana, nie maksymalizowana",
                    "Technika rozłożona na pierwsze czynniki",
                    "Progres mierzony tygodniowo, nie „na czuja\""
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm sm:text-base text-[#a39c8d] group-hover:text-white transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filar-effect relative z-10 p-5 mt-auto bg-black/45 border-l border-[#c9a84c] rounded-xs">
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-widest block mb-1 uppercase">EFEKT REGENERACJI</span>
                <p className="text-xs text-[#f5f1e8] leading-relaxed">
                  Progres tam, gdzie stałeś latami. <strong className="text-[#c9a84c] font-medium">Mateusz:</strong> +48 kg na ławie w 8 miesięcy. <strong className="text-[#c9a84c] font-medium">Dawid:</strong> podciąganie z 10 do 30 kg w 2 mies.
                </p>
              </div>
            </div>

            {/* Filar II */}
            <div className="filar group relative overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#131210] border border-[#c9a84c]/15 hover:border-[#c9a84c] rounded-xs p-8 sm:p-12 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c9a84c]/5">
              <div className="relative z-10 w-full mb-8">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#c9a84c] tracking-[0.3em] font-semibold block mb-4">
                  FILAR II
                </span>
                <h3 
                  className="display text-3xl sm:text-4xl text-[#f5f1e8] mb-2 font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Regeneracja
                </h3>
                <p className="filar-hook font-serif italic text-lg sm:text-xl text-[#c9a84c]/80 mb-8">
                  Sylwetka rośnie, kiedy śpisz.
                </p>

                <ul className="space-y-4 border-t border-[#c9a84c]/10 pt-6">
                  {[
                    "Architektura snu — od pierwszej godziny do REM",
                    "Zarządzanie układem nerwowym i stresorem treningowym",
                    "Deload wpisany w system, nie improwizowany w panice",
                    "Protokoły szybkiej regeneracji między sesjami"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm sm:text-base text-[#a39c8d] group-hover:text-white transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filar-effect relative z-10 p-5 mt-auto bg-black/45 border-l border-[#c9a84c] rounded-xs">
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-widest block mb-1 uppercase">EFEKT SYSTEMOWY</span>
                <p className="text-xs text-[#f5f1e8] leading-relaxed">
                  Budzisz się wypoczęty, progres drastycznie przyspiesza. <strong className="text-[#c9a84c] font-medium">Wojciech:</strong> rzucenie palenia po tygodniu.
                </p>
              </div>
            </div>

            {/* Filar III */}
            <div className="filar group relative overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#131210] border border-[#c9a84c]/15 hover:border-[#c9a84c] rounded-xs p-8 sm:p-12 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c9a84c]/5">
              <div className="relative z-10 w-full mb-8">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#c9a84c] tracking-[0.3em] font-semibold block mb-4">
                  FILAR III
                </span>
                <h3 
                  className="display text-3xl sm:text-4xl text-[#f5f1e8] mb-2 font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Styl Życia
                </h3>
                <p className="filar-hook font-serif italic text-lg sm:text-xl text-[#c9a84c]/80 mb-8">
                  Nawyki, które pracują na Ciebie.
                </p>

                <ul className="space-y-4 border-t border-[#c9a84c]/10 pt-6">
                  {[
                    "Audyt nawyków, używek i środowiska fizycznego",
                    "Rytm dobowy i zarządzanie szczytami energii",
                    "Eliminacja ukrytych sabotażystów (ekrany, alkohol, chaos)",
                    "Codzienna precyzyjna struktura wspierająca cel"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm sm:text-base text-[#a39c8d] group-hover:text-white transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filar-effect relative z-10 p-5 mt-auto bg-black/45 border-l border-[#c9a84c] rounded-xs">
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-widest block mb-1 uppercase">EFEKT INTEGRACJI</span>
                <p className="text-xs text-[#f5f1e8] leading-relaxed">
                  Zyskasz nawyki i codzienną strukturę bez wysiłku. <strong className="text-[#c9a84c] font-medium">Sebastian:</strong> elastyczność w podróżach biznesowych i pewność siebie.
                </p>
              </div>
            </div>

            {/* Filar IV */}
            <div className="filar group relative overflow-hidden bg-gradient-to-br from-[#1a1815] to-[#131210] border border-[#c9a84c]/15 hover:border-[#c9a84c] rounded-xs p-8 sm:p-12 transition-all duration-500 flex flex-col justify-between hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c9a84c]/5">
              <div className="relative z-10 w-full mb-8">
                <span className="font-mono text-[10px] sm:text-[11px] text-[#c9a84c] tracking-[0.3em] font-semibold block mb-4">
                  FILAR IV
                </span>
                <h3 
                  className="display text-3xl sm:text-4xl text-[#f5f1e8] mb-2 font-medium"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Odżywianie
                </h3>
                <p className="filar-hook font-serif italic text-lg sm:text-xl text-[#c9a84c]/80 mb-8">
                  Bez paczkowanego jedzenia do końca życia.
                </p>

                <ul className="space-y-4 border-t border-[#c9a84c]/10 pt-6">
                  {[
                    "Strategia żywieniowa pod konkretny cel sylwetkowy",
                    "Dystrybucja makro w ciągu dnia, nie tylko suma kalorii",
                    "Jakość produktów dobrana pod Twój profil i upodobania",
                    "System, który działa w restauracji, podróży, święta"
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-start text-sm sm:text-base text-[#a39c8d] group-hover:text-white transition-colors duration-300">
                      <ChevronRight className="w-4 h-4 text-[#c9a84c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="filar-effect relative z-10 p-5 mt-auto bg-black/45 border-l border-[#c9a84c] rounded-xs">
                <span className="font-mono text-[9px] text-[#c9a84c] tracking-widest block mb-1 uppercase">EFEKT ODŻYWIENIA</span>
                <p className="text-xs text-[#f5f1e8] leading-relaxed">
                  Jesz świadomie, uwalniasz się od schematów. <strong className="text-[#c9a84c] font-medium">Dawid:</strong> budowanie rzeźby w delegacjach. <strong className="text-[#c9a84c] font-medium">Sebastian:</strong> -20 kg tkanki tłuszczowej.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-20 text-center">
            <div className="relative group inline-block font-sans">
              {/* Imperial Gold Underglow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-7 bg-gradient-to-r from-[#c9a84c] via-[#ecd599] to-[#c9a84c] opacity-50 blur-xl rounded-full transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl shadow-[0_0_25px_rgba(201,168,76,0.3)]" />
              
              <button 
                onClick={() => setShowQuizModal(true)}
                className="relative inline-flex items-center justify-center gap-3 py-4.5 px-12 border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#161512] to-[#0a0a09] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none shadow-[inset_0_1px_2px_rgba(201,168,76,0.1),0_4px_20px_rgba(0,0,0,0.8)] hover:cursor-pointer"
              >
                Aplikuj do prowadzenia
              </button>
            </div>
          </div>

        </div>
      </section>

      <CloudDivider flipped className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 4: KTO ZA TYM STOI (AUTORYTET) ===== */}
      <section className="bg-[#131210] py-24 sm:py-32 relative z-30" id="kim-jestem">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-7">
              <span className="eyebrow block">Kim jestem</span>
              <h2 
                className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8] mb-8 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Spokojnie. Twardo. <br />
                <span className="italic text-[#c9a84c]">Z dyscypliną wpisaną w każdy szczegół.</span>
              </h2>

              <div className="space-y-6 text-[#a39c8d] text-base sm:text-lg font-light">
                <p className="text-[#f5f1e8] font-normal font-serif italic text-xl">
                  Nie sprzedaję ulotnej motywacji. Sprzedaję sprawdzony system.
                </p>
                <p>
                  Pracuję jak rzymski centurion — spokojnie, twardo, z dyscypliną wpisaną w każdy szczegół. Jeśli wejdziesz do Imperium, dostaniesz strukturę, której wcześniej nie miałeś. I egzekucję, której od siebie nie wymagałeś.
                </p>
                <p>
                  To nie jest miejsce na kompromisy czy półśrodki. Prowadzenie 1:1 gwarantuje pełne spektrum opieki pod moim bezpośrednim monitoringiem biologicznym.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col divide-y divide-[#c9a84c]/10 border-t border-b lg:border-t-0 lg:border-b-0 border-[#c9a84c]/10">
              
              <div className="py-8 text-center lg:text-left group hover:translate-x-4 transition-transform duration-300">
                <span className="font-mono text-[10px] text-[#6b6557] tracking-widest block mb-1 uppercase">DOŚWIADCZENIE SILOWE</span>
                <span 
                  className="display text-6xl sm:text-7xl font-semibold text-[#c9a84c] block leading-none mb-1 font-serif"
                >
                  10
                </span>
                <span className="font-mono text-xs text-[#a39c8d] uppercase tracking-wider block">
                  Lat doświadczenia treningowego
                </span>
              </div>

              <div className="py-8 text-center lg:text-left group hover:translate-x-4 transition-transform duration-300">
                <span className="font-mono text-[10px] text-[#6b6557] tracking-widest block mb-1 uppercase">INDYWIDUALNE PROWADZENIE 1:1</span>
                <span 
                  className="display text-6xl sm:text-7xl font-semibold text-[#c9a84c] block leading-none mb-1 font-serif"
                >
                  3+
                </span>
                <span className="font-mono text-xs text-[#a39c8d] uppercase tracking-wider block">
                  Lata prowadzenia klientów 1:1
                </span>
              </div>

              <div className="py-8 text-center lg:text-left group hover:translate-x-4 transition-transform duration-300">
                <span className="font-mono text-[10px] text-[#6b6557] tracking-widest block mb-1 uppercase">ZREALIZOWANE PROJEKTY</span>
                <span 
                  className="display text-6xl sm:text-7xl font-semibold text-[#c9a84c] block leading-none mb-1 font-serif"
                >
                  200+
                </span>
                <span className="font-mono text-xs text-[#a39c8d] uppercase tracking-wider block">
                  Udokumentowanych transformacji
                </span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <CloudDivider className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 5: ŚCIANA CHWAŁY (TRANSFORMACJE DYNAMICZNE) ===== */}
      <section className="py-24 sm:py-32 relative z-30" id="efekty">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="mb-16 text-center md:text-left">
            <span className="eyebrow block">Efekty / Ściana chwały</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Liczby. <span className="italic text-[#c9a84c]">Nie puste obietnice.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-4">
              {TRANSFORMATIONS.map((t, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveTransIndex(idx);
                    setShowBeforeTab(false);
                  }}
                  className={`p-6 sm:p-8 cursor-pointer select-none border transition-all duration-300 rounded-xs flex flex-col gap-2 ${
                    activeTransIndex === idx 
                      ? 'bg-[#1a1815] border-[#c9a84c] shadow-lg shadow-[#c9a84c]/5' 
                      : 'bg-transparent border-[#c9a84c]/10 hover:border-[#c9a84c]/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 
                      className="text-2xl sm:text-3xl font-medium text-white"
                      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                      {t.name}
                    </h3>
                    <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                      activeTransIndex === idx ? 'text-[#c9a84c] translate-x-1' : 'text-[#6b6557]'
                    }`} />
                  </div>
                  <span className="text-xs font-mono text-[#c9a84c] tracking-wide block uppercase">
                    {t.metric1}
                  </span>
                </div>
              ))}
            </div>

            {/* Right side Detail Panel with Przed vs Po Dynamic Toggles */}
            <div className="lg:col-span-7 bg-[#131210] border border-[#c9a84c]/20 p-8 sm:p-12 rounded-xs relative">
              
              <div className="flex justify-between items-center border-b border-[#c9a84c]/10 pb-6 mb-8">
                <div>
                  <h4 
                    className="text-3xl font-medium text-white font-serif"
                  >
                    Klient: {TRANSFORMATIONS[activeTransIndex].name}
                  </h4>
                  <span className="text-[11px] font-mono tracking-wider text-[#c9a84c] uppercase block mt-1">
                    {TRANSFORMATIONS[activeTransIndex].metric2}
                  </span>
                </div>

                {/* Simulated Przed vs Po Click tab */}
                <div className="flex items-center gap-1 bg-black/60 border border-[#c9a84c]/20 p-1 rounded-sm">
                  <button 
                    onClick={() => setShowBeforeTab(true)}
                    className={`text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 transition-colors rounded-sm ${
                      showBeforeTab 
                        ? 'bg-[#c9a84c] text-black font-semibold' 
                        : 'text-[#a39c8d] hover:text-white'
                    }`}
                  >
                    Przed
                  </button>
                  <button 
                    onClick={() => setShowBeforeTab(false)}
                    className={`text-[10px] font-mono tracking-widest uppercase py-1.5 px-3 transition-colors rounded-sm ${
                      !showBeforeTab 
                        ? 'bg-[#c9a84c] text-black font-semibold' 
                        : 'text-[#a39c8d] hover:text-white'
                    }`}
                  >
                    Po
                  </button>
                </div>
              </div>

              {/* Dynamic details section simulating state progress */}
              <div className="aspect-[4/3] w-full bg-[#0a0908] border border-[#c9a84c]/10 relative overflow-hidden rounded-xs mb-8 group select-none">
                {/* Background image component (if image exists) */}
                <AnimatePresence mode="wait">
                  {showBeforeTab ? (
                    <motion.div 
                      key={TRANSFORMATIONS[activeTransIndex].beforeImg ? `img-before-${activeTransIndex}` : `text-before-${activeTransIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {TRANSFORMATIONS[activeTransIndex].beforeImg ? (
                        <>
                          <img 
                            src={TRANSFORMATIONS[activeTransIndex].beforeImg} 
                            alt={`${TRANSFORMATIONS[activeTransIndex].name} - przed`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* Elegant layout gradient overlay to ensure text readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-left flex flex-col items-start gap-2">
                            <span className="text-[10px] sm:text-[11px] font-mono text-red-500 border border-red-500/30 px-3 py-1 bg-red-950/40 backdrop-blur-md tracking-widest uppercase">
                              DIAGNOZA WYJŚCIOWA (PRZED)
                            </span>
                            <p className="text-sm sm:text-base md:text-lg text-[#f5f1e8] font-light italic leading-snug font-serif drop-shadow-md">
                              "{TRANSFORMATIONS[activeTransIndex].beforeText}"
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0908]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_0%,transparent_75%)] pointer-events-none" />
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-red-500 border border-red-500/30 px-3 py-1 bg-red-950/20 tracking-widest uppercase">
                              DIAGNOZA WYJŚCIOWA (PRZED)
                            </span>
                            <p className="text-xl sm:text-2xl text-[#a39c8d] max-w-md font-light italic leading-snug font-serif">
                              "{TRANSFORMATIONS[activeTransIndex].beforeText}"
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={TRANSFORMATIONS[activeTransIndex].afterImg ? `img-after-${activeTransIndex}` : `text-after-${activeTransIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      {TRANSFORMATIONS[activeTransIndex].afterImg ? (
                        <>
                          <img 
                            src={TRANSFORMATIONS[activeTransIndex].afterImg} 
                            alt={`${TRANSFORMATIONS[activeTransIndex].name} - po`}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {/* Elegant layout gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-left flex flex-col items-start gap-2">
                            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 border border-emerald-500/30 px-3 py-1 bg-emerald-950/40 backdrop-blur-md tracking-widest uppercase">
                              REZULTAT SYSTEMOWY (PO)
                            </span>
                            <p className="text-sm sm:text-base md:text-lg text-[#f5f1e8] font-semibold leading-snug font-serif drop-shadow-md">
                              "{TRANSFORMATIONS[activeTransIndex].afterText}"
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#0a0908]">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.03)_0%,transparent_75%)] pointer-events-none" />
                          <div className="space-y-4">
                            <span className="text-[10px] font-mono text-emerald-400 border border-emerald-500/30 px-3 py-1 bg-emerald-950/20 tracking-widest uppercase">
                              REZULTAT SYSTEMOWY (PO)
                            </span>
                            <p className="text-xl sm:text-2xl text-[#f5f1e8] max-w-xl font-semibold leading-snug font-serif">
                              "{TRANSFORMATIONS[activeTransIndex].afterText}"
                            </p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Verified Metrics list representing raw numbers */}
              <div className="space-y-3 font-mono text-xs sm:text-sm text-[#a39c8d] border-t border-[#c9a84c]/10 pt-6">
                <span className="block text-[10px] text-[#6b6557] tracking-widest uppercase mb-4">KLUCZOWE PARAMETRY</span>
                {TRANSFORMATIONS[activeTransIndex].stats.map((st, i) => (
                  <div key={i} className="flex justify-between border-b border-[#c9a84c]/5 pb-2">
                    <span>{st.label}</span>
                    <span className="text-[#c9a84c] font-semibold">{st.val}</span>
                  </div>
                ))}
              </div>

            </div>

          </div>

          <div className="quote-block max-w-[960px] mx-auto py-16 px-6 sm:px-12 border-y border-[#c9a84c]/15 text-center bg-[#131210]/20">
            <span className="text-6xl text-[#c9a84c] block font-serif h-8 select-none leading-none mb-6">„</span>
            <p className="text-xl sm:text-3xl font-light italic leading-relaxed text-[#f5f1e8] font-serif mb-6">
              Po 3 miesiącach progres lepszy niż po pierwszym roku na siłce. Dla mnie to coś więcej niż machanie ciężarem i jedzenie. Przeorganizowałem swój sen i pracę.
            </p>
            <span className="font-mono text-[10px] sm:text-xs text-[#c9a84c] tracking-[0.25em] uppercase">
              — Wojtek, klient Imperium
            </span>
          </div>

        </div>
      </section>

      <CloudDivider flipped className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 6: AUDIENCJA (SELEKCJA) ===== */}
      <section className="bg-[#131210] py-24 sm:py-32 relative z-30" id="selekcja">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="max-w-3xl mb-16">
            <span className="eyebrow block">Selekcja</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Imperium nie jest dla każdego. <br />
              <span className="italic text-[#c9a84c]">Selekcja jest częścią systemu.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a84c]/15 border border-[#c9a84c]/12">
            
            {/* YES Column */}
            <div className="bg-[#0a0908] p-8 sm:p-12 hover:bg-[#131210]/60 transition-colors duration-500">
              <span className="font-mono text-xs text-[#c9a84c] tracking-[0.2em] uppercase block border-b border-[#c9a84c]/12 pb-6 mb-8 font-semibold">
                DLA CIEBIE, JEŚLI
              </span>

              <ul className="space-y-6">
                {[
                  "Masz konkretny cel sylwetkowy i jesteś gotów go bezwzględnie egzekwować",
                  "Stać Cię na inwestycję w siebie na poziomie premium",
                  "Chcesz pracować z rygorem na twardych danych — pomiary, metabolizm, krew",
                  "Jesteś gotów podporządkować się systemowi przez min. 3 miesiące"
                ].map((item, id) => (
                  <li key={id} className="flex gap-4 items-start text-sm sm:text-base text-[#a39c8d]">
                    <Check className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* NO Column */}
            <div className="bg-[#0a0908] p-8 sm:p-12 hover:bg-[#131210]/60 transition-colors duration-500">
              <span className="font-mono text-xs text-[#6b6557] tracking-[0.2em] uppercase block border-b border-[#c9a84c]/12 pb-6 mb-8 font-semibold">
                NIE DLA CIEBIE, JEŚLI
              </span>

              <ul className="space-y-6">
                {[
                  "Szukasz magicznej pigułki, zbiegu okoliczności lub tanich skrótów",
                  "Negocjujesz cenę i warunki współpracy zanim usłyszysz pełną diagnozę",
                  "Wolisz kierować się intuicją i trenować 'na wyczucie' niż mierzyć parametry",
                  "Planujesz 'tylko schudnąć na wakacje za 5 tygodni' bez zmian nawyków"
                ].map((item, id) => (
                  <li key={id} className="flex gap-4 items-start text-sm sm:text-base text-[#6b6557] line-through decoration-[#8b2c2c]/40">
                    <X className="w-5 h-5 text-[#8b2c2c] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="mt-16 text-center">
            <div className="relative group inline-block font-sans">
              {/* Imperial Gold Underglow */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] h-7 bg-gradient-to-r from-[#c9a84c] via-[#ecd599] to-[#c9a84c] opacity-50 blur-xl rounded-full transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl shadow-[0_0_25px_rgba(201,168,76,0.3)]" />
              
              <button 
                onClick={() => setShowQuizModal(true)}
                className="relative inline-flex items-center justify-center gap-3 py-4.5 px-12 border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#161512] to-[#0a0a09] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none shadow-[inset_0_1px_3px_rgba(201,168,76,0.1),0_4px_20px_rgba(0,0,0,0.8)] hover:cursor-pointer"
              >
                Aplikuj do prowadzenia
              </button>
            </div>
          </div>

        </div>
      </section>

      <CloudDivider className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 7: COOPERATIVE STEPS ===== */}
      <section className="py-24 sm:py-32 relative z-30" id="proces">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          
          <div className="mb-16">
            <span className="eyebrow block">Jak wygląda współpraca</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Trzy kroki. <span className="italic text-[#c9a84c]">Bez wyjątków.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Aplikacja", desc: "Wypełniasz formularz. Krótko i konkretnie. To pierwszy filtr — sprawdzam, czy deklarujesz odpowiedni rygor i gotowość na system." },
              { step: "02", title: "Rozmowa", desc: "Spotkanie 1:1 online, 30 minut. Zadaję pytania, diagnozuję dotychczasowe plateau i decyduję, czy bierzemy się do pracy." },
              { step: "03", title: "Imperium", desc: "Uruchomienie systemu. Pełne badania, zoptymalizowana struktura na 4 filarach i codzienny monitoring postępów." }
            ].map((st, i) => (
              <div key={i} className="bg-[#131210] p-8 border border-white/5 hover:border-[#c9a84c]/20 transition-colors rounded-xs">
                <span className="text-4xl text-[#c9a84c] font-semibold font-serif block mb-4">{st.step}</span>
                <h3 className="text-xl font-medium text-white mb-2">{st.title}</h3>
                <p className="text-[#a39c8d] text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <CloudDivider flipped className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 8: FAQ ===== */}
      <section className="bg-[#131210] py-24 sm:py-32 relative z-30" id="faq">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          
          <div className="mb-16">
            <span className="eyebrow block">Pytania i Odpowiedzi</span>
            <h2 
              className="display text-3xl sm:text-5xl lg:text-6xl text-[#f5f1e8]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Zanim zaaplikujesz.
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { q: "Ile kosztuje współpraca i prowadzenie 1:1?", a: "Współpraca ma charakter premium charakteryzujący się pełnym zaangażowaniem po obu stronach. Inwestycja zwraca się wielokrotnie w postaci zdrowia, sprawności i formy, której nie udawało się zbudować latami. Konkretną wycenę ustalamy indywidualnie po analizie badań krwi i dookreśleniu celów podczas rozmowy kwalifikacyjnej." },
              { q: "Czy otrzymam gotową rozpiskę menu na kartce?", a: "Nie sprzedaję schematycznych kart menu. Dostajesz elastyczny system żywieniowy oparty na dystrybucji makroskładników dostosowany do podróży, restauracji czy spotkań biznesowych. Chodzi o to, byś opanował sztukę odżywiania bez stania się więźniem plastikowych pudełek." },
              { q: "Czy te badania krwi są absolutnie konieczne?", a: "Tak. Bez rozszerzonego panelu profilu krwi nie podejmuję pracy. Każdy organizm na poziomie hormonalnym i biochemicznym ma inne limity — opieranie się na zgadywaniu to domena amatorów. Prawdziwe Imperium budujemy na faktach medycznych." }
            ].map((faq, i) => (
              <div 
                key={i} 
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                className="border-b border-[#c9a84c]/10 pb-4 pt-2 cursor-pointer select-none"
              >
                <div className="flex justify-between items-center py-2">
                  <h4 className="text-lg sm:text-xl font-normal text-[#f5f1e8] font-serif">{faq.q}</h4>
                  <span className="text-[#c9a84c] text-xl font-mono leading-none">{activeFaq === i ? '−' : '+'}</span>
                </div>
                {activeFaq === i && (
                  <p className="text-sm text-[#a39c8d] leading-relaxed pt-2 pl-2 border-l border-[#c9a84c]/30">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      <CloudDivider className="-my-12 sm:-my-16 relative z-35" />

      {/* ===== SECTION 9: FINAL CALL TO ACTION ===== */}
      <section className="py-32 relative text-center z-30 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_60%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="eyebrow block">Czas na decyzję</span>
          <h2 
            className="text-4xl sm:text-6xl lg:text-7xl font-light text-white mb-6 leading-none"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Zbuduj swoje <span className="italic block sm:inline text-[#c9a84c]">Imperium</span>.
          </h2>
          
          <p className="text-base sm:text-lg text-[#a39c8d] font-light max-w-lg mx-auto mb-4">
            Otwieram tylko 5 dedykowanych miejsc miesięcznie, gwarantując najwyższą jakość prowadzenia 1:1. Zrób pierwszy krok.
          </p>
          
          <div className="font-mono text-[11px] text-[#c9a84c] uppercase tracking-widest mb-10 block">
            AKTUALNIE DOSTĘPNE MIEJSCA DLA NOWYCH PROWADZEŃ: 2/5
          </div>

          <div className="relative group inline-block font-sans">
            {/* Imperial Gold Underglow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-gradient-to-r from-[#c9a84c] via-[#ecd599] to-[#c9a84c] opacity-50 blur-xl rounded-full transition-all duration-500 group-hover:opacity-95 group-hover:blur-2xl shadow-[0_0_30px_rgba(201,168,76,0.3)]" />
            
            <button 
              onClick={() => setShowQuizModal(true)}
              className="relative inline-flex items-center justify-center gap-3 py-4.5 px-12 border border-[#c9a84c]/25 hover:border-[#c9a84c]/60 bg-gradient-to-b from-[#161512] to-[#0a0a09] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded-full transition-all duration-300 active:scale-[0.98] select-none shadow-[inset_0_1px_3px_rgba(201,168,76,0.1),0_4px_20px_rgba(0,0,0,0.8)] hover:cursor-pointer"
            >
              Aplikuj do prowadzenia 1:1
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#c9a84c]/12 py-12 bg-[#0a0908] relative z-30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <span 
            className="text-xl font-serif tracking-widest text-white"
          >
            IMPERIUM<span className="text-[#c9a84c]">.</span>
          </span>
          <span className="font-mono text-[10px] text-[#6b6557] tracking-wider uppercase">
            © 2026 IMPERIUM MENTORING. WSZELKIE PRAWA ZASTRZEŻONE.
          </span>
        </div>
      </footer>

      {/* ===== MASTER QUALIFICATION FORM MODAL ===== */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex justify-center items-center p-4 sm:p-6 overflow-y-auto"
          >
            <div className="bg-[#131210] border border-[#c9a84c]/30 rounded-xs w-full max-w-2xl overflow-hidden relative shadow-2xl">
              
              {/* Close Button element */}
              <button 
                onClick={closeQuiz}
                className="absolute top-4 right-4 text-[#6b6557] hover:text-[#c5a84c] transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* ===== STEP 0: THE ESSENTIAL MICROCOMMITMENT SCREEN ===== */}
              {quizStep === 0 && (
                <div className="p-8 sm:p-12 text-center my-4">
                  <span className="font-mono text-[10px] sm:text-xs text-[#c9a84c] tracking-[0.25em] h-5 block uppercase mb-4">
                    KRYTERIUM EGZEKUCJI
                  </span>
                  
                  <h3 
                    className="text-3xl sm:text-4xl text-white font-medium mb-6 font-serif"
                  >
                    Zanim zaczniesz — przeczytaj.
                  </h3>

                  <div className="bg-[#1a1815] border border-[#c9a84c]/15 p-6 rounded-xs mb-8 text-left max-w-lg mx-auto">
                    <p className="text-sm sm:text-base text-[#a39c8d] leading-relaxed">
                      "Formularz zajmuje 6 minut. Nie wypełniaj go „na próbę”. Odpowiadaj prawdę — nie to, co chcesz, żeby było prawdą. To pierwszy test dyscypliny."
                    </p>
                  </div>

                  <button 
                    onClick={startQuiz}
                    className="cta-primary bg-[#c9a84c] text-[#0a0908] w-full sm:w-auto text-xs font-bold py-4 px-10 tracking-[0.2em] uppercase hover:bg-[#f5f1e8] transition-all duration-300"
                  >
                    Rozumiem, zaczynam
                  </button>
                </div>
              )}

              {/* ===== STEP 1 TO 6: THE QUIZ ENGINE ===== */}
              {quizStep >= 1 && quizStep <= 6 && !isAnalyzing && (
                <div className="p-6 sm:p-10">
                  
                  {/* Progress Indicator Header */}
                  <div className="flex justify-between items-center border-b border-[#c9a84c]/10 pb-4 mb-8">
                    <span className="font-mono text-[10px] text-[#c9a84c] tracking-widest uppercase">
                      Sekcja {quizStep === 1 ? 'A: Identyfikacja' : quizStep === 2 ? 'B: Budżet' : quizStep === 3 ? 'C: Zaangażowanie' : quizStep === 4 ? 'D: Cele i Motywacja' : quizStep === 5 ? 'E: Historia' : 'F: Decyzyjność'}
                    </span>
                    <span className="font-mono text-[11px] text-[#6b6557]">
                      Krok {quizStep} z 6 • ~{Math.max(1, 7 - quizStep)} min pozostało
                    </span>
                  </div>

                  {/* Progressive Bar tracker */}
                  <div className="w-full bg-black/40 h-1 mb-8 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#c9a84c] h-full transition-all duration-500"
                      style={{ width: `${(quizStep / 6) * 100}%` }}
                    />
                  </div>

                  {/* Dynamic Step Contents */}
                  <div className="min-h-[280px]">

                    {/* Step 1: Sekcja A - ID */}
                    {quizStep === 1 && (
                      <div className="space-y-6">
                        <p className="text-lg text-white font-serif italic mb-4">Podaj swoje dane kontaktowe w celu weryfikacji tożsamości.</p>
                        
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-[#6b6557] mb-2 uppercase">Imię i Nazwisko</label>
                          <input 
                            type="text" 
                            value={answers.name}
                            onChange={(e) => setAnswers(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="np. Jan Kowalski"
                            className="w-full bg-black/40 border border-[#c9a84c]/20 rounded-xs p-3 text-sm text-[#f5f1e8] focus:border-[#c9a84c] outline-none transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-[#6b6557] mb-2 uppercase">Adres Email</label>
                            <input 
                              type="email" 
                              value={answers.email}
                              onChange={(e) => setAnswers(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="np. jan@biznes.pl"
                              className="w-full bg-black/40 border border-[#c9a84c]/20 rounded-xs p-3 text-sm text-[#f5f1e8] focus:border-[#c9a84c] outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono tracking-wider text-[#6b6557] mb-2 uppercase">Telefon (z kierunkowym)</label>
                            <input 
                              type="tel" 
                              value={answers.phone}
                              onChange={(e) => setAnswers(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="np. +48 600 000 000"
                              className="w-full bg-black/40 border border-[#c9a84c]/20 rounded-xs p-3 text-sm text-[#f5f1e8] focus:border-[#c9a84c] outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] font-mono tracking-wider text-[#6b6557] mb-2 uppercase">Wiek (lat)</label>
                          <input 
                            type="number" 
                            value={answers.age}
                            onChange={(e) => setAnswers(prev => ({ ...prev, age: e.target.value }))}
                            placeholder="np. 34"
                            className="w-24 bg-black/40 border border-[#c9a84c]/20 rounded-xs p-3 text-sm text-[#f5f1e8] focus:border-[#c9a84c] outline-none transition-colors"
                          />
                          
                          {/* Child Blocker Safety validation messaging */}
                          {answers.age && parseInt(answers.age, 10) < 16 && (
                            <div className="mt-4 p-4 border border-[#8b2c2c] bg-[#8b2c2c]/10 text-xs sm:text-sm text-red-200 flex items-start gap-3">
                              <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                              <span>Wymagany minimalny wiek to 16 lat. Aby ubiegać się o prowadzenie, poproś swojego rodzica lub opiekuna prawnego o kontakt. Sprawy zdrowia i treningu młodzieży wymagają pełnej zgody dorosłych.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 2: Budżet */}
                    {quizStep === 2 && (
                      <div className="space-y-6">
                        <span className="font-mono text-[9px] text-[#6b6557] tracking-widest uppercase">FILTR GOTOWOŚCI FINANSOWEJ</span>
                        <h4 className="text-xl sm:text-2xl text-white font-serif italic mb-4">
                          Jaki budżet jesteś gotów zainwestować w transformację sylwetki w najbliższych 3 miesiącach?
                        </h4>
                        
                        <div className="space-y-3">
                          {[
                            { key: "less-2k", label: "Mniej niż 2000 zł", val: "less-2k" },
                            { key: "from-2500", label: "Od 2500 zł", val: "from-2500" },
                            { key: "5k-6k", label: "Od 5000 zł do 6000 zł", val: "5k-6k" },
                            { key: "price-no-matter", label: "Cena nie jest dla mnie tematem", val: "price-no-matter" }
                          ].map(opt => (
                            <button 
                              key={opt.key}
                              type="button"
                              onClick={() => setAnswers(prev => ({ ...prev, budget: opt.val }))}
                              className={`w-full text-left p-4 border text-sm transition-all rounded-xs flex justify-between items-center ${
                                answers.budget === opt.val 
                                  ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white font-medium' 
                                  : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d] hover:border-[#c9a84c]/30'
                              }`}
                            >
                              <span>{opt.label}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.budget === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                {answers.budget === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 3: Zaangażowanie */}
                    {quizStep === 3 && (
                      <div className="space-y-6">
                        <span className="font-mono text-[9px] text-[#6b6557] tracking-widest uppercase">FILAR I & FILAR III POZIOM</span>
                        
                        <div>
                          <h4 className="text-base sm:text-lg text-white font-serif mb-3">
                            Ile godzin tygodniowo jesteś realnie w stanie poświęcić na pracę nad sobą (trening + przygotowanie posiłków + sen + nauka)?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: "Mniej niż 5 godzin", val: "less-5" },
                              { label: "5 – 8 godzin", val: "5-8" },
                              { label: "8 – 12 godzin", val: "8-12" },
                              { label: "12 – 18 godzin", val: "12-18" },
                              { label: "Tyle, ile będzie trzeba", val: "unlimited" }
                            ].map(opt => (
                              <button 
                                key={opt.val}
                                type="button"
                                onClick={() => setAnswers(prev => ({ ...prev, hours: opt.val }))}
                                className={`text-left p-3 border text-xs transition-all rounded-xs flex items-center justify-between ${
                                  answers.hours === opt.val 
                                    ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white' 
                                    : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${answers.hours === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                  {answers.hours === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-[#c9a84c]/10 pt-4">
                          <h4 className="text-base sm:text-lg text-white font-serif mb-3">
                            Czy jesteś gotów wykonać pełne badania krwi (rozszerzony panel, koszt ok. 400-800 zł) w ciągu pierwszych 2 tygodni współpracy?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: "Tak, bez wahania", val: "yes" },
                              { label: "Tak, potrzebuję rekomendacji", val: "yes-help" },
                              { label: "Mam wątpliwości", val: "doubt" },
                              { label: "Nie", val: "no" }
                            ].map(opt => (
                              <button 
                                key={opt.val}
                                type="button"
                                onClick={() => setAnswers(prev => ({ ...prev, bloodTest: opt.val }))}
                                className={`text-left p-3 border text-xs transition-all rounded-xs flex items-center justify-between ${
                                  answers.bloodTest === opt.val 
                                    ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white' 
                                    : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${answers.bloodTest === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                  {answers.bloodTest === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Step 4: Cele i Motywacja */}
                    {quizStep === 4 && (
                      <div className="space-y-6">
                        <span className="font-mono text-[9px] text-[#6b6557] tracking-widest uppercase">OBSZARY & DIAGNOZA MOTYWACJI</span>
                        
                        <div>
                          <h4 className="text-base sm:text-lg text-white font-serif mb-2">
                            Który obszar jest dla Ciebie najważniejszy? <span className="text-[#c9a84c] text-xs font-mono">(wybierz max 2)</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {[
                              { label: "Budowa mięśni / siła", key: "mass" },
                              { label: "Redukcja tkanki tłuszczowej", key: "fat" },
                              { label: "Hormony, energia, libido", key: "hormone" },
                              { label: "Regeneracja, sen, nerwy", key: "nervous" },
                              { label: "Całkowita zmiana nawyków", key: "lifestyle" }
                            ].map(opt => {
                              const isSelected = answers.goals.includes(opt.key);
                              return (
                                <button 
                                  key={opt.key}
                                  type="button"
                                  onClick={() => selectGoalOption(opt.key)}
                                  className={`p-3 border text-xs text-left rounded-xs transition-all flex items-center gap-2 ${
                                    isSelected 
                                      ? 'bg-[#c9a84c]/15 border-[#c9a84c] text-white' 
                                      : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                                  }`}
                                >
                                  <div className={`w-3 h-3 rounded-xs border flex items-center justify-center ${isSelected ? 'bg-[#c9a84c] border-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                    {isSelected && <Check className="w-2.5 h-2.5 text-black" />}
                                  </div>
                                  <span>{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-base sm:text-lg text-white font-serif mb-1">
                            Opisz w 2-3 zdaniach, dlaczego TERAZ jest dla Ciebie właściwy moment.
                          </h4>
                          <p className="text-[10px] text-[#6b6557] font-mono uppercase tracking-widest mb-3">Wymagane minimum 100 znaków (jest to rygorystyczny test szczegółu)</p>
                          <textarea 
                            value={answers.motivation}
                            onChange={(e) => setAnswers(prev => ({ ...prev, motivation: e.target.value }))}
                            placeholder="Wpisz swoją osobistą odpowiedź..."
                            rows={4}
                            className="w-full bg-black/40 border border-[#c9a84c]/20 rounded-xs p-3 text-sm text-[#f5f1e8] focus:border-[#c9a84c] outline-none transition-colors font-sans"
                          />
                          <div className="flex justify-between items-center text-[11px] font-mono mt-2">
                            <span className={answers.motivation.trim().length >= 100 ? 'text-emerald-400' : 'text-red-400'}>
                              Liczba znaków: {answers.motivation.trim().length} / 100 (min)
                            </span>
                            <span className="text-[#6b6557]">
                              {answers.motivation.trim().length >= 200 ? 'Wyśmienicie' : answers.motivation.trim().length >= 100 ? 'Akceptowalnie' : 'Niewystarczająco'}
                            </span>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Step 5: Doświadczenie i Historia */}
                    {quizStep === 5 && (
                      <div className="space-y-6">
                        <span className="font-mono text-[9px] text-[#6b6557] tracking-widest uppercase">DOŚWIADCZENIE & PRZESZŁOŚĆ</span>
                        
                        <div>
                          <h4 className="text-base sm:text-lg text-white font-serif mb-3">
                            Jak długo trenujesz siłowo (regularnie, min. 2x w tygodniu)?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: "Nigdy nie trenowałem regularnie", val: "none" },
                              { label: "Mniej niż 6 miesięcy", val: "6m" },
                              { label: "6 miesięcy – 2 lata", val: "6m-2y" },
                              { label: "2 – 5 lat (profil optymalny)", val: "2y-5y" },
                              { label: "Powyżej 5 lat", val: "5y+" }
                            ].map(opt => (
                              <button 
                                key={opt.val}
                                type="button"
                                onClick={() => setAnswers(prev => ({ ...prev, experience: opt.val }))}
                                className={`text-left p-3 border text-xs transition-all rounded-xs flex items-center justify-between ${
                                  answers.experience === opt.val 
                                    ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white font-medium' 
                                    : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${answers.experience === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                  {answers.experience === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="border-t border-[#c9a84c]/10 pt-4">
                          <h4 className="text-base sm:text-lg text-white font-serif mb-3">
                            Czy korzystałeś już z trenera personalnego, dietetyka lub mentora?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {[
                              { label: "Nigdy", val: "never" },
                              { label: "Tak, raz, nie spełnił oczekiwań", val: "once-bad" },
                              { label: "Tak, szukam czegoś kompleksowego", val: "complex-needs" },
                              { label: "Tak, aktualnie z kimś współpracuję", val: "current" }
                            ].map(opt => (
                              <button 
                                key={opt.val}
                                type="button"
                                onClick={() => setAnswers(prev => ({ ...prev, coached: opt.val }))}
                                className={`text-left p-3 border text-xs transition-all rounded-xs flex items-center justify-between ${
                                  answers.coached === opt.val 
                                    ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white' 
                                    : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                                }`}
                              >
                                <span>{opt.label}</span>
                                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${answers.coached === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                  {answers.coached === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* Step 6: Decyzyjność */}
                    {quizStep === 6 && (
                      <div className="space-y-6">
                        <span className="font-mono text-[9px] text-[#6b6557] tracking-widest uppercase">EWALUACJA DECYZYJNOŚCI</span>
                        <h4 className="text-xl sm:text-2xl text-white font-serif italic mb-4">
                          Jeśli dziś rozmawiamy i zdecydujemy, że jest dopasowanie — kiedy jesteś gotów rozpocząć współpracę?
                        </h4>
                        
                        <div className="space-y-3">
                          {[
                            { label: "Od razu, w tym tygodniu", val: "now" },
                            { label: "W ciągu najbliższych 2 tygodni", val: "2w" },
                            { label: "W ciągu bieżącego miesiąca", val: "1m" },
                            { label: "Najpierw muszę poważnie przemyśleć", val: "think-first" },
                            { label: "Jeszcze nie wiem", val: "unknown" }
                          ].map(opt => (
                            <button 
                              key={opt.val}
                              type="button"
                              onClick={() => setAnswers(prev => ({ ...prev, timeline: opt.val }))}
                              className={`w-full text-left p-4 border text-sm transition-all rounded-xs flex justify-between items-center ${
                                answers.timeline === opt.val 
                                  ? 'bg-[#c9a84c]/10 border-[#c9a84c] text-white font-medium' 
                                  : 'border-[#c9a84c]/10 bg-black/20 text-[#a39c8d]'
                              }`}
                            >
                              <span>{opt.label}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${answers.timeline === opt.val ? 'border-[#c9a84c] bg-[#c9a84c]' : 'border-[#6b6557]'}`}>
                                {answers.timeline === opt.val && <div className="w-1.5 h-1.5 bg-[#0a0908] rounded-full" />}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Progressive Back & Next Trigger Buttons */}
                  <div className="flex gap-4 justify-between items-center border-t border-[#c9a84c]/10 pt-6 mt-8">
                    <button 
                      type="button"
                      disabled={quizStep === 1}
                      onClick={() => setQuizStep(prev => prev - 1)}
                      className="font-mono text-xs uppercase text-[#6b6557] hover:text-[#c9a84c] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    >
                      ← Wróć
                    </button>
                    
                    {/* Block next button if child safety warning is showing */}
                    <button 
                      type="button"
                      disabled={answers.age !== '' && parseInt(answers.age, 10) < 16}
                      onClick={nextQuizStep}
                      className="cta-primary bg-[#c9a84c] text-[#0a0908] font-bold text-xs py-3 px-8 tracking-wider uppercase hover:bg-white transition-all disabled:opacity-40 disabled:pointer-events-none"
                    >
                      {quizStep === 6 ? 'Analizuj moją aplikację →' : 'Dalej →'}
                    </button>
                  </div>

                </div>
              )}

              {/* ===== SIMULATED ANALYTICAL SCANNING LOADER ===== */}
              {isAnalyzing && (
                <div className="p-12 text-center my-10 flex flex-col items-center justify-center space-y-8">
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-2 border-[#1a1815]" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#c9a84c] animate-spin" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-xs text-[#c9a84c] tracking-[0.3em] uppercase block animate-pulse">
                      Selekcja i profilowanie
                    </span>
                    <h3 className="text-2xl text-white font-serif">
                      Analizuję Twoją aplikację...
                    </h3>
                  </div>

                  {/* Graphical percent indicator */}
                  <div className="w-64 bg-black/40 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div 
                      className="bg-[#c9a84c] h-full transition-all duration-100 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-[#6b6557]">
                    {analysisProgress}% zweryfikowanych parametrów
                  </span>
                </div>
              )}

              {/* ===== STEP 7: GATED OUTCOMES BASED ON SCORING ROUTING RULE ===== */}
              {quizStep === 7 && (
                <div className="p-6 sm:p-10 text-left">
                  
                  {/* --- PROG A: 80-100 (KWALIFIKACJA PEŁNA 1:1) --- */}
                  {assignedRoute === 'A' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 text-emerald-400 border-b border-[#c9a84c]/20 pb-4 mb-4">
                        <CheckCircle2 className="w-8 h-8 shrink-0 text-emerald-400" />
                        <div>
                          <h4 className="text-2xl font-serif text-white">Status: Zakwalifikowany do rozmowy 1:1</h4>
                          <span className="text-[10px] font-mono tracking-widest text-[#c9a84c] uppercase">
                            Wynik zweryfikowany • Pełne dopasowanie profilu
                          </span>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-[#a39c8d] leading-relaxed">
                        Twoja aplikacja ubiegająca się o <strong>prowadzenie 1:1</strong> pomyślnie przeszła selekcję systemu. Następny krok to osobista rozmowa kwalifikacyjna 1:1 — 30 minut, online ze mną. Tam decydujemy oboje, czy bierzemy się do pracy.
                      </p>
                      
                      <div className="p-4 bg-black/40 border border-[#c9a84c]/10 text-xs sm:text-sm text-[#f5f1e8] italic font-serif">
                        Cenę współpracy poznasz podczas rozmowy kwalifikacyjnej, kiedy będę dokładnie wiedział, na jakich badaniach krwi i z jakimi limitami systemowymi startujemy.
                      </div>

                      {/* MOCK CALENDLY SCHEDULER EMBED */}
                      <div className="border border-[#c9a84c]/20 rounded-xs overflow-hidden mt-6 bg-black/60 p-6">
                        <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/5">
                          <span className="font-mono text-xs text-white uppercase tracking-widest">Wybierz termin rozmowy (30 min, Google Meet)</span>
                          <Calendar className="w-4 h-4 text-[#c9a84c]" />
                        </div>

                        {!meetingBooked ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-mono tracking-widest text-[#6b6557] mb-1 uppercase">Dostępne Dni</label>
                                <select 
                                  value={selectedMeetingDate}
                                  onChange={(e) => setSelectedMeetingDate(e.target.value)}
                                  className="w-full bg-[#131210] border border-[#c9a84c]/30 text-xs p-2 rounded-xs text-[#f5f1e8] outline-none"
                                >
                                  <option value="2026-05-25">Poniedziałek, 25 maja 2026</option>
                                  <option value="2026-05-26">Wtorek, 26 maja 2026</option>
                                  <option value="2026-05-27">Środa, 27 maja 2026</option>
                                  <option value="2026-05-28">Czwartek, 28 maja 2026</option>
                                  <option value="2026-05-29">Piątek, 29 maja 2026</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-[10px] font-mono tracking-widest text-[#6b6557] mb-1 uppercase">Dostępne Godziny</label>
                                <select 
                                  value={selectedMeetingHour}
                                  onChange={(e) => setSelectedMeetingHour(e.target.value)}
                                  className="w-full bg-[#131210] border border-[#c9a84c]/30 text-xs p-2 rounded-xs text-[#f5f1e8] outline-none"
                                >
                                  <option value="10:00">10:00 (Czas pl)</option>
                                  <option value="11:30">11:30 (Czas pl)</option>
                                  <option value="14:00">14:00 (Czas pl)</option>
                                  <option value="14:30">14:30 (Czas pl)</option>
                                  <option value="16:00">16:00 (Czas pl)</option>
                                  <option value="18:30">18:30 (Czas pl)</option>
                                </select>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setMeetingBooked(true)}
                              className="w-full py-3 bg-[#c9a84c] text-black font-semibold text-xs uppercase tracking-[0.15em] hover:bg-[#f5f1e8] transition-colors rounded-xs mt-2"
                            >
                              POTWIERDŹ I ZAREZERWUJ ROZMOWĘ
                            </button>
                            <span className="block text-[9px] text-[#6b6557] text-center uppercase tracking-widest font-mono">
                              * WOLNE TERMINY W NAJBLIŻSZYCH 10 DNIACH ROBOCZYCH W CELU GWARANCJI OPALCOWANIA METODYKI
                            </span>
                          </div>
                        ) : (
                          <div className="py-6 text-center space-y-4">
                            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                              <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                              <h5 className="text-white text-lg font-serif">Rozmowa rezerwacyjna zatwierdzona!</h5>
                              <p className="text-xs text-[#a39c8d] mt-1">
                                Termin: {selectedMeetingDate} o godzinie {selectedMeetingHour}. Potwierdzenie z linkiem Google Meet zostało wysłane na adres {answers.email}.
                              </p>
                            </div>
                            <button 
                              onClick={closeQuiz}
                              className="py-2.5 px-6 border border-white/15 text-[10px] font-mono tracking-widest uppercase hover:bg-white/5 text-white rounded-xs"
                            >
                              Zakończ i wróć do strony
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- PROG B: 50-79 (KWALIFIKACJA WARUNKOWA - WYBÓR ŚCIEŻKI) --- */}
                  {assignedRoute === 'B' && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-3 border-b border-[#c9a84c]/20 pb-4 mb-4">
                        <Sliders className="w-8 h-8 text-[#c9a84c]" />
                        <div>
                          <h4 className="text-2xl font-serif text-white">Jesteś blisko, ale mam dla Ciebie dwie opcje</h4>
                          <span className="text-[10px] font-mono tracking-widest text-[#a39c8d] uppercase">
                            Kwalifikacja warunkowa
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#a39c8d] leading-relaxed">
                        Twoja aplikacja wykazuje wysoki stopień zaangażowania, lecz pewne wskaźniki (finansowe lub czasowe) sugerują brak pełnej gotowości na rygorystyczne, elitarne prowadzenie 1:1. Zapewniam Cię jednak, że nikt nie wychodzi stąd z pustymi rękami. Przedstawiam dwie alternatywne ścieżki:
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        
                        {/* Option 1: private 1:1 */}
                        <div className="bg-[#1a1815] border border-[#c9a84c]/30 rounded-xs p-6 flex flex-col justify-between hover:border-[#c9a84c] transition-colors">
                          <div>
                            <span className="font-mono text-[9px] text-[#c9a84c] tracking-widest block mb-2 uppercase">🛡 TARDA SELEKCJA</span>
                            <h5 className="text-lg text-white font-serif mb-2">ŚCIEŻKA I — Prowadzenie 1:1</h5>
                            <p className="text-xs text-[#a39c8d] leading-relaxed mb-4">
                              Pełna diagnostyka medyczna, bezpośredni monitoring, codzienna sprawozdawczość i stała merytoryczna kontrola. Cena ujawniana po kwalifikacji na spotkaniu.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              // bypass to booking sub-state step
                              setAssignedRoute('A');
                            }}
                            className="w-full py-2 bg-[#c9a84c] text-black font-semibold text-[10px] uppercase tracking-widest rounded-xs hover:bg-[#f5f1e8] transition-colors"
                          >
                            ZAREZERWUJ ROZMOWĘ 1:1
                          </button>
                        </div>

                        {/* Option 2: group community School */}
                        <div className="bg-[#1a1815] border border-white/10 rounded-xs p-6 flex flex-col justify-between hover:border-[#c9a84c] transition-colors">
                          <div>
                            <span className="font-mono text-[9px] text-[#a39c8d] tracking-widest block mb-2 uppercase">⚔ BRAK SELEKCJI</span>
                            <h5 className="text-lg text-white font-serif mb-2">ŚCIEŻKA II — Szkoła Imperium</h5>
                            <p className="text-xs text-[#a39c8d] leading-relaxed mb-4">
                              3-miesięczny, systemowy program grupowy oparty na tej samej metodyce 4 filarów. Mniejsza intensywność indywidualnej asysty, mniejsza wymagana inwestycja.
                            </p>
                          </div>
                          <button 
                            onClick={() => {
                              // bypass directly to school details/checkout
                              setAssignedRoute('C');
                            }}
                            className="w-full py-2 bg-transparent border border-[#c9a84c]/52 text-[#c9a84c] font-semibold text-[10px] uppercase tracking-widest rounded-xs hover:bg-[#c9a84c]/10 transition-colors"
                          >
                            ZOBACZ ofertę Szkoły
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* --- PROG C: 0-49 (BRAK KWALIFIKACJI 1:1 - OFERTA SZKOŁY GRUPOWEJ) --- */}
                  {assignedRoute === 'C' && (
                    <div className="space-y-6">
                      <div className="flex items-start sm:items-center gap-3 border-b border-[#c9a84c]/20 pb-4 mb-4">
                        <AlertTriangle className="w-8 h-8 text-[#c9a84c] shrink-0 mt-1 sm:mt-0" />
                        <div>
                          <h4 className="text-2xl font-serif text-white">Polecam start od Szkoły Imperium</h4>
                          <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                            Brak kwalifikacji do prowadzenia indywidualnego 1:1
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-[#a39c8d] leading-relaxed">
                        Twoja aplikacja wykazuje, że w obecnym punkcie życia nie jesteś jeszcze gotów na rygorystyczny rygor indywidualnego prowadzenia 1:1. To nie jest ocena Twojej osoby — mój system wymaga gwarantowanego poziomu zasobów, którym dziś nie dysponujesz. Sprawdź opcję alternatywną:
                      </p>

                      <div className="bg-[#1a1815] border border-[#c9a84c]/30 rounded-xs p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-mono text-[#c9a84c] uppercase tracking-widest">OFERTA DYREKTYWNA</span>
                            <h5 className="text-xl text-white font-serif mt-1">SZKOŁA IMPERIUM — program grupowy (3 miesiące)</h5>
                          </div>
                          <div className="text-right">
                            <span className="block text-[10px] font-mono text-[#6b6557] uppercase">INWESTYCJA</span>
                            <span className="text-xl text-[#c9a84c] font-semibold font-mono">1499 zł</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#a39c8d] leading-relaxed">
                          Dołącz do Szkoły Imperium i otrzymaj pełen i kompleksowy pakiet oparty na rygorystycznych 4 filarach:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 text-xs text-[#a39c8d]">
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#c9a84c] shrink-0" /> Plan działania i struktura wdrożenia</div>
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#c9a84c] shrink-0" /> Baza ponad 80 przepisów na smaczne posiłki</div>
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#c9a84c] shrink-0" /> Indywidualny plan treningowy</div>
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-[#c9a84c] shrink-0" /> Indywidualny plan działania</div>
                          <div className="flex items-center gap-2" style={{ gridColumn: "span 2" }}><Check className="w-4 h-4 text-[#c9a84c] shrink-0" /> Spotkania co niedzielę w formie live ze wszystkimi członkami społeczności</div>
                          <div className="flex items-center gap-2" style={{ gridColumn: "span 2" }}><Check className="w-4 h-4 text-[#gold] shrink-0 font-bold" /> Przy pakiecie na 3 miesiące: dwie indywidualne sesje rozmów po 1 godzinie</div>
                        </div>

                        {/* SIMULATED PAYMENT FORM (Gives absolute visual fidelity of Skool/Stripe direct checkout) */}
                        <div className="border-t border-[#c9a84c]/20 pt-6 mt-6">
                          {!checkoutCompleted ? (
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                if (!ccNumber || !ccExpiry || !ccCvc) {
                                  alert("Uzupełnij wymagane dane systemowe płatności.");
                                  return;
                                }
                                setCheckoutCompleted(true);
                              }}
                              className="space-y-4"
                            >
                              <span className="text-[10px] font-mono tracking-widest text-[#6b6557] block uppercase">GWARANTOWANY PROCESOR BEZPIECZNY STIPE</span>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                                <div className="sm:col-span-6">
                                  <label className="block text-[9px] font-mono tracking-widest text-[#6b6557] mb-1 uppercase">Numer Karty</label>
                                  <div className="relative">
                                    <input 
                                      type="text"
                                      value={ccNumber}
                                      onChange={(e) => setCcNumber(e.target.value)}
                                      placeholder="4242 •••• •••• ••••"
                                      maxLength={19}
                                      className="w-full bg-black/60 border border-[#c9a84c]/20 p-2 text-xs text-white rounded-xs focus:border-[#c9a84c] outline-none pl-8"
                                    />
                                    <CreditCard className="w-3.5 h-3.5 absolute left-2.5 top-3 text-[#6b6557]" />
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[9px] font-mono tracking-widest text-[#6b6557] mb-1 uppercase">Ważność (MM/RR)</label>
                                  <input 
                                    type="text"
                                    value={ccExpiry}
                                    onChange={(e) => setCcExpiry(e.target.value)}
                                    placeholder="08/29"
                                    maxLength={5}
                                    className="w-full bg-black/60 border border-[#c9a84c]/20 p-2 text-xs text-white rounded-xs focus:border-[#c9a84c] outline-none text-center"
                                  />
                                </div>

                                <div className="sm:col-span-3">
                                  <label className="block text-[9px] font-mono tracking-widest text-[#6b6557] mb-1 uppercase">CVV / CVC</label>
                                  <div className="relative">
                                    <input 
                                      type="password"
                                      value={ccCvc}
                                      onChange={(e) => setCcCvc(e.target.value)}
                                      placeholder="•••"
                                      maxLength={3}
                                      className="w-full bg-black/60 border border-[#c9a84c]/20 p-2 text-xs text-white rounded-xs focus:border-[#c9a84c] outline-none text-center"
                                    />
                                    <Lock className="w-3 h-3 absolute right-3 top-3.5 text-[#6b6557]" />
                                  </div>
                                </div>
                              </div>

                              <button 
                                type="submit"
                                className="w-full py-3 bg-[#c9a84c] text-black font-semibold text-xs tracking-[0.15em] uppercase hover:bg-[#f5f1e8] transition-all rounded-xs active:scale-[0.98]"
                              >
                                DOŁĄCZ DO SZKOŁY IMPERIUM — 1499 ZŁ
                              </button>
                            </form>
                          ) : (
                            <div className="py-6 text-center space-y-4">
                              <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-6 h-6" />
                              </div>
                              <div>
                                <h5 className="text-white text-lg font-serif">Płatność pomyślnie zrealizowana!</h5>
                                <p className="text-xs text-[#a39c8d] mt-1">
                                  Gratulacje! Zostałeś zapisany do nadchodzącej kohorty Szkoły Imperium. Wszelkie materiały wstępne oraz link aktywacyjny do społeczności Skool wysłaliśmy na adres {answers.email}.
                                </p>
                              </div>
                              <button 
                                onClick={closeQuiz}
                                className="py-2 px-6 border border-white/10 hover:bg-white/5 text-[10px] font-mono tracking-wider uppercase text-white rounded-xs"
                              >
                                Zakończ i powróć
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
