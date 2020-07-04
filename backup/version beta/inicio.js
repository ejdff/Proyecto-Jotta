function llamarData() {
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };
    
    return new Promise (resolve => {
        $.ajax(settings).done(function (response) {
            resolve(response)
        });
    })
    
}




async function pasarData(){
    try {
        var a = await llamarData()
    } catch (error) {
        console.log('Los datos no estan disponibles en este momento =(')
    }
    
    document.getElementById('boxA').innerHTML ='Global Cases: '+ a.Global.TotalConfirmed
    document.getElementById('boxB').innerHTML ='Total Recovered: '+ a.Global.TotalRecovered
    document.getElementById('boxC').innerHTML ='Total Deaths: '+ a.Global.TotalDeaths
    document.getElementById('boxD').innerHTML ='Last date update: '+ a.Date.slice(0,10)

    console.log(a)
    //Separando info requerida y ordenando de mayor a menor segun numero de casos
    let b = a.Countries.map(current => [current.TotalConfirmed, current.Country, current.TotalRecovered, current.TotalDeaths, current.CountryCode, current.NewConfirmed]).sort((a,b)=> b[0]-a[0])
    //Separando info top 10 para gráfico
    let b1 = a.Countries.map(current => [current.TotalConfirmed, current.Country, current.TotalRecovered, current.TotalDeaths, current.CountryCode, current.NewConfirmed]).sort((a,b)=> b[0]-a[0]).slice(0,10)
    
    
    // Creando Grafica
    for(i=0;i<b1.length;i++){
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: b1.map(value=>[value[1]]),
                    datasets: [{
                    label: 'Countries',
                    backgroundColor: 'rgb(78, 106, 212)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: b.map(value=> value[0])
                }]
            },

            // Configuration options go here
            options: {}
        });
    }


    //Crendo array de entrada para la tabla
    let c = b.map(current=>[current[1], current[0], current[5], current[2], current[3]])

    //Creando tabla
    const theader =['Country','Total Cases', 'New cases', 'Total Recovered','Deaths'];
    const table = document.querySelector("table");
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (i=0; i<theader.length;i++) {
        let th = document.createElement("th");
        let text = document.createTextNode(theader[i]);
        th.appendChild(text);
        row.appendChild(th);
    }

    let tbody = table.createTBody();
    for (i=0; i<c.length;i++) {
        let row = tbody.insertRow();
        for (j=0; j<c[i].length;j++) {
          let cell = row.insertCell();
          let text = document.createTextNode(c[i][j]);
          cell.appendChild(text);
          
        }
    }

}


pasarData()

function mostrar(){
    document.getElementById('tendency').style.zIndex = 1
    document.getElementById('symptoms').style.zIndex = -1
    document.getElementById('control').style.zIndex = -1
    document.getElementById('spiderman').style.zIndex = -1
}

function mostrar1(){
    document.getElementById('tendency').style.zIndex = -1
    document.getElementById('symptoms').style.zIndex = 1
    document.getElementById('control').style.zIndex = -1
    document.getElementById('spiderman').style.zIndex = -1
}

function mostrar2(){
    document.getElementById('tendency').style.zIndex = -1
    document.getElementById('symptoms').style.zIndex = -1
    document.getElementById('control').style.zIndex = 1
    document.getElementById('spiderman').style.zIndex = -1
}

function mostrar3(){
    document.getElementById('tendency').style.zIndex = -1
    document.getElementById('symptoms').style.zIndex = -1
    document.getElementById('control').style.zIndex = -1
    document.getElementById('spiderman').style.zIndex = 1
}