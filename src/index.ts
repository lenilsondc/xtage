import {State} from './engine/state';
import {Game} from './engine/game';
import {MainMenuState} from './states/main-menu.state';

class MyGame extends Game {

    constructor() {
        super(document.getElementById('main_window'));
    }

    onStart() {
        this.stateStack.push(new MainMenuState(this.gameContext));
    }
}

var game = new MyGame();