"use strict";
const container = document.querySelector(".container");
const page1 = document.querySelector(".page1");

const login = document.querySelector(".btn_login");
const login_pswd = document.querySelector(".login_pswd");
const nameL = document.querySelector(".nameLogin");
const user = document.querySelector(".user");

const nameS = document.querySelector(".nameSign");
const sign_pswd1 = document.querySelector(".sign_pswd1");
const sign_pswd2 = document.querySelector(".sign_pswd2");
const signup = document.querySelector(".btn_sign");
const closeS = document.getElementById("signup");
const closeL = document.getElementById("login");

const check = document.querySelector(".check");
const heady = document.querySelector(".heady");

const page2 = document.querySelector(".page2");
const page3 = document.querySelector(".page3");

const subsection = document.querySelectorAll(".subsection");
const row = document.querySelector(".row");
const body = document.querySelector("body");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search_btn");

const fav = document.querySelector(".fav");
const favy = document.querySelector(".favy");

const book = document.querySelector(".book");
const create = document.querySelector(".btn_recipe");
const page4 = document.querySelector(".page4");
const personal = document.querySelector(".personal");
const mycoll = document.querySelector(".mycoll");
const row1 = document.querySelector(".row1");
const extra4=document.querySelector('.extra4')
const extra3=document.querySelector('.extra3')
const foot=document.querySelector('.foot')


// --------------------------------------------------------PAGE 1--------------------------------------------------------//

signup.addEventListener("click", function (e) {
  e.preventDefault();
  const u=user.value
  const n = nameS.value;
  const p1 = sign_pswd1.value;
  const p2 = sign_pswd2.value;
  closeS.style.display = "none";

  if (n &&u&& p1 && p1 === p2) {
    check.style.display = "flex";
    savelocal(n, p1,u);

  }
  nameS.value ='';
   sign_pswd1.value = '';
   sign_pswd2.value = "";
   user.value='';
});

login.addEventListener("click", function (e) {
  e.preventDefault();
  let info = JSON.parse(localStorage.getItem("info")) || [];
  const n = nameL.value;
  const p = login_pswd.value;
  nameL.value = login_pswd.value = "";
  closeL.style.display='none'

  info.map((item) => {
    if (item.email === n && item.pssd === p) {
      homyy(item.name);
    }
  });
});

function savelocal(n, p,u) {
  let info = JSON.parse(localStorage.getItem("info")) || [];
  const details = {
    name:u,
    email: n,
    pssd: p,
  };
  info.push(details);
  localStorage.setItem("info", JSON.stringify(info));
}
const greet=document.querySelector('.greet')
function homyy(name){
  page1.style.display='none';
  page2.classList.remove('hidden')
  foot.style.display='flex';

  greet.innerHTML=`${name}`
  }

// --------------------------------------------------------PAGE 2--------------------------------------------------------//

