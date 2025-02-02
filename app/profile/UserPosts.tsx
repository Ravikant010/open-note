'use client';

import { useEffect, useState } from 'react';

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import DOMPurify from 'dompurify';
import { getUserPosts } from '@/actions/noteActions';

export default function UserPosts({ userId }: { userId: string }) {
  const [posts, setPosts] = useState<{ id: string; type: "note" | "post" | "article"; title: string; body: string; userId: string; shares: number | null; createdAt: Date; updatedAt: Date; deletedAt: Date | null; }[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const result = await getUserPosts({ userId });
      if (result.success) {
        if (result.data) {
          setPosts(result.data);
        }
      }
    };
    loadPosts();
  }, [userId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Posts</h2>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow shadow-none rounded-none">
                <CardContent className="p-4">
                  <h3 className="font-semibold line-clamp-2">{post.title}</h3>
                  <div
                    className="text-muted-foreground text-sm mt-2 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.body || '')
                    }}
                  />
                  <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No posts yet</p>
      )}
    </div>
  );
}