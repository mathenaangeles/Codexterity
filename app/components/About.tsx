const benefits = [
  "Automate repetitive processes to free up your team",
  "Design modern, high-converting websites",
  "Build custom software to manage operations",
  "Integrate apps and systems for seamless efficiency",
] as const;

export default function About() {
  return (
    <section id="about" className="py-32 px-6 lg:px-12 bg-gradient-to-b from-black to-gray-950">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
              Future-Proof Your Business Today
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Codexterity creates smart, scalable solutions that save time, increase revenue, and
              simplify operations.
            </p>

            <p className="text-lg text-gray-400 mb-12 leading-relaxed">
              From automated workflows that streamline your daily tasks, to custom websites that
              convert visitors into customers, and tailored software solutions designed to fit your
              unique business needs.
            </p>

            <div className="space-y-5">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-4">
                  <svg
                    className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 6L9 17l-5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-gray-300 leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-[32px] blur-3xl" />

            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-sm p-12 rounded-[32px] border border-white/10">
              <div className="grid grid-cols-2 gap-10">
                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-3">
                    100+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Projects
                    <br />
                    Delivered
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-3">
                    50+
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Happy
                    <br />
                    Clients
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-3">
                    24/7
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Support
                    <br />
                    Available
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-3">
                    99%
                  </div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    Success
                    <br />
                    Rate
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-white/10">
                <p className="text-gray-300 text-center italic leading-relaxed">
                  &quot;Transforming businesses through intelligent automation and custom
                  development&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
