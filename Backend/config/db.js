const mysql=require('mysql2/promise');

const mySqlPool=mysql.createPool({
  host: 'localhost',
    user: 'root',      
    password: 'HelloWorld',  
    database: 'nationalbank' ,
    
  });
  module.exports=mySqlPool;
  


