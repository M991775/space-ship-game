var SpaceHipster = SpaceHipster || {};

SpaceHipster.enemyBullet = function(game,x ,y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');

    this.anchor.setTo(0.5);
    this.checkWorldBound = true;
    this.outOfBoundKill = true;
};

SpaceHipster.enemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.enemyBullet.prototype.constructor = SpaceHipster.PlayerBullet;

