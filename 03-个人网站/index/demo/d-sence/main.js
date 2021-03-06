var s = `Web前端开发是从网页制作演变而来，名称上有很明显的时代特征。在互联网的演化进程中，网页制作是Web1.0时代的产物，早期网站主要内容都是静态，以图片和文字为主，用户使用网站的行为也以浏览为主。随着互联网技术的发展和HTML5、CSS3的应用，现代网页更加美观，交互效果显著，功能更加强大。`;
var oSenceDome = document.getElementById('d-sencedome');
var oSence = oSenceDome.querySelector('#sence');
var oBox = oSence.getElementsByClassName('box')[0];
var oUl = oBox.getElementsByTagName('ul')[0];
var aLi = oUl.getElementsByTagName('li');
var oTable = oSenceDome.getElementsByClassName('table')[0];
var aA = oTable.getElementsByTagName('a');
var oItem = oSenceDome.getElementsByClassName('item')[0];
var oP = oItem.getElementsByTagName('p')[0];
var oClose = oItem.getElementsByTagName('a')[0];
var aBtn = oSenceDome.getElementsByClassName('btn')[0].getElementsByTagName('button');
var oText = oSenceDome.querySelector('.text');
var oTexterea = oText.querySelector('textarea');
var oClose2 = oText.getElementsByTagName('a')[0];
var aBtn2 = oText.getElementsByTagName('button');

var num = 0;
var layer = 0;
var wordNum = -1;

var circleArr = [];
var coneArr = [];
var coneNum = 0;
var liNum = 0;
var columnH = 0;
var columnNum = 0;

var theta = 0;
var phi = 0;
var r = 150;

var iNow = 0;
var iTimer = null;
var angleX = 0;
var angleY = 0;

start();

function start() {
    num = 0;
    layer = 0;
    wordNum = -1;

    circleArr = [];
    coneArr = [];
    coneNum = 0;
    liNum = 0;
    columnH = 0;
    columnNum = 0;

    theta = 0;
    phi = 0;
    r = 150;

    iNow = 0;

    oP.innerHTML = s;

    iRange(4, 13);

    iCircleArr(circleArr);

    creatLi(circleArr, drawCricle);

    circle(aLi);

    var iTimer2 = setInterval(function () {
        angleY++;
        oBox.style.transform = 'rotateY(' + angleY + 'deg)'
    }, 60);

    iConeArr(aLi);
    creatCone(coneArr, aLi);
    creatColumnH(circleArr, aLi);

    oSence.onmousedown = function (ev) {
        clearInterval(iTimer2);
        var e = ev || event;
        var clickX = e.clientX;
        var clickY = e.clientY;
        var disX = 0;
        var disY = 0;
        document.onmousemove = function (ev) {
            var e = ev || event;
            disX = e.clientX - clickX;
            disY = e.clientY - clickY;
            oBox.style.transform = 'rotateX(' + (angleX - disY) + 'deg) rotateY(' + (angleY + disX) + 'deg)';
        }
        document.onmouseup = function () {

            document.onmousemove = null;
            document.onmouseup = null;
            angleX = angleX - disY;
            angleY = angleY + disX;
            if (disY == 0 && disX == 0) {
                disX = 300;
            }
            iTimer2 = setInterval(function () {
                angleX -= disY / 100;
                angleY += disX / 100;
                oBox.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg)';
            }, 50);
        }
        return false;
    }
}


aA[0].onclick = function () {
    clearTimeout(iTimer);
    aA[iNow].className = '0';
    iNow = 0;
    aA[iNow].className = 'active';
    startChange();
    iTimer = setTimeout(function () {
        changeCircle();
    }, 1050);
    close1();
    close2();
}

aA[1].onclick = function () {
    clearTimeout(iTimer);
    aA[iNow].className = '0';
    iNow = 1;
    aA[iNow].className = 'active';
    startChange();
    iTimer = setTimeout(function () {
        changeCone();
    }, 1050);
    close1();
    close2();
}
aA[2].onclick = function () {
    clearTimeout(iTimer);
    aA[iNow].className = '0';
    iNow = 2;
    aA[iNow].className = 'active';
    startChange();
    iTimer = setTimeout(function () {
        changeColumn();
    }, 1050);
    close1();
    close2();
}
aA[3].onclick = function () {
    clearTimeout(iTimer);
    aA[iNow].className = '0';
    iNow = 3;
    aA[iNow].className = 'active';
    startChange();
    iTimer = setTimeout(function () {
        changeColumn2();
    }, 1050);
    close1();
    close2();
}

