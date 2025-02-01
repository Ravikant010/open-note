// import { Avatar, AvatarFallback } from "@/components/ui/avatar"
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"

// const dummyComments = [
//   { id: 1, author: "Alice Johnson", content: "Great article! I learned a lot.", avatar: "AJ" },
//   { id: 2, author: "Bob Smith", content: "I have a question about the third point. Can you elaborate?", avatar: "BS" },
//   { id: 3, author: "Carol White", content: "This is exactly what I needed. Thanks for sharing!", avatar: "CW" },
// ]

// export function CommentSection() {
//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">Comments</h2>
//       {dummyComments.map((comment) => (
//         <Card key={comment.id}>
//           <CardHeader>
//             <div className="flex items-center space-x-4">
//               <Avatar>
//                 <AvatarFallback>{comment.avatar}</AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="text-sm font-medium">{comment.author}</p>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <p className="text-sm">{comment.content}</p>
//           </CardContent>
//         </Card>
//       ))}
//       <Card>
//         <CardHeader>
//           <h3 className="text-lg font-semibold">Leave a comment</h3>
//         </CardHeader>
//         <CardContent>
//           <Textarea placeholder="Type your comment here." />
//         </CardContent>
//         <CardFooter>
//           <Button>Post Comment</Button>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }
"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CommentSectionProps = {
    postId: string; // The ID of the post
    comments: {
        id: string;
        author: string | null;
        createdAt:string;
        content: string;
    }[]; // Comments passed as props
};

export default function CommentSection({ postId, comments }: CommentSectionProps) {
    return (
        <div className="space-y-4 w-full">
            <h2 className="text-2xl font-bold">Comments</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Card key={comment.id} className="shadow-none">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                {/* <Avatar>
                                    <AvatarFallback>{comment.avatar}</AvatarFallback>
                                </Avatar> */}
                                <div>
                                    <p className="text-sm font-medium">{comment.author}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{comment.content}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            )}
            <Card className="shadow-none">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Leave a comment</h3>
                </CardHeader>
                <CardContent>
                    <Textarea placeholder="Type your comment here." />
                </CardContent>
                <CardFooter>
                    <Button>Post Comment</Button>
                </CardFooter>
            </Card>
        </div>
    );
}