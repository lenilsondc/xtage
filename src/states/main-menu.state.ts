import { GameContext } from '../engine/game-context';
import { State } from '../engine/state';
import { GameState } from './game.state';


export class MainMenuState extends State {
    public name: string = 'MainMenuState';

    private backgroundColor: string = '#000';
    private textColor = 'rgb(0,0,0)'; // Starts with black
    private colorsArray: string[] = []; // our fade values
    private colorIndex = 0;
    private y = 0;
    private y0 = 0;
    private vy = 0.1;
    private x = 0;
    private x0 = 0;
    private vx = 0.1;
    private text;
    private textMeasure;

    public onEnter() {
        var i = 1, l = 100, values = [];

        for (; i <= l; i++) {
            values.push(Math.round(Math.sin(Math.PI * i / 100) * 255));
        }

        this.colorsArray = values;

        let gameContext = this.gameContext;
        // When the Enter key is pressed go to the next state
        window.onkeydown = function (e) {
            var keyCode = e.keyCode;
            if (keyCode === 13) {
                // Go to next State

                gameContext.gameMode.push(new GameState(gameContext));
                /** Note that this does not remove the current state
                 *  from the list. it just adds Level1State on top of it.
                 */
            }
        };

        this.text = 'Press ENTER to start!';
        this.gameContext.canvas.fillStyle = 'white';//this.textColor;
        this.gameContext.canvas.font = '24pt Courier';
        this.textMeasure = this.gameContext.canvas.measureText(this.text);
        this.textMeasure.height = 24;
    }

    public onExit() {
        // clear the keydown event
        window.onkeydown = null;
    };

    angleSpeed = 0.001;
    angle = 0;

    public update(dt) {
        // update values
        if (this.colorIndex == this.colorsArray.length) {
            this.colorIndex = 0;
        }
        this.textColor = `rgb(${this.colorsArray[this.colorIndex]}, ${this.colorsArray[this.colorIndex]}, ${this.colorsArray[this.colorIndex]})`;
        this.colorIndex++;

        if (this.x < 0 || this.x + this.textMeasure.width >= this.gameContext.dimensions.width) {
            this.vx = -this.vx;
        }

        if (this.y < 0 || this.y + this.textMeasure.height >= this.gameContext.dimensions.height) {
            this.vy = -this.vy;
        }

        //this.angle += this.angleSpeed*dt;
        this.x0 = this.x;
        this.y0 = this.y;
        //this.y = 100 + 50*Math.sin(this.angle);

        this.x += this.vx * dt;
        this.y += this.vy * dt;
    }

    public render(it) {
        // redraw
        this.gameContext.canvas.clearRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height)
        this.gameContext.canvas.beginPath();
        this.gameContext.canvas.fillStyle = this.backgroundColor;
        //this.gameContext.canvas.fillColor = this.backgroundColor;
        this.gameContext.canvas.fillRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height);
        this.gameContext.canvas.fillStyle = 'white';//this.textColor;
        this.gameContext.canvas.font = '24pt Courier';
        this.gameContext.canvas.fillText('Press ENTER to start!', this.x + (this.x - this.x0) * it, this.y + (this.y - this.y0) * it);
    }
}