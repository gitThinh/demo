const navOptions = document.querySelectorAll('.nav__options'),
    sections = document.getElementsByTagName('section');

const clickActiveNav = () =>{
    navOptions.forEach(function (options) {
        options.addEventListener('click', function (){
            navOptions.forEach(function (option){
                option.classList.remove('nav__active');
            });
            this.classList.add('nav__active');
        })
    });
};

const scrollActiveNav = () =>{
    window.addEventListener('scroll', function () {
    
        for(var i=0; i<sections.length; i++){
            var rect = sections[i].getBoundingClientRect();

            if (rect.top >= 0 && rect.bottom <= window.innerHeight){
                navOptions.forEach(function (option){
                    option.classList.remove('nav__active');
                });
                navOptions[i].classList.add("active");
            }
        }
    });
};

function start(){
    clickActiveNav();
    scrollActiveNav();
}

start();




