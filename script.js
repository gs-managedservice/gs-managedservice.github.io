// --- Configuration ---
const ORGANIZATION_NAME = 'gs-managedservice'; // <--- !!! IMPORTANT: Replace with your actual GitHub Organization name !!!
const REPOS_API_URL = `https://api.github.com/orgs/${ORGANIZATION_NAME}/repos`;
const CONTRIBUTORS_API_URL = `https://api.github.com/repos/${ORGANIZATION_NAME}/`; // Will append /contributors for each repo

// --- DOM Elements ---
const orgNameElement = document.getElementById('org-name');
const orgDescriptionElement = document.getElementById('org-description'); // You can dynamically fetch this if your org has a bio
const reposListElement = document.getElementById('repos-list');
const reposErrorMessageElement = document.getElementById('repos-error-message');
const contributorsGridElement = document.getElementById('contributors-grid');
const contributorsErrorMessageElement = document.getElementById('contributors-error-message');
const repoPopupOverlay = document.getElementById('repo-popup-overlay');
const repoPopup = document.getElementById('repo-popup');
const popupRepoName = document.getElementById('popup-repo-name');
const popupRepoContent = document.getElementById('popup-repo-content');
const popupRepoLink = document.getElementById('popup-repo-link');

// Markdown-it instance
const md = new markdownit();

// --- Helper Functions ---

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw to be caught by the caller
    }
}

function showErrorMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideErrorMessage(element) {
    element.style.display = 'none';
    element.textContent = '';
}

// --- Repository Section Logic ---

async function fetchRepositories() {
    try {
        reposListElement.innerHTML = '<li><i class="fas fa-spinner fa-spin"></i> Loading repositories...</li>'; // Show loading
        hideErrorMessage(reposErrorMessageElement);

        const repos = await fetchData(REPOS_API_URL + '?per_page=100'); // Fetch more if you have many

        if (repos.length === 0) {
            reposListElement.innerHTML = '<li>No public repositories found for this organization.</li>';
            return;
        }

        reposListElement.innerHTML = ''; // Clear loading message

        repos.sort((a, b) => b.stargazers_count - a.stargazers_count); // Sort by stars (or choose another metric)

        repos.forEach(repo => {
            const listItem = document.createElement('li');
            const repoLink = document.createElement('a');
            repoLink.href = repo.html_url;
            repoLink.textContent = repo.name;
            repoLink.target = "_blank"; // Open in new tab
            
            const infoIcon = document.createElement('i');
            infoIcon.className = 'fas fa-info-circle repo-info-icon';
            infoIcon.title = `Click for more details about ${repo.name}`;
            infoIcon.dataset.repoName = repo.name;
            infoIcon.dataset.repoOwner = ORGANIZATION_NAME; // Store org name for fetching readme
            infoIcon.addEventListener('click', showRepoDetails);

            listItem.appendChild(repoLink);
            listItem.appendChild(infoIcon);
            reposListElement.appendChild(listItem);
        });

    } catch (error) {
        console.error('Failed to load repositories:', error);
        reposListElement.innerHTML = ''; // Clear loading message
        showErrorMessage(reposErrorMessageElement, 'Failed to load repositories. Please check the organization name or try again later.');
    }
}

