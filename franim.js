'use strict';

function franim(canvaseId, context) {
    var width  =  window.innerWidth,
        height = window.innerHeight,
        domElement = document.getElementById(canvaseId),
        isRunning = true,
        requestId,
        startTime = 0,
        lastTime = 0,
        delta = 0,
        ctx = domElement.getContext('2d');

    domElement.width = width;
    domElement.height = height;

    function recalculate() {
        if (width  !== window.innerWidth || height !== window.innerHeight) {
            domElement.width  = window.innerWidth;
            domElement.height = window.innerHeight;
            width  = domElement.width;
            height = domElement.height;
        }
    }

    function animationCallback(time) {
        if (context.config && context.config.fullSize) {
            recalculate();
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
            return (context.config && context.config.fullSize) ? height : domElement.height;
        },
        getWidth: function () {
            return (context.config && context.config.fullSize) ? width : domElement.width;
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