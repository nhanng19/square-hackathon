import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Circles from "@/components/svg/circles";
import Link from "next/link";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { clients, products } from "@/lib/constant";
import { HeroParallax } from "@/components/connect-parallax";
import {
  StickyScroll,
  squareContent,
} from "@/components/ui/sticky-scroll-reveal";
import Hero from "@/components/marketing/hero";
import SectionTitle from "@/components/marketing/sectionTitle";
import Benefits from "@/components/marketing/benefits";
import Video from "@/components/marketing/video";
import Testimonials from "@/components/marketing/testimonials";
import Faq from "@/components/marketing/faq";
import Cta from "@/components/marketing/cta";
import Footer from "@/components/marketing/footer";
import { benefitOne, benefitTwo } from "@/components/marketing/data";
export default function Home() {
  return (
    <>
      {/* <main className="flex items-center justify-center flex-col overflow-hidden ">
        <section className="h-screen w-full   rounded-mdrelative flex flex-col items-center  antialiased">
          <div className="absolute inset-0  h-full w-full items-center px-5 py-24"></div>
          <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            <ContainerScroll
              titleComponent={
                <div className="flex items-center flex-col">
                  <Link href={"/login"}>
                    <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                      Start for free today
                    </button>
                  </Link>
                  <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                    Transform Your Square Store Success
                  </h1>
                </div>
              }
            >
              <img
                src="/images/hero-image.png"
                alt="hero"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
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
      </main> */}
      <div className="pt-24">
        <Hero />
        <SectionTitle
          pretitle="Nextly Benefits"
          title=" Why should you use this landing page"
        >
          Nextly is a free landing page & marketing website template for
          startups and indie projects. Its built with Next.js & TailwindCSS. And
          its completely open-source.
        </SectionTitle>
        <Benefits data={benefitOne} />
        <Benefits imgPos="right" data={benefitTwo} />
        <SectionTitle
          pretitle="Watch a video"
          title="Learn how to fullfil your needs"
        >
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate.
          So, don&apos;t forget to add one. Just like this.
        </SectionTitle>
        <Video />
        <SectionTitle
          pretitle="Testimonials"
          title="Here's what our customers said"
        >
          Testimonails is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle>
        <Testimonials />
        <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>
        <Faq />
        <Cta />
        <Footer />
      </div>
    </>
  );
}
