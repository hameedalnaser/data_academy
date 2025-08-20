"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  Star,
  BarChart3,
  TrendingUp,
  Database,
  Cloud,
  Settings,
  Code,
  BookOpen,
  Globe,
} from "lucide-react"

interface ArchivedCourse {
  id: number
  title: { en: string; ar: string }
  description: { en: string; ar: string }
  completedDate: string
  participants: number
  duration: { en: string; ar: string }
  level: { en: string; ar: string }
  instructor: string
  rating: number
  icon: string
  outcomes: { en: string; ar: string }[]
}

// Icon mapping function
const getIcon = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    BarChart3: <BarChart3 className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Database: <Database className="w-6 h-6" />,
    Cloud: <Cloud className="w-6 h-6" />,
    Settings: <Settings className="w-6 h-6" />,
    Code: <Code className="w-6 h-6" />,
  }
  return iconMap[iconName] || <BookOpen className="w-6 h-6" />
}

export default function ArchivedCoursesPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [archivedCourses, setArchivedCourses] = useState<ArchivedCourse[]>([])
  const [translations, setTranslations] = useState<any>({})
  const [loading, setLoading] = useState(true)

  const t = translations[language] || {}

  // Load data from JSON files
  useEffect(() => {
    const loadData = async () => {
      try {
        const [translationsRes, archivedCoursesRes] = await Promise.all([
          fetch('/data/translations.json'),
          fetch('/data/archived-courses.json')
        ])
        
        const translationsData = await translationsRes.json()
        const archivedCoursesData = await archivedCoursesRes.json()
        
        setTranslations(translationsData)
        setArchivedCourses(archivedCoursesData)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" className="border-white/80 text-white hover:bg-white/10 hover:border-white transition-all duration-200 bg-white/5 backdrop-blur-sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="border-white/80 text-white hover:bg-white/10 hover:border-white transition-all duration-200 bg-white/5 backdrop-blur-sm"
            >
              <Globe className="w-4 h-4 mr-2" />
              <span className="font-medium">
                {language === "en" ? "العربية" : "English"}
              </span>
            </Button>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "en" ? "Archived Courses" : "الدورات المؤرشفة"}
            </h1>
            <p className="text-xl text-blue-100">
              {language === "en" 
                ? "Explore our successful training programs completed in the past" 
                : "استكشف برامجنا التدريبية الناجحة التي تم إنجازها في الماضي"}
            </p>
          </div>
        </div>
      </header>

      {/* Archived Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archivedCourses.map((course) => (
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-sans flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {language === "en" ? "Completed:" : "مكتملة:"}
                      </span>
                      <span className="font-medium font-sans">{formatDate(course.completedDate)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-sans flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {language === "en" ? "Participants:" : "المشاركين:"}
                      </span>
                      <span className="font-medium font-sans">{course.participants}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-sans flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {language === "en" ? "Duration:" : "المدة:"}
                      </span>
                      <span className="font-medium font-sans">{course.duration[language]}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground font-sans flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {language === "en" ? "Rating:" : "التقييم:"}
                      </span>
                      <span className="font-medium font-sans flex items-center gap-1">
                        {course.rating}
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-sm mb-2">
                      {language === "en" ? "Key Outcomes:" : "النتائج الرئيسية:"}
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {course.outcomes.slice(0, 2).map((outcome, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-primary">•</span>
                          {outcome[language]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">{language === "en" ? "Instructor:" : "المدرب:"}</span> {course.instructor}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {archivedCourses.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {language === "en" ? "No archived courses found" : "لم يتم العثور على دورات مؤرشفة"}
              </h3>
              <p className="text-muted-foreground">
                {language === "en" 
                  ? "Check back later for completed courses" 
                  : "تحقق مرة أخرى لاحقاً للدورات المكتملة"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-background/60">
            {language === "en" 
              ? "© 2024 Data Academy. All rights reserved." 
              : "© 2024 أكاديمية البيانات. جميع الحقوق محفوظة."}
          </p>
        </div>
      </footer>
    </div>
  )
}