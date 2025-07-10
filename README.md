
# Digital Resume Builder

A modern, professional resume builder web application that allows users to create, preview, and export their resumes as PDF documents. Built with React, TypeScript, and Tailwind CSS.

![Resume Builder Preview](https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

- **Real-time Preview**: See your resume update instantly as you type
- **Professional Templates**: Clean, modern resume layout suitable for any industry
- **PDF Export**: Download your resume as a high-quality PDF document
- **Form Validation**: Comprehensive validation with helpful error messages
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dynamic Sections**: Add/remove multiple education and work experience entries
- **Skills Management**: Tag-based skill input with easy add/remove functionality
- **Data Persistence**: Form data is preserved during your session

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd digital-resume-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Vite** - Fast build tool and development server
- **jsPDF** - Client-side PDF generation
- **html2canvas** - HTML to canvas conversion for PDF export
- **Lucide React** - Beautiful, customizable icons

## 📋 Usage

### Creating Your Resume

1. **Personal Information**: Fill in your basic contact details and professional summary
2. **Education**: Add your educational background with degrees, schools, and dates
3. **Work Experience**: Include your work history with positions, companies, and key responsibilities
4. **Skills**: Add relevant technical and professional skills

### Exporting Your Resume

1. Complete all required fields (marked with validation)
2. Review your resume in the live preview panel
3. Click the "Export PDF" button to download your resume
4. Your resume will be saved as a PDF file with your name

### Form Validation

The application includes comprehensive validation:
- Required fields are clearly marked
- Email format validation
- Date range validation (end dates must be after start dates)
- Real-time error messages and visual indicators

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with thoughtful spacing and typography
- **Color Scheme**: Professional blue and gray palette with accent colors
- **Responsive Layout**: Adapts seamlessly to different screen sizes
- **Interactive Elements**: Smooth hover effects and transitions
- **Accessibility**: Proper form labels, keyboard navigation, and screen reader support

## 📱 Responsive Design

- **Desktop**: Two-column layout with form and preview side-by-side
- **Tablet**: Optimized layout with collapsible sections
- **Mobile**: Single-column layout with toggle between form and preview

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

### Project Structure

```
src/
├── components/          # React components
│   ├── PersonalInfoForm.tsx
│   ├── EducationForm.tsx
│   ├── ExperienceForm.tsx
│   ├── SkillsForm.tsx
│   └── ResumePreview.tsx
├── types/              # TypeScript type definitions
│   └── resume.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   └── pdfExport.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

### Key Components

- **PersonalInfoForm**: Handles basic contact information and professional summary
- **EducationForm**: Manages educational background with add/remove functionality
- **ExperienceForm**: Handles work experience with dynamic responsibility lists
- **SkillsForm**: Tag-based skill management system
- **ResumePreview**: Real-time preview of the formatted resume

## 🎯 Features in Detail

### Form Management
- Dynamic form sections with add/remove capabilities
- Real-time validation with user-friendly error messages
- Persistent form state during session

### PDF Generation
- High-quality PDF export using jsPDF
- Maintains professional formatting and layout
- Automatic filename generation based on user's name
- Proper text wrapping and page breaks

### Validation System
- Required field validation
- Email format validation
- Date range validation
- Visual error indicators with helpful messages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- PDF generation powered by [jsPDF](https://github.com/parallax/jsPDF)
- Built with [Vite](https://vitejs.dev/) and [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.

---

**Made with ❤️ for job seekers everywhere**
