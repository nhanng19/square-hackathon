import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Circles from "@/components/svg/circles";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <div className="relative overflow-hidden bg-background pt-[120px] md:pt-[130px] lg:pt-[160px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4">
              <div
                className="hero-content wow fadeInUp mx-auto max-w-[780px] text-center"
                data-wow-delay=".2s"
              >
                <h1 className="mb-6 text-3xl font-bold leading-snug  sm:text-4xl sm:leading-snug lg:text-5xl lg:leading-[1.2]">
                  Gain an edge for your Square Online Store.
                </h1>
                <p className="mx-auto mb-9 max-w-[600px] text-base font-medium  sm:text-lg sm:leading-[1.44]">
                  Elevate your brand, engage your audience, and drive sales like
                  never before - your online success story starts now.
                </p>
                <ul className="mb-10 flex flex-wrap items-center justify-center gap-5">
                  <li>
                    <Button variant="default" asChild>
                      <Link href="/login">Get Started</Link>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full px-4">
              <div
                className="wow fadeInUp relative z-10 mx-auto max-w-[845px]"
                data-wow-delay=".25s"
              >
                <div className="mt-16">
                  <img
                    src="/images/hero-image.png"
                    alt="hero"
                    className="mx-auto max-w-full rounded-t-xl rounded-tr-xl"
                  />
                </div>
                <div className="absolute -left-9 bottom-0 z-[-1]">
                  <Circles />
                </div>
                <div className="absolute -right-6 -top-6 z-[-1]">
                  <Circles />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
