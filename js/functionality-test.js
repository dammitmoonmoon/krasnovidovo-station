"use strict";var navigationController=function(){var e=document.querySelector(".nav__hamburger"),t=document.querySelector(".nav__bar"),a=Array.from(document.querySelectorAll(".nav__bar__main")),r=Array.from(document.querySelectorAll(".bar__extra__set")),n=document.querySelector("main"),o=t.offsetTop,s=function(){a.forEach(function(e){e.addEventListener("click",function(){var t;e.children[0].classList.toggle("bar__extra__set--hidden"),t=e,document.addEventListener("click",function(e){e.target!==t&&t.children[0].classList.add("bar__extra__set--hidden")}),document.addEventListener("keyup",function(e){13===event.keyCode&&e.target!==t&&t.children[0].classList.add("bar__extra__set--hidden")})})})};return{removeFallbacks:function(){r.forEach(function(e){e.classList.add("bar__extra__set--hidden"),e.classList.add("bar__extra__set--beautify")}),a.forEach(function(e){e.classList.add("nav__bar__main--beautify")}),e.classList.remove("nav__hamburger--hidden"),t.classList.remove("nav__bar--visible")},activateNavBar:function(){e.addEventListener("click",function(){helper.toggleClass(t,"nav__bar--visible")}),e.addEventListener("keyup",function(e){13===e.keyCode&&helper.toggleClass(t,"nav__bar--visible")}),s()},activateStickyNav:function(){window.pageYOffset>=o?(t.classList.add("sticky"),n.classList.add("anti-sticky")):(t.classList.remove("sticky"),n.classList.remove("anti-sticky"))}}}(),helper={toggleClass:function(e,t){if(NodeList.prototype.isPrototypeOf(e))for(var a=0;a<e.length;a++)e[a].classList.toggle(t);else e.classList.toggle(t)}},imageController=function(){var t,r=document.querySelector(".modal"),n=document.querySelector(".modal__content"),e=Array.from(document.querySelectorAll(".figure__img")),a=document.getElementsByClassName("modal__controller__close")[0],o=document.getElementsByClassName("modal__controller__arrow--left")[0],s=document.getElementsByClassName("modal__controller__arrow--right")[0],i=(t=[],e.forEach(function(e){t.push(e.src.replace(/.jpg/,"-1000.jpg"))}),t),l=function(){o.addEventListener("click",function(){var e=i[function(e){var t=e.src,a=i.indexOf(t),r=0;r=0==a?i.length-1:a-1;return r}(n)];n.src=e})},c=function(){s.addEventListener("click",function(){var e=i[function(e){var t=e.src,a=i.indexOf(t),r=0;r=a==i.length-1?0:a+1;return r}(n)];n.src=e})};return{activateModalImageControllers:function(){document.querySelector(".modal")&&(e.forEach(function(a){a.addEventListener("click",function(e){var t=a.src.replace(/.jpg/,"-1000.jpg");r.style.display="block",n.src=t})}),a.addEventListener("click",function(){r.style.display="none"}),l(),c())}}}(),carouselControls=function(){var r=Array.from(document.querySelectorAll(".slideshow__image")),n=Array.from(document.querySelectorAll(".slideshow__dot")),e=document.querySelector(".slideshow__arrow--left"),t=document.querySelector(".slideshow__arrow--right"),o=0,a=0;function s(){var e=o+1;return o==r.length-1&&(e=0),setInterval(function(){o=i(e,o),e=o+1,o==r.length-1&&(e=0)},5e3)}function i(e,t){return r[e].style.opacity=1,r[t].style.opacity=0,n[t].classList.remove("slideshow__dot--active"),n[e].classList.add("slideshow__dot--active"),e}return{setCarousel:function(){document.querySelector(".slideshow")&&(!function(){var t=s();r[o].style.opacity=1,n[o].classList.add("slideshow__dot--active");for(var e=function(e){n[e].addEventListener("click",function(){clearTimeout(t),o=i(e,o),t=s()})},a=0;a<n.length;a++)e(a)}(),e.addEventListener("click",function(){clearTimeout(a);var e=o-1;0==o&&(e=r.length-1),o=i(e,o),a=s()}),t.addEventListener("click",function(){clearTimeout(a);var e=o+1;o==r.length-1&&(e=0),o=i(e,o),a=s()}))}}}();document.addEventListener("DOMContentLoaded",navigationController.removeFallbacks),document.addEventListener("DOMContentLoaded",navigationController.activateNavBar),window.addEventListener("scroll",navigationController.activateStickyNav),document.addEventListener("DOMContentLoaded",imageController.activateModalImageControllers),document.addEventListener("DOMContentLoaded",carouselControls.setCarousel);var dataParameters={};function setDataDescription(){var e=document.getElementById("data_submit");dataParameters.folder=e.dataset.folder,dataParameters.firstYear=e.dataset.firstyear,dataParameters.lastYear=e.dataset.lastyear}function getDataFromUser(){var e=document.getElementById("data_parameters");dataParameters.parameter=e.options[e.selectedIndex].value;var t=document.getElementById("data_year").value,a=document.getElementById("error");validateYear(t,dataParameters.firstYear,dataParameters.lastYear)?(a.innerHTML="",dataParameters.fileName=t):a.innerHTML="Введённый год ("+t+") вне диапазона "+dataParameters.firstYear+"&ensp;"+dataParameters.lastYear+"!"}function validateYear(e,t,a){return e=+e,!(isNaN(e)||e<t||a<e)}function plot(){setDataDescription(),getDataFromUser(),getDataFromServer().then(plotly)}function getDataFromServer(){return new Promise(function(t,e){var a=dataParameters.folder+"/"+dataParameters.fileName+".json",r=dataParameters.folder+"/average.json";Promise.all([getJSON(a),getJSON(r)]).then(function(e){dataParameters.dataRaw=e[0],dataParameters.dataAverage=e[1],console.log(dataParameters),t()}).catch(function(e){console.log(e.message)})})}function getJSON(r){return new Promise(function(e,t){var a=new XMLHttpRequest;a.open("GET",r,!0),a.onload=function(){try{200===this.status?e(JSON.parse(this.responseText)):t(this.status+" "+this.statusText)}catch(e){t(e.message)}},a.onerror=function(){t(this.status+" "+this.statusText)},a.send()})}function plotly(){var e=getPlotData(dataParameters.dataRaw,"observed in "+dataParameters.firstYear);console.log(e);var t=getPlotData(dataParameters.dataAverage,"average ("+dataParameters.firstYear+"-"+dataParameters.lastYear+")");t.x=e.x,console.log(t);var a=[e,t],r={xaxis:{type:"date",tickformat:"%b",title:"Date"},yaxis:{title:dataParameters.parameter}};Plotly.newPlot("plot",a,r)}function getPlotData(e,t){var a={x:[],y:[],type:"scatter",name:t};for(var r in e)a.x.push(r),a.y.push(e[r][dataParameters.parameter]);return a}function showDetails(e){var t=e.target.parentElement.parentElement.querySelector(".dataset__description");helper.toggleClass(t,"dataset--hide")}function showPlot(e){var t=e.target.parentElement.parentElement.querySelector(".dataset__plot");helper.toggleClass(t,"dataset--hide")}