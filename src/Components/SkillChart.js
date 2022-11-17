import * as d3 from "d3";
import { useD3 } from "../hooks/useD3";

const SkillChart = ({ title, value, maxValue = 9 }) => {
  const ref = useD3(
    (svg) => {
      let data = [],
        bar_width = 13,
        bar_padding = 2,
        svg_width = (bar_width + bar_padding) * maxValue,
        svg_height = 85;

      for (let i = 1; i <= maxValue; i++) {
        data.push(i);
      }

      const scale = d3
        .scaleLinear()
        .domain([0, d3.max(data)])
        .range([svg_height, 0]);

      svg.attr("width", svg_width).attr("height", svg_height);

      const bar = svg
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
          return "translate(" + i * (bar_width + bar_padding) + ",0)";
        });

      bar
        .append("rect")
        .attr("y", function (d) {
          return scale(d);
        })
        .attr("width", bar_width)
        .attr("height", function (d) {
          return svg_height - scale(d);
        })
        .attr("style", function (d) {
          if (d > value) {
            return "fill: #e0e0e0";
          }
        });
    },
    [maxValue]
  );
  return (
    <>
      <div className="graphic gr1 jc">
        <svg ref={ref} />
      </div>
      <p className="ffm gc text-center">{title}</p>
    </>
  );
};

export default SkillChart;
