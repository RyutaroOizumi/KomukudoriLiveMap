// ------------------------------------
// 日付表示
// ------------------------------------
function formatDate(date){

    if(!date) return "-";

    const d = new Date(date);

    if(isNaN(d.getTime())) return "-";

    return d.toLocaleString("ja-JP",{
        year:"numeric",
        month:"2-digit",
        day:"2-digit",
        hour:"2-digit",
        minute:"2-digit"
    });

}


// ------------------------------------
// 左側の個体一覧
// ------------------------------------
function createBirdList(map, latestGPS, birdDict, markers){

    const list = document.getElementById("bird-list");

    if(!list) return;

    list.innerHTML = "";

    const records = Object.values(latestGPS).sort(function(a,b){

        return a.BirdID.localeCompare(b.BirdID);

    });

    records.forEach(function(record){

        const bird = birdDict[record.BirdID];

        // 非公開個体は表示しない
        if(!bird) return;

        const card = document.createElement("div");

        card.className = "bird-card";

        card.innerHTML = `
            <div class="bird-name" style="color:${bird.Color}">
                ● ${bird.BirdName}
            </div>

            <div class="bird-info">
                ${bird.Sex=="M" ? "♂ オス" : "♀ メス"}<br>
                最終更新：${formatDate(record.DateTime)}
            </div>
        `;

        // ----------------------------
        // 個体クリック
        // ----------------------------
        card.onclick = function(){

            map.flyTo(
                [
                    Number(record.Latitude),
                    Number(record.Longitude)
                ],
                8,
                {
                    animate:true,
                    duration:1.5
                }
            );

            const marker = markers[record.BirdID];

            if(marker){

                setTimeout(function(){

                    marker.openPopup();

                },700);

            }

            // ----------------------------
            // スマホだけサイドバーを閉じる
            // ----------------------------
            if(window.innerWidth <= 768){

                const sidebar = document.getElementById("sidebar");

                if(sidebar){
                    sidebar.classList.remove("open");
                }

            }

        };

        list.appendChild(card);

    });

}