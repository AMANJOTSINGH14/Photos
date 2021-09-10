const http=require('http');
const app=require('./backend/app')
const port=process.env.PORT || 3000
app.set('port',port)
const servers=http.createServer(app);

servers.listen(port,()=>{
console.log('port is up on 3000')

})
