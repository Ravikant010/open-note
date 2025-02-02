
import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { CalendarDays, MapPin, LinkIcon } from "lucide-react";
import { getAuthorByPostId } from "@/actions/userAction";

type AuthorCardProps = {
  postId: string; // The ID of the post
};

export default async function AuthorCard({ postId }: AuthorCardProps) {
  // Fetch the author's details using the server action
  const result = await getAuthorByPostId(postId);

  if (!result.success) {
    return <p className="text-center text-red-500">Author not found.</p>;
  }

  // const { name, username, bio, avatarUrl, joinedDate, location, website } = result.data;

  const { name, username, joinedDate } = result.data || { name: null, username: "", joinedDate: "" };

  return (
    <Card className="w-full shadow-none">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Avatar */}
          {/* <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar> */}

          {/* Author Details */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div>
              <h3 className="text-2xl font-bold">{name}</h3>
              <p className="text-muted-foreground">@{username}</p>
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarDays className="mr-1 h-4 w-4" />
                Joined {new Date(joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </div>
              {/* <div className="flex items-center">
                <MapPin className="mr-1 h-4 w-4" />
                {location}
              </div>
              {website && (
                <div className="flex items-center">
                  <LinkIcon className="mr-1 h-4 w-4" />
                  <a href={website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              )}
            </div> */}
            </div>
            {/* <p className="text-sm">{bio}</p> */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
              {/* <Button variant="outline" size="sm">
                Follow
              </Button>
              <Button variant="outline" size="sm">
                Message
              </Button> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}