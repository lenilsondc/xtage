import { State } from './engine/state';
import { Game } from './engine/game';
import { MainMenuState } from './states/main-menu.state';
import { GameState } from './states/game.state';

class MyGame extends Game {

    constructor() {
        super(document.getElementById('main_window'));
    }

    onStart() {
        this.stateStack.push(new GameState(this.gameContext));
    }
}

var game = new MyGame();