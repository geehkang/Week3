const mongoose = require('mongoose');

// mongoose에서 collection에 대한 언급이 없는 이유는 모델이름의 소문자, 복수형으로 적힌 Schema를 collection으로 자동적으로 설정하기 때문
const journalsSchema = new mongoose.Schema({
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
        default: Date.now
}     
});
// 각항목 구별해주는 ,(콤마) 필수로 써주자

// // model의 이름은 이제 'Goods'로 밖에서 쓰이고, 스키마는 goodsSchema
// // 이 파일 밖에서도 사용할 수 있도록 모듈화 시켜주기: module.exports
// 모델이름 journal, 콜렉션이름 journalsSchema
const Journal = mongoose.model('journal', journalsSchema);
module.exports = Journal;

