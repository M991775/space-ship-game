var Spacehipster = Spacehipster || {};

Spacehipster.game = new Phaser.Game("100%", '100%', Phaser.AUTO);

Spacehipster.game.state.add("GameState", Spacehipster.GameState);
Spacehipster.game.state.start("GameState");