var data = [];
var menuFood = document.querySelectorAll("nav li");
for (let i = 0; i < menuFood.length; i++) {
  menuFood[i].addEventListener("click", function (e) {
    var menu = e.target.dataset.name;
    getFood(menu);
  });
}

function getFood(menufood) {
  var myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${menufood}`
  );
  myHttp.send();
  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
      data = JSON.parse(myHttp.responseText);
      display();
    }
  });
}

function display() {
  var container = "";
  container =
    '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">';
  for (let i = 0; i < data.recipes.length; i++) {
    container += `
                <div class="mt-8  flex flex-col justify-between max-w-xs rounded overflow-hidden shadow-lg bg-white">
                    <img class="w-full h-48 object-cover" src="${data.recipes[i].image_url}" alt="${data.recipes[i].title}">
                    <div class="px-6 py-4">
                        <h2 class="text-xl font-semibold text-gray-800">${data.recipes[i].title}</h2>
                        <p class="text-gray-600 text-sm mt-2">By: ${data.recipes[i].publisher}</p>
                    </div>
                  
                     <div class="px-6 py-2 mt-auto  bg-stone-400 rounded">
                     <button class="${data.recipes[i].source_url}">View Recipe</button>
                      </div>

                </div>
            `;
  }
  container += "</div>";
  document.getElementById("rowData").innerHTML = container;
}

getFood("pizza");
