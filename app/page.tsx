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
  GraduationCap,
  Briefcase,
  UserPlus,
  MessageCircle,
  Instagram,
  Send,
  Facebook,
  Linkedin,
  Phone,
  Copy,
  ExternalLink,
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
  image?: string
}

interface TeamMember {
  name: string
  title: { en: string; ar: string }
  bio: { en: string; ar: string }
  linkedin: string
  image: string
}

interface Partner {
  id: number
  title: { en: string; ar: string }
  icon: string
  embedUrl: string
  active: boolean
}

interface Service {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  icon: string
  features: { en: string; ar: string }[]
  duration: { en: string; ar: string }
}

interface SocialMedia {
  id: string
  name: string
  username: string
  url: string
  icon: string
  color: string
  hoverColor: string
}

interface ContactSuggestion {
  id: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  icon: string
  color: string
  iconColor: string
  suggestion: { en: string; ar: string }
}

interface ContactData {
  contactInfo: {
    email: string
    phone: string
    website: string
  }
  socialMedia: SocialMedia[]
  contactSuggestions: ContactSuggestion[]
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
    Code: <Code className={className} />,
    GraduationCap: <GraduationCap className={className} />,
    Briefcase: <Briefcase className={className} />,
    UserPlus: <UserPlus className={className} />,
    Handshake: <Users className={className} />,
    MessageCircle: <MessageCircle className={className} />,
    Instagram: <Instagram className={className} />,
    Send: <Send className={className} />,
    Facebook: <Facebook className={className} />,
    Linkedin: <Linkedin className={className} />,
    Phone: <Phone className={className} />,
    Mail: <Mail className={className} />,
    Copy: <Copy className={className} />,
    ExternalLink: <ExternalLink className={className} />,
  }
  return iconMap[iconName] || <BookOpen className={className} />
}



