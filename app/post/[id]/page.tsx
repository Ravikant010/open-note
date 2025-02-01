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
import  AuthorCard from "@/components/AuthorCard";
import { CommentSection } from "@/components/CommentSection";
import { getPostById } from "@/actions/noteActions";
import { ContentSelect } from "@/db/schema";
import { getPostStats } from "@/actions/reactionAction";
import DOMPurify from "dompurify";
import SanitizedContent from "./_dom";

export default async function BlogPost({ params }: { params: { id: string } }) {
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-r from-blue-400 to-purple-500" />
              <CardHeader className="-mt-16 relative z-10">
                <div className="bg-white p-6 rounded-t-xl shadow-lg">
                  <Badge variant="outline" className="mb-2">
                    {post.category || "Category"}
                  </Badge>
                  <CardTitle className="text-3xl font-bold mb-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      Published on{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>{stats.likes} likes</span>
                    <Separator orientation="vertical" className="h-4" />
                    <span>{stats.comments} comments</span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {post.body.split("\n\n").map((paragraph, index) => (
                //   <p
                //     key={index}
                //     className="mb-4"
                //     dangerouslySetInnerHTML={{
                //       __html: DOMPurify.sanitize(paragraph),
                //     }}
                //   />
                <SanitizedContent key={index} content={paragraph} />
                ))}
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-6">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Comment
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <AuthorCard postId={post.id} />

            <CommentSection />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Related Posts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {/* {relatedPosts.map((relatedPost) => (
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
                  ))} */}
                </ul>
              </CardContent>
            </Card>

            {/* You can add more sidebar components here, like a newsletter signup or popular tags */}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 AI Insights Blog. All rights reserved.</p>
          <p className="mt-2 text-sm text-gray-400">
            Empowering the future through AI knowledge and insights.
          </p>
        </div>
      </footer>
    </div>
  );
}
