import { GameContext } from '../engine/game-context';


class Projectile {
    color: string = 'green';
    constructor(
        private game: GameContext
    ) {

    }

    update(dt: number) {
    }

    draw(it: number) {

        let canvas = this.game.canvas;
        canvas.save();

        var x = this.game.dimensions.width / 2,
            y = this.game.dimensions.height - 150,
            // Radii of the white glow.
            innerRadius = 5,
            outerRadius = 30,
            // Radius of the entire circle.
            radius = 20;

        canvas.fillStyle = this.color;
        canvas.arc(x, y, radius, 0, 2 * Math.PI);
        canvas.fill();

        var gradient = canvas.createRadialGradient(x - radius / 3, y - radius / 3, innerRadius, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, .7)');
        gradient.addColorStop(1, this.color);

        canvas.arc(x, y, radius, 0, 2 * Math.PI);

        canvas.fillStyle = gradient;
        canvas.fill();
    }
}

export class Cannon {

    angle: number = 0;
    projectile: Projectile;

    constructor(
        private game: GameContext
    ) {
        this.projectile = new Projectile(game);
    }

    update(dt: number) {
    }

    draw(it: number) {
        let canvas = this.game.canvas;
        let radius = 20, length = 150;
        canvas.fillStyle = 'black';
        canvas.beginPath();
        canvas.arc(this.game.dimensions.width / 2, this.game.dimensions.height, 80, 0, 2 * Math.PI, false);

        canvas.fill();

        canvas.save();

        canvas.translate(this.game.dimensions.width / 2, this.game.dimensions.height);
        canvas.rotate(this.angle);

        canvas.beginPath();
        canvas.rect(
            -radius,
            -length,
            2 * radius,
            length);
        canvas.fill();

        canvas.restore();

        this.projectile.draw(it);
    }
}