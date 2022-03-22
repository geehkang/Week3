// 웹서버코드작성: express, 
const express = require('express');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
const ejs = require('ejs');
const port = 3000;

// // mongodb 연결하기
// mongoose.connect('mongodb://localhost/:27017/blog_database');
// mongoose.Promise = global.Promise;

// // routes의 good.js에서 body형식으로 json데이터를 post 메서드를 통해 보냈는데 req.body 가 undefined 라고 나온다.
// // express라고 하는 프레임워크는 json데이터를 아무나 쓸 수 없게 만들어서 미들웨어 생성해 이게 json데이터를 parsing 해주어야한다.
// 순서에주의하기: https://www.youtube.com/watch?v=bWiW7tLtlJM&list=PL4cUxeGkcC9jBcybHMTIia56aV21o2cZ8&index=8
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//  routes의 api파일과 연결해줌. 
const journalRouter = require('./routes/api')
app.use('/api', [journalRouter])

// db 연결
const connect = require('./schemas');
const { default: mongoose } = require('mongoose');
connect();

// error handling middleware
app.use(function(err, req, res, next){
  // console.log(err);
  res.status(422).send({error: err.message})
});

// view 템플릿으로 ejs형식을 이용하겠다
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
// ejs 파일들이 담겨있는 폴더경로 설정
app.set('views', './views');


// 게시글 목록 조회 페이지 연결(로드)
app.get('/', (req, res) => {
  res.render('index');
});
// // 게시글 작성 페이지 연결
app.get('/write', (req, res) => {
  res.render('write');
});
// // //  게시글 조회 페이지 연결
// router.get('/read/:Id', (req, res) => {
//   journal.find({ id: Number(req.params.id) }, (err, user) => {
//     res.render('read', { journal: journal });
//   });
// });
// // //  게시글 수정 페이지 연결
// app.get('/edit/:Id', (req, res) => {
//   res.render('edit');
// });


// // 접속로그남기는 미들웨어는 함수안에 console.log('Reauest URL:', req.originalUrl, ' - ', new Date()); next(); 적어주기
// // express 사이트: https://expressjs.com/ko/4x/api.html
// // 라우터도 미들웨어 기반으로 작성됨

// // 서버 켜기: app.listen()
app.listen(port, () => {
    console.log(port, '포트가 서버로 켜졌어요!');
});

// // 터미널에서 서버 끄기: Ctrl + C
// // 서버 실행시키기: node app.js