import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import WelcomeBanner from './components/common/WelcomeBanner';
import Dashboard from './pages/Dashboard';
import LinhaEditorial from './pages/LinhaEditorial';
import CentralMensagens from './pages/CentralMensagens';
import CentralEmails from './pages/CentralEmails';
import SavedAnalyses from './pages/SavedAnalyses';

function App() {
  return (
    <Router>
      <WelcomeBanner />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="linha-editorial" element={<LinhaEditorial />} />
          <Route path="central-mensagens" element={<CentralMensagens />} />
          <Route path="central-emails" element={<CentralEmails />} />
          <Route path="analises-salvas" element={<SavedAnalyses />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;