import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Function to make a simple API call
const makeApiCall = async (apiURL, apiOptions) => {
  try {
    console.log(apiURL)
    const options = JSON.parse(apiOptions);
    const response = await fetch(apiURL, options);
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
    return null;
  }
};

app.all('/', async function(req, res, next) {
  try {
    const resObj=await makeApiCall(req.query.apiURL, req.query.apiOptions);
    if (!resObj) {
      res.status(404).send({'message': 'Failed API server no reachable'});
    } else {
      const content = await resObj.json();
      res.status(resObj.status).send(content);
    }
  } catch (err) {
    res.status(404).send({'message': 'API server not reachable'});
  }
  next();
});

app.listen(port);
console.log(`Server started at http://localhost: ${port}`);