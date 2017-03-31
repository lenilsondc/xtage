import {GameContext} from '../engine/game-context';
import {State} from '../engine/state';
import {GameState} from './game.state';

export class MainMenuState extends State {
    public name: String = 'MainMenuState';

    private backgroundColor: String = '#000';
    private textColor = 'rgb(0,0,0)'; // Starts with black
    private colorsArray: String[] = []; // our fade values
    private colorIndex = 0;

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
    }

    public onExit() {
        // clear the keydown event
        window.onkeydown = null;
    };

    public update() {
        // update values
        if (this.colorIndex == this.colorsArray.length) {
            this.colorIndex = 0;
        }
        this.textColor = `rgb(${this.colorsArray[this.colorIndex]}, ${this.colorsArray[this.colorIndex]}, ${this.colorsArray[this.colorIndex]})`;
        this.colorIndex++;
    }

    public render() {
        // redraw
        this.gameContext.canvas.clearRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height)
        this.gameContext.canvas.beginPath();
        this.gameContext.canvas.fillStyle = this.backgroundColor;
        //this.gameContext.canvas.fillColor = this.backgroundColor;
        this.gameContext.canvas.fillRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height);
        this.gameContext.canvas.fillStyle = this.textColor;
        this.gameContext.canvas.font = '24pt Courier';
        this.gameContext.canvas.fillText('Press ENTER to start!', 120, 100);
    }
}