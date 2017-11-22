//绘制星星

//定义一个对象
var starObj = function () {
    this.x;
    this.y;

    this.picNo;
}

starObj.prototype.init = function (){
    this.picNo = Math.floor(Math.random()*7);
    this.x = Math.random()*600+100//Math.random返回[0,1)
    this.y = Math.random()*300+150;
}

//序列帧的改变
starObj.prototype.update = function () {
    this.picNo += 1;
    if(this.picNo>=7){
        this.picNo = 0;
    }
}

//定义绘制的方法
starObj.prototype.draw = function () {

    ctx.drawImage(starPic,this.picNo * 7,0,7,7,this.x,this.y,7,7);//注意drawImage()的参数
}

function drawStars() {
    for(var i = 0;i<num;i++){
        stars[i].update();
        stars[i].draw();

    }
}
/* 想要使序列帧一帧一帧的变换：
     使x的位置整数倍的改变，显示每一帧的图片，依次改变 */
