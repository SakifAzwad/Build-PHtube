let chalu = 0;

function goto() {
  window.location.href = "blog.html";
}

let but1 = "bt1";
let cur = "1000";

function change(xx) {
  if (xx == "bt1") cur = "1000";
  else if (xx == "bt2") cur = "1001";
  else if (xx == "bt3") cur = "1003";
  else if (xx == "bt4") cur = "1005";

  if (but1 !== xx) {
    if (but1 !== null) {
      document
        .getElementById(but1)
        .classList.remove(
          "text-white",
          "bg-[#FF1F3D]",
          "font-semibold",
          "text-lg"
        );
      document
        .getElementById(but1)
        .classList.add("color3", "color4", "text-base", "font-medium");
    }
    document
      .getElementById(xx)
      .classList.remove("color3", "color4", "text-base", "font-medium");
    document
      .getElementById(xx)
      .classList.add("text-white", "bg-[#FF1F3D]", "font-semibold", "text-lg");

    but1 = xx;
  }
  loaddata();
}

const loaddata = async () => {
  const aa = await fetch(
    "https://openapi.programming-hero.com/api/videos/category/1000"
  );
  const bb = await aa.json();
  const cc = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const dd = await cc.json();
  //console.log(bb.data);
  if (chalu) {
    bb.data.sort((a, b) => {
      let fa = a.others.views,
        fb = b.others.views;

      fa = parseFloat(fa.replace("K", ""));
      fb = parseFloat(fb.replace("K", ""));
      fa *= 1000;
      fb *= 1000;
      return fb - fa;
    });
  }
  displayall(bb.data, cur);
};

const displayall = (dta, cur1) => {
  let rr = document.getElementById("container");
  rr.classList.remove("flex", "justify-center", "items-center", "mt-40");
  rr.classList.add(
    "grid",
    "grid-cols-1",
    "md:grid-cols-2",
    "lg:grid-cols-4",
    "gap-6",
    "mx-20",
    "mb-16"
  );
  const vidCont = document.getElementById("container");
  vidCont.textContent = "";
  let jk = false;
  dta.forEach((pp) => {
    const Card = document.createElement("div");
    const rr = pp.category_id;

    if (rr == cur1 || cur === "1000") {
      jk = true;
      Card.classList = `card mt-8 rounded-lg`;
      let gg = pp.others.posted_date;
      let hr = -1,
        mn = -1;
      if (gg.length) {
        gg = parseFloat(gg);
        mn = gg / 60;
        hr = mn / 60;
        mn = mn % 60;
        hr = Math.ceil(hr);
        mn = Math.ceil(mn);
      }
      Card.innerHTML = `
        <figure><img class="h-48 w-full rounded-lg" src="${
          pp.thumbnail
        }" alt="" /></figure>
        <div class="flex mt-6">
            <div class="mr-4">
                <img class="h-10 w-10 rounded-full" src="${
                  pp.authors[0].profile_picture
                }" alt="">
            </div>
            <div>
            <h2 class="text-[#171717] text-lg font-bold">${pp.title}</h2>
            <div>
                <div class="flex gap-1">
                    <h1 class="color5 text-sm font-normal">${
                      pp.authors[0].profile_name
                    }</h1>
                    ${
                      pp.authors[0].verified === true
                        ? '<img src="images/fi_10629607.svg" alt="">'
                        : ""
                    }
                </div>
            </div>
            <h1 class="color5 text-sm font-normal mt-2">${
              pp.others.views
            } views</h1>
            
        </div>
            
        </div>
        <div class="relative flex justify-end mr-1.5">
            ${
              hr != -1
                ? `<div class="bg-[#171717] absolute bottom-[107px] rounded px-2 py-1 inline-block">
            <h5 class="flex justify-end text-white text-xs">${hr}hrs ${mn} mins ago</h1></div>`
                : ``
            }
            </div>
        `;
      vidCont.appendChild(Card);
    }
  });
  if (jk == false) {
    const Card = document.createElement("div");
    let rr = document.getElementById("container");
    rr.classList.remove(
      "grid",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-4",
      "gap-6",
      "mx-20",
      "mb-16"
    );
    rr.classList.add("flex", "justify-center", "items-center", "mt-40");
    Card.innerHTML = `<img class="ml-24"src="images/Icon.png" alt="">
    <h1 class="mt-4 mb-20 text-center text-[#171717] text-3xl font-bold">Oops!! Sorry, There is no <br> content here </h1>
    
    `;
    vidCont.appendChild(Card);
  }
  chalu = 0;
};

function srt() {
  chalu = 1;
  loaddata();
}

loaddata();
