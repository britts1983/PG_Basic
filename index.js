const express = require('express');
const { CopyResponse } = require('pg-protocol/dist/messages');
const app = express();

const pool = require("./db");


app.use(express.json()) // req.body


//routes starts here//

//get all totdos


app.get("/todos",async(req, res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");  //query goes here

        res.json(allTodos.rows)
    }catch(err){
        console.error(err.message);
    }
})

//get a todo


app.get("/todos/:id",async(req,res)=>{
    const { id } = req.params; //where concept
    try{
        const todo = await pool.query("SELECT * FROM todo where todo_id = $1",[id]);  //query goes here

        res.json(todo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})

// create a todo


app.post("/todos", async(req,res)=>{
    try{
        //await
        const{ description } = req.body; //set values

        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
         [description]);  //query goes here

         res.json(newTodo.rows[0]);

    }catch(err){
        console.error(err.message);
}});

//update a todo

app.put("/todos/:id",async(req,res) =>{
    try{
        const { id } = req.params; //where concept

        const { description } = req.body; //set values

        const updateTodo = await pool.query("UPDATE todo SET description =$1 WHERE todo_id = $2",[description,id]);  //query goes here

        res.json("Todo is successfully updated!!!");

    }catch(err){
        console.error(err.message);
    }
})

// delete a todo


app.delete("/todos/:id",async (req,res) =>{
    try{
        const { id } = req.params; //where concept
        
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]); //query goes here

        res.json("Todo was successfully Deleted !!!")
    }catch(err){
        console.error(err.message);
    }
})




app.listen(5000,()=>{
    console.log("server is listening om Port 5000");
});