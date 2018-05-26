'use strict'

module.exports = db => {
    return {
        getImages() {
            return db.query(`select * from gallery`).then(res => res);
        }
    }
}