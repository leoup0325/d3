import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { useD3 } from "../hooks/useD3";

const ChartGauge = ({ gaugeMaxValue, impact }) => {
  const [width, setWidth] = useState(200);

  const ref = useRef();
  const chartRef = useD3(
    (el) => {
      let value;
      if (impact === 12) {
        value = impact - 0.453;
      } else if (impact === 1) {
        value = impact - 0.5;
      } else {
        value = impact - 0.475;
      }

      let barWidth,
        chart,
        chartInset,
        degToRad,
        repaintGauge,
        height,
        margin,
        padRad,
        percToDeg,
        percToRad,
        percent,
        radius,
        svg,
        totalPercent;

      percent = value / gaugeMaxValue;
      padRad = 0.025;
      chartInset = 10;

      // Orientation of Gauge:
      totalPercent = 0.75;

      margin = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };

      // width = el[0][0].offsetWidth - margin.left - margin.right;
      height = width;
      radius = Math.min(width, height) / 2;
      barWidth = (40 * width) / 300;

      // Utility methods
      percToDeg = function (perc) {
        return perc * 360;
      };

      percToRad = function (perc) {
        return degToRad(percToDeg(perc));
      };

      degToRad = function (deg) {
        return (deg * Math.PI) / 180;
      };

      // Create SVG element
      svg = el
        .attr("width", width + margin.left + margin.right)
        .attr("height", height / 1.8 + margin.top + margin.bottom); // height/1.5 To Remove Extra Bottom Space

      // Add layer for the panel
      chart = svg
        .append("g")
        .attr(
          "transform",
          "translate(" +
            (width + margin.left) / 2 +
            ", " +
            (height + margin.top) / 2 +
            ")"
        );

      const arcs = [];

      for (let i = 0; i < 12; i++) {
        chart.append("path").attr("class", `arc chart-${i + 1}`);
        arcs.push(
          d3
            .arc()
            .outerRadius(radius - chartInset)
            .innerRadius(radius - chartInset - barWidth)
        );
      }

      repaintGauge = function () {
        /*perc = 0.5;*/
        const perc = 0.5;
        let next_start = totalPercent;
        let arcStartRad = percToRad(next_start);
        let arcEndRad = arcStartRad + percToRad(perc / 12);
        next_start += perc / 12;
        for (let i = 0; i < 12; i++) {
          arcs[i].startAngle(arcStartRad + padRad).endAngle(arcEndRad);

          arcStartRad = percToRad(next_start);
          arcEndRad = arcStartRad + percToRad(perc / 12);
          next_start += perc / 12;
          chart.select(`.chart-${i + 1}`).attr("d", arcs[i]);
        }
      };

      const Needle = (function () {
        //Helper function that returns the `d` value for moving the needle
        const recalcPointerPos = function (perc) {
          let centerX,
            centerY,
            leftX,
            leftY,
            rightX,
            rightY,
            thetaRad,
            topX,
            topY;
          thetaRad = percToRad(perc / 2);
          centerX = 0;
          centerY = 0;
          topX = centerX - this.len * Math.cos(thetaRad);
          topY = centerY - this.len * Math.sin(thetaRad);
          leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
          leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
          rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
          rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
          return (
            "M " +
            leftX +
            " " +
            leftY +
            " L " +
            topX +
            " " +
            topY +
            " L " +
            rightX +
            " " +
            rightY
          );
        };

        class Needle {
          constructor(el) {
            this.el = el;
            this.len = width / 2.5;
            this.radius = this.len / 8;
          }

          render() {
            this.el
              .append("circle")
              .attr("class", "needle-center")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", this.radius);
            return this.el
              .append("path")
              .attr("class", "needle")
              .attr("id", "client-needle")
              .attr("d", recalcPointerPos.call(this, 0));
          }
          moveTo(perc) {
            let self,
              oldValue = this.perc || 0;
            this.perc = perc;
            self = this;

            // Reset pointer position
            this.el
              .transition()
              .delay(100)
              .ease(d3.easeQuad)
              .duration(200)
              .select(".needle")
              .tween("reset-progress", function () {
                return function (percentOfPercent) {
                  let progress = (1 - percentOfPercent) * oldValue;
                  repaintGauge(progress);
                  return d3
                    .select(this)
                    .attr("d", recalcPointerPos.call(self, progress));
                };
              });

            this.el
              .transition()
              .delay(300)
              .ease(d3.easeBounce)
              .duration(1500)
              .select(".needle")
              .tween("progress", function () {
                return function (percentOfPercent) {
                  let progress = percentOfPercent * perc;

                  repaintGauge(progress);
                  return d3
                    .select(this)
                    .attr("d", recalcPointerPos.call(self, progress));
                };
              });
          }
        }
        return Needle;
      })();

      let needle = new Needle(chart);
      needle.render();
      needle.moveTo(percent);
    },
    [width]
  );

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, []);

  return (
    <div className="mx-auto mt-2" ref={ref}>
      <svg ref={chartRef} />
    </div>
  );
};

export default ChartGauge;
