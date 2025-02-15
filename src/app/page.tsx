"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";

export interface functionProp {
  id: string;
  equation: {
    value: string;
  };
  nextFunction: {
    disabled: boolean;
    value: string | null;
  };
  input: string | null;
  output: string;
}

export default function Home() {
  const pattern = /^([0-9+\-*/^x]*)$/;
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [functions, setFunctions] = useState<functionProp[]>([
    {
      id: "1",
      equation: {
        value: "x^2",
      },
      nextFunction: {
        disabled: true,
        value: "2",
      },
      input: null,
      output: "",
    },
    {
      id: "2",
      equation: {
        value: "2x+4",
      },
      nextFunction: {
        disabled: true,
        value: "4",
      },
      input: "1",
      output: "",
    },
    {
      id: "3",
      equation: {
        value: "x^2+20",
      },
      nextFunction: {
        disabled: true,
        value: null,
      },
      input: "5",
      output: "",
    },
    {
      id: "4",
      equation: {
        value: "x-2",
      },
      nextFunction: {
        disabled: true,
        value: "5",
      },
      input: "2",
      output: "",
    },
    {
      id: "5",
      equation: {
        value: "x/2",
      },
      nextFunction: {
        disabled: true,
        value: "3",
      },
      input: "4",
      output: "",
    },
  ]);

  useEffect(() => {
    const calculateArray = [];
    const leftNumberToXPattern = /(\d+)x/;
    const bothSideNumberPattern = /^\d+x\d+$/;
    const rightNumberToXPattern = /x\d+/;
    let firstFunction = functions[0];
    let isAllEquationsEntered = false;
    while (firstFunction.nextFunction.value) {
      calculateArray.push(firstFunction);
      const nextId = firstFunction.nextFunction.value;
      if (firstFunction.equation.value.length === 0) {
        isAllEquationsEntered = false;
      } else {
        isAllEquationsEntered = true;
      }
      firstFunction = functions.filter((f) => f.id === nextId)[0];
    }
    calculateArray.push(firstFunction);
    if (isAllEquationsEntered) {
      let inputValue = input;
      calculateArray.forEach((data) => {
        let eq = data.equation.value;
        if (leftNumberToXPattern.test(eq)) {
          eq = eq.replaceAll("x", "*x");
        }
        if (rightNumberToXPattern.test(eq)) {
          eq = eq.replaceAll("x", "x*");
        }
        if (bothSideNumberPattern.test(eq)) {
          eq = eq.replaceAll("x", "*x*");
        }
        eq = eq.replaceAll("x", inputValue);
        if (eq.includes("^")) {
          eq = eq.replaceAll("^", "**");
        }
        try {
          inputValue = eval(eq);
        } catch (e) {
          console.log("error", e);
        }
      });
      setOutput(inputValue);
    } else {
      setOutput("")
    }
  }, [functions, input]);

  function handleChange(data: functionProp, value: string) {
    if (pattern.test(value)) {
      const updatedFunctions = functions.map((item) => {
        if (item.id === data.id) {
          return {
            ...item,
            equation: {
              value,
            },
          };
        }
        return item;
      });
      setFunctions(updatedFunctions);
    }
  }

  function renderFunctions() {
    return functions.map((item) => (
      <Card
        key={item.id}
        data={item}
        onChange={handleChange}
        input={input}
        setInput={setInput}
        output={output}
        setOutput={setOutput}
        isChecked={isChecked}
      />
    ));
  }

  return (
    <div className="h-full w-full">
      <div className="flex pt-[5%] px-[1%] flex-wrap justify-center gap-[8%] gap-y-[15vh]">
        {renderFunctions()}
      </div>
      <label
        htmlFor="checkbox-input"
        className="cursor-pointer absolute right-[20px] top-[20px] z-[4] flex align-middle gap-[10px] bg-[black] p-[10px] rounded-full text-white"
      >
        <p>Allow Input</p>
        <input
          id="checkbox-input"
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
        />
      </label>
    </div>
  );
}
