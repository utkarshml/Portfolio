"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Terminal as TerminalIcon,
  Cpu,
  Layers,
  Check,
  Copy,
  ChevronRight,
  Database,
  Layout,
  Code,
  ExternalLink,
  Mail,
  Trophy,
  Award,
  Send
} from "lucide-react";

// Caldera Colors from Design Reference
const CALDERA_COLORS = [
  { name: "Basalt Canvas", token: "--color-basalt-canvas", hex: "#e2e2df", bg: "bg-basalt-canvas", text: "text-abyssal-ink" },
  { name: "Ash White", token: "--color-ash-white", hex: "#f7f6f2", bg: "bg-ash-white", text: "text-abyssal-ink" },
  { name: "Abyssal Ink", token: "--color-abyssal-ink", hex: "#070607", bg: "bg-abyssal-ink", text: "text-pure-white" },
  { name: "Pure White", token: "--color-pure-white", hex: "#ffffff", bg: "bg-pure-white", text: "text-abyssal-ink" },
  { name: "Digital Orange", token: "--color-digital-orange", hex: "#fc5000", bg: "bg-digital-orange", text: "text-pure-white" },
  { name: "Cyber Violet", token: "--color-cyber-violet", hex: "#524ae9", bg: "bg-cyber-violet", text: "text-pure-white" },
  { name: "Pixel Glare", token: "--color-pixel-glare", hex: "#f5f28e", bg: "bg-pixel-glare", text: "text-abyssal-ink" }
];

const PROJECTS_DATA = [
  {
    id: 0,
    title: "AI MARGDARSHAK",
    badge: "AI TRAVEL PLANNER",
    color: "cyber-violet",
    tagline: "Culture-aware AI travel planner compiling dynamic regional itineraries.",
    description: "An AI travel planner helping users discover destinations, cultural insights, cuisine, and personalized itineraries matching local heritage points.",
    highlights: [
      "Culture-Aware RAG: Indexes local custom dialects, safety indices, and culinary maps.",
      "Route Matrix Compilations: Automatically aggregates transit schedules and layouts."
    ],
    techStack: ["Next.js", "FastAPI", "Gemini AI", "PostgreSQL"],
    githubUrl: "https://github.com",
    tabs: [
      { id: "diagram", label: "DIAGRAM" },
      { id: "logs", label: "LOGS" },
      { id: "performance", label: "PERFORMANCE" }
    ],
    defaultTab: "diagram"
  },
  {
    id: 1,
    title: "ALGOSCRIBE",
    badge: "CODE COMPANION LAYER",
    color: "digital-orange",
    tagline: "AI conceptual mentor that helps students fix errors without providing answers.",
    description: "An AI coding companion that analyzes logical code errors and generates personalized conceptual hints, helping students resolve gaps without answers.",
    highlights: [
      "Conceptual Gap Analysis: Translates syntax bugs into structural conceptual suggestions.",
      "Error Clusters: Maps common logical bugs dynamically inside a vector space model."
    ],
    techStack: ["React", "Node.js", "Vector DB", "LLMs"],
    githubUrl: "https://github.com",
    tabs: [
      { id: "plot", label: "HINT PARSER" },
      { id: "scores", label: "VECTOR CLUSTER" },
      { id: "latency", label: "METRIC FEED" }
    ],
    defaultTab: "plot"
  },
  {
    id: 2,
    title: "STATROUTE",
    badge: "HEALTHCARE EMERGENCY",
    color: "cyber-violet",
    tagline: "Durable multi-agent emergency dispatcher tracking hospital allocations.",
    description: "An emergency healthcare coordination platform helping hospitals locate critical resources, room allocations, and dispatch routes in real-time.",
    highlights: [
      "Durable Agent Dispatches: Autonomous multi-agent nodes coordinate requests between hospitals.",
      "Sub-Millisecond Resource Syncs: Real-time inventory tracking utilizing event logs."
    ],
    techStack: ["FastAPI", "AI Agents", "Real-Time Systems"],
    githubUrl: "https://github.com",
    tabs: [
      { id: "stats", label: "DISPATCH RATE" },
      { id: "comparison", label: "LATENCY SPEEDUP" },
      { id: "router", label: "COORDINATOR MAP" }
    ],
    defaultTab: "stats"
  },
  {
    id: 3,
    title: "CACHEMESH",
    badge: "EDGE COMPLETION CACHE",
    color: "digital-orange",
    tagline: "WASM-based edge caching proxy mitigating backend query bottlenecks.",
    description: "A proxy script deployed close to clients that caches LLM response paths. Leverages quick cache evictions and token-budget throttles to prevent api overflow.",
    highlights: [
      "Sub-Millisecond Read Paths: Resolves repeat queries at edge nodes without hits to back-end endpoints.",
      "Token Rate-Limiting: Enforces quota usage buckets utilizing Redis-based sliding-window locks."
    ],
    techStack: ["Wasm", "Cloudflare Workers", "Redis", "Rust"],
    githubUrl: "https://github.com",
    tabs: [
      { id: "cache", label: "SPEED GAUGE" },
      { id: "comparison", label: "LATENCY BARS" },
      { id: "router", label: "ROUTING MAP" }
    ],
    defaultTab: "cache"
  }
];

