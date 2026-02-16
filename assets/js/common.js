document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.querySelector('.menu-trigger');
    const navUl = document.querySelector('header nav ul');

    if (menuTrigger && navUl) {
        menuTrigger.addEventListener('click', () => {
            menuTrigger.classList.toggle('active');
            navUl.classList.toggle('active');
        });
    }
});
