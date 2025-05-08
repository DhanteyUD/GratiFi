import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppLayout from "@/layout/AppLayout";
import Hero from "./contents/Hero";
// import Features from "./contents/Features";
import { ScrollLinkedAnimation } from "@/animations";

function LandingPage() {
  const location = useLocation();
  const [animateNav, setAnimateNav] = useState(false);
  console.log("pathName:", location.pathname);

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("navbarAnimated");

    if (location.pathname === "/" && !hasAnimated) {
      setAnimateNav(true);
      sessionStorage.setItem("navbarAnimated", "true");

      const timer = setTimeout(() => setAnimateNav(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <AppLayout canLogin={true} canSignup={true} animateNav={animateNav}>
      <Hero />
      {/* <Features /> */}

      <ScrollLinkedAnimation />
    </AppLayout>
  );
}

export default LandingPage;
