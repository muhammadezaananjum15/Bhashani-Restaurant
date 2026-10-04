'use client';

import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSpecialties } from '@/components/FeaturedSpecialties';
import { HotDealsSection } from '@/components/HotDealsSection';
import { FlyersSection } from '@/components/FlyersSection';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSpecialties />
      <HotDealsSection />
      <FlyersSection />
      <ContactSection />
    </>
  );
}
