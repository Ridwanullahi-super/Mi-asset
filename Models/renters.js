const conn = require('./connection');
const model = require('./model')

class Renters extends model {

    static async userID(id){
        let result = []
        let sql = `SELECT * FROM renters WHERE user_id = ? `
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))

         }
         return result;
    }
    fullName(){
    let fullname =  ` ${this.surname} ${this.first_name} ${this.other_name}? : "" `
    return fullname;
   } 
   

}
module.exports = Renters;