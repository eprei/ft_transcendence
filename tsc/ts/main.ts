class Ball {
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx

        this.draw()
    }

    public draw() {
        this.ctx.fillStyle = 'red'
        this.ctx.arc(40, 20, 5, 0, Math.PI * 2, true)
        this.ctx.fill()
    }
}

class Rectangle {
    private ctx: CanvasRenderingContext2D
    private _x: number
    private _y: number
    private _heigth: number
    private _width: number

    constructor(ctx: CanvasRenderingContext2D, width: number, heigth: number) {
        this.ctx = ctx

        this._x = 20
        this._y = 10
        this._width = width
        this._heigth = heigth
        this.draw()
    }

    public draw() {
        this.ctx.fillStyle = 'green'
        this.ctx.fillRect(this._x, this._y, this._width, this._heigth)
    }

    public getx(): number {
        return this._x
    }

    public updatex(x: number) {
        this._x = x
        this.draw()
    }
}

class BoardGame {
    private ctx: CanvasRenderingContext2D
    private rectangle: Rectangle
    private ball: Ball
    private _lastTime: number
    private _direction: 'right' | 'left'

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.ctx = ctx

        this.rectangle = new Rectangle(this.ctx, 150, 100)
        this.ball = new Ball(this.ctx)

        this._lastTime = 0
        this._direction = 'right'
        this.loop(0)
    }

    private drawAll() {
        this.ctx.clearRect(0, 0, 2000, 2000)
        this.rectangle.draw()
        this.ball.draw()
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
        switch (this._direction) {
            case 'right':
                this.rectangle.updatex(this.rectangle.getx() + 0.1 * deltaTime)
                break
            case 'left':
                this.rectangle.updatex(this.rectangle.getx() - 0.1 * deltaTime)
                break
        }
        if (this.rectangle.getx() >= 100) this._direction = 'left'
        else if (this.rectangle.getx() <= 20) this._direction = 'right'
        this.drawAll()
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

new BoardGame()
