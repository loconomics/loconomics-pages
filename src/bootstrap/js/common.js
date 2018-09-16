(global => {
    let list = ['images/hero1.jpg', 'images/hero2.jpg', 'images/hero3.jpg'];
    let i = 0;

    setInterval(function(){
        document.getElementById('div-home-hero-bg').style.backgroundImage = 'url("' + list[i] + '")';
        if (i >= list.length - 1) i = 0; else i++;      
    }, 5000);
})(window)