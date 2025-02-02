'use client';
import { useEffect, useState } from 'react';
import { getPostStats, getPostStats_profile } from '@/actions/reactionAction';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define the structure of the stats object
interface Stats {
  posts: number;
  likes: number;
  comments: number;
}

export default function ProfileStats() {
  const [stats, setStats] = useState<Stats>({ posts: 0, likes: 0, comments: 0 });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state
        const result = await getPostStats_profile();

        if (result.success) {
          setStats({
            posts: result.posts ?? 0,
            likes: result.likes ?? 0,
            comments: result.comments ?? 0,
          });
        } else {
          setError(result.error || 'Failed to fetch stats. Please try again.');
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {/* Loading State */}
      {loading && (
        <div className="col-span-full text-center text-muted-foreground">
          Loading stats...
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="col-span-full text-center text-destructive">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      {!loading && !error && (
        <>
          <StatCard title="Posts" value={stats.posts} />
          <StatCard title="Likes Received" value={stats.likes} />
          <StatCard title="Comments Received" value={stats.comments} />
        </>
      )}
    </div>
  );
}

// Reusable StatCard Component
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="shadow-none rounded-none border">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
        <CardDescription className="text-muted-foreground">{title}</CardDescription>
      </CardHeader>
    </Card>
  );
}