import { Suspense } from 'react';

import UserPosts from './UserPosts';
import { getCurrentUser } from "@/actions/userAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileStats from './ProfileStats';
import { UserAvatar } from '@/components/user-avatar';

export default async function ProfilePage() {
  const { success, data: user } = await getCurrentUser();
  
  if (!success) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col items-center space-y-4">
        <UserAvatar className='w-20 h-20 lg:text-2xl'/>
          <div className="text-center">
         
            {user && (
              <p className="text-muted-foreground">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {user && (
          <Suspense fallback={<div>Loading stats...</div>}>
            <ProfileStats  />
          </Suspense>
        )}
      </div>

      {user && (
        <Suspense fallback={<div>Loading posts...</div>}>
          <UserPosts userId={user.id} />
        </Suspense>
      )}
    </div>
  );
}