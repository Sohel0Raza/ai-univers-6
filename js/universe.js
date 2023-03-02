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

const displayData = (allData) =>{
    const dataContainer = document.getElementById('data-container');
    allData.forEach(data => {
        console.log(data)
        const dataDiv = document.createElement('div')
        dataDiv.classList.add('col')
        dataDiv.innerHTML = `
        <div class="card h-100">
            <img class="p-3" src="${data.image}" class="card-img-top" alt="...">
                <div class="card-body pb-0">
                    <h5 class="card-title">Features</h5>
                    <ul>
                        <li>${data.features[0]}</li>
                        <li>${data.features[1]}</li>
                        <li>${data.features[2]}</li>
                    </ul>
                    <hr>
                </div>
                <div class="d-flex justify-content-between align-items-center px-3">
                    <div>
                        <h5>${data.name}</h5>
                        <p>${data.published_in}</p>
                    </div>
                    <div>
                        <button type="button" class="btn btn-outline-danger rounded-5"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
        </div>
        `;
        dataContainer.appendChild(dataDiv)
    });

}
loadData()