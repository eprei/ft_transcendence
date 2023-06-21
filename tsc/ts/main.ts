let canvas: HTMLCanvasElement = document.getElementById(
    'boardGame'
) as HTMLCanvasElement
let ctx: CanvasRenderingContext2D = canvas.getContext('2d')
ctx.fillStyle = 'green'
ctx.fillRect(20, 10, 150, 100)
