(function(global){
	/**
	 * Canvas dom element holder
	 * @constructor
	 * @this {CanvasHolder}
	 * @param {string} elementId The id of the canvas dom element.
	 * @param {string} [contextId='2d'] canvas Context  id '2d' or 'webgl'.
	 */
	function CanvasHolder(elementId,contextId){
	    /** @private */this.dom = document.getElementById(elementId);
	    /** @private */this.context =  this.dom.getContext(contextId || '2d');
	    this.width  = -1
		this.height = -1;
	    this.setSize();
	}

	/**
	 * Set size of canvas element depending on window dimensions
	 * @this {CanvasHolder}
	 */
	CanvasHolder.prototype.setSize = function() {
	    this.width  = this.dom.width  = window.innerWidth;
	    this.height = this.dom.height = window.innerHeight;    
	};




	/**
	 * recalculate canvas element size if window dimensions is changed after last call
	 * @this {CanvasHolder}
	 */
	CanvasHolder.prototype.recalc = function() {
	    if (this.width  != window.innerWidth || this.height != window.innerHeight) {
	        this.setSize();
	    }
	};

	/**
	 * FrAnim
	 * @constructor
	 * @this {FrAnim}
	 * @param {string} elementId The id of the canvas dom element.
	 * @param {string} [contextId='2d'] canvas Context  id '2d' or 'webgl'.
	 */
	function FrAnim(canvaseId,contextId){
		this.canvas = new CanvasHolder(canvaseId,contextId);
	    this.requestId = 0;
	    this.func = {
	        init:function () {
	            throw "init function isn't set";
	        },
	        draw:function () {
	            throw "draw function isn't set";
	        },
	        animate:function () {
	            throw "animate function isn't set";
	        }
	    };
	}

	/**
	 * set all functions needed for animating
	 * @this {FrAnim}
	 * @param {object} functions functions nesesary for animations
	 * @param {function} functions.setup setup function is called once if it returnes object then it is 'this' for update
	 * @param {function} functions.update update is called from requestAnimationFrame and its returned object is 'this' for draw
	 * @param {function} functions.draw draw is called from requestAnimationFrame and its returned object is 'this' for update
	 */
	FrAnim.prototype.set = function(functions) {
		this.func.setup = functions.setup;
		this.func.update = functions.update;
		this.func.draw = functions.draw;
	    return this;
	};

	/**
	 * Starts animation loop
	 * @this {FrAnim}
	 */
	FrAnim.prototype.start = function() {
		var updateThis;
		var drawThis;
		var self = this;
		var ctx = this.canvas.context;

		updateThis = this.func.setup(ctx);
		updateThis = (typeof updateThis != 'object') ? {} :updateThis;

	    this.requestId = window.requestAnimationFrame(function callback(time) {

			self.canvas.recalc();
			
			var temp = self.func.update.call(updateThis,ctx,time);
			drawThis = (typeof temp != 'object') ? updateThis :temp;

			temp = self.func.draw.call(drawThis,ctx);
			updateThis = (typeof temp != 'object') ? updateThis : temp;

			self.requestId == 0 || window.requestAnimationFrame(callback);
	    });
		
	    return this;
	}; 


	/**
	 * Stops animation loop
	 * @this {FrAnim}
	 */
	FrAnim.prototype.stop = function() {
	    window.cancelAnimationFrame(this.requestId);
	    this.requestId = 0;
	    return this;
	};


	/** 
	 *  Get script element from which it is loaded
	 *	get global name from data-var of this element if is set and esigne FrAnim to it 
	 *	eval content of this element on load
	 */
	var scripts = document.getElementsByTagName("script");
	var currentScript = scripts[ scripts.length - 1 ];
	var name = currentScript.dataset["var"] || 'FrAnim';
	var file = currentScript.dataset["file"];
	global[name] = FrAnim;
	
	if (file) {
		var script = document.createElement("script");
	    script.src = file+'.js';
        var head = document.getElementsByTagName("head")[0] || document.documentElement;
	    head.appendChild(script);
	    // script.onload = function  () {
	    //     head.removeChild( script );
	    // }
	}

	// var script = currentScript.innerHTML.trim();
	// if ( script ) {
	// 	global.onload =  function () {
	// 	    ( window.execScript || function( script ) {
	// 	        window[ "eval" ].call( window, script );
	// 	    } )( script );
	// 	    global.onload = null;
	// 	};
	// }
})(this);