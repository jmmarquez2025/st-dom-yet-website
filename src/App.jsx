import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MassTimes from "./pages/MassTimes";
import About from "./pages/About";
import Staff from "./pages/Staff";
import Bulletin from "./pages/Bulletin";
import BecomingCatholic from "./pages/BecomingCatholic";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Give from "./pages/Give";
import Sacraments from "./pages/Sacraments";
import Baptism from "./pages/sacraments/Baptism";
import FirstCommunion from "./pages/sacraments/FirstCommunion";
import Confirmation from "./pages/sacraments/Confirmation";
import Marriage from "./pages/sacraments/Marriage";
import Anointing from "./pages/sacraments/Anointing";
import Funerals from "./pages/sacraments/Funerals";

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
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = PAGE_TITLES[pathname] || PAGE_TITLES["/"];
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Nav />
      <main id="main-content">
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
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <div lang={i18n.language}>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
