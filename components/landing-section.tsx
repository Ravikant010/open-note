"use client";

// import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveRight, PenTool, FileText, Users, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
// import Image from "next/image";
import { BrandingSF_Font } from "@/lib/font";
import Link from "next/link";
const sections = [
    {
      title: "Write & Organize Effortlessly",
      subtitle:
        "Capture your ideas, thoughts, and notes in a beautifully designed editor.",
      buttonText: "Start Writing",
      icon: <PenTool size={40} />,
      illustration: "/illustrations/write.svg",
      bg: "bg-gradient-to-r from-blue-50 to-white",
    },
    {
      title: "Manage Your Content Seamlessly",
      subtitle:
        "Categorize and search your notes easily with powerful filtering options.",
      buttonText: "Explore Features",
      icon: <FileText size={40} />,
      illustration: "/illustrations/manage.svg",
      bg: "bg-gradient-to-r from-orange-50 to-white",
    },
    {
      title: "Engage with Community",
      subtitle:
        "Get reactions from people, share your story, and connect with like-minded individuals to inspire and be inspired.",
      buttonText: "Join the Conversation",
      icon: <Users size={40} />,
      illustration: "/illustrations/community-engage.svg",
      bg: "bg-gradient-to-r from-teal-50 to-white",
    },
    {
      title: "Collaborate & Share",
      subtitle:
        "Engage with your team, share notes, and get feedback in real time.",
      buttonText: "Join Now",
      icon: <Users size={40} />,
      illustration: "/illustrations/community.svg",
      bg: "bg-gradient-to-r from-purple-50 to-white",
    },
    {
      title: "AI-Powered Suggestions",
      subtitle:
        "Let AI enhance your writing, suggest improvements, and spark new ideas.",
      buttonText: "Try AI Assist",
      icon: <Lightbulb size={40} />,
      illustration: "/illustrations/ai.svg",
      bg: "bg-gradient-to-r from-green-50 to-white",
    },
  ];
  
  export default function Page() {
    return (
      <div className="space-y-10 pt-10 container mx-auto px-4 2xl:px-0 ">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`py-10 sm:py-16 lg:py-20 px-6 md:px-8 lg:px-12 xl:px-16 ${section.bg} rounded-3xl mx-auto w-full max-w-[1920px] h-[500px] lg:h-[600px]`}
        >
          <div
            className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 lg:gap-16 ${
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Left Content */}
            <div className="text-center md:text-left space-y-6 flex-1 self-center flex justify-center flex-col max-w-2xl">
              <div className="text-orange-500 md:self-start self-center">{section.icon}</div>
              <h1 className={`font-bold text-3xl sm:text-4xl lg:text-5xl ${BrandingSF_Font.className}`}>
                {section.title}
              </h1>
              <p className={`text-base sm:text-lg lg:text-xl text-gray-600 font-sans font-medium`}>
                {section.subtitle}
              </p>
          
              <Button className="self-center md:self-start">
          
                {section.buttonText} <MoveRight className="ml-2" />
                
              </Button>
          
            </div>

            {/* Right Illustration */}
            {/* <div className="flex-1 mx-auto flex justify-center">
              <img
                src={section.illustration}
                alt={`${section.title} illustration`}
                className="drop-shadow-lg w-full max-w-[450px] lg:max-w-[550px] 2xl:max-w-[650px] h-auto object-contain"
              />
            </div> */}
          </div>
        </motion.div>
      ))}
    </div>
    );
  }
