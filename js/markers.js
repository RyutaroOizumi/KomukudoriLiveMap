//----------------------------------
// 好きな色でLeafletピンを作る
//----------------------------------

function createMarkerIcon(color){

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="25"
     height="41"
     viewBox="0 0 25 41">

<path
d="M12.5 0C5.6 0 0 5.6 0 12.5
c0 9.4 12.5 28.5 12.5 28.5
S25 21.9 25 12.5
C25 5.6 19.4 0 12.5 0z"
fill="${color}"
stroke="#333"
stroke-width="1"/>

<circle
cx="12.5"
cy="12.5"
r="5"
fill="white"/>

</svg>
`;

    return L.divIcon({

        className:"",

        html:svg,

        iconSize:[25,41],

        iconAnchor:[12,41],

        popupAnchor:[0,-35]

    });

}


//----------------------------------
// マーカー生成
//----------------------------------

function createBirdMarker(map,record,bird){

    const marker = L.marker(

        [

            Number(record.Latitude),

            Number(record.Longitude)

        ],

        {

            icon:createMarkerIcon(bird.Color)

        }

    )

    .addTo(map)

    .bindPopup(

        "<b>"+bird.BirdName+"</b><br>"+

        bird.Species+

        "<br>"+

        "性別："+

        (bird.Sex==="M"?"オス":"メス")+

        "<br>"+

        "<b>累積移動距離</b><br>"+

        Math.round(bird.Distance).toLocaleString()+" km"+

        "<br>"+

        "<b>最終更新</b><br>"+

        formatDate(record.DateTime)

    );

    return marker;

}