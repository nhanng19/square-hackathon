import Image from "next/image";
import React from "react";
import Container from "./container";

const Testimonials = () => {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="lg:col-span-2 xl:col-auto">
          <div className="flex flex-col justify-between w-full h-full bg-background px-14 rounded-2xl py-14 dark:bg-gray-800 border">
            <p className="text-2xl leading-normal ">
              Now I can interact with customers in <Mark>real-time</Mark> and
              they make confident purchases without the FOMO. It's a
              game-changer!"
            </p>

            <Avatar
              image={"/images/user1.jpg"}
              name="Sarah Steiner"
              title="VP Sales at Google"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-background px-14 rounded-2xl py-14 dark:bg-gray-800 border">
            <p className="text-2xl leading-normal ">
              I <Mark>love</Mark> being able to join live sale events and
              discover new products in real-time!
            </p>

            <Avatar
              image={"/images/user2.jpg"}
              name="Dylan Ambrose"
              title="Lead marketer at Netflix"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-background px-14 rounded-2xl py-14 dark:bg-gray-800 border">
            <p className="text-2xl leading-normal ">
              Square Edge has <Mark>revolutionized</Mark> the way I shop online.
              It's shopping made simple
            </p>

            <Avatar
              image={"/images/user3.jpg"}
              name="Gabrielle Winn"
              title="Co-founder of Acme Inc"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

function Avatar(props: any) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <img
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}

export function Mark(props : any) {
  return (
    <>
      {" "}
      <mark className="text-white bg-primary rounded-md ring-primary ring-4 dark:ring-primary dark:bg-primary dark:text-white">
        {props.children}
      </mark>{" "}
    </>
  );
}

export default Testimonials;
