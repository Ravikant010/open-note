import { Suspense } from 'react';

import UserPosts from './UserPosts';
import { getCurrentUser, getUserByUserName } from "@/actions/userAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileStats from './ProfileStats';
import { UserAvatar } from './user-avatar';

export default async function ProfilePage({ params }:{params: Promise<{username:string}>}) {

  const {data:user} = await getUserByUserName((await params).username)


if(!user)
    return <>user not found</>
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center space-y-4">
        <UserAvatar className='w-20 h-20 lg:text-2xl' username={user.name as string}/>
          <div className="text-center">
         
            {user && (
              <p className="text-muted-foreground">
                Member since {new Date(user && user?.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {user && (
          <Suspense fallback={<div>Loading stats...</div>}>
            <ProfileStats username={(await params).username} />
          </Suspense>
        )}
      </div>

      {user && (
        <Suspense fallback={<div>Loading posts...</div>}>
          <UserPosts username={(await params).username} />
        </Suspense>
      )}
    </div>
  );
}