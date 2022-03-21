const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
   title:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
}    
});
// 각항목 구별해주는 ,(콤마) 필수로 써주자

// // model의 이름은 이제 'Goods'로 밖에서 쓰이고, 스키마는 goodsSchema
// // 이 파일 밖에서도 사용할 수 있도록 모듈화 시켜주기: module.exports
module.exports = mongoose.model('journal', journalSchema);


// router.post("/views/write", async (req, res) => {
// 	const { Id, title, author, password, content, date} = req.body;

//   const journal = await journal.find({ Id });
//   if (journal.length) {
//     return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
//   }

//   const createdJournals = await journal.create({ Id, author, password, content, date });

//   res.json({ journals: createdJournals });
// });