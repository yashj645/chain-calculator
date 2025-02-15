"use client";

import { useCallback, useEffect, useLayoutEffect } from "react";
import { functionProp } from "@/app/page";
import BlueDot from "../BlueDot";
import "./style.scss";
import ThreeDots from "../ThreeDots";

type CardProps = {
  data: functionProp;
  onChange: (data: functionProp, value: string) => void;
  input: string;
  setInput: (value: string) => void;
  output: string;
  setOutput: (value: string) => void;
  isChecked: boolean;
};

function Card({
  data,
  onChange,
  input,
  setInput,
  output,
  isChecked,
}: CardProps) {
  const updateConnectionCallback = useCallback(
    function updateConnection() {
      // Get the output dot (connector point) of the current function box
      const box1 = document.getElementById(`output-dot-${data.id}`);

      // Get the input dot (connector point) of the next function box
      const box2 = document.getElementById(
        `input-dot-${data.nextFunction.value}`
      );

      // Get the SVG path element that represents the connector line
      const path = document.getElementById(`connector-${data.id}`);

      // Get the bounding rectangle (position & dimensions) of the elements
      const box1Rect = box1?.getBoundingClientRect();
      const box2Rect = box2?.getBoundingClientRect();

      // If there's no next function connected, draw a line to the output box instead
      if (!data.nextFunction.value) {
        // Get the output path that connects to the final output box
        const pathOutputBox = document.getElementById(
          `connector-output-box-${data.id}`
        );
        const outputBox = document.getElementById("output-box");
        if (outputBox && box1) {
          const outputBoxRect = outputBox.getBoundingClientRect();
          const outputDotRect1 = box1.getBoundingClientRect();

          // Calculate starting and ending coordinates for the connection line
          const xc = outputDotRect1.right; // Starting x-coordinate (right side of box1)
          const xd = outputDotRect1.top + Math.ceil(outputDotRect1?.height / 2); // Center y-coordinate of box1
          const yc = outputBoxRect?.left; // Ending x-coordinate (left side of output box)
          const yd = outputBoxRect?.top + Math.ceil(outputBoxRect?.height / 2); // Center y-coordinate of output box

          // Set the line's start and end points
          if (pathOutputBox?.setAttribute) {
            pathOutputBox.setAttribute("x1", xc?.toString() || "");
            pathOutputBox.setAttribute("y1", xd?.toString() || "");
            pathOutputBox.setAttribute("x2", yc?.toString() || "");
            pathOutputBox.setAttribute("y2", yd?.toString() || "");
          }
        }
        return; // Exit function since there is no next function
      }

      // Special case: If the current function is the first one (id = "1"), connect to the input box
      if (data.id === "1") {
        // Get the input path that connects the main input box to the first function
        const pathInputBox = document.getElementById(
          `connector-input-box-${data.id}`
        );
        const inputBox = document.getElementById("input-box");
        const inputDot1 = document.getElementById(`input-dot-1`);
        if (inputBox && inputDot1) {
          const inputBoxRect = inputBox.getBoundingClientRect();
          const inputDotRect1 = inputDot1.getBoundingClientRect();
          // Calculate start (input box) and end (function input dot) coordinates
          const xa = inputBoxRect.right; // Right side of input box
          const xb = inputBoxRect.top + Math.ceil(inputBoxRect.height / 2); // Center y of input box
          const ya = inputDotRect1.left; // Left side of function input dot
          const yb = inputDotRect1.top + Math.ceil(inputDotRect1.height / 2); // Center y of function input dot

          // Set the line's start and end points
          if (pathInputBox?.setAttribute) {
            pathInputBox.setAttribute("x1", xa?.toString() || "");
            pathInputBox.setAttribute("y1", xb?.toString() || "");
            pathInputBox.setAttribute("x2", ya?.toString() || "");
            pathInputBox.setAttribute("y2", yb?.toString() || "");
          }
        }
      }

      // If both function boxes exist, draw a curved connection between them
      if (box1Rect && box2Rect) {
        // Calculate starting position (output of current function)
        const x1 = box1Rect.right;
        const y1 = box1Rect.top + Math.ceil(box1Rect.height / 2);

        // Calculate ending position (input of next function)
        const x2 = box2Rect.left;
        const y2 = box2Rect.top + Math.ceil(box2Rect.height / 2);

        // Generate a smooth cubic Bezier curve path for the connection
        const pathData = `M ${x1},${y1} C ${x1 + 100},${y1} ${
          x2 - 100
        },${y2} ${x2},${y2}`;

        // Set the "d" attribute of the SVG path to render the curved line
        path?.setAttribute("d", pathData);
      }
    },
    [data]
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const pattern = /^[0-9]*$/;
    if (pattern.test(value)) {
      setInput(event.target.value);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", updateConnectionCallback);
    return () => {
      window.removeEventListener("resize", updateConnectionCallback);
    };
  }, [updateConnectionCallback]);

  useLayoutEffect(() => {
    setTimeout(() => {
      updateConnectionCallback();
    }, 300);
  }, [updateConnectionCallback]);

  return (
    <div className="flex items-end gap-[9px]">
      {!data.input && (
        <div className={`flex flex-col gap-[6px] ${isChecked ? "z-[2]" : ""}`}>
          <div className="pt-[3px] pb-[4px] pl-[11px] pr-[13px] rounded-full text-sm text-white bg-orange w-max">
            Initial value of x
          </div>
          <div className="w-max border-[2px] border-borderOrange flex rounded-[15px] bg-white">
            <input
              className="w-[100px] py-[14px] px-[20px] rounded-[15px] focus-within:outline-none text-lg text-black font-bold"
              value={input}
              onChange={handleInputChange}
            />
            <div className="w-[44px] border-l-[1px] border-l-lightOrange flex items-center justify-center">
              <BlueDot id="input-box" classname="w-[15px] h-[15px]" />
            </div>
          </div>
        </div>
      )}
      <div
        className={`px-[20px] w-[235px] pt-[15px] pb-[22px] bg-white rounded-[15px] shadow-cardShadow border border-borderColor ${
          isChecked ? "z-[2]" : ""
        }`}
      >
        <div className="flex gap-[7px] align-middle">
          <ThreeDots classname="w-[12px]" />
          <h4 className="font-inter text-grey1 text-sm font-semibold">
            Function: {data.id}
          </h4>
        </div>
        <div className="mt-[20px]">
          <label
            htmlFor={`input-${data.id}`}
            className="font-inter text-black1 text-xs font-medium"
          >
            Equation
          </label>
          <input
            id={`input-${data.id}`}
            value={data.equation.value}
            onChange={(event) => onChange(data, event.target.value)}
            className="focus-within:outline-none w-full border border-grey2 rounded-[8px] text-xs font-medium text-black1 font-inter py-[8px] px-[11px]"
          />
        </div>
        <div className="mt-[17px]">
          <label
            htmlFor={`input-${data.id}`}
            className="font-inter text-black1 text-xs font-medium"
          >
            Next function
          </label>
          <input
            id={`input-${data.id}`}
            disabled={data.nextFunction.disabled}
            value={
              data.nextFunction.value
                ? `Function: ${data.nextFunction.value}`
                : "-"
            }
            className=" focus-within:outline-none w-full  border border-grey2 rounded-[8px] text-xs font-medium text-black1 font-inter py-[8px] px-[11px]"
          />
        </div>
        <div className="mt-[45px] flex justify-between items-center">
          <div className="flex items-center gap-[4px]">
            <BlueDot id={`input-dot-${data.id}`} classname="w-[15px] h-[15px]" />
            <p className="text-grey3 text-[10px] font-medium font-inter">
              input
            </p>
          </div>
          <div className="flex items-center gap-[4px]">
            <p className="text-grey3 text-[10px] font-medium font-inter">
              output
            </p>
            <BlueDot id={`output-dot-${data.id}`} classname="w-[15px] h-[15px]" />
          </div>
        </div>
      </div>
      {!data.nextFunction.value && (
        <div className={`flex flex-col gap-[6px] ${isChecked ? "z-[2]" : ""}`}>
          <div className="pt-[3px] pb-[4px] pl-[11px] pr-[13px] rounded-full text-sm text-white bg-green w-max">
            Final Output y
          </div>
          <div className="w-max border-[2px] border-borderGreen flex rounded-[15px] bg-white">
            <div className="w-[44px] border-r-[1px] border-r-lightGreen flex items-center justify-center">
              <BlueDot id="output-box" classname="w-[15px] h-[15px]" />
            </div>
            <input
              className="w-[100px] py-[14px] px-[20px] rounded-[15px] focus-within:outline-none text-lg text-black font-bold"
              value={output}
              disabled
            />
          </div>
        </div>
      )}
        <svg
          width="100%"
          height="100%"
          className={`absolute top-0 left-0 transition-all z-[1] ${
            data.id !== "1" ? "hidden" : "block"
          }`}
        >
          <line
            id={`connector-input-box-${data.id}`}
            stroke="#0066FF4F"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              animation: "draw-line 1s linear forwards",
              animationDelay: "0.5s",
            }}
          />
        </svg>

        <svg
          width="100%"
          height="100%"
          className="absolute transition-all top-0 left-0 z-[1]"
        >
          <path
            id={`connector-${data.id}`}
            stroke="#0066FF4F"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="2000"
            strokeDashoffset="2000"
            style={{
              animation: "draw-path 4s linear forwards",
              animationDelay: "0.5s",
            }}
          />
        </svg>

        <svg
          width="100%"
          height="100%"
          className={`absolute top-0 left-0 z-[1] transition-all ${
            data.nextFunction.value ? "hidden" : "block"
          }`}
        >
          <line
            id={`connector-output-box-${data.id}`}
            stroke="#0066FF4F"
            strokeWidth="5"
            fill="none"
            className="transition-all"
            strokeLinecap="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              animation: "draw-line 1s linear forwards",
              animationDelay: "0.5s",
            }}
          />
        </svg>
    </div>
  );
}

export default Card;
