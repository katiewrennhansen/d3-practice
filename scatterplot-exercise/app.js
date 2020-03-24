// write your code here!
const width = 600;
const height = 600;
const padding = 40;
const xScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.adultLiteracyRate))
                    .range([padding, (width - padding)])
const yScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.extremePovertyRate))
                    .range([(height - padding), padding])
const sizeScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.growthRate))
                    .range([-10, 14])
const colorScale = d3.scaleLinear()
                    .domain(d3.extent(regionData, d => d.growthRate))
                    .range(['#383838', '#03dbfc'])
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisRight(yScale)


d3.select('svg')
    .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)

d3.select('svg')
    .append('g')
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

d3.select('svg')
    .append('text')
        .attr('x', width / 2)
        .attr('y', (height - padding) + 35)
        .attr('text-anchor', 'middle')
        .text('Adult Literacy Rate (%)')

d3.select('svg')
    .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', - height / 2)
        .attr('y', padding)
        .attr('text-anchor', 'middle')
        .text('Extreme Poverty Rate (%)')

