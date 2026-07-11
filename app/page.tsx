import Header from "./components/Header";
import Hero from "./components/Hero";
import Proof from "./components/Proof";
import Services from "./components/Services";
import Uses from "./components/Uses";
import Process from "./components/Process";
import Results from "./components/Results";
import PackageBuilder from "./components/PackageBuilder";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import { InquiryProvider } from "./components/InquiryContext";

export default function Home() {
  return (
    <InquiryProvider>
      <Header />
      <main>
        <Hero />
        <Proof />
        <Services />
        <Uses />
        <Process />
        <Results />
        <PackageBuilder />
      </main>
      <Footer />
      <ChatWidget />
    </InquiryProvider>
  );
}
