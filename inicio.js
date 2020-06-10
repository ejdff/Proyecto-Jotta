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

    let b =a.Countries.map(current => [current.TotalConfirmed, current.Country, ]).sort((a,b)=> b[0]-a[0]).slice(0,10)

    for(i=0;i<b.length;i++){
        let caja ='boxi'
        document.getElementById(caja.replace('i',i)).innerHTML = b[i][1]+' '+ b[i][0]
    }
}

pasarData()








