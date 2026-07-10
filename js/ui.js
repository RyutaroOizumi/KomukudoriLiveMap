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

    // --------------------------
    // スマホだけサイドバーを閉じる
    // --------------------------
    if(window.innerWidth <= 768){

        const sidebar = document.getElementById("sidebar");
        const menuButton = document.getElementById("menu-button");

        sidebar.classList.remove("open");

        if(menuButton){
            menuButton.style.display = "block";
        }

    }

};