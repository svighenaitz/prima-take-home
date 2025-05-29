import Link from "next/link";
import { useRouter } from "next/router";

export function BottomNav() {
  const router = useRouter();
  
  // Navigation items with icons and accessibility information
  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      href: "/explore",
      label: "Explore",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      href: "/saved",
      label: "Saved",
      icon: (
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      )
    }
  ];
  
  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white flex justify-around py-3 z-10 border-t" 
      style={{ borderTopColor: '#886364', borderTopWidth: 1 }}
      aria-label="Main navigation"
    >
      {navItems.map((item) => {
        const isActive = router.pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors ${isActive ? "text-[#4A4142] bg-gray-100" : "text-gray-500"}`}
            aria-current={isActive ? "page" : undefined}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {isActive && <span className="sr-only">(current page)</span>}
          </Link>
        );
      })}
    </nav>
  );
}