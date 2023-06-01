import React, { useEffect, useState } from "react";

function Test() {
  const [selectedOption, setSelectedOption] = useState("select...");
  const [andSelect, setAndSelect] = useState("select...");
  const [andSelect2, setAndSelect2] = useState("select...");
  const [andMy, setAndMy] = useState("My Arg");
  const [andMy2, setAndMy2] = useState("My Arg");
  const [selectConst, setSelectConst] = useState("false");
  const [result, setResult] = useState("");
  const [selected2Option, setSelected2Option] = useState("My Arg");
  const [args, setArgs] = useState([
    {
      option: "My Arg",
      value: "false",
    },
  ]);

  const [dropdownValues, setDropdownValues] = useState([""]);
  const handleAddSelect = () => {
    setDropdownValues((prevValues) => [...prevValues, ""]);
  };

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    value === "constant"
      ? setResult("false")
      : value === "argument"
      ? setResult("false")
      : setResult("");
  };

  const handleConstChange = (event) => {
    const { value } = event.target;
    setSelectConst(value);
    value === "true" ? setResult("true") : setResult("false");
  };

  const handleAddArg = () => {
    setArgs((prevArgs) => [
      ...prevArgs,
      {
        option: "",
        value: "false",
      },
    ]);
  };

  const handleArgChange = (index, value) => {
    setArgs((prevArgs) => {
      const updatedArgs = [...prevArgs];
      updatedArgs[index].option = value;
      return updatedArgs;
    });
  };

  const handleAllArg = (e, index) => {
    const newValue = e.target.value;
    setArgs((prevArgs) => {
      const updatedArgs = [...prevArgs];
      updatedArgs[index].value = newValue;
      return updatedArgs;
    });
  };

  useEffect(() => {
    if (selectedOption === "argument") {
      const matchingArg = args.find((arg) => arg.option === selected2Option);
      if (matchingArg) {
        setResult(matchingArg.value);
      } else {
        setResult("");
      }
    }
  }, [args, selected2Option, selectedOption]);

  useEffect(() => {
    if (andSelect === "argument" || andSelect2 === "argument") {
      const matchingArg1 = args.find((arg) => arg.option === andMy);
      const matchingArg2 = args.find((arg) => arg.option === andMy2);
      const isMatchingArg1True = matchingArg1 && matchingArg1.value === "true";
      const isMatchingArg2True = matchingArg2 && matchingArg2.value === "true";
      const isAnyMatchingArgTrue = isMatchingArg1True || isMatchingArg2True;
      if (selectedOption === "and") {
        if (isMatchingArg1True && isMatchingArg2True) {
          setResult("true");
        } else if (!isMatchingArg1True && !isMatchingArg2True) {
          setResult("false");
        } else {
          setResult("");
        }
      }
      if (selectedOption === "or") {
        setResult(isAnyMatchingArgTrue ? "true" : "false");
      }
    }
  }, [args, andMy, andMy2, andSelect, andSelect2, selectedOption]);

  return (
    <>
      <div className="absolute left-[45%] top-[10%] bg-[#DAD7D7] p-12">
        <div>
          {args.map((arg, index) => {
            return (
              <div key={arg.option}>
                <input
                  key={index}
                  type="text"
                  value={arg.option}
                  onChange={(e) => handleArgChange(index, e.target.value)}
                  className="p-1 border-2 border-[#000] rounded mr-2"
                />
                <select
                  onChange={(e) => handleAllArg(e, index)}
                  value={arg.value}
                  className="p-1 border-2 border-[#000] rounded"
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </div>
            );
          })}
          <button
            className="border-2 border-[#000] bg-[#fff] rounded my-2 px-2"
            onClick={() => handleAddArg()}
          >
            + add arg
          </button>
        </div>
        <div>
          {selectedOption === "constant" ? (
            <select
              value={selectConst}
              onChange={handleConstChange}
              className="p-1 border-2 border-[#000] rounded"
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          ) : selectedOption === "argument" ? (
            <select
              onChange={(e) => setSelected2Option(e.target.value)}
              className="p-1 border-2 border-[#000] rounded"
            >
              {args.map((val) => {
                return <option key={val.option}>{val.option}</option>;
              })}
            </select>
          ) : (
            <select
              value={selectedOption}
              onChange={handleSelectChange}
              className="p-1 border-2 border-[#000] rounded"
            >
              <option value="select..">select..</option>
              <option value="constant">constant</option>
              <option value="argument">argument</option>
              <option value="and">and</option>
              <option value="or">or</option>
            </select>
          )}
          <button
            className="ml-4 border-2 border-[#000] rounded my-2 px-2 bg-[#fff]"
            onClick={() => (setSelectedOption(""), setResult(""))}
          >
            x
          </button>
        </div>
        <div className="flex flex-col w-[104px]">
          {selectedOption === "and" || selectedOption === "or" ? (
            <div>
              <div className="flex pb-2">
                {andSelect === "argument" ? (
                  <select
                    value={andMy}
                    onChange={(e) => setAndMy(e.target.value)}
                    className="p-1 border-2 border-[#000] rounded"
                  >
                    {args.map((val) => {
                      return <option key={val.option}>{val.option}</option>;
                    })}
                  </select>
                ) : andSelect === "constant" ? (
                  <select
                    value={selectConst}
                    onChange={handleConstChange}
                    className="p-1 border-2 border-[#000] rounded"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                ) : (
                  <select
                    className="p-1 border-2 border-[#000] rounded"
                    value={andSelect}
                    onChange={(e) => setAndSelect(e.target.value)}
                  >
                    <option value="select..">select..</option>
                    <option value="constant">constant</option>
                    <option value="argument">argument</option>
                    <option value="and">and</option>
                    <option value="or">or</option>
                  </select>
                )}
                <button
                  className="ml-4 border-2 border-[#000] rounded my-2 px-2 bg-[#fff]"
                  onClick={() => setAndSelect("")}
                >
                  x
                </button>
              </div>
              <div className="flex">
                {andSelect2 === "argument" ? (
                  <select
                    value={andMy2}
                    onChange={(e) => setAndMy2(e.target.value)}
                    className="p-1 border-2 border-[#000] rounded"
                  >
                    {args.map((val) => {
                      return <option key={val.option}>{val.option}</option>;
                    })}
                  </select>
                ) : andSelect2 === "constant" ? (
                  <select
                    value={selectConst}
                    onChange={handleConstChange}
                    className="p-1 border-2 border-[#000] rounded"
                  >
                    <option value="false">false</option>
                    <option value="true">true</option>
                  </select>
                ) : (
                  <select
                    className="p-1 border-2 border-[#000] rounded"
                    value={andSelect2}
                    onChange={(e) => setAndSelect2(e.target.value)}
                  >
                    <option value="select..">select..</option>
                    <option value="constant">constant</option>
                    <option value="argument">argument</option>
                    <option value="and">and</option>
                    <option value="or">or</option>
                  </select>
                )}
                <button
                  className="ml-4 border-2 border-[#000] rounded my-2 px-2 bg-[#fff]"
                  onClick={() => setAndSelect2("")}
                >
                  x
                </button>
              </div>
              <button
                className="border-2 border-[#000] rounded my-2 px-2 bg-[#fff]"
                onClick={handleAddSelect}
              >
                + add op
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-center">
          <label className="text-xl text-center font-normal">result :</label>
          <span className="text-xl font-bold ml-2">
            {result ? result : "undefined"}
          </span>
        </div>
      </div>
    </>
  );
}

export default Test;
