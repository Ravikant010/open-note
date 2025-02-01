import Link from "next/link"

type RelatedPost = {
  id: number
  title: string
  slug: string
}

export default function Sidebar({ relatedPosts }: { relatedPosts: RelatedPost[] }) {
  return (
    <aside className="w-full md:w-1/3 p-4">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Related Posts</h2>
        <ul className="space-y-2">
          {relatedPosts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

