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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9E6CFJYP9Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9E6CFJYP9Z');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1062595179373880');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1062595179373880&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  )
}