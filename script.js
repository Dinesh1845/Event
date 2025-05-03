let events = [
    {
      id: 1,
      title: "Tech Conference 2025",
      description: "Join tech leaders for insights into the future of AI.",
      date: "2025-06-15",
      location: "Chennai"
    },
    {
      id: 2,
      title: "Startup Pitch Night",
      description: "Watch or join startup founders pitching ideas.",
      date: "2025-06-20",
      location: "Bangalore"
    }
  ];
  
  const eventSection = document.getElementById("event-section");
  const createSection = document.getElementById("create-section");
  const registerSection = document.getElementById("register-section");
  const eventList = document.getElementById("event-list");
  const searchInput = document.getElementById("search");
  const createForm = document.getElementById("create-event-form");
  const userForm = document.getElementById("user-form");
  const qrSection = document.getElementById("qr-section");
  
  // Show selected section
  function showSection(section) {
    eventSection.style.display = section === "events" ? "block" : "none";
    createSection.style.display = section === "create" ? "block" : "none";
    registerSection.style.display = "none";
    qrSection.style.display = "none";
  }
  
  function showRegisterForm(eventId) {
    eventSection.style.display = "none";
    createSection.style.display = "none";
    registerSection.style.display = "block";
    qrSection.style.display = "none";
  
    // Generate QR when form submitted
    userForm.onsubmit = function (e) {
      e.preventDefault();
      const qrContent = `EventID: ${eventId} | Name: ${userForm[0].value} | Email: ${userForm[1].value}`;
      document.getElementById("qrcode").innerHTML = "";
      QRCode.toCanvas(document.getElementById("qrcode"), qrContent, function (error) {
        if (error) console.error(error);
      });
      userForm.style.display = "none";
      qrSection.style.display = "block";
    };
  }
  
  function displayEvents(eventsToShow) {
    eventList.innerHTML = "";
    eventsToShow.forEach(event => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-4";
      card.innerHTML = `
        <div class="card p-3 shadow-sm h-100">
          <h5>${event.title}</h5>
          <p>${event.description}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <button class="btn btn-outline-primary" onclick="showRegisterForm(${event.id})">Register</button>
        </div>
      `;
      eventList.appendChild(card);
    });
  }
  
  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    const filtered = events.filter(e =>
      e.title.toLowerCase().includes(query) ||
      e.description.toLowerCase().includes(query) ||
      e.location.toLowerCase().includes(query)
    );
    displayEvents(filtered);
  });
  
  createForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("event-title").value.trim();
    const location = document.getElementById("event-location").value.trim();
    const date = document.getElementById("event-date").value;
    const description = document.getElementById("event-description").value.trim();
  
    const newEvent = {
      id: events.length + 1,
      title,
      description,
      date,
      location
    };
  
    events.push(newEvent);
    displayEvents(events);
    createForm.reset();
    showSection("events");
  });
  
  // Initial display
  displayEvents(events);
  