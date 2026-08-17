const repoList = document.getElementById('starred-list');

fetch('events.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load repositories');
    }

    return response.json();
  })
  .then((repositories) => {
    repoList.innerHTML = repositories
      .map(
        (repository) => `
          <li class="starred-item">
            <a class="repo-link" href="${repository.url}" target="_blank" rel="noreferrer">
              ${repository.name}
            </a>
            <p class="repo-description">${repository.description}</p>
            <div class="repo-meta">
              <span>★ ${repository.stars.toLocaleString()}</span>
              <span>${repository.language}</span>
            </div>
          </li>
        `,
      )
      .join('');
  })
  .catch((error) => {
    console.error(error);
    repoList.innerHTML = '<li class="error-message">Unable to load starred repositories.</li>';
  });
