/**
 * 
 */

var options_plot = {				
				series: {
					lines: { show: true }
				},
				grid: {
					hoverable: true,
					clickable: true,
					borderWidth: {
						top: 1,
						right: 1,
						bottom: 2,
						left: 2
					}
				},
				xaxis: {
					mode: "time",
				},
				yaxis: {
					zoomRange: [0, 1000],
					panRange: [-1, 1000]
				},
				zoom: {
				    interactive: true
				},
				pan: {
				    interactive: true
				}
			};

function showTooltip(x, y, contents){
	$('<div id="tooltip">' + contents + '</div>').css({
		position: 'absolute',
		display: 'none',
		top: y + 5,
		left: x + 5,
		border: '1px solid #000',
		padding: '2px',
		'background-color': '#fff',
		opacity: 0.80
	}).appendTo("body").fadeIn(200);
}	