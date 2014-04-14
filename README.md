# FrAnim [![NPM version][npm-image]][npm-url] [![NPM version][depstat-image]][depstat-url]
> sample html canvas animation loop wrapper


## Usage

```javascript
var wrap = franim('elementid', {
    config : {
        fullSize: true
    },
    setup : function setup(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.anim.getWidth(),this.anim.getHeight());
    },
    update : function update(time) {
        this.x = ~~(Math.random()*this.anim.getWidth());
        this.y = ~~(Math.random()*this.anim.getHeight());
    },
    draw : function draw(ctx) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, 1, 1);
    }
});
```

##arguments
###elementId 
Type: `String`
*required*

the id of canvas dom element

###context 
Type: `Object`
*required*

object which contains required functions for animation loop

###context.config.fullSize
Type: `Boolean` 
Default: `false`

if true make canvas element fit whole window

###context.init
Type: `Function` 
_optional_
it is called once before animation is started and context is passed to it as argument

`function setup(ctx)`


###context.update
Type: `Function` 
_optional_
it is called on every frame before `draw` and AnimationFrame's `time` argument is passed to it as argument 

`function update(time)`


###context.draw
Type: `Function` 
*required*
it is called on every frame, after `update` (if is defined) and context is passed to it as argument 

`function draw(ctx)`

if `update` is not defined then context is passed to it as a first argument and AnimationFrame's `time` argument as second argument

`function draw(ctx,time)`

---

##this.anim 
here is api to control animation loop and some helper functions

####this.anim.pause()
it cancels Animation Frame and stops loop

####this.anim.resume()
it request Animation Frame and starts loop

####this.anim.getHeight()
returns height of canvas element



####this.anim.getWidth()
returns width of canvas element

---

## License 

The MIT License

Copyright (c) 2014, Irakli Safareli

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

 

[npm-url]: https://npmjs.org/package/franim
[npm-image]: https://badge.fury.io/js/franim.png

[depstat-url]: https://gemnasium.com/Safareli/franim
[depstat-image]: http://img.shields.io/gemnasium/Safareli/franim.svg
