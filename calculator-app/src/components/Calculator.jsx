import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState(""); // Stores the current input expression
  const [result, setResult] = useState(""); // Stores the calculated result
  const data = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "0", "C", "=", "/"];

  // Function to safely calculate the expression
  const calculate = (expression) => {
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, ""); // Remove unsafe characters
    if (sanitizedExpression.includes("/0") && !sanitizedExpression.includes("/0.")) {
      // Handle division by zero
      return sanitizedExpression.includes("0/0") ? "NaN" : "Infinity";
    }

    try {
      // Use the Function constructor to safely evaluate the mathematical expression
      const fn = new Function(`return ${sanitizedExpression}`);
      return fn();
    } catch {
      return "Error"; // Return error in case of any issues in calculation
    }
  };

  const handleOnClick = (value) => {
    if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "=") {
      if (!input) {
        setResult("Error"); // No input case
      } else {
        // Calculate result using the calculate function
        const evalResult = calculate(input);
        setResult(evalResult);
      }
    } else {
      setInput(input + value); // Append value to input expression
    }
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        readOnly
        className="input"
        placeholder="Enter calculation"
      />
      <div className="result">{result}</div>
      <div className="buttons">
        {data.map((ele) => (
          <button key={ele} onClick={() => handleOnClick(ele)}>
            {ele}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
