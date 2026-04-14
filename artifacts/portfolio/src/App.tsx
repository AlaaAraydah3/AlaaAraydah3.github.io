import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Mail, ChevronRight, Code2, Database, Box, Server, Bot, ExternalLink, Linkedin } from "lucide-react";
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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [openCategory, setOpenCategory] = useState<string | null>("Foundations");

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
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono font-bold tracking-tight text-primary">~/alaa</span>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            {["home", "about", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`capitalize transition-colors hover:text-foreground ${
                  activeSection === section ? "text-primary" : ""
                }`}
                data-testid={`nav-${section}`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-24 space-y-32">
        {/* HERO SECTION */}
        <section id="home" className="min-h-[50vh] flex flex-col justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight">
              Alaa Araydah
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground font-mono">
              AI/ML Engineering Student
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground max-w-xl leading-relaxed">
              Electronic Engineering graduate building expertise in applied AI and ML systems through the AI.SPIRE program.
            </motion.p>
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <Button onClick={() => scrollTo("projects")} className="gap-2" data-testid="button-view-projects">
                View Projects <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo("contact")} data-testid="button-contact">
                Contact Me
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="scroll-m-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-2xl space-y-6"
          >
            <h3 className="text-3xl font-bold tracking-tight">About</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base">
              <p>
                I am a recent graduate in Electronic Engineering from Yarmouk University in Jordan. I am building expertise in applied AI and ML systems through the AI.SPIRE program.
              </p>
              <p>
                I am most interested in NLP, computer vision, and data engineering — areas where thoughtful systems design meets real-world impact. This portfolio tracks my learning journey and the projects I have built along the way.
              </p>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="scroll-m-24 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold tracking-tight">Projects</h3>
            <p className="text-muted-foreground mt-2">Organized by program track.</p>
          </motion.div>

          <div className="space-y-4">
            {projectCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.07 }}
                className="border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenCategory(openCategory === cat.category ? null : cat.category)}
                  className="w-full flex items-center justify-between px-6 py-4 bg-card hover:bg-card/80 transition-colors text-left"
                  data-testid={`category-toggle-${cat.category}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/8 rounded-lg">
                      {cat.icon}
                    </div>
                    <span className="font-semibold text-lg text-card-foreground">{cat.category}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openCategory === cat.category ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                {openCategory === cat.category && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-border bg-background px-6 py-6 space-y-8"
                  >
                    {cat.subcategories.map((sub) => (
                      <div key={sub.subtitle} className="space-y-4">
                        <h5 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                          {sub.subtitle}
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {sub.projects.map((project) => (
                            <Card
                              key={project.title}
                              className="flex flex-col border border-border bg-card hover:shadow-md transition-all duration-200 group"
                              data-testid={`card-project-${project.title}`}
                            >
                              <CardHeader className="pb-2">
                                <CardTitle className="text-base">{project.title}</CardTitle>
                                <CardDescription className="text-sm leading-relaxed">
                                  {project.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent className="pb-3">
                                <div className="flex flex-wrap gap-1.5">
                                  {project.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant="secondary"
                                      className="font-mono text-xs"
                                      data-testid={`badge-tag-${tag}`}
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </CardContent>
                              {project.link !== "#" && (
                                <CardFooter className="pt-0 pb-4">
                                  <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1.5"
                                    data-testid={`link-github-${project.title}`}
                                  >
                                    <SiGithub className="w-3.5 h-3.5" />
                                    View on GitHub
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </CardFooter>
                              )}
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="scroll-m-24 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold tracking-tight">Let's Connect</h3>
              <p className="text-muted-foreground mt-2">
                Open to discussing AI/ML projects, collaboration, or opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2" data-testid="button-email">
                <a href="mailto:alaaaraydah50@gmail.com">
                  <Mail className="w-5 h-5" />
                  alaaaraydah50@gmail.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2" data-testid="button-github">
                <a href="https://github.com/AlaaAraydah3" target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-5 h-5" />
                  github.com/AlaaAraydah3
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2" data-testid="button-linkedin">
                <a href="https://linkedin.com/in/alaa-araydah-278849234" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground font-mono">
        <p>Alaa Araydah &mdash; Built with React & Tailwind</p>
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
