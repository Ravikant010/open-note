'use client'
import React, { useState, useEffect } from "react";
import CommentSection from "./CommentSection";
import { getCommentsByPostId } from "@/actions/reactionAction";

interface Comment {
  id: string;
  content: string;
  author: string | null;
  postId: string;
  createdAt: Date;
}

interface CommentSectionWrapperProps {
  postId: string;
}

export default function CommentSectionWrapper({ postId }: CommentSectionWrapperProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const result = await getCommentsByPostId(postId);
//@ts-ignore
      setComments(result?.success ? result.data : []);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <CommentSection 
      postId={postId} 
      //@ts-ignore
      comments={comments}
      onCommentsUpdate={fetchComments}
      isLoading={isLoading} 
    />
  );
}
