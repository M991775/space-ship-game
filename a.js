var Spacehipster = Spacehipster || {};

Spacehipster.GameState = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.PLAYER_SPEED = 200;
        this.BULLET_SPEED = -1000;
    },

    preload: function() {
        this.load.image("space","images/space.png");
        this.load.image("player","images/player.png");
        this.load.image("bullet","images/bullet.png");
        this.load.image("enemyParticle","images/enemyParticle.png");
        this.load.spritesheet("yellowEnemy","images/yellow_enemy.png", 50, 46, 3, 1, 1);
        this.load.spritesheet("redEnemy","images/red_enemy.png", 50, 46, 3, 1, 1);
        this.load.spritesheet("greenEnemy","images/green_enemy.png", 50, 46, 3, 1, 1);


    },

    create: function(){
        
        //background
        this.background = this.add.tileSprite(0,0, this.game.world.width, 
            this.game.world.height, "space");
        this.background.autoScroll(0,30);

        //player
        this.player = this.add.sprite(this.game.world.centerX, 
            this.game.world.height - 50, 'player');
        this.player.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBound = true;


        this.initBullets();
        this.shootingTimer = this.game.time.events.loop(Phaser.Timer.SECOND/5,
            this.createPlayerBullet, this);
        
        this.initEnemy();

        this.loadLevel();
    },



    update: function() {

        this.game.physics.arcade.overlap(this.playerBullets,
            this.enemies, this.damageEnemy, null, this);

        this.game.physics.arcade.overlap(this.enemyBullets,
            this.player, this.killPlayer, null, this);

        this.player.body.velocity.x = 0;

        if(this.game.input.activePointer.isDown) {
            var targetX = this.game.input.activePointer.position.x;

            var direction = targetX >= this.game.world.centerX ? 1 :-1;

            this.player.body.velocity.x = direction * this.PLAYER_SPEED;
        }
    },
    initBullets: function(){
        this.playerBullets = this.add.group();
        this.playerBullets.enableBody = true;
    },
    createPlayerBullet: function(){
        var bullet = this.playerBullets.getFirstExists(false);

        if(!bullet) {
            bullet = new SpaceHipster.PlayerBullet(this.game, this.player.x,
                this.player.top);

                this.playerBullets.add(bullet);
        }
        else{
            bullet.reset(this.player.x, this.player.top);
        }
        
        bullet.body.velocity.y = this.BULLET_SPEED;

    },

    initEnemy: function(){
        this.enemies = this.add.group();
        this.enemies.enableBody = true;

        this.enemyBullets = this.add.group();
        this.enemyBullets.enableBody = true;

        this.enemy = new SpaceHipster.Enemy(this.game, 100, 100, 'greenEnemy', 10, this.enemyBullets);
        this.enemies.add(this.enemy);

        this.enemy.body.velocity.x = 100;
        this.enemy.body.velocity.y = 50;
    },

    damageEnemy: function(bullet, enemy){
        enemy.damage(1);
        bullet.kill();
    },

    killPlayer: function(){
        this.player.kill();
        this.game.state.start('GameState');
    },



    createEnemy: function(x, y, health, key, scale, speedX, speedY){
        var enemy = this.enemies.getFirstExists(false);

        if(!enemy){
            enemy = new SpaceHipster.enemyBullet(this.game, x, y, health, this.enemyBUllets);

        }
        enemy.reset(x, y, health, key, scale, speedX, speedY);

    },

    loadLevel: function(){

        this.currentEnemtIndex = 0;
        this.levelData = {
            "duration": 35,
            "enemies":
            [
                {
                    "time": 1,
                    "x": 0.05,
                    "health": 6,
                    "speedX":20,
                    "speedY":50,
                    "key":"greenEnemy",
                    "scale": 3
                },
                {
                    "time": 2,
                    "x": 0.1,
                    "health": 8,
                    "speedX":25,
                    "speedY":55,
                    "key":"greenEnemy",
                    "scale": 3
                },
                {
                    "time": 3,
                    "x": 0.15,
                    "health": 10,
                    "speedX":30,
                    "speedY":60,
                    "key":"greenEnemy",
                    "scale": 3
                }
            ]
        };

        this.scheduleNextEnemy();
    },

    scheduleNextEnemy: function(){
        var nextEnemy = this.levelData[this.currentEnemyIndex];
        
        if(nextEnemy){
            var nextTime = 1000 *  (nextEnemy.time - (this.currentEnemIndex == 0 ? 0 :
                this.levelData.enemies[this.currentEnemyIndex - 1].time));
            this.nextEnemyTimer = this.game.time.events.add(nextTime, function(){
                this.createEnemy(nextEnemy.x *  this.game.world.width, -100, nextEnemy.health, nextEnemy.key, nextEnemy.scale, nextEnemy.speedX, nextEnemy.speedY)

                this.currentEnemyIndex++;
                this.scheduleNextEnemy();
            }, this)    

        }
    }
};

