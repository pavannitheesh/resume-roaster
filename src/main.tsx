import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "@/components/ui/theme-provider.tsx"
import './index.css'
import App from './App.tsx'
import RoastPage from './RoastPage.tsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ModeToggle } from './mode-toggle';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
     
    <ModeToggle/>
    
   <Router>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/roast" element={<RoastPage />} />
  </Routes>
</Router>
</ThemeProvider>
  </StrictMode>,
)
