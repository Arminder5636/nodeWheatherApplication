const form = document.querySelector('.user-form');
const queryString = document.querySelector(".form-input > input");
const userAttention = document.querySelector('.user-attentation');
const output = document.querySelector('.output');
const fetchUrl = "http://localhost:3000/weather?address=";

function UI() { }
UI.prototype.alert = (message, type) => {
    let div = document.createElement('div');
    div.className = type;
    div.innerHTML = message;
    userAttention.appendChild(div);
    setTimeout(() => {
        userAttention.innerHTML = '';
    },3000)
}
UI.prototype.weather = (address, location,forecast) => {
    let div = document.createElement('div');
    div.innerHTML = `<h1>Weather For : ${address}</h1>
                     <h3>Location:  ${location}</h3>
                     <p>Weather Info: ${forecast}</p>
    `;
    output.appendChild(div);
    setTimeout(() => {
        output.innerHTML = '';
    },10000)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = queryString.value;
    const ui = new UI();
    if (address === "") {
        ui.alert('Please Enter your location','fail');
    } else {
        const url = fetchUrl + address;
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    ui.alert('Network or other error..please try later','fail');
                }
                else {
                    ui.alert('Weather fetched....','success');
                    ui.weather(data.address,data.location,data.forecast);
                    console.log(data);
                    reset();
                }
            })
        })
    }

})

function reset() {
    document.querySelector('.form-input > input').value = '';
}
