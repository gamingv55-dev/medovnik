import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { Settings } from '@/pages/Settings';
import { BatchDetailPage } from '@/pages/BatchDetail';
import { BatchNewPage } from '@/pages/BatchNew';
import { BatchesPage } from '@/pages/Batches';
import { GuidePage } from '@/pages/Guide';
import { KitsPage } from '@/pages/Kits';
import { LessonPage } from '@/pages/Lesson';
import { HelperPage, ProblemPage, ProblemsPage } from '@/pages/Problems';
import { RecipeDetailPage } from '@/pages/RecipeDetail';
import { RecipesPage } from '@/pages/Recipes';
import { CalculatorPage, CalculatorsPage } from '@/pages/calculators';

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/calculators/:id" element={<CalculatorPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/guide/lesson/:id" element={<LessonPage />} />
          <Route path="/guide/problems" element={<ProblemsPage />} />
          <Route path="/guide/problems/:id" element={<ProblemPage />} />
          <Route path="/guide/helper" element={<HelperPage />} />
          <Route path="/batches" element={<BatchesPage />} />
          <Route path="/batches/new" element={<BatchNewPage />} />
          <Route path="/batches/:id" element={<BatchDetailPage />} />
          <Route path="/kits" element={<KitsPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
