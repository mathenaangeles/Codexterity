import Hero from "./components/Hero";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Services from "./components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
