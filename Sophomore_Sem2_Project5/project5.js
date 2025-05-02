let myDogBtn = document.getElementById("getDogBtn1");
myDogBtn.addEventListener("click", getRandomDog);

async function getRandomDog() {
    console.log('entered random dog');
    let response = await fetch("https://api.api-ninjas.com/v1/celebrity", {
        headers: {
            'X-API-KEY': "RhpWiuXZwweT/Gb2bKeVxQ==ojyzJvZVClFWbMrF"
        }
    });

    let data = await response.json();
    console.log(data);

    // 把名字显示到页面上
    let name = data[0].name;
    document.getElementById("celebrityName").textContent = name;
}
