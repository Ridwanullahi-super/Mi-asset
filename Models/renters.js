const conn = require('./connection');
const model = require('./model')

class Renters extends model {

    static async adminID(id){
        let result = []
        let sql = `SELECT us.first_name, us.surname, us.other_name, us.email, us.phone_number, us.address FROM renters rt LEFT JOIN users us ON rt.user_id = us.id  WHERE admin_id =? `
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))

         }
         return result;
    }
    static async fetchRenterByAdminID(id){
      let result = []
      let sql = `SELECT * from renters  WHERE admin_id =? `
      let [rows] = await conn.execute(sql,[id])
       for(const row of rows){
          result.push(new this(row))

       }
       return result;
    }
    fullName(){
    let fullname =  (` ${this.surname} ${this.first_name} ${this.other_name}`)
    return fullname;
   } 
   
  static async fetchRenterAssetID(){
      let result = [];
      let sql = `SELECT us.first_name, us.surname, us.email, due_time, fs.name  as fs_name from renters rt LEFT JOIN fixed_assets fs ON rt.fixed_asset_id =  fs.id LEFT JOIN users us ON rt.user_id = us.id`
      let [rows] = await conn.execute(sql)
      for(const row of rows){
         result.push(new this(row))
      }
      return result;

   }

static async fetchOutRenter(id){
      let result = [];
let sql = `SELECT * FROM renters WHERE due_time < CURDATE() AND user_id = ?`;
let [rows] = await conn.execute(sql,[id]);
  for(const row of rows){
   result.push(new this(row))
}
return result
}

static async findOutRenter(id){
let sql = `SELECT * FROM renters WHERE due_time < CURDATE() AND user_id = ?`;
let [results] = await conn.execute(sql, [id]);
if (results.length > 0) {
  let result = results[0];
  return new this(result);

}
return null;
}

}
module.exports = Renters;