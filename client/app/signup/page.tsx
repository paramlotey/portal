"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { SignupForm } from "@/components/user/SignupForm";
import { ModeToggle } from "@/hooks/darkMode";
import { GalleryVerticalEnd } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

const Signup = () => {
  return (
    <>
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-start">
            <a href="#" className="flex items-center gap-2 font-medium">
              <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Acme Inc.
            </a>
            <ModeToggle />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <SignupForm />
            </div>
          </div>
        </div>
        <div className="relative hidden bg-muted lg:block overflow-hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="w-full h-full"
          >
            <CarouselContent className="h-screen">
              <CarouselItem className="relative h-full">
                <img
                  src="images/image.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale duration-1000 transition-[filter]"
                />
              </CarouselItem>
              <CarouselItem className="relative h-full">
                <img
                  src="images/image2.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale duration-1000 transition-[filter]"
                />
              </CarouselItem>
              <CarouselItem className="relative h-full">
                <img
                  src="images/image3.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale duration-1000 transition-[filter]"
                />
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Signup;
