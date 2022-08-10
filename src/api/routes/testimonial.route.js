
const router = require('express').Router();
const { createTestimonial, getTestimonials, getTestimonialByID } = require('./../controllers/testimonial.controller')

router.post('/', createTestimonial);
router.get('/', getTestimonials);
router.get('/:testimonialID', getTestimonialByID);

module.exports = router;
