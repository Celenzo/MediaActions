'use strict';

module.exports = db => {
    return {
        addUser(username, password, email) {
            return db.query(`insert into sessions (username, password, email) values
                ('${username}', '${password}', '${email}')`).then(res => res);
        },
        getPurchaseList(userId) {
            return db.query(`select * from purchases where userId = ${userId}`)
                .then(res => res);
        }
    }
}