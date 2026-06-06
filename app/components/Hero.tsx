import type { CSSProperties } from "react";

type Stat = {
  label: string;
  value: string;
};

const stats: Stat[] = [
  { label: "Projects", value: "100+" },
  { label: "Clients", value: "50+" },
  { label: "Years", value: "5+" },
  { label: "Success", value: "99%" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-950" />

      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "2s" } as CSSProperties}
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 text-center">
        <div className="mb-8 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-400">
            AI-Powered Business Solutions
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight animate-slide-up">
          <span className="block text-white mb-2">We Build Tools That</span>
          <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Work As Hard As You Do
          </span>
        </h1>

        <p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up"
          style={{ animationDelay: "0.1s" } as CSSProperties}
        >
          Smart, scalable solutions that save time, increase revenue, and simplify
          operations
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 animate-slide-up"
          style={{ animationDelay: "0.2s" } as CSSProperties}
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
          >
            Start Your Project
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 10H16M16 10L10 4M16 10L10 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            href="#services"
            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-4xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" } as CSSProperties}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </div>
    </section>
  );
}
