// --- Configuration ---
const ORGANIZATION_NAME = 'gs-managedservice'; // <--- !!! IMPORTANT: Replace with your actual GitHub Organization name !!!

// --- Static Project Data for Side Navigation ---
const projects = {
    FileMover: {
        name: 'File Mover',
        description: 'Precision file transfer system for telecom mediation invalid traffic reprocessing. Moves exact file quantities based on target directory capacity requirements with MB-level precision.',
        features: [
           'Precision Sizing: Moves exact MB quantities needed (70MB default)',
           'Pattern Matching: Processes only INV_2018* files',
           'Atomic Operations: Uses mv -f for reliable transfers',
           'Comprehensive Logging: Detailed operation records',
           'Capacity Awareness: Checks destination size before moving'
        ],
        url: 'https://github.com/gs-managedservice/FileMover'
    },
    FileHousekeepingSystem: {
        name: 'Telecom File Housekeeping System',
        description: 'Enterprise-grade data lifecycle management solution for telecom mediation systems. Provides automated archiving, deletion, and cleanup of traffic data files with configurable retention policies and robust error handling.',
        features: [
            'Tiered Retention: Separate policies for archiving (7 days) and deletion (90 days)',
'Pattern-Based Processing: Only processes files with "_YYYYMMDD" pattern',
'PID Locking: Prevents concurrent execution',
'Comprehensive Logging: Detailed operation logging with error alerts',
'Multi-Location Support: Handles multiple source/target pairs'
        ],
        url: 'https://github.com/gs-managedservice/HouseKeeper'
    },
    ODSTrafficFileMonitor: {
        name: 'ODS Traffic File Monitor',
        description: 'Enterprise-grade monitoring solution for telecom ODS (Operational Data Store) file delivery systems. Verifies daily file arrival integrity and alerts stakeholders about missing deliveries.',
        features: [
'Telecom mediation system monitoring',
'SLA compliance for file-based integrations',
'Data pipeline integrity verification',
'Operational data warehouse feeds',
'Billing system input validation'],
        url: 'https://github.com/gs-managedservice/RecentODS'
    },
    EnterpriseDiskSpaceMonitor: {
        name:'Enterprise Disk Space Monitor',
        description: 'Real-time filesystem capacity monitoring solution with intelligent filtering and email alerting. Designed for 24/7 production environments with strict storage SLAs.',
        features: ['Production storage monitoring',
'Cloud volume capacity management',
'SLA compliance for critical systems',
'Storage forecasting and planning',
'Containerized environment disk pressure alerts'],
        url: 'https://github.com/gs-managedservice/DiskSpaceAlarm'
    },
    TelecomDataLifecycleManager: {
        name: 'Telecom Data Lifecycle Manager',
        description: 'Comprehensive maintenance solution for telecom operational data with tiered retention policies. Combines log rotation, parameter cleanup, and invalid traffic data archiving in a single automated workflow.',
        features: [
            'Telecom mediation system maintenance',
'Storage optimization for call data records',
'Compliance with data retention regulations',
'Operational log rotation',
'Invalid call data archiving'],
        url: 'https://github.com/gs-managedservice/CallDataCurator'    
    },
    OracleCleanUp: {
        name: 'Oracle Clean Up',
        description:'Enterprise-grade data retention tool for Oracle databases. Performs automated cleanup of CCL integration tables while maintaining strict audit trails. Designed for telecom billing systems with high compliance requirements.',
        features: [
            'Billing system data lifecycle management',
'GDPR/CCPA compliance enforcement',
'Database performance optimization',
'Storage cost reduction',
'Audit preparation'],
        url: 'https://github.com/gs-managedservice/OracleCleanUp'
    },
    TrafficDataArchivalAutomation: {
        name: 'Traffic Data Archival Automation',
        description:'Enterprise-grade data lifecycle management solution for telecom traffic exports. Performs automated compression and cleanup of network data directories with strict retention policy enforcement.',
        features: [
            'Regulatory compliance (GDPR, CCPA)',
'Network traffic pattern analysis',
'Storage cost optimization',
'Disaster recovery preparation',
'Billing system data lifecycle management'],
        url: 'https://github.com/gs-managedservice/Archive'

    },
    ZiraGitOperations:{ 
        name: 'Zira Git Operations',
        description:'Emergency Git repository reset tool for critical configuration management scenarios. Forcefully reinitializes repositories while preserving working directory contents, designed for recovery from corruption or sensitive data leaks.',
        features:['Emergency sanitization of accidental commits',
'Pre-deployment configuration finalization',
'Recovery from repository corruption',
'Elimination of sensitive data from history',
'CI/CD pipeline artifact preparation'],
        url: 'https://github.com/gs-managedservice/Zira-Git-Operations'

    },
    DeleteLogs:{
        name: 'Delete Logs',
        description:'Targeted cleanup solution for application-specific artifacts with tiered retention policies. Ensures operational hygiene while maintaining compliance with enterprise data lifecycle requirements.',
        features: ['Application log lifecycle management',
'Compliance-driven parameter rotation',
'Storage cost optimization in containerized environments',
'Audit preparation through artifact control',
'CI/CD pipeline cleanup integration'],
        url: 'https://github.com/gs-managedservice/Delete-Logs'
    },
    SyncFiles:{
        name: 'Sync Files',
        description:'Robust file synchronization solution with bandwidth management and intelligent filtering. Designed for large-scale data transfers while maintaining system performance and transfer integrity.',
        features:['Disaster recovery replication',
'Cross-datacenter data mirroring',
'Production-to-staging environment sync',
'Bulk asset migration projects',
'Compliance data archiving'],
        url: 'https://github.com/gs-managedservice/SyncFiles'
    },
    SendSMS:{
        name: 'Send SMS',
    description:'Enterprise-grade SMS notification system using SMPP protocol. Integrates with Java-based SMPP clients to deliver critical alerts with delivery logging. Designed for operational reliability in high-availability environments.',
    features: ['Critical infrastructure outage alerts',
'Two-factor authentication code delivery',
'Emergency maintenance notifications',
'Security incident broadcasting',
'High-priority business continuity messaging'],
url: 'https://github.com/gs-managedservice/SendSMS'        
    },
    logMaintainer:{
        name: 'Log Maintainer',
description:'Automates log file lifecycle management with tiered retention policies. Handles compression, selective deletion, and audit logging while maintaining operational safety through path validation.',
features:['CI/CD pipeline log rotation',
'Compliance-driven log retention',
'Cloud resource cost optimization',
'Storage pressure mitigation for high-volume systems'],
url: 'https://github.com/gs-managedservice/logMaintainer'
    },
    CronBackup:
    {
        name: 'Cron Backup',
description:'Automates backup of user-specific cron job scripts while intelligently filtering system paths. Creates timestamped backups with host-specific organization for operational reliability.',
features:['Disaster recovery preparation for cron-dependent systems',
'Compliance auditing of scheduled job scripts',
'Migration assistance between servers',
'Version control integration for cron-managed scripts'],
url: 'https://github.com/gs-managedservice/CronBackup'
    },
TimeBasedCleanup:{
    name: 'Time-Based Cleanup',
description:'Automates deletion of files older than 2 hours from a target directory with audit logging. Designed for operational maintenance of temporary files and cache systems.',
features:['CI/CD pipeline cache maintenance',
'Temporary file cleanup in processing systems',
'Log rotation companion tool',
'Storage space management for ephemeral data'],
url: 'https://github.com/gs-managedservice/TimeBasedCleanup'
},

    apiService: {
        name: 'Internal API Service',
        description: 'Our core backend service handles all internal data processing and business logic. It\'s built with scalability in mind and serves as the backbone for multiple applications.',
        features: [
            'Core backend service for data processing',
            'Scalable architecture',
            'Handles all internal business logic',
            'Serves as the backbone for multiple applications'
        ],
        url: 'https://github.com/YourOrgName/internal-api-service'
    }
};

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
const displayArea = document.getElementById('project-display');
const navLinks = document.querySelectorAll('.side-nav .nav-link');

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

