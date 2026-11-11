import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Settings } from '@/pages/Settings';
import { CalculatorPage, CalculatorsPage } from '@/pages/calculators';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/calculators/:id" element={<CalculatorPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
