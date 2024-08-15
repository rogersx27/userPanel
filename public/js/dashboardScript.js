document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.querySelector('.add-event button')
  const popupContainer = document.querySelector('.popup-container')
  const saveButton = document.querySelector('.save-button')
  const cancelButton = document.querySelector('.cancel-button')
  const dashboardContainer = document.querySelector('.dashboard-container')

  addButton.addEventListener('click', function () {
    popupContainer.style.display = 'flex'
  })

  cancelButton.addEventListener('click', function () {
    popupContainer.style.display = 'none'
    clearPopupInputs()
  })

  saveButton.addEventListener('click', function () {
    const title = document.getElementById('event-title').value
    const date = document.getElementById('event-date').value
    const time = document.getElementById('event-time').value
    const location = document.getElementById('event-location').value

    if (title && date && time && location) {
      const newEvent = document.createElement('div')
      newEvent.classList.add('event')

      const eventTitle = document.createElement('h2')
      eventTitle.textContent = title
      newEvent.appendChild(eventTitle)

      const eventDate = document.createElement('p')
      eventDate.innerHTML = `<span>Fecha:</span> ${new Date(
        date,
      ).toLocaleDateString('es-ES')}`
      newEvent.appendChild(eventDate)

      const eventTime = document.createElement('p')
      eventTime.innerHTML = `<span>Hora:</span> ${time}`
      newEvent.appendChild(eventTime)

      const eventLocation = document.createElement('p')
      eventLocation.innerHTML = `<span>Ubicación:</span> ${location}`
      newEvent.appendChild(eventLocation)

      dashboardContainer.insertBefore(newEvent, addButton.parentElement)

      popupContainer.style.display = 'none'
      clearPopupInputs()
    } else {
      alert('Por favor, completa todos los campos antes de guardar.')
    }
  })

  function clearPopupInputs() {
    document.getElementById('event-title').value = ''
    document.getElementById('event-date').value = ''
    document.getElementById('event-time').value = ''
    document.getElementById('event-location').value = ''
  }
})
