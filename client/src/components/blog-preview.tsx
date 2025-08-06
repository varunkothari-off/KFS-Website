import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { BlogPost } from "@shared/schema";

export default function BlogPreview() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
    queryFn: async () => {
      const response = await fetch("/api/blog-posts?limit=3");
      if (!response.ok) throw new Error("Failed to fetch blog posts");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section id="blog" className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold text-slate-900 mb-4">Free Insights</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Expert guidance and industry insights to help you make informed financial decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="w-full h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-12 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-4">Free Insights</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Expert guidance and industry insights to help you make informed financial decisions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {posts?.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all">
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                />
              )}
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2 uppercase tracking-wide">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{post.title}</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Unknown date'}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-kfs-primary text-white px-8 py-3 hover:bg-kfs-secondary font-semibold">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
