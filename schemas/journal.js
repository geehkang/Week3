const mongoose = require('mongoose');

// const journalSchema = new mongoose.Schema({
//     Id: {
//         type: Number,
//         required: true,
//         unique: true,
//     },
//     // 각항목 구별해주는 ,(콤마) 필수로 써주자
//    title:{
//         type: String,
//         required: true,
//     },
//     name:{
//         type: String,
//         required: true,
//     },
//     Password: {
//         type: String,
//         required: true,
//     },
//     content: {
//         type: String,
//         required: true,
//     }
// });

// // model의 이름은 이제 'Goods'로 밖에서 쓰이고, 스키마는 goodsSchema
// // 이 파일 밖에서도 사용할 수 있도록 모듈화 시켜주기: module.exports
// module.exports = mongoose.model('journal', journalSchema);