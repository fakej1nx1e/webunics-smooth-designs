import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
// import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Process from "@/components/Process";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        {/* <Portfolio /> */}
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