document.querySelectorAll('a[href^="#"]').forEach((an) => {
  an.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

function openNav() {
  document.getElementById("mySidenav").style.width = "200px";
  document.getElementById("mySidenav").classList.remove("hidden");
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").classList.add("hidden");
}

subsection.forEach((n) => n.addEventListener("click", category));

async function getRecipe(item, id) {
  try {
    let response;
    if (item)
      response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${item}&key=bfe27297-6cd5-405f-9135-406da8410bb7`
      );
      if (id)
      response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=bfe27297-6cd5-405f-9135-406da8410bb7`
      );
    const data = await response.json();
  if(data.results===0)  throw new Error(`No such Recipe Found`);
    console.log(data.data);
    return data.data;
  } catch (err) {
    search.value=''
      alert(err);
  }
}

async function category(e) {
  const item = e.target.closest(".subsection").children[1].innerHTML;
  let data = await getRecipe(item);
  displayRecipe(data.recipes);
  row1.classList.remove("hidden");
  const coord = document.querySelector(".row1").getBoundingClientRect();
  window.scrollTo(0, coord.top + window.pageYOffset - 50);
}

function displayRecipe(data) {
  row.innerHTML = "";
  data.forEach((el) => {
    const html = main(el);
    row.insertAdjacentHTML("beforeend", html);
  });
}

searchBtn.addEventListener("click", async function (e) {
  const data = await getRecipe(search.value);
  if(data){
  displayRecipe(data.recipes);
 row1.classList.remove("hidden");
  const coord = document.querySelector(".row1").getBoundingClientRect();
  window.scrollTo(0, coord.top + window.pageYOffset - 30);
  search.value = "";
  }
});

function main(el) {
  const html = ` <div class="recipe" data-set=${el.id}>
  <img src=${el.image_url} class="cook">
  <div class="read">
  <div class="divide bg">
  <span class="rate">${Math.floor(Math.random() * (5 - 1 + 1)) + 1}</span
  > <img src="image/star.svg" class="star">
</div> 
<div class="divide">   
  <span class="material-icons pink">restaurant_menu</span>
<span class="type">${el.publisher}</span>
</div>
</div>
<div class="recipe_name">${el.title}</div>
</div>`;
  return html;
}
window.addEventListener("click", async function (e) {
  const newrecipe = JSON.parse(localStorage.getItem("newrecipe")) || [];
  if (e.target.closest(".personal")&&e.target.closest(".recipe")) {
    const x = e.target.closest(".recipe").dataset.set;
    newrecipe.map((item) => {
      if (item.id === +x) {
        displayCard(item);
      }
    });
  } else if (e.target.closest(".recipe")) {
    const t = e.target.closest(".recipe").dataset.set;
    let data = await getRecipe(undefined, t);
    if (data === undefined) {
      newrecipe.map((item) => {
        if (item.id === +t) {
          displayCard(item);
        }
      });
    } else {
      displayCard(data.recipe);
    }
  }

  const bookmark = document.querySelectorAll(".bookmark");
  const b1 = document.querySelector(".b1");
  const b2 = document.querySelector(".b2");

  let c = 0;
  bookmark.forEach((n) =>
    n.addEventListener("click", function (e) {
      // e.preventDefault();

      const id = e.target.closest(".section").dataset.set;
      const recipe_id = JSON.parse(localStorage.getItem("recipe_id")) || [];

      if (c % 2 == 0) {
        if (recipe_id.includes(id)) {
          b1.classList.remove("hidden");
          b2.classList.add("hidden");
          recipe_id.splice(recipe_id.indexOf(id), 1);
          localStorage.setItem("recipe_id", JSON.stringify(recipe_id));
          c++;
          fav.innerHTML = "";
          favorite();
        } else {
          recipe_id.push(id);
          b2.classList.remove("hidden");
          b1.classList.add("hidden");
          localStorage.setItem("recipe_id", JSON.stringify(recipe_id));
          c++;
          fav.innerHTML = "";
          favorite();
        }
      }
    })
  );
});

function favorite() {
  fav.innerHTML = "";
  const recipe_id = JSON.parse(localStorage.getItem("recipe_id")) || [];
  let data;
  if (recipe_id.length > 0) {
    favy.classList.remove("hidden");
   extra4.classList.remove("hidden");

    recipe_id.forEach(async function (n) {
      data = await getRecipe(undefined, n);
      if (data === undefined) {
        const newrecipe = JSON.parse(localStorage.getItem("newrecipe")) || [];
        newrecipe.forEach((it) => {
          if (it.id === +n) {
            data = it;
          }
        });
      }

      let html;
      if (data.recipe === undefined) {
        html = main(data);
      } else {
        html = main(data.recipe);
      }
      fav.insertAdjacentHTML("beforeend", html);
    });
  } else {
    favy.classList.add("hidden");
    extra4.classList.add("hidden");

  }
}

window.addEventListener("load", favorite);

function displayCard(data) {
  page3.style.display = "block";
  const recipe_id = JSON.parse(localStorage.getItem("recipe_id")) || [];
  const html = `
     <div class="section" data-set=${data.id}>
     <div class="section1">
       <img src=${data.image_url} class="cooki" />
       <div class="detail">
         <div class="sub">
           <div class="large">Publisher:</div>
           <div class="publish color">${data.publisher}</div>
         </div>
         <div class="sub">
           <div class="large">Servings</div>
           <div class="serving color">
             <span class="material-icons pink1">
               supervisor_account
               </span>
           <span class="serve">${data.servings}</span>  
           </div>
         </div>
         <div class="sub">
           <div class="large">Cooking Time</div>
           <div class="cook_time color">
             <span class="material-icons pink1">schedule</span><span class="min">${
               data.cooking_time
             } min</span>
           </div>
         </div>
       </div>
       <span class="b1 ${recipe_id.includes(String(data.id)) ? "hidden" : ""}">
       <span class="material-icons bookmark "> favorite_border </span>
    </span>
       <span class="b2  ${recipe_id.includes(String(data.id)) ? "" : "hidden"}">
       <span class="material-icons bookmark  ">
       favorite
       </span>
       </span>
       </div>
     <div class="section2">
       <div class="naming">${data.title}</div>
       <div class="ingredients">
         <div class="ingre">Ingredients</div>
         <div class="steps">
              </div>
       </div>
       <div class="directions">
         <a href=${data.source_url} class="direction">Direction</a>
         <span class="material-icons arrow"> arrow_forward </span>
       </div>
       <span class="material-icons close2">close</span>
     </div>
   </div>`;

  page3.insertAdjacentHTML("beforeend", html);

  const steps = document.querySelector(".steps");
  data.ingredients.forEach((item) => {
    const html2 = ` <div class="step">${item.quantity ? item.quantity : ""} ${
      item.unit ? item.unit : ""
    } ${item.description}</div>`;
    steps.insertAdjacentHTML("beforeend", html2);
  });

  page2.style.filter = "blur(8px)";
  body.style.overflow = "hidden";

  const close2 = document.querySelector(".close2");
  const section = document.querySelector(".section");

  close2.addEventListener("click", function (e) {
    section.remove();
    page3.style.display = "none";
    page2.style.filter = "blur(0px)";
    body.style.overflowY = "scroll";
  });
}

create.addEventListener("click", addRecipe);
function addRecipe() {
  RecipeItems();
}

function RecipeItems() {
  page4.style.display = "block";
  const html = `  <div class="newRecipe">
  <div class="data">Recipe Data
  <button class="back">
  <span class="material-icons left"> navigate_before </span>Back
</button>
  </div>
  <div class="part">
  <div class="part1">
  <div class="imp">
    <div class="ques">TITLE</div>
<input src="text" placeholder="Enter Recipe title" class="enter">
  </div>
  <div class="artist">
    <div class="ques">PUBLISHER</div>
<input src="text" placeholder="Enter Publisher name"  class="enter">
  </div>
  <div class='url'>
    <div class="ques">URL</div>
<input src="text" placeholder="Enter url"  class="enter">
  </div>
</div>
<div class="part1">
  <div class="imgurl">
    <div class="ques">IMAGE URL</div>
<input src="text" placeholder="Enter image URL"  class="enter">
  </div>
  <div class="prep">
    <div class="ques">COOKING TIME</div>
<input src="text" placeholder="Enter Cooking Time"  class="enter">
  </div>
  <div class="how">
    <div class="ques">SERVINGS</div>
<input src="text" placeholder="Enter Servings"  class="enter">
  </div>
</div>
</div>
<div class="required">
<span class="data2">Ingredients</span><span class="material-icons insert">
  add
  </span>
  <div class="choice">
  <input src="text" placeholder="FORMAT:Qty,Unit,Description"  class="enter1">
  <input src="text" placeholder="FORMAT:Qty,Unit,Description"   class="enter1">
</div>
</div>
<div class="around">
<button class="upload">UPLOAD RECIPE</button>
</div>
</div>`;

  page4.insertAdjacentHTML("beforeend", html);
  page2.style.filter = "blur(3px)";
  body.style.overflow = "hidden";
  const inst = document.querySelector(".insert");
  const r = document.querySelector(".required");
  const b = document.querySelector(".back");
  const newRecipe = document.querySelector(".newRecipe");
  const upload = document.querySelector(".upload");

  inst.addEventListener("click", function (e) {
    const h = ` <div class="choice">
  <input src="text" placeholder="FORMAT:Qty,Unit,Description"  class="enter1">
  <input src="text" placeholder="FORMAT:Qty,Unit,Description"  class="enter1">
  </div>`;
    r.insertAdjacentHTML("beforeend", h);
  });

  b.addEventListener("click", function (e) {
    newRecipe.remove();
    page4.style.display = "none";
    page2.style.filter = "blur(0px)";
    body.style.overflowY = "scroll";
  });

  upload.addEventListener("click", function (e) {
    const enter1 = document.querySelectorAll(".enter1");
    const newrecipe = JSON.parse(localStorage.getItem("newrecipe")) || [];

    const t = document.querySelector(".imp input").value;
    const p = document.querySelector(".artist input").value;
    const u = document.querySelector(".url input").value;
    const i = document.querySelector(".imgurl input").value;
    const c = document.querySelector(".prep input").value;
    const s = document.querySelector(".how input").value;

    let ing = {},
      obj = [];
    enter1.forEach((item) => {
      const a = item.value.split(",");
      ing = {
        quantity: a[0],
        unit: a[1],
        description: a[2],
      };
      obj.push(ing);
    });
    const obj2 = {
      id: Math.trunc(Math.random() * 500) + 1,
      title: t,
      publisher: p,
      source_url: u,
      image_url: i,
      cooking_time: c,
      servings: s,
    };
    obj2.ingredients = obj;
    newrecipe.push(obj2);
    localStorage.setItem("newrecipe", JSON.stringify(newrecipe));
    displayYourOwnRecipe();
    newRecipe.remove();
    page4.style.display = "none";
    page2.style.filter = "blur(0px)";
    body.style.overflowY = "scroll";
  });
}
window.addEventListener("load", displayYourOwnRecipe);

function displayYourOwnRecipe() {
  personal.innerHTML = "";
  const newrecipe = JSON.parse(localStorage.getItem("newrecipe")) || [];
  if (newrecipe.length > 0) {
    mycoll.classList.remove("hidden");
    extra3.classList.remove("hidden");

    newrecipe.forEach(async function (n) {
      const html = main(n);
      personal.insertAdjacentHTML("beforeend", html);
    });
  } else {
    mycoll.classList.add("hidden");
    extra3.classList.add("hidden");

  }
}
