async function main(){

    console.log("MAIN START");

    //---------------------------------
    // 地図
    //---------------------------------

    const map = createMap();

    //---------------------------------
    // CSV
    //---------------------------------

    const birds = await loadCSV("data/birds.csv");

    const gps = await loadCSV("data/gps.csv");

    //---------------------------------
    // 個体辞書
    //---------------------------------

    const birdDict = makeBirdDictionary(birds);

    //---------------------------------
    // 累積距離計算
    //---------------------------------

    calculateBirdDistances(gps,birdDict);

    //---------------------------------
    // 最新GPS取得
    //---------------------------------

    const latestGPS = {};

    gps.forEach(function(record){

        if(!record.Latitude) return;

        const id = String(record.BirdID).trim();

        if(!birdDict[id]) return;

        latestGPS[id] = record;

    });

    //---------------------------------
    // マーカー
    //---------------------------------

    const markers = {};

    Object.values(latestGPS).forEach(function(record){

        const id = String(record.BirdID).trim();

        const bird = birdDict[id];

        const marker = createBirdMarker(

            map,

            record,

            bird

        );

        markers[id]=marker;

    });

    //---------------------------------
    // ルート
    //---------------------------------

    drawRoutes(

        map,

        gps,

        birdDict

    );

    //---------------------------------
    // 左一覧
    //---------------------------------

    createBirdList(

        map,

        latestGPS,

        birdDict,

        markers

    );

    //---------------------------------
    // 日本全体
    //---------------------------------

    map.setView(

        [38.5,138.5],

        5

    );

    console.log("MAIN DONE");

}

main();