$(function() {
$('.create-form').on('submit', function (event) {
  event.preventDefault()
  var newBurger = {
    burger_name: $('#burger-input').val().trim()
  }
  $.ajax('api/burgers', {
    type: 'POST',
    data: newBurger
  }).then(
    function () {
      console.log('created new burger')
      location.reload()
    }
  )
})
})