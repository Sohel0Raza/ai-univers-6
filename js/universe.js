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
    dataContainer.innerHTML = '';
    // display 6 items
    const showAllData = document.getElementById('showAll-data');

    if (showAll) {
        showAllData.classList.add('d-none')
    }
    else {
        allData = allData.slice(0, 6)
        showAllData.classList.remove('d-none')
    }

    // single data display
    allData.forEach(data => {
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col')
        dataDiv.innerHTML = `
        <div class="card h-100 bg-light border-0 shadow-lg">
            <img class="p-3 img-fluid" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body pb-0">
                    <h5 class="card-title">Features</h5>
                   <ol>
                   ${data.features.map(feature => feature ? `<li>${feature}</li>` : '').join('')}
                   </ol> 
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
// details data load
const loadDetail = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/ai/tool/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayDetail(data.data)
}

// display details data
const displayDetail = (data) => {
    console.log('data :', data);
    const modalContainer = document.getElementById('modal-body');
    modalContainer.innerHTML = `
    <div class="card bg-danger-subtle m-2">
            <div class="card-body">
                <h5 class="card-title fw-bold">${data.description}</h5>
            </div>
            <div class="${data?.pricing?.length ? 'd-block' : 'd-none'}"> 
                <div class="d-md-flex justify-content-evenly align-items-center text-center m-0 ">
                    ${data?.pricing?.map(item => item? `<h6 class="text-success rounded bg-white mx-3 p-3"> ${item?.price ? item.price : "Free of cost"} ${item?.plan ? item.plan : "No plan"} </h6>` : "").join('')}
                </div>
            </div>
            <div class="${!data?.pricing?.length ? 'd-block' : 'd-none'}">
            <div class="d-md-flex justify-content-evenly align-items-center text-center m-0 ">
                <h6 class="text-success rounded bg-white mx-3 p-3">No cost/ Free</h6>
            </div>
            </div>
        <div class="d-flex justify-content-between m-3">
            <div>
                <h5>Features</h5>
                <ul>
                ${Object.keys(data?.features).map(key => key ? `<li> ${data.features[key].feature_name} </li>` : '').join('')}                    
                </ul>
            </div>
            <div>
                <h5>Integration</h5>
                <ul class="${data?.integrations?.length ? 'd-block' : 'd-none'}">
                ${data?.integrations?.map(integration => integration ? `<li> ${integration} </li>` : `<li> Data not found </li>`).join('')}
                </ul>
                <ul class="${!data?.integrations?.length ? 'd-block' : 'd-none'}">
                    No data found
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