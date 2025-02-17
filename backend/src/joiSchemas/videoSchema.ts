import Joi from 'joi'

const videoFieldsSchema = Joi.object({
    title: Joi.string().required(), 
    description: Joi.string().required()
})

export default videoFieldsSchema;