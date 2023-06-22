class Ball {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas
        this.ctx = ctx

        this.drawBall()
    }

    private drawBall() {
        this.ctx.fillStyle = 'red'
        this.ctx.arc(40, 20, 5, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}

class Rectangle {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        width: number,
        heigth: number
    ) {
        this.canvas = canvas
        this.ctx = ctx

        this.drawRectangle(width, heigth)
    }

    private drawRectangle(width: number, heigth: number) {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(20, 10, width, heigth)
    }
}

class BoardGame {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private rectangle: Rectangle
    private ball: Ball

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.ctx = ctx

        this.rectangle = new Rectangle(this.canvas, this.ctx, 150, 100)
        this.ball = new Ball(this.canvas, this.ctx)
    }
}

new BoardGame()
