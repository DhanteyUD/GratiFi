import AppLayout from "@/layout/AppLayout";
import Hero from "./contents/Hero";
import Features from "./contents/Features";
import { ScrollLinkedAnimation } from "@/animations";

function LandingPage() {
  return (
    <AppLayout canLogin={true} canSignup={true}>
      <Hero />
      <Features />

      <ScrollLinkedAnimation />
    </AppLayout>
  );
}

export default LandingPage;
