class ThrowableObject extends MoveableObject {

    height = 50;
    width = 50;
    acceleration = 1;

    constructor(x, y) {
        super().loadImage('assets/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
        this.x = x;
        this.y = y;
        this.throw();
    }

    throw() {
        let throwId = setInterval(() => {
            this.x += 15;
        }, 1000 / 30);

        intervalIds.push(throwId);
    }
}