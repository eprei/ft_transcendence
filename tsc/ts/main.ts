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

        this.ball = new Ball(this.ctx)
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

        this._lastTime = time
        this.drawAll()
        window.requestAnimationFrame(this.loop.bind(this))
    }
}

new BoardGame()
