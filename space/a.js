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
        this.load.spritesheet("yellowEnemy","images/yellowEnemy.png", 50, 46, 3, 1, 1);
        this.load.spritesheet("redEnemy","images/red_enemy.png", 50, 46, 3, 1, 1);
        this.load.spritesheet("greenEnemy","images/green_enemy.png", 50, 46, 3, 1, 1);


    },

    create: function(){
        this.background = this.add.titlesprite(0,0, this.game.world.width, this.game.world.height, "space");
    },

    upload: function() {

    },
}

Spacehipster.game = new Phaser.Game("100%", '100%', Phaser.AUTO);

Spacehipster.game.state.add("GameState", Spacehipster.GameState);
Spacehipster.game.state.start("GameSate");