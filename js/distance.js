// ------------------------------------
// 緯度経度から距離(km)を計算
// Haversine Formula
// ------------------------------------

function calcDistance(lat1, lon1, lat2, lon2){

    const R = 6371;

    const dLat = (lat2-lat1) * Math.PI/180;
    const dLon = (lon2-lon1) * Math.PI/180;

    const a =
        Math.sin(dLat/2)**2 +
        Math.cos(lat1*Math.PI/180) *
        Math.cos(lat2*Math.PI/180) *
        Math.sin(dLon/2)**2;

    const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));

    return R*c;

}



// ------------------------------------
// 個体ごとの総移動距離
// ------------------------------------

function calculateBirdDistances(gps,birdDict){

    const routes = {};

    gps.forEach(function(record){

        if(!birdDict[record.BirdID]) return;

        if(!record.Latitude) return;

        if(!routes[record.BirdID]){
            routes[record.BirdID]=[];
        }

        routes[record.BirdID].push(record);

    });

    Object.keys(routes).forEach(function(id){

        routes[id].sort(function(a,b){
            return new Date(a.DateTime)-new Date(b.DateTime);
        });

        let total = 0;

        for(let i=1;i<routes[id].length;i++){

            const p1 = routes[id][i-1];
            const p2 = routes[id][i];

            total += calcDistance(

                Number(p1.Latitude),
                Number(p1.Longitude),

                Number(p2.Latitude),
                Number(p2.Longitude)

            );
            
            console.log(
            p1.BirdID,
            p1.DateTime,
            p2.DateTime,
            Number(p1.Latitude),
            Number(p1.Longitude),
            Number(p2.Latitude),
            Number(p2.Longitude)
            );

        }

        birdDict[id].Distance = total;

        console.log(id, total);

    });

}