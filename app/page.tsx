"use client"

import type React from "react"
import Link from "next/link"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Users,
  Award,
  Mail,
  Globe,
  ChevronRight,
  TrendingUp,
  Database,
  Cloud,
  Code,
  BarChart3,
  Settings,
  Clock,
  Building,
} from "lucide-react"

interface Course {
  id: number
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  price: number
  duration: { en: string; ar: string }
  level: { en: string; ar: string }
  active: boolean
  registrationLink: string
  icon: string
}

interface TeamMember {
  name: string
  title: { en: string; ar: string }
  bio: { en: string; ar: string }
  linkedin: string
  image: string
}

// Icon mapping function
const getIcon = (iconName: string, className: string = "w-6 h-6") => {
  const iconMap: { [key: string]: React.ReactNode } = {
    BarChart3: <BarChart3 className={className} />,
    TrendingUp: <TrendingUp className={className} />,
    Database: <Database className={className} />,
    Cloud: <Cloud className={className} />,
    Settings: <Settings className={className} />,
    Users: <Users className={className} />,
    BookOpen: <BookOpen className={className} />,
    Clock: <Clock className={className} />,
    Award: <Award className={className} />,
    Building: <Building className={className} />,
    Globe: <Globe className={className} />,
  }
  return iconMap[iconName] || <BookOpen className={className} />
}



