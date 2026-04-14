import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { Mail, ChevronRight, Code2, Database, Box, Server, Bot } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

const projects = [
  {
    title: "Foundations",
    description: "Core Python, data structures, and algorithms that underpin everything I build.",
    icon: <Code2 className="w-5 h-5 text-primary" />,
    tags: ["Python", "Algorithms", "Data Structures"],
    link: "https://github.com/yourname/foundations"
  },
  {
    title: "Machine Learning & NLP",
    description: "Hands-on ML models and NLP pipelines using scikit-learn and NLTK.",
    icon: <Bot className="w-5 h-5 text-primary" />,
    tags: ["scikit-learn", "NLP", "ML"],
    link: "https://github.com/yourname/ml-nlp"
  },
  {
    title: "Retrieval Systems",
    description: "Vector search and semantic retrieval systems built with embeddings and FAISS.",
    icon: <Database className="w-5 h-5 text-primary" />,
    tags: ["Embeddings", "FAISS", "RAG"],
    link: "https://github.com/yourname/retrieval-systems"
  },
  {
    title: "Deployment Projects",
    description: "End-to-end model deployment with FastAPI and Docker for production-ready APIs.",
    icon: <Server className="w-5 h-5 text-primary" />,
    tags: ["FastAPI", "Docker", "APIs"],
    link: "https://github.com/yourname/deployment"
  },
  {
    title: "Capstone Project",
    description: "A culminating project integrating the full AI/ML pipeline from data to deployed model.",
    icon: <Box className="w-5 h-5 text-primary" />,
    tags: ["Full Pipeline", "AI", "Deployment"],
    link: "https://github.com/yourname/capstone"
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
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");

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
          <span className="font-mono font-bold tracking-tight text-primary">~/yourname</span>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            {["home", "about", "projects", "contact"].map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`capitalize transition-colors hover:text-foreground ${
                  activeSection === section ? "text-primary" : ""
                }`}
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
              Your Name
            </motion.h1>
            <motion.h2 variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground font-mono">
              AI/ML Engineering Student
            </motion.h2>
            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              <Button onClick={() => scrollTo("projects")} className="gap-2">
                View Projects <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => scrollTo("contact")}>
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
            <div className="prose prose-lg text-muted-foreground leading-relaxed">
              <p>
                I'm currently building a foundation in artificial intelligence and machine learning, learning Python, and working on projects that turn ideas into working systems.
              </p>
              <p>
                I'm passionate about applying ML concepts to real problems, from data pipelines to model deployment. This portfolio tracks my learning journey and the projects I've built along the way.
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
            <p className="text-muted-foreground mt-2">Selected works from my learning journey.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === projects.length - 1 ? "md:col-span-2 md:max-w-xl mx-auto" : ""}
              >
                <Card className="h-full flex flex-col hover-elevate transition-all duration-300 border border-border bg-card overflow-hidden group">
                  <CardHeader>
                    <div className="mb-4 p-3 bg-primary/5 rounded-xl w-fit group-hover:bg-primary/10 transition-colors">
                      {project.icon}
                    </div>
                    <CardTitle className="text-xl flex items-center justify-between">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm mt-2 text-muted-foreground leading-relaxed">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-mono text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 pb-6">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1.5"
                    >
                      <SiGithub className="w-4 h-4" />
                      View Source
                    </a>
                  </CardFooter>
                </Card>
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
                I'm always open to discussing ML projects, study groups, or potential opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-2">
                <a href="mailto:your@email.com">
                  <Mail className="w-5 h-5" />
                  your@email.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
                  <SiGithub className="w-5 h-5" />
                  github.com/yourname
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground font-mono">
        <p>Built with React & Tailwind</p>
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