aBtn[0].onclick = function () {
    this.className = 'active';
    startChange();
    oItem.style.display = 'block';
    setTimeout(function () {
        oItem.style.opacity = 1;
        oItem.style.transform = 'scale(1)';
    }, 1030);
    aBtn[1].disabled = 'true';
}

// close1();

oClose.onclick = function () {
    this.className = 'active';

    aBtn[1].disabled = '';
    aBtn[0].className = '';

    oItem.style.transform = 'rotateX(180deg)';
    oItem.style.opacity = 0;

    setTimeout(function () {
        switch (iNow) {
            case 0:
                changeCircle();
                break;
            case 1:
                changeCone();
                break;
            case 2:
                changeColumn();
                break;
            case 3:
                changeColumn2();
                break;
        }
        oItem.style.transform = 'rotateX(0deg) scale(1.8)';
        oItem.style.display = 'none';
        console.log('b');
    }, 500);
}


aBtn[1].onclick = function () {
    this.className = 'active';
    aBtn[0].disabled = 'true';
    oText.style.display = 'block';
    setTimeout(function () {
        oText.style.transform = 'scale(1)';
        oText.style.opacity = 1;
    }, 12);
}
aBtn2[0].onclick = function () {
    aBtn[0].disabled = '';
    aBtn[1].className = '';
    s = oTexterea.value;
    if (s.length < 50 || s.length > 350) {
        alert('您输入的文字不能小于50或大于350个');
        aBtn[1].className='active';
    } else {
        oUl.innerHTML = '';
        start();
        oText.style.transform = 'scale(0.5)';
        oText.style.opacity = 0;
        setTimeout(function () {
            oText.style.display = 'none';
        }, 60);
    }
}

aBtn2[1].onclick = function () {
    aBtn[1].className='active';
    oTexterea.value = '';
}

oClose2.onclick = function () {

    aBtn[0].disabled = '';
    oTexterea.value = '';
    aBtn[1].className = '';
    oText.style.transform = 'scale(0.5)';
    oText.style.opacity = 0;
    setTimeout(function () {
        oText.style.display = 'none';
    }, 300);
}
function close1() {
    aBtn[1].disabled = '';
    aBtn[0].className = '';

    oItem.style.transform = 'rotateX(180deg)';
    oItem.style.opacity = 0;
}

function close2(){
    aBtn[0].disabled = '';
    aBtn[1].className = '';
    oTexterea.value = '';
    oText.style.transform = 'scale(0.5)';
    oText.style.opacity = 0;

}

function startChange() {
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].className = 'all';
        aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' +
            aLi[i].maxPhi + 'rad) rotateX(' + aLi[i].maxTheta + 'rad)';
        aLi[i].style.opacity = 0;
    }
}

function changeCircle() {
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].className = '';

        aLi[i].maxX = aLi[i].bigcircleX;
        aLi[i].maxY = aLi[i].bigcircleY;
        aLi[i].maxZ = aLi[i].bigcircleZ;
        aLi[i].maxTheta = aLi[i].circleTheta;
        aLi[i].maxPhi = aLi[i].circlePhi;

        aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' +
            aLi[i].maxPhi + 'rad) rotateX(' + aLi[i].maxTheta + 'rad)';
    }
    setTimeout(function () {
        for (var i = 0; i < aLi.length; i++) {
            aLi[i].className = 'one';
            aLi[i].style.opacity = 1;
            aLi[i].style.transform = 'translate3D(' + aLi[i].circleX + 'px,' + aLi[i].circleY + 'px,' + aLi[i].circleZ + 'px) rotateY(' +
                aLi[i].circlePhi + 'rad) rotateX(' + aLi[i].circleTheta + 'rad)';
        }
    }, 50);
}

