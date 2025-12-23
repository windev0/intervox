// src/router/AppRouter.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OfferInputPage from "../pages/OfferInputPage";
import FeedbackPage from "../pages/FeedbackPage";
import HomePage from "../pages/HomePage";
import { InterviewPage } from "../pages/InterviewPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer-input" element={<OfferInputPage />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
