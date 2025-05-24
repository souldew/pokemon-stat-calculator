import React, { useState } from "react";
import "./EVInputContainer.css";

// 許可値リスト生成関数
const generateAllowedValues = (max = 252) => {
  const values = [0];
  for (let val = 4; val <= max; val += 8) {
    values.push(val);
  }
  return values;
};

const allowedValues = generateAllowedValues();

function findClosestLowerValue(input: number) {
  // allowedValuesは昇順なので、filterで小さいものを抽出し最大値を返す
  const lower = allowedValues.filter((v) => v <= input);
  return lower.length > 0 ? lower[lower.length - 1] : allowedValues[0];
}

export default function SpecialInput() {
  const [value, setValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("0");

  // キーボード操作ハンドリング
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const currentIndex = allowedValues.indexOf(value);

    if (e.key === "ArrowUp") {
      const nextIndex = Math.min(currentIndex + 1, allowedValues.length - 1);
      updateValue(allowedValues[nextIndex]);
      e.preventDefault();
    }

    if (e.key === "ArrowDown") {
      const prevIndex = Math.max(currentIndex - 1, 0);
      updateValue(allowedValues[prevIndex]);
      e.preventDefault();
    }
  };

  // 入力値変更処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    setInputValue(rawValue);
  };

  // フォーカスが外れた時に自動修正
  const handleBlur = () => {
    const numValue = Number(inputValue);
    if (!Number.isFinite(numValue)) {
      updateValue(0);
      return;
    }
    const fixedValue = allowedValues.includes(numValue)
      ? numValue
      : findClosestLowerValue(numValue);
    updateValue(fixedValue);
  };

  // 値更新処理
  const updateValue = (newValue: number) => {
    setValue(newValue);
    setInputValue(newValue.toString());
  };

  return (
    <div className="input-container">
      <input
        type="number"
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        onBlur={handleBlur}
        min={0}
        max={252}
        step={4}
      />
    </div>
  );
}
