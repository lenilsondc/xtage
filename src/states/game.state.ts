import { GameContext } from '../engine/game-context';
import { State } from '../engine/state';
import { Cannon } from '../objects/cannon';

export class GameState extends State {

    cannon: Cannon;
    mouse: any = { x: 0, y: 0 };

    constructor(public game: GameContext) {
        super(game);

        this.cannon = new Cannon(game);
    }

    public onEnter() {
        let canvas = this.gameContext.canvas.canvas;
        let self =
            canvas.addEventListener('mousemove', (evt) => {
                var rect = canvas.getBoundingClientRect();
                this.mouse = {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                };
            }, false);
    }

    public update(dt: number) {
        this.cannon.update(dt);
        this.cannon.angle = Math.PI / 2 + Math.atan2(this.mouse.y - this.game.dimensions.height, this.mouse.x - this.game.dimensions.width / 2);
    }

    public render(it: number) {
        this.gameContext.canvas.fillStyle = 'black';
        this.cannon.draw(it);
    }
}