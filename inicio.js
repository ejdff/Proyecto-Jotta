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

    // Creando Grafica inicial
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',
            // The data for our dataset
            data: {
                labels: ['Sick', 'Recovered', 'Death'],
                datasets: [{
                label: 'Countries',
                backgroundColor: [
                    'rgb(78, 106, 212)',
                    'rgb(79, 207, 63 )',
                    'rgb(255, 45, 0 )'
                ],
                borderColor: 'rgb(255, 255, 255)',
                data: [(b[0][0]-b[0][2]-b[0][3]),b[0][2],b[0][3]]
            }]
        },

        // Configuration options go here
        options: {}
    });

    //Nombre del primer pais
    document.getElementById('cname').innerHTML = b[0][1]

    //Bandera primer pais
    let parentElement = document.getElementById('cflag');
    let flag = new CountryFlag(parentElement);
    flag.selectByAlpha2(b[0][4]);

    //Data del primer pais
    document.getElementById('cd_line1').innerHTML ='Total cases: '+ b[0][0]
    document.getElementById('cd_line2').innerHTML ='Recovered: '+ b[0][2]
    document.getElementById('cd_line3').innerHTML ='Deaths: '+ b[0][3]
    document.getElementById('cd_line4').innerHTML ='New Cases: +'+ b[0][5]

}

pasarData()

async function buscador(){
    try{
        var scnd_data_call = await llamarData()
    } catch(error){
        console.log('holy shit')
    }

    let scnd_data = scnd_data_call.Countries.map(current => [current.TotalConfirmed, current.Country, current.TotalRecovered, current.TotalDeaths, current.CountryCode, current.NewConfirmed]).sort((a,b)=> b[0]-a[0])
    let inpt = document.getElementById('finder').value.toLowerCase();
    let match = scnd_data.filter(value=> value[1].toLowerCase().indexOf(inpt)===0)

    // Creando bandera
    let old = document.getElementById('cflag').lastChild;
    let chau = document.getElementById('cflag').removeChild(old);
    let parentElement = document.getElementById('cflag');
    let flag = new CountryFlag(parentElement);
    flag.selectByAlpha2(match[0][4]);

    //Nombre de pais
    document.getElementById('cname').innerHTML = match[0][1]

    // Creando Grafica
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'pie',
            // The data for our dataset
            data: {
                labels: ['Sick', 'Recovered', 'Death'],
                datasets: [{
                label: 'Countries',
                backgroundColor: [
                    'rgb(78, 106, 212)',
                    'rgb(79, 207, 63 )',
                    'rgb(255, 45, 0 )'
                ],
                borderColor: 'rgb(255, 255, 255)',
                data: [(match[0][0]-match[0][2]-match[0][3]),match[0][2],match[0][3]]
            }]
        },

        // Configuration options go here
        options: {}
    });

    document.getElementById('cd_line1').innerHTML ='Total cases: '+ match[0][0]
    document.getElementById('cd_line2').innerHTML ='Recovered: '+ match[0][2]
    document.getElementById('cd_line3').innerHTML ='Deaths: '+ match[0][3]
    document.getElementById('cd_line4').innerHTML ='New Cases: +'+ match[0][5]
}

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