document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");

    if (!menuButton || !sidebar) return;

    // ハンバーガーを押す
    menuButton.addEventListener("click", (e) => {

        e.stopPropagation();

        sidebar.classList.toggle("open");

    });

    // サイドバー内では閉じない
    sidebar.addEventListener("click", (e) => {

        e.stopPropagation();

    });

    // 地図などをタップしたら閉じる
    document.addEventListener("click", () => {

        sidebar.classList.remove("open");

    });

});