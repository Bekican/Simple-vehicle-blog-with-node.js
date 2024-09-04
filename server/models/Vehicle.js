const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const vehicleSchema = new Schema({
    vehicleName : {
        type: String,
        required : true
    },

    vehicleModel : {
        type: String,
        required : true
    },

    details:{
        type : String,
    },

    createdAt : {
        type: Date,
        default : Date.now()
    },

    updatedAt : {
        type: Date,
        default : Date.now()        
    },




    
});


module.exports = mongoose.model('Vehicle',vehicleSchema)