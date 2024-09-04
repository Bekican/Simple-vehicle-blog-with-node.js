const Vehicle = require('../models/Vehicle');
const mongoose = require('mongoose')


// GET homepage
exports.homepage = async(req,res)=>{

    const messages = await req.consumeFlash('info');

    const locals = {
        title: 'NodeJs',
        description: 'Nodejs user management system'
    };

    let perPage = 6;
    let page = req.query.page || 1;

    try {
        const vehicles = await Vehicle.aggregate([{ $sort: { updatedAt: 1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Vehicle.countDocuments();

        res.render('index', {
            vehicles,
            current: page,
            pages: Math.ceil(count / perPage),
            messages
        });
    } catch (error) {
        console.log(error);
    }
};

















// GET About
exports.about = async(req,res)=>{


        const messages = await req.consumeFlash('info')

        const locals = {
            title : 'About',
            description : 'Nodejs user management system'
        }

        try {
            res.render('about',{ locals })
        } catch (error) {
            console.log(error)
        }

}


// GET new vehicle form
exports.addVehicle = async(req,res)=>{      

    const locals = {
        title : 'Add New Vehicle',
        description : 'Add user system'
    }

    res.render('vehicle/add',locals)
}



// POST create new vehicle form
exports.postVehicle = async(req,res)=>{
    console.log(req.body)

    const newVehicle = new Vehicle({
        vehicleName : req.body.vehicleName,
        vehicleModel : req.body.vehicleModel,
        details : req.body.details,
    });



    try {

        await Vehicle.create(newVehicle)
        await req.flash('info','New vehicle has been added.')


        res.redirect('/')

        
    } catch (error) {
        console.log(error)
        
    }

};


//GET Vehicle Data
exports.view = async (req,res) => {
    try {
        const vehicle = await Vehicle.findOne({ _id: req.params.id });
        const locals = {
            title: 'View Vehicle Data',
            description: 'Nodejs user management system'
        };
        res.render('vehicle/view',{
            locals,
            vehicle
        })
    } catch (error) {
        console.log(error);
        
    }
};





//GET Edit Vehicle Data
exports.edit = async (req,res) => {
    try {
        const vehicle = await Vehicle.findOne({ _id: req.params.id });
        const locals = {
            title: 'Edit Vehicle Data',
            description: 'Nodejs user management system'
        };
        res.render('vehicle/edit',{
            locals,
            vehicle
        })
    } catch (error) {
        console.log(error);
        
    }
};





//GET Update Vehicle Data
exports.editPost = async (req,res) => {
    try {
        await Vehicle.findByIdAndUpdate(req.params.id,{
            vehicleName : req.body.vehicleName,
            vehicleModel : req.body.vehicleModel,
            details : req.body.details,
            updatedAt : Date.now(),
        });

        res.redirect(`/edit/${req.params.id}`);
    } catch (error) {
        console.log(error);
    }

};




//DELETE Delete Vehicle Data
exports.deleteVehicle = async (req,res) => {
    try {
        await Vehicle.deleteOne({ _id:req.params.id })
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
};





//GET Search Vehicle Data
exports.searchVehicle = async (req,res) => {

    const locals = {
        title: 'Search Vehicle Data',
        description: 'Nodejs user management system'
    };



    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const vehicles = await Vehicle.find({
            $or : [
                {vehicleName : {$regex : new RegExp(searchNoSpecialChar,"i")}},
                {vehicleModel : {$regex : new RegExp(searchNoSpecialChar,"i")}},
            ]
        });
        res.render("search",{
            vehicles,
            locals
        })
    } catch (error) {
        console.log(error);
        
    }
};
