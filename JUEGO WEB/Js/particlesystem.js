var emitterType = {
    point: 0,
    area: 1
}

const configSnow = {
    maxParticleCount: 500,

    emitterType: 1,

    AREA_X1: 0,
    AREA_Y1: 0,
    AREA_X2: typeof(canvas) !== 'undefined' ? canvas.width : 800,
    AREA_Y2: 0,

    MIN_INITIAL_VELOCITY: 30,
    MAX_INITIAL_VELOCITY: 200,

    MIN_DIRECTION_X: 0,
    MAX_DIRECTION_X: 0,

    MIN_DIRECTION_Y: 1,
    MAX_DIRECTION_Y: 10,

    MIN_OPACITY_DECREMENT_VELOCITY: 0.5,
    MAX_OPACITY_DECREMENT_VELOCITY: 2,

    MIN_INITIAL_SCALE: 0.1,
    MAX_INITIAL_SCALE: 0.5,

    MIN_SCALE_VELOCITY: 0,
    MAX_SCALE_VELOCITY: 0,

    MIN_INITIAL_ROTATION: 0,
    MAX_INITIAL_ROTATION: Math.PI / 2,

    MIN_ROTATION_VELOCITY: 0.05,
    MAX_ROTATION_VELOCITY: 0.15,

    MIN_TIME_TO_SPAWN_PARTICLE: 0.05,
    MAX_TIME_TO_SPAWN_PARTICLE: 0.005
}

const configRain = {
    maxParticleCount: 500,

    emitterType: 1,

    AREA_X1: 0,
    AREA_Y1: 0,
    AREA_X2: typeof(canvas) !== 'undefined' ? canvas.width : 800,
    AREA_Y2: 0,

    MIN_INITIAL_VELOCITY: 300,
    MAX_INITIAL_VELOCITY: 400,

    MIN_DIRECTION_X: 0,
    MAX_DIRECTION_X: 0,

    MIN_DIRECTION_Y: 1,
    MAX_DIRECTION_Y: 1,

    MIN_OPACITY_DECREMENT_VELOCITY: 1,
    MAX_OPACITY_DECREMENT_VELOCITY: 1,

    MIN_INITIAL_SCALE: 0.1,
    MAX_INITIAL_SCALE: 0.5,

    MIN_SCALE_VELOCITY: 0,
    MAX_SCALE_VELOCITY: 0,

    MIN_INITIAL_ROTATION: -Math.PI / 2/35,
    MAX_INITIAL_ROTATION: Math.PI / 2/35,

    MIN_ROTATION_VELOCITY: 0,
    MAX_ROTATION_VELOCITY: 0,

    MIN_TIME_TO_SPAWN_PARTICLE: 0.05,
    MAX_TIME_TO_SPAWN_PARTICLE: 0.005
}

class Particle {
    constructor(img) {
        this.img = img;

        this.img.halfWidth = this.img.width / 2;
        this.img.halfHeight = this.img.height / 2;

        this.active = false;

        this.appearing = false;

        this.position = new Vector2();

        this.opacity = 0.0;
        this.opacityVelocity = 0.0;

        this.rotation = 0.0;
        this.rotationVelocity = 0.0;

        this.scale = 1.0;
        this.scaleVelocity = 0.0;

        this.color = null;
    }

    Active(initialPosition, opacityVelocity, initialScale, scaleVelocity, initialRotation, rotationVelocity, direction, color) {
        // set the initial parameters values
        this.position = initialPosition;

        this.opacity = 0.0;
        this.opacityVelocity = opacityVelocity;

        this.scale = initialScale;
        this.scaleVelocity = scaleVelocity;

        this.rotation = initialRotation;
        this.rotationVelocity = rotationVelocity;

        this.direction = direction;

        this.active = true;
        this.appearing = true;

        this.color = color;
    }

    Deactivate() {
        this.active = false;
    }

    Update(deltaTime) {
        // update opacity
        if (this.appearing) {
            // increase the opacity
            this.opacity += this.opacityVelocity * deltaTime;

            if (this.opacity>=1){
                this.opacity = 1;
                this.appearing = false;
            }
        }
        else {
        // chech if the opacity should decrease
            this.opacity -= this.opacityVelocity * deltaTime;

            if (this.opacity<=0){
                this.opacity = 0;
                this.Deactivate();
            }
        }


        // Update the particles parameters (scale, rotation, position)
        this.scale += this.scaleVelocity * deltaTime;
        this.rotation += this.rotationVelocity * deltaTime;
        this.position.x += this.direction.x * deltaTime;
        this.position.y += this.direction.y * deltaTime;
    }

