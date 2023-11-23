const IncomeSchema = require("../models/incomeModel")

exports.addIncome = async (req,res) => {

const {title, amount, category, description, date} = req.body

const income = IncomeSchema({
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
    await income.save()
    res.status(200).json({message: 'Income Added well FINALLY!!!!!!'})
} catch (error) {
    res.status(500).json({message: "Server Error"})
    console.log(error)
}

}


exports.getIncomes = async(req,res) =>{
    try{
        console.log("Getting Income Data");
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: "Server Error"})
    }
}

exports.deleteIncome = async (req,res) => {
        console.log("Here are we trying to delete item")
        const {id} = req.params;
        console.log("This is id: ", id);
        IncomeSchema.findByIdAndDelete(id)
        .then ((income)=>{
        res.status(200).json({message: "Income Deleted well!!!"})
    })
        .catch((err) => {
        res.status(500).json({message: "Server Error"})
        })
 }