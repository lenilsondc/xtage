import { GameContext } from '../engine/game-context';

export class State {

    public name: String; // Just to identify the State

    constructor(
        public gameContext: GameContext
    ) { }

    public update(dt: number = 1) { };
    public render(it: number = 0) { };
    public onEnter() { };
    public onExit() { };

    // Optional but useful
    public onPause() { };
    public onResume() { };
}