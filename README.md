# Data Academy Website

A modern, bilingual (Arabic/English) website for Data Academy - delivering professional training, mentoring, and consultancy in data science and related fields for Iraqi and Middle Eastern professionals.

## Features

- 🌐 **Bilingual Support**: Complete Arabic and English translations
- 📱 **Responsive Design**: Works perfectly on all devices
- 📊 **Dynamic Content**: All content loaded from JSON files for easy updates
- 🚀 **GitHub Pages Ready**: Automated deployment with GitHub Actions
- ⚡ **Fast Loading**: Optimized Next.js static site
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS and shadcn/ui components

## Content Management

All website content can be updated by modifying JSON files in the `/public/data/` directory:

### 📚 Courses (`/public/data/courses.json`)
Add, edit, or remove courses. Each course includes:
- Multilingual title and description
- Price, duration, and difficulty level
- Registration links
- Active/inactive status

### 👥 Team Members (`/public/data/team.json`)
Update team member information:
- Names and titles (English/Arabic)
- Bios and LinkedIn profiles
- Profile images

### 🌍 Translations (`/public/data/translations.json`)
All UI text in both languages:
- Navigation, buttons, and labels
- Section titles and descriptions
- Messages and notifications

### ⚙️ Configuration (`/public/data/config.json`)
General settings:
- Academy contact information
- Statistics (participants, hours, etc.)
- Social media links
- Default registration links

## Quick Updates

To update the website:

1. **Add a New Course**: Edit `/public/data/courses.json`
2. **Update Statistics**: Modify `/public/data/config.json`
3. **Change Text**: Update `/public/data/translations.json`
4. **Add Team Member**: Edit `/public/data/team.json`

After making changes, commit to the `main` branch and GitHub Actions will automatically deploy the updates.

## Development

### Prerequisites
- Node.js 18+
- npm

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
├── app/                    # Next.js app directory
├── components/ui/          # UI components
├── public/
│   ├── data/              # JSON data files
│   └── pics/              # Images and assets
├── .github/workflows/     # GitHub Actions
└── ...
```

## Deployment

The website automatically deploys to GitHub Pages when changes are pushed to the `main` branch. The deployment process:

1. Builds the static site using Next.js
2. Optimizes all assets
3. Deploys to GitHub Pages

## Technology Stack

- **Framework**: Next.js 14 (Static Site Generation)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## License

© 2024 Data Academy. All rights reserved.