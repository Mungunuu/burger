$(function () {
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
        console.log('created a new burger')
        location.reload()
      }
    )
  })

  $('.change-devour').on('click', function (event) {
    var id = $(this).data('id')
    var newDevour = $(this).data('newDevour')

    var newDevourburger = {
      devoured: newDevour
    }

    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: newDevourburger
    }).then(
      function () {
        console.log('Devour to', newDevour)
        location.reload()
      }
    )
  })
})
