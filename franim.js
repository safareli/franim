'use strict';

function franim(wrapperId, context) {
    var wrapperElement = document.getElementById(wrapperId)
      , width
      , height
      , requestId
      , isRunning = true
      , startTime = 0
      , lastTime = 0
      , delta = 0
      , canvas = document.createElement('canvas')
      , ctx = canvas.getContext('2d')
      , setSize = function(){
            width = wrapperElement.offsetWidth;
            height = wrapperElement.offsetHeight;
            canvas.width = width;
            canvas.height = height;
      };

    wrapperElement.appendChild(canvas);
    canvas.style.display = 'block';
    setSize();

    function animationCallback(time) {
        if (context.config && context.config.resize) {
            if (width != wrapperElement.offsetWidth || height != wrapperElement.offsetHeight) {
                setSize();
            }
        }
        if (typeof context.update === 'function') {
            context.update(time);
            context.draw(ctx);
        } else {
            context.draw(ctx, time);
        }
        //if time beatvin last call and this call is more 
        //then 500 we don't change delta becouse it is coused
        //by user living current tab and browser willnot call 
        //animationCallback untile user comes back;
        //and when user returnes delta will be old one
        if(time - lastTime < 500){
            delta = (lastTime - time)/1000;
        }
        lastTime = time;

        if (isRunning === false) {
            window.cancelAnimationFrame(requestId);
            requestId = 0;
        } else {
            window.requestAnimationFrame(animationCallback);
        }
    }

    context.anim = {
        getHeight: function () {
            return (context.config && context.config.fullSize) ? height : canvas.offsetHeight;
        },
        getWidth: function () {
            return (context.config && context.config.fullSize) ? width : canvas.offsetWidth;
        },
        getDelta: function () {
            return delta;
        },
        resume: function () {
            requestId = window.requestAnimationFrame(animationCallback);
        },
        pause: function () {
            isRunning = false;
        }
    };
    if (typeof context.setup === 'function') {
        context.setup(ctx);
    }
    requestId = window.requestAnimationFrame(animationCallback);

    return context;
}

if (typeof module !== "undefined") {
    module.exports = franim;
}
