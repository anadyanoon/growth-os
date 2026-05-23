document.addEventListener('DOMContentLoaded', () => {
  // Color Switcher
  const dots = document.querySelectorAll('.dot');
  const root = document.documentElement;
  
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      // Remove active class from all
      dots.forEach(d => d.classList.remove('on'));
      // Add active class to clicked
      e.target.classList.add('on');
      // Update CSS variable
      const newColor = e.target.getAttribute('data-c');
      root.style.setProperty('--accent', newColor);
    });
  });

  // Font Switcher
  const fontSel = document.getElementById('fontsel');
  fontSel.addEventListener('change', (e) => {
    const newFont = e.target.value;
    if (newFont === 'Pixel') {
      root.style.setProperty('--font-display', "'Pixelify Sans', sans-serif");
    } else {
      root.style.setProperty('--font-display', `'${newFont}', cursive`);
    }
  });

  // Edit Mode Toggle
  const editBtn = document.getElementById('editBtn');
  const editTxt = document.getElementById('editTxt');
  const editableElements = document.querySelectorAll('[data-edit]');
  let isEditing = false;

  editBtn.addEventListener('click', () => {
    isEditing = !isEditing;
    
    if (isEditing) {
      editBtn.classList.add('active');
      editTxt.innerText = 'Done';
      editableElements.forEach(el => {
        el.classList.add('editable');
        el.setAttribute('contenteditable', 'false');
      });
    } else {
      editBtn.classList.remove('active');
      editTxt.innerText = 'Edit';
      editableElements.forEach(el => {
        el.classList.remove('editable');
        el.setAttribute('contenteditable', 'false');
      });
      // In a real app, you would save the edited content to localStorage here
    }
  });

  // AI Generator Fake Action
  const aiSend = document.getElementById('aiSend');
  const aiIn = document.getElementById('aiIn');
  
  aiSend.addEventListener('click', () => {
    if(!aiIn.value) return;
    const btnIcon = aiSend.innerHTML;
    aiSend.innerHTML = '<i class="ti ti-loader"></i>';
    
    setTimeout(() => {
      aiSend.innerHTML = '<i class="ti ti-check"></i>';
      aiIn.value = "Concept generated! Check your Idea Pop room.";
      setTimeout(() => {
        aiSend.innerHTML = btnIcon;
        aiIn.value = "";
      }, 2000);
    }, 1500);
  });

  // Room Clicks (Simple alert for now)
  const rooms = document.querySelectorAll('.room');
  rooms.forEach(room => {
    room.addEventListener('click', (e) => {
      if(isEditing) return; // Prevent clicking rooms while editing text
      const roomName = room.getAttribute('data-room');
      alert(`Opening ${roomName} workspace...`);
    });
  });
});
