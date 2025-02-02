'use client';

import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addComment } from "@/actions/reactionAction";

interface Comment {
    id: string;
    author: string | null;
    createdAt: string;
    content: string;
}

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    onCommentsUpdate: () => void;
    isLoading?: boolean;
}

export default function CommentSection({ 
    postId, 
    comments, 
    onCommentsUpdate,
    isLoading = false 
}: CommentSectionProps) {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) return;
        
        try {
            setIsSubmitting(true);
            const result = await addComment({ 
                contentId: postId, 
                commentBody: comment 
            });
            
            if (result.success) {
                setComment('');
                onCommentsUpdate();
            } else {
                alert(result.message || "Failed to add comment.");
            }
        } catch (error) {
            alert("Failed to submit comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Loading comments...</div>;
    }

    return (
        <div className="space-y-4 w-full">
            <h2 className="text-2xl font-bold">Comments</h2>
            {comments.length > 0 ? (
                comments.map((comment) => (
                    <Card key={comment.id} className="shadow-none">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar>
                                    <AvatarFallback>
                                        {comment.author?.[0]?.toUpperCase() || '?'}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-medium">{comment.author}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{comment.content}</p>
                        </CardContent>
                    </Card>
                ))
            ) : (
                <p className="text-muted-foreground">
                    No comments yet. Be the first to comment!
                </p>
            )}
            <Card className="shadow-none">
                <CardHeader>
                    <h3 className="text-lg font-semibold">Leave a comment</h3>
                </CardHeader>
                <CardContent>
                    <Textarea 
                        placeholder="Type your comment here." 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button 
                        onClick={handleSubmit}
                        disabled={isSubmitting || !comment.trim()}
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