export default function DataAcademyPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  
  // Data from JSON files
  const [translations, setTranslations] = useState<any>({})
  const [courses, setCourses] = useState<Course[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [config, setConfig] = useState<any>({})
  const [archivedCourses, setArchivedCourses] = useState<any[]>([])
  const [impactData, setImpactData] = useState<any>({})
  const [services, setServices] = useState<Service[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [contactData, setContactData] = useState<ContactData | null>(null)
  const [loading, setLoading] = useState(true)

  const t = translations[language] || {}

  // Get impact metrics
  const impactMetrics = impactData.metrics || []

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        const [translationsRes, coursesRes, teamRes, configRes, archivedRes, impactRes, servicesRes, partnersRes, contactRes] = await Promise.all([
          fetch('/data/translations.json'),
          fetch('/data/courses.json'),
          fetch('/data/team.json'),
          fetch('/data/config.json'),
          fetch('/data/archived-courses.json'),
          fetch('/data/impact.json'),
          fetch('/data/services.json'),
          fetch('/data/partners.json'),
          fetch('/data/contact.json')
        ])
        
        const translationsData = await translationsRes.json()
        const coursesData = await coursesRes.json()
        const teamData = await teamRes.json()
        const configData = await configRes.json()
        const archivedData = await archivedRes.json()
        const impactData = await impactRes.json()
        const servicesData = await servicesRes.json()
        const partnersData = await partnersRes.json()
        const contactData = await contactRes.json()
        
        setTranslations(translationsData)
        setCourses(coursesData)
        setTeamMembers(teamData)
        setConfig(configData)
        setArchivedCourses(archivedData)
        setImpactData(impactData)
        setServices(servicesData)
        setPartners(partnersData)
        setContactData(contactData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])


  // Helper function to copy text to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      return false
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
            <a href="#services" className="text-white hover:text-blue-200 transition-colors">
              {t.services}
            </a>
            <a href="#courses" className="text-white hover:text-blue-200 transition-colors">
              {t.courses}
            </a>
            <a href="#partners" className="text-white hover:text-blue-200 transition-colors">
              {t.partners}
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
      <section id="services" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.servicesTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.servicesSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const bgColors = ['bg-primary/10', 'bg-accent/10', 'bg-chart-2/10', 'bg-chart-3/10']
              const textColors = ['text-primary', 'text-accent', 'text-chart-2', 'text-chart-3']
              return (
                <Card key={service.id} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className={`w-16 h-16 ${bgColors[index % bgColors.length]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {getIcon(service.icon, `w-8 h-8 ${textColors[index % textColors.length]}`)}
                    </div>
                    <CardTitle className="font-sans text-lg">{service.title[language]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-4">
                      {service.description[language]}
                    </p>
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="text-xs text-muted-foreground font-sans">
                          • {feature[language]}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs font-medium text-primary font-sans">
                      {service.duration[language]}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
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

          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {courses
              .filter((course) => course.active)
              .map((course) => (
                <Card key={course.id} className="w-full max-w-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  {course.image && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title[language]}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          const target = e.target as HTMLImageElement
                          target.src = `https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=${encodeURIComponent(course.title.en)}`
                        }}
                      />
                      <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className="font-sans bg-white/90 text-gray-800">
                          {course.level[language]}
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {getIcon(course.icon)}
                      </div>
                      {!course.image && (
                        <Badge variant="secondary" className="font-sans">
                          {course.level[language]}
                        </Badge>
                      )}
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 justify-items-center">
            {archivedCourses.slice(0, 3).map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {course.image && (
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title[language]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = `https://via.placeholder.com/400x240/10B981/FFFFFF?text=${encodeURIComponent(course.title.en)}`
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="font-sans bg-white/90 text-gray-800 text-xs">
                        {course.level[language]}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <div className="flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        <span className="text-yellow-400">★</span>
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>
                )}
                <CardHeader className={course.image ? "pb-4" : ""}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getIcon(course.icon, "w-4 h-4")}
                    </div>
                    {!course.image && (
                      <Badge variant="secondary" className="font-sans text-xs">
                        {course.level[language]}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-sans">{course.title[language]}</CardTitle>
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


      {/* Partners Section */}
      <section id="partners" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-sans">{t.partnersTitle}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-sans">{t.partnersSubtitle}</p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {partners
              .filter((partner) => partner.active)
              .map((partner) => (
                <div
                  key={partner.id}
                  className="text-center cursor-pointer hover:scale-105 transition-all duration-300 group"
                  onClick={() => window.open(partner.embedUrl, "_blank")}
                >
                  <div className="w-20 h-20 mx-auto mb-3 rounded-lg bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow duration-300 group-hover:bg-primary/5">
                    <img
                      src={partner.icon}
                      alt={partner.title[language]}
                      className="w-16 h-16 object-contain"
                      onError={(e) => {
                        // Fallback to a default icon if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = "https://img.icons8.com/color/96/000000/company.png"
                      }}
                    />
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300 font-sans">
                    {partner.title[language]}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </section>

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

          {contactData && (
            <div className="max-w-6xl mx-auto space-y-12">
              
              {/* Contact Information Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Email Card */}
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                      <Mail className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="font-sans text-lg">Email</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 font-sans">Send us an email</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-foreground font-sans">{contactData.contactInfo.email}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contactData.contactInfo.email)}
                        className="h-8 w-8 p-0 hover:bg-blue-100"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => window.location.href = `mailto:${contactData.contactInfo.email}`}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                {/* Phone Card */}
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
                      <Phone className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="font-sans text-lg">Phone</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 font-sans">Call us directly</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-foreground font-sans">{contactData.contactInfo.phone}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contactData.contactInfo.phone)}
                        className="h-8 w-8 p-0 hover:bg-green-100"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => window.location.href = `tel:${contactData.contactInfo.phone.replace(/\s/g, '')}`}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Website Card */}
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-100 transition-colors">
                      <Globe className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="font-sans text-lg">Website</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 font-sans">Visit our website</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-medium text-foreground font-sans text-sm">{contactData.contactInfo.website}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(contactData.contactInfo.website)}
                        className="h-8 w-8 p-0 hover:bg-purple-100"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => window.open(contactData.contactInfo.website, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Social Media Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-6 font-sans">Follow Us</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {contactData.socialMedia.map((social) => (
                    <Button
                      key={social.id}
                      className={`${social.color} ${social.hoverColor} text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-12 h-12 p-0 rounded-full`}
                      onClick={() => window.open(social.url, '_blank')}
                    >
                      {getIcon(social.icon, "w-6 h-6")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Contact Suggestions */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-center font-sans">How Can We Help You?</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contactData.contactSuggestions.map((suggestion) => (
                    <Card key={suggestion.id} className={`${suggestion.color} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group`}>
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                            {getIcon(suggestion.icon, `w-6 h-6 ${suggestion.iconColor}`)}
                          </div>
                          <div>
                            <CardTitle className="font-sans text-lg text-left">{suggestion.title[language]}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 font-sans leading-relaxed">
                          {suggestion.description[language]}
                        </p>
                        <p className="text-sm font-medium text-foreground font-sans">
                          💡 {suggestion.suggestion[language]}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4 font-sans">Ready to Get Started?</h3>
                <p className="text-lg text-muted-foreground mb-6 font-sans max-w-2xl mx-auto">
                  {language === 'en' 
                    ? 'Choose your preferred contact method and reach out to us. We\'re here to help you succeed!'
                    : 'اختر طريقة التواصل المفضلة لديك وتواصل معنا. نحن هنا لمساعدتك على النجاح!'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                    onClick={() => window.location.href = `mailto:${contactData.contactInfo.email}?subject=Inquiry from Data Academy Website`}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Send Email' : 'إرسال بريد إلكتروني'}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
                    onClick={() => window.open(contactData.socialMedia[1]?.url, '_blank')} // Telegram
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {language === 'en' ? 'Message on Telegram' : 'رسالة على تيليجرام'}
                  </Button>
                </div>
              </div>
            </div>
          )}
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
