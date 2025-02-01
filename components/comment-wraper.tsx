import React from "react";
import CommentSection from "./CommentSection";
import { getCommentsByPostId } from "@/actions/reactionAction";
type CommentSectionWrapperProps = {
    postId: string; 
};
export default async function CommentSectionWrapper({ postId }: CommentSectionWrapperProps) {
    const result = await getCommentsByPostId(postId);
    const comments = result?.success ? result.data : [];
 return <CommentSection postId={postId} comments={comments} />;
}