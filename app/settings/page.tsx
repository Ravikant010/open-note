'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { deletePost, deleteAccount } from '@/actions/setting';
import { useRouter } from 'next/navigation';
import { destroySession, getSession } from '@/lib/session';

export default function SettingsPage() {
  const [postId, setPostId] = useState<string>('');
  const [isDeletingPost, setIsDeletingPost] = useState<boolean>(false);
  const [postDeletionMessage, setPostDeletionMessage] = useState<string | null>(null);
  const router = useRouter()
  const [isDeletingAccount, setIsDeletingAccount] = useState<boolean>(false);
  const [accountDeletionMessage, setAccountDeletionMessage] = useState<string | null>(null);

  // Handle post deletion
  const handleDeletePost = async () => {
    if (!postId.trim()) {
      setPostDeletionMessage('Please enter a valid post ID');
      return;
    }

    setIsDeletingPost(true);
    setPostDeletionMessage(null);

    try {
      const result = await deletePost(postId);
      if (result.success) {
         setPostDeletionMessage(result.message || 'Post deleted successfully');
         router.push("/login");
      } else {
        setPostDeletionMessage(result.error || 'Failed to delete post');
      }
    } catch (error) {

      setPostDeletionMessage('An unexpected error occurred');
    } finally {
      setIsDeletingPost(false);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setIsDeletingAccount(true);
    setAccountDeletionMessage(null);

    try {
      const result = await deleteAccount();
      if (result.success) {
        setAccountDeletionMessage(result.message || 'Account deleted successfully');
        router.push("/login");
      } else {
        setAccountDeletionMessage(result.error || 'Failed to delete account');
      }
    } catch (error) {
      setAccountDeletionMessage('An unexpected error occurred');
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  // Handle logout
  const handleLogout = async () => {
    setLogoutMessage('Logging out...');
    try {
      await destroySession();
      const session = await getSession();

      if (!session) {
       return router.push('/login');
      } else {
        setLogoutMessage('Failed to log out');
      }
    } catch (error) {
      console.log(error)
      setLogoutMessage('An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Delete Post Section */}
      <Card>
        <CardHeader>
          <CardTitle>Delete a Post</CardTitle>
          <CardDescription>
            Enter the ID of the post you want to delete. Only posts you own can be deleted.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeletePost();
            }}
            className="flex items-center space-x-2"
          >
            <Input
              type="text"
              value={postId}
              onChange={(e) => setPostId(e.target.value)}
              placeholder="Enter Post ID"
              className="flex-1"
            />
            <Button type="submit" disabled={isDeletingPost} variant="destructive">
              {isDeletingPost ? 'Deleting...' : 'Delete Post'}
            </Button>
          </form>
          {postDeletionMessage && (
            <Alert
              variant={postDeletionMessage.includes('not authorized') ? 'destructive' : 'default'}
              className="mt-4"
            >
              <AlertTitle>
                {postDeletionMessage.includes('not authorized') ? 'Unauthorized' : 'Success'}
              </AlertTitle>
              <AlertDescription>{postDeletionMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Delete Account Section */}
      <Card>
        <CardHeader>
          <CardTitle>Delete Your Account</CardTitle>
          <CardDescription>
            Deleting your account will remove all your posts, likes, comments, and other associated data. This action
            cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleDeleteAccount} disabled={isDeletingAccount} variant="destructive">
            {isDeletingAccount ? 'Deleting...' : 'Delete Account'}
          </Button>
          {accountDeletionMessage && (
            <Alert
              variant={accountDeletionMessage.includes('Failed') ? 'destructive' : 'default'}
              className="mt-4"
            >
              <AlertTitle>
                {accountDeletionMessage.includes('Failed') ? 'Error' : 'Success'}
              </AlertTitle>
              <AlertDescription>{accountDeletionMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        
      </Card>

      {/* Future Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Other Settings</CardTitle>
          <CardDescription>
            More settings like updating profile information or changing password will be added soon.
          </CardDescription>
        </CardHeader>
      </Card>
      <Button onClick={async () => {
          setLogoutMessage(null);
          await handleLogout();
        }} 
        variant="destructive" 
        className='w-full'
        disabled={logoutMessage === 'Logging out...'}
      >
        {logoutMessage === 'Logging out...' ? 'Logging out...' : 'Logout'}
      </Button>
    </div>
  );
}