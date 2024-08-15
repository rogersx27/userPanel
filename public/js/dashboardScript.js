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
    const { title, description, startTime, endTime, location } = getValues()

    if (title && startTime && endTime) {
      const response = await createEvent(
        title,
        description,
        startTime,
        endTime,
        location,
      )

      if (response.success) {
        const newEvent = document.createElement('div')
        newEvent.classList.add('event')

        const eventTitle = document.createElement('h2')
        eventTitle.textContent = title
        newEvent.appendChild(eventTitle)

        const eventDescription = document.createElement('p')
        eventDescription.textContent = description || 'Sin descripción'
        newEvent.appendChild(eventDescription)

        const eventStartTime = document.createElement('p')
        eventStartTime.innerHTML = `<span>Hora de inicio:</span> ${new Date(
          startTime,
        ).toLocaleString('es-ES')}`
        newEvent.appendChild(eventStartTime)

        const eventEndTime = document.createElement('p')
        eventEndTime.innerHTML = `<span>Hora de fin:</span> ${new Date(
          endTime,
        ).toLocaleString('es-ES')}`
        newEvent.appendChild(eventEndTime)

        const eventLocation = document.createElement('p')
        eventLocation.innerHTML = `<span>Ubicación:</span> ${
          location || 'Sin ubicación'
        }`
        newEvent.appendChild(eventLocation)

        dashboardContainer.insertBefore(newEvent, addButton.parentElement)

        popupContainer.style.display = 'none'
        clearPopupInputs()
        return
      } else {
        alert('Error al crear el evento')
      }
    } else {
      alert(
        'Por favor, completa todos los campos obligatorios antes de guardar.',
      )
    }
  }

  async function createEvent(title, description, startTime, endTime, location) {
    const response = await fetch('http://localhost:3005/createEvent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        start_time: startTime,
        end_time: endTime,
        location,
      }),
    })
    return response.json()
  }

  function getValues() {
    const title = document.getElementById('event-title').value
    const description = document.getElementById('event-description').value
    const startTime = document.getElementById('event-start-time').value
    const endTime = document.getElementById('event-end-time').value
    const location = document.getElementById('event-location').value

    return { title, description, startTime, endTime, location }
  }

  function clearPopupInputs() {
    document.getElementById('event-title').value = ''
    document.getElementById('event-description').value = ''
    document.getElementById('event-start-time').value = ''
    document.getElementById('event-end-time').value = ''
    document.getElementById('event-location').value = ''
  }
})
