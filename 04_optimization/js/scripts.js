const swiper=new Swiper(".swiper",{direction:"horizontal",loop:!0,pagination:{el:".swiper-pagination",type:"bullets",clickable:!0}}),tabsBtns=document.querySelectorAll(".job__btn"),tabsItems=document.querySelectorAll(".job-right"),tabsItemsText=document.querySelectorAll(".job-left");tabsBtns.forEach(e=>{e.addEventListener("click",e=>{const t=e.currentTarget.dataset.path;tabsBtns.forEach(e=>{e.classList.remove("job__btn_active")}),e.currentTarget.classList.add("job__btn_active"),tabsItems.forEach(e=>{e.classList.remove("job-right_active")}),tabsItemsText.forEach(e=>{e.classList.remove("job-left_active")}),document.querySelector(`[data-right-target="${t}"]`).classList.add("job-right_active"),document.querySelector(`[data-left-target="${t}"]`).classList.add("job-left_active")})}),new Accordion(".accordion");const burger=document.querySelector(".burger"),menu=document.querySelector(".header .nav"),closeBtn=document.querySelector(".nav__btn"),menuLinks=menu.querySelectorAll(".nav__link");function closeBurger(){menu.classList.remove("nav_active"),document.body.classList.remove("stop-scroll"),closeBtn.removeEventListener("click",closeBurger)}menuLinks.forEach(e=>{e.addEventListener("click",closeBurger)}),burger.addEventListener("click",()=>{menu.classList.add("nav_active"),document.body.classList.add("stop-scroll"),closeBtn.addEventListener("click",closeBurger)});const form=document.querySelector(".search-form"),formOpenBtn=document.querySelector(".header__btn"),formCloseBtn=document.querySelector(".search-form__btn-close");function closeForm(){form.classList.remove("search-form_active"),formCloseBtn.removeEventListener("click",closeForm)}function openForm(){form.classList.add("search-form_active"),formCloseBtn.addEventListener("click",closeForm)}formOpenBtn.addEventListener("click",openForm);