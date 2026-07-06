async function main() {

    try {

        console.log("MAIN START");

        // --------------------
        // 地図
        // --------------------
        const map = createMap();

        // --------------------
        // データ読み込み
        // --------------------
        const birds = await loadCSV("data/birds.csv");
        const gps = await loadCSV("data/gps.csv");

        // --------------------
        // 辞書
        // --------------------
        const birdDict = makeBirdDictionary(birds);

        // --------------------
        // 最新GPS（個体ごと1件）
        // --------------------
        const latestGPS = {};

        gps.forEach(record => {

            const id = String(record.BirdID).trim();

            if (!record.Latitude || !record.Longitude) return;

            // birdDict依存は外す（重要：欠損対策）
            latestGPS[id] = record;
        });

        // --------------------
        // マーカー・範囲
        // --------------------
        const markers = {};
        const bounds = [];

        // --------------------
        // 色生成
        // --------------------
        function getColor(id) {

            const colors = [
                "#e41a1c", "#377eb8", "#4daf4a", "#984ea3",
                "#ff7f00", "#ffff33", "#a65628", "#f781bf"
            ];

            let hash = 0;
            for (let i = 0; i < id.length; i++) {
                hash = id.charCodeAt(i) + ((hash << 5) - hash);
            }

            return colors[Math.abs(hash) % colors.length];
        }

        // --------------------
        // 軌跡生成
        // --------------------
        const tracks = {};

        gps.forEach(r => {

            const id = String(r.BirdID).trim();

            if (!r.Latitude || !r.Longitude) return;

            if (!tracks[id]) tracks[id] = [];

            tracks[id].push([
                Number(r.Latitude),
                Number(r.Longitude),
                r.DateTime
            ]);
        });

        Object.keys(tracks).forEach(id => {
            tracks[id].sort((a, b) =>
                new Date(a[2]) - new Date(b[2])
            );
        });

        const polylines = {};

        Object.keys(tracks).forEach(id => {

            const latlngs = tracks[id].map(p => [p[0], p[1]]);

            if (latlngs.length < 2) return;

            const line = L.polyline(latlngs, {
                color: getColor(id),
                weight: 3,
                opacity: 0.6
            }).addTo(map);

            polylines[id] = line;
        });

        // --------------------
        // マーカー描画
        // --------------------
        Object.values(latestGPS).forEach(record => {

          const id = String(record.BirdID).trim();

        const lat = Number(record.Latitude);
        const lng = Number(record.Longitude);

        if (isNaN(lat) || isNaN(lng)) return;

        // ★ここが重要（Unknown排除）
         const bird = birdDict[id];
        if (!bird) {
        console.warn("missing bird:", id);
        return;
         }

        const color = getColor(id);

        const marker = L.circleMarker([lat, lng], {
            radius: 6,
            color: color,
            fillColor: color,
            fillOpacity: 0.9
        })
        .addTo(map)
        .bindPopup(
            `<b>${bird.BirdName}</b><br>` +
            `${bird.Species}<br>` +
            `性別：${bird.Sex}<br>` +
            `日時：${record.DateTime}`
        );

        markers[id] = marker;
        bounds.push([lat, lng]);
    });

        // --------------------
        // 自動ズーム
        // --------------------
        if (bounds.length > 0) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }

        // --------------------
        // ルート（安全実行）
        // --------------------
        try {
            if (typeof drawRoutes === "function") {
                drawRoutes(map, gps, birdDict);
            }
        } catch (e) {
            console.warn("drawRoutes skipped", e);
        }

        // --------------------
        // UI
        // --------------------
        createBirdList(
            map,
            latestGPS,
            birdDict,
            markers,
        );

        console.log("MAIN DONE");

    } catch (e) {

        console.error("FATAL ERROR:", e);
    }
}

main();