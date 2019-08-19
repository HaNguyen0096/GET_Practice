'use strict';

//const apiKey = "e9a717fb800043feb57eaf69ffd23646"/*your API key here*/

function getRepos(username) {
    //takes username parameter and adds to url
    const url = `https://api.github.com/users/${username}/repos`

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}



function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the response array
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li>
        <h3>${responseJson[i].name}</h3>
        <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};




function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);