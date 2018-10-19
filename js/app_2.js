window.onload=function(){
    waterfall('container','box');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'},{'src':'6.jpg'}]};
    window.onscroll=function () {
        if(checkFlag()){//添加元素：
            var cParent=document.getElementById("container");
            for(var i=0;i<dataInt.data.length;i++){
                var cContent=document.createElement("div");
                cContent.className='box';
                cParent.appendChild(cContent);
                var boxImg=document.createElement("div");
                boxImg.className="box_image";
                cContent.appendChild(boxImg);
                var img=document.createElement("img");
                img.src="img/"+dataInt.data[i].src;
                boxImg.appendChild(img);
            }
            waterfall('container','box');
        }
    }
}
function checkFlag() {//true:允许加载 false：不允许加载
    //得到最后一张图片高度
    var cParent=document.getElementById("container");
    var cContent=getClassObj(cParent,"box");
    var lastContentHeight=cContent[cContent.length-1].offsetTop;
    //
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastContentHeight+" : "+scrollTop+" : "+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}

function waterfall(parent,pin){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getClassObj(oParent,pin);// 获取存储块框pin的数组aPin
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';
    var BoxHeightArr=[];
    for(var i=0;i<aPin.length;i++){
        if(i<num){BoxHeightArr[i]=aPin[i].offsetHeight;}
        else{
            var minHeight=Math.min.apply(null,BoxHeightArr);
            var minIndex=getMinheightLocation(BoxHeightArr,minHeight);

            aPin[i].style.position="absolute";
            aPin[i].style.top=minHeight+"px";
            aPin[i].style.left=aPin[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+aPin[i].offsetHeight;
        }
    }

    function getMinheightLocation(BoxHeitArr,minHeight) {
        for(var j in BoxHeitArr){
            if(BoxHeitArr[j]==minHeight){
                return j;
            }
        }
    }


}//设置父级居中样式：定宽+自动水平外边距

function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}