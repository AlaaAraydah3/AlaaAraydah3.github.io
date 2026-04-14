import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Mail, ChevronRight, Code2, Database, Box, Server, Bot, ExternalLink, Linkedin, Menu, X, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const projectCategories = [
  {
    category: "Foundations",
    icon: <Code2 className="w-5 h-5 text-primary" />,
    subcategories: [
      {
        subtitle: "Git, Environment Setup & Collaboration",
        projects: [
          {
            title: "Environment & Git Workflows",
            description: "Set up a reproducible Python development environment and practiced branching, merging, and pull request workflows.",
            link: "https://github.com/LevelUp-Applied-AI/m1-l1-git-workflows-AlaaAraydah3",
            tags: ["Git", "GitHub", "VS Code", "Virtual Environments"]
          },
          {
            title: "Team Collaboration Pipeline",
            description: "Collaborated on a shared repository using feature branches and code review, resolving merge conflicts and maintaining a clean commit history.",
            link: "https://github.com/LevelUp-Applied-AI/m1-d1-git-workflows-AlaaAraydah3",
            tags: ["Git", "Pull Requests", "Code Review"]
          }
        ]
      },
      {
        subtitle: "Data Pipelines & PyTorch Fundamentals",
        projects: [
          {
            title: "Data Pipeline",
            description: "Built an end-to-end data loading and preprocessing pipeline using pandas, with validation checks and reproducible outputs.",
            link: "https://github.com/LevelUp-Applied-AI/m2-l2-data-pipeline-AlaaAraydah3",
            tags: ["Python", "pandas", "Data Cleaning"]
          },
          {
            title: "PyTorch Model",
            description: "Implemented a neural network training loop in PyTorch, including data loading, forward/backward passes, and evaluation metrics.",
            link: "https://github.com/LevelUp-Applied-AI/m2-i2-pytorch-AlaaAraydah3",
            tags: ["PyTorch", "Tensors", "Model Evaluation"]
          }
        ]
      },
      {
        subtitle: "Relational Databases & SQL",
        projects: [
          {
            title: "SQL Fundamentals",
            description: "Queried and analyzed relational data using PostgreSQL, including joins and aggregations.",
            link: "https://github.com/LevelUp-Applied-AI/m3-d3-sql-fundamentals-AlaaAraydah3",
            tags: ["SQL", "PostgreSQL", "Data Modeling"]
          },
          {
            title: "ETL Pipeline",
            description: "Built an ETL pipeline to extract, transform, validate, and load customer data into PostgreSQL and CSV outputs.",
            link: "https://github.com/LevelUp-Applied-AI/m3-i3-etl-pipeline-AlaaAraydah3",
            tags: ["SQL", "Data Validation", "Data Cleaning"]
          }
        ]
      },
      {
        subtitle: "Data Visualization & Communication",
        projects: [
          {
            title: "KPI Dashboard",
            description: "Developed a KPI dashboard to analyze revenue, customer behavior, and trends using visualizations.",
            link: "https://github.com/LevelUp-Applied-AI/m4-i4-kpi-dashboard-AlaaAraydah3",
            tags: ["Matplotlib", "KPI", "Data Storytelling"]
          },
          {
            title: "Descriptive Analytics",
            description: "Performed exploratory data analysis and statistical testing to extract insights from datasets.",
            link: "https://github.com/LevelUp-Applied-AI/m4-l4-descriptive-analytics-AlaaAraydah3",
            tags: ["Matplotlib", "Hypothesis Testing", "EDA"]
          }
        ]
      }
    ]
  },
  {
    category: "Machine Learning & NLP",
    icon: <Bot className="w-5 h-5 text-primary" />,
    subcategories: [
      {
        subtitle: "Machine Learning Fundamentals",
        projects: [
          {
            title: "Coming Soon",
            description: "Machine learning fundamentals project — in progress.",
            link: "#",
            tags: ["scikit-learn", "Model Evaluation"]
          }
        ]
      },
      {
        subtitle: "Natural Language Processing",
        projects: [
          {
            title: "Coming Soon",
            description: "NLP pipeline project — in progress.",
            link: "#",
            tags: ["spaCy", "Text Preprocessing", "NLP Pipelines"]
          }
        ]
      },
      {
        subtitle: "Deep Learning for NLP",
        projects: [
          {
            title: "Coming Soon",
            description: "Deep learning for NLP project — in progress.",
            link: "#",
            tags: ["PyTorch", "Hugging Face", "Transformers"]
          }
        ]
      }
    ]
  },
  {
    category: "Retrieval & Knowledge Graphs",
    icon: <Database className="w-5 h-5 text-primary" />,
    subcategories: [
      {
        subtitle: "Retrieval-Augmented Generation",
        projects: [
          {
            title: "Coming Soon",
            description: "RAG pipeline project — in progress.",
            link: "#",
            tags: ["Weaviate", "RAG", "Embeddings"]
          }
        ]
      },
      {
        subtitle: "Knowledge Graphs",
        projects: [
          {
            title: "Coming Soon",
            description: "Knowledge graph project — in progress.",
            link: "#",
            tags: ["SPARQL", "Triple Stores", "Knowledge Representation"]
          }
        ]
      }
    ]
  },
  {
    category: "Deployment",
    icon: <Server className="w-5 h-5 text-primary" />,
    subcategories: [
      {
        subtitle: "API Development & Containerization",
        projects: [
          {
            title: "Coming Soon",
            description: "FastAPI and Docker deployment project — in progress.",
            link: "#",
            tags: ["FastAPI", "Docker", "APIs"]
          }
        ]
      },
      {
        subtitle: "Monitoring & Production Systems",
        projects: [
          {
            title: "Coming Soon",
            description: "Production reliability and monitoring project — in progress.",
            link: "#",
            tags: ["Monitoring", "Logging", "Production"]
          }
        ]
      }
    ]
  },
  {
    category: "Capstone Project",
    icon: <Box className="w-5 h-5 text-primary" />,
    subcategories: [
      {
        subtitle: "Full-Stack AI/ML System",
        projects: [
          {
            title: "Coming Soon",
            description: "A culminating project integrating the full AI/ML pipeline from data to deployed model.",
            link: "#",
            tags: ["Full Pipeline", "AI", "Deployment"]
          }
        ]
      }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [openCategory, setOpenCategory] = useState<string | null>("Foundations");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 bg-grain">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="font-mono font-bold tracking-tight text-foreground text-lg">alaa<span className="text-primary">.dev</span></span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium">
            {["home", "about", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`capitalize transition-all duration-300 relative ${
                  activeSection === section ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`nav-${section}`}
              >
                {section}
                {activeSection === section && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute -bottom-7 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                  />
                )}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {["home", "about", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`text-2xl font-semibold capitalize text-left ${
                  activeSection === section ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {section}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-6 pt-40 pb-32 space-y-40 relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[60vh] flex flex-col justify-center relative">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-[128px] pointer-events-none" />
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 relative z-10 max-w-3xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-mono font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Available for Opportunities
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
              Alaa Araydah
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500 mt-2 text-4xl md:text-5xl">
                AI/ML Engineering.
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Electronic Engineering graduate building expertise in applied Artificial Intelligence, Machine Learning, and Data Systems.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
              <Button onClick={() => scrollTo("projects")} size="lg" className="h-12 px-6 gap-2 text-base shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] transition-all" data-testid="button-view-projects">
                View Projects <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollTo("contact")} className="h-12 px-6 border-white/10 hover:bg-white/5" data-testid="button-contact">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-m-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-12 items-start"
          >
            <div className="md:w-1/3">
              <h3 className="text-3xl font-bold tracking-tight mb-2">About Me</h3>
              <div className="h-1 w-12 bg-primary rounded-full" />
            </div>
            
            <div className="md:w-2/3 space-y-8">
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg border-l-2 border-white/10 pl-6">
                <p>
                  I am a recent graduate in Electronic Engineering from Yarmouk University in Jordan. I am building expertise in applied AI and ML systems through the AI.SPIRE program.
                </p>
                <p>
                  I am most interested in NLP, computer vision, and data engineering — areas where thoughtful systems design meets real-world impact. This portfolio tracks my learning journey and the projects I have built along the way.
                </p>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-mono text-foreground font-semibold uppercase tracking-wider">Core Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {["Natural Language Processing", "Computer Vision", "Data Engineering", "Machine Learning", "System Design"].map(interest => (
                    <span key={interest} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-foreground hover:border-primary/50 transition-colors cursor-default">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-m-24 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tight mb-2">Selected Projects</h3>
            <div className="h-1 w-12 bg-primary rounded-full mb-4" />
            <p className="text-muted-foreground">A timeline of my technical work, organized by program track.</p>
          </motion.div>

          <div className="space-y-6">
            {projectCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1, duration: 0.5 }}
                className={`rounded-xl overflow-hidden border ${openCategory === cat.category ? 'border-primary/50 shadow-[0_0_30px_rgba(20,184,166,0.1)]' : 'border-white/10'} bg-card/50 backdrop-blur-sm transition-all duration-300`}
              >
                <button
                  onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-white/5 transition-colors text-left group"
                  data-testid={`category-toggle-${cat.category}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg transition-colors ${openCategory === cat.category ? 'bg-primary/20' : 'bg-white/5 group-hover:bg-primary/10'}`}>
                      {cat.icon}
                    </div>
                    <span className="font-semibold text-xl text-foreground tracking-tight">{cat.category}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openCategory === cat.category ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${openCategory === cat.category ? 'bg-white/10' : ''}`}
                  >
                    <ChevronRight className={`w-5 h-5 ${openCategory === cat.category ? 'text-primary' : 'text-muted-foreground'}`} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openCategory === cat.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="border-t border-white/5 px-6 py-8 space-y-12 bg-black/20">
                        {cat.subcategories.map((sub) => (
                          <div key={sub.subtitle} className="space-y-6">
                            <h5 className="text-sm font-mono font-semibold text-primary uppercase tracking-widest flex items-center gap-4">
                              <span>{sub.subtitle}</span>
                              <span className="h-[1px] flex-1 bg-white/5" />
                            </h5>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {sub.projects.map((project) => {
                                const isComingSoon = project.title === "Coming Soon";
                                
                                return (
                                  <Card
                                    key={project.title}
                                    className={`flex flex-col border border-white/10 bg-card/80 transition-all duration-300 ${isComingSoon ? 'opacity-60 grayscale-[0.5]' : 'hover:border-primary/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5'} relative overflow-hidden group`}
                                    data-testid={`card-project-${project.title}`}
                                  >
                                    {!isComingSoon && (
                                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    )}
                                    
                                    <CardHeader className="pb-4 relative z-10">
                                      <CardTitle className={`text-xl ${isComingSoon ? 'text-muted-foreground font-medium' : 'text-foreground'}`}>
                                        {project.title}
                                      </CardTitle>
                                      <CardDescription className="text-sm leading-relaxed text-muted-foreground/80 pt-2 min-h-[3rem]">
                                        {project.description}
                                      </CardDescription>
                                    </CardHeader>
                                    
                                    <CardContent className="pb-4 flex-grow relative z-10">
                                      <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                          <Badge
                                            key={tag}
                                            variant="secondary"
                                            className={`font-mono text-xs font-normal py-1 ${isComingSoon ? 'bg-white/5 text-muted-foreground' : 'bg-primary/10 text-primary border-primary/20'}`}
                                            data-testid={`badge-tag-${tag}`}
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </CardContent>
                                    
                                    {project.link !== "#" && !isComingSoon && (
                                      <CardFooter className="pt-0 pb-5 relative z-10 mt-auto">
                                        <a
                                          href={project.link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-sm font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group/link"
                                          data-testid={`link-github-${project.title}`}
                                        >
                                          <SiGithub className="w-4 h-4" />
                                          <span>View Repository</span>
                                          <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100 transition-opacity group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                                        </a>
                                      </CardFooter>
                                    )}
                                  </Card>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-m-24 pb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 rounded-3xl -z-10 pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center space-y-10 py-16 px-6 border border-white/5 rounded-3xl bg-card/30 backdrop-blur-sm"
          >
            <div className="space-y-4">
              <h3 className="text-4xl font-extrabold tracking-tight">Let's Connect</h3>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Open to discussing AI/ML projects, collaboration, or opportunities in the field.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 gap-3 text-base" data-testid="button-email">
                <a href="mailto:alaaaraydah50@gmail.com">
                  <Mail className="w-5 h-5" />
                  Email Me
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 gap-3 text-base border-white/10 hover:bg-white/5" data-testid="button-github">
                <a href="https://github.com/AlaaAraydah3" target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-5 h-5" />
                  GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 gap-3 text-base border-white/10 hover:bg-white/5" data-testid="button-linkedin">
                <a href="https://linkedin.com/in/alaa-araydah-278849234" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 text-center text-sm text-muted-foreground font-mono relative z-10 bg-background/50">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Alaa Araydah. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Built with <span className="text-primary font-bold">React</span> & <span className="text-blue-500 font-bold">Tailwind</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Portfolio />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
