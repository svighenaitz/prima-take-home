import Link from "next/link";
import { useRouter } from "next/router";

export function BottomNav() {
  const router = useRouter();
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white flex justify-around py-2 z-10 border-t" style={{ borderTopColor: '#886364', borderTopWidth: 1 }}>
      <Link href="/" className={router.pathname === "/" ? "text-black" : "text-gray-400"}>Home</Link>
      <Link href="/explore" className={router.pathname === "/explore" ? "text-black" : "text-gray-400"}>Explore</Link>
      <Link href="/saved" className={router.pathname === "/saved" ? "text-black" : "text-gray-400"}>Saved</Link>
    </nav>
  );
}