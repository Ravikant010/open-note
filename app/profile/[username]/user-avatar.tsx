'use client'

import { useEffect, useState } from "react";
import { getCurrentUser, getUserByUserName } from "@/actions/userAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  avatar?: string;
}

interface UserAvatarProps {
  className?: string;
  fallback?: string;
  username:string
}

export function UserAvatar({ className, fallback = "UN", username }: UserAvatarProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { success, data } = await getUserByUserName(username);
        if (success && data) {
          //@ts-ignore
          setUser(data);
        } else {
          setError('Failed to load user');
        }
      } catch (err) {
        setError('Error fetching user data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Skeleton className={cn("h-10 w-10 rounded-full", className)} />;
  }

  if (error || !user) {
    return (
      <Avatar className={cn("cursor-not-allowed", className)}>
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    );
  }

  const initials = user.name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase() || fallback;

  return (<>
    <Avatar className={cn("cursor-pointer hover:opacity-90", className)}>

        <AvatarImage
          src="/avatar.png"
          alt={user.name || "User avatar"}
          className="object-cover text-center"
        />
    
      
    </Avatar>
     <div>
     <h2 className="text-sm font-semibold lg:text-2xl">{user.name}</h2>
     {/* <p className="text-xs text-muted-foreground">@username</p> */}
   </div>
   </>
  );
}