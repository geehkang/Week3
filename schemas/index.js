const mongoose = require('mongoose');

// // mongodb 연결 함수. http:// 규격과 아주 유사한 mongodb://
// error 확인방법: .catch()
const connect = () => {
    mongoose
    .connect('mongodb://localhost:27017/week3project')
    .catch(err => 
        console.log(err));
    };

    mongoose.connection.on('error',err => {
        console.error('몽고디비 연결 에러', err);
    });

module.exports = connect;