function changeCone() {
    for (var i = 0; i <= coneNum; i++) {
        aLi[i].className = '';

        aLi[i].maxX = aLi[i].bigconeX;
        aLi[i].maxY = aLi[i].bigconeY;
        aLi[i].maxZ = aLi[i].bigconeZ;
        aLi[i].maxTheta = aLi[i].coneTheta;
        aLi[i].maxPhi = aLi[i].conePhi;

        aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' +
            aLi[i].maxPhi + 'rad) rotateX(' + aLi[i].maxTheta + 'rad)';
    }
    setTimeout(function () {
        for (var i = 0; i <= coneNum; i++) {
            aLi[i].className = 'one';
            aLi[i].style.opacity = 1;
            aLi[i].style.transform = 'translate3D(' + aLi[i].coneX + 'px,' + aLi[i].coneY + 'px,' + aLi[i].coneZ + 'px) rotateY(' +
                aLi[i].conePhi + 'rad) rotateX(' + aLi[i].coneTheta + 'rad)';
        }
    }, 50);
}

function changeColumn() {
    for (var i = 0; i <= coneNum; i++) {
        aLi[i].className = '';

        aLi[i].maxX = aLi[i].bigcolumnX;
        aLi[i].maxY = aLi[i].bigcolumnY;
        aLi[i].maxZ = aLi[i].bigcolumnZ;
        aLi[i].maxTheta = 0;
        aLi[i].maxPhi = aLi[i].columnPhi;

        aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' +
            aLi[i].maxPhi + 'rad) rotateX(' + aLi[i].maxTheta + 'rad)';
    }
    setTimeout(function () {
        for (var i = 0; i <= coneNum; i++) {
            aLi[i].className = 'one';
            aLi[i].style.opacity = 1;
            aLi[i].style.transform = 'translate3D(' + aLi[i].columnX + 'px,' + aLi[i].columnY + 'px,' + aLi[i].columnZ + 'px) rotateY(' +
                aLi[i].columnPhi + 'rad)';
        }
    }, 50);
}

function changeColumn2() {
    for (var i = 0; i <= coneNum; i++) {
        aLi[i].className = '';

        aLi[i].maxX = aLi[i].bigcolumnX2;
        aLi[i].maxY = aLi[i].bigcolumnY2;
        aLi[i].maxZ = aLi[i].bigcolumnZ2;
        aLi[i].maxTheta = 0;
        aLi[i].maxPhi = aLi[i].columnPhi2;

        aLi[i].style.transform = 'translate3D(' + aLi[i].maxX + 'px,' + aLi[i].maxY + 'px,' + aLi[i].maxZ + 'px) rotateY(' +
            aLi[i].maxPhi + 'rad) rotateX(' + aLi[i].maxTheta + 'rad)';
    }
    setTimeout(function () {
        for (var i = 0; i <= coneNum; i++) {
            aLi[i].className = 'one';
            aLi[i].style.opacity = 1;
            aLi[i].style.transform = 'translate3D(' + aLi[i].columnX2 + 'px,' + aLi[i].columnY2 + 'px,' + aLi[i].columnZ2 + 'px) rotateY(' +
                aLi[i].columnPhi2 + 'rad)';
        }
    }, 50);
}

function drawCricle(obj, theta, phi, i, j) {
    theta = Math.PI / (circleArr.length - 1);

    obj.circleX = r * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.circleY = -r * Math.cos(theta * i) + 200;
    obj.circleZ = r * Math.sin(theta * i) * Math.cos(phi * j);
    obj.circleTheta = theta * (circleArr.length - i) - Math.PI / 2;
    obj.circlePhi = phi * j;

    obj.bigcircleX = (r + 2000) * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.bigcircleY = -(r + 2000) * Math.cos(theta * i) + 200;
    obj.bigcircleZ = (r + 2000) * Math.sin(theta * i) * Math.cos(phi * j);

    obj.maxX = obj.bigcircleX;
    obj.maxY = obj.bigcircleY;
    obj.maxZ = obj.bigcircleZ;
    obj.maxTheta = obj.circleTheta;
    obj.maxPhi = obj.circlePhi;
}

