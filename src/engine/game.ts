import {StateList} from './state-list';
import {StateStack} from './state-stack';
import {GameContext} from './game-context';
import {Looper} from './looper';

export abstract class Game {
    // Canvas to draw on
    public canvas_width: number = 600;
    public canvas_height: number = 800;
    public canvasElement: HTMLCanvasElement = null;
    public canvas: CanvasRenderingContext2D = null;
    public looper: Looper;

    public gameContext: GameContext;

    // The game loop
    public FPS: number = 30;
    public timer: number;
    public timerID: number; // interval

    public stateStack: StateStack = new StateStack();

    constructor(wrapper: HTMLElement) {
        this.setupCanvas(wrapper);
        this.timer = 1000 / this.FPS;

        this.gameContext = new GameContext(this);

        this.looper = new Looper(this.update.bind(this), this.draw.bind(this));
        this.startGame();

    }

    private update(dt: number = 1) {
        this.stateStack.update(dt);
    }

    private draw(it: number = 0) {
        this.gameContext.canvas.clearRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height)
        this.stateStack.render(it);
        this.gameContext.canvas.fillStyle = 'white';
        this.gameContext.canvas.font = '10px Courier';
        this.gameContext.canvas.fillText(`ratio: ${it}`, 5, 10);
        this.gameContext.canvas.fillText(`fps  : ${this.looper.fps} fps`, 5, 20);
        this.gameContext.canvas.fillText(`delta: ${this.looper.delta} ms`, 5, 30);
        this.gameContext.canvas.fillText(`fps0 : ${this.looper.framesThisSecond} f`, 5, 40);
        this.gameContext.canvas.fillText(`step : ${this.looper.timestep} ms`, 5, 50);
    }

    public onStart() { }

    public startGame() {

        if (this.onStart)
            this.onStart();

        this.looper.start();
        //this.timerID = setInterval(this.update.bind(this), this.timer);
    }

    private pauseGame() {
       //clearInterval(this.timerID);
    }

    private resumeGame() {
        //this.timerID = setInterval(this.update.bind(this), this.timer);
    }

    /**
     * Initialize the canvas to the page
     */
    private setupCanvas(wrapper: HTMLElement) {
        this.canvasElement = document.createElement("canvas");
        this.canvasElement.width = this.canvas_width;
        this.canvasElement.height = this.canvas_height;
        this.canvas = this.canvasElement.getContext("2d");

        wrapper.appendChild(this.canvasElement);
    }
}

