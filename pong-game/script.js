<!DOCTYPE html>
<html>
<head>
	<title>Pong Game</title>
	<style>
		canvas {
			border: 1px solid black;
			background-color: #f2f2f2;
		}
	</style>
</head>
<body>
	<canvas id="myCanvas" width="800" height="500"></canvas>

	<script>
		// get canvas element and context
		var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");

		// set ball position and velocity
		var ballX = canvas.width / 2;
		var ballY = canvas.height / 2;
		var ballDX = 5;
		var ballDY = 5;

		// set paddle positions and dimensions
		var paddleHeight = 100;
		var paddleWidth = 10;
		var paddleLeftY = (canvas.height - paddleHeight) / 2;
		var paddleRightY = paddleLeftY;

		// set key input state
		var keysPressed = {};

		// listen for keydown and keyup events
		document.addEventListener("keydown", function(event) {
			keysPressed[event.key] = true;
		});

		document.addEventListener("keyup", function(event) {
			keysPressed[event.key] = false;
		});

		// draw ball
		function drawBall() {
			ctx.beginPath();
			ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
			ctx.fillStyle = "black";
			ctx.fill();
			ctx.closePath();
		}

		// draw paddles
		function drawPaddles() {
			// left paddle
			ctx.fillRect(10, paddleLeftY, paddleWidth, paddleHeight);

			// right paddle
			ctx.fillRect(canvas.width - paddleWidth - 10, paddleRightY, paddleWidth, paddleHeight);
		}

		// draw net
		function drawNet() {
			for (var i = 0; i < canvas.height; i += 40) {
				ctx.fillRect(canvas.width / 2 - 2, i, 4, 20);
			}
		}

		// update game state and redraw canvas
		function update() {
			// update ball position
			ballX += ballDX;
			ballY += ballDY;

			// check for ball collision with top or bottom wall
			if (ballY < 10 || ballY > canvas.height - 10) {
				ballDY = -ballDY;
			}

			// check for ball collision with left or right paddle
			if (ballX < 20 && ballY > paddleLeftY && ballY < paddleLeftY + paddleHeight) {
				ballDX = -ballDX;
			} else if (ballX > canvas.width - 20 - paddleWidth && ballY > paddleRightY && ballY < paddleRightY + paddleHeight) {
				ballDX = -ballDX;
			}

			// update paddle positions based on keyboard input
			if (keysPressed["w"] && paddleLeftY > 0) {
				paddleLeftY -= 5;
			}
			if (keysPressed["s"] && paddleLeftY < canvas.height - paddleHeight) {
				paddleLeftY += 5;
			}
			if (keysPressed["ArrowUp"] && paddleRightY > 0) {
				paddleRightY -= 5;
			}
			if (keysPressed["ArrowDown"]