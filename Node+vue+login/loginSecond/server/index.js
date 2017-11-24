
const fs = require('fs');

//引入处理路径的模块
const path = require('path');

const bodyParser = require('body-parser');

const  express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//访问静态资源文件  这里是访问所有dist目录下的静态文件资源
app.use(express.static(path.resolve(__dirname,'../dist')))
//因为是单页面应用，所有请求都走/dist/index.html

app.get('*',function (req,res) {
  const html = fs.readFileSync(path.resolve(__dirname,'../dist'),'utf-8');
  res.send(html);
})

app.listen(3000);
console.log('success');

