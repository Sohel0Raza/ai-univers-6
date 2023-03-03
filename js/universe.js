// API data load by fetch
const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.tools);
    }
    catch (error) {
        console.log(error);
    }
}

// display API data
const displayData = (allData) => {
    const dataContainer = document.getElementById('data-container');
    // display 6 items
    const showAllData = document.getElementById('showAll-data');
    // if(allData.length > 6){
    //     allData = allData.slice(0,6)
    //     showAllData.classList.remove('d-none')
    // }
    // else{
    //     showAllData.classList.add('d-none')
    // }
    allData.forEach(data => {
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col')
        dataDiv.innerHTML = `
        <div class="card h-100">
            <img class="p-3 img-fluid" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body pb-0">
                    <h5 class="card-title">Features</h5>
                    <ol id="features">
                       
                    </ol>
                    <hr>
                </div>
                <div class="d-flex justify-content-between align-items-center px-3">
                    <div>
                        <h5>${data.name}</h5>
                        <p><i class="fa-regular fa-calendar-days"></i> ${data.published_in}</p>
                    </div>
                    <div>
                        <button onclick="loadDetail('${data.id}')" type="button" class="btn btn-outline-danger rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
        </div>
        `;

        dataContainer.appendChild(dataDiv)
    });

    //stop loader
    toggleSpinner(false)
}
// show all data
document.getElementById('showAll-btn').addEventListener('click', function () {
    //start loader
    toggleSpinner(true)
    loadData()
})

//toggle Spinner 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

const loadDetail = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetail(data.data)
}

loadData()