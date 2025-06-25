  const sequence = [];
    const colors = ["red", "blue", "green", "yellow"];
    let userInput = [];
    let acceptingInput = false;

    function startGame() {
  sequence.length = 0;
  userInput = [];
  acceptingInput = false;
  document.getElementById("feedback").innerText = "";
  document.getElementById("game-status").innerText = "Watch the sequence carefully...";

  for (let i = 0; i < 3; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(color);
  }
  playSequence();
}

function playSequence() {
  sequence.forEach((color, index) => {
    setTimeout(() => {
      const box = document.getElementById(color);
      box.classList.add("active");
      setTimeout(() => box.classList.remove("active"), 500);
    }, index * 1000);
  });

  setTimeout(() => {
    acceptingInput = true;
    document.getElementById("game-status").innerText = "Your turn! Repeat the sequence.";
    document.querySelectorAll('.color-box').forEach(box => box.classList.add("hover-enabled"));
  }, sequence.length * 1000);
}


   document.querySelectorAll(".color-box").forEach(box => {
  box.addEventListener("click", (e) => {
    if (!acceptingInput) return;
    const color = e.target.id;
    userInput.push(color);

    // 🌟 Add temporary shine effect
    e.target.classList.add("clicked");
    setTimeout(() => e.target.classList.remove("clicked"), 400);

    const feedback = document.getElementById("feedback");

    if (color === sequence[userInput.length - 1]) {
      if (userInput.length === sequence.length) {
        feedback.style.color = 'green';
        feedback.innerText = "Great job! You remembered the sequence.";
        acceptingInput = false;
        document.querySelectorAll('.color-box').forEach(box => box.classList.remove("hover-enabled"));
      }
    } else {
      feedback.style.color = 'red';
      feedback.innerText = "Oops! That was incorrect. Try again.";
      acceptingInput = false;
      document.querySelectorAll('.color-box').forEach(box => box.classList.remove("hover-enabled"));
    }
  });
});


    function saveJournal() {
      const entry = document.getElementById("journal-entry").value;
      if (entry.trim()) {
        const date = new Date().toLocaleDateString();
        localStorage.setItem(`journal-${date}`, entry);
        document.getElementById("journal-saved").innerText = "Journal entry saved.";
        setTimeout(() => {
          document.getElementById("journal-saved").innerText = "";
          document.getElementById("journal-entry").value = "";
        }, 2000);
      }
    }

    function renderMoodChart() {
      const ctx = document.getElementById('moodChart').getContext('2d');
      const moodData = JSON.parse(localStorage.getItem('moodData')) || [3, 4, 2, 5, 1];
      const moodLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: moodLabels,
          datasets: [{
            label: 'Mood Level (1-5)',
            data: moodData,
            borderColor: '#2a8dd2',
            backgroundColor: 'rgba(42,141,210,0.1)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              min: 0,
              max: 5
            }
          }
        }
      });
    }

    function resetMoodData() {
      localStorage.removeItem('moodData');
      alert("Mood data has been reset. Reload to see changes.");
    }


    function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

window.onload = () => {
  renderMoodChart();
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }
  loadJournalEntries(); // load journal entries
};

    window.onload = () => {
      renderMoodChart();
    }