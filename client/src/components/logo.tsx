export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* KFS Logo based on the geometric design from attached image */}
      <defs>
        <linearGradient id="kfs-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(207, 90%, 54%)" />
          <stop offset="50%" stopColor="hsl(213, 94%, 68%)" />
          <stop offset="100%" stopColor="hsl(214, 95%, 73%)" />
        </linearGradient>
      </defs>
      
      {/* Geometric K shape inspired by the reference logo */}
      <path 
        d="M20 15 L20 85 L30 85 L30 55 L45 40 L65 85 L77 85 L52 35 L75 15 L63 15 L45 32 L30 15 Z" 
        fill="url(#kfs-gradient)" 
      />
      
      {/* Abstract geometric elements */}
      <path 
        d="M15 20 L35 20 L25 35 Z" 
        fill="hsl(207, 90%, 54%)" 
        opacity="0.7" 
      />
      <path 
        d="M65 65 L85 65 L75 80 Z" 
        fill="hsl(214, 95%, 73%)" 
        opacity="0.7" 
      />
    </svg>
  );
}