// --- Side Navigation Logic ---
/**
 * Renders the details of a selected project into the display area.
 * @param {string} projectName - The key of the project in the `projects` object.
 */
function displayProject(projectName) {
    const project = projects[projectName];
    if (!project) {
        displayArea.innerHTML = '<h2>Project not found.</h2><p>Please select a valid project from the menu.</p>';
        return;
    }

    const featuresHtml = project.features.map(feature => `<li>${feature}</li>`).join('');

    displayArea.innerHTML = `
        <h2>${project.name}</h2>
        <p>${project.description}</p>
        <h3>Key Features:</h3>
        <ul>${featuresHtml}</ul>
        <a href="${project.url}" target="_blank" class="repo-link-button">Read More on GitHub</a>
    `;
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

// --- Initial Page Load and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Initialize GitHub API sections ---
    // fetchRepositories(); // This populates a section that is currently commented out in index.html
    fetchTopContributors();

    // --- Initialize Side Navigation ---
    const navLinks = document.querySelectorAll('.side-nav .nav-link');

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add active class to the clicked link
            e.currentTarget.classList.add('active');
            // Display the corresponding project
            const projectName = e.currentTarget.dataset.project;
            displayProject(projectName);
        });
    });

    // --- Set initial state for the side navigation ---
    if (navLinks.length > 0) {
        // Add 'active' class to the first link to make it appear selected on load
        navLinks[0].classList.add('active');
        // Trigger display of the first project
        const firstProjectName = navLinks[0].dataset.project;
        displayProject(firstProjectName);
    }
});
