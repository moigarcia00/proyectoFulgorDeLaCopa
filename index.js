    const container = document.getElementById('sparkles');
    const goldTones = ['#ffcf6b', '#f2a93b', '#ffe6b0'];
    const total = 28;

    for (let i = 0; i < total; i++) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      const size = Math.random() * 10 + 4;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.top = Math.random() * 90 + '%';
      s.style.left = Math.random() * 100 + '%';
      s.style.background = goldTones[Math.floor(Math.random() * goldTones.length)];
      s.style.animationDelay = (Math.random() * 3.5) + 's';
      s.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      container.appendChild(s);
    }

    const colors = ['#f2a93b', '#4ea8de', '#4caf50', '#e63946', '#ffcf6b'];
    for (let i = 0; i < 18; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.top = Math.random() * 70 + '%';
      c.style.left = Math.random() * 100 + '%';
      c.style.animationDelay = (Math.random() * 6) + 's';
      c.style.animationDuration = (6 + Math.random() * 6) + 's';
      container.appendChild(c);
    }