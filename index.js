const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const jwt=require('jsonwebtoken');
const app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  next();
});
app.use(bodyParser.json());
app.use(cors());



const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const uri = "mongodb+srv://root:sPGsnxOpIBFilUpR@clusterdb-ycqf9.mongodb.net/wedtree?retryWrites=true&w=majority";

const Category = require('./category');
const SubCategory=require('./subcategory');
const Product=require('./product');
const Account=require('./account')

// add Category method
app.post('/Category',async(req,res)=>{
  await new Category(req.body).save();

  res.status(200).send({status:true});
})

//get Category method
app.get('/getcatlog',async(req,res)=>{
   let _catlogitem=await Category.find({});
    res.status(200).send( _catlogitem);
})

// Add SubCategory method
app.post('/SubCategory',async(req,res)=>{
await new SubCategory(req.body).save();
  res.status(200).send({status:true});
})

//get drop Category method
app.get('/getdropcatlog',async(req,res)=>{
 let dropcat=await SubCategory.find({});
 res.status(200).send(dropcat);

})
  
// add Product
app.post('/addproduct',async(req,res)=>{

  await new Product(req.body).save();
  res.status(200).send({status:true})
})

//get Product

app.get('/getproduct',async(req,res)=>{
  let prods=await Product.find({});
  res.status(200).send(prods);
})

// modify Products

app.put('/modifyproduct',async(req,res)=>{

  
  let modify=req.body;
  let search={product_code:modify.product_code};
  Product.findOne(search,async(error,result)=>{
    if(error)
   {
       res.status(401).send({status:false});
   }
    if(result)
    {
      await Product.findByIdAndUpdate(result._id,modify,{
      new: true,
      runValidators: true,
       upsert: true
    });
      res.status(200).send({status:true});
    }
  })
})

//delete the products

app.delete('/deleteproduct',async(req,res)=>{
 
   let search={product_code:req.body.product_code};
    Product.findOne(search).remove().exec();
    res.status(200).send({status:true});
  })

  //login Account

  app.post('/login',async(req,res)=>{
    Account.findOne({username:req.body.username}, (error,credit)=>{
      if(error)
      {
        res.status(401);
      }
      if(credit)
      {
        if(credit.password === req.body.password)
        {
           res.status(200).send(credit);
        }
        else{
          res.status(401);
        }
      }
    })
    
  })

  //change admin password

  app.put('/repassword',async(req,res)=>{
 
  
    Account.findOne({username:req.body.username},async(error,result)=>{
      if(error)
      {
        res.status(401);
      }
      if(result)
      {
       await Account.findByIdAndUpdate(result._id,req.body,{
      new: true,
      runValidators: true,
       upsert: true
    })
      res.status(200).send(req.body);
      }
    })
  })

  //modify the Category

  app.put('/modifycatlog',async(req,res)=>{

    Category.findOne({category_code:req.body.category_code},async(error,result)=>{
        if(error)
        {
          res.status(401);
        }
        if(result)
        {
          let replace_cat=result.category_name;
          await Category.findByIdAndUpdate(result._id,req.body,{
               new: true,
               runValidators: true,
                upsert: true
          })
         await SubCategory.updateMany({category_name:replace_cat}, {
            $set: {
                category_name:req.body.category_name}
          },
             {
                upsert: true,
            multi: true})
            await Product.updateMany({category_name:replace_cat}, {
            $set: {
                category_name:req.body.category_name}
          },
             {
             upsert: true,
            multi: true})
          res.status(200).send({status:true});
        }
    })
  })

// delete the Category

app.put('/deletecatlog',async(req,res)=>{

  Category.find({category_name:req.body.category_name}).remove().exec();
  SubCategory.find({category_name:req.body.category_name}).remove().exec();
   Product.find({category_name:req.body.category_name}).remove().exec();
  res.status(200).send({status:true});
})

//
 app.put('/modifydropcatlog',async(req,res)=>{

   await SubCategory.findOne({subcategory_code:req.body.subcategory_code},async(error,result)=>{
        if(error)
        {
          res.status(401);
        }
        if(result)
        {
          let replace_cat=result.subcategory_name;
          await SubCategory.findByIdAndUpdate(result._id,req.body,{
               new: true,
               runValidators: true,
                upsert: true
          })
              Product.updateMany({subcategory_name:replace_cat}, {
            $set: {
                subcategory_name:req.body.subcategory_name}
          },
             {
                 upsert: true,
            multi: true})
          res.status(200).send({status:true});
        }
    })
 })

//delete the dropdown
app.put('/deletedropcatlog',async(req,res)=>{

  SubCategory.find({subcategory_name:req.body.subcategory_name}).remove().exec();
   Product.find({subcategory_name:req.body.subcategory_name}).remove().exec();
  res.status(200).send({status:true});
})



app.get('/',(req,res)=>{
  console.log("server starts");
  res.status(200).send('hello');
})

app.listen(PORT, () => {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('monggose connected');})
});