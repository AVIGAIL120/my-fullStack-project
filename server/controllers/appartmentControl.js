const Appartment = require("../models/appartmentModel")
const addAppartment = async (req, res) => {
    const { name ,image,city, size, price, beds, discreption } = req.body
    if (!size || !price || !beds)
        return res.status(400).send("missing field")
    const user = await Appartment.create({ name, image,city, size, price, beds, discreption })
    res.send("appartment added successfuly!")
}
const updateAppartment = async (req, res) => {
    const { id } = req.params
    const { name,city, image, size, price, beds, discreption } = req.body
    if (!id)
        return res.status(400).send("id is required")

    const appar = await Appartment.findById(id).exec()
    console.log(appar);

    appar.name = name
    appar.image=image
    appar.city=city
    appar.size = size
    appar.price = price
    appar.beds = beds
    appar.discreption = discreption
    //{ name, image, size, price, bookings: appar.bookings, beds, discreption, comments: appar.comments }
    console.log(appar);
    await appar.save()

    res.send("appartment added successfuly!")
}
const getAllAppartment = async (req, res) => {

    const appartment = await Appartment.find().lean()
    if (!appartment)
        return res.status(404).send("id is incorrect")
    res.json(appartment)
}
const getAppartment = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("id is required")
    const appartment = await Appartment.findById(id).lean()
    if (!appartment)
        return res.status(404).send("id is incorrect")
    res.json(appartment)
}
const adddComment = async (req, res) => {
    const { comment, id } = req.body

    if (!comment || !id)
        return res.status(400).send("missing field")
    const appartment = await Appartment.findById(id)
    if (!appartment)
        return res.status(404).send("appartment didnt found")
    console.log(appartment);
    console.log(appartment.name);

    appartment.comments.push(comment)
    const updateAppartment = await appartment.save()
    res.json(updateAppartment)
}

const deleteAppartment = async (req, res) => {
    const { id } = req.params
    if (!id)
        return res.status(400).send("missing field")
    console.log("id"+id);
    const appartment = await Appartment.findById(id)
    const updateAppartment = await appartment.deleteOne()
    res.json(updateAppartment)
}
const checkAvailable = async (req, res) => {
    const { id, sDate, eDate } = req.query
    if (!id || !sDate || !eDate)
        return res.status(400).send("missing fields/field")
    const appartment = await Appartment.findById(id).lean()
    if (!appartment)
        return res.status(404).send("appartment didnt found")
    let aviliable = true
    const sd = new Date(sDate)
    const ed = new Date(eDate)
    appartment.bookings.forEach((b) => {
        if (!(ed < b.sDate || sd > b.eDate))
            aviliable = false;
    })
    if (!aviliable)
        return res.send("not avilible")

    res.send("avilible!!")
}
const addBooking = async (req, res) => {

    const { id, sDate, eDate } = req.body
    if (!id || !sDate || !eDate)
        return res.status(400).send("missing fields/field")
    const appartment = await Appartment.findById(id)

    if (!appartment)
        return res.status(404).send("appartment didnt found")

    appartment.bookings.push({ sDate, eDate })
    const updateAppartment = appartment.save()

    res.json(updateAppartment)
}
module.exports = { getAppartment, addAppartment, adddComment, deleteAppartment, updateAppartment, addBooking, checkAvailable, getAllAppartment }