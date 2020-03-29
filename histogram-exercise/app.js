const width = 600;
const height = 600;
const barPadding = 5;
const padding = 20;
const regionDataValues = ["adultLiteracyRate", "subscribersPer100", "growthRate", "urbanPopulationRate", "extremePovertyRate", "medianAge"]
let index = 0;

let minLiteracy = d3.min(regionData, d => d[regionDataValues[index]]);
let maxLiteracy = d3.max(regionData, d => d[regionDataValues[index]]);
let literacyData = regionData.filter(d => d[regionDataValues[index]] === minLiteracy);


let xScale = d3.scaleLinear()
                    .domain([0, d3.max(regionData, d => d[regionDataValues[index]])])
                    .rangeRound([padding, width - padding])

let histogram = d3.histogram()
                        .domain(xScale.domain())
                        .thresholds(xScale.ticks())
                        .value(d => d[regionDataValues[index]])

let bins = histogram(regionData)

let yScale = d3.scaleLinear()
                    .domain([0, d3.max(bins, d => d.length)])
                    .range([height, 0])

const xAxis = d3.axisBottom(xScale)
                    // .tickSize(-height + 2 * padding)
const yAxis = d3.axisLeft(yScale)
                    // .tickSize(-width + 2 * padding)

d3.select('svg')
    .append('g')
        .attr('transform', 'translate(0,' + (height - padding) + ')')
        .call(xAxis)

d3.select('svg')
    .append('g')
        .attr('transform', 'translate(' + padding + ',0)')
        .call(yAxis)


let bars = d3.select('svg')
                .attr('height', height)
                .attr('width', width)
            .selectAll('.bar')
            .data(bins)
            .enter()
            .append('g')
                .classed('bar', true)
                .attr('fill', '#c00')

bars.append('rect')
        .attr('x', d => xScale(d.x0))
        .attr('y', d => yScale(d.length) - padding)
        .attr('width', d => {
            const width = xScale(d.x1) - xScale(d.x0) - barPadding;
            return width < 0 ? '50px' : width; 
        })        .attr('height', d => height - yScale(d.length))

bars.append('text')
        .text(d => `height: ${d.length}`)
        .attr('x', - height + 30)
        .attr('y', d => (xScale(d.x1) + xScale(d.x0)) / 2)
        .attr('transform', 'rotate(-90)')
        .attr('fill', '#000')


d3.select('svg')
    .append('text')
        .classed('text', true)
        .text([regionDataValues[index]])
        .attr('y', 0 + padding)
        .attr('x', width / 2.3)
        .attr('font-size', '20px')
    

d3.select('input')
    .property('min', 0)
    .property('max', regionDataValues.length - 1)
    .property('value', 0)
    .on('input', () => {
        const inputIndex = d3.event.target.value;
        index = inputIndex
        minLiteracy = d3.min(regionData, d => d[regionDataValues[index]]);
        maxLiteracy = d3.max(regionData, d => d[regionDataValues[index]]);
        xScale.domain([0, d3.max(regionData, d => d[regionDataValues[index]])])
        histogram = d3.histogram()
                        .domain(xScale.domain())
                        .thresholds(xScale.ticks())
                        .value(d => d[regionDataValues[index]])
        bins = histogram(regionData)
        yScale.domain([0, d3.max(bins, d => d.length)])

        d3.select('svg')
            .select('.text')
                .text([regionDataValues[index]])

        bars = d3.select('svg')
            .selectAll('.bar')
            .data(bins)

        bars
            .exit()
            .remove();

        const g = bars  
            .enter()
            .append('g')
                .classed('bar', true)

        g.append('rect')
        g.append('text')

        g.merge(bars)
            .select('rect')
            .attr('x', d => xScale(d.x0))
            .attr('y', d => yScale(d.length) - padding)
            .attr('height', d => height - yScale(d.length))
            .attr('width', d => {
                const width = xScale(d.x1) - xScale(d.x0) - barPadding;
                return width < 0 ? '50px' : width; 
            })
            .attr('fill', '#c00')

        g.merge(bars)
            .select('text')
            .text(d => `height: ${d.length}`)
            .attr('x', - height + 30)
            .attr('y', d => (xScale(d.x1) + xScale(d.x0)) / 2)
            .attr('transform', 'rotate(-90)')
            .attr('fill', '#000')
    })