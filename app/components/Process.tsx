type Step = {
  number: "01" | "02" | "03" | "04";
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, challenges, and goals through in-depth consultation.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Our team develops a tailored solution strategy aligned with your objectives and budget.",
  },
  {
    number: "03",
    title: "Development",
    description:
      "We build and iterate on your solution using agile methodologies and best practices.",
  },
  {
    number: "04",
    title: "Launch & Support",
    description:
      "We deploy your solution and provide ongoing support to ensure continued success.",
  },
];

export default function Process() {
  return (
    <section id="process" className="py-32 px-6 lg:px-12 bg-gray-950">
      <div className="max-w-[1400px] mx-auto">
        <div className="max-w-3xl mb-20">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Our Process
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            A proven methodology that delivers results, from concept to launch and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-blue-500/30 to-transparent translate-y-1/2" />
              )}

              <div className="relative">
                <div className="text-[120px] font-bold text-white/[0.02] leading-none mb-4">
                  {step.number}
                </div>
                <div className="absolute top-0 left-0 text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  {step.number}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 mt-12">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
