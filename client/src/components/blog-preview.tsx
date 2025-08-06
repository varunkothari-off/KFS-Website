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
      <section id="blog" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">Latest Insights</h2>
            <p className="text-xl text-gray-600">Stay updated with financial trends and business tips</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200" />
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded mb-3" />
                  <div className="h-12 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-200 rounded w-20" />
                    <div className="h-4 bg-gray-200 rounded w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-kfs-dark mb-4">Latest Insights</h2>
          <p className="text-xl text-gray-600">Stay updated with financial trends and business tips</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {post.imageUrl && (
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-48 object-cover" 
                />
              )}
              <div className="p-6">
                <div className="text-sm text-kfs-primary font-medium mb-2 uppercase">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-kfs-dark mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    }) : 'Unknown date'}
                  </span>
                  <button className="text-kfs-primary hover:text-kfs-secondary font-medium">
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
