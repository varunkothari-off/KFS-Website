import { Shield, Award, Users } from "lucide-react";

export default function TrustSignal() {
  return (
    <div className="fixed bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-lg max-w-xs animation-float">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Shield className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-sm text-slate-900">Trusted Partner</h3>
          <p className="text-xs text-slate-600">RBI Approved</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-blue-600" />
          <span className="text-xs text-slate-700">40+ Years Experience</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-purple-600" />
          <span className="text-xs text-slate-700">5000+ Happy Clients</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-200">
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-yellow-400 rounded-full border border-white"></div>
            ))}
          </div>
          <span className="text-xs font-medium text-slate-900">4.9/5 Rating</span>
        </div>
      </div>
    </div>
  );
}