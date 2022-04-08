import { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarGraph = ({ data }: { data: object[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const dataNum: number[] = data.map((i: any) => i.column)
  const dataVal: string[] = data.map((i: any) => i.bottom)

  const margin = {
    top: 10, right: 30, bottom: 20, left: 10
  }
  const width = 500;
  const height = 300;
  const graphHeight = height - margin.top - margin.bottom;

  useEffect(() => {
    const svg: any = d3.select(svgRef.current);
    const index = dataNum.map((_, index) => String(index))

    const xScale: any = d3.scaleBand()
      .domain(index)
      .range([margin.left, width - margin.right])

    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(dataVal);
    svg
      .select(".x-axis")
      .style("transform", `translateY(${height - margin.bottom}px)`)
      .call(d3.axisBottom(x));

    const yMaxValue = d3.max(dataNum, d => d) as number;
    const yScale: any = d3.scaleLinear()
      .domain([0, yMaxValue])
      .range([height - margin.bottom, margin.top])

    const yAxis: any = d3.axisRight(yScale);
    svg
      .select(".y-axis")
      .style("transform", `translateX(${width - margin.right}px)`)
      .call(yAxis);
    svg
      .selectAll(".bar")
      .data(dataNum)
      .join("rect")
      .attr("class", "bar")
      .style("transform", "scale(1, -1)")
      .attr("x", (_: any, index: number) => xScale(String(index)))
      .attr("y", -(height - margin.bottom))
      .attr("width", x.bandwidth())
      .transition()
      .attr("fill", "#4A9DFF")
      .attr("height", (value: number) => (graphHeight - yScale(value) > 0 ? graphHeight - yScale(value) + 10 : 0))
  }, [data])

  return (
    <div className="bar-graph">
      <h2 className="title"> Bar Graph </h2>
      <svg ref={svgRef} width={width} height={height}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </div>
  );
}

export default BarGraph;