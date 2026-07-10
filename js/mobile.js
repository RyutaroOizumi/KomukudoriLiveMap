document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");

    if (!menuButton || !sidebar) return;

    // スマホでは最初だけ開く
    if (window.innerWidth <= 768) {
        sidebar.classList.add("open");
    }

    // ハンバーガー
    menuButton.addEventListener("click", (e) => {

        e.stopPropagation();

        sidebar.classList.toggle("open");

    });

    // サイドバー内
    sidebar.addEventListener("click", (e) => {

        e.stopPropagation();

    });

    // 地図タップで閉じる
    document.addEventListener("click", () => {

        sidebar.classList.remove("open");

    });

});