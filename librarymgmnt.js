let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let messageEl = document.getElementById("message");
let headingEl = document.createElement("h1");
let spinnerEl = document.getElementById("spinner");


function appendAndSearchResults(search_results) {
    if (search_results.length < 1) {
        messageEl.textContent = "No results found";
        searchResultsEl.textContent = "";
        headingEl.textContent = "";
    } else {
        searchResultsEl.textContent = "";
        messageEl.textContent = "";
        headingEl.textContent = "Popular Books";
        searchResultsEl.appendChild(headingEl);

        for (let eachItem of search_results) {
            let titleEl = eachItem.title;
            let image = eachItem.imageLink;
            let author = eachItem.author;
            let imageEL = document.createElement("img");
            let textEl = document.createElement("p");
            imageEL.setAttribute("src", image);
            textEl.textContent = author;
            searchResultsEl.appendChild(imageEL);
            searchResultsEl.appendChild(textEl);
        }
    }
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none");

        let searchInputValue = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputValue;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                appendAndSearchResults(search_results);
                spinner.classList.toggle("d-none")
            });
    }
});
