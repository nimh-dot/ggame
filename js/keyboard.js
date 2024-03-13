export let keyDownHandler = function (e, direction) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") direction.right = true
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") direction.left = true

    return direction
}

export let keyUpHandler = function (e, direction) {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") direction.right = false
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") direction.left = false

    return direction
}