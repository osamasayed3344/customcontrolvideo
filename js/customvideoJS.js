//--------------------------------------------
class Customvideo {
    mutedbtn=null;
    volumesliderbtn=null;
    seekBarbtn=null;
    backwardbtn=null;
    playpausebtn=null;
    stopbtn=null;
    forwardbtn=null;
    fullscreenbtn=null;
    videocotainer=null;
    constructor(videoId) {
        this.videoid = document.getElementById(videoId);
        this.videoid.controls=false;
        this.createcontroll(this.videoid);
        this.createinsidecontroltop();
        this.createinsidecontrolbottom();
        this.initializeEventListeners(this.videoid,this.playpausebtn,this.stopbtn,this.forwardbtn,this.backwardbtn,this.mutedbtn,this.volumesliderbtn,this.seekBarbtn,this.fullscreenbtn);
    }

    createcontroll(videoid){
        let createvideocotainer = document.createElement('div');
        createvideocotainer.className='video_container';
        document.body.appendChild(createvideocotainer);
        createvideocotainer.appendChild(videoid);
        this.videocotainer=createvideocotainer;
        let createcontrol = document.createElement('div');
        createcontrol.className='controls';
        createcontrol.style.width=videoid.offsetWidth+"px";
        createcontrol.innerHTML='<div class="controls_top"></div>'+
            '<div class="controls_bottom"></div>';
        videoid.insertAdjacentElement('afterend', createcontrol);
    }

    createinsidecontroltop(){
        let createseekbar= document.createElement('input');
        let controltop=document.querySelector('.controls_top');
        createseekbar.id='seekBar';
        createseekbar.type='range';
        createseekbar.min='0';
        createseekbar.max='100';
        createseekbar.value='0';
        controltop.appendChild(createseekbar);
        this.seekBarbtn=createseekbar;
    }

    createinsidecontrolbottom(){
        let controlbottom=document.querySelector('.controls_bottom');
        controlbottom.innerHTML='<div class="control_audio"></div>'+
        '<div class="control_video"></div>';
        this.mutedbtn=this.createbuttonitem('muted','.control_audio','<i class="fa-solid fa-volume-high"></i>');
        this.createvolumeslider();
        this.backwardbtn=this.createbuttonitem('backward','.control_video','<i class="fa-solid fa-backward"></i>');
        this.playpausebtn=this.createbuttonitem('playPause','.control_video','<i class="fa-solid fa-play"></i>');
        this.stopbtn=this.createbuttonitem('stop','.control_video','<i class="fa-solid fa-stop"></i>');
        this.forwardbtn=this.createbuttonitem('forward','.control_video','<i class="fa-solid fa-forward"></i>');
        this.fullscreenbtn=this.createbuttonitem('fullscreen','.controls_bottom','<i class="fa-solid fa-expand"></i>');
    }

    createbuttonitem(buttonID,controlitemclassname,innerbutton){
        let createitem = document.createElement('button');
        let controlitem=document.querySelector(controlitemclassname);
        createitem.id=buttonID;
        createitem.className='control_item';
        createitem.innerHTML=innerbutton;
        controlitem.appendChild(createitem);
        return createitem;
    }

    createvolumeslider(){
        let createvolumeslider= document.createElement('input');
        let controlaudio=document.querySelector('.control_audio');
        createvolumeslider.id='volumeslider';
        createvolumeslider.type='range';
        createvolumeslider.min='0';
        createvolumeslider.max='100';
        createvolumeslider.value='100';
        controlaudio.appendChild(createvolumeslider);
        this.volumesliderbtn=createvolumeslider;
    }

    initializeEventListeners(videoid,playpausebtn,stopbtn,forwardbtn,backwardbtn,mutedbtn,volumesliderbtn,seekBarbtn,fullscreenbtn) {
        //----------------------------------------------------------
        playpausebtn.addEventListener('click', () => {
            if(videoid.paused){
                videoid.play();
                playpausebtn.innerHTML='<i class="fa-solid fa-pause"></i>';
            }
            else{
                videoid.pause();
                playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
            }
        });

        //------------------------------------------------------------------
        document.addEventListener('keydown', function(event) {
            // تحقق مما إذا كان المفتاح المضغوط هو مفتاح المسافة (space)
            if (event.code === 'Space') {
                event.preventDefault(); // لمنع الصفحة من التمرير عند الضغط على المسافة
                if (videoid.paused) {
                    videoid.play(); // شغل الفيديو إذا كان موقوفاً
                    playpausebtn.innerHTML='<i class="fa-solid fa-pause"></i>';
                } else {
                    videoid.pause(); // أوقف الفيديو إذا كان قيد التشغيل
                    playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
                }
            }

            if(event.code==='ArrowRight'){
                event.preventDefault();
                const currentTime = videoid.currentTime;
                videoid.currentTime=currentTime+10;
            }

            if(event.code==='ArrowLeft'){
                event.preventDefault();
                const currentTime = videoid.currentTime;
                videoid.currentTime=currentTime-10;
            }

        });

        //--------------------------------------------------------------------
        stopbtn.addEventListener('click',function(){
            videoid.pause();
            playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
            videoid.currentTime=0;
        });

        //---------------------------------------------------------------------
        forwardbtn.addEventListener('click',function(){
            const currentTime = videoid.currentTime;
            videoid.currentTime=currentTime+10;
        });
        
        backwardbtn.addEventListener('click',function(){
            const currentTime = videoid.currentTime;
            videoid.currentTime=currentTime-10;
        });

        //--------------------------------------------------------------------
        mutedbtn.addEventListener('click',function(){
            if(videoid.muted){
                videoid.muted=false;
                volumesliderbtn.value=100;
                mutedbtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';
            }
            else{
                videoid.muted=true;
                volumesliderbtn.value=0;
                mutedbtn.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';
            }

        });
        
        volumesliderbtn.addEventListener('input',function(){
            videoid.volume = volumesliderbtn.value/100;
            if(videoid.volume==0){
                mutedbtn.innerHTML='<i class="fa-solid fa-volume-off"></i>';
            }
            else{
                mutedbtn.innerHTML='<i class="fa-solid fa-volume-high"></i>';
            }
        });
        //------------------------------------------------------------------------
        videoid.addEventListener('timeupdate', () => {
            const value = (videoid.currentTime / videoid.duration) * 100;
            seekBar.value = value;
            if(videoid.currentTime==videoid.duration){
                videoid.pause();
                videoid.currentTime=0;
                playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
            }
        });
        
        seekBarbtn.addEventListener('input',function(){
            const value = seekBar.value;
            videoid.currentTime = (value / 100) * videoid.duration;
        });

        //-------------------------------------------------------------------
        fullscreenbtn.addEventListener('click',function(){
            if(document.fullscreenElement){
                document.exitFullscreen(); 
            }else{
                videoid.onplay=function(){
                    videoid.play();
                    playpausebtn.innerHTML='<i class="fa-solid fa-pause"></i>';
                }
                videoid.onpause=function(){
                    videoid.pause();
                    playpausebtn.innerHTML='<i class="fa-solid fa-play"></i>';
                }
                if (videoid.requestFullscreen) {
                    videoid.requestFullscreen();
                } else if (videoid.mozRequestFullScreen) { // Firefox
                    videoid.mozRequestFullScreen();;
                } else if (videoid.webkitRequestFullscreen) { // Chrome, Safari and Opera
                    videoid.webkitRequestFullscreen();
                } else if (videoid.msRequestFullscreen) { // IE/Edge
                    videoid.msRequestFullscreen();
                }
            }
        });

    }

}

