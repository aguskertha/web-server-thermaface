const ObjectID = require('mongodb').ObjectId;
const Order = require('./../models/order.model');
const Testimonial = require('./../models/testimonial.model')

const createTestimonial = async (req, res, next) => {
    try {
        const {orderID, message, rate} = req.body;
        const order = await Order.findOne({_id: ObjectID(orderID)})
        if(!order) throw "Order not found!"

        const newTestimonial = new Testimonial({
            orderID,
            message,
            rate
        })
        await newTestimonial.save()
        await Order.updateOne(
            { _id: ObjectID(orderID) },
            {
                $set: {
                    paymentStatus: 6
                }
            }
        )
        res.json({message: 'Testimonial successfully created!'})
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.aggregate([
            {
                "$lookup": {
                    "from": "orders",
                    "localField": "orderID",
                    "foreignField": "_id",
                    "as": "orders"
                }
            }
        ]).sort({createdAt: -1})
        res.json(testimonials)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

const getTestimonialByID = async (req, res, next) => {
    try {
        const testimonialID = req.params.testimonialID
        const testimonial = await Testimonial.find({_id: ObjectID(testimonialID)})
        if(!testimonial) throw "Testimonial not found!"
        res.json(testimonial)
    } catch (error) {
        res.status(400).json({message: error.toString()})
    }
}

module.exports = {
    createTestimonial,
    getTestimonials,
    getTestimonialByID
}