# franim [![NPM version][npm-image]][npm-url] [![Code Climate][climate-image]][climate-url]
> sample html canvas animation loop wrapper

[![NPM franim][nodei-image]][npm-url]

[npm-url]: https://npmjs.org/package/franim
[npm-image]: https://badge.fury.io/js/franim.png

[climate-url]: https://codeclimate.com/github/safareli/franim
[climate-image]: https://codeclimate.com/github/safareli/franim.png

[nodei-image]: https://nodei.co/npm-dl/franim.png?months=1




## Usage

```javascript
var wrap = franim('wrapperid', {
    config : {
        resize: true
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

**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [arguments](#user-content-arguments)
	- [wrapperid](#user-content-wrapperid)
	- [context](#user-content-context)
	- [context.config.resize](#user-content-contextconfigresize)
	- [context.init](#user-content-contextinit)
	- [context.update](#user-content-contextupdate)
	- [context.draw](#user-content-contextdraw)
- [this.anim](#user-content-thisanim)
	- [this.anim.pause()](#user-content-thisanimpause)
	- [this.anim.resume()](#user-content-thisanimresume)
	- [this.anim.getHeight()](#user-content-thisanimgetheight)
	- [this.anim.getWidth()](#user-content-thisanimgetwidth)
	- [this.anim.getDelta()](#user-content-thisanimgetdelta)
- [License](#user-content-license)


##arguments
###wrapperid
Type: `String`
*required*

the id of canvas wrapper where new canvace elemnt will be appened

###context 
Type: `Object`
*required*

object which contains required functions for animation loop

###context.config.resize
Type: `Boolean` 
Default: `false`

if true make canvas element resize with its wrapper element

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

####this.anim.getDelta()
returns delta time in seconds between frames

example:
if you had code like this:  `x += 1;` in your update, after 1 second it will be different depending on frame rate but if you write `x += 100*this.anim.getDelta();` it will be changed by 100 after 1 second on any frame rate 

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
