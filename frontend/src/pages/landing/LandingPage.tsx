import AppLayout from "@/layout/AppLayout";
import Hero from "./contents/Hero";
import Features from "./contents/Features";

function LandingPage() {
  return (
    <AppLayout canLogin={true} canSignup={true}>
      <Hero />
      <Features />
    </AppLayout>
  );
}

export default LandingPage;
