const express = require('express');
const router = express.Router();
const Journal = require('../schemas/journal');


// // '/' 이지만 app.js를 보면 /로 접속하는건 root page이고 /api로 접속해야 되므로 여기서의 /는 /api가 생략됨을 의미한다.

router.get('/', (req, res,next) => {
    Journal.find({}).then(function(journal){
        res.send(journal);
    })
    // res.json({
    //     journal: journal
    // });
});
// Post.find({})
//   .sort('-createdAt')
//   .exec(function(err, posts){ ... })

router.post('/write', (req, res, next) => {
        // console.log(req.body); req.body는 우리가 요청보내는 input 값들! such as title, author etc.
        // 위의 const Journal = require('../schemas/journal');와 연관
        Journal.create(req.body).then(function(journal){
            res.send(journal);
        }).catch(next);
//     res.send({
//       type:'POST',
//      title: req.body.title,
//     author: req.body.author,
//   password: req.body.password,
//    content: req.body.content,
//       date: req.body.date
//     });
});
    // json data thunder client로 post방식 테스트할때, 전부 ""(쌍따옴표)형식으로 해야한다. 아래예시
    // {  "title": "첫번째", "author": "강", "password": "1234","content": "제발..!",  "date": "" }

// router.post("/write", async (req, res) => {
// 	const { title, author, password, content, date} = req.body;

//   const journal = await journal.find({ ObjectId });
//   if (journal.length) {
//     return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
//   }

//   const createdJournals = await journal.create({ title, author, password, content, date });

//   res.json({ journals: createdJournals });
// });


router.get('/read/:id', (req, res,next) => {
    Journal.findOne({_id: req.params.id}).then(function(journal){
        res.send(journal);
    })
});

// findOne 줄 없이는 response로 나온 값은 변경하기 전 (outdated) 값이 나오는데 실질적으로는 바뀐상태다. 그래도 거슬린다면 findOne문장이 쓰인 줄이 들어가면 response값도 업데이트된 값이 나온다.
router.put('/edit/:id', (req, res,next) => {
    Journal.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Journal.findOne({_id: req.params.id}).then(function(journal){
            res.send(journal);
        })
    });
});

router.delete('/edit/:id', (req, res,next) => {
    Journal.findByIdAndRemove({_id: req.params.id}).then(function(journal){
        res.send(journal);
    })
});


// // 상품상세페이지 창띄우기 (goodsId)
// // :goodsId 라고 쓴부분은 임의로 지정해서 뭘 쓰든 상관없다는 의미. e.g. goods/:abcd나 goods/:123나 다 괜찮은데 완성본 이전에는 안된다?!
// // !중요! express에서는 url주소를 문자열로 인식해서 item.goodsId === goodsId 하면 item.goodsId는 숫자인데 goodsId는 문자열이라 === 식에서 false가 나온다.
// //        하지만 ===을 사용하는게 추후 버그를 안일으키는 정확한 방식이니까 ==은 사용하지 말고 Number(goodsId)와 비교해주자
// router.get('/goods/:goodsId', (req, res) => {
//      const goodsId = req.params.goodsId;

//     //  문법팁: destructuring (비구조화)
//     // 바로 배열의 n번째 요소 가져오는법 [detail(n-1)] = goods.filter((item)=> item.goodsId === Number(goodsId));
//     // e.g. 첫번빼 요소 가져오는 법 [detail] = goods.filter((item)=> item.goodsId === Number(goodsId));
//     //      이경우 json 안에 detail: detail 이라고 적으면된다
//      const filteredItems = goods.filter((item)=> item.goodsId === Number(goodsId));
//      res.json({
//          detail: filteredItems[0]
//      });
// });

// 필요한가?? app.set('view engine','ejs');
// 필요한가?? app.set('views', './views');
// router.post('/write', async (req, res)=>{
//     const { goodsId, name, thumbnailUrl, category, price } = req.body;
//     // 위와 같은 표현: const goodsId = req.body.goodsId;
//     // name, thumbnail 등도 위처럼 적어주면 줄이 길어지므로 경제적으로 한번에 묶어서 축약형으로 쓰자

//     // find() 함수는 promise를 반환하므로 async함수로 만들어야 await을 사용할 수 있다.
//     const goods = await Goods.find({ goodsId });
//     if (goods.length){
//         return res.status(400).json({success:false, errorMessage: '이미 있는 데이터입니다'})
//     };

//     const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });
    
//     res.json({ goods: createdGoods });

//     // 코드해석: post 메서드로 /goods 라는 주소로 요청을 받았는데, 
//     //          goodsId,name 등의 데이터를 body 로 받았다
//     //          데이터베이스에서 동일한 goodsId가 있는지 찾아서 goods 라는 변수에 넣어라
//     //          데이터가 잘 들어왔나 확인해 보기 위해 json파일로 응답값을 콘솔에 찍어줘라
// });

// // 약속된 문법: 라우터를 모듈로 전환하겠다
module.exports = router;