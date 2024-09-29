const imageWrapper = document.querySelector(".image-box");
const Api = "gieAv81Lg39fbW8YoK4H2Ld4681uajr11x57EM7cNCkHaejh8Ilh6xQf";
const singlePage = document.querySelector(".single-page");
const closeIcon = document.querySelector(".close-icon");
const singleImage = document.getElementById("single-image");
const authorName = document.getElementById("author-name");
const downloadLink = document.getElementById("download-link");

const perPage = 15;
let currentpage = 1;
let searchQuery = '';  

const generateImage = (images) => {
    imageWrapper.innerHTML += images.map(img => 
        // console.log(img)
        `
        <li class="cards">
            <img src="${img.src.large2x}" alt="${img.alt}" class="image-thumbnail">
            <div class="description">
                <p>${img.photographer}</p>
                <a href="${img.url}" target="_blank" download="${img.src.large2x}">
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
        </li>
        `
    ).join("");

    document.querySelectorAll(".image-thumbnail").forEach(img => {
        img.addEventListener("click", function() {
            singlePage.style.display = "flex"; 
            singleImage.src = img.src;         
            singleImage.alt = img.alt;         
            authorName == img.photographer ;
        });
    });
};

closeIcon.addEventListener("click", function() {
    singlePage.style.display = "none";
});

const getImage = (apiUrl) => {
    fetch(apiUrl, {
        headers: { Authorization: Api }
    })
    .then(response => response.json())
    .then(data => {
        generateImage(data.photos);
    })
}

// Load curated images by default
getImage(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perPage}`);

// Load more images when "Load More" button is clicked
document.querySelector(".load-more").addEventListener("click", function() {
    currentpage++; 
    if (searchQuery) {
        getImage(`https://api.pexels.com/v1/search?query=${searchQuery}&page=${currentpage}&per_page=${perPage}`);
    } else {
        getImage(`https://api.pexels.com/v1/curated?page=${currentpage}&per_page=${perPage}`);
    }
});

// Search images when search button is clicked
const searchImage = () => {
    let searchInput = document.getElementById("search-input").value.trim();
    if (searchInput) {
        searchQuery = searchInput;
        currentpage = 1;
        imageWrapper.innerHTML = ''; // Clear existing images
        getImage(`https://api.pexels.com/v1/search?query=${searchQuery}&page=${currentpage}&per_page=${perPage}`);
    }
}

document.querySelector("#search-button").addEventListener("click", function() {
    searchImage();
});
