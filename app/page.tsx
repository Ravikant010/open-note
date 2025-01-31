"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandingSF_Font, Pacifico_Regular } from "@/lib/font";
import NavBar from "@/components/nav-bar";
import Section from "@/components/landing-section";
import Page from "@/components/landing-section";
import Footer from "@/components/footer";

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust threshold as needed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ width: "100%", borderRadius: "0px" }}
      animate={{
        width: isScrolled ? "90%" : "100%",
        borderRadius: isScrolled ? "1.5rem" : "0px",
      }}
      transition={{ duration: 0.1, ease: "backInOut" }}
      className={`bg-white min-h-[80vh] flex items-center justify-center ${BrandingSF_Font.className} mx-auto`}
    >
      <div className="flex flex-col items-center justify-center text-center px-4 space-y-8 leading-loose text-[1.9rem]">
        <h1 className="font-bold leading-tight">
          Craft{" "}
          <span className={`${Pacifico_Regular.className} text-orange-500`}>
            Stories, Blogs and Notes
          </span>
          <br />
          <span className="text-blue-0">and, Grow with Your Audience</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Turn feedback into features your users will love. Collect ideas, plan
          updates, and keep everyone in the loop—all in one simple tool.
        </p>
        <Button className="mt-4">
          Get Started <MoveRight className="ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}


export default function Home() {
  return (
      <main>
      {/* <NavBar />
      <Hero />
      <Page />
      <Footer/> */}
      <OnBoardingPage/>
      {/* <DashboardPage /> */}
    </main>
  );
}



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import OnBoardingPage, { OnBoarding } from "@/components/on-baording";


export  function DashboardPage() {
  return (
    <div className="min-h-screen bg-muted/40 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Overview</h1>
        <div className="flex gap-4 mb-6">
          <Button variant="ghost">Tasks</Button>
          <Button variant="ghost">Threads</Button>
          <Button variant="ghost">Resources</Button>
        </div>
      </div>

      {/* Management Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Manage</h2>
        <div className="grid grid-cols-4 gap-4">
          <Button className="h-24 flex flex-col items-center justify-center gap-2">
            <PlusIcon className="h-6 w-6" />
            <span>Create a Page</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center gap-2">
            <PlusIcon className="h-6 w-6" />
            <span>Create a Task</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center gap-2">
            <PlusIcon className="h-6 w-6" />
            <span>Create a Thread</span>
          </Button>
          <Button className="h-24 flex flex-col items-center justify-center gap-2">
            <PlusIcon className="h-6 w-6" />
            <span>Create a Client</span>
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create your first Client to start</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                + Generate example
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create your first Case to start</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                + Generate example
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Building your Clients knowledge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                + Generate example
              </Button>
              <Button variant="outline" className="w-full">
                + Generate example
              </Button>
              <Button variant="outline" className="w-full">
                + Generate example
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pinned Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                + Pin an item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Latest activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-sm">
                No recent activity
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}