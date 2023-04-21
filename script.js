const imgContElm = document.querySelector(".img_container");
const imgElm = document.querySelector(".img_container img");
const listProductsElm = document.querySelector(".list_products");

const ZOOM = 300;

//event Mouse Enter
imgContElm.addEventListener('mouseenter', function () {
    imgElm.style.width = ZOOM + '%';
})
//event Mouse Leave
imgContElm.addEventListener('mouseleave', function () {
    imgElm.style.width = '100%';
    imgElm.style.top = '0';
    imgElm.style.left = '0';
})

//event mouse move
//change position of the big image with the cursor in the container
imgContElm.addEventListener('mousemove', function (mouseEvent) {
    let obj = imgContElm;
    let obj_left = 0;
    let obj_top = 0;
    let xpos;
    let ypos;

    while (obj.offsetParent) {
        obj_left += obj.offsetLeft;
        obj_top += obj.offsetTop;
        obj = obj.offsetParent;
    }

    if (mouseEvent) {
        //firefox
        xpos = mouseEvent.pageX;
        ypos = mouseEvent.pageY;
    } else {
        //IE
        xpos = window.event.x + document.body.scrollLeft - 2;
        ypos = window.event.y + document.body.scrollTop - 2;
    }
    xpos -= obj_left;
    ypos -= obj_top;

    const imgWidth = imgElm.clientWidth;
    const imgHeight = imgElm.clientHeight;

    imgElm.style.top = -(((imgHeight - this.clientHeight) * ypos) / this.clientHeight) + 'px';
    imgElm.style.left = -(((imgWidth - this.clientWidth) * xpos) / this.clientWidth) + 'px';

    //change the current img
    Array.from(listProductsElm.children).forEach((productElm, i, list) => {
        productElm.addEventListener('click', function() {
            const newSrc = productElm.querySelector('img').src;
            imgElm.src = newSrc; 

            list.forEach(prod => prod.classList.remove('active'));
            productElm.classList.add('active');
        })
    })

    //change height of the img container
    function changeHeight() {
        imgContElm.style.height = imgContElm.clientWidth + 'px';        
    }
    changeHeight();

    window.addEventListener('resize', changeHeight);

})
