require('dotenv').config();

const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');



const app = express();
app.set('view engine', 'ejs');

app.use(ejsLayouts);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to my App'); // Yo, Rome: what is this doing?
});

app.get('/pokemon', function(req, res) {
    var pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/';
    // Use request to call the API
    axios.get(pokemonUrl).then( function(apiResponse) {
      var pokemon = apiResponse.data.results;
      
      res.render('index', { pokemon: pokemon.slice(0, 151) }); // pokemon api has a default limit of 20 
    })
  });


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

