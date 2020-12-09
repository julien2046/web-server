const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;

  if (location.length) {
    messageOne.textContent = 'Loading ...';
    messageTwo.textContent = '';

    fetch(`/weather?address=${location}`).then((response) => {

      if (response.ok) {
        response.json().then((data) => {
          messageOne.textContent = String(data.location);
          messageTwo.textContent = String(data.forecast);
        })
      } else {
        console.log('Issue with the service.')
      }
    })
  } 
});