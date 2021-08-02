let choose = document.querySelector(".choose")
let filter = document.querySelector(".filter")
let cases = document.querySelector(".case")
let death = document.querySelector(".death")
let recover = document.querySelector(".recover")
let loader = document.querySelector(".loader-container")

let header = document.querySelector(".header");
$(window).on("load", function () {

    $('.loader-container').fadeOut(500, function () {
        $(this).remove();
    })
})

let headerControl = new Waypoint({
    element: document.getElementById('track'),
    handler: function (direction) {
        if (direction === "down") {
            header.classList.add("shadow")
            header.classList.add("animate__slideInDown")

        } else {
            header.classList.remove("shadow")
            header.classList.remove("animate__slideInDown")
        }

    },
    offset: '76%'
})
ScrollReveal({


    origin: "top",
    distance: "30px",
    duration: 1000
}).reveal('.headline');
wow = new WOW(
    {
        boxClass: 'wow',
        animateClass: 'animate__animated', // default
        offset: 0,
        mobile: true,
        live: true
    }
)
wow.init();

fetch('https://api.covid19api.com/summary')
    .then(response => response.json())
    .then(data => {
        console.log();
        choose.innerHTML += ` 
                                <option value="world">World</option>
                               `


        cases.innerHTML = data.Global.TotalConfirmed;
        death.innerHTML = data.Global.TotalDeaths;
        recover.innerHTML = data.Global.TotalRecovered;

        data.Countries.map((el, index) => {

            let country = el.Country;

            choose.innerHTML += ` 
                                <option value="${country}">${country}</option>
                               `

        })
    });


filter.addEventListener("click", () => {


    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => {

            let arr = data.Countries;


            let index = arr.findIndex(e => e.Country === `${choose.value}`);


            if (choose.value === "world") {
                cases.innerHTML = data.Global.TotalConfirmed;
                death.innerHTML = data.Global.TotalDeaths;
                recover.innerHTML = data.Global.TotalRecovered;

            } else {
                cases.innerHTML = arr[index].TotalConfirmed;
                death.innerHTML = arr[index].TotalDeaths;
                recover.innerHTML = arr[index].TotalRecovered;
            }


        });

})

function clickFunction() {
    var para = document.getElementById("toggle-icon");
    para.classList.toggle("rotate-icon");
}