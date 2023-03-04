// API data load by fetch
const loadData = async (showAll = false) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.tools, showAll);
    }
    catch (error) {
        console.log(error);
    }
}

// display API data
const displayData = (allData, showAll) => {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML='';
    // display 6 items
    const showAllData = document.getElementById('showAll-data');

    if(showAll){
        showAllData.classList.add('d-none')
    }
    else {
        allData = allData.slice(0,6)
        showAllData.classList.remove('d-none')
    }
    allData.forEach (data => {
        console.log('data :', data);
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col')
        dataDiv.innerHTML = `
        <div class="card h-100 bg-light border-0 shadow-lg">
            <img class="p-3 img-fluid" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body pb-0">
                    <h5 class="card-title">Features</h5>
                    
                    
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
    loadData(true)
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
const displayDetail = (data) => {
    console.log(data)
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerHTML = `
    <div class="card bg-danger-subtle m-2">
            <div class="card-body">
                <h5 class="card-title fw-bold">${data.description}</h5>
            </div>
            <div class="d-md-flex justify-content-evenly align-items-center text-center m-0">
                <h6 class="text-success rounded bg-white mx-3 p-3">${data.pricing ? data.pricing[0].price : "Free of cost"} ${data.pricing ? data.pricing[0].plan : "No plan"}</h6>
                <h6 class="text-success rounded bg-white mx-3 p-3">${data.pricing ? data.pricing[1].price : "Free of cost"} ${data.pricing ? data.pricing[1].plan : "No plan"}</h6>
                <h6 class="text-success rounded bg-white mx-3 p-3">${data.pricing ? data.pricing[2].price : "Free of cost /"} ${data.pricing ? data.pricing[2].plan : "No plan"}</h6>
            </div>
            <div class="d-flex justify-content-between m-3">
                <div>
                    <h5>Features</h5>
                    <ul>
                        <li>${data.features['1'].feature_name}</li>
                        <li>${data.features['2'].feature_name}</li>
                        <li>${data.features['3'].feature_name}</li>
                    </ul>
                </div>
                <div>
                    <h5>Integration</h5>
                    <ul>
                        <li>${data.integrations ? data.integrations[0] : 'No data found'}</li>
                        <li>${data.integrations ? data.integrations[1] : 'No data found'}</li>
                        <li>${data.integrations ? data.integrations[2] : 'No data found'}</li>
                    </ul>
                </div>
            </div>
    </div>
    <div>
        <div class="card m-2">
            <button type="button" class="btn btn-danger px-3 py-1 position-absolute top-0 start-0 ms-4 ${data.accuracy.score ? 'd-block' : 'd-none'}">
                ${data.accuracy.score * 100}% accuracy
            </button>
            <img class="p-3 img-fluid" src="${data.image_link[0]}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${data.input_output_examples ? data.input_output_examples['0'].input : "No data found"}</h5>
                <p class="card-text text-center">${data.input_output_examples ? data.input_output_examples['0'].output.slice(0, 80) : 'No data found'}</p>
            </div>
        </div>
    </div>
    `;
}
loadData()