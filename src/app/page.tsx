import Hero from "@/components/Hero";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Hero />
      <Skills />

      <footer className="w-full py-12 text-center text-gray-600 border-t border-white/5 bg-zinc-950">
        <p className="mb-2">Designed & Built by Aksh Patel</p>
        <p className="text-sm">© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </main>
  );
}
