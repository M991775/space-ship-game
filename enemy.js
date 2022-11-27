

var SpaceHipster = SpaceHipster || {};

SpaceHipster.EnemyBullet = function(game,x ,y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');

    this.anchor.setTo(0.5);
    this.checkWorldBound = true;
    this.outOfBoundKill = true;
};

SpaceHipster.EnemyBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.EnemyBullet.prototype.constructor = SpaceHipster.EnemyBullet;

