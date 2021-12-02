const express = require('express');
let jobList = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))

app.use(express.static('static'));

// 1) Get the categories mentioned in all the jobs and how many times each category was mentioned
app.get('/jobCategories', (req, res) => {
    let count = {};

    for (j in jobList){
        for (c of jobList[j].categories){
            if(c in count){
                count[c]++;
            }
            else{
                count[c] = 1;
            }
        }
    }

    res.send(JSON.stringify(count));
})
// 3) Get all jobs in a given city (sent in the querystring)
app.get('/checkJobsInCity', (req,res)=> {
    //An array to hold the jobs from the given city
    let jobsInCity = []; 

    for (let j in jobList)
    {
        /*If a job from the jobList contains the name of the given city
        in the title of the job, then that job is added to the jobsInCity array*/
        if (jobList[j].title.includes(req.query.cityName))
        {
             jobsInCity.push(j);
        }      
    }
    //Array gets sent in response
    res.json(
        {
            jobsInThisCity: jobsInCity
        }
    );
});

// 2) Get all the jobs with a given category (sent as a parameter)
app.get('/:category', (req, res) => {
    let jobs = {};

    for(j in jobList){
        for(c of jobList[j].categories){
            if (req.params.category == c){
                jobs[j] = jobList[j];
            }
        }
    }

    res.send(jobs);
})



app.listen(80); 
