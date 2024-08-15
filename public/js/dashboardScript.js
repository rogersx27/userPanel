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

  saveButton.addEventListener('click', handleCreateEvent)

  async function handleCreateEvent() {
    const { title, date, endDate, time, location } = getValues()

    if (title && date && endDate && time && location) {
      const response = await createEvent(title, date, time, location)

      if (response.success) {
        const newEvent = document.createElement('div')
        newEvent.classList.add('event')

        const eventTitle = document.createElement('h2')
        eventTitle.textContent = title
        newEvent.appendChild(eventTitle)

        const eventDate = document.createElement('p')
        eventDate.innerHTML = `<span>Fecha de Incio:</span> ${new Date(
          date,
        ).toLocaleDateString('es-ES')}`
        newEvent.appendChild(eventDate)

        const eventEndDate = document.createElement('p')
        eventEndDate.innerHTML = `<span>Fecha de Fin:</span> ${new Date(
          endDate,
        ).toLocaleDateString('es-ES')}`

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
        alert('Error al crear el evento')
      }
    } else {
      alert('Por favor, completa todos los campos antes de guardar.')
    }
  }

  async function createEvent(title, date, endDate, time, location) {
    const response = await fetch('http://localhost:3005/createEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, endDate, time, location }),
    })
    return response.json()
  }

  function getValues() {
    const title = document.getElementById('event-title').value
    const date = document.getElementById('event-date').value
    const endDate = document.getElementById('event-end-date').value
    const time = document.getElementById('event-time').value
    const location = document.getElementById('event-location').value

    return { title, date, endDate, time, location }
  }

  function clearPopupInputs() {
    document.getElementById('event-title').value = ''
    document.getElementById('event-date').value = ''
    document.getElementById('event-time').value = ''
    document.getElementById('event-location').value = ''
    document.getElementById('event-end-date').value = ''
  }
})
