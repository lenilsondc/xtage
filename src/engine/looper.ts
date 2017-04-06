export class Looper {

    private last: number;
    private lastUpdate: number;
    private frameID: number = 0;
    private delta: number = 0;
    private fps: number = 60;
    private timestep: number = 1000 / 60;
    private framesThisSecond: number = 0;
    private started: boolean = false;
    private running: boolean = false;

    constructor(
        private update: (dt: number) => void,
        private draw: (it: number) => void,
        private maxFPS: number = 60
    ) {

    }

    start() {
        if (!this.started) {
            this.started = true;
            this.frameID = requestAnimationFrame(function (timestamp) {
                this.draw(1);
                this.running = true;
                this.last = timestamp;
                this.lastUpdate = timestamp;
                this.framesThisSecond = 0;
                this.frameID = requestAnimationFrame(this._mainLoop);
            });
        }
    }

    private _mainLoop(now: number) {
        // Throttle the frame rate.    
        if (now < this.last + (1000 / this.maxFPS)) {
            this.frameID = requestAnimationFrame(this._mainLoop);
            return;
        }
        this.delta += now - this.last;
        this.last = now;

        //begin(now, delta);

        if (now > this.lastUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;

            this.lastUpdate = now;
            this.framesThisSecond = 0;
        }
        this.framesThisSecond++;

        var numUpdateSteps = 0;

        while (this.delta >= this.timestep) {
            this.update(this.timestep);
            this.delta -= this.timestep;
            if (++numUpdateSteps >= 240) {
                this.panic();
                break;
            }
        }

        this.draw(this.delta / this.timestep);

        //this.end(this.fps);

        this.frameID = requestAnimationFrame(this._mainLoop);
    }

    panic() {
        this.delta = 0;
    }

}/*
var box = document.getElementById('box'),
    fpsDisplay = document.getElementById('fpsDisplay'),
    boxPos = 10,
    boxLastPos = 10,
    boxVelocity = 0.08,
    limit = 300,
    lastFrameTimeMs = 0,
    maxFPS = 60,
    delta = 0,
    timestep = 1000 / 60,
    fps = 60,
    framesThisSecond = 0,
    lastFpsUpdate = 0,
    running = false,
    started = false,
    frameID = 0;

function update(delta) {
    boxLastPos = boxPos;
    boxPos += boxVelocity * delta;
    // Switch directions if we go too far
    if (boxPos >= limit || boxPos <= 0) boxVelocity = -boxVelocity;
}

function draw(interp) {
    box.style.left = (boxLastPos + (boxPos - boxLastPos) * interp) + 'px';
    fpsDisplay.textContent = Math.round(fps) + ' FPS';
}

function panic() {
    delta = 0;
}

function begin() {
}

function end(fps) {
    if (fps < 25) {
        box.style.backgroundColor = 'black';
    }
    else if (fps > 30) {
        box.style.backgroundColor = 'red';
    }
}

function stop() {
    running = false;
    started = false;
    cancelAnimationFrame(frameID);
}

function start() {
    if (!started) {
        started = true;
        frameID = requestAnimationFrame(function (timestamp) {
            draw(1);
            running = true;
            lastFrameTimeMs = timestamp;
            lastFpsUpdate = timestamp;
            framesThisSecond = 0;
            frameID = requestAnimationFrame(mainLoop);
        });
    }
}



start();*/