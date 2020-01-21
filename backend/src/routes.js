const { Router } = require('express');
const devController = require('./controller/DevController');
const searchController = require('./controller/searchController');

const router = Router();

// router.get('/',(request,response)=>{
//    return response.send("oie");
// });

// router.get('/users',(request,response)=>{
//     //imprimir as query params
//     console.log(request.query);
//   return response.json({message: 'Hello World1'});
// });

// router.delete('/users/:id',(request,response)=>{
//     //imprimir as query params
//     console.log(request.params);
//   return response.json({message: 'Hello World1'});
// });

router.get('/devs',devController.index);
router.post('/devs',devController.store);
router.get('/search',searchController.index);
router.post('/update',devController.update);
router.delete('/delete',devController.destroy);

module.exports = router;


