const Service = require('../models/Service');
const asyncHandler = require('express-async-handler');

//@desc get all services
//@route GET /services
//@access Public

const getServices = asyncHandler(async (req, res) =>{
    //get all notes from mongodb
    const services = await Service.find().lean();

    //if there's no service
    if(!services?.length){
        return res.status(400).json({message: 'No services found'})
    }
    res.json(services);
})

//@desc Add  service
//@route post /addService
//@access Public

const addService = asyncHandler(async (req, res) =>{
    //extract the body
    const {imageUrl, title, content, link} = req.body;

    //confirm data
    if(!imageUrl || !title || !content || !link){
        return res.status(400).json({message: 'All fields are required'});
    }

    //create and store new service
    const service = await Service.create({imageUrl, title, content, link})
    if(service){
        return res.status(201).json({message: 'new service added'})
    }else{
        return res.status(400).json({message: 'Invalid data received'})
    }
});

//@desc update a service
//@route patch /service/:id
//@access Public

const updateService = asyncHandler(async (req, res) =>{
    //extract the body
    const {imageUrl, title, content, link, id} = req.body;

    //confirm data
    if(!id || !imageUrl || !title || !content || !link){
        return res.status(400).json({message: 'All fields are required'});
    }
    //confirm service exists to update
    const service = await Service.findById(id).exec()

    if(!service){
        return res.status(400).json({message: 'Service not found'})
    }

    //check for duplicate title
    const duplicate = await Service.findOne({title}).lean().exec()
    //Allow renaming of the original
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({message: 'conflict - service name already exist'})
    }
    //update service
    service.imageUrl = imageUrl
    service.title = title
    service.content = content
    service.link = link


    const updatedService = await service.save();
    res.json(`${updatedService.title} updated`);
});

module.exports = {
    getServices,
    addService,
    updateService
}