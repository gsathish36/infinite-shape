const pixelEnum = {
    0: ' ',
    1: '-',
    2: '|'
};

/**
 * Draws the shape with given corners.
 * @param {*} h_start - height starting index of the shape
 * @param {*} h_end - height ending index of the shape
 * @param {*} w_start - width starting index of the shape
 * @param {*} w_end - width ending index of the shape
 * @param {*} padding - This is the padding inside the shape
 * @param {*} pixelArray - Array stores values of all shape
 */
const drawHelper = (h_start, h_end, w_start, w_end, padding, pixelArray) => {
    if (h_end < h_start || w_end < w_start) {
        return false;
    }

    //to get the next index add 1 to the padding.
    const distance = padding + 1;

    pixelArray[h_start][w_start] = 2;
    pixelArray[h_start][w_end] = 2;
    pixelArray[h_end][w_start] = 2;
    pixelArray[h_end][w_end] = 2;

    //draw horizontal lines of the shape 
    for (let x = w_start + 1; x < w_end; x++) {
        pixelArray[h_start][x] = 1
        pixelArray[h_end][x] = 1
    }

    // draw vertical lines of the shape
    for (let y = h_start + 1; y < h_end; y++) {
        pixelArray[y][w_start] = 2
        pixelArray[y][w_end] = 2
    }
    drawHelper(h_start + distance, h_end - distance, w_start + distance, w_end - distance, padding, pixelArray)
}

/**
 * Draws the Shape with given Width, Height add padding
 * @param {*} width - Initial width of the Shape
 * @param {*} height - Initial height of the Shape
 * @param {*} padding - Padding between the shapes
 */
exports.draw = (width, height, padding) => {
    const pixelArray = [];
    if (width % 2 !== 0 || width < 20) {
        return `Width value should be even and greater or equal to 20 , ${width} given`;
    }
    if (height % 2 !== 0 || height < 20) {
        return `Height value should be even and greater or equal to 20 , ${height} given`;
    }
    if (padding % 2 !== 0 || padding < 4) {
        return `Padding value should be even and greater or equal to 4 , ${padding} given`;
    }
    for (let x = 0; x < height; x++) {
        pixelArray[x] = Array(width).fill(0)
    }

    drawHelper(0, height - 1, 0, width - 1, padding / 2, pixelArray)

    return pixelArray
}

exports.getShape = (req, res) => {
    let {
        height,
        width,
        padding
    } = req.params;

    height = parseInt(height, 10);
    width = parseInt(width, 10);
    padding = parseInt(padding, 10)

    const pixelArray = exports.draw(width, height, padding);
    const display = [];
    let shape = "";
    const response = {}
    if (typeof pixelArray === 'string') {
        response.message = pixelArray;
    } else {
        for (let x = 0; x < height; x++) {
            display[x] = []
            for (let y = 0; y < width; y++) {
                display[x][y] = pixelEnum[pixelArray[x][y]]
            }

            shape += `${display[x].join('')}\r\n`
        }
        response.shape = shape;
    }
    return res.status(200).send({
        ...response
    })
}