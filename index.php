<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en" dir="ltr">
	<head>
		<title>Marquee V2.0</title>
		<script src="http://code.jquery.com/jquery-1.7.2.js"></script>
		<script src="/demos/marquee/v2.0/marquee.js"></script>
		<script>
			$(document).ready(function() {
				$('#marqueeDiv').marquee();
				$('#setProps').click(function() {
					$('#marqueeDiv').marquee().setProperties({
						"direction" : $('#direction > option:selected').html(),
						"delay" : $('#delay').val(),
						"scrollAmount" : $('#scrollAmount').val(),
						"behavior" : $('#behavior > option:selected').html(),
						"loops" : $('#loops').val()
					}, true);
				});
				$('#start, #stop, #restart, #reset').click(function(e) {
					$('#marqueeDiv').marquee()[$(e.target).prop('id')]();
				});
			});
		</script>
		<style>
			#container {
				width: 600px;
				margin: 0 auto;
			}
			#setProps {
				margin: 0 auto;
			}
			#marqueeDiv {
				border: #000000 solid 1px;
				width: 500px;
				height: 200px;
				margin: 0 auto;
			}
			#buttons {
				text-align: center;
			}
		</style>
	</head>
	<body>
		<div id="container">
			direction: <select id="direction">
				<option>right</option>
				<option>left</option>
				<option>up</option>
				<option>down</option>
			</select><br />
            delay: <input type="number" id="delay" value="85" min="85" /> (integer greater than 84)<br />
			scrollAmount: <input type="number" id="scrollAmount" value="6" min="1" /> (integer greater than 0)<br />
			behavior: <select id="behavior">
				<option>scroll</option>
				<option>slide</option>
				<option>alternate</option>
			</select><br />
			loops: <input type="number" id="loops" value="0" min="0" /> (0 for infinite)<br />
			<br />
			<input type="button" id="setProps" value="Set Properties!" /><br />
			<br />
			<br />
			<div id="marqueeDiv">
				ourText ourText<br />
				ourText ourText
			</div><br />
			<br />
			<div id="buttons">
				<input type="button" id="start" value="start" />
				<input type="button" id="stop" value="stop" />
				<input type="button" id="restart" value="restart" />
				<input type="button" id="reset" value="reset" />
			</div>
		</div>
	</body>
</html>