import { BrowserRouter, Route, Routes } from "react-router";
import './App.css'
import SignupPage from './pages/auth/signup';
import SigninPage from './pages/auth/signin';
import PredictorPage from './pages/predictor';
import { ThemeProvider } from './components/theme-provider';
import { ModeToggle } from './components/mode-toggle';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/predictor" element={<PredictorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
