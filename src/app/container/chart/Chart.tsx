import React, { useEffect, useRef } from 'react';
import { axisBottom, axisLeft, scaleBand, scaleLinear, select } from 'd3';
import { ApproachData } from '../../../interface/asteroid';

interface ChartProps {
  distance: ApproachData[];
}

const Chart = ({ distance }: ChartProps) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!distance || distance.length === 0) return;

    const svg = select(chartRef.current);
    const width = 2000;
    const height = 600;
    const margin = { top: 60, right: 60, bottom: 60, left: 70 };
    const innerWidth = width;
    const innerHeight = height - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = scaleBand()
      .domain(distance.map((d) => d.close_approach_date))
      .range([0, innerWidth])
      .padding(0.2);

    const y = scaleLinear()
      .domain([0, Math.max(...distance.map((d) => Number(d.miss_distance.kilometers)))])
      .range([innerHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    g.append('g').call(axisLeft(y));

    g.selectAll('.bar')
      .data(distance)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.close_approach_date) ?? 0)
      .attr('y', (d) => y(Number(d.miss_distance.kilometers)))
      .attr('width', x.bandwidth())
      .attr('height', (d) => innerHeight - y(Number(d.miss_distance.kilometers)))
      .attr('fill', '#69b3a2');
  }, [distance]);

  return (
    <>
      <p className='text-neutral-950 dark:text-neutral-300'>Historical closest approaches to earth</p>
      <svg ref={chartRef} className='text-neutral-950 dark:text-neutral-300' />
    </>
  );
};

export default Chart;
