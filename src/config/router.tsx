// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OfferInputPage from "../pages/OfferInputPage";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import { InterviewPage } from "../pages/InterviewPage";
import NotFound from "../pages/NotFound";
import AboutPage from "../pages/AboutPage";

const AppRouter = ({ children }: { children: React.ReactElement }) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer-input" element={<OfferInputPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
