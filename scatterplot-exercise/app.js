// write your code here!
const width = 600;
const height = 600;
const padding = 50;
const xScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.adultLiteracyRate))
                    .range([padding, width - padding])
const yScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.extremePovertyRate))
                    .range([height - padding, padding])
const sizeScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.growthRate))
                    .range([-10, 14])
const colorScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.growthRate))
                    .range(['#383838', '#03dbfc'])
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
        .attr('transform', 'translate(' + padding + ',0)')
        .call(yAxis)


d3.select('svg')
        .attr('width', width)
        .attr('height', height)
    .selectAll('circle')
    .data(regionData)
    .enter()
    .append('circle')
        .attr('cx', d => xScale(d.adultLiteracyRate))
        .attr('cy', d => yScale(d.extremePovertyRate))
        .attr('r', d => sizeScale(d.growthRate))
        .attr('fill', d => colorScale(d.growthRate))
        .attr('stroke', '#000')

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', (height - padding) + 35)
        .style('text-anchor', 'middle')
        .text('Adult Literacy Rate (%)')

d3.select('svg')
    .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', - height / 2)
        .attr('y', padding / 3)
        .style('text-anchor', 'middle')
        .text('Extreme Poverty Rate (%)')

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', padding - 10)
        .attr('font-size', '20px')
        .style('text-anchor', 'middle')
        .text('Literacy Rate vs. Extreme Poverty Rate')

