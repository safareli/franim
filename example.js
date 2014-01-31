
var animator = new F("mycanvas","2d").set({
    setup : function setup(ctx){
        console.log(this.particles);

        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

        var particles = [];
        for (var i = 0; i < 50; i++) {
            particles[i] = {
                x:Math.random(), 
                y:Math.random(), 
                r:Math.random(),
                vx:(Math.random() - 0.5)/100,
                vy:(Math.random() - 0.5)/100
            };
        }
        
        return {
            particles: particles
        };
    },
    update : function update(ctx,time){
        for (var i = 0; i < this.particles.length; i++) {
            this.particles[i].x += this.particles[i].vx;
            this.particles[i].y += this.particles[i].vy;
            if (this.particles[i].x >1.1) {
                this.particles[i].x = -0.1;
            }
            if (this.particles[i].y >1.1) {
                this.particles[i].y = -0.1;
            }
            if (this.particles[i].x <-0.1) {
                this.particles[i].x = 1.1;
            }
            if (this.particles[i].y <-0.1) {
                this.particles[i].y = 1.1;
            }
        }
        this.width = window.innerWidth;
        this.height = window.innerHeight

    },
    draw : function draw(ctx){
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, this.width, this.height);
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            ctx.beginPath();
            var r = ~~(p.x*255);
            var g = ~~(p.y*255);
            ctx.fillStyle = "rgb("+r + ","+g +",0)";
            ctx.arc(p.x*this.width, p.y*this.height, p.r*20, Math.PI*2.0, false);
            ctx.fill();
        }
    }
}).start();