const TECH_SLOTS_DATA = [
  {
    slotIdx: 0,
    items: [
      { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Vue.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Svelte", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg" }
    ]
  },
  {
    slotIdx: 1,
    items: [
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" }
    ]
  },
  {
    slotIdx: 2,
    items: [
      { name: "Gemini AI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlegemini.svg" },
      { name: "Claude AI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/anthropic.svg" },
      { name: "OpenAI", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" }
    ]
  },
  {
    slotIdx: 3,
    items: [
      { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Pinecone", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/pinecone.svg" }
    ]
  },
  {
    slotIdx: 4,
    items: [
      { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/framer.svg" },
      { name: "WebGL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webgl/webgl-original.svg" },
      { name: "Vanilla CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" }
    ]
  },
  {
    slotIdx: 5,
    items: [
      { name: "Rust", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg" },
      { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
    ]
  }
];

const EXPERIENCE_DATA = [
  {
    id: 0,
    company: "COGNITIVE SYSTEMS",
    role: "AI Lead Architect",
    period: "2024 - PRESENT",
    location: "SF / REMOTE",
    color: "cyber-violet",
    tagline: "Led deployment of multi-agent orchestration frameworks and neural indexing modules.",
    responsibilities: [
      "Engineered culture-aware RAG pipelines using Gemini AI and custom embeddings, cutting response latency by 35%.",
      "Pioneered vector-space semantic routing handlers, driving down processing overhead costs by $12k/month.",
      "Spearheaded multi-agent orchestrator prototypes, coordinating complex data processing loops asynchronously."
    ],
    skills: ["Gemini AI", "FastAPI", "Vector Databases", "LangChain", "Kubernetes"],
    metrics: [
      { name: "LATENCY IMPROVEMENT", value: "35%", color: "text-cyber-violet" },
      { name: "AGENT ACCURACY", value: "98.4%", color: "text-pixel-glare" }
    ]
  },
  {
    id: 1,
    company: "QUANTUM STUDIOS",
    role: "Senior Full Stack Dev",
    period: "2022 - 2024",
    location: "HYBRID",
    color: "digital-orange",
    tagline: "Designed high-throughput web frontends and microservice communication bridges.",
    responsibilities: [
      "Architected Next.js 14 serverless interfaces for heavy traffic applications serving 1.2M+ users weekly.",
      "Created sub-millisecond database cache layers in Redis, eliminating redundant SQL query bottlenecks.",
      "Optimized build systems using Webpack/Turbopack, shrinking JS bundle payloads by 42%."
    ],
    skills: ["Next.js", "React", "Node.js", "Redis", "TypeScript", "Tailwind CSS"],
    metrics: [
      { name: "BUNDLE SIZE REDUCTION", value: "42%", color: "text-digital-orange" },
      { name: "ACTIVE TRAFFIC", value: "1.2M+", color: "text-pixel-glare" }
    ]
  },
  {
    id: 2,
    company: "APEX SOLUTIONS",
    role: "Core Platform Engineer",
    period: "2020 - 2022",
    location: "ON-SITE",
    color: "cyber-violet",
    tagline: "Maintained fault-tolerant backend architectures and streaming data pipelines.",
    responsibilities: [
      "Designed event-driven messaging topologies using Kafka, managing over 50M records per day.",
      "Re-engineered PostgreSQL schema indexing configurations, improving analytical load queries by 2.4x.",
      "Implemented rigid CI/CD testing suites reducing deploy failure rates from 8% to less than 1%."
    ],
    skills: ["Python", "FastAPI", "PostgreSQL", "Apache Kafka", "Docker", "AWS"],
    metrics: [
      { name: "QUERY THROUGHPUT", value: "2.4x", color: "text-cyber-violet" },
      { name: "DEPLOY RELIABILITY", value: "99.2%", color: "text-pixel-glare" }
    ]
  }
];

const ACHIEVEMENTS_DATA = [
  {
    id: 0,
    title: "1ST PLACE - SMART CITY HACKATHON",
    description: "Led a team of 4 to design a real-time smart grid route coordinator matching active demand nodes.",
    metric: "COMPETITORS: 120+ TEAMS",
    color: "cyber-violet"
  },
  {
    id: 1,
    title: "OPEN SOURCE CORE CONTRIBUTOR",
    description: "Contributed performance optimizations and search index configurations to FastAPI RAG frameworks.",
    metric: "1.2K+ GITHUB STARS",
    color: "digital-orange"
  },
  {
    id: 2,
    title: "STATE SYSTEM REDESIGN INITIATIVE",
    description: "Re-engineered memory scopes for complex React rendering nodes, eliminating key layout state leaks.",
    metric: "40% CPU OPTIMIZATION",
    color: "cyber-violet"
  }
];

const CERTIFICATIONS_DATA = [
  {
    id: 0,
    title: "AWS SOLUTIONS ARCHITECT",
    issuer: "Amazon Web Services",
    date: "2025",
    verificationHash: "SHA-256: 8C19-FF31-9A2E",
    color: "digital-orange"
  },
  {
    id: 1,
    title: "CERTIFIED KUBERNETES ADMIN (CKA)",
    issuer: "The Linux Foundation",
    date: "2024",
    verificationHash: "SHA-256: B42A-D002-19EF",
    color: "cyber-violet"
  },
  {
    id: 2,
    title: "PROFESSIONAL CLOUD ARCHITECT",
    issuer: "Google Cloud",
    date: "2023",
    verificationHash: "SHA-256: 3F9E-874C-1A39",
    color: "digital-orange"
  }
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number>(0);
  const [activeRole, setActiveRole] = useState<"ai" | "fullstack" | "backend" | "frontend">("ai");
  const [typedLogs, setTypedLogs] = useState<string[]>([]);
  const [currentLogIdx, setCurrentLogIdx] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isFloppyHovered, setIsFloppyHovered] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  const roles = [
    { id: "ai", label: "AI Engineer", icon: Cpu, color: "bg-digital-orange" },
    { id: "fullstack", label: "Full Stack Developer", icon: Layout, color: "bg-cyber-violet" },
    { id: "backend", label: "Backend Developer", icon: Database, color: "bg-abyssal-ink" },
    { id: "frontend", label: "Frontend Developer", icon: Code, color: "bg-pixel-glare" }
  ] as const;

  const roleLogs = {
    ai: [
      "> Initialize Agent framework: UTKARSH_01",
      "> Spawning reasoning loops via LangChain... OK",
      "> Connected to LLM: Claude-3.5-Sonnet",
      "> Querying local Pinecone Vector Store... OK",
      "> Executing action: Resolve user query in 350ms",
      "> Status: Listening for commands..."
    ],
    fullstack: [
      "> Spin up development node... OK",
      "> App Router configured with React 19...",
      "> Bundling assets with Turbopack (Next.js 16)...",
      "> Tailwind CSS v4 @theme loaded successfully",
      "> Compiling production bundle... OK (0.8s)",
      "> Status: Ready on http://localhost:3000"
    ],
    backend: [
      "> Establish PostgreSQL database pool... OK",
      "> Load Redis cache client... connected",
      "> Run migrations: v4.2_audit_trail... OK",
      "> Initialize gRPC gateway service...",
      "> Optimizing DB query execution... 3.8ms latency",
      "> Status: All services healthy [Green]"
    ],
    frontend: [
      "> Load UI design system: CALDERA",
      "> Found 40px border-radius standard for cards",
      "> Injected 800px border-radius standard for buttons",
      "> Custom font feature settings active: 'ss06', 'ss10'",
      "> Micro-animations initialized... OK",
      "> Status: Viewport fully responsive"
    ]
  };

  // Simulating terminal logs typing effect
  useEffect(() => {
    setTypedLogs([]);
    setCurrentLogIdx(0);
  }, [activeRole]);

  useEffect(() => {
    const logs = roleLogs[activeRole];
    if (currentLogIdx < logs.length) {
      const timeout = setTimeout(() => {
        setTypedLogs((prev) => [...prev, logs[currentLogIdx]]);
        setCurrentLogIdx((prev) => prev + 1);
      }, 350);
      return () => clearTimeout(timeout);
    }
  }, [currentLogIdx, activeRole]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    // Trigger immediately to handle page refreshes in scrolled position
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // State hooks for Project Interactive Cabinet / Gallery
  const [activeProject, setActiveProject] = useState<number>(0);
  const [projectTabs, setProjectTabs] = useState<Record<number, string>>({
    0: "diagram",
    1: "plot",
    2: "stats",
    3: "cache"
  });

  const setProjectTab = (projectId: number, tabId: string) => {
    setProjectTabs((prev) => ({
      ...prev,
      [projectId]: tabId
    }));
  };

  // Tech Stack marquee vertical scrolling state
  const [marqueeIndexes, setMarqueeIndexes] = useState([0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    const intervals = TECH_SLOTS_DATA.map((_, slotIdx) => {
      const delay = slotIdx * 250; // Staggered delay for cascade effect
      let timer: NodeJS.Timeout;

      const startTimeout = setTimeout(() => {
        timer = setInterval(() => {
          setMarqueeIndexes((prev) => {
            const next = [...prev];
            next[slotIdx] = (next[slotIdx] + 1) % 4; // 4 items per slot
            return next;
          });
        }, 3000);
      }, delay);

      return {
        clear: () => {
          clearTimeout(startTimeout);
          if (timer) clearInterval(timer);
        }
      };
    });

    return () => {
      intervals.forEach((inv) => inv.clear());
    };
  }, []);


  const renderConsoleContent = (projectId: number, tabId: string) => {
    if (projectId === 0) {
      if (tabId === "diagram") {
        return (
          <div className="w-full h-full flex flex-col justify-between relative py-4">
            <div className="flex justify-between items-center z-10 px-8">
              <span className="font-mono text-[7px] text-pure-white/45">// INPUT</span>
              <span className="font-mono text-[7px] text-pure-white/45">// CORE ROUTE</span>
            </div>
            <div className="flex justify-between items-center px-8 z-10">
              <div className="bg-pure-white/10 border border-pure-white/20 rounded px-6 py-2 font-mono text-[8px] text-pure-white">
                Destination Prompt
              </div>
              <div className="bg-cyber-violet/20 border border-cyber-violet rounded px-6 py-2 font-mono text-[8px] text-pure-white">
                Gemini RAG Parser
              </div>
            </div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <path d="M 60 40 L 160 40 M 160 40 L 110 85 M 110 85 L 60 130" fill="none" stroke="#524ae9" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
            <div className="flex justify-center z-10">
              <div className="w-8 h-8 rounded-full border border-pure-white/40 flex items-center justify-center bg-abyssal-ink text-pixel-glare animate-pulse font-mono text-[9px]">
                MAP
              </div>
            </div>
            <div className="flex justify-between items-center px-8 z-10">
              <div className="bg-pure-white/10 border border-pure-white/20 rounded px-6 py-2 font-mono text-[8px] text-pure-white">
                Culture Markers
              </div>
              <div className="bg-pure-white/10 border border-pure-white/20 rounded px-6 py-2 font-mono text-[8px] text-pure-white">
                Optimized Route
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "logs") {
        return (
          <div className="w-full h-full flex flex-col justify-end font-mono text-[9px] text-pure-white/90 gap-4 leading-snug">
            {agentLogs.slice(0, 5).map((log, index) => (
              <div key={index} className="truncate text-pure-white/60">
                <span className="text-cyber-violet">&gt;&gt;</span> {log}
              </div>
            ))}
            <div className="text-green-400 font-bold">&gt; travel logs listening...</div>
          </div>
        );
      }
      if (tabId === "performance") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">GEMINI API RUNTIMES</span>
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex justify-between font-mono text-[8px] text-pure-white mb-2">
                  <span>ITINERARY PLANNING (1.5)</span>
                  <span>{(130 * activeTrafficMultiplier).toFixed(0)} ms</span>
                </div>
                <div className="w-full h-1 bg-pure-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyber-violet" style={{ width: "35%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[8px] text-pure-white mb-2">
                  <span>CULTURE MARKER EXTRACT</span>
                  <span>{(85 * activeTrafficMultiplier).toFixed(0)} ms</span>
                </div>
                <div className="w-full h-1 bg-pure-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-pixel-glare" style={{ width: "22%" }} />
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    if (projectId === 1) {
      if (tabId === "plot") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4 font-mono text-[9px] text-pure-white">
            <div className="flex justify-between border-b border-pure-white/10 pb-4">
              <span className="text-red-400">INPUT: SYNTAX_ERR</span>
              <span className="text-green-400">OUTPUT: CONCEPTUAL_HINT</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 text-[8px] leading-normal opacity-85">
              <div className="text-red-400 bg-red-500/10 border border-red-500/20 p-6 rounded">
                - for (let i = 0; i &lt; array.length; i++) list[i] = list[i+1];
              </div>
              <div className="text-green-400 bg-green-500/10 border border-green-500/20 p-6 rounded">
                + &quot;Check your index threshold: at array.length - 1, list[i+1] will query values outside array bounds.&quot;
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "scores") {
        return (
          <div className="w-full h-full flex flex-col justify-between relative">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">SEMANTIC COMPREHENSION VECTOR PLOT</span>
            <div className="flex-1 border border-pure-white/10 rounded my-6 relative flex items-center justify-center">
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-pure-white/10" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-pure-white/10" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-digital-orange top-12 left-16 animate-pulse" />
              <span className="absolute w-2 h-2 rounded-full bg-digital-orange top-24 left-24" />
              <span className="absolute w-2 h-2 rounded-full bg-pure-white/30 bottom-16 right-20" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-pixel-glare top-16 right-24 animate-ping" />
            </div>
          </div>
        );
      }
      if (tabId === "latency") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">COGNITIVE COMPREHENSION STATS</span>
            <div className="flex flex-col gap-6 font-mono text-[8px] text-pure-white/80 mt-12">
              <div className="flex justify-between">
                <span>ACTIVE LEARNING RATE</span>
                <span className="text-green-400 font-bold">92.4%</span>
              </div>
              <div className="flex justify-between">
                <span>SIMILARITY CLUSTERS IDENTIFIED</span>
                <span>12 Category Groups</span>
              </div>
            </div>
          </div>
        );
      }
    }

    if (projectId === 2) {
      if (tabId === "stats") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-6">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">DISPATCH ENGINE ACTIVITY</span>
            <div className="flex items-center justify-around flex-1">
              <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-cyber-violet flex items-center justify-center animate-spin">
                <span className="absolute font-display text-body-sm font-bold text-pure-white">99.8%</span>
              </div>
              <div className="flex flex-col gap-4 font-mono text-[8px] text-pure-white/80">
                <span>ACTIVE DISPATCHES: 42</span>
                <span>UNITS DISPATCHED: 104</span>
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "comparison") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">RESOURCE COORDINATION DELAYS</span>
            <div className="flex flex-col gap-8 mt-12">
              <div>
                <div className="flex justify-between font-mono text-[8px] text-pure-white mb-2">
                  <span>STATROUTE DISPATCH</span>
                  <span>14 sec</span>
                </div>
                <div className="w-full h-2 bg-pure-white/10 rounded-buttons overflow-hidden">
                  <div className="h-full bg-cyber-violet w-[4%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[8px] text-pure-white mb-2">
                  <span>MANUAL COORDINATION</span>
                  <span>340 sec</span>
                </div>
                <div className="w-full h-2 bg-pure-white/10 rounded-buttons overflow-hidden">
                  <div className="h-full bg-pure-white w-[100%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "router") {
        return (
          <div className="w-full h-full flex flex-col justify-between relative">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">REAL-TIME ROUTING MAP</span>
            <div className="flex-1 flex justify-between items-center px-12 relative">
              <div className="border border-pure-white/20 bg-pure-white/5 rounded px-4 py-2 font-mono text-[8px] text-pure-white flex flex-col items-center">
                <span>Hospital A</span>
                <span className="text-green-400">DISPATCHED</span>
              </div>
              <div className="border border-pure-white/20 bg-pure-white/5 rounded px-4 py-2 font-mono text-[8px] text-pure-white flex flex-col items-center">
                <span>Hospital B</span>
                <span className="text-pixel-glare">TRANSFERRING</span>
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 40 40 L 140 40" fill="none" stroke="#524ae9" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        );
      }
    }

    if (projectId === 3) {
      if (tabId === "cache") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">CACHE EFFICIENCY GAUGE</span>
            <div className="flex items-center justify-around gap-8 flex-1">
              <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-digital-orange flex items-center justify-center animate-spin">
                <span className="absolute font-display text-body-sm font-bold text-pure-white">94.2%</span>
              </div>
              <div className="flex flex-col gap-4 font-mono text-[8px] text-pure-white/80">
                <span>HITS: 124,082</span>
                <span>MISSES: 7,543</span>
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "comparison") {
        return (
          <div className="w-full h-full flex flex-col justify-between py-4">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">LATENCY BY REQUEST ROUTE</span>
            <div className="flex flex-col gap-8 mt-12">
              <div>
                <div className="flex justify-between font-mono text-[8px] text-digital-orange font-bold mb-2">
                  <span>EDGE NODE CACHED PATH</span>
                  <span>14 ms</span>
                </div>
                <div className="w-full h-2 bg-pure-white/10 rounded-buttons overflow-hidden">
                  <div className="h-full bg-digital-orange w-[4%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between font-mono text-[8px] text-pure-white mb-2">
                  <span>ORIGIN SERVER ROUNDTRIP</span>
                  <span>340 ms</span>
                </div>
                <div className="w-full h-2 bg-pure-white/10 rounded-buttons overflow-hidden">
                  <div className="h-full bg-pure-white w-[100%] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        );
      }
      if (tabId === "router") {
        return (
          <div className="w-full h-full flex flex-col justify-between relative">
            <span className="font-mono text-[7px] text-pure-white/40 uppercase">EDGE ROUTER MAP</span>
            <div className="flex-1 flex justify-between items-center px-12 relative">
              <div className="border border-pure-white/20 bg-pure-white/5 rounded px-4 py-2 font-mono text-[8px] text-pure-white flex flex-col items-center">
                <span>US_WEST</span>
                <span className="text-green-400">12ms</span>
              </div>
              <div className="border border-pure-white/20 bg-pure-white/5 rounded px-4 py-2 font-mono text-[8px] text-pure-white flex flex-col items-center">
                <span>EU_WEST</span>
                <span className="text-green-400">16ms</span>
              </div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <path d="M 40 40 L 140 40" fill="none" stroke="#524ae9" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        );
      }
    }

    return null;
  };



  // Simulated agent log stream
  const [agentLogs, setAgentLogs] = useState<string[]>([
    "[SYS] Durable execution thread active (ID: agent_9x882)",
    "[ORCH] Listening for queue packets on: caldera_tasks...",
    "[INFO] Initialized system context vector database lookup..."
  ]);

  // Vector viewer selection hover state
  const [hoveredVectorNode, setHoveredVectorNode] = useState<number | null>(null);

  // Latency graph active simulation multiplier
  const [activeTrafficMultiplier, setActiveTrafficMultiplier] = useState(1.0);

  // Loop to append new simulated agent logs
  useEffect(() => {
    const logTemplates = [
      "[INFO] Routing sub-task payload to agent Node_02",
      "[NODE_02] Querying vector similarity space... OK (1536d)",
      "[NODE_02] Found 3 matching documents (score thresholds > 0.82)",
      "[ORCH] Synthesizing context with Claude-3.5-Sonnet...",
      "[SUCCESS] Task execution completed in 312ms",
      "[SYS] Saved state variable to persistent store.",
      "[INFO] Connection pool size: 8 active instances",
      "[ORCH] Emitted telemetry heartbeat packet."
    ];

    const interval = setInterval(() => {
      setAgentLogs((prev) => {
        const next = [...prev, logTemplates[Math.floor(Math.random() * logTemplates.length)]];
        if (next.length > 7) {
          return next.slice(next.length - 7);
        }
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Loop to simulate metric variations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTrafficMultiplier(0.9 + Math.random() * 0.25);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen selection:bg-digital-orange selection:text-pure-white overflow-x-hidden">

      {/* Decorative Brand Accents (Large purely decorative violet shape as Hero background element) */}
      <div className="absolute right-[-100px] top-[100px] w-[600px] h-[600px] rounded-full bg-cyber-violet opacity-[0.08] blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-[400px] right-[-150px] w-[500px] h-[500px] rounded-full bg-digital-orange opacity-[0.06] blur-3xl pointer-events-none" />

      {/* Pixelated Canvas Texture Overlay */}
      <div className="absolute inset-0 pixel-pattern pointer-events-none" />

      {/* Header Spacer to prevent layout overlap because header is fixed */}
      <div className="h-[72px] w-full flex-shrink-0" />

      {/* HEADER SECTION */}
      <motion.header
        layout
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 22,
          mass: 0.8
        }}
        className={`fixed left-1/2 -translate-x-1/2 z-50 ${isScrolled
          ? "top-13 w-[90%] max-w-[900px] rounded-buttons border-2 border-abyssal-ink bg-ash-white/95 py-10 px-24 "
          : "top-0 w-full rounded-none mt-[40px]  py-[15px] border border-transparent bg-transparent shadow-none"
          }`}
      >
        <div className="max-w-[1750px] mx-auto flex items-center justify-between">
          <motion.div
            layout
            transition={{
              type: "spring",
              stiffness: 140,
              damping: 22,
            }}
            className={`flex items-center ${isScrolled ? "gap-8" : "gap-12"}`}
          >
            {/* Logo Mark */}
            <motion.div
              layout
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
              }}
              className={`bg-digital-orange flex flex-wrap p-[2px] rounded-sm shadow-[3px_3px_0px_0px_#070607] ${isScrolled ? "w-[30px] h-[30px]" : "w-[27px] h-[27px]"
                }`}
            >
              <div className="w-1/2 h-1/2 bg-pure-white" />
              <div className="w-1/2 h-1/2 bg-transparent" />
              <div className="w-1/2 h-1/2 bg-transparent" />
              <div className="w-1/2 h-1/2 bg-cyber-violet" />
            </motion.div>
            <motion.span
              layout
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
              }}
              className={`uppercase pt-[8px] tracking-wider font-display select-none ${isScrolled ? "text-body hidden" : "text-heading-sm"
                }`}
            >
              UTKARSH <span className="text-cyber-violet">JAISWAL</span>
            </motion.span>
          </motion.div>

          <div className="flex items-center gap-12">
            <motion.a
              layout
              transition={{
                type: "spring",
                stiffness: 140,
                damping: 22,
              }}
              href="mailto:utkarshjaiswal.work@gmail.com"
              className={`bg-digital-orange text-pure-white font-medium rounded-buttons hover:brightness-105 active:scale-[0.98] transition-all font-body flex items-center gap-8 border border-transparent shadow-[4px_4px_0px_0px_#070607] ${isScrolled ? "py-12 px-24 text-body-sm" : "py-12 px-24 text-body-sm"
                }`}
            >
              Get In Touch <ArrowRight size={14} />
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section className="relative w-full px-24 pt-80 pb-92 overflow-hidden">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row gap-56 items-center">

          {/* Left Column: Heading and info */}
          <div className="flex-grow flex-shrink-0 lg:w-[55%] flex flex-col items-start text-left gap-24">

            {/* Tag / Badge */}
            <div className="inline-flex items-center gap-8 bg-pixel-glare border border-abyssal-ink px-[28px] py-[12px] rounded-buttons font-body text-body-sm text-abyssal-ink shadow-[2.5px_2.5px_0px_0px_#070607] hover:scale-105 transition-transform duration-200">
              <Sparkles size={18} className="text-digital-orange animate-pulse" />
              <span className="font-semibold uppercase tracking-wider">UTKARSH JAISWAL</span>
            </div>

            {/* Display Headings */}
            <h1 className="text-display font-display text-abyssal-ink uppercase select-none tracking-tight leading-[0.9] text-[64px] sm:text-[88px] lg:text-[130px]">
              BUILDING <span className="text-digital-orange">AI</span> PRODUCTS <br />
              THAT SOLVE REAL PROBLEMS
            </h1>

            {/* Sub-description */}
            <p className="text-abyssal-ink font-body max-w-2xl leading-relaxed mt-4 text-[18px]">
              Full Stack Engineer focused on AI, automation, and user-centric products. Building solutions that combine intelligent systems with practical business value.
            </p>

            {/* Interactive Role Selector Chips */}
            <div className="w-full flex flex-col gap-10 mt-8">
              <span className="text-[11px] font-body font-bold uppercase tracking-widest text-abyssal-ink/50 pl-4">SELECT CORE PROFILE</span>
              <div className="flex flex-wrap gap-8">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isActive = activeRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setActiveRole(role.id)}
                      className={`flex items-center gap-8 py-8 px-16 rounded-buttons border border-abyssal-ink font-body text-body-sm font-medium transition-all ${isActive
                        ? "bg-abyssal-ink text-pure-white shadow-[3px_3px_0px_0px_#fc5000] -translate-y-[2px]"
                        : "bg-ash-white text-abyssal-ink hover:bg-abyssal-ink/5 hover:scale-102"
                        }`}
                    >
                      <Icon size={14} className={isActive ? "text-pixel-glare" : "text-abyssal-ink"} />
                      <span>{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-12 pt-16">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-digital-orange text-pure-white text-body font-medium rounded-buttons py-12 px-24 hover:opacity-90 active:scale-[0.97] transition-all font-body flex items-center gap-8 shadow-[4px_4px_0px_0px_#070607]"
              >
                View Selected Work
              </a>
            </div>
          </div>

          {/* Right Column: Creative Interactive AI Agent Sandbox Terminal */}
          <div className="flex-grow lg:w-[45%] w-full flex justify-center items-center">

            {/* Visual Module Container with 40px rounded corners - Made larger */}
            <div className="relative w-full max-w-[800px] aspect-[4/3] bg-ash-white border-2 border-abyssal-ink rounded-cards p-40 flex flex-col justify-between overflow-hidden shadow-[10px_10px_0px_0px_#070607] group hover:scale-[1.01] transition-transform duration-300">

              {/* Internal Grid pattern */}
              <div className="absolute inset-0 pixel-pattern opacity-10 pointer-events-none" />

              {/* Top Bar with System Indicators */}
              <div className="flex justify-between items-center z-10 border-b border-abyssal-ink/10 pb-16">
                <div className="flex items-center gap-8">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-[11px] tracking-widest text-abyssal-ink/60 uppercase">SYSTEM: ONLINE</span>
                </div>
                <span className="font-display text-body tracking-wider text-abyssal-ink">UTKARSH.AGENT_SYS</span>
              </div>

              {/* Main Log Screen simulating terminal feedback - Expanded */}
              <div className="flex-1 my-24 bg-abyssal-ink text-pure-white p-24 rounded-default border border-abyssal-ink relative font-mono text-[13px] flex flex-col gap-10 justify-start overflow-y-auto leading-relaxed select-none min-h-[180px]">

                {/* Typed Logs */}
                {typedLogs.map((log, index) => (
                  <div
                    key={index}
                    className={`${log.startsWith("> Status:")
                      ? "text-pixel-glare font-bold border-t border-pure-white/10 pt-6 mt-4"
                      : log.includes("OK")
                        ? "text-green-400"
                        : "text-pure-white/80"
                      }`}
                  >
                    {log}
                  </div>
                ))}

                {/* Blinking Cursor at the end of typing */}
                {currentLogIdx < roleLogs[activeRole].length ? (
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-4 bg-pure-white animate-pulse" />
                  </div>
                ) : null}

                {/* Cyber decoration marks inside terminal */}
                <div className="absolute bottom-4 right-8 font-mono text-[9px] text-pure-white/10 uppercase select-none">
                  SECURE_AGENT_LOG
                </div>
              </div>

              {/* Interactive Sandbox Footer */}
              <div className="flex justify-between items-end z-10 pt-12 border-t border-abyssal-ink/10">
                <div className="flex flex-col">
                  <span className="font-display text-body-sm text-abyssal-ink uppercase leading-none">ACTIVE MODULE</span>
                  <span className="font-body text-[11px] text-abyssal-ink/50 mt-4 uppercase">
                    {roles.find(r => r.id === activeRole)?.label || "AI Profile"}
                  </span>
                </div>

                {/* Decorative Pill Graphic */}
                <div className="bg-digital-orange border border-abyssal-ink text-pure-white rounded-buttons px-12 py-4 text-[10px] font-mono font-medium uppercase tracking-widest shadow-[2px_2px_0px_0px_#070607]">
                  RAG_NODE
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CORE ENGINEERING CAPABILITIES */}
      <section id="capabilities" className="w-full px-24 py-56 bg-ash-white border-t border-abyssal-ink/10">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-40">

          <div className="flex flex-col gap-10">
            <span className="text-body-sm font-body font-medium uppercase tracking-wider text-cyber-violet">CORE COMPETENCIES</span>
            <h2 className="text-heading text-[170px] font-bold text-abyssal-ink  font-pp-neue-corp-compact-ultrabold leading-none">ENGINEERING PILLARS</h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-32">

            {/* Card 1: AI Engineering (Text top, Graphic bottom) */}
            <div className="bg-ash-white border-2 border-abyssal-ink rounded-cards p-32 md:p-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_#070607] hover:shadow-[10px_10px_0px_0px_#fc5000] hover:translate-y-[-4px] transition-all duration-300 group">
              <div className="flex flex-col gap-16">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-digital-orange bg-digital-orange/10 px-8 py-4 rounded-buttons border border-digital-orange/20 uppercase">
                    // COGNITIVE COMPUTING
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-digital-orange animate-pulse" />
                </div>

                <h3 className="text-heading-sm font-display text-abyssal-ink uppercase leading-none mt-4">
                  01 / AI ENGINEERING
                </h3>

                <p className="text-body-sm font-body text-abyssal-ink/80 leading-relaxed">
                  Architect and deploy autonomous agent frameworks, custom RAG search pipelines, and intelligent semantic layers that combine reasoning with external tools.
                </p>

                {/* Detailed Capabilities List */}
                <ul className="flex flex-col gap-6 font-body text-[13px] text-abyssal-ink/75 my-4">
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-digital-orange/10 border border-digital-orange flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-digital-orange" />
                    </div>
                    <span>Multi-agent orchestration and queue-based execution</span>
                  </li>
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-digital-orange/10 border border-digital-orange flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-digital-orange" />
                    </div>
                    <span>RAG with hybrid lexical/vector search models</span>
                  </li>
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {["LangChain", "LlamaIndex", "Pinecone", "Python"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-medium bg-basalt-canvas border border-abyssal-ink/10 px-8 py-2 rounded-buttons text-abyssal-ink/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Engineer Image */}
              <div className="my-24 w-full bg-pure-white border border-abyssal-ink/20 rounded-default overflow-hidden aspect-video relative shadow-[2px_2px_0px_0px_#070607]">
                <img
                  src="/ai_engineer.png"
                  alt="AI Engineering illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Card 2: Full Stack Development (Graphic top, Text bottom) */}
            <div className="bg-ash-white border-2 border-abyssal-ink rounded-cards p-32 md:p-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_#070607] hover:shadow-[10px_10px_0px_0px_#524ae9] hover:translate-y-[-4px] transition-all duration-300 group">
              {/* Full Stack Dev Image */}
              <div className="my-24 w-full bg-pure-white border border-abyssal-ink/20 rounded-default overflow-hidden aspect-video relative shadow-[2px_2px_0px_0px_#070607] order-first">
                <img
                  src="/fullstack_dev.png"
                  alt="Full Stack Development illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text content on bottom */}
              <div className="flex flex-col gap-16 order-last mt-12">
                <div className="flex items-center gap-8">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-cyber-violet bg-cyber-violet/10 px-8 py-4 rounded-buttons border border-cyber-violet/20 uppercase">
                    // APPLICATION LAYER
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-cyber-violet animate-pulse" />
                </div>

                <h3 className="text-heading-sm font-display text-abyssal-ink uppercase leading-none">
                  02 / FULL STACK DEV
                </h3>

                <p className="text-body-sm font-body text-abyssal-ink/80 leading-relaxed">
                  Develop modern web applications using React, Next.js, Node.js, FastAPI, and PostgreSQL. Build cohesive client interfaces communicating with optimized service runtimes.
                </p>

                {/* Detailed Capabilities List */}
                <ul className="flex flex-col gap-6 font-body text-[13px] text-abyssal-ink/75 my-4">
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-cyber-violet/10 border border-cyber-violet flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-cyber-violet" />
                    </div>
                    <span>App Router architectures using React Server Components</span>
                  </li>
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-cyber-violet/10 border border-cyber-violet flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-cyber-violet" />
                    </div>
                    <span>Asynchronous endpoint logic and schema validation</span>
                  </li>
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {["React", "Next.js", "FastAPI", "PostgreSQL"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-medium bg-basalt-canvas border border-abyssal-ink/10 px-8 py-2 rounded-buttons text-abyssal-ink/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: System Design (Graphic top, Text bottom) */}
            <div className="bg-ash-white border-2 border-abyssal-ink rounded-cards p-32 md:p-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_#070607] hover:shadow-[10px_10px_0px_0px_#070607] hover:translate-y-[-4px] transition-all duration-300 group">
              {/* System Design Image */}
              <div className="my-24 w-full bg-pure-white border border-abyssal-ink/20 rounded-default overflow-hidden aspect-video relative shadow-[2px_2px_0px_0px_#070607] order-first">
                <img
                  src="/system_design.png"
                  alt="System Design illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text content on bottom */}
              <div className="flex flex-col gap-16 order-last mt-12">
                <div className="flex items-center gap-8">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-abyssal-ink bg-abyssal-ink/5 px-8 py-4 rounded-buttons border border-abyssal-ink/20 uppercase">
                    // SCALE_INFRASTRUCTURE
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-abyssal-ink animate-pulse" />
                </div>

                <h3 className="text-heading-sm font-display text-abyssal-ink uppercase leading-none">
                  03 / SYSTEM DESIGN
                </h3>

                <p className="text-body-sm font-body text-abyssal-ink/80 leading-relaxed">
                  Design scalable architectures, APIs, databases, and cloud infrastructure. Configure cloud systems that focus on database replicas, fault tolerance, and load balance distributions.
                </p>

                {/* Detailed Capabilities List */}
                <ul className="flex flex-col gap-8 font-body text-[13px] text-abyssal-ink/75 my-4">
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-abyssal-ink/10 border border-abyssal-ink flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-abyssal-ink" />
                    </div>
                    <span>Load balancing, proxies, reverse gateways & routing setups</span>
                  </li>
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-abyssal-ink/10 border border-abyssal-ink flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-abyssal-ink" />
                    </div>
                    <span>Multi-container configuration and cloud hosting architectures</span>
                  </li>
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {["System Architecture", "Docker", "AWS", "Nginx"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-medium bg-basalt-canvas border border-abyssal-ink/10 px-8 py-2 rounded-buttons text-abyssal-ink/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4: Problem Solving (Text top, Graphic bottom) */}
            <div className="bg-digital-orange border-2 border-abyssal-ink rounded-cards p-32 md:p-40 flex flex-col justify-between shadow-[6px_6px_0px_0px_#070607] hover:shadow-[10px_10px_0px_0px_#524ae9] hover:translate-y-[-4px] transition-all duration-300 text-pure-white group">
              <div className="flex flex-col gap-16">
                <div className="flex items-center gap-8">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-pixel-glare bg-pure-white/15 px-8 py-4 rounded-buttons border border-pure-white/25 uppercase">
                    // ALGORITHMIC EFFICIENCY
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-pixel-glare animate-pulse" />
                </div>

                <h3 className="text-heading-sm font-display text-pure-white uppercase leading-none mt-4">
                  04 / PROBLEM SOLVING
                </h3>

                <p className="text-body-sm font-body text-pure-white/90 leading-relaxed">
                  Solve complex engineering challenges through efficient algorithms and practical solutions. Target runtime speeds, optimal storage trees, and performance debugging metrics.
                </p>

                {/* Detailed Capabilities List */}
                <ul className="flex flex-col gap-8 font-body text-[13px] text-pure-white/80 my-4">
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-pure-white/10 border border-pure-white flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-pure-white" />
                    </div>
                    <span>Algorithmic logic scaling (minimizing O(N) constraints)</span>
                  </li>
                  <li className="flex items-center gap-8">
                    <div className="w-3.5 h-3.5 rounded-full bg-pure-white/10 border border-pure-white flex items-center justify-center flex-shrink-0">
                      <Check size={8} className="text-pure-white" />
                    </div>
                    <span>Structuring tree graphs, binary indexes, and prefix trees</span>
                  </li>
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {["Algorithms", "Data Structures", "Big-O Analysis"].map((tag) => (
                    <span key={tag} className="text-[10px] font-mono font-medium bg-pure-white/10 border border-pure-white/15 px-8 py-2 rounded-buttons text-pure-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Monochrome outline graphic on bottom */}
              <div className="my-24 w-full bg-abyssal-ink border border-pure-white/20 rounded-default p-16 flex items-center justify-center aspect-video relative overflow-hidden shadow-[2px_2px_0px_0px_#070607]">
                <div className="absolute inset-0 pixel-pattern-orange opacity-20 pointer-events-none" />
                <div className="w-[85%] h-full flex items-center justify-center relative">
                  <svg className="w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                    <line x1="50%" y1="20%" x2="30%" y2="48%" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="50%" y1="20%" x2="70%" y2="48%" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="30%" y1="52%" x2="20%" y2="78%" stroke="#ffffff" strokeWidth="1" strokeDasharray="2 2" />
                    <line x1="30%" y1="52%" x2="40%" y2="78%" stroke="#ffffff" strokeWidth="1.5" />

                    <circle cx="50%" cy="20%" r="8" fill="#f5f28e" stroke="#070607" strokeWidth="2" />
                    <circle cx="30%" cy="50%" r="8" fill="#f7f6f2" stroke="#070607" strokeWidth="2" />
                    <circle cx="70%" cy="50%" r="8" fill="#f7f6f2" stroke="#070607" strokeWidth="2" />

                    <circle cx="20%" cy="80%" r="8" fill="#fc5000" stroke="#070607" strokeWidth="2" />
                    <circle cx="40%" cy="80%" r="8" fill="#f7f6f2" stroke="#070607" strokeWidth="2" />
                  </svg>
                  <div className="absolute top-2 right-2 font-mono text-[8px] text-pixel-glare uppercase tracking-widest bg-pure-white/10 px-6 py-1 rounded-buttons border border-pure-white/20">
                    O(log N)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED PROJECT SHOWCASE */}
      <section id="projects" className="w-full px-24 py-56 bg-basalt-canvas border-t border-abyssal-ink/10">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-48">

          <div className="flex flex-col gap-10">
            <span className="text-body-sm font-body text-end font-medium uppercase tracking-wider text-digital-orange">SELECTED LABS</span>
            <h2 className="text-heading font-display text-[170px] font-bold text-end text-abyssal-ink uppercase leading-none">FEATURED SYSTEMS SHOWROOM</h2>

          </div>

          {/* ACCORDION CONTAINER */}
          {/* Desktop Version: Horizontal Folding Row */}
          <div className="hidden lg:flex flex-row gap-24 h-[550px] w-full items-stretch transition-all duration-500 ease-in-out">
            {PROJECTS_DATA.map((project) => {
              const isOpen = activeProject === project.id;
              const isViolet = project.color === "cyber-violet";
              return (
                <div
                  key={project.id}
                  onClick={() => !isOpen && setActiveProject(project.id)}
                  className={`border-4 border-abyssal-ink rounded-cards p-32 flex transition-all duration-500 ease-in-out relative overflow-hidden shadow-[8px_8px_0px_0px_#070607] ${isOpen
                    ? "flex-[4.5] bg-ash-white cursor-default"
                    : "flex-[0.8] bg-basalt-canvas/45 cursor-pointer hover:bg-ash-white/85 hover:translate-y-[-2px] justify-center items-center"
                    }`}
                >
                  {!isOpen ? (
                    /* Collapsed Column representation */
                    <div className="flex flex-col items-center justify-between h-full py-16">
                      <span className={`font-display text-body-sm ${isViolet ? "text-cyber-violet" : "text-digital-orange"}`}>
                        // 0{project.id + 1}
                      </span>
                      <div
                        className="font-display uppercase tracking-widest text-[16px] text-abyssal-ink/60 rotate-180 whitespace-nowrap"
                        style={{ writingMode: "vertical-rl" }}
                      >
                        {project.title}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${isViolet ? "bg-cyber-violet animate-pulse" : "bg-digital-orange animate-pulse"}`} />
                    </div>
                  ) : (
                    /* Expanded Detailed representation */
                    <div className="w-full h-full flex gap-32 justify-between items-stretch animate-fade-in">
                      <div className="flex-1 flex flex-col justify-between gap-16 max-w-[48%]">
                        <div className="flex flex-col gap-12">
                          <div className="flex items-center gap-8">
                            <span className={`text-[10px] font-mono font-bold tracking-widest ${isViolet
                              ? "text-cyber-violet bg-cyber-violet/10 border-cyber-violet/20"
                              : "text-digital-orange bg-digital-orange/10 border-digital-orange/20"
                              } px-8 py-4 rounded-buttons border uppercase`}>
                              // {project.badge}
                            </span>
                            <span className={`w-2 h-2 rounded-full ${isViolet ? "bg-cyber-violet animate-pulse" : "bg-digital-orange animate-pulse"}`} />
                          </div>

                          <h3 className="text-heading font-display text-abyssal-ink uppercase leading-none mt-4">
                            {project.title}
                          </h3>

                          <p className="text-body-sm font-body text-abyssal-ink/80 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Features Bullet List */}
                          <div className="flex flex-col gap-8 mt-12">
                            <span className="text-[10px] font-mono font-bold text-abyssal-ink/65 uppercase tracking-wider">// SYSTEM HIGHLIGHTS</span>
                            <ul className="flex flex-col gap-6 font-body text-[13px] text-abyssal-ink/75">
                              {project.highlights.map((highlight, index) => (
                                <li key={index} className="flex items-start gap-8">
                                  <div className={`w-4 h-4 rounded-full ${isViolet ? "bg-cyber-violet/15 border-cyber-violet" : "bg-digital-orange/15 border-digital-orange"
                                    } border flex items-center justify-center flex-shrink-0 mt-2`}>
                                    <Check size={8} className={isViolet ? "text-cyber-violet" : "text-digital-orange"} />
                                  </div>
                                  <span>{highlight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-16 border-t border-abyssal-ink/10 pt-16 mt-8">
                          <div className="flex flex-wrap gap-4">
                            {project.techStack.map((tag) => (
                              <span key={tag} className="text-[9px] font-mono font-medium bg-pure-white border border-abyssal-ink/10 px-8 py-2 rounded-buttons text-abyssal-ink/85">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-6 font-mono text-[11px] font-bold ${isViolet ? "text-cyber-violet hover:text-digital-orange" : "text-digital-orange hover:text-cyber-violet"
                            } transition-colors`}>
                            <span>SOURCE</span>
                            <ExternalLink size={12} />
                          </a>
                        </div>
                      </div>

                      {/* Console Panel (Right half of expanded cabinet) */}
                      <div className="flex-1 bg-pure-white border-2 border-abyssal-ink rounded-default p-16 flex flex-col justify-between shadow-[4px_4px_0px_0px_#070607]">
                        <div className="flex items-center gap-6 border-b border-abyssal-ink/10 pb-8 mb-8 overflow-x-auto whitespace-nowrap">
                          {project.tabs.map((tab) => {
                            const isSelected = projectTabs[project.id] === tab.id;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setProjectTab(project.id, tab.id)}
                                className={`px-10 py-4 rounded-buttons font-mono text-[9px] font-bold border transition-all ${isSelected
                                  ? isViolet
                                    ? "bg-cyber-violet text-pure-white border-abyssal-ink shadow-[1px_1px_0px_0px_#070607]"
                                    : "bg-digital-orange text-pure-white border-abyssal-ink shadow-[1px_1px_0px_0px_#070607]"
                                  : "bg-ash-white border-abyssal-ink/20 text-abyssal-ink/60 hover:bg-basalt-canvas"
                                  }`}
                              >
                                {tab.label.toUpperCase()}
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex-1 w-full bg-abyssal-ink rounded-default border border-abyssal-ink/30 relative flex flex-col justify-between p-12 overflow-hidden min-h-0">
                          {renderConsoleContent(project.id, projectTabs[project.id] || project.defaultTab)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Version: Vertical Folding Accordion Stack */}
          <div className="flex lg:hidden flex-col gap-16 w-full">
            {PROJECTS_DATA.map((project) => {
              const isOpen = activeProject === project.id;
              const isViolet = project.color === "cyber-violet";
              return (
                <div key={project.id} className="border-2 border-abyssal-ink bg-ash-white rounded-cards overflow-hidden shadow-[4px_4px_0px_0px_#070607] transition-all duration-300">
                  <div
                    onClick={() => setActiveProject(isOpen ? -1 : project.id)}
                    className="p-20 bg-basalt-canvas/20 border-b border-abyssal-ink flex justify-between items-center cursor-pointer hover:bg-basalt-canvas/40"
                  >
                    <div className="flex items-center gap-12">
                      <span className={`font-mono text-body-sm ${isViolet ? "text-cyber-violet" : "text-digital-orange"}`}>
                        0{project.id + 1} //
                      </span>
                      <span className="font-display text-body uppercase tracking-wider text-abyssal-ink">
                        {project.title}
                      </span>
                    </div>
                    <ChevronRight size={16} className={`transition-transform duration-300 text-abyssal-ink ${isOpen ? "rotate-90" : ""}`} />
                  </div>

                  {isOpen && (
                    <div className="p-20 flex flex-col gap-20 animate-fade-in">
                      <p className="text-body-sm font-body text-abyssal-ink/80">
                        {project.description}
                      </p>
                      <ul className={`flex flex-col gap-8 font-body text-body-sm text-abyssal-ink/75 pl-12 border-l ${isViolet ? "border-cyber-violet" : "border-digital-orange"
                        }`}>
                        {project.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-6 pt-12 border-t border-abyssal-ink/10">
                        {project.techStack.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono bg-basalt-canvas px-8 py-2 rounded-buttons border border-abyssal-ink/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* TECH STACK VERTICAL FLIP MARQUEE */}
      <section className="w-full px-24  py-18  ">
        <div className="max-w-[1200px] h-[200px]  mx-auto">
          <div className="bg-pure-white  h-[170px]  border-abyssal-ink rounded-[20px]  flex flex-row items-center justify-between divide-x-2 divide-dashed divide-abyssal-ink/15 overflow-x-auto scrollbar-none py-12">
            {TECH_SLOTS_DATA.map((slot) => {
              return (
                <div
                  key={slot.slotIdx}
                  className="flex-1 min-w-[160px] h-80 overflow-hidden relative flex items-center justify-center"
                >
                  <div
                    className="flex flex-col transition-transform duration-500 ease-in-out absolute top-0 left-0 w-full"
                    style={{ transform: `translateY(-${marqueeIndexes[slot.slotIdx] * 80}px)` }}
                  >
                    {slot.items.map((item, itemIdx) => {
                      return (
                        <div
                          key={itemIdx}
                          className="h-80 flex items-center justify-center px-12 w-full flex-shrink-0"
                        >
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="h-[54px] max-h-[54px] max-w-[130px] object-contain opacity-80 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE / CAREER SYSTEM LOGS */}
      <section id="experience" className="w-full px-24 pt-56 pb-56 lg:pb-[240px] bg-ash-white border-t border-abyssal-ink/10">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-48">

          {/* Header */}
          <div className="flex flex-col gap-10">
            <span className="text-body-sm font-body font-medium uppercase tracking-wider text-digital-orange font-bold">SYSTEM METRICS</span>
            <h2 className="text-heading text-[170px] font-bold font-display text-abyssal-ink uppercase leading-none">PROFESSIONAL RECORD</h2>

          </div>

          {/* Interactive Timeline Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-40 items-start">

            {/* Left Column: Timeline Nodes Track */}
            <div className="lg:col-span-5 flex flex-col gap-24 relative pl-8">
              {/* Vertical Connecting Line */}
              <div className="absolute left-[36px] top-12 bottom-12 w-0.5 border-l-2 border-dashed border-abyssal-ink/20 pointer-events-none" />

              {EXPERIENCE_DATA.map((exp) => {
                const isActive = activeExperience === exp.id;
                const isViolet = exp.color === "cyber-violet";
                return (
                  <div
                    key={exp.id}
                    onClick={() => setActiveExperience(exp.id)}
                    className="flex items-center gap-24 cursor-pointer group z-10"
                  >
                    {/* Node Dot Indicator */}
                    <div className={`w-14 h-14 rounded-full border-4 border-abyssal-ink flex items-center justify-center transition-all duration-300 ${isActive
                      ? isViolet
                        ? "bg-cyber-violet scale-110 shadow-[0_0_0_6px_rgba(82,74,233,0.15)]"
                        : "bg-digital-orange scale-110 shadow-[0_0_0_6px_rgba(255,87,34,0.15)]"
                      : "bg-ash-white group-hover:bg-basalt-canvas"
                      }`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${isActive ? "bg-pure-white" : "bg-abyssal-ink/40"}`} />
                    </div>

                    {/* Node Card */}
                    <div className={`flex-1 border-4 border-abyssal-ink rounded-cards p-20 flex flex-col gap-6 shadow-[4px_4px_0px_0px_#070607] transition-all duration-300 ${isActive
                      ? "bg-pure-white translate-x-4 shadow-[6px_6px_0px_0px_#070607]"
                      : "bg-basalt-canvas/40 hover:bg-pure-white/80 hover:translate-x-2"
                      }`}>
                      <div className="flex justify-between items-start gap-12">
                        <span className={`font-display text-[14px] font-bold uppercase tracking-wider ${isActive
                          ? isViolet ? "text-cyber-violet" : "text-digital-orange"
                          : "text-abyssal-ink/70"
                          }`}>
                          {exp.company}
                        </span>
                        <span className="font-mono text-[9px] text-abyssal-ink/50 font-bold uppercase tracking-widest">{exp.period}</span>
                      </div>
                      <h4 className="font-body text-body-sm font-bold text-abyssal-ink">{exp.role}</h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Console CRT Terminal */}
            <div className="lg:col-span-7 bg-abyssal-ink border-4 border-abyssal-ink rounded-cards p-24 md:p-32 shadow-[8px_8px_0px_0px_#070607] text-pure-white min-h-[460px] flex flex-col justify-between relative overflow-hidden">

              {/* Scanlines / Retro overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-pure-white/5 to-transparent opacity-20" />

              <div className="flex flex-col gap-20 z-10">
                {/* Console Header */}
                <div className="flex justify-between items-start border-b border-pure-white/10 pb-16">
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[8px] text-pure-white/40 uppercase tracking-widest">// ACTIVE DIODE SHELL</span>
                    <h3 className="font-display text-body-lg font-bold text-pure-white tracking-wide uppercase">
                      {EXPERIENCE_DATA[activeExperience].role} @ {EXPERIENCE_DATA[activeExperience].company}
                    </h3>
                    <p className="font-mono text-[10px] text-pure-white/60">
                      {EXPERIENCE_DATA[activeExperience].location} // STATUS: ACTIVE
                    </p>
                  </div>
                  <div className={`font-mono text-[10px] font-bold px-10 py-4 rounded border ${EXPERIENCE_DATA[activeExperience].color === "cyber-violet"
                    ? "text-cyber-violet bg-cyber-violet/10 border-cyber-violet/20"
                    : "text-digital-orange bg-digital-orange/10 border-digital-orange/20"
                    }`}>
                    {EXPERIENCE_DATA[activeExperience].period}
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-body-sm font-body text-pure-white/80 leading-relaxed italic border-l-2 border-pure-white/20 pl-16">
                  &ldquo;{EXPERIENCE_DATA[activeExperience].tagline}&rdquo;
                </p>

                {/* Accomplishments Terminal Log */}
                <div className="flex flex-col gap-10 mt-8">
                  <span className="font-mono text-[8px] text-pure-white/40 uppercase tracking-widest">// DUTIES & WORK_LOGS</span>
                  <div className="flex flex-col gap-12 font-mono text-[11px] text-pure-white/90 leading-relaxed">
                    {EXPERIENCE_DATA[activeExperience].responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-10">
                        <span className={`text-[10px] ${EXPERIENCE_DATA[activeExperience].color === "cyber-violet" ? "text-cyber-violet" : "text-digital-orange"
                          }`}>[OK] &gt;&gt;</span>
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="z-10 mt-24">
                {/* Diagnostics Monitor */}
                <div className="grid grid-cols-2 gap-16 border-t border-pure-white/10 pt-20">
                  {EXPERIENCE_DATA[activeExperience].metrics.map((metric) => (
                    <div key={metric.name} className="bg-pure-white/5 border border-pure-white/10 rounded p-12 flex flex-col justify-between gap-4">
                      <span className="font-mono text-[8px] text-pure-white/45 uppercase tracking-wider">{metric.name}</span>
                      <span className={`font-display text-body-lg font-bold ${metric.color}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags / Tech used */}
                <div className="flex flex-wrap gap-6 mt-20 pt-16 border-t border-pure-white/5">
                  {EXPERIENCE_DATA[activeExperience].skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono font-medium bg-pure-white/10 text-pure-white/85 px-8 py-2 rounded border border-pure-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SYSTEM MILESTONES & CERTIFICATES */}
      <section id="milestones" className="w-full hidden px-24 py-56 bg-basalt-canvas border-t border-abyssal-ink/10">
        <div className="max-w-[1700px] mx-auto flex flex-col gap-48">

          <div className="flex flex-col gap-10">
            <span className="text-body-sm font-body font-medium uppercase tracking-wider text-cyber-violet font-bold">SYSTEM OVERRIDES</span>
            <h2 className="text-heading font-display text-[170px]text-abyssal-ink uppercase leading-none">MILESTONES & CRITICAL CLEARANCES</h2>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">

            {/* Left: Achievements (Trophies) */}
            <div className="flex flex-col gap-24">
              <div className="flex items-center gap-12 border-b border-abyssal-ink/10 pb-16">
                <div className="w-10 h-10 rounded border border-abyssal-ink bg-ash-white flex items-center justify-center">
                  <Trophy size={16} className="text-digital-orange" />
                </div>
                <h3 className="font-display text-body-lg font-bold text-abyssal-ink uppercase">UNLOCKED TROPHIES</h3>
              </div>

              <div className="flex flex-col gap-20">
                {ACHIEVEMENTS_DATA.map((ach) => {
                  const isViolet = ach.color === "cyber-violet";
                  return (
                    <div
                      key={ach.id}
                      className="border-4 border-abyssal-ink bg-ash-white rounded-cards p-24 shadow-[4px_4px_0px_0px_#070607] flex flex-col gap-10 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start gap-12">
                        <h4 className="font-display text-[15px] font-bold text-abyssal-ink uppercase tracking-wide">
                          {ach.title}
                        </h4>
                        <span className={`font-mono text-[9px] font-bold px-8 py-2 rounded border ${isViolet
                          ? "bg-cyber-violet/10 border-cyber-violet/20 text-cyber-violet"
                          : "bg-digital-orange/10 border-digital-orange/20 text-digital-orange"
                          }`}>
                          {ach.metric}
                        </span>
                      </div>
                      <p className="font-body text-body-sm text-abyssal-ink/80 leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Certifications (Clearances) */}
            <div className="flex flex-col gap-24">
              <div className="flex items-center gap-12 border-b border-abyssal-ink/10 pb-16">
                <div className="w-10 h-10 rounded border border-abyssal-ink bg-ash-white flex items-center justify-center">
                  <Award size={16} className="text-cyber-violet" />
                </div>
                <h3 className="font-display text-body-lg font-bold text-abyssal-ink uppercase">VERIFIED CERTIFICATES</h3>
              </div>

              <div className="flex flex-col gap-20">
                {CERTIFICATIONS_DATA.map((cert) => {
                  const isViolet = cert.color === "cyber-violet";
                  return (
                    <div
                      key={cert.id}
                      className="border-4 border-abyssal-ink bg-pure-white rounded-cards p-24 shadow-[4px_4px_0px_0px_#070607] flex flex-col gap-10 relative overflow-hidden"
                    >
                      <div className="flex justify-between items-start gap-12">
                        <div className="flex flex-col gap-2">
                          <h4 className="font-display text-[15px] font-bold text-abyssal-ink uppercase tracking-wide">
                            {cert.title}
                          </h4>
                          <span className="font-body text-[11px] text-abyssal-ink/60">{cert.issuer}</span>
                        </div>
                        <span className="font-mono text-[10px] text-abyssal-ink/50 font-bold">{cert.date}</span>
                      </div>
                      <div className="mt-8 pt-12 border-t border-abyssal-ink/5 flex justify-between items-center font-mono text-[9px]">
                        <span className="text-abyssal-ink/40 uppercase tracking-widest">// SECURE REGISTRY</span>
                        <span className={isViolet ? "text-cyber-violet" : "text-digital-orange"}>{cert.verificationHash}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* EDUCATION FLOPPY DRIVE */}
      <section id="education" className="w-full px-24 py-36 md:py-48 lg:py-56 bg-basalt-canvas border-t border-abyssal-ink/10 relative overflow-visible z-20">
        <div className="max-w-[1200px] mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-12 gap-32 md:gap-48 items-center">

            {/* Left Column: Big, Tilted Floppy Disk with all data */}
            <div className="md:col-span-5 flex justify-center items-center relative z-20">
              <motion.div
                onMouseEnter={() => setIsFloppyHovered(true)}
                onMouseLeave={() => setIsFloppyHovered(false)}
                animate={{
                  rotate: isFloppyHovered ? -3 : -8,
                  y: [0, -12, 0]
                }}
                transition={{
                  rotate: { type: "spring", stiffness: 150, damping: 15 },
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="relative w-full max-w-[340px] md:max-w-[440px] aspect-[1/1.1] bg-gradient-to-br from-cyber-violet to-digital-orange border-4 border-abyssal-ink rounded-[32px] shadow-[12px_12px_0px_0px_#070607] flex flex-col justify-between overflow-hidden cursor-pointer md:-my-72 lg:-my-96 z-30"
              >
                {/* Write Protect Notch (illusion Cutout) */}
                <div className="w-10 h-10 bg-basalt-canvas border-b-4 border-l-4 border-abyssal-ink absolute right-10 top-0 z-20" />

                {/* Metal Shutter (Slide Cover) */}
                <motion.div
                  animate={{ x: isFloppyHovered ? 75 : 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 18 }}
                  className="absolute left-[90px] top-0 w-[130px] h-[65px] bg-[#d5d2c8] border-b-4 border-r-4 border-l-4 border-abyssal-ink rounded-b-md flex items-center justify-around px-12 z-10"
                >
                  <div className="w-2.5 h-12 bg-abyssal-ink/80 rounded-sm" />
                  <div className="w-2.5 h-12 bg-abyssal-ink/80 rounded-sm" />
                  <div className="w-5 h-8 bg-basalt-canvas border-2 border-abyssal-ink rounded-sm" />
                </motion.div>

                {/* Read/Write Window underneath Shutter */}
                <div className="absolute left-[105px] top-0 w-[70px] h-[58px] bg-abyssal-ink border-b-4 border-x-4 border-abyssal-ink rounded-b flex items-center justify-center overflow-hidden z-0">
                  {/* Spinning magnetic disk texture */}
                  <motion.div
                    animate={{ rotate: isFloppyHovered ? 360 : 0 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="w-14 h-14 border-2 border-dashed border-pure-white/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-4 h-4 bg-[#1c1b1c] rounded-full border border-pure-white/10" />
                  </motion.div>
                </div>

                {/* Disk Label Sticker - Containing ALL Data */}
                <div className="bg-pure-white border-4 border-abyssal-ink mx-24 mt-[90px] mb-24 p-24 flex-1 rounded-[24px] flex flex-col justify-between shadow-[inset_2px_2px_0px_rgba(0,0,0,0.05)] relative overflow-hidden">
                  {/* Grid background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(7,6,7,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(7,6,7,0.03)_1px,transparent_1px)] bg-[size:12px_12px] pointer-events-none opacity-50" />

                  <div className="flex flex-col gap-16 relative z-10 h-full justify-between">
                    {/* Education Item 1 */}
                    <div className="flex flex-col gap-2 pb-16 border-b border-dashed border-abyssal-ink/20">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] font-extrabold tracking-widest text-cyber-violet">
                          // MEM_BLOCK_01
                        </span>
                        <span className="font-mono text-[9px] text-cyber-violet bg-cyber-violet/5 border border-cyber-violet/20 px-8 py-1 rounded">
                          2018 - 2022
                        </span>
                      </div>
                      <h3 className="font-display text-[17px] font-bold text-abyssal-ink leading-tight uppercase mt-4">
                        B.Tech in Computer Science
                      </h3>
                      <p className="font-body text-[12px] text-abyssal-ink/80 font-medium">
                        National Institute of Technology
                      </p>
                    </div>

                    {/* Education Item 2 */}
                    <div className="flex flex-col gap-2 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[9px] font-extrabold tracking-widest text-digital-orange">
                          // MEM_BLOCK_02
                        </span>
                        <span className="font-mono text-[9px] text-digital-orange bg-digital-orange/5 border border-digital-orange/20 px-8 py-1 rounded">
                          2023
                        </span>
                      </div>
                      <h3 className="font-display text-[17px] font-bold text-abyssal-ink leading-tight uppercase mt-4">
                        Executive AI Certification
                      </h3>
                      <p className="font-body text-[12px] text-abyssal-ink/80 font-medium">
                        Stanford Center for Professional Development
                      </p>
                    </div>

                    {/* Bottom Metadata row */}
                    <div className="flex justify-between items-center border-t border-dashed border-abyssal-ink/20 pt-12 mt-4">
                      <span className="font-mono text-[9px] font-bold text-abyssal-ink/40">SYS_VOL: ACADEMIC</span>
                      <span className="font-mono text-[9px] text-abyssal-ink/40 font-bold">CAPACITY: 2.88MB</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Title and Subheading */}
            <div className="md:col-span-7 flex flex-col gap-20">
              <span className="text-body-sm font-body font-medium uppercase tracking-wider text-digital-orange font-bold">// STORAGE MODULES</span>
              <h2 className="text-heading font-display text-abyssal-ink uppercase leading-none text-[60px] font-bold sm:text-[64px] md:text-[80px] lg:text-[110px]">
                MEMORY SECTORS
              </h2>

            </div>

          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full px-24 pt-72 md:pt-96 lg:pt-[240px] pb-72 md:pb-96 bg-digital-orange border-t-4 border-b-4 border-abyssal-ink relative z-10">
        <div className="max-w-[1200px] mx-auto relative">
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-48 lg:gap-80 items-start relative z-10">
            {/* Left Column: Big elegant display typography */}
            <div className="lg:col-span-5 flex flex-col gap-24 text-pure-white">
              <span className="font-mono text-[10px] font-extrabold tracking-widest text-pure-white bg-abyssal-ink w-fit px-10 py-6 rounded border border-pure-white/20">
                // SYSTEM_LINK: STABLE_CONNECTION
              </span>
              <h2 className="text-heading font-display text-[64px] sm:text-[80px] md:text-[96px] leading-[0.85] text-pure-white uppercase font-bold tracking-tight">
                LET&apos;S BUILD SOMETHING.
              </h2>
              <p className="font-body text-[16px] md:text-[18px] text-pure-white/80 leading-relaxed max-w-md mt-8 font-medium">
                Establish a direct pipeline to transmit your message. Whether it&apos;s a project query, collaboration, or system integration, my console is online.
              </p>

              {/* Minimal Telemetry dashboard */}
              <div className="mt-32 p-20 rounded-[20px] border border-pure-white/10 bg-abyssal-ink/20 font-mono text-[11px] flex flex-col gap-10 max-w-sm">
                <div className="flex items-center justify-between">
                  <span className="opacity-60">LINK_ROUTE:</span>
                  <span className="text-pure-white font-bold">DIRECT_SECURE</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-60">ENCRYPTION:</span>
                  <span className="text-pure-white font-bold">AES-256-GCM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-60">PACKET_ROUTE:</span>
                  <span className="text-pure-white font-bold">WORKSTATION_01</span>
                </div>
              </div>
            </div>

            {/* Right Column: Sleek minimal form with border-bottom inputs */}
            <div className="lg:col-span-7 w-full lg:pl-16">
              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-abyssal-ink border-4 border-abyssal-ink text-pure-white rounded-[24px] p-40 text-center flex flex-col items-center gap-20 shadow-[8px_8px_0px_0px_rgba(7,6,7,0.15)]"
                >
                  <div className="w-[56px] h-[56px] rounded-full bg-pure-white/10 border-2 border-pure-white flex items-center justify-center text-pure-white">
                    <Check size={24} />
                  </div>
                  <h3 className="font-display text-[28px] font-bold uppercase tracking-wide">
                    TRANSMISSION SUCCESSFUL
                  </h3>
                  <p className="font-body text-[14px] text-pure-white/70 max-w-sm">
                    Your packet has been encrypted and routed. I will check the log stack and reply shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-28">
                  {/* Name field */}
                  <div className="flex flex-col gap-8">
                    <label htmlFor="contact-name" className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-pure-white/70">
                      // TRANSMITTER_NAME:
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Enter your name..."
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-transparent border-b-4 border-abyssal-ink px-0 py-12 text-pure-white placeholder-pure-white/30 text-[18px] focus:border-pure-white outline-none transition-colors font-medium"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-8">
                    <label htmlFor="contact-email" className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-pure-white/70">
                      // ROUTING_ADDRESS:
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Enter your email..."
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-transparent border-b-4 border-abyssal-ink px-0 py-12 text-pure-white placeholder-pure-white/30 text-[18px] focus:border-pure-white outline-none transition-colors font-medium"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-8">
                    <label htmlFor="contact-message" className="font-mono text-[10px] font-extrabold uppercase tracking-wider text-pure-white/70">
                      // DATA_PACKET_PAYLOAD:
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={3}
                      placeholder="Write your transmission packet..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full bg-transparent border-b-4 border-abyssal-ink px-0 py-12 text-pure-white placeholder-pure-white/30 text-[18px] focus:border-pure-white outline-none transition-colors font-medium resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full md:w-fit px-32 py-16 bg-abyssal-ink text-pure-white rounded-full font-body font-bold text-[15px] hover:bg-pure-white hover:text-abyssal-ink hover:-translate-y-1 transition-all flex items-center justify-center gap-10 shadow-[4px_4px_0px_0px_rgba(7,6,7,0.15)] disabled:opacity-50 cursor-pointer mt-12"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-pure-white border-t-transparent rounded-full"
                        />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>INITIATE TRANSMISSION</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full px-24 pt-48 pb-56 bg-transparent mt-auto relative z-10">
        <div className="max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">

          {/* Left Column: Dark Brand Box */}
          <div className="lg:col-span-6 bg-abyssal-ink rounded-[32px] p-40 md:p-48 text-pure-white flex flex-col justify-between min-h-[340px]">
            <div>
              {/* Logo Mark */}
              <div className="flex items-center gap-8">
                <div className="bg-digital-orange flex flex-wrap p-[2px] rounded-sm w-[50px] h-[50px]">
                  <div className="w-1/2 h-1/2 bg-pure-white" />
                  <div className="w-1/2 h-1/2 bg-transparent" />
                  <div className="w-1/2 h-1/2 bg-transparent" />
                  <div className="w-1/2 h-1/2 bg-cyber-violet" />
                </div>
                <span className="font-display text-body font-bold text-pure-white tracking-wider uppercase select-none">
                  UTKARSH <span className="text-digital-orange">JAISWAL</span>
                </span>
              </div>

              <h2 className="font-display text-[28px] md:text-[38px] uppercase leading-[1.05] tracking-wide text-pure-white max-w-sm mt-32">
                BUILDING THE NEXT GENERATION OF AI &amp; WEB SYSTEMS
              </h2>
            </div>

            <a
              href="mailto:utkarshjaiswal.work@gmail.com"
              className="bg-digital-orange text-pure-white font-medium rounded-full py-12 px-24 font-body text-body-sm w-fit font-bold hover:brightness-105 transition-all flex items-center gap-8 mt-24 self-start"
            >
              Book A Call <ArrowRight size={14} />
            </a>
          </div>

          {/* Right Column: Socials & Sub-box */}
          <div className="lg:col-span-6 flex flex-col gap-24">
            {/* Social Icons Row */}
            <div className="flex flex-wrap gap-12 items-center justify-start lg:justify-end">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[100px] h-[100px] rounded-full bg-digital-orange text-pure-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[2px_2px_8px_rgba(252,80,0,0.2)]"
              >
                <svg className="w-[50px] h-[50px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[100px] h-[100px] rounded-full bg-digital-orange text-pure-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[2px_2px_8px_rgba(252,80,0,0.2)]"
              >
                <svg className="w-[50px] h-[50px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="mailto:utkarshjaiswal.work@gmail.com"
                className="w-[100px] h-[100px] rounded-full bg-digital-orange text-pure-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[2px_2px_8px_rgba(252,80,0,0.2)]"
              >
                <Mail size={50} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[100px] h-[100px] rounded-full bg-digital-orange text-pure-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[2px_2px_8px_rgba(252,80,0,0.2)]"
              >
                <svg className="w-[50px] h-[50px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[100px] h-[100px] rounded-full bg-digital-orange text-pure-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-[2px_2px_8px_rgba(252,80,0,0.2)]"
              >
                <svg className="w-[50px] h-[50px] fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.61l-1.92 9.07c-.14.65-.53.81-1.08.5l-2.93-2.16-1.41 1.36c-.16.16-.29.29-.6.29l.21-3.01 5.48-4.95c.24-.22-.05-.34-.37-.13l-6.78 4.27-2.92-.91c-.64-.2-.65-.64.13-.94l11.39-4.39c.53-.19.99.13.83.94z" />
                </svg>
              </a>
            </div>

            {/* Bottom Inner Box with Links & Copyright */}
            <div className="bg-ash-white rounded-[32px] p-32 md:p-40 flex flex-col justify-between flex-1 border border-abyssal-ink/5 shadow-[4px_4px_0px_0px_rgba(7,6,7,0.03)]">
              <div className="flex flex-wrap gap-x-24 gap-y-12 font-mono text-[15px] font-bold text-abyssal-ink uppercase tracking-wider">
                <a href="#capabilities" className="hover:text-digital-orange transition-colors">Capabilities</a>
                <a href="#projects" className="hover:text-digital-orange transition-colors">Projects</a>
                <a href="#experience" className="hover:text-digital-orange transition-colors">Experience</a>
                <a href="#milestones" className="hover:text-digital-orange transition-colors">Milestones</a>
                <a href="#education" className="hover:text-digital-orange transition-colors">Education</a>
              </div>

              <hr className="border-t border-abyssal-ink/10 my-20" />

              <div className="font-body text-[11px] text-abyssal-ink">
                Utkarsh Jaiswal 2026 © All rights reserved.
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
