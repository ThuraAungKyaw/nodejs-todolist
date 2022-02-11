const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const _ = require("lodash");
const Schema = require(__dirname + "/schema.js")
const Default = require(__dirname + "/default.js")

const app = express()
const workItems = []

PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'));
const passwd = 'Developer01#'
mongoose.connect(`mongodb+srv://localhost:27044/todolistDB`);


const ToDoItem = mongoose.model("Item", Schema.todoitem);
const CustomList = mongoose.model("CustomItem", Schema.list);

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  ToDoItem.find((err, items) => {
      if(items.length == 0){
        ToDoItem.insertMany(Default.items, (err) => {
          if(err){
            console.log(err)
          } else {
            console.log("Initial items have been added.")
          }
          res.redirect("/")
        })
      } else {
          res.render('list', {listTitle: "Today", toDoItems: items})
      }

  })

})

app.get('/:categoryListName', (req,res) => {
  const customListName = _.capitalize(req.params.categoryListName);

  CustomList.findOne({name: customListName}, (err, result) => {
    if(!err) {
      if(!result) {
        const customList = new CustomList({
          name: customListName,
          items: Default.items
        })
        customList.save()

        res.redirect("/" + customListName)
      } else {

        res.render('list', {listTitle: customListName, toDoItems: result.items})
      }
    }

  })

})

app.get('/about', (req,res) => {
  res.render('about')
})

app.post('/', (req, res) => {

  let toDoItem = req.body.toDoItem;
  let listName = req.body.list;
  let redirectLoc = "/"
  const item = new ToDoItem({
    name: toDoItem
  })
  if(listName === "Today"){
    item.save()
    res.redirect("/")
  } else {
    CustomList.findOne({name: listName}, (err, foundList) => {

          foundList.items.push(item);
          foundList.save()
          setTimeout(() => {
              res.redirect("/" + listName)
          }, 1000);


    })
  }


})

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  if(listName === "Today"){
    ToDoItem.findByIdAndRemove(checkedItemId, (err) => {
      if(err){
        console.log(err)
      } else {
        console.log('Item removed')

      }
        res.redirect("/")

    })
  } else {
    CustomList.findOneAndUpdate({ name: listName},
                                {$pull: {items: {_id: checkedItemId}}},
                                (err, foundList) => {
      if(!err ){
        setTimeout(() => {
          res.redirect("/" + listName)
        }, 1000)
      }
    })
  }

})


app.listen(PORT, () => {
  console.log(`The server has been started at port ${PORT}`)
})