async function showRepoDetails(event) {
    const repoName = event.target.dataset.repoName;
    const repoOwner = event.target.dataset.repoOwner; // This will be ORGANIZATION_NAME for dynamic ones
    const repoGithubUrl = `https://github.com/${repoOwner}/${repoName}`; // Default URL

    // Get the manually defined description if it exists
    const manualDescription = event.target.dataset.repoDescription; // <--- NEW LINE

    popupRepoName.textContent = repoName;
    popupRepoLink.href = repoGithubUrl; // This will be the direct GitHub link for public or manual
    repoPopupOverlay.style.display = 'flex';

    if (manualDescription) { // <--- NEW CONDITIONAL LOGIC
        // If a manual description is provided (for private/manual entries)
        popupRepoContent.innerHTML = md.render(manualDescription); // Render the manual description as Markdown
        return; // Exit the function, no need to fetch API
    }

    // --- Original logic for public repos (remains unchanged) ---
    // This part will only execute if manualDescription is NOT present
    popupRepoContent.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Loading repository details...</p>'; // Show loading inside popup

    const readmeUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/readme`;
    try {
        const readmeResponse = await fetch(readmeUrl, {
            headers: {
                'Accept': 'application/vnd.github.v3.raw' // Request raw content
            }
        });

        if (!readmeResponse.ok) {
            popupRepoContent.innerHTML = '<p>No detailed description found (README.md not available or readable).</p>';
            return;
        }

        const readmeMarkdown = await readmeResponse.text();
        const htmlContent = md.render(readmeMarkdown);
        popupRepoContent.innerHTML = htmlContent;

    } catch (error) {
        console.error('Error fetching README:', error);
        popupRepoContent.innerHTML = '<p style="color: red;">Failed to load details. Network error or API issue.</p>';
    }
}

function closeRepoPopup() {
    repoPopupOverlay.style.display = 'none';
    popupRepoContent.innerHTML = ''; // Clear content for next time
    popupRepoName.textContent = '';
    popupRepoLink.href = '#';
}

// --- Contributors Section Logic ---
// This is more complex as GitHub API provides contributors per repo, not org-wide easily.
// We'll iterate through repos and sum up contributions, then sort.
async function fetchTopContributors() {
    try {
        contributorsGridElement.innerHTML = '<p><i class="fas fa-spinner fa-spin"></i> Loading contributors...</p>';
        hideErrorMessage(contributorsErrorMessageElement);

        const repos = await fetchData(REPOS_API_URL + '?per_page=100'); // Fetch repos to get their contributors

        if (repos.length === 0) {
            contributorsGridElement.innerHTML = '<p>No repositories to determine contributors from.</p>';
            return;
        }

        const allContributorsMap = new Map(); // Map to store unique contributors and their total contributions

        for (const repo of repos) {
            // Fetch contributors for each public repository
            // Note: This can hit rate limits quickly for many repos!
            // For production, consider using a server-side cache or a PAT if you own the token.
            const contributorsUrl = `https://api.github.com/repos/${ORGANIZATION_NAME}/${repo.name}/contributors`;
            try {
                const repoContributors = await fetchData(contributorsUrl);
                repoContributors.forEach(contributor => {
                    if (contributor.type === 'User') { // Filter out bots, dependabot, etc.
                        const currentContributions = allContributorsMap.get(contributor.login) || 0;
                        allContributorsMap.set(contributor.login, currentContributions + contributor.contributions);
                    }
                });
            } catch (repoError) {
                console.warn(`Could not fetch contributors for ${repo.name}:`, repoError.message);
                // Continue to next repo even if one fails
            }
        }

        if (allContributorsMap.size === 0) {
            contributorsGridElement.innerHTML = '<p>No public contributors found across repositories.</p>';
            return;
        }

        // Convert map to array, sort by contributions, and take top 5
        const sortedContributors = Array.from(allContributorsMap.entries())
            .sort((a, b) => b[1] - a[1]) // Sort descending by contributions
            .slice(0, 5); // Get top 5

        contributorsGridElement.innerHTML = ''; // Clear loading message

        sortedContributors.forEach(async ([username, contributions]) => {
            const userProfile = await fetchData(`https://api.github.com/users/${username}`);
            const contributorItem = document.createElement('div');
            contributorItem.className = 'contributor-item';
            contributorItem.innerHTML = `
                <a href="${userProfile.html_url}" target="_blank">
                    <img src="${userProfile.avatar_url}" alt="${username}'s avatar">
                    <h4>${username}</h4>
                </a>
                <p>${contributions} contributions</p>
                ${userProfile.bio ? `<p class="bio">${userProfile.bio}</p>` : ''}
            `;
            contributorsGridElement.appendChild(contributorItem);
        });

    } catch (error) {
        console.error('Failed to load top contributors:', error);
        contributorsGridElement.innerHTML = '';
        showErrorMessage(contributorsErrorMessageElement, 'Failed to load top contributors. Rate limit or network issue.');
    }
}

// --- Initial Data Loading ---
document.addEventListener('DOMContentLoaded', () => {
    // You might fetch org details here if the API provides a suitable bio
    // For now, we're using a static description in HTML
    // orgNameElement.textContent = ORGANIZATION_NAME; // Could also dynamically set the name

    fetchRepositories();
    fetchTopContributors();
});
