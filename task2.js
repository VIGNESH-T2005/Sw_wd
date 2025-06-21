 let isRunning = false;
        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval;
        let lapCount = 0;

        function formatTime(ms) {
            let milliseconds = Math.floor((ms % 1000));
            let seconds = Math.floor((ms / 1000) % 60);
            let minutes = Math.floor((ms / (1000 * 60)) % 60);
            let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
        }

        function updateDisplay() {
            elapsedTime = Date.now() - startTime;
            document.getElementById('display').textContent = formatTime(elapsedTime);
        }

        function startPause() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateDisplay, 10);
                document.getElementById('startPauseBtn').textContent = 'Pause';
                document.getElementById('startPauseBtn').style.backgroundColor = '#ff9800';
                document.getElementById('startPauseBtn').style.color = 'white';
                isRunning = true;
            } else {
                clearInterval(timerInterval);
                document.getElementById('startPauseBtn').textContent = 'Start';
                document.getElementById('startPauseBtn').style.backgroundColor = '#4CAF50';
                isRunning = false;
            }
        }

        function reset() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            lapCount = 0;
            document.getElementById('display').textContent = '00:00:00.000';
            document.getElementById('startPauseBtn').textContent = 'Start';
            document.getElementById('startPauseBtn').style.backgroundColor = '#4CAF50';
            document.getElementById('laps').innerHTML = '';
        }

        function lap() {
            if (isRunning) {
                lapCount++;
                const lapTime = formatTime(elapsedTime);
                const lapElement = document.createElement('div');
                lapElement.className = 'lap-item';
                lapElement.textContent = `Lap ${lapCount}: ${lapTime}`;
                document.getElementById('laps').prepend(lapElement);
            }
        }

        // Keyboard support for accessibility
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                event.preventDefault();
                startPause();
            } else if (event.code === 'KeyR') {
                reset();
            } else if (event.code === 'KeyL') {
                lap();
            }
        });