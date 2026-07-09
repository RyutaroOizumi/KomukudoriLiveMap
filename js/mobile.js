document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menu-button");
    const sidebar = document.getElementById("sidebar");

    if (!menuButton || !sidebar) return;

    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

});