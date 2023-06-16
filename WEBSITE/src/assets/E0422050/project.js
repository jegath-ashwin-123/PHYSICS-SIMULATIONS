var canvas;
var canvas_context;
var coordX=275;
var coordY=55;
var flag=0;

window.onload=function(){
    canvas=document.getElementById('CANVAS');
    canvas_context=canvas.getContext('2d');
    const interval=setInterval(movement,20);
}

function movement() {

    if(flag==1){
        clearTimeout(interval);
    }

    canvas_context.fillStyle='#301934';
    canvas_context.fillRect(200,0,canvas.width,canvas.height); 

    canvas_context.fillStyle='#000000';
    canvas_context.fillRect(275,50,740,180);

    canvas_context.fillStyle='#301934';
    canvas_context.fillRect(279,51.5,732,176.5);

    canvas_context.fillStyle='#000000';
    canvas_context.fillRect(400,40,70,25);

    canvas_context.fillStyle = "silver";
    canvas_context.font = "16px Arial";
    canvas_context.fillText("BATTERY",400,37);

    canvas_context.fillStyle = "silver";
    canvas_context.font = "16px Arial";
    canvas_context.fillText("AMMETER",980,115);

    canvas_context.beginPath();
    canvas_context.fillStyle='black';
    canvas_context.arc(1015,150,30,0,Math.PI*2,true)
    canvas_context.stroke(); 
    canvas_context.fill();


    canvas_context.fillStyle = "silver";
    canvas_context.font = "16px Arial";
    canvas_context.fillText("FUSE",570,215);    
    canvas_context.fillText("5Ω",580,255);

    canvas_context.fillStyle='white';
    canvas_context.fillRect(550,220,80,20);
    canvas_context.fillStyle='gold';
    canvas_context.fillRect(550,228,80,2);

    if(v>79){
        v=80;
        canvas_context.fillStyle='#301934';
        canvas_context.fillRect(200,0,canvas.width,canvas.height); 

        canvas_context.fillStyle='#000000';
        canvas_context.fillRect(275,50,740,180);

        canvas_context.fillStyle='#301934';
        canvas_context.fillRect(279,51.5,732,176.5);

        canvas_context.fillStyle='#000000';
        canvas_context.fillRect(400,40,70,25);

        canvas_context.fillStyle = "silver";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("BATTERY",400,37);

        canvas_context.fillStyle = "silver";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("AMMETER",980,115);

        canvas_context.beginPath();
        canvas_context.fillStyle='black';
        canvas_context.arc(1015,150,30,0,Math.PI*2,true)
        canvas_context.stroke(); 
        canvas_context.fill();


        canvas_context.fillStyle = "silver";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("FUSE",570,215);    
        canvas_context.fillText("5Ω",580,255);

        canvas_context.fillStyle='white';
        canvas_context.fillRect(550,220,80,20);
        canvas_context.fillStyle='gold';
        canvas_context.fillRect(550,228,80,2);


        canvas_context.fillStyle='white';
        canvas_context.fillRect(580,228,20,2);
        canvas_context.fillStyle='black';
        canvas_context.fillRect(577,228,4,2);
        canvas_context.fillStyle='black';
        canvas_context.fillRect(600,228,3,2);
        flag=1;

        clearInterval(interval);
    }

    canvas_context.fillStyle = "silver";
    canvas_context.font = "16px Arial";
    canvas_context.fillText("AMMETER",980,115);


    canvas_context.fillStyle = "gold";
    canvas_context.fillText(v+" V",417,57);
    canvas_context.fillText(v/5+" A",997,155);

    if(v<25){
        temp=-5
    }
    else if(v<50){
        temp=-2.5
    }
    else if(v<75){
        temp=0
    }
    else{
        temp=5
    }
    
    //Right
    if(coordY==55 && coordX<=1004){
        coordX=coordX+10+temp;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY); 
    }

    //Down
    else if(coordX==1005 && coordY<=234){
        coordY=coordY+10+temp;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY); 
    } 

    //Left
    else if(coordY==235 && coordX>=275){
        coordX=coordX-10-temp;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY);
    }

    //Up
    else if(coordY>=55 && coordX==265 && coordY!=55){
        coordY=coordY-10-temp;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY);
    }

    //Right222
    else if(coordY==55 && coordX>1004){
        coordX=1005;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY); 
    }   
    
    //Down222
    else if(coordX==1005 && coordY>234){
        coordY=235;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY); 
    }

    //Left222
    else if(coordY==235 && coordX<275){
        coordX=265;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY);
    }

    //Up222
    else if((coordY<55 && coordX==265 && coordY!=55)||(coordY<55 && coordX==275 && coordY!=55)){
        coordY=55;
        canvas_context.fillStyle = "white";
        canvas_context.font = "16px Arial";
        canvas_context.fillText("e-",coordX,coordY);
    }

}