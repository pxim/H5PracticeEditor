/**
 * 功能：声音处理面板
 * @author 彭祥
 *
 */
class SoundPanel extends egret.Sprite {
    public constructor() {
        super();
        //                this.initdata();
        //        this.initData2();
        //        this.initData3();
    }

    private sound: egret.Sound;
    private soundAry: Array<any> = ["resource/assets/Sound/dwysn.mp3"];
    private soundIndex: number = 0;
    public initdata(): void 
    {

        var sound0: egret.Sound = RES.getRes("dwysn_mp3");//0.5second_mp3
        var soundchannel0: egret.SoundChannel = sound0.play();
            
        //            this.sound = new egret.Sound();
        //            var parth: string = this.soundAry[this.soundIndex];
        //            this.loadSound(parth);
        //            
        //            soundchannel0.stop();
    }

    private loadSound(parth1: string): void {
        //        this.sound = new egret.Sound();
        if(this._soudChanel != null) {
            this._soudChanel.stop();
        }

        this.sound.addEventListener(egret.Event.COMPLETE,this.onSoundComplete,this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onSoundError,this);

        this.sound.load(parth1);
    }

    private _soudChanel: egret.SoundChannel;
    private onSoundComplete(e: egret.Event): void {
        //          this.sound.play();
        this._soudChanel = this.sound.play();
    }

    private onSoundError(e: egret.IOErrorEvent): void {
        console.log("loaded error!");
        alert("loaded error!");
    }

    private onBtn_pre(e: egret.TouchEvent): void {
        if(this.soundIndex > 0) {
            this.soundIndex--;
            var parth: string = this.soundAry[this.soundIndex];
            this.loadSound(parth);
        }
    }

    private onBtn_next(e: egret.TouchEvent): void {
        if(this.soundIndex < this.soundAry.length - 1) {
            this.soundIndex++;
            var parth: string = this.soundAry[this.soundIndex];
            this.loadSound(parth);
        }
    }
        
    /**
     * 重置声音播放状态，全部归0
     */
    public reset(): void {
        if(this._soudChanel != null) {
            this._soudChanel.stop();
        }

        if(this.sound != null) {
            this.sound = null;
        }
    }
        
    
//    //——————————————————————————————————————————————————————————————————————————————————————————————————————————————//
//    private initData2(): void {
//        //创建 URLLoader 对象
//        var loader: egret.URLLoader = new egret.URLLoader();
//        //设置加载方式为声音
//        loader.dataFormat = egret.URLLoaderDataFormat.SOUND;
//        //添加加载完成侦听
//        loader.addEventListener(egret.Event.COMPLETE,this.onLoadComplete,this);
//        //这个示例的声音素材放在 `resource` 的 `assets` 文件夹下
//        var url: string = "resource/assets/Sound/concongnanian.mp3";
//        var request: egret.URLRequest = new egret.URLRequest(url);
//        //开始加载
//        loader.load(request);
//
//    }
//
//    private onLoadComplete(event: egret.Event): void 
//    {
//        var loader: egret.URLLoader = <egret.URLLoader>event.target;
//        //获取加载到的 Sound 对象
//        var sound: egret.Sound = <egret.Sound>loader.data;
//        var channel: egret.SoundChannel = sound.play(0,1);
//        channel.addEventListener(egret.Event.SOUND_COMPLETE,this.onSoundComplete,this);
//
//    }
//
//    private onSoundComplete(event: egret.Event): void {
//        console.log("onSoundComplete");
//
//    }
        
//        public initData3():void
//        {
//            var sound: egret.Sound = RES.getRes("concongnanian_mp3");
//            sound.play();
//
//            var sound2: egret.Sound = new egret.Sound();
//            sound2.addEventListener(egret.Event.COMPLETE,function loadOver(event: egret.Event) {
//                sound2.play();
//
//            },this);
//            sound2.addEventListener(egret.IOErrorEvent.IO_ERROR,function loadError(event: egret.IOErrorEvent) {
//                console.log("loaded error!");
//
//            },this);
//            sound2.load("resource/assets/Sound/a010101c.mp3");
//        }
}
