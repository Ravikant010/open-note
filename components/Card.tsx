import { Heart, MessageCircle, Share2 } from "lucide-react"; 
import React, { useEffect, useState } from "react";
import { CardContent, Card } from "./ui/card";
import Link from "next/link";
import DOMPurify from 'dompurify';
import { likeContent } from "@/actions/reactionAction";
type PostCardProps = {
  id: string;
  title: string;
  preview: string;
}
export default function PostCard({
  id,
  title,
  preview,
}: PostCardProps) {
  const sanitizeHTML = (dirty: string) => ({
    __html: DOMPurify.sanitize(dirty)
});
  return (
    <div>
      
        <Card key={id} className="min-w-[250px] shadow-none hover:shadow-md transition-shadow duration-300 h-48 line-clamp-2">
        <Link href={`/post/${id}`}>
        
         {/* {imageUrl && (
            <div
              className="aspect-video w-full bg-muted"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )} */}
          <CardContent className="p-4 h-28">
            <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
            <p  
    className="text-sm text-muted-foreground line-clamp-3"
    dangerouslySetInnerHTML={sanitizeHTML(preview)}
/>
          </CardContent>
      
          </Link>
          <PostFooter
            postId={id}
          />
        </Card>
 
    </div>
  );
}
type PostFooterProps = {
  userId?: string;
  postId: string;
};
import { Button } from '@/components/ui/button'; 
import { addComment, shareContent, getPostStats } from '@/actions/reactionAction'; 
const PostFooter: React.FC<PostFooterProps> = ({ postId }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const [shares, setShares] = useState(0);
    useEffect(() => {
        const fetchPostStats = async () => {
            const result = await getPostStats(postId);
            if (result.success) {
                setLikes(result.likes || 0);
                setComments(result.comments || 0);
                setShares(result.shares || 0);
            } else {
                console.error(result.message || "Failed to fetch post stats.");
            }
        };
        fetchPostStats();
    }, [postId]);
    /**
     * Handle Like Action
     */
    const handleLike = async () => {
            const result = await likeContent({ contentId: postId });
            if (result.success) {
                setLikes(likes + 1); 
            } else {
                alert(result.message || "Failed to like the post.");
            }
        };
    /**
     * Handle Comment Action
     */
    const handleComment = async () => {
        const commentBody = prompt("Enter your comment:");
        if (!commentBody) return;
        const result = await addComment({ contentId: postId, commentBody });
        if (result.success) {
            setComments(comments + 1); 
        } else {
            alert(result.message || "Failed to add a comment.");
        }
    };
    /**
     * Handle Share Action
     */
    const handleShare = async () => {
        const result = await shareContent({ contentId: postId });
        if (result.success) {
            setShares(shares + 1); 
        } else {
            alert(result.message || "Failed to share the post.");
        }
    };
    return (
        <div className="flex items-center justify-between mt-4 p-4 border-t border-gray-200 h-fit ">
            <div className="flex gap-4">
                {/* Like Button */}
                <Button
                    onClick={handleLike}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                    <Heart className="h-5 w-5" />
                    {likes}
                </Button>
                {/* Comment Button */}
                <Button
                    onClick={handleComment}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                    <MessageCircle className="h-5 w-5" />
                    {comments}
                </Button>
                {/* Share Button */}
                {/* <Button
                    onClick={handleShare}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
                >
                    <Share2 className="h-5 w-5" />
                    {shares}
                </Button> */}
            </div>
        </div>
    );
};
