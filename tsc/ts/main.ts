function loop(time: number): void {
    console.log(time)
    window.requestAnimationFrame(loop)
}

window.requestAnimationFrame(loop)
