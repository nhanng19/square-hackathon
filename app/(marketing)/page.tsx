import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Circles from "@/components/svg/circles";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients, products } from "@/lib/constant";
import { HeroParallax } from "@/components/connect-parallax";
import { StickyScroll, squareContent } from "@/components/ui/sticky-scroll-reveal";
export default function Home() {
  return (
    <>
      <main className="flex items-center justify-center flex-col overflow-hidden">
        <section className="h-screen w-full   rounded-mdrelative flex flex-col items-center  antialiased">
          <div className="absolute inset-0  h-full w-full items-center px-5 py-24"></div>
          <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            <ContainerScroll
              titleComponent={
                <div className="flex items-center flex-col">
                  <Link href={"/login"}><button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                    Start for free today
                  </button></Link>
                  <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                    Transform Your Square Store Success
                  </h1>
                </div>
              }
            />
          </div>
        </section>
        <InfiniteMovingCards
          className="md:mt-[18rem] mt-[-100px]"
          items={clients}
          direction="right"
          speed="slow"
        />
        <section>
          <HeroParallax products={products}></HeroParallax>
        </section>
      </main>
    </>
  );
}
