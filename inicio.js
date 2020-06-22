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
    let b = a.Countries.map(current => [current.TotalConfirmed, current.Country, current.TotalRecovered, current.TotalDeaths, current.CountryCode]).sort((a,b)=> b[0]-a[0]).slice(0,10)

    for(i=0;i<b.length;i++){
        //Creando id para el html
        var caja ='cni'
        var caja1 ='tci'
        let caja2 ='tri'
        let caja3 ='tdi'
        let band ='flagi'
        //Mandando data epecifica a id epecifico
        document.getElementById(caja.replace('i',i)).innerHTML = b[i][1]
        document.getElementById(caja1.replace('i',i)).innerHTML = b[i][0]
        document.getElementById(caja2.replace('i',i)).innerHTML = b[i][2]
        document.getElementById(caja3.replace('i',i)).innerHTML = b[i][3]
        //Generando Bandera
        let parentElement = document.getElementById(band.replace('i',i));
        let flag = new CountryFlag(parentElement);
        flag.selectByAlpha2(b[i][4]);
        // Creando Grafica
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: b.map(value=>[value[1]]),
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

    

}


pasarData()

