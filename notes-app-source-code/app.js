d3.select("#new-note")
    .on('submit', function() {
      d3.event.preventDefault();
      var input = d3.select('input');
      d3.select("#notes")
          .append('p')
          .classed('note', true)
          .text(input.property('value'));
      input.property('value', '');
      setPreview('')
    });

d3.select("#remove")
  .on('click', () => {
    d3.selectAll('.note').remove()
  })

d3.select("#lucky")
  .on('click', () => {
    d3.selectAll('.note')
      .style("font-size", () => {
        return `${Math.floor(Math.random() * 40)}px`
      })
  })

d3.select("input")
  .on("input", () => {
    var note = d3.event.target.value
    setPreview(note)
})


function setPreview(val){
  d3.select('.preview-note')
    .text(val)
    .classed('hide', val === '')
}
