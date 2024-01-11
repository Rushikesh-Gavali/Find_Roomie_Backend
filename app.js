const express=require('express');
const app=express();
require('dotenv').config();

const createTables=require('./models/createTables');

const authUsers=require('./routes/users_routes/userAuthRoutes');
const getUsers=require('./routes/users_routes/userGetRoutes');
const  updateUsers=require('./routes/users_routes/userUpdateRoutes');
const deleteUsers=require('./routes/users_routes/userDeleteRoutes');

const postListings=require('./routes/listings_routes/listingsPostRoutes');
const getListings=require('./routes/listings_routes/listingsGetRoutes');
const updateListings=require('./routes/listings_routes/listingsUpdateRoutes');
const deleteListings=require('./routes/listings_routes/listingsDeleteRoutes');

createTables();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.use('/api/users/',authUsers);
app.use('/api',getUsers);
app.use('/api',updateUsers);
app.use('/api',deleteUsers);

app.use('/api',postListings);
app.use('/api',getListings);
app.use('/api',updateListings);
app.use('/api',deleteListings);


const port=process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`server is started on port: ${port} `);
});

