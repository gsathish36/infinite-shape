const DrawController = require('../src/draw.controller')

const test_data = require('./test_data.json');

describe('Draw Infinite rectangles ', ()=>{
    it('Should validate the Width provided and return message', ()=>{
        const width =10, height=20, padding=4;
        const message = `Width value should be even and greater or equal to 20 , ${width} given`;
        const result = DrawController.draw(width, height,padding);
        expect(result).toEqual(message)
    });

    it('Should validate the Height provided and return message', ()=>{
        const width =20, height=10, padding=4;
        const message = `Height value should be even and greater or equal to 20 , ${height} given`;
        const result = DrawController.draw(width, height,padding);
        expect(result).toEqual(message)
    });

    it('Should validate the width provided and return message', ()=>{
        const width =20, height=20, padding=2;
        const message = `Padding value should be even and greater or equal to 4 , ${padding} given`;
        const result = DrawController.draw(width, height,padding);
        expect(result).toEqual(message)
    });
    it('Should draw the Infinite rectangle for all given inputs', ()=>{
        test_data.forEach(t=>{
           let inputs = t.input.split(',');
           const width = parseInt(inputs[0], 10);
           const height = parseInt(inputs[1], 10);
           const padding = parseInt(inputs[2], 10);
           const pixelArray = DrawController.draw(width, height, padding);
           expect(t.pixelArrayJson).toEqual(JSON.stringify(pixelArray))
        })
    })
})