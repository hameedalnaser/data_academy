import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Data Academy - Modern Data Specializations',
  description: 'Professional training, mentoring and consultancy in data science, data analysis, data engineering, cloud engineering, and DevOps engineering for Iraqi and Middle Eastern professionals.',
  keywords: 'data science, data analysis, data engineering, cloud engineering, devops, iraq, middle east, training, mentoring',
  authors: [{ name: 'Data Academy' }],
  openGraph: {
    title: 'Data Academy - Modern Data Specializations',
    description: 'Professional training, mentoring and consultancy in data science, data analysis, data engineering, cloud engineering, and DevOps engineering for Iraqi and Middle Eastern professionals.',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/pics/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  )
}