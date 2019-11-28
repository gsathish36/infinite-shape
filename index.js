const pixelEnum = {
    0: ' ',
    1: '-',
    2: '|'
};

const drawHelper = (h_start, h_end, w_start, w_end, padding, pixelArray) =>{
    if (h_end < h_start || w_end < w_start) {
        return false;
    }
    const distance = padding+1;

    pixelArray[h_start][w_start] = 2;
    pixelArray[h_start][w_end] = 2;
    pixelArray[h_end][w_start] = 2;
    pixelArray[h_end][w_end] = 2;

    for (let i = w_start + 1; i < w_end; i++) {
        pixelArray[h_start][i] = 1
        pixelArray[h_end][i] = 1
    }

    for (let y = h_start + 1; y < h_end; y++) {
        pixelArray[y][w_start] = 2
        pixelArray[y][w_end] = 2
    }
    drawHelper(h_start + distance, h_end - distance, w_start + distance, w_end - distance, padding, pixelArray)
}

exports.draw = (width, height, padding) => {
    const pixelArray = [];
    for (x = 0; x < height; x++) {
        pixelArray[x] = new Array(width).fill(0)
    }

    drawHelper(0, height - 1, 0, width - 1, padding/2, pixelArray)

    return pixelArray
}

