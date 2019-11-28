const DrawService = require('../index')

const test_data = require('./test_data.json');

describe('Draw Infinite rectangles ', ()=>{
    it('Should draw the Infinite rectangle for all given inputs', ()=>{
        test_data.forEach(t=>{
           let inputs = t.input.split(',');
           const width = parseInt(inputs[0], 10);
           const height = parseInt(inputs[1], 10);
           const padding = parseInt(inputs[2], 10);
           const pixelArray = DrawService.draw(width, height, padding);
           expect(t.pixelArrayJson).toEqual(JSON.stringify(pixelArray))
        })
    })
})