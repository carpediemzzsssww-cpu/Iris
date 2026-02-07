// JavaScript for Iris Zhou personal website

// Timeline accordion toggle
document.addEventListener('DOMContentLoaded', () => {
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });

  // Load projects on the projects page
  if (document.getElementById('projects-list')) {
    fetch('projects.json')
      .then(res => res.json())
      .then(data => {
        renderProjects(data);
      });
    const searchInput = document.getElementById('project-search');
    const tagFilter = document.getElementById('project-tags');
    const sortSelect = document.getElementById('project-sort');
    [searchInput, tagFilter, sortSelect].forEach(el => {
      if (el) {
        el.addEventListener('input', () => {
          fetch('projects.json')
            .then(res => res.json())
            .then(data => {
              renderProjects(data);
            });
        });
      }
    });
  }
});

function renderProjects(data) {
  const list = document.getElementById('projects-list');
  if (!list) return;
  // Get filter values
  const search = document.getElementById('project-search').value.toLowerCase();
  const tags = Array.from(document.querySelectorAll('#project-tags option:checked')).map(opt => opt.value);
  const sortBy = document.getElementById('project-sort').value;
  // Filter data
  let results = data.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(search) || project.oneLiner.toLowerCase().includes(search);
    const matchesTags = tags.length === 0 || tags.every(tag => project.tags.includes(tag));
    return matchesSearch && matchesTags;
  });
  // Sort
  results.sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.time) - new Date(a.time);
    } else if (sortBy === 'impact') {
      return (b.outcome?.impact || 0) - (a.outcome?.impact || 0);
    } else if (sortBy === 'technical') {
      return (b.outcome?.technical || 0) - (a.outcome?.technical || 0);
    }
    return 0;
  });
  // Render
  list.innerHTML = '';
  results.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.oneLiner}</p>
      <div class="tags">${project.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join(' ')}</div>
      <a href="projects/${project.slug}.html" class="btn secondary" style="margin-top:1rem;display:inline-block;">View →</a>
    `;
    list.appendChild(card);
  });
}
