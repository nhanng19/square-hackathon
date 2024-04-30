"use client"

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }: { open : boolean }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
}

const faqdata = [
  {
    question: "Is Square Edge completely free to use?",
    answer: "Yes, Square Edge is completely free to use.",
  },
  {
    question: "Can I participate in live sale events as a customer?",
    answer:
      "Absolutely! As a customer, you can join live sale events hosted by sellers on their Square Online Store. Simply browse the products, engage with the seller, and make purchases during the event.",
  },
  {
    question:
      "Is Square Edge compatible with other e-commerce platforms?",
    answer:
      "Currently, Square Edge is optimized for integration with Square Online Store. However, we are constantly exploring opportunities to expand compatibility with other e-commerce platforms in the future.",
  },
  {
    question: "Can I use Square Edge on my mobile device?",
    answer:
      "Yes, Square Edge is designed to be mobile-friendly, allowing both sellers and customers to access live sale events and interact with ease on their smartphones or tablets.",
  },
];

export default Faq;