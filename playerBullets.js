var SpaceHipster = SpaceHipster || {};

SpaceHipster.PlayerBullet = function(game,x ,y){
    Phaser.Sprite.call(this, game, x, y, 'bullet');

    this.anchor.setTo(0.5);
    this.checkWorldBound = true;
    this.outOfBoundKill = true;
};

SpaceHipster.PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);
SpaceHipster.PlayerBullet.prototype.constructor = SpaceHipster.PlayerBullet;

