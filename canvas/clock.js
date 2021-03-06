$(function () {
    var drawing = document.getElementById("drawing");//获取canvans的id

    if(drawing.getContext) {
        var ctx = drawing.getContext("2d");
        var width = drawing.width;
        var height = drawing.height;
        var r = width / 2;
        var rem = width / 200;//放大缩小的比例

        //画表盘
        function drawBg() {
            ctx.save();//先保存一下画布最初始的样子
            ctx.translate(r, r);
            ctx.beginPath();
            ctx.arc(0, 0, r - 10 * rem, 0, 2 * Math.PI, false);
            ctx.stroke();
            //画数字
            var numArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            ctx.font = 18 * rem + "px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            numArr.forEach(function (num, i) {
                var rad = 2 * Math.PI / 12 * i;//num是数字,i是索引
                var x = Math.cos(rad) * (r - 30 * rem);
                var y = Math.sin(rad) * (r - 30 * rem);
                ctx.fillText(num, x, y);
            });
            //画圆点
            for (var i = 0; i <= 60; i++) {
                var rad = 2 * Math.PI / 60 * i;
                var x = Math.cos(rad) * (r - 16 * rem);
                var y = Math.sin(rad) * (r - 16 * rem);
                //想要重新绘制一个圆，必须要再次执行beginPath()
                ctx.beginPath();
                if (i % 5 === 0) {
                    ctx.arc(x, y, 3 * rem, 0, 2 * Math.PI, false);
                    ctx.fillStyle = "#000";

                } else {
                    ctx.arc(x, y, 2 * rem, 0, 2 * Math.PI, false);
                    ctx.fillStyle = "#666";
                }
                ctx.fill();
            }
        }

        //画时针
        function drawHour(hour, minute) {
            ctx.save();
            ctx.beginPath();
            var rad = 2 * Math.PI / 12 * hour;
            var mrad = 2 * Math.PI / 12 / 60 * minute;
            ctx.rotate(rad + mrad);//必须写在前面？？？
            ctx.strokeStyle = "#000";
            ctx.lineWidth = "6";
            ctx.lineCap = "round";
            ctx.moveTo(0, 10 * rem);
            ctx.lineTo(0, -r / 2);
            ctx.stroke();
            ctx.restore();
        }

        //画分针
        function drawMinute(minute) {
            ctx.save();
            ctx.beginPath();
            var rad = 2 * Math.PI / 60 * minute;
            ctx.rotate(rad);
            ctx.strokeStyle = "#000";
            ctx.lineWidth = "3";
            ctx.lineCap = "round";
            ctx.moveTo(0, 10 * rem);
            ctx.lineTo(0, -r + 35 * rem);
            ctx.stroke();
            ctx.restore();
        }

        //画秒针
        function drawSecond(second) {
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = "red";
            var rad = 2 * Math.PI / 60 * second;
            ctx.rotate(rad);
            ctx.moveTo(-2 * rem, 20 * rem);
            ctx.lineTo(2 * rem, 20 * rem);
            ctx.lineTo(1, -r + 18 * rem);
            ctx.lineTo(-1, -r + 18 * rem);
            ctx.fill();
            ctx.restore();
        }

        //画指针之间的圆点
        function drawDot() {
            ctx.beginPath();
            ctx.fillStyle = "#fff";
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, 4 * rem, 0, 2 * Math.PI, false);
            ctx.fill();
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);//每次执行函数之前，都会把前一秒执行出的画布清除
            var date = new Date();
            var hour = date.getHours();
            var minute = date.getMinutes();
            var second = date.getSeconds();
            drawBg();
            drawHour(hour, minute);
            drawMinute(minute);
            drawSecond(second);
            drawDot();
            ctx.restore();
        }

        draw();//在执行定时器之前先执行一下函数，否则初始时会隔一秒才显示
        setInterval(draw, 1000);
    }
})