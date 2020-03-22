const minYear = d3.min(birthData, (d) => d.year);
const maxYear = d3.max(birthData, (d) => d.year);
const maxBirths = d3.max(birthData, (d) => d.births)

const width = 600;
const height = 600;
const numBars = 12;
const barPadding = 10;
const barWidth = width / numBars - 10;

const yScale = d3.scaleLinear()
                    .domain([0, maxBirths])
                    .range([height, 0]);

d3.select('input')
    .property('min', minYear)
    .property('max', maxYear)

d3.select('svg')
    .attr('width', width)
    .attr('height', height)
    .selectAll('rect')
    .data(birthData.filter((d) => d.year === minYear))
    .enter()
    .append('rect')
        .attr('width', barWidth)
        .attr('height', (d) => height - yScale(d.births))
        .attr('y', (d) => yScale(d.births))
        .attr('x', (d, i) => (barWidth + barPadding) * i)
        .attr('fill', 'purple');

d3.select('input')
    .on('input', () => {
        const year = +d3.event.target.value;
        d3.selectAll('rect')
            .data(birthData.filter((d) => d.year === year))
            .attr('height', (d) => height - yScale(d.births))
            .attr('y', (d) => yScale(d.births))
    })
    

