import { HeroSection } from "@/components/home/HeroSection";
import { BuildingExplorer } from "@/components/home/BuildingExplorer";
import { HorizontalStory } from "@/components/home/HorizontalStory";
import { BrandWall } from "@/components/home/BrandWall";
import { FeaturedSpaces } from "@/components/home/FeaturedSpaces";
import { ExperienceStory } from "@/components/home/ExperienceStory";
import { LodgingImmersive } from "@/components/home/LodgingImmersive";
import { RooftopImmersive } from "@/components/home/RooftopImmersive";
import { StatsImmersive } from "@/components/home/StatsImmersive";
import { DirectoryAccordion } from "@/components/home/DirectoryAccordion";
import { TestimonialsImmersive } from "@/components/home/TestimonialsImmersive";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-paper-white selection:bg-copper-orange selection:text-paper-white">
      <HeroSection />
      <BuildingExplorer />
      <HorizontalStory />
      <BrandWall />
      <FeaturedSpaces />
      <ExperienceStory />
      <LodgingImmersive />
      <RooftopImmersive />
      <StatsImmersive />
      <DirectoryAccordion />
      <TestimonialsImmersive />
      <FinalCTA />
    </div>
  );
}
