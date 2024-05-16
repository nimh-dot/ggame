export const keyDownHandler = (e, direction) => {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") direction.right = true
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") direction.left = true

    return direction
}

export const keyUpHandler = (e, direction) => {
    if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") direction.right = false
    else if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") direction.left = false

    return direction
}