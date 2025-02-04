"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MoveRight, PlusIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandingSF_Font, Pacifico_Regular } from "@/lib/font";
import NavBar from "@/components/nav-bar";
import Section from "@/components/landing-section";
import Page from "@/components/landing-section";
import Footer from "@/components/footer";

 function Hero() {
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
      <div className="flex flex-col items-center justify-center text-center px-4 space-y-8 leading-loose text-[1.5rem] md:text-[2.5rem] lg:text-[3rem]">
        <h1 className="font-bold leading-tight">
          Craft{" "}
          <span className={`${Pacifico_Regular.className} text-orange-500`}>
            Stories, Blogs and Notes
          </span>
          <br />
          <span className="text-blue-0">and, Grow with Your Audience</span>
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          Turn feedback into features your users will love. Collect ideas, plan
          updates, and keep everyone in the loop—all in one simple tool.
        </p>
        <Link href="/login">
          <Button className="mt-4">
            Get Started <MoveRight className="ml-2" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [userPosts, setUserPosts] = useState<ContentSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const initialize = async () => {
      try {
        // Check if the user is logged in
        const loggedIn = await isLoggedIn();
        setIsUserLoggedIn(loggedIn);

        if (loggedIn) {
          // Fetch user posts if logged in
          const { success, data } = await getUserPosts();
          if (success) {
            if (data) {
              setUserPosts([...data]);
            }
          }
        }
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated regardless of success or failure
      }
    };

    initialize();
  }, []); // Empty dependency array ensures this runs only once on mount

  // If still loading, show a loading indicator
  if (loading) {
    return <p>Loading...</p>;
  }

  // If the user is not logged in, show the public view
  if (!isUserLoggedIn) {
    return (
      <main className="bg-white">
        <NavBar />
        <Hero />
        <Page />
        <Footer />
      </main>
    );
  }
  if (isUserLoggedIn && !userPosts.length)
    return (
      <main className="bg-white">
        <OnBoardingPage />
      </main>
    );
  // If logged in and posts are fetched, display them in a grid
  return (
    <SidebarProvider >
 
    {/* Sidebar */}
    <Sidebar />
 

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
  
        <div className="container mx-auto py-6 px-4">
        <SidebarTrigger className="bg-transparent" />
          <PostsPage />
        </div>
      </div>

  </SidebarProvider>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import OnBoardingPage, { OnBoarding } from "@/components/on-baording";
import React from "react";
import PostCard from "@/components/Card";
import { getUserPosts } from "@/actions/action";
import { ContentSelect } from "@/db/schema";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { isLoggedIn } from "@/lib/session";
import OnBoardingPage, { OnBoarding } from "@/components/on-baording";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Sidebar } from "@/components/Nav-sidebar";

 function PostsPage() {
  const [posts, setPosts] = useState<ContentSelect[] | []>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { success, data } = await getUserPosts();
        console.log(data);
        if (success && data) {
          setPosts(data);
        } else {
          setError("Failed to load posts.");
        }
      } catch (err) {
        setError("Failed to fetch posts. Please try again later.");
      }
    };

    fetchPosts();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!posts.length) {
    return <p className="text-center text-gray-500">Loading posts...</p>;
  }

  // const filteredPosts = posts.filter((post) => {
  //   const matchesSearch =
  //     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     post.description.toLowerCase().includes(searchQuery.toLowerCase())
  //   const matchesCategory = !selectedCategory || post.category === selectedCategory
  //   return matchesSearch && matchesCategory
  // })

  const categories = {
    TECHNOLOGY: "Technology",
    AI: "Artificial Intelligence",
    BUSINESS: "Business",
    HEALTH: "Health & Wellness",
    EDUCATION: "Education",
    LIFESTYLE: "Lifestyle",
    TRAVEL: "Travel",
    FOOD: "Food & Cooking",
    SPORTS: "Sports",
    OTHER: "Other",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-3xl font-bold mb-8"></h1> */}

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {selectedCategory || "All Categories"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              All Categories
            </DropdownMenuItem>
            {Object.keys(categories).map((category: string) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            preview={post.body}
          />
        ))}
      </div>
    </div>
  );
}
 function DashboardPage() {
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
  );
}
