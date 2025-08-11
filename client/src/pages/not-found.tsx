import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0b1e]">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0b1e] via-[#141428] to-[#1a1b3a]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-900/10 via-transparent to-blue-900/5"></div>
      </div>

      <Card className="relative z-10 w-full max-w-md mx-4 bg-gradient-to-br from-[#141428]/90 to-[#1a1b3a]/90 backdrop-blur-xl border-white/10">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white mb-2">404</h1>
          <h2 className="text-xl font-semibold text-white/80 mb-4">Page Not Found</h2>
          
          <p className="text-white/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
