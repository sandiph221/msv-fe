import React, { useEffect } from "react";
import { useState } from "react";
import ReactWordcloud from "react-wordcloud";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

export const BubbleChart = ({ chartData }) => {
  const [emojisData, setEmojisData] = useState([]);

  const options = {
    enableTooltip: true,
    deterministic: true,
    enableOptimizations: true,
    fontSizes: [9, 90],
    padding: 50,
    rotations: 0,
    rotationAngles: [0, 0],
    scale: "sqrt",
    spiral: "rectangular",
    transitionDuration: 1000
  };

  useEffect(() => {
    if (chartData) {
      setEmojisData([]);
      let chartSortData = chartData
      
        for (let i = 0; i < chartSortData.length; i++) {
          if (chartSortData[i]) {
            let emojiData = {
              text: chartSortData[i].emoji,
              value: chartSortData[i].count,
            };
  
            setEmojisData((prevState) => [...prevState, emojiData]);
          }
        }
    
      
    }
  }, [chartData]);

  return (
    <div id="word-cloud" style={{ minHeight: "100%" }}>
      <ReactWordcloud options={options} words={emojisData} />
     
    </div>
  );
};
