import React from 'react';
import { CinematicOpening } from '../components/home/CinematicOpening';
import { Hero } from '../components/home/Hero';
import { HowItWorks } from '../components/home/HowItWorks';
import { FeaturedGifts } from '../components/home/FeaturedGifts';
import { OccasionSection } from '../components/home/OccasionSection';
import { CraftsmanshipStory } from '../components/home/CraftsmanshipStory';

export const Home: React.FC = () => {
  return (
    <>
      {/* Cinematic Gift Opening Experience */}
      <CinematicOpening />

      {/* Main Luxury Experience */}
      <main>
        {/* Editorial Hero */}
        <Hero />

        {/* 3-Step Storytelling Section */}
        <HowItWorks />

        {/* Product Spotlight & Thumbnail Rail */}
        <FeaturedGifts />

        {/* Expandable Occasion Panels */}
        <OccasionSection />

        {/* Craftsmanship Pillars & Verified Platform Stats */}
        <CraftsmanshipStory />
      </main>
    </>
  );
};

export default Home;
