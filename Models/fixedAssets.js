const Model = require("./model");
const conn = require("./connection");


class Fixed_assets extends Model {
    static async adminID(id){
        let result = [];
        let sql = `SELECT * FROM fixed_assets WHERE admin_id = ? `
        let [rows] = await conn.query(sql,id);
        for(const row of rows){
            result.push(new this(row))
        }
        return result;
       
    }
    static async userID(id){
        let result = [];
        let sql = `SELECT * FROM fixed_assets WHERE user_id = ? `
        let [rows] = await conn.query(sql,id);
        for(const row of rows){
            result.push(new this(row))
        }
        return result;
       
    }
    static async assetId(id){
        let result = []
        let sql = `SELECT id, name FROM fixed_assets WHERE admin_id =? `
        let [rows] = await conn.execute(sql,[id])
         for(const row of rows){
            result.push(new this(row))
  
         }
         return result;
     }

}
module.exports = Fixed_assets;
