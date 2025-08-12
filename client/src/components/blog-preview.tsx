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
      <section id="blog" className="py-12 md:py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Free Insights
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
              Expert guidance and industry insights to help you make informed financial decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
                <div className="w-full h-48 bg-gray-700" />
                <div className="p-6">
                  <div className="h-4 bg-gray-700 rounded mb-2" />
                  <div className="h-6 bg-gray-700 rounded mb-3" />
                  <div className="h-12 bg-gray-700 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-700 rounded w-20" />
                    <div className="h-4 bg-gray-700 rounded w-16" />
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
    <section id="blog" className="py-12 md:py-16 bg-gradient-to-b from-[#0a0b1e] to-[#141428] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-3000"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 md:mb-4">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Free Insights
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-4">
            Expert guidance and industry insights to help you make informed financial decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {posts?.map((post) => (
            <article key={post.id} className="bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all group">
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform" 
                />
              )}
              <div className="p-6">
                <div className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium mb-2 uppercase tracking-wide">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{post.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Unknown date'}
                  </span>
                  <button className="text-purple-400 hover:text-pink-400 font-medium text-sm transition-colors">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 hover:from-purple-600 hover:to-pink-600 font-semibold">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
