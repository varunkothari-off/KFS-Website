import logoPath from "@assets/logo_1754958364982.png";

export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <img 
      src={logoPath} 
      alt="Kothari Financial Services Logo" 
      className={className}
    />
  );
}
