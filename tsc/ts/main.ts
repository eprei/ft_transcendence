class RedBall {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx

        this.drawRedBall()
    }

    private drawRedBall() {
        this.ctx.fillStyle = 'red'
        this.ctx.arc(40, 20, 5, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}

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
    private redBall: RedBall

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.ctx = ctx

        this.greenRectangle = new GreenRectangle(this.canvas, this.ctx)
        this.redBall = new RedBall(this.canvas, this.ctx)
    }
}

new BoardGame()
