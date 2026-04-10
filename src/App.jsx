import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { T } from "./constants/theme";

/* ── Code-split every page (separate chunks) ── */
const Home = lazy(() => import("./pages/Home"));
const MassTimes = lazy(() => import("./pages/MassTimes"));
const About = lazy(() => import("./pages/About"));
const Staff = lazy(() => import("./pages/Staff"));
const Bulletin = lazy(() => import("./pages/Bulletin"));
const BecomingCatholic = lazy(() => import("./pages/BecomingCatholic"));
const GetInvolved = lazy(() => import("./pages/GetInvolved"));
const Contact = lazy(() => import("./pages/Contact"));
const Give = lazy(() => import("./pages/Give"));
const Sacraments = lazy(() => import("./pages/Sacraments"));
const Baptism = lazy(() => import("./pages/sacraments/Baptism"));
const FirstCommunion = lazy(() => import("./pages/sacraments/FirstCommunion"));
const Confirmation = lazy(() => import("./pages/sacraments/Confirmation"));
const Marriage = lazy(() => import("./pages/sacraments/Marriage"));
const Anointing = lazy(() => import("./pages/sacraments/Anointing"));
const Funerals = lazy(() => import("./pages/sacraments/Funerals"));
const Visit = lazy(() => import("./pages/Visit"));

const PAGE_TITLES = {
  "/": "St. Dominic Catholic Parish — Youngstown, OH",
  "/mass-times": "Mass & Confession Times — St. Dominic Parish",
  "/about": "About Our Parish — St. Dominic Parish",
  "/staff": "Priests & Staff — St. Dominic Parish",
  "/bulletin": "Weekly Bulletin — St. Dominic Parish",
  "/becoming-catholic": "Becoming Catholic — St. Dominic Parish",
  "/get-involved": "Get Involved — St. Dominic Parish",
  "/contact": "Contact Us — St. Dominic Parish",
  "/give": "Online Giving — St. Dominic Parish",
  "/sacraments": "The Sacraments — St. Dominic Parish",
  "/sacraments/baptism": "Baptism — St. Dominic Parish",
  "/sacraments/first-communion": "First Holy Communion — St. Dominic Parish",
  "/sacraments/confirmation": "Confirmation — St. Dominic Parish",
  "/sacraments/marriage": "Marriage — St. Dominic Parish",
  "/sacraments/anointing": "Anointing of the Sick — St. Dominic Parish",
  "/sacraments/funerals": "Catholic Funerals — St. Dominic Parish",
  "/visit": "Plan Your Visit — St. Dominic Parish",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = PAGE_TITLES[pathname] || PAGE_TITLES["/"];
  }, [pathname]);
  return null;
}

function PageSpinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${T.stone}`, borderTopColor: T.burgundy, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">
        <Suspense fallback={<PageSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mass-times" element={<MassTimes />} />
            <Route path="/about" element={<About />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/bulletin" element={<Bulletin />} />
            <Route path="/becoming-catholic" element={<BecomingCatholic />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/give" element={<Give />} />
            <Route path="/sacraments" element={<Sacraments />} />
            <Route path="/sacraments/baptism" element={<Baptism />} />
            <Route path="/sacraments/first-communion" element={<FirstCommunion />} />
            <Route path="/sacraments/confirmation" element={<Confirmation />} />
            <Route path="/sacraments/marriage" element={<Marriage />} />
            <Route path="/sacraments/anointing" element={<Anointing />} />
            <Route path="/sacraments/funerals" element={<Funerals />} />
            <Route path="/visit" element={<Visit />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <div lang={i18n.language}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
