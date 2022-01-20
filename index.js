let pageNum = 1;
let isChekced = false;
const navigation = document.querySelector(".navigation");
const searchBtn = document.querySelectorAll(".search-btn");
const searchInput = document.querySelector(".search-bars");
const mainSection = document.querySelector("main");
const form = document.querySelector(".form");
const loadMoreBtn = document.querySelector(".load-more");
const API_KEY = "563492ad6f91700001000001f69f99f070014ee7b93ad04ebfe2e1e4";
let API_URL = `https://api.pexels.com/v1/curated?per_page=15&page=`;
let VIDEO_API = "https://api.pexels.com/videos/search?query=nature&per_page=15&page=";
const navigationFormInput = navigation.querySelector(".nav-search-container");
const navigationInputBtn = document.querySelector(".nav-search-btn");
const select = document.querySelector(".select");
const modalSection = document.querySelector(".modal-wrapper");
const video = modalSection.querySelector("video");
const cancelModalBtn = document.querySelector(".cancel-btn");

// fetch photo api with async function 
async function getData(url){
    const response = await fetch(url,{
        method: "GET",
        headers: {
             Accept: 'application/json',
             Authorization: API_KEY
        }
    });
    const data = await response.json();
    console.log(data);
    getResults(data.photos);
    return data;
}

// get photo data change html elements
function getResults(data){
    data.forEach(datas => {
        let div = document.createElement("div");
        div.classList.add("main-card");
        div.innerHTML = `
            <div class="main-img">
                <img src="${datas.src.landscape}" alt="${datas.alt}">
            </div>
            <div class="main-img_description">
                <h2>${datas.photographer}</h2>
                <i class="icons far fa-heart"></i>
                <a href="https://www.pexels.com/photo/${datas.id}/download" download="${datas.alt}">
                    <i class="fas fa-arrow-down"></i>
                </a>
            </div>
        `;
        mainSection.appendChild(div);
    });
}


form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(isChekced){
        if(searchInput.value != ""){
            mainSection.innerHTML = ""
            const searchValue = searchInput.value;
            VIDEO_API = `https://api.pexels.com/videos/search?query=${searchValue}&per_page=15&page=1`;
            getVideoData(VIDEO_API);
        }
        else{
            alert("Please enter a value");
        }  
    }
    else{
        if(searchInput.value != ""){
            mainSection.innerHTML = "";
            pageNum = 1
            let searchVal = searchInput.value;
            console.log(searchVal);
            let searchApi = `https://api.pexels.com/v1/search?query=${searchVal}&per_page=15&page=`;
            API_URL = searchApi;
            getData(searchApi + pageNum);
        }
        else{
            alert("Please write the form!")
        }
    }
})

// navigationInput function
navigationInputBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(isChekced){
        if(navigationFormInput.value != ""){
            mainSection.innerHTML = ""
            const searchValue = navigationFormInput.value;
            VIDEO_API = `https://api.pexels.com/videos/search?query=${searchValue}&per_page=15&page=1`;
            getVideoData(VIDEO_API);
        }
        else{
            alert("Please enter a value");
        }  
    }
   else{
    if(navigationFormInput.value != ""){
        mainSection.innerHTML = "";
        pageNum = 1
        let searchVal = navigationFormInput.value;
        console.log(searchVal);
        let searchApi = `https://api.pexels.com/v1/search?query=${searchVal}&per_page=15&page=`;
        API_URL = searchApi;
        getData(searchApi + pageNum);
    }
    else{
        alert("Please write the form!")
    }
   }
})

// get video api fetch with async function
async function getVideoData(url){
    const response = await fetch(url,{
        method: "GET",
        headers: {
             Accept: 'application/json',
             Authorization: API_KEY
        }
    });
    const data = await response.json();
    console.log(data);
    getVideoResults(data.videos);
    return data;   
}

// get video data to html element
function getVideoResults(data){
    data.forEach((data,index) => {
        let div = document.createElement("div");
        div.classList.add("main-card");
        div.innerHTML = ` 
        <div class="main-img">
            <img src="${data.image}" alt="${data.name}">
        </div>
        <div class="main-img_description">
            <h2>${data.user.name}</h2>
            <i class="icons far fa-heart"></i>
            <a  href="${data.video_files[1].link}" target="_blank" download="${data.name}">
                <i class="fas fa-eye"></i>
            </a>
        </div>
        `;
        mainSection.appendChild(div);

    })
}
// User selected video and photo 
select.addEventListener("change", (e) => {
    isChekced = true;
    if (select.value == "Video"){
        mainSection.innerHTML = "";
        pageNum = 1;
        getVideoData(VIDEO_API + pageNum);  
    }
    else{
        mainSection.innerHTML = "";
        pageNum = 1;
        isChekced = false;
        getData(API_URL + pageNum);
    }
})

// open modal then icons classList add Fuctions
function openModal(e){
    const item = e.target.parentElement.parentElement;
    if(isChekced){
            console.log(e.target.classList[0]);
            if(item.classList = "main-card"){
                const videoLink = item.querySelector("a").href;
                modalSection.classList.add("active");
                video.src = videoLink;
                console.log(e.target.element);
            }
            if(e.target.classList[0] === "icons"){
                const icons = e.target;
                modalSection.classList.remove("active");
                icons.classList.add("fas");
                icons.style.color = "red";

                setTimeout(() => {
                    icons.classList.remove("fas");
                    icons.style.color = "#fff"
                },1000)
            }
    }
    else{
        isChekced = false;
        if(e.target.classList[0] === "icons"){
            const icons = e.target;
            modalSection.classList.remove("active");
            icons.classList.add("fas");
            icons.style.color = "red";

            setTimeout(() => {
                icons.classList.remove("fas");
                icons.style.color = "#fff"
            },1000)
        }
    }
}

// closeModal
function closeModal(){
    modalSection.classList.remove('active');
}

//load more function
loadMoreBtn.addEventListener('click',() => {
    if(pageNum < 15){
        pageNum+1
    }
    else{
        pageNum = 15;
    }
    if(isChekced){
        pageNum++;
        getVideoData(`${VIDEO_API}${pageNum}`);
    }
    else{
        pageNum++;
        getData(`${API_URL}${pageNum}`);
    }
})


cancelModalBtn.addEventListener("click",closeModal);
mainSection.addEventListener('click',openModal)
window.addEventListener("load",getData(API_URL + 1));
window.addEventListener('scroll',() => {
    navigation.classList.toggle('active',window.scrollY > 0)
})

