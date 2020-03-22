//clear data with reset button
d3.select('#reset').on('click', () => {
    d3.selectAll('.letter')
        .remove()

    d3.select('h2')
        .text('')

    d3.select('h4')
        .text('')
})


//grab data from form and display visualization on the page
d3.select('form').on('submit', () => {
    d3.event.preventDefault()
    const input = d3.select('input')
    const val = input.property('value')
    var data = makeData(val)
    input.property('value', '')
    d3.select('h2')
        .text(val)

    d3.select('h4')
        .text(`Length: ${val.length}`)

    var letters = d3.select('#letters')
        .selectAll('.letter')
        .data(data, d => d.letter)
    
    letters
        .classed('new', false)
        .exit()
        .remove();

    letters
        .enter()
        .append('div')
            .classed('letter', true)
            .classed('new', true)
        .merge(letters)
            .text(d => d.letter)
            .style('margin', '3px')
            .style('padding', '5px 10px')
            .style('height', d => `${20 * d.count}px`)     
})


//build object to use in visualization
function makeData(val){
    let data = []
    const arr = Array.from(val).sort()
    arr.map(l => {
        if(!data.find(d => d.letter === l)){
            data.push({ letter: l, count: 1 })
        } else {
            data.find(d => {
                if(d.letter === l){
                    d.count++
                }
            })
        }
    })
    return data
}