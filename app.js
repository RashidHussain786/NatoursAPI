const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
// if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
//   }
//this is middle ware for post method required to send the json file
app.use(express.json());
 
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

const getAllTours = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        result : tours.length,
        data : {
            tours
        }
    });
};
const getTour = (req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        res.status(404).json({
            status : 'Fail',
            message : 'Invalid ID'
        })
    }
    res.status(200).json({
        status : 'success',
        data : {
            tour
        }
    });
};

const createTour = (req,res)=>{
    const newId = tours[tours.length -1].id +1;
    const newTour = Object.assign({id :newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),(err)=>{
        res.status(201).json({
            status : 'Success',
            data : {
                tour : newTour
            }
        });
    });
};
const updateTour = (req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        res.status(404).json({
            status : 'Fail',
            message : 'Invalid ID'
        })
    }
    res.status(200).json({
        status : 'success',
        data : {
            tour : '<Updated tour here ..>'
        }
    });
};
const deleteTour = (req,res)=>{
    const id = req.params.id*1;
    const tour = tours.find(el => el.id === id);
    if(!tour){
        res.status(404).json({
            status : 'Fail',
            message : 'Invalid ID'
        })
    }
    res.status(204).json({
        status : 'success',
        data : null
    });
};

const getAllUsers = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        
    });
};
const getUser = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
       
    });
};

const createUser = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        
    });
};
const updateUser = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        
    });
};
const deleteUser = (req,res)=>{
    res.status(200).json({
        status : 'success',
        requestedAt : req.requestTime,
        
    });
};

const tourRouter = express.Router();
const useRouter = express.Router();
tourRouter
.route('/')
.get(getAllTours)
.post(createTour);

tourRouter
.route('/:id')
.get(getTour)
.patch(updateTour)
.delete(deleteTour)

useRouter
.route('/')
.get(getAllUsers)
.post(createUser);

useRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',useRouter);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`port running on port ${PORT}`);
})