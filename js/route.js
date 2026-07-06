// ------------------------------------
// 渡りルートを描画
// ------------------------------------
function drawRoutes(map, gps, birdDict){

    // BirdIDごとにルートをまとめる
    const routes = {};

    gps.forEach(function(record){

        // 緯度経度がない行は無視
        if(!record.Latitude || !record.Longitude) return;

        // 非公開個体は無視
        if(!birdDict[record.BirdID]) return;

        if(!routes[record.BirdID]){
            routes[record.BirdID] = [];
        }

        routes[record.BirdID].push(record);

    });

    // 個体ごとに描画
    Object.keys(routes).forEach(function(id){

        console.log("ルート描画:", id);
        
        const bird = birdDict[id];

        // 念のため
        if(!bird) return;

        // 日時順に並べる
        routes[id].sort(function(a,b){
            return new Date(a.DateTime) - new Date(b.DateTime);
        });

        // 座標配列を作る
        const points = routes[id].map(function(record){

            return [
                Number(record.Latitude),
                Number(record.Longitude)
            ];

        });

        // 点が1個しかなくても描画可能
        if(points.length < 1) return;

        // 線を描画
        L.polyline(points,{
            color: bird.Color || "#3388ff",
            weight:4,
            opacity:0.8
        }).addTo(map);

    });

}