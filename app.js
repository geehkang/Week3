// 웹서버코드작성: express, 
const express = require('express');
const app = express();
// const http = require('http');
// const server = http.createServer(app);
const ejs = require('ejs');
const port = 3000;

// db정보 정리한 schemas에서 데이터 가져오기 위해 연결
const connect = require('./schemas')
connect();

// view 템플릿으로 ejs형식을 이용하겠다
app.set('view engine','ejs');
// ejs 파일들이 담겨있는 폴더경로 설정
app.set('views', './views');

// 게시글 목록 조회 페이지 연결
app.get('/', (req, res) => {
  res.render('index');
});
// // 게시글 작성 페이지 연결
app.get('/write', (req, res) => {
  res.render('write');
});
// // //  게시글 조회 페이지 연결
// router.get('api/read/:Id', (req, res) => {
//   journal.find({ id: Number(req.params.id) }, (err, user) => {
//     res.render('read.ejs', { journals: journal });
//   });
// });
// // //  게시글 수정 페이지 연결
// app.get('/api/edit/:Id', (req, res) => {
//   res.render('edit.ejs');
// });


// // 다른 파일과 연결시키기 * require method를 사용하기 위해서는 모듈로 변수를? 내보내줘야한다. module.exports = router;
// const goodsRouter = require('./routes/journal')
// app.use('/api', [journalRouter])


// // routes의 good.js에서 body형식으로 json데이터를 post 메서드를 통해 보냈는데 req.body 가 undefined 라고 나온다.
// // express라고 하는 프레임워크는 json데이터를 아무나 쓸 수 없게 만들었기 때문이라는데.. 
// // 그래서 미들웨어 생성해서 이게 json데이터를 parsing 해주어야한다.
app.use(express.json());

// // 접속로그남기는 미들웨어는 함수안에 console.log('Reauest URL:', req.originalUrl, ' - ', new Date()); next(); 적어주기
// // express 사이트: https://expressjs.com/ko/4x/api.html

// // 라우터도 미들웨어 기반으로 작성됨

// // 서버 켜기: app.listen()
app.listen(port, () => {
    console.log(port, '포트가 서버로 켜졌어요!');
});

// // 터미널에서 서버 끄기: Ctrl + C
// // 서버 실행시키기: node app.js