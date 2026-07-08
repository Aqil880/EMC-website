// ---------- mobile nav ----------
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // ---------- registration form ----------
  const form = document.getElementById('reg-form');
  if (form) {
    const fileInput = form.querySelector('#resume');
    const fileLabel = document.getElementById('file-label');
    if (fileInput && fileLabel) {
      fileInput.addEventListener('change', () => {
        fileLabel.textContent = fileInput.files.length
          ? fileInput.files[0].name
          : 'Choose a file (PDF, DOC — max 5MB)';
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        const group = field.closest('.field');
        const isRadio = field.type === 'radio';
        const filled = isRadio
          ? form.querySelectorAll(`input[name="${field.name}"]:checked`).length > 0
          : field.value.trim().length > 0;
        if (group) group.classList.toggle('invalid', !filled);
        if (!filled) valid = false;
      });

      const successBox = document.getElementById('form-success');
      if (valid) {
        form.reset();
        if (fileLabel) fileLabel.textContent = 'Choose a file (PDF, DOC — max 5MB)';
        if (successBox) {
          successBox.hidden = false;
          successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else if (successBox) {
        successBox.hidden = true;
      }
    });
  }
});
