class Ball {
    private _ctx: CanvasRenderingContext2D
    private _x: number
    private _y: number
    private _radius: number
    private _stopTop: number
    private _stopBottom: number
    private _stopLeft: number
    private _stopRight: number
    private _speed: number
    private _dx: number
    private _dy: number

    constructor(
        ctx: CanvasRenderingContext2D,
        canvaWidth: number,
        canvaHeight: number
    ) {
        this._ctx = ctx
        this._x = canvaWidth / 2
        this._y = canvaHeight / 2
        this._radius = 10
        this._stopTop = 0
        this._stopBottom = canvaHeight - this._radius
        this._stopLeft = 0
        this._stopRight = canvaWidth - this._radius
        this._speed = 0.5
        this._dx = 0.5
        this._dy = 0.1

        this.draw()
    }

    public draw() {
        this._ctx.fillStyle = 'red'
        this._ctx.beginPath()
        this._ctx.arc(this._x, this._y, this._radius, 0, Math.PI * 2, true)
        this._ctx.fill()
    }

    public move(deltaTime: number) {
        this._x += this._dx * deltaTime * this._speed
        this._y += this._dy * deltaTime * this._speed

        if (this._y > this._stopBottom) {
            this._dy = -this._dy
            this._y = this._stopBottom
        }
        if (this._y < this._stopTop) {
            this._dy = -this._dy
            this._y = this._stopTop
        }
        if (this._x > this._stopRight) {
            this._dx = -this._dx
            this._x = this._stopRight
        }
        if (this._x < this._stopLeft) {
            this._dx = -this._dx
            this._x = this._stopLeft
        }
    }
}

class Racket {
    private _ctx: CanvasRenderingContext2D
    private _x: number
    private _y: number
    private _heigth: number
    private _width: number
    private _stopTop: number
    private _stopBottom: number
    private _speed: number = 0.1
    private _state: 'rising' | 'downhilling' | 'stand'

    constructor(ctx: CanvasRenderingContext2D) {
        this._ctx = ctx

        this._x = 20
        this._y = 10
        this._width = 10
        this._heigth = 50
        this._stopTop = 0
        this._stopBottom = 300 - this._heigth
        this._state = 'stand'
        this.draw()
    }

    public draw() {
        this._ctx.fillStyle = 'green'
        this._ctx.fillRect(this._x, this._y, this._width, this._heigth)
    }

    public rise() {
        this._state = 'rising'
    }

    public downhill() {
        this._state = 'downhilling'
    }

    public move(deltaTime: number) {
        switch (this._state) {
            case 'rising':
                this._y -= this._speed * deltaTime
                break
            case 'downhilling':
                this._y += this._speed * deltaTime
                break
        }

        if (this._y > this._stopBottom) this._y = this._stopBottom
        if (this._y < this._stopTop) this._y = this._stopTop
    }
}

class BoardGame {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    private left: Racket
    private ball: Ball
    private _lastTime: number
    private racket: Racket

    constructor() {
        let canvas = document.getElementById('boardGame') as HTMLCanvasElement
        let ctx = canvas.getContext('2d')

        this.canvas = canvas
        this.ctx = ctx

        this.ball = new Ball(this.ctx, this.canvas.width, this.canvas.height)
        this.racket = new Racket(this.ctx)

        this._lastTime = 0
        this.initInput()
        this.loop(0)
    }

    private drawAll() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ball.draw()
        this.racket.draw()
    }

    private initInput() {
        window.addEventListener('keydown', (e) => {
            if (e.key === 'l') this.racket.rise()
            if (e.key === 'k') this.racket.downhill()
        })
    }

    private loop(time: number) {
        const deltaTime: number = time - this._lastTime

        this.racket.move(deltaTime)
        this.ball.move(deltaTime)

        this._lastTime = time
        this.drawAll()
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

new BoardGame()