    Draw(ctx) {
        ctx.globalAlpha = this.opacity;

        // apply the transformation to the context (translate, rotate, scale)
        ctx.save();

        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.scale, this.scale);


        // draw the image
        ctx.drawImage(this.img, -this.img.halfWidth, -this.img.halfHeight, this.img.width, this.img.height);

        ctx.restore();
        // ctx.globalAlpha = 1;

    }
}

class ParticleEmitter {
    constructor(initialPosition, config) {
        this.position = initialPosition;
        this.config = config;

        this.type = this.config.emitterType;
    }

    GetSpawnPoint() {
        // return a Vector2 with the position of the next particle
        switch (this.type){
            case 0:
                return Vector2.Copy(this.position);
            case 1:
                return new Vector2(RandomBetweenFloat(this.config.AREA_X1,this.config.AREA_X2), RandomBetweenFloat(this.config.AREA_Y1,this.config.AREA_Y2));
        }
    }
    
    GetInitialVelocity() {
        // return a Vector2 with the direction of the next particle should follow
        let direction = new Vector2(RandomBetweenFloat(this.config.MIN_DIRECTION_X,this.config.MAX_DIRECTION_X), RandomBetweenFloat(this.config.MIN_DIRECTION_Y,this.config.MAX_DIRECTION_Y));

        direction.Normalize();

        const velocity = RandomBetweenFloat(this.config.MIN_INITIAL_VELOCITY,this.config.MAX_INITIAL_VELOCITY);

        direction.MultiplyScalar(velocity);

        return direction;
    }
}

class ParticleSystem {
    constructor(img, config, position) {
        // in the config parameter there should be the configuration
        // for this particle system
        this.img = img;

        this.config = {};
        Object.assign(this.config, configSnow);
        Object.assign(this.config, config);

        // create the emitter
        this.emitter = new ParticleEmitter(position ? position : Vector2.Zero(), this.config);

        // initialize an array of Particle objects
        this.particles = [];

        // initialize the particles pool
        for (let i = 0; i < this.config.maxParticleCount; i++){
            this.particles.push(new Particle(this.img));
        }

        // compute the "nextTimeToSpawnParticle" time
        this.nextTimeToSpawnParticle = RandomBetweenFloat(this.config.MIN_TIME_TO_SPAWN_PARTICLE, this.config.MAX_TIME_TO_SPAWN_PARTICLE);
    }

    Update(deltaTime) {
        

        // update the "nextTimeToSpawnParticle" counter
        this.nextTimeToSpawnParticle -= deltaTime;
        
        // if it is time to spawn a particle -> do it
        if (this.nextTimeToSpawnParticle <= 0){
            // compute the new "nextTimeToSpawnParticle" value
            this.nextTimeToSpawnParticle = RandomBetweenFloat(this.config.MIN_TIME_TO_SPAWN_PARTICLE, this.config.MAX_TIME_TO_SPAWN_PARTICLE);

            // activate a new particle
            // look for the first unactive particle in the pool
            let particle = null;
            for (let i = 0; i < this.particles.length && particle === null; i++){
                if (!this.particles[i].active)
                    particle = this.particles[i];
            }

            // set the parameters into the new particle
            if (particle){
                const spawnPosition = this.emitter.GetSpawnPoint();

                const opacityVelocity = RandomBetweenFloat(this.config.MIN_OPACITY_DECREMENT_VELOCITY, this.config.MAX_OPACITY_DECREMENT_VELOCITY);

                const initialScale = RandomBetweenFloat(this.config.MIN_INITIAL_SCALE, this.config.MAX_INITIAL_SCALE);

                const scaleVelocity = RandomBetweenFloat(this.config.MIN_SCALE_VELOCITY, this.config.MAX_SCALE_VELOCITY);

                const initialRotation = RandomBetweenFloat(this.config.MIN_INITIAL_ROTATION, this.config.MAX_INITIAL_ROTATION);

                const rotationVelocity = RandomBetweenFloat(this.config.MIN_ROTATION_VELOCITY, this.config.MAX_ROTATION_VELOCITY);

                const direction = this.emitter.GetInitialVelocity();

                const color = GetRandomColor();

                particle.Active(spawnPosition, opacityVelocity, initialScale, scaleVelocity, initialRotation, rotationVelocity, direction, color);
            }
            else{
                console.log("Warning! there are not enough particles in the pool!!!!!!");
            }

        }
            

        // Update all the current active particles
        this.particles.forEach(particle => {
            particle.active && particle.Update(deltaTime);
        });

    }

    Draw(ctx) {
        // Draw all the current active particles
        this.particles.forEach(particle => {
            particle.active && particle.Draw(ctx);
        });
        ctx.globalAlpha = 1;

        

    }

}