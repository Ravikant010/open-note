import React from "react";
import { CardContent, Card } from "./ui/card";
import Link from "next/link";

type PostCardProps = {
  id: string; // A unique ID for each post (e.g., blog, story)
  title: string;
  preview: string; // A brief preview or description of the post
  imageUrl?: string; // Optional image URL for the post
};

export default function PostCard({ id, title, preview, imageUrl }: PostCardProps) {
  return (
    <div>
      <Link href={`/post/${id}`}>
        <Card key={id} className="min-w-[250px] shadow-none hover:shadow-md transition-shadow duration-300">
          {imageUrl && (
            <div
              className="aspect-video w-full bg-muted"
              style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            />
          )}
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{preview}</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
