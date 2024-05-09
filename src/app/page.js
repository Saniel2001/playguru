import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <Hero/>
      <Gallery/>
    </main>
  );
}
