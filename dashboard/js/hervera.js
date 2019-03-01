// Navigation bars open menu and close
var x = document.getElementById("aside-nav");
function bars_open() {
    if (x.classList.contains("disp-block")) {
      x.classList.add("disp-none");
      x.classList.remove("disp-block");
      document.getElementById("main").style.marginLeft = "15px";
    } else {
      x.classList.remove("disp-none");
      x.classList.add("disp-block");
      document.getElementById("main").style.marginLeft = "215px";
    }
}
if(window.innerWidth < 600){
  x.classList.add("disp-none");
  x.classList.remove("disp-block");
  document.getElementById("main").style.marginLeft = "15px";
}else{
  x.classList.remove("disp-none");
  x.classList.add("disp-block");
  document.getElementById("main").style.marginLeft = "215px";
}


// tooltips
(function(){
  function createTip(ev){
    var title = this.title;
    this.title = '';
    this.setAttribute("tooltip", title);

    var tooltipWrap = document.createElement("div"); //creates div
    tooltipWrap.className = 'tooltip'; //adds class
    tooltipWrap.appendChild(document.createTextNode(title)); //add the text node to the newly created div.

    var firstChild = document.body.firstChild;//gets the first elem after body
    firstChild.parentNode.insertBefore(tooltipWrap, firstChild); //adds tt before elem

    var padding = 5;
    var linkProps = this.getBoundingClientRect();
    var tooltipProps = tooltipWrap.getBoundingClientRect();

    // console.log(tooltipProps.height);

    var topPos = linkProps.top - (tooltipProps.height + padding) ;


    tooltipWrap.setAttribute('style','top:'+topPos+'px;'+'left:'+linkProps.left+'px;')
    // tooltipWrap.setAttribute('style','left:'+linkProps.left+'px;')
  }


  function cancelTip(ev){
    var title = this.getAttribute("tooltip");
    this.title = title;
    this.removeAttribute("tooltip");
    document.querySelector(".tooltip").remove();
  }

  var links = document.links;
  for(var i=0; i < links.length; i++){
     var a = links[i];
     if(a.title !== ''){
       a.addEventListener('mouseover',createTip);
       a.addEventListener('mouseout',cancelTip);
     }
    //  console.log(a);
  } //END FOR
})()//end iffy


// Get the modal
var modal = document.getElementById('view_modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
