const MAXFPS = 60;
const TIME_STEP = 1000 / MAXFPS;

var requestAnimationFrame = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : (function () {
    var lastTimestamp = Date.now(),
        now,
        timeout;
    return function (callback) {
        now = Date.now();
        timeout = Math.max(0, TIME_STEP - (now - lastTimestamp));
        lastTimestamp = now + timeout;
        return setTimeout(function () {
            callback(now + timeout);
        }, timeout);
    };
})(),
    cancelAnimationFrame = typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame : clearTimeout;

export class Looper {

    private last: number;
    private lastUpdate: number;
    private frameID: number = 0;
    public delta: number = 0;
    public fps: number = 60;
    public timestep: number = 1000 / MAXFPS;
    public framesThisSecond: number = 0;
    private started: boolean = false;
    private running: boolean = false;

    constructor(
        private update: (dt: number) => void,
        private draw: (it: number) => void,
        private maxFPS: number = MAXFPS
    ) {

    }

    start() {

        let self = this;

        if (!this.started) {
            this.started = true;
            this.frameID = requestAnimationFrame((timestamp) => {
                self.draw(1);
                self.running = true;
                self.last = timestamp;
                self.lastUpdate = timestamp;
                self.framesThisSecond = 0;
                self.frameID = requestAnimationFrame(self._mainLoop.bind(self));
            });
        }
    }

    private _mainLoop(now: number) {
        // Throttle the frame rate.    
        if (now < this.last + this.timestep/*(1000 / this.maxFPS)*/) {
            this.frameID = requestAnimationFrame(this._mainLoop.bind(this));
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

        this.frameID = requestAnimationFrame(this._mainLoop.bind(this));
    }

    panic() {
        this.delta = 0;
    }

    // alternative to mainLoop (in seconds)
    /*t = 0.0;
    dt = 0.01;
    accumulator = 0;
    private _mainLoop2(now: number) {

        let newTime = now;
        let frameTime = (newTime - this.last)/1000;

        if ( frameTime > 0.25 )
            frameTime = 0.25;

        this.last = newTime;

        this.accumulator += frameTime;

        while ( this.accumulator >= this.dt )
        {
            //previousState = currentState;
            //integrate( currentState, t, dt );
            this.update(this.dt*1000);
            this.t += this.dt;
            this.accumulator -= this.dt;
        }

        //let alpha = accumulator / dt;

        //State state = currentState * alpha + 
            //previousState * ( 1.0 - alpha );

        //render( state );
        this.draw(this.accumulator / this.dt);

        this.frameID = requestAnimationFrame(this._mainLoop.bind(this));
    }*/

}