export interface ResourceLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  number: string;
  category: string;
  year: string;
  title: string;
  summary: string;
  tags: string[];
  highlights: string[];
  links: ResourceLink[];
  note?: string;
  credits?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  team?: string;
  dates: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  alt: string;
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface LeadershipItem {
  title: string;
  organization: string;
  date: string;
  description: string;
}

export const profile = {
  name: 'Alexandros Phardis',
  role: 'Mathematics, data & code.',
  location: 'Toronto, Canada',
  education: 'University of Toronto · B.Sc. Mathematics & Statistics · Expected 2028',
  schoolEmail: 'alexandros.phardis@mail.utoronto.ca',
  personalEmail: 'anp45nasa@gmail.com',
  github: 'https://github.com/AlexPha45',
  linkedin: 'https://www.linkedin.com/in/alexandros-phardis-b51478344/',
  resume: '/resume/alexandros-phardis-resume.pdf',
};

const numericalRepository = 'https://github.com/AlexPha45/Numerical-Methods-in-Scientific-Computing';
const trefoilRepository = 'https://github.com/AlexPha45/Canadian-Undergraduate-Mathematics-Conference-2025';

// Keep project claims tied to the linked materials. Evaluation samples and
// competition constraints are deliberately distinguished from measured results.
export const projects: Project[] = [
  {
    id: 'pokerbots',
    number: '01',
    category: 'Software & quantitative systems',
    year: '2026',
    title: 'No-Limit Pokerbots',
    summary: 'Developed eight iterations of Python poker agents for an eight-player tournament variant, combining precomputed hand-strength tables, tournament-aware risk calculations, auction budgeting, and Monte Carlo equity estimation.',
    tags: ['Python', 'Probability', 'Monte Carlo', 'Game Theory'],
    highlights: [
      'Selected for the Boston regional at Harvard: 231 teams chosen from 6,000+ applicants.',
      'Eight archived strategies with lookup-based policies, action-conditioned equity estimates, and legal-action safeguards.',
      'Selected evaluation run: 144,206 recorded hands across 1,021 tables.',
    ],
    note: 'Tournament constraint: sub-1ms per action. The evaluation figures describe one documented run.',
    links: [
      { label: 'View code', href: 'https://github.com/AlexPha45/No-Limit-Pokerbots' },
      { label: 'Evaluation notes', href: 'https://github.com/AlexPha45/No-Limit-Pokerbots/blob/main/performance/evaluation-summary.md' },
    ],
  },
  {
    id: 'numerical',
    number: '02',
    category: 'Directed reading · Scientific computing',
    year: '2026',
    title: 'Numerical Methods in Scientific Computing',
    summary: 'Explored numerical methods through presentations on Monte Carlo integration, singular value decomposition, and Gaussian quadrature for band-limited functions.',
    tags: ['Numerical Analysis', 'Monte Carlo', 'SVD', 'LaTeX'],
    highlights: [
      'PhD-mentored directed reading, with presentations on integration and error analysis.',
      'SVD applications to numerical rank, pseudoinverses, and least-squares solutions.',
      'Integral equations, Gaussian quadrature, and prolate spheroidal wavefunctions.',
    ],
    note: 'A collection of mathematical presentations and LaTeX source materials.',
    links: [
      { label: 'Repository', href: numericalRepository },
      { label: 'Monte Carlo slides', href: `${numericalRepository}/blob/main/Monte_Carlo_Presentation__Our_Part_.pdf` },
      { label: 'SVD slides', href: `${numericalRepository}/blob/main/Singular_Value_Decomposition_Presentation.pdf` },
      { label: 'Quadrature slides', href: `${numericalRepository}/blob/main/Integral_Equations___Gaussian_Quadrature_Presentation%20%281%29.pdf` },
      { label: 'LaTeX sources', href: `${numericalRepository}/tree/main/source` },
    ],
  },
  {
    id: 'trefoil',
    number: '03',
    category: 'Mathematical research',
    year: '2025',
    title: 'Trefoil Divisibility',
    summary: 'Investigated trefoil divisibility through joint research connecting tricolorability, polynomial invariants, and knot-group homomorphisms, including polynomial-divisibility patterns in torus-knot families.',
    tags: ['Knot Theory', 'Algebraic Topology', 'Polynomial Invariants'],
    highlights: [
      'Presented at the Canadian Undergraduate Mathematics Conference at the University of Waterloo.',
      'Examined necessary conditions for trefoil factors and polynomial-divisibility patterns in torus knots.',
    ],
    note: 'Polynomial divisibility provides necessary conditions; it is not a complete test for connected-sum decomposition.',
    links: [
      { label: 'Repository', href: trefoilRepository },
      { label: 'Presentation', href: `${trefoilRepository}/blob/main/CUMC_2025_Presentation%20%289%29.pdf` },
      { label: 'Abstract', href: `${trefoilRepository}/blob/main/CUMC_2025_Presentation_Abstract.pdf` },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'td',
    company: 'TD Bank Group',
    role: 'Data Science Intern',
    team: 'Analytics, Insights & Artificial Intelligence (AI2)',
    dates: 'May – August 2026',
    summary: 'Built statistical tools and production workflows that made causal inference and experimental design more accessible across the organization.',
    highlights: [
      'Scaled automated sampling and analytical workflows on an enterprise platform to 410+ internal users.',
      'Implemented instrumental variables and LATE estimation, alongside iDiD, Cube Sampling, matching, and sample-size and power workflows.',
      'Developed a Shiny for Python agent to turn exploratory notebooks into dashboard applications, reducing deployment workflows from days to hours.',
      'Created and delivered a technical curriculum on causal inference and experimental design for 180+ analysts and scientists.',
      'Received Level 1 (Great Work!) and Level 2 (Above & Beyond!) awards.',
    ],
    tags: ['Python', 'Shiny', 'Causal Inference', 'Experimental Design'],
  },
  {
    id: 'teaching',
    company: 'Canadian Mathematical Society & University of Toronto',
    role: 'Teaching Assistant',
    team: 'Canada Math Camp',
    dates: 'August 2025',
    summary: 'Supported an invitation-only mathematics camp for young problem solvers preparing for advanced mathematical competitions.',
    highlights: [
      'Supported Olympiad-level problem-solving sessions and oversaw IMO mock examinations.',
      'Coordinated guest lectures and helped students work through challenging mathematical ideas.',
    ],
    tags: ['Mathematics', 'Teaching', 'Problem Solving'],
  },
];

export const leadership: LeadershipItem[] = [
  {
    title: '“Why Choose Math” speaker',
    organization: 'University of Toronto · Campus Day',
    date: 'April 2026',
    description: 'Invited by the Department of Mathematics to share the student perspective with prospective undergraduates.',
  },
  {
    title: 'COMC marker',
    organization: 'Canadian Mathematical Society',
    date: 'November 2025',
    description: 'Evaluated advanced proofs in Part C of the Canadian Open Mathematics Challenge.',
  },
];

export const gallery: GalleryItem[] = [
  {
    id: 'at-work',
    title: 'At work',
    caption: 'Panel 01 · At work',
    alt: 'Tournament participants collaborating at laptops in a large event room.',
    src: '/images/at-work-960.webp',
    srcSet: '/images/at-work-640.webp 640w, /images/at-work-960.webp 960w, /images/at-work-1440.webp 1440w',
    width: 960,
    height: 640,
  },
  {
    id: 'community',
    title: 'The community',
    caption: 'Panel 02 · The community',
    alt: 'A wide group photograph of participants gathered at the Boston regional tournament.',
    src: '/images/community-960.webp',
    srcSet: '/images/community-640.webp 640w, /images/community-960.webp 960w, /images/community-1440.webp 1440w',
    width: 960,
    height: 576,
  },
  {
    id: 'briefing',
    title: 'Opening briefing',
    caption: 'Panel 03 · Opening briefing',
    alt: 'Presenters introducing the tournament beside a projected briefing slide.',
    src: '/images/briefing-960.webp',
    srcSet: '/images/briefing-640.webp 640w, /images/briefing-960.webp 960w, /images/briefing-1440.webp 1440w',
    width: 960,
    height: 640,
  },
];
