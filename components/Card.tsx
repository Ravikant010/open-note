import { Heart, MessageCircle, Share2 } from "lucide-react"; // Import Lucide icons
import React, { useState } from "react";
import { CardContent, Card } from "./ui/card";
import Link from "next/link";


type PostCardProps = {
  id: string;
  title: string;
  preview: string;
  imageUrl?: string;
  initialLikes?: number;
  initialComments?: number;
  initialShares?: number;
};

export default function PostCard({
  id,
  title,
  preview,
  imageUrl,
  initialLikes = 0,
  initialComments = 0,
  initialShares = 0,
}: PostCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [shares, setShares] = useState(initialShares);

  const handleLike = () => setLikes(likes + 1);
  const handleComment = () => setComments(comments + 1);
  const handleShare = () => setShares(shares + 1);

  return (
    <div>
      <Link href={`/post/${id}`}>
        <Card key={id} className="min-w-[250px] shadow-none hover:shadow-md transition-shadow duration-300">
          {imageUrl && (
            <div
              className="aspect-video w-full bg-muted"
              style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{preview}</p>
          </CardContent>

          {/* Post Footer */}
          <PostFooter
            likes={likes}
            comments={comments}
            shares={shares}
            onLike={handleLike}
            onComment={handleComment}
            onShare={handleShare}
          />
        </Card>
      </Link>
    </div>
  );
}

type PostFooterProps = {
  likes: number;
  comments: number;
  shares: number;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
};

const PostFooter: React.FC<PostFooterProps> = ({
  likes,
  comments,
  shares,
  onLike,
  onComment,
  onShare,
}) => {
  return (
    <div className="flex items-center justify-between mt-4 p-4 border-t border-gray-200">
      <div className="flex gap-4">
        {/* Like Button */}
        <button
          onClick={onLike}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <Heart className="h-5 w-5" />
          {likes}
        </button>

        {/* Comment Button */}
        <button
          onClick={onComment}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <MessageCircle className="h-5 w-5" />
          {comments}
        </button>

        {/* Share Button */}
        <button
          onClick={onShare}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600"
        >
          <Share2 className="h-5 w-5" />
          {shares}
        </button>
      </div>
    </div>
  );
};


