const navOptions = document.querySelectorAll('.nav__options'),
    sections = document.querySelectorAll('section'),
    projectMoveButton = document.querySelectorAll('.btn__move__project'),
    boxProjects = document.querySelector('.box__projects');
    

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
        sections.forEach(function (option) {
            let top = window.scrollY + 200;
            let id = option.getAttribute('id');

            if (top >= option.offsetTop && top < option.offsetTop + option.offsetHeight ){
                navOptions.forEach(function (option){
                    option.classList.remove('nav__active');
                });
                document.querySelector('.nav__options[href="#'+id+'"]').classList.add('nav__active');
            }
        });
    });
};

const slideProjects = () =>{
    projectMoveButton[0].addEventListener('click', ()=>{
        console.log(boxProjects.scrollX);
        boxProjects.scrollLeft -= 333.3;
    })
    projectMoveButton[1].addEventListener('click', ()=>{
        console.log(boxProjects.scrollX);
        boxProjects.scrollLeft += 333.3;
    })
}

function start(){
    window.scrollTo(0,0);
    clickActiveNav();
    scrollActiveNav();
    slideProjects();
}

start();




