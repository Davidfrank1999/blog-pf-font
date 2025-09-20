"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import RightImg from "../assets/statueface.jpeg";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-between px-12 py-20 bg-chart-3 text-white overflow-hidden"> {/* @TODO: change color */}
      {/* Left content */}
      <div className="max-w-xl z-10">
        <h1 className="text-4xl font-bold leading-tight">
          Not a travel guide, but a travel inspiration
          <br /> for your next trip
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Discover off-the-radar places, choose the hottest & plan your next adventure.
        </p>

        {/* Search bar */}
        <div className="mt-6 flex bg-white rounded-xl p-2 w-full max-w-lg">
          <Input
            placeholder="Search places, cities or objects around the world"
            className="flex-1 border-none text-black focus-visible:ring-0"
          />
          <Button>Search</Button>
        </div>

        {/* Trending tags */}
        <div className="mt-4 flex gap-2 flex-wrap">
          
        
          {["Mountains", "Lake", "Waterfall", "Desert"].map((tag) => (
            
            <Badge variant="customTags" key={tag}>
            {tag}
            </Badge>
              
          ))}
        </div>
      </div>

      {/* Right image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2">
        <div
          className="h-full w-full bg-cover bg-center rounded-bl-[100px] overflow-hidden"
          style={{
            backgroundImage: `url(${RightImg})`,
          }}
        />
      </div>
    </section>
  );
}
