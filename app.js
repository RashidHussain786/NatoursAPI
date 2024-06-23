const fs = require('fs');
const express = require('express');

const app = express();
//this is middle ware for post method required to send the json file
app.use(express.json());
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
)

app.get('/api/v1/tours',(req,res)=>{
    res.status(200).json({
        status : 'success',
        result : tours.length,
        data : {
            tours
        }
    });
});

app.get('/api/v1/tours/:id',(req,res)=>{
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
});


app.post('/api/v1/tours',(req,res)=>{
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
});

app.patch('/api/v1/tours/:id',(req,res)=>{
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
})

app.delete('/api/v1/tours/:id',(req,res)=>{
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
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`port running on port ${PORT}`);
})