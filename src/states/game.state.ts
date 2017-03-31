import {GameContext} from '../engine/game-context';
import {State} from '../engine/state';

export class GameState extends State {

    public render() {
        // redraw
        this.gameContext.canvas.clearRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height)
        this.gameContext.canvas.beginPath();
        this.gameContext.canvas.fillStyle = '#333';
        //this.gameContext.canvas.fillColor = this.backgroundColor;
        this.gameContext.canvas.fillRect(0, 0, this.gameContext.dimensions.width, this.gameContext.dimensions.height);
        this.gameContext.canvas.fillStyle = 'white';
        this.gameContext.canvas.font = "24pt Courier";
        this.gameContext.canvas.fillText("Game has Started", 120, 100);
    }
}