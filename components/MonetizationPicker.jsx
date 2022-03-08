import { useState, useEffect } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";

export const MysilioPointer = "$ilp.uphold.com/DYPhbXPmDa2P";

export const MonetizationPointers = [
  { name: "Mysilio", pointer: MysilioPointer },
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

function randomPP() {
  return MonetizationPointers[
    Math.floor(Math.random() * MonetizationPointers.length)
  ];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function MonetizationPicker({ setMonetization }) {
  const [query, setQuery] = useState("");
  const [selectedPP, setSelectedPP] = useState();
  const setPP = (pp) => {
    setSelectedPP(pp);
    setMonetization(pp.pointer);
  };
  useEffect(() => {
    setPP(randomPP());
  }, []);

  const filteredPointers =
    query === ""
      ? MonetizationPointers
      : MonetizationPointers.filter((pp) => {
          return pp.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedPP} onChange={setPP}>
      <Combobox.Label className="block text-sm font-medium text-gray-700">
        Who would you like to monetize this line for?
      </Combobox.Label>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(pp) => pp.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredPointers.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPointers.map((pp) => (
              <Combobox.Option
                key={pp.name}
                value={pp}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span
                        className={classNames(
                          "truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {pp.name}
                      </span>
                      <span
                        className={classNames(
                          "ml-2 truncate text-gray-500",
                          active ? "text-indigo-200" : "text-gray-500"
                        )}
                      >
                        {pp.pointer}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
