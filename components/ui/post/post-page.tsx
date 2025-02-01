'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BrandingSF_Font, Pacifico_Regular } from '@/lib/font';


import PostCard from '@/components/Card';
import { getUserPosts } from '@/actions/action';
import { ContentSelect, ContentType } from '@/db/schema';

export  function PostsPage() {
    const [posts, setPosts] = useState<ContentSelect[]>([]);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { success, data } = await getUserPosts();
                if (success && data) {
                    setPosts(data);
                } else {
                    setError('Failed to load posts.');
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p className="text-center">Loading posts...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post:ContentSelect) => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        preview={post.body}
                 
                    />
                ))}
            </div>
        </div>
    );
}


export default function Hero() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Adjust threshold as needed
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div
            initial={{ width: '100%', borderRadius: '0px' }}
            animate={{
                width: isScrolled ? '90%' : '100%',
                borderRadius: isScrolled ? '1.5rem' : '0px',
            }}
            transition={{ duration: 0.1, ease: 'backInOut' }}
            className={`bg-white min-h-[80vh] flex items-center justify-center ${BrandingSF_Font.className} mx-auto`}
        >
            <div className="flex flex-col items-center justify-center text-center px-4 space-y-8 leading-loose text-[1.9rem]">
                <h1 className="font-bold leading-tight">
                    Craft{' '}
                    <span className={`${Pacifico_Regular.className} text-orange-500`}>
                        Stories, Blogs and Notes
                    </span>
                    <br />
                    <span className="text-blue-500">and, Grow with Your Audience</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                    Turn feedback into features your users will love. Collect ideas, plan updates,
                    and keep everyone in the loop—all in one simple tool.
                </p>
                <Button className="mt-4">
                    Get Started <MoveRight className="ml-2" />
                </Button>
            </div>
        </motion.div>
    );
}