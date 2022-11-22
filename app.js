const characters = []
let currentPosition = 0


async function getCharacters() {
  characters.push(...(await (await fetch('https://www.breakingbadapi.com/api/characters')).json()))
  loadCharacter(currentPosition)
}

console.log(characters)

function loadCharacter(position) {
  const currentCharacter = characters[position]

  let occupations = 'Ocupações: <ul>'
  let appearances = 'Temporadas que apareceu: <ul>'

  document.getElementById('image').src = currentCharacter.img
  document.getElementById('name').innerHTML = currentCharacter.name
  document.getElementById('birthday').innerHTML = 'Data de nascimento: ' + currentCharacter.birthday

  currentCharacter.occupation.forEach(function(occupation) {
    occupations = occupations + `<li>${occupation}</li>`
  })

  occupations = occupations + '</ul>'

  document.getElementById('occupations').innerHTML = occupations
  document.getElementById('nickname').innerHTML = 'Apelido: ' + currentCharacter.nickname
  document.getElementById('actor').innerHTML = 'Ator: ' + currentCharacter.portrayed

  currentCharacter.appearance.forEach(function(appearance) {
    appearances = appearances + `<li>${appearance}</li>`
  })

  appearances = appearances + '</ul>'
  document.getElementById('appeared').innerHTML = appearances
}

function next() {
  currentPosition = currentPosition + 1 >= characters.length ? 0 : currentPosition + 1
  loadCharacter(currentPosition)
}

function previous() {
  currentPosition = currentPosition - 1 < 0 ? characters.length - 1 : currentPosition - 1
  loadCharacter(currentPosition)
}
