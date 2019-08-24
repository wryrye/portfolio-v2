import * as PIXI from 'pixi.js';
import createFont from './fonts.js'

function unit(x) {
  return window.innerHeight * x/100
}

export default class Speech {
    constructor(text, answers, bubble) {
      this.text = text;
      this.answers = answers;
  
      let textObj = new PIXI.Text(text, createFont(0x000000, window.innerHeight * .03, 'bold', 0));
      textObj.position.set(bubble.x + unit(8), bubble.y + unit(7));
      textObj.visible = false;
      this.textObj = textObj;
  
      if (this.answers == null) return;

      answers.forEach((answer, index) => {  
        answer.textObj.on('mouseover', () => {
          this.triangle.x = answer.textObj.x - innerHeight * .025;
          this.triangle.y = answer.textObj.y;
        });
  
        answer.textObj.position.set(bubble.x + unit(8), window.innerHeight * .15 + (window.innerHeight * .05 + index * innerHeight * .04));
      });
  
      let triangle = new PIXI.Graphics();
      triangle.visible = false;
  
      triangle.x = this.answers[0].textObj.x - innerHeight * .025;
      triangle.y = this.answers[0].textObj.y;
    
      var triangleWidth = innerHeight * .015,
          triangleHeight = triangleWidth,
          triangleHalfway = triangleWidth/2;
    
      triangle.beginFill(0x000000, 1);
      triangle.lineStyle(0, 0xFF0000, 1);
      triangle.moveTo(0, triangleHeight);
      triangle.lineTo(triangleWidth, triangleHalfway); 
      triangle.lineTo(0, 0);
      triangle.lineTo(0, triangleWidth);
      triangle.endFill();
    
      triangle.interactive = true;
      triangle.buttonMode = true;
      triangle.on("pointertap", function(e) {
        console.log(e);
      });
    
      this.triangle = triangle;
    }
  
    attach(app) {
      app.stage.addChild(this.textObj);

      if (this.answers == null) return;
      app.stage.addChild(this.triangle);
      this.answers.forEach((answer) => {
        app.stage.addChild(answer.textObj);
      });
    }
  
    remove() {
      this.textObj.destroy();

      if (this.answers == null) return;
      this.triangle.destroy();
      this.answers.forEach((answer) => {
        answer.textObj.destroy();
      });
    }

    show() {
      this.textObj.visible = true;

      if (this.answers == null) return;
      this.triangle.visible = true;
      this.answers.forEach((answer, index) => {
        answer.textObj.visible = true;
      });
    }

    hide() {
      this.textObj.visible = false;

      if (this.answers == null) return;
      this.triangle.visible = false;
      this.answers.forEach((answer, index) => {
        answer.textObj.visible = false;
      });
    }

    move(vx) {
      this.textObj.x += vx;
    }
  }