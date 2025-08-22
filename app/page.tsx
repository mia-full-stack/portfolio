"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Database,
  Server,
  Smartphone,
} from "lucide-react";
import ContactForm from "@/components/contact-form";
import { translations, type Language } from "@/lib/translations";
import { Header } from "../components/header";

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const t = translations[language];

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";

    if (savedLanguage) setLanguage(savedLanguage);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Header */}
      <Header
        theme={theme}
        onThemeChange={setTheme}
        language={language}
        onLanguageChange={setLanguage}
        translations={t}
      />

      {/* Hero Section */}
      <section
        id="hero"
        className={`pt-24 pb-16 px-4 text-center transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-800 to-slate-900"
            : "bg-gradient-to-br from-slate-100 to-slate-200"
        }`}
      >
        <div className="container max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <img
              src="/marina-avatar.png"
              alt={t.name}
              className={`w-32 h-32 rounded-full mx-auto mb-6 border-4 transition-all duration-500 hover:scale-110 shadow-lg ${
                theme === "dark"
                  ? "border-slate-600 hover:border-slate-500"
                  : "border-slate-300 hover:border-slate-400"
              }`}
            />
          </div>
          <h1
            className={`font-serif text-4xl md:text-6xl font-bold mb-6 animate-slide-up transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.name}
          </h1>
          <p
            className={`text-xl md:text-2xl mb-8 animate-slide-up animation-delay-200 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.role}
          </p>
          <p
            className={`text-lg mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-400 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.heroDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
            <Button
              size="lg"
              className={`transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                theme === "dark"
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-slate-700 hover:bg-slate-800 text-white"
              }`}
            >
              <a href="#projects">{t.viewProjects}</a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`transform hover:scale-105 transition-all duration-300 bg-transparent ${
                theme === "dark"
                  ? "border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-slate-500"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400"
              }`}
            >
              <a href="#contact">{t.contactMe}</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="container max-w-4xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.aboutTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t.aboutText1}
              </p>
              <p
                className={`text-lg leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t.aboutText2}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {t.skil1}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {t.skil2}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {t.skil3}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {t.skil4}
                </Badge>
              </div>
            </div>
            <div className="space-y-4">
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Code
                      className={`h-8 w-8 ${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        Frontend
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        React, TypeScript, Tailwind CSS
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Server
                      className={`h-8 w-8 ${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        Backend
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        Node.js, Express, REST API
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Database
                      className={`h-8 w-8 ${
                        theme === "dark" ? "text-slate-400" : "text-slate-600"
                      }`}
                    />
                    <div>
                      <h3
                        className={`font-semibold ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {t.databases}
                        
                      </h3>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        PostgreSQL, MongoDB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        }`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.skillsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className={`text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <CardHeader>
                <Code
                  className={`h-12 w-12 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  } mx-auto mb-4 transition-transform duration-300 hover:scale-110`}
                />
                <CardTitle
                  className={`text-slate-800 transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {t.frontend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    React
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Tailwind CSS
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    HTML5/CSS3
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <CardHeader>
                <Server
                  className={`h-12 w-12 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  } mx-auto mb-4 transition-transform duration-300 hover:scale-110`}
                />
                <CardTitle
                  className={`text-slate-800 transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {t.backend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Express
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    REST API
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    JWT
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Middleware
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <CardHeader>
                <Database
                  className={`h-12 w-12 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  } mx-auto mb-4 transition-transform duration-300 hover:scale-110`}
                />
                <CardTitle
                  className={`text-slate-800 transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {t.databases}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    PostgreSQL
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    MongoDB
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Prisma
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    SQL
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`text-center hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                theme === "dark"
                  ? "border-slate-700 bg-slate-900"
                  : "border-slate-200 bg-white"
              }`}
            >
              <CardHeader>
                <Smartphone
                  className={`h-12 w-12 ${
                    theme === "dark" ? "text-slate-400" : "text-slate-600"
                  } mx-auto mb-4 transition-transform duration-300 hover:scale-110`}
                />
                <CardTitle
                  className={`text-slate-800 transition-colors duration-300 ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {t.tools}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Git
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Docker
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Vercel
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    VS Code
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors duration-300 ${
                      theme === "dark"
                        ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                        : "border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    Postman
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.projectsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-slate-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/ecommerce-website-mockup.png"
                  alt="E-commerce проект"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-800">
                  {t.resumeContent.projectName}
                  
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-600" />
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {t.resumeContent.projectDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    React
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    Node.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    PostgreSQL
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-700 text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-slate-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/task-management-app.png"
                  alt="Task Manager проект"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-800">
                  Task Manager
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-600" />
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {t.resumeContent.projectDescription1}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    Next.js
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    TypeScript
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    MongoDB
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-700 text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-slate-200 overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300 rounded-t-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/weather-app-dashboard.png"
                  alt="Weather App проект"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-slate-800">
                  Weather App
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-600" />
                </CardTitle>
                <CardDescription className="text-slate-600">
                  {t.resumeContent.projectDescription2}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    React
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    API
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-slate-200 text-slate-700"
                  >
                    Tailwind
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all duration-300 bg-transparent"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-700 text-white hover:bg-slate-800 transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section
        id="certificates"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        }`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.certificatesTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.certificates.map((cert, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                {cert.image && (
                  <div className="p-4 pb-0">
                    <img
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.name}
                      className="w-full h-48 object-cover rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                      onClick={() => setSelectedCertificate(cert)}
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={`transition-colors duration-300 ${
                        theme === "dark"
                          ? "bg-slate-700 text-slate-300"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {cert.date}
                    </Badge>
                  </div>
                  <CardTitle
                    className={`text-lg transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-200" : "text-slate-800"
                    }`}
                  >
                    {cert.name}
                  </CardTitle>
                  <CardDescription
                    className={`font-medium transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {cert.issuer}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-sm leading-relaxed transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div className="container max-w-6xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.testimonialsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className={`hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-900"
                    : "border-slate-200 bg-white"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white transition-colors duration-300 ${
                        theme === "dark" ? "bg-slate-600" : "bg-slate-500"
                      }`}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <CardTitle
                        className={`text-lg transition-colors duration-300 ${
                          theme === "dark" ? "text-slate-200" : "text-slate-800"
                        }`}
                      >
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription
                        className={`transition-colors duration-300 ${
                          theme === "dark" ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {testimonial.role} • {testimonial.company}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p
                    className={`text-sm leading-relaxed italic transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    "{testimonial.text}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-4 transition-colors duration-300 ${
          theme === "dark" ? "bg-slate-900" : "bg-slate-100"
        }`}
      >
        <div className="container max-w-4xl mx-auto">
          <h2
            className={`font-serif text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-300 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            {t.contactTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3
                className={`text-xl font-semibold mb-6 transition-colors duration-300 ${
                  theme === "dark" ? "text-slate-200" : "text-slate-800"
                }`}
              >
                {t.readyForChallenges}
              </h3>
              <p
                className={`text-slate-600 mb-8 leading-relaxed transition-colors duration-300 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {t.contactDescription}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 hover:text-slate-800 transition-colors duration-300">
                  <Mail
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-slate-600 transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    mia-full-stack@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3 hover:text-slate-800 transition-colors duration-300">
                  <Phone
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-slate-600 transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    +491754145431
                  </span>
                </div>
                <div className="flex items-center gap-3 hover:text-slate-800 transition-colors duration-300">
                  <MapPin
                    className={`h-5 w-5 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  />
                  <span
                    className={`text-slate-600 transition-colors duration-300 ${
                      theme === "dark" ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {t.around}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-slate-300 text-slate-700 hover:bg-slate-200 hover:scale-110 transition-all duration-300 bg-transparent ${
                    theme === "dark"
                      ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                  asChild
                >
                  <a
                    href="https://github.com/mia-full-stack"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                  
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={`border-slate-300 text-slate-700 hover:bg-slate-200 hover:scale-110 transition-all duration-300 bg-transparent ${
                    theme === "dark"
                      ? "border-slate-600 text-slate-300 hover:bg-slate-800"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                  asChild
                >
                  <a
                    href="https://www.linkedin.com/in/mia-pakulova-maryna-060435349/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            {/* Contact Form Component */}
            <ContactForm translations={t.contactForm} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-8 px-4 border-t transition-colors duration-300 ${
          theme === "dark"
            ? "border-slate-700 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <p
            className={`transition-colors duration-300 ${
              theme === "dark" ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {t.footer}
          </p>
        </div>
      </footer>

      {selectedCertificate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all duration-200"
            >
              ✕
            </button>
            <img
              src={selectedCertificate.image || "/placeholder.svg"}
              alt={selectedCertificate.name}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
              <h3 className="text-lg font-bold">{selectedCertificate.name}</h3>
              <p className="text-sm opacity-90">
                {selectedCertificate.issuer} • {selectedCertificate.date}
              </p>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            theme === "dark"
              ? "bg-slate-700 text-slate-200 hover:bg-slate-600"
              : "bg-slate-800 text-white hover:bg-slate-700"
          }`}
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
