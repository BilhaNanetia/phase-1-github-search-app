 document.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    let searchType = "user";                    //User is the default search type
  

     githubForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = searchInput.value.trim();
  

      if (searchType === "user") {
        searchUsers(searchTerm);
      } else if (searchType === "repo") {
        searchRepos(searchTerm);
      }

     });
  

     userList.addEventListener("click", (event) => {
      if (event.target.tagName === "LI") {
        const username = event.target.dataset.username;
        getRepositories(username);
      }

     });
  
     function searchUsers(searchTerm) {
      fetch(`https://api.github.com/search/users?q=${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
          displayUsers(data.items);
        })
        .catch((error) => console.error("Error searching users:", error));
     }
  
     function displayUsers(users) {
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user.login;
        li.dataset.username = user.login;             //Username is stored as a dataset attribute
        userList.appendChild(li);

      });

     }
  
     function getRepositories(username) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((repos) => {
          displayRepositories(repos);
        })
        .catch((error) => console.error("Error fetching repositories:", error));
     }
  

     function displayRepositories(repos) {
      reposList.innerHTML = "";
      repos.forEach((repo) => {
        const li = document.createElement("li");
        li.textContent = repo.name;
        reposList.appendChild(li);

      });

     }
  
      //Toggle the search type between the user and the repo
     const searchTypeBtn = document.createElement("button");
     searchTypeBtn.textContent = "Toggle Search Type";
     searchTypeBtn.addEventListener("click", () => {
      searchType = searchType === "user" ? "repo" : "user";
      searchInput.placeholder = `Search ${searchType === "user" ? "users" : "repositories"}...`;
     });
     githubForm.appendChild(searchTypeBtn);

     });