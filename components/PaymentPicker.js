import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

export const PaymentPointers = [
  { name: "Mysilio", pointer: "$ilp.uphold.com/DYPhbXPmDa2P" },
  { name: "Defold Foundation", pointer: "$ilp.uphold.com/QkG86UgXzKq8" },
  { name: "freeCodeCamp", pointer: "$ilp.uphold.com/LJmbPn7WD4JB" },
  { name: "Internet Archive", pointer: "$ilp.uphold.com/D7BwPKMQzBiD" },
  { name: "STOP", pointer: "$ilp.uphold.com/RHZ6KZx4mWQi" },
  { name: "Ushandi", pointer: "$ilp.uphold.com/kN2KHpqhNFiM" },
  { name: "ITADI", pointer: "$ilp.uphold.com/kjMJqg7gH7JA" },
  { name: "Ballet Rising", pointer: "$ilp.uphold.com/4hyPF8hgjKMw" },
  {
    name: "Creative Living for Dancers",
    pointer: "$ilp.uphold.com/FR7UfwWWfib3",
  },
  {
    name: "Wellness Through Mindfullness Course",
    pointer: "$ilp.gatehub.net/735653594",
  },
];

export function PaymentPicker({ setPayment }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [index, setIndex] = useState(0);
  const pointers = PaymentPointers.map(({ name, pointer }) => {
    return { name, pointer, title: `${name} - ${pointer}` };
  });

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          {pointers[index].title}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {pointers.map((pp, index) => {
              return (
                <Menu.Item key={pp.title}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => {
                        setIndex(index);
                        setPayment(pp.pointer);
                      }}
                    >
                      {pp.title}
                    </a>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
