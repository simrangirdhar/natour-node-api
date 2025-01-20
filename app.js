const express= require('express');
const app= express();
const morgan= require('morgan');
const tourRoute= require("./routes/tourRoutes");
const userRoute= require("./routes/userRoutes");
// 1 middleware
if(process.env.NODE_ENV==='development')
{
app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use((req,res,next)=> {
    console.log("hello from middleware");
    next();
})
app.use((req,res,next)=>
{
    req.xid="653056";
    next();
})

//route
app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/user',userRoute);

module.exports=app;
