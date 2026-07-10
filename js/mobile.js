document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");

    if (!menuButton || !sidebar) return;

    // メニューを開閉
    menuButton.addEventListener("click", (e) => {

        e.stopPropagation();

        sidebar.classList.toggle("open");

    });

    // サイドバー内をクリックしても閉じない
    sidebar.addEventListener("click", (e) => {

        e.stopPropagation();

    });

    // 地図などサイドバー以外をクリックしたら閉じる
    document.addEventListener("click", () => {

        sidebar.classList.remove("open");

    });

});