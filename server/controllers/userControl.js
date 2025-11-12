const  Basket  = require("../models/itemModel");

const getBasket = async (req, res) => {
    const basketUser = await Basket.find({ userId: req.user._id }).populate("idAppartement").lean()
    //console.log(fuser);
    res.json(basketUser)
}

const addItemToBasket = async (req, res) => {
    const {item} = req.body//eDate,sDate,Adflk;
    console.log(item);
    if (!item.eDate || !item.sDate || !item.idAppartement)
        return res.status(400).send("missing fields")
    console.log({ userId: req.user._id, eDate: item.eDate, sDate: item.sDate, idAppartement: item.idAppartement });
    const newBasket = await Basket.create({ userId: req.user._id, eDate: item.eDate, sDate: item.sDate, idAppartement: item.idAppartement })
    // // const user_id = req.user?._id;
    // // if (!user_id) return res.status(401).json({ message: "Unauthorized" });
    // // const user = await User.findById(req.user._id);
    // user.basket.push(item)
    // const updateUser = await user.save()
    res.json(newBasket)
}

const deleteItem = async (req, res) => {
    try {
        const { item_id } = req.params;
        const delBasket = await Basket.findById(item_id).exec()
        // const user_id = req.user?._id;

        // if (!item_id || !user_id)
        //     return res.status(400).send("missing field");

        // const updateUser = await User.updateOne(
        //     { _id: user_id },
        //     { $pull: { basket: { _id: item_id } } }
        // );
        const resalt = await delBasket.deleteOne()
        res.json({resalt});
    } catch (error) {
        console.error("שגיאה במחיקת פריט מהסל:", error);
        res.status(500).send("שגיאה בשרת בעת מחיקת פריט מהסל");
    }
};


module.exports = { addItemToBasket, deleteItem, getBasket }
