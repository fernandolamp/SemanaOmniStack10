const axios = require('axios');
const DevModel = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request,response){
        const{ latitude, longitude, techs} = request.query;
        //buscar todos devs num raio de 10km
       const techsArray = parseStringAsArray(techs);
       const devs = await DevModel.find({
           techs:{
             $in: techsArray  
           },
           //mongo busca por proximidades
           location:{
               $near:{
                   $geometry:{
                       type: 'Point',
                       coordinates:[longitude,latitude],
                   },
                   //distancia maxima do ponto em metros
                   $maxDistance:10000,
               },
           },
       });         

        return response.json(devs);
    }
};
