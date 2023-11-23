const ExpenseSchema = require("../models/expenseModel")

exports.addExpense = async (req,res) => {

const {title, amount, category, description, date} = req.body

const expense = ExpenseSchema({
    title,
    amount, 
    category,
    description,
    date
})

try {
    if(!title ||  !category || !description || !date){
        return res.status(400).json({message: 'FAILE'})
    }
    await expense.save()
    res.status(200).json({message: 'Expense Added well FINALLY!!!!!!'})
} catch (error) {
    res.status(500).json({message: "Server Error"})
    console.log(error)
}

}


exports.getExpenses = async(req,res) =>{
    try{
        const expenses = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteExpense = async (req,res) => {
    
        const {id} = req.params;
        ExpenseSchema.findByIdAndDelete(id)
        .then ((expense)=>{
        res.status(200).json({message: "Expense Deleted well!!!"})
    })
        .catch((err) => {
        res.status(500).json({message: "Server Error"})
        })
    }

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id).then((income) =>{
        res.status(200).json({message: 'Expense Deleted'})
    })
    .catch((err) =>{
        res.status(500).json({message: 'Server Error'})
    })
}
 