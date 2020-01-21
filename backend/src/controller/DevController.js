//controller tem no máximo 5 funções:
//index(mostrar lista), show(mostar um unico registro), store(armazenar), update e destroy(deletar)

const axios = require('axios');
const DevModel = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async store(request, response) {
        const { github_username, techs, longitude, latitude } = request.body;

        let dev = await DevModel.findOne({ github_username });
        if (!dev) {
            const apiresponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const techArray = parseStringAsArray(techs); //techs.split(',').map(tech => tech.trim());
            //se não tiver name, vai pega login
            const { name = login, avatar_url, bio } = apiresponse.data;

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await DevModel.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techArray,
                location
            });
            console.log(name, avatar_url, bio, techArray);
        }
        // console.log(apiresponse.data);
        // console.log(github_username);
        // console.log(request.body);
        return response.json(dev);
    },
    async index(request,response){
        const devs = await DevModel.find();        
        return response.json(devs);
    },
    async update(request,response){
        console.log(request.body);
        const {github_username,techs,latitude,longitude} =  request.body;

        dev = await DevModel.findOne({
            github_username
        });

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }        

        if(dev){
            dev.location = location,
            dev.techs = parseStringAsArray(techs)
            await DevModel.update(dev);
            return response.json(dev);
        }else{
            return response.json({error:"user not found"});
        }    
    },
    async destroy(request,response){
        const {github_username}  = request.body;

        const result = await DevModel.deleteOne({
            github_username
        });

        response.json({result});
    }
    //update
    //destroy
}