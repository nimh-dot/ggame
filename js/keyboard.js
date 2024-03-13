export let keyDownHandler = function (e, horizontal) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") horizontal.right = true
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") horizontal.left = true

    return horizontal
}

export let keyUpHandler = function (e, horizontal) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") horizontal.right = false
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") horizontal.left = false

    return horizontal
}