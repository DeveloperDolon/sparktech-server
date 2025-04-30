# PXLHUT BACKEND JOBTASK

A brief about how to run the project.

### Prerequisites
- Docker 

# Clone the repository
``https://github.com/DeveloperDolon/pxlhut-backend.git``

# Navigte to the project directory
``cd pxlhut-backend``

# Build to docker 
- If using Linux then run ``make build`` to build the project.
- If using Windows then run ``docker compose build`` to build the project in docker.
- After build the project in docker, run the project container with ``make start`` or ``docker compose up``
- To show all container that running in docker run this command ``docker ps`` and copy the project link and paste to browser.

<p>
    Please don't forget to update .env file, for essential credintial.
</p>

In ``.env.local`` file has all crediential to run the project, just copy and paste it. Just need to add ``STRIP_PUBLISHABLE_KEY`` and ``STRIP_SECRET_KEY`` value. Please make sure when you runnign the project pass the values of this variables.


# sparktech-server
