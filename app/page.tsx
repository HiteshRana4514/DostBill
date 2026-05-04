"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/landingPage/Hero";
import Stats from "@/components/landingPage/Stats";
import Features from "@/components/landingPage/Features";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Comparison from "@/components/landingPage/Comparison";
import Pricing from "@/components/landingPage/Pricing";
import FeaturedBlogs from "@/components/landingPage/FeaturedBlogs";
import DownloadApp from "@/components/DownloadApp";
import CTABanner from "@/components/CTABanner";
import Footer from "@/components/Footer";

import ForceLight from "@/components/shared/ForceLight";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-jakarta selection:bg-brand-primary selection:text-white">
      <ForceLight />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Comparison />
        <Pricing />
        <FeaturedBlogs />
        <DownloadApp />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}