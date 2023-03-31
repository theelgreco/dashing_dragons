import Phaser from "phaser";
import map from "../assets/map.jpg";
import cristales from "../assets/cristals.png";
import imageEnemy from "../assets/wizard.png";

function GameWindow({ socket, enemiesData }) {
  const config = {
    type: Phaser.Auto,
    parent: "phaserContainer",
    width: 1920,
    heigh: 1080,
    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
  };

  let goal;
  let goalHealthBar;
  // let enemy1;
  let tempEnemy1Health = 5;
  // let tempAtackDmg = 1;
  // let enemiesGroup = [];

  let enemiesGroup = enemiesData;
  let enemyLevel1 = enemiesData[0];
  let enemyLevel2 = enemiesData[1];
  let enemies;
  let enemyImg;

  const game = new Phaser.Game(config);

  function preload() {
    this.load.image("map", map);
    this.load.image("goal", cristales);
    this.load.image("imageEnemy", imageEnemy);
    //coins counter
    //player
    //towers
    //scoreboard
    //timer
  }

  //
  function create() {
    this.add.image(0, 0, "map").setOrigin(0, 0);
    goal = this.physics.add.staticImage(920, 384, "goal");
    // enemyImg = this.physics.add.staticImage(300, 100, "imageEnemy");

    const color1 = new Phaser.Display.Color(150, 0, 0);
    goalHealthBar = this.add.rectangle(920, 50, 300, 50, color1.color);

    // goal.setInteractive().on("pointerover", () => {
    //   decreaseGoalHealth();
    // });

    // enemy1 = this.physics.add.image(-100, 200, "imageEnemy");
    // enemy1.scale = 0.2;

    // this.physics.moveToObject(enemy1, goal, 150);
    // //150 is the speed from the database object (1) 1 === 100

    // enemy1.setInteractive().on("pointerover", () => {
    //   decreaseEnemyHealth(tempAtackDmg, tempEnemy1Health, enemy1);
    // });

    // this.physics.add.collider(enemy1, goal, decreaseGoalHealth, null, this);
    //on hit decreaseGoalHealth
    //make enemy go back to start
    //reset stats

    let enemies = this.physics.add.group({
      key: "imageEnemy",
      repeat: 4,
      setXY: { x: 100, y: 300, stepX: 50, stepY: 70 },
      
    });

    enemies.children.iterate((child) => {
      child.scale = 0.2;
      this.physics.moveToObject(child, goal, enemyLevel1.walkSpeed);
    });

     this.physics.add.collider(enemies, goal, decreaseGoalHealth, null, this);


  }

  function update() {
    //update enemy to go back to group && reset stats
  }

  function decreaseEnemyHealth(damageTaken, enemyHealth, enemy1) {
    // const updatedEnemyHealth = enemyHealth - damageTaken;
    // enemy1.setTint(0xff0000);
    // setTimeout(() => {
    //   enemy1.setTint();
    // }, 250);
    // if (updatedEnemyHealth <= 0) {
    //   console.log(enemy1);
    //   // enemy1.body.stop();
    //   console.log("you are dead!");
    // }
    // tempEnemy1Health = updatedEnemyHealth;
  }

  function decreaseGoalHealth(enemy1) {
    if (goalHealthBar.width > 0) {
      goal.setTint(0xff0000);
      goalHealthBar.width -= 100;
      setTimeout(() => {
        goal.setTint();
      }, 250);
    }
    // enemy1.body.stop();
    //send back to group
  }

  return <div id="phaserContainer"></div>;
}

export default GameWindow;
