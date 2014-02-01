(function(global){


    // ###CanvasHolder 
    // **constructor** receives as arguments 
    //
    // * `elementId` id of the dom element
    // * `contextId` default `2d`, or `webgl`
    function CanvasHolder(elementId,contextId){
        this.dom = document.getElementById(elementId);
        this.context =  this.dom.getContext(contextId || '2d');
        this.setSize();
    }


    // 
    // **Set size** of canvas element depending on window dimensions
    CanvasHolder.prototype.setSize = function() {
        this.width  = this.dom.width  = window.innerWidth;
        this.height = this.dom.height = window.innerHeight;    
    };


    // **recalculate** canvas element size if window dimensions is changed after last call
    CanvasHolder.prototype.recalculate = function() {
        if (this.width  != window.innerWidth || this.height != window.innerHeight) {
            this.setSize();
        }
    };


    // ##FrAnim
    // **constructor** resives as arguments 
    //
    // * `elementId` id of the dom element
    // * `contextId` default `2d`, or `webgl`
    function FrAnim(canvaseId,contextId){
        this.canvas = new CanvasHolder(canvaseId,contextId);
        this.requestId = 0;
        this.func = {
            init:function () {
                throw "init function isn't set";
            },
            update:function () {
                throw "update function isn't set";
            },
            draw:function () {
                throw "draw function isn't set";
            }
        };
    }


    //###set
    //**set** functions needed for animation
    FrAnim.prototype.set = function(functions) {
        this.func.setup = functions.setup;
        this.func.update = functions.update;
        this.func.draw = functions.draw;
        return this;
    };
 

    //###start
    //**start** animation loop 
    FrAnim.prototype.start = function(userConfig) {
        var config = {
            autoResize : true,
            setupThis  : {}
        },  updateThis, 
            drawThis, 
            self = this, 
            ctx = this.canvas.context;
        //**rewrite** user configuration to default config if type matches
        if (userConfig)
            for(var key in config)
                if(typeof userConfig[key] == typeof config[key])
                    config[key] = userConfig[key];


        this.isRunning = true;
        //**call** `setup` once on `setupThis` and save its returned `object` in `updateThis` variable
        updateThis = this.func.setup.call(config.setupThis,ctx);
        updateThis = (typeof updateThis != 'object') ? config.setupThis : updateThis;

        //**save** `requestId` for stopping animation loop if needed
        this.requestId = window.requestAnimationFrame(function callback(time) {

            // **call** `recalculate` if `autoResize` is on
            if(config.autoResize) self.canvas.recalculate();

            //**call** `update` function on `updateThis` and pass `time` as argument.
            //if it returns `object` it will be used for `draw` function otherwise 
            //`draw` well be called on `updateThis`
            var temp = self.func.update.call(updateThis,time);
            drawThis = (typeof temp != 'object') ? updateThis :temp;
            
            //**call** draw function on `drawThis` and pass **Canvas Context** as argument.
            //it it returns `object` call `update` on in in next frame
            temp = self.func.draw.call(drawThis,ctx);
            updateThis = (typeof temp != 'object') ? updateThis : temp;

            //**if** `isRunning` is `false` it means that `stop` is called so we should  call `cancelAnimationFrame` and reset requestId
            if (self.isRunning === false) {
                window.cancelAnimationFrame(self.requestId);
                self.requestId = 0;
            }else{
                window.requestAnimationFrame(callback);
            }
        });
        
        return this;
    }; 


    //###Stop
    //**Stop** animation loop
    FrAnim.prototype.stop = function() {        
        this.isRunning = false;
        return this;
    };


    //###Save to global
    //**Get** script element from which it is loaded.
    var scripts = document.getElementsByTagName("script");
    var currentScript = scripts[ scripts.length - 1 ];
    
    //**Make** `FrAnim` axsasible from global scope with name which is written in `data-var` attribute
    var name = currentScript.dataset.var || 'FrAnim';
    global[name] = FrAnim;
    
    //**Get** name of file which is written in `data-var` attribute and load it
    var file = currentScript.dataset.file;
    if (file) {
        var script = document.createElement("script");
        script.src = file+'.js';
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
        head.appendChild(script);
    }

})(this);