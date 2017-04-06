import {StateList} from './state-list';
import {StateStack} from './state-stack';
import {GameContext} from './game-context';

export abstract class Game {
    // Canvas to draw on
    public canvas_width: number = 600;
    public canvas_height: number = 800;
    public canvasElement: HTMLCanvasElement = null;
    public canvas: CanvasRenderingContext2D = null;

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
        this.startGame();
    }

    private update() {
        this.stateStack.update();
        this.stateStack.render();
    }

    public onStart() {}

    public startGame() {
        if(this.onStart) this.onStart();
        this.timerID = setInterval(this.update.bind(this), this.timer);
    }

    private pauseGame() {
        clearInterval(this.timerID);
    }

    private resumeGame() {
        this.timerID = setInterval(this.update.bind(this), this.timer);
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

