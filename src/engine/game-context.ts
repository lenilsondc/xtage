import {StateStack} from './state-stack';
import {Game} from './game';

export class GameContext {

    get canvas(): CanvasRenderingContext2D {
        return this.game.canvas;
    };

    get dimensions(): any {
        return { width: this.game.canvas_width, height: this.game.canvas_height };
    }

    get gameMode(): StateStack {
        return this.game.stateStack;
    }

    constructor(
        private game: Game
    ) { }
}