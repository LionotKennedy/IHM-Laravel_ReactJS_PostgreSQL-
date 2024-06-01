const navLinks = document.querySelectorAll('.links');
navLinks.forEach(navLinkEL => {
    navLinkEL.addEventListener('click', ()=> {
        document.querySelector('.active')?.classList.remove('active');
        navLinkEL.classList.add('active');
    });
});
// this.classList.add('active');