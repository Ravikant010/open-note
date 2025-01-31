"use client"
import { Button } from "@/components/ui/button"
import { BrandingSF_Font, Pacifico_Regular } from "@/lib/font";


import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react";


const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseDuration = 1500;

    const typeText = () => {
      const currentWord = words[currentWordIndex].text;
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timer = setTimeout(typeText, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <div className={cn("flex flex-wrap justify-center gap-1 text-4xl font-bold md:text-5xl lg:text-6xl ", className)}>
      {currentText}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className={cn("ml-1 h-12 w-[4px] bg-primary", cursorClassName)}
      />
    </div>
  );
};

const words = [
  { text: "Note,", className: "text-primary" },
  { text: "Article,", className: "text-primary" },
  { text: "Blog", className: "text-primary" },
];

export default function OnboardingPage() {
  return (
    <div className ={`${BrandingSF_Font.className}`}>
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br flex flex-col justify-start items-start
      "
      
      // from-blue-200 via-pink-100 to-purple-200 opacity-70
  />

      <main className="relative z-10 px-6 pt-10 md:pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
      
            <h1 className="text-5xl font-bold mb-4 leading-relaxed ">
              Create Your First
              <div className = {`${Pacifico_Regular.className} text-orange-500`}>
              <TypewriterEffect
                words={words}
                className="text-primary ml-2 text-orange-500"
                cursorClassName="bg-primary"
              />
               </div>
              and publish
            </h1>
             
          </motion.div>
        
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start writing with our <span className="font-semibold text-primary">AI-powered editor</span> and share your
            thoughts with the world.
          </motion.p>
          <Button
              size="lg"
              className="rounded-full px-12 py-6 text-lg font-medium bg-primary hover:bg-primary/90 mb-8"
            //   whileHover={{ scale: 1.05 }}
            //   whileTap={{ scale: 0.95 }}
            >
              Create Now
            </Button>
          <motion.div
            className="mb-8 text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Whether it's a personal blog, a professional article, or a creative story, our editor helps you write
            efficiently with smart suggestions, grammar checks, and formatting options.
          </motion.div>

          <motion.p
            className="mb-12 text-sm text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Inspire, educate, and engage your audience with high-quality content.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
          
          </motion.div>
        </div>
      </main>
    </div>
    </div>
  );
}