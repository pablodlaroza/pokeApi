
$(function () {
  const content = $('.pokemon-container');
  let offset = 1;
  let limit = 20;

  function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        createPokemon(data);
      });
  }

  function createPokemon(pokemon) {
    const flipCard = $('<div>').addClass('flip-card');
    const cardContainer = $('<div>').addClass('card-container');
  
    flipCard.append(cardContainer);
  
    const card = $('<div>').addClass('pokemon-block');
    
    const spriteContainer = $('<div>').addClass('img-container');
    const sprite = $('<img>').attr('src', pokemon.sprites.front_shiny);
  
    spriteContainer.append(sprite);
  
    const number = $('<p>').text(`#${pokemon.id}`);
    const name = $('<p>').addClass('name').text(pokemon.name);
    const type = $('<p>').addClass('type').text(`Type: ${pokemon.types[0].type.name}`); 
    const abilities = $('<p>').addClass('abilities').text(`Abilitys:   ${pokemon.abilities.map(ability => ability.ability.name).join(', ')}`);

  
    card.append(spriteContainer);
    card.append(number);
    card.append(name);
    card.append(type); 
    ;
  
    const cardBack = $('<div>').addClass('pokemon-block-back');
    cardBack.append(stats(pokemon.stats));
    cardBack.append(abilities)
  
    cardContainer.append(card);
    cardContainer.append(cardBack);
  
    content.append(flipCard);
  }
  

  function stats(stats) {
    const statsContainer = $('<div>').addClass('stats-container');
  
    for (let i = 0; i < 5; i++) {
      const stat = stats[i];
     
      const statContainer = $('<div>').addClass('stat-container');
      const statName = $('<div>').text(stat.stat.name);
      const statNumber = $('<div>').text(stat.base_stat); 
      
  
      statContainer.append(statName);
      statContainer.append(statNumber); 
      statsContainer.append(statContainer);
    }
  
    return statsContainer;
  }

  function pokemons() {
    for (let i = 1; i <= 20; i++) {
      fetchPokemon(i);
    }
  }

  pokemons();
});













