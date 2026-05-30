class Statusbar extends DrawableObject {
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(grr) {
        grr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.ImageCache[path] = img;
        });
    }

    drawValue(ctx, value, x, y) {
        ctx.font = 'normal 40px Luckiest_Guy';
        ctx.fillStyle = 'white';
        ctx.fillText(value, x, y);
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

    }
}