export default function DataAcademyPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  
  // Data from JSON files
  const [translations, setTranslations] = useState<any>({})
  const [courses, setCourses] = useState<Course[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [config, setConfig] = useState<any>({})
  const [archivedCourses, setArchivedCourses] = useState<any[]>([])
  const [impactData, setImpactData] = useState<any>({})
  const [servicesData, setServicesData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const t = translations[language] || {}

  // Get impact metrics
  const impactMetrics = impactData.metrics || []

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        const [translationsRes, coursesRes, teamRes, configRes, archivedRes, impactRes, servicesRes] = await Promise.all([
          fetch('/data/translations.json'),
          fetch('/data/courses.json'),
          fetch('/data/team.json'),
          fetch('/data/config.json'),
          fetch('/data/archived-courses.json'),
          fetch('/data/impact.json'),
          fetch('/data/services.json')
        ])
        
        const translationsData = await translationsRes.json()
        const coursesData = await coursesRes.json()
        const teamData = await teamRes.json()
        const configData = await configRes.json()
        const archivedData = await archivedRes.json()
        const impactData = await impactRes.json()
        const servicesData = await servicesRes.json()
        
        setTranslations(translationsData)
        setCourses(coursesData)
        setTeamMembers(teamData)
        setConfig(configData)
        setArchivedCourses(archivedData)
        setImpactData(impactData)
        setServicesData(servicesData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])


  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate email sending (replace with actual email service)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real implementation, you would send this to your email service
      console.log("Contact form submitted:", {
        ...contactForm,
        to: config?.academy?.email || "info@iq-data.org",
      })

      setSubmitMessage(t.messageSent)
      setContactForm({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitMessage(t.messageError)
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitMessage(""), 5000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/20 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center p-1">
              <img 
                src="/pics/icon.png" 
                alt="Data Academy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-xl font-bold text-white">{t.heroTitle}</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-white hover:text-blue-200 transition-colors">
              {t.home}
            </a>
            <a href="#courses" className="text-white hover:text-blue-200 transition-colors">
              {t.courses}
            </a>
            <a href="#about" className="text-white hover:text-blue-200 transition-colors">
              {t.about}
            </a>
            <a href="#contact" className="text-white hover:text-blue-200 transition-colors">
              {t.contact}
            </a>
          </nav>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="flex items-center gap-2 border-white/80 text-white hover:bg-white/10 hover:border-white transition-all duration-200 bg-white/5 backdrop-blur-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">
              {language === "en" ? "العربية" : "English"}
            </span>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        id="home" 
        className="pt-20 pb-16 relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/pics/cover.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in-up">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 p-3">
              <img 
                src="/pics/icon.png" 
                alt="Data Academy Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans">{t.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-blue-200 font-semibold mb-6 font-sans">{t.heroSubtitle}</p>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed font-sans">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => window.open(config?.academy?.defaultRegistrationLink || "https://forms.gle/D3GNxmgYPnT8kmSi8", "_blank")}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                {t.registerTraining}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-primary transition-all duration-200 shadow-lg"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Mail className="w-5 h-5 mr-2" />
                {t.contactMentoring}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.servicesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-sans">{t.liveTraining}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">{t.liveTrainingDesc}</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="font-sans">{t.mentoring}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">{t.mentoringDesc}</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-chart-2/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-8 h-8 text-chart-2" />
                </div>
                <CardTitle className="font-sans">{t.consultancy}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground font-sans">{t.consultancyDesc}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.coursesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.coursesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses
              .filter((course) => course.active)
              .map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getIcon(course.icon)}
                      </div>
                      <Badge variant="secondary" className="font-sans">
                        {course.level[language]}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-sans">{course.title[language]}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed font-sans">
                      {course.description[language]}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground font-sans">{t.price}:</span>
                        <span className="font-semibold text-primary font-sans">
                          {course.price.toLocaleString()} {t.iqd}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground font-sans">{t.duration}:</span>
                        <span className="font-medium font-sans">{course.duration[language]}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1 font-sans bg-primary hover:bg-primary/90 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
                        onClick={() => window.open(course.registrationLink, "_blank")}
                      >
                        {t.registerNow}
                      </Button>
                      <Button
                        variant="outline"
                        className="font-sans border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                        onClick={() => setSelectedCourse(course)}
                      >
                        {t.learnMore}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Archived Courses Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.archivedCoursesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.archivedCoursesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {archivedCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getIcon(course.icon)}
                    </div>
                    <Badge variant="secondary" className="font-sans">
                      {course.level[language]}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-sans">{course.title[language]}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed font-sans">
                    {course.description[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-sans">{t.completedOn}:</span>
                      <span className="font-medium font-sans">
                        {new Date(course.completedDate).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-sans">{t.participantsCount}:</span>
                      <span className="font-medium font-sans">{course.participants}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-sans">{t.rating}:</span>
                      <span className="font-medium font-sans flex items-center gap-1">
                        {course.rating}
                        <span className="text-yellow-400">★</span>
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/archived-courses">
              <Button variant="outline" size="lg" className="font-sans border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md">
                {t.viewAllArchived}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="stats-section" className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">{t.statsTitle}</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactMetrics.map((metric: any) => (
              <div key={metric.id} className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    {getIcon(metric.icon, "w-6 h-6 text-white")}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 font-sans">
                  {metric.value.toLocaleString()}{metric.isPercentage ? '%' : ''}
                </div>
                <div className="text-primary-foreground/80 font-sans">{metric.label[language]}</div>
                <p className="text-xs text-primary-foreground/60 mt-2 max-w-32 mx-auto leading-tight font-sans">
                  {metric.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Highlights Section */}
      {impactData.highlights && impactData.highlights.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">
                {language === "en" ? "Our Achievements" : "إنجازاتنا"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {impactData.highlights.map((highlight: any, index: number) => (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-sans">{highlight.title[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed font-sans">
                      {highlight.description[language]}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.aboutTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.aboutSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-sans">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium font-sans">
                    {member.title[language]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed font-sans">{member.bio[language]}</p>
                  <Button
                    variant="outline"
                    onClick={() => window.open(member.linkedin, "_blank")}
                    className="w-full font-sans border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    {t.viewLinkedIn}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.contactTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.contactSubtitle}</p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder={t.name}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      required
                      className="font-sans"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t.email}
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                      className="font-sans"
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder={t.message}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      rows={5}
                      required
                      className="font-sans"
                    />
                  </div>

                  <Button type="submit" className="w-full font-sans bg-primary hover:bg-primary/90 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        {t.sendMessage}
                      </div>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        {t.sendMessage}
                      </>
                    )}
                  </Button>

                  {submitMessage && (
                    <div
                      className={`text-center p-3 rounded-lg font-sans ${
                        submitMessage === t.messageSent
                          ? "bg-chart-2/10 text-chart-2"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center p-1">
                <img 
                  src="/pics/icon.png" 
                  alt="Data Academy Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold font-sans">{t.heroTitle}</h3>
            </div>
            <p className="text-background/80 mb-6 max-w-2xl mx-auto font-sans">{t.footerDescription}</p>
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-background/80">
                <Mail className="w-4 h-4" />
                <span className="font-sans">{config?.academy?.email || "info@iq-data.org"}</span>
              </div>
            </div>
            <div className="border-t border-background/20 pt-6">
              <p className="text-background/60 font-sans">{t.footerText}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2 font-sans">{selectedCourse.title[language]}</CardTitle>
                  <Badge variant="secondary" className="font-sans">
                    {selectedCourse.level[language]}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(null)} className="hover:bg-gray-100 transition-colors">
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed font-sans">
                  {selectedCourse.description[language]}
                </p>

                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground font-sans">{t.price}:</span>
                    <div className="font-semibold text-primary font-sans">
                      {selectedCourse.price.toLocaleString()} {t.iqd}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground font-sans">{t.duration}:</span>
                    <div className="font-medium font-sans">{selectedCourse.duration[language]}</div>
                  </div>
                </div>

                <Button
                  className="w-full font-sans bg-primary hover:bg-primary/90 text-white border-0 shadow-sm hover:shadow-md transition-all duration-200"
                  onClick={() => {
                    window.open(selectedCourse.registrationLink, "_blank")
                    setSelectedCourse(null)
                  }}
                >
                  {t.registerNow}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
