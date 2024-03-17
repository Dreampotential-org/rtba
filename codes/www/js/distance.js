  
        document.addEventListener('DOMContentLoaded', function () {
            // Example elevation data
            var elevationData = [0,20,30, 40, 40 ,50, 50, 100, 75, 120, 90, 150, 100];

            // Get the canvas element
            var canvas = document.getElementById('elevation-graph');
            var ctx = canvas.getContext('2d');

            // Set the canvas size
            canvas.width = elevationData.length * 40; // Adjust as needed
            canvas.height = 300;

            // Draw the elevation graph
            drawGraph(elevationData, ctx);

            function drawGraph(data, context) {
                var maxElevation = Math.max.apply(null, data);

                for (var i = 0; i < data.length; i++) {
                    var barHeight = (data[i] / maxElevation) * canvas.height;
                    var barWidth = 30; // Adjust as needed
                    var x = i * (barWidth + 1); // Adjust spacing as needed

                    context.fillStyle = '#3498db'; // Blue color, adjust as needed
                    context.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                }
            }
        });
   