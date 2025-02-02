// import { Suspense } from "react";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { getPostById } from "@/actions/noteActions";
// // import Header from "@/components/Header";
// // import Sidebar from "@/components/Sidebar";

// // Replace this with your actual database query to fetch related posts.
// async function getRelatedPosts() {
//   // Simulate a delay
//   await new Promise((resolve) => setTimeout(resolve, 500));
//   // Return mock data
//   return [
//     { id: "1", title: "10 Tips for Better Productivity", slug: "productivity-tips" },
//     { id: "2", title: "The Future of AI in 2024", slug: "ai-future-2024" },
//     { id: "3", title: "Why You Should Learn TypeScript", slug: "learn-typescript" },
//   ];
// }

// export default async function BlogPost({ params }: { params: { id: string } }) {
//   const { id } = params; // Extract the `id` from the URL
//   const postPromise = getPostById(id); // Fetch the blog post by ID
//   const relatedPostsPromise = getRelatedPosts(); // Fetch related posts
//   const [post, relatedPosts] = await Promise.all([postPromise, relatedPostsPromise]);

//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       {/* <Header /> */}

//       {/* Main Content */}
//       <main className="flex-grow container mx-auto px-4 py-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           {/* Blog Post */}
//           <article className="w-full md:w-2/3 space-y-6">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-3xl font-bold">{post.post?.title}</CardTitle>
//                 <CardDescription className="flex items-center gap-2 text-sm text-gray-500">
//                   <span>Published on {new Date(post.post?.createdAt!).toLocaleDateString()}</span>
//                   <Separator orientation="vertical" className="h-4" />
//                   {/* <span>By {post.}</span> */}
//                   <Separator orientation="vertical" className="h-4" />
//                   {/* <Badge variant="secondary">{post.post.}</Badge> */}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="prose max-w-none">
//                 <p>{post.post?.body}</p>
//               </CardContent>
//             </Card>
//           </article>

//           {/* Sidebar with Related Posts */}
//           <Suspense fallback={<div>Loading related posts...</div>}>
//             {/* <Sidebar relatedPosts={relatedPosts} /> */}
//           </Suspense>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white py-4 mt-8">
//         <div className="container mx-auto px-4 text-center">
//           &copy; 2023 My Blog. All rights reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Share2, Bookmark } from "lucide-react";
import AuthorCard from "@/components/AuthorCard";
import CommentSection from "@/components/CommentSection";
import { getPostById } from "@/actions/noteActions";
import { ContentSelect } from "@/db/schema";
import { getPostStats } from "@/actions/reactionAction";
import DOMPurify from "dompurify";
import SanitizedContent from "./_dom";
import CommentSectionWrapper from "@/components/comment-wraper";
import { notFound } from "next/navigation";
import { addComment } from "@/actions/action";


export default async function BlogPost({ params }: { params: { id: string } }) {
  if (!params.id) {
    notFound();
  }

  // In a real application, you would fetch the post data here

  const { id } = params; // Extract the `id` from the URL
  const [postResponse, statsResponse] = await Promise.all([
    getPostById(id),
    getPostStats(id),
  ]);

  // Fetch the blog post by ID
  if (!postResponse.success) {
    throw new Error(postResponse.message || "Failed to fetch post");
  }
  if (!postResponse.post) {
    throw new Error("Post not found");
  }
  const post: ContentSelect = postResponse.post;
  const stats = statsResponse;
  // const relatedPostsPromise = getRelatedPosts(); // Fetch related post/s
  // const [post, relatedPosts] = await Promise.all([postPromise, {}]);


  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 mx-auto w-full">
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 w-full  ">
        <div className="lg:w-7xl w-full mx-auto">
          {/* Main Content Section */}
          <div className="lg:col-span-2 space-y-8  w-full flex  justify-center flex-col items-center mx-auto">
            {/* Post Card */}
            <Card className="overflow-hidden shadow-none w-full rounded-none">
              {/* Title and Publish Date */}
              <div className="  flex flex-col justify-center items-center text-center p-6">
                <h1 className="text-4xl font-bold text-gray-800 line-clamp-2">
                  {post.title}
                </h1>
                <p className="text-xl text-gray-600 mt-2">
                  Published on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Post Body */}
              <CardContent className="pt-10">
                {post.body.split("\n\n").map((paragraph, index) => (
                  <SanitizedContent
                    key={index}
                    content={paragraph}
                    className=""
                  />
                ))}
              </CardContent>
            </Card>

            {/* Author Card */}
            <AuthorCard postId={post.id} />

            {/* Comment Section */}
            <CommentSectionWrapper postId={post.id} />
          </div>

          {/* Sidebar (Commented Out for Now) */}
          {/* <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Related Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <li key={relatedPost.id}>
                    <a
                      href={`/post/${relatedPost.slug}`}
                      className="text-blue-600 hover:underline block"
                    >
                      <h4 className="font-medium">{relatedPost.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Read more →
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div> */}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-black py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>
            &copy; {new Date().getFullYear()} Open Note. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Empowering the future through AI knowledge and insights.
          </p>
        </div>
      </footer>
    </div>
  );
}
