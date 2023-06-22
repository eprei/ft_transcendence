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
    private _x: number
    private _y: number
    private _heigth: number
    private _width: number

    constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        width: number,
        heigth: number
    ) {
        this.canvas = canvas
        this.ctx = ctx

        this._x = 20
        this._y = 10
        this._width = width
        this._heigth = heigth
        this.drawRectangle()
    }

    private drawRectangle() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this._x, this._y, this._width, this._heigth)
    }

    public getx(): number {
        return this._x
    }

    public updatex(x: number) {
        this._x = x
        this.drawRectangle()
    }
}

class BoardGame {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private rectangle: Rectangle
    private ball: Ball
    private _lastTime: number

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.ctx = ctx

        this.rectangle = new Rectangle(this.canvas, this.ctx, 150, 100)
        this.ball = new Ball(this.canvas, this.ctx)

        this._lastTime = 0
        this.loop(0)
    }

    private loop(time: number) {
        const deltaTime: number = time - this._lastTime
        console.log(
            'loop -- ' +
                time +
                ' x ' +
                this.rectangle.getx() +
                ' delta ' +
                deltaTime
        )
        this._lastTime = time
        this.rectangle.updatex(this.rectangle.getx() + deltaTime)
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

new BoardGame()
