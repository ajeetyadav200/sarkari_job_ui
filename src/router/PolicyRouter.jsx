import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Contact = lazy(() => import("../pages/policy/Contact"));
const Disclaimer = lazy(() => import("../pages/policy/Disclaimer"));
const PrivacyPolicy = lazy(() => import("../pages/policy/PrivacyPolicy"));
const TermsAndConditions = lazy(() =>
  import("../pages/policy/TermsAndConditions")
);

const PolicyRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="contact" element={<Contact />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
    </Suspense>
  );
};

export default PolicyRouter;
