const width = 500;
const height = 500;
const padding = 50;
const yScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, (d) => d.lifeExpectancy))
                    .range([height - padding, padding])
const xScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, (d) => d.births / d.population))
                    .range([padding, width - padding])
const colorScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, (d) => d.population / d.area))
                    .range(['lightgreen', 'red'])
const sizeScale = d3.scaleLinear()
                    .domain(d3.extent(birthData2011, (d) => d.births))
                    .range([2, 40])
const xAxis = d3.axisBottom(xScale)
                    .tickSize(-height + 2 * padding)
const yAxis = d3.axisLeft(yScale)
                    .tickSize(-width + 2 * padding)



d3.select('svg')
    .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)

d3.select('svg')
    .append('g')
        .attr('transform', 'translate(' + (padding) + ', 0)')
        .call(yAxis)


d3.select('svg')
        .attr('width', width)
        .attr('height', height)
    .selectAll('circle')
    .data(birthData2011)
    .enter()
    .append('circle')
        .attr('cx', (d) => xScale(d.births / d.population))
        .attr('cy', (d) => yScale(d.lifeExpectancy))
        .attr('r', (d) => sizeScale(d.births))
        .attr('fill', (d) => colorScale(d.population / d.area))

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', (height - padding) + 10)
        .attr('dy', '1.5em')
        .style('text-anchor', 'middle')
        .text('Births per Capita');

d3.select('svg')
    .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', - height / 2)
        .attr('y', padding - 10)
        .attr('dy', '-1.1em')
        .style('text-anchor', 'middle')
        .text('Life Expectancy');

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', padding - 10)
        .attr('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Data on Births by Country in 2011');