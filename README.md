# Literary Club React Website Setup Instructions

## 📁 Project Structure

```
literary-club-react/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Members.jsx
│   │   ├── Gallery.jsx
│   │   ├── JoinForm.jsx
│   │   └── ThankYouModal.jsx
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
├── Code.gs (Google Apps Script)
└── README.md
```

## 🚀 Quick Start

### Step 1: Create React App

```bash
npx create-react-app literary-club-website
cd literary-club-website
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Add Font Awesome

Add this line to `public/index.html` in the `<head>` section:

```html
<link
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
  rel="stylesheet"
/>
```

### Step 4: Replace Files

Replace the default files with the provided components:

- Replace `src/App.js` with `App.jsx`
- Replace `src/App.css` with the provided `App.css`
- Create `src/components/` folder and add all component files
- Update `package.json` with the provided configuration

### Step 5: Create index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Step 6: Update public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Literary Club - Join Us Today</title>
    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 🔗 Google Sheets Integration Setup

### Step 1: Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Click "New Project"
3. Replace default code with the provided `Code.gs` content
4. Rename project to "Literary Club Form Handler"
5. Save the project (Ctrl+S)

### Step 2: Deploy as Web App

1. Click "Deploy" > "New Deployment"
2. Choose "Web app" as the type
3. Settings:
   - Description: "Literary Club Form Handler"
   - Execute as: "Me"
   - Who has access: "Anyone"
4. Click "Deploy"
5. **Copy the Web App URL**

### Step 3: Update React Component

1. Open `src/components/JoinForm.jsx`
2. Find: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';`
3. Replace `YOUR_SCRIPT_ID` with your actual Web App URL
4. Save the file

### Step 4: Test Integration

1. Run `npm start`
2. Fill out the form and submit
3. Check if Google Sheet "Literary Club Applications" is created
4. Verify form data appears in the sheet

## ✨ React Component Features

### 🧩 Component Architecture

- **Header**: Navigation with smooth scrolling and active section highlighting
- **Home**: Hero section with floating animations and quotes
- **About**: Club information, activities, and rules display
- **Members**: Team member showcase with hover effects
- **Gallery**: Event photos with placeholder system
- **JoinForm**: Registration form with validation and Google Sheets integration
- **ThankYouModal**: Success modal with interview details

### 🎯 React-Specific Features

- **State Management**: Uses React hooks (useState, useEffect)
- **Form Validation**: Real-time validation with error handling
- **Component Reusability**: Modular, reusable components
- **Event Handling**: Proper React event handling
- **Conditional Rendering**: Dynamic content based on state
- **Props**: Data passing between components
- **Lifecycle Methods**: useEffect for scroll listeners and cleanup

### 🎨 Interactive Features

- Smooth scrolling navigation
- Active section highlighting
- Form validation with immediate feedback
- Loading states during form submission
- Modal with backdrop click to close
- Keyboard navigation support (Esc to close modal)
- Hover animations and transitions

## 🛠️ Customization Guide

### Adding Real Images

Replace placeholder icons in Gallery component:

```jsx
// Instead of:
<i className="fas fa-image"></i>

// Use:
<img src="/images/event1.jpg" alt="Event Description" />
```

### Updating Member Information

Edit the `members` array in `src/components/Members.jsx`:

```jsx
const members = [
  {
    name: "Your Name",
    description: "Your role description",
  },
  // Add more members...
];
```

### Customizing Colors

Update CSS variables in `App.css`:

```css
:root {
  --primary-green: #27ae60;
  --secondary-green: #2ecc71;
  --background-light: #f8f9fa;
  --text-dark: #2c3e50;
}
```

### Adding New Quotes

Update the `quotes` array in `src/components/Home.jsx`:

```jsx
const quotes = [
  {
    text: "Your quote here",
    author: "Author Name",
    className: "quote1",
  },
  // Add more quotes...
];
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 768px (tablet), 480px (mobile)
- Flexible grid layouts
- Touch-friendly buttons and navigation
- Optimized typography scaling

## 🧪 Testing

### Development Testing

```bash
npm start
# Test all components and interactions
```

### Build Testing

```bash
npm run build
npm install -g serve
serve -s build
# Test production build
```

### Form Testing

1. Fill out form with valid data
2. Try submitting with missing fields
3. Test checkbox validation
4. Verify Google Sheets integration
5. Check modal functionality

## 🚀 Deployment Options

### Netlify

1. Build the project: `npm run build`
2. Drag `build` folder to Netlify
3. Configure custom domain if needed

### Vercel

1. Connect GitHub repository
2. Deploy automatically on push
3. Custom domain configuration

### GitHub Pages

```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "homepage": "https://yourusername.github.io/literary-club-website",
# "predeploy": "npm run build",
# "deploy": "gh-pages -d build"
npm run deploy
```

## 🔧 Advanced Features (Optional)

### Email Notifications

Enhance Google Apps Script to send confirmation emails:

```javascript
// Uncomment email functionality in Code.gs
GmailApp.sendEmail(email, subject, body);
```

### Admin Dashboard

Create an admin component to view applications:

```jsx
// New component: AdminDashboard.jsx
// Fetch data from Google Sheets API
```

### Form Analytics

Add Google Analytics or track form submissions:

```jsx
// Add tracking to form submit handler
gtag("event", "form_submit", { event_category: "engagement" });
```

## 🐛 Troubleshooting

### Common Issues

**Components not rendering:**

- Check import/export statements
- Verify file paths are correct
- Check console for error messages

**Styling issues:**

- Ensure CSS file is imported in App.jsx
- Check for CSS syntax errors
- Verify class names match between JSX and CSS

**Form not submitting:**

- Verify Google Apps Script URL is correct
- Check CORS settings in Google Apps Script
- Look for JavaScript console errors

**Build fails:**

- Check for unused imports
- Verify all dependencies are installed
- Look for syntax errors in JSX

### Debug Commands

```bash
# Check for issues
npm run test

# Build with detailed output
npm run build --verbose

# Check dependencies
npm audit
```

## 🏆 Performance Optimization

### Code Splitting

```jsx
// Lazy load components
const LazyComponent = React.lazy(() => import("./components/Gallery"));
```

### Image Optimization

```jsx
// Use WebP format for images
<img src="image.webp" alt="Description" />
```

### Bundle Analysis

```bash
npm install --save-dev webpack-bundle-analyzer
# Add script: "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
npm run analyze
```

## 📞 Support

### Getting Help

1. Check React documentation: [reactjs.org](https://reactjs.org)
2. Google Apps Script docs: [developers.google.com](https://developers.google.com/apps-script)
3. Stack Overflow for specific issues
4. GitHub Issues for bug reports

### Contact Information

- Email: literaryclub@yourschool.edu
- GitHub: github.com/yourusername/literary-club-website

---

**🎉 Your React-based Literary Club website is ready to launch!**

The React version offers better performance, maintainability, and modern development practices compared to vanilla HTML/JS.