function drawCone(obj, phi, i, j) {
    obj.coneX = (2 * r / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.sin(phi * j) + 200;
    obj.coneY = (2 * r / coneArr.length) * i + 50;
    obj.coneZ = (2 * r / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.cos(phi * j);
    obj.coneTheta = Math.PI / 6;
    obj.conePhi = phi * j;

    obj.bigconeX = (2 * (r + 2000) / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.sin(phi * j) + 200;
    obj.bigconeY = (2 * (r + 2000) / coneArr.length) * i + 50 - 2000;
    obj.bigconeZ = (2 * (r + 2000) / coneArr.length) * i * Math.tan(30 * Math.PI / 180) * Math.cos(phi * j);
}

function drawColumn(obj, phi, i, j) {
    obj.columnX = r / 1.5 * Math.sin(phi * j) + 200;
    obj.columnY = (2 * r / (circleArr.length - 2)) * i + 50;
    obj.columnZ = r / 1.5 * Math.cos(phi * j);
    obj.columnPhi = phi * j;

    obj.bigcolumnX = (r + 2000) / 1.5 * Math.sin(phi * j) + 200;
    obj.bigcolumnY = (2 * (r + 2000) / (circleArr.length - 2)) * i + 50 - 2000;
    obj.bigcolumnZ = (r + 2000) / 1.5 * Math.cos(phi * j);
}

function drawColumn2(obj, phi, i, j) {
    obj.columnX2 = r / 1.5 * Math.sin(phi * j + i * 8 * Math.PI / 180) + 200;
    obj.columnY2 = (2 * r / (circleArr.length - 2)) * i + 50;
    obj.columnZ2 = r / 1.5 * Math.cos(phi * j + i * 8 * Math.PI / 180);
    obj.columnPhi2 = phi * j + i * 8 * Math.PI / 180;

    obj.bigcolumnX2 = (r + 2000) / 1.5 * Math.sin(phi * j + i * 8 * Math.PI / 180) + 200;
    obj.bigcolumnY2 = (2 * (r + 2000) / (circleArr.length - 2)) * i + 50 - 2000;
    obj.bigcolumnZ2 = (r + 2000) / 1.5 * Math.cos(phi * j + i * 8 * Math.PI / 180);
}

function iCircleArr(Arr) {
    for (var i = 0; i < layer; i++) {
        if (i < (layer + 1) / 2) {
            wordNum += 2;
        } else {
            wordNum -= 2;
        }
        Arr.push(wordNum);
    }
}

function iConeArr(aArr) {
    for (var i = 0; i < aArr.length; i++) {
        coneNum += 2 * i - 1;
        if (coneNum > aArr.length) {
            coneNum -= 2 * i - 1;
            break;
        }
        coneArr.push(2 * i - 1);
    }
}

function iRange(min, max) {
    for (var i = min; i < max; i++) {
        num = i * i + (i + 1) * (i + 1);
        if (num >= s.length) {
            layer = (i - 1) * 2 + 1;
            break;
        }
        layer = (i - 1) * 2 + 1;
    }
}

function creatLi(Arr, draw) {
    num = 0;
    for (var i = 0; i < Arr.length; i++) {
        phi = 2 * Math.PI / Arr[i];
        for (var j = 0; j < Arr[i]; j++) {
            var li = document.createElement('li');

            li.innerHTML = s[num];
            num++;

            draw(li, theta, phi, i, j);

            oUl.appendChild(li);
        }
    }

}

function creatCone(Arr, aArr) {
    for (var i = 0; i < Arr.length; i++) {
        phi = 2 * Math.PI / Arr[i];
        for (var j = 0; j < Arr[i]; j++) {
            drawCone(aArr[liNum], phi, i, j);
            liNum++;
        }
    }
}

function creatColumnH(Arr, aArr) {
    columnH = Math.floor(aArr.length / (Arr.length - 2));
    columnNum = (Arr.length - 2) * columnH;

    liNum = 0;
    for (var i = 0; i < Arr.length - 1; i++) {
        phi = 2 * Math.PI / columnH;
        for (var j = 0; j < columnH; j++) {
            drawColumn(aArr[liNum], phi, i, j);
            drawColumn2(aArr[liNum], phi, i, j);
            liNum++;
        }
    }
}

function iRotate() {
    iTimer2 = setInterval(function () {
        angleY++;
        oBox.style.transform = 'rotateY(' + angleY + 'deg)'
    }, 60);
}

function circle(aArr) {
    for (var i = 0; i < aArr.length; i++) {
        aArr[i].style.transform = 'translate3D(' + aArr[i].circleX + 'px,' + aArr[i].circleY + 'px,' + aArr[i].circleZ + 'px) rotateY(' +
            aArr[i].circlePhi + 'rad) rotateX(' + aArr[i].circleTheta + 'rad)';
    }
}