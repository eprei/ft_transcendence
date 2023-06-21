class GreenRectangle {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx

        this.drawGreenRectangle()
    }

    private drawGreenRectangle() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(20, 10, 150, 100)
    }
}

class BoardGame {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private greenRectangle: GreenRectangle

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.ctx = ctx

        this.greenRectangle = new GreenRectangle(this.canvas, this.ctx)
    }
}

new BoardGame()
