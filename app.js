const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello Express!');
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
  })

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      Params: ${req.params}
    `;
    res.send(responseText);
  });

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
  
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.get('/sum', (req, res) => {
  const one = parseInt(req.query.first);
  const two = parseInt(req.query.second);

  if (!one) {
    return res.status(400).send('Please enter the first number to sum');
  }

  if (!two) {
    return res.status(400).send('Please enter the second number to sum');
  }

  const sum = one + two;

  res.send(`The sum is ${sum}`);

});

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const upper = text.toUpperCase();
  const shift = parseInt(req.query.shift);


  if (!text) {
    return res.status(400).send('Please enter the text to cipher');
  }

  if (!shift) {
    return res.status(400).send('Please enter offset margin');
  }

  let output = '';

  for (let i = 0; i < text.length; i++) {
    let ch = upper.charCodeAt(i);
    ch += shift;
    let newCh = String.fromCharCode(ch);
    output += newCh;
  }

  res.send(`${output}`)
  
});

app.get('/lotto', (req, res) => {
  let numbers = req.query.nums;
  const numCheck = (elem) => elem === false;
  let numberHit = 0;
  let msg = '';

  if (numbers.length !== 6) {
    return res.status(400).send('Please send 6 and only 6 numbers.');
  }

  let valid = numbers.map(num => {
    let int = parseInt(num);
    if (int >= 0 && int <= 20) {
      return true;
    }
    return false;
  });

  if (valid.some(numCheck) === true) {
    return res.status(400).send('Please make sure all numbers are between 1 and 20');
  }

  let winners = [];
  let result = '';
  for (let i = 0; i < 6; i++) {
    let num = Math.random() * (20 - 0) + 0;
    winners.push(Math.round(num));
  }

  for (let i = 0; i < 6; i++) {
    let found = winners.find(item => item === parseInt(numbers[i]));
    if (found) {
      numberHit += 1;
    }
  }

  if (numberHit < 4) {
    msg = 'Sorry you did not hit enough to win a prize =(';
  }

  if (numberHit >= 4) {
    msg = 'Congratulations you win a free ticket!';
  }

  if (numberHit >= 5) {
    msg = 'Congratulations you win 100!';
  }

  if (numberHit >= 6) {
    msg = 'Wowzers you win millions!';
  }

  res.send(`
  The numbers entered were: ${numbers}
  And the winners were: ${winners}
  And the number of matches were: ${numberHit}
  ${msg}
  `)
});