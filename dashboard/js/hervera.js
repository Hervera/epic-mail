
// Navigation bars open menu and close
document.getElementById("aside-nav").style.display = "block";
function bars_open() {
var x = document.getElementById("aside-nav");
    if (x.style.display === "block") {
        x.style.display = "none";
        document.getElementById("main").style.marginLeft = "1.5%";
    } else {
        x.style.display = "block";
        document.getElementById("main").style.marginLeft = "16.5%";
    }
}
