import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { landingPageMenuItems } from "@/routes/path";
import OnboardingLayout from "@/layout/OnboardingLayout";
import Hero from "./contents/01_Hero";
// import HowItWorks from "./contents/02_HowItWorks";
// import Features from "./contents/03_Features";
// import Community from "./contents/04_Community";
// import FAQs from "./contents/05_FAQs";

function LandingPage() {
  const location = useLocation();
  const [animateNav, setAnimateNav] = useState(false);

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
    <OnboardingLayout
      menu={landingPageMenuItems}
      canLogin={true}
      canSignup={true}
      animateNav={animateNav}
    >
      <Hero />
      {/* <HowItWorks id="how-it-works" />
      <Features id="features" />
      <Community id="community" />
      <FAQs id="faqs" /> */}
    </OnboardingLayout>
  );
}

export default LandingPage;
