/**
 * @author 彭祥
 */
class Drag extends eui.Component {    private dragObject: egret.DisplayObject;
    private checkPoint: egret.DisplayObject = new egret.DisplayObject();    private offsetX: number = 0;    private offsetY: number = 0;
    public constructor() {        super();        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);    }    private onAddToStage(event: egret.Event) {
    }      /*     * 开始拖拽      * @param _dragObject 拖拽对象      * @param offsetX     X轴偏移      * @param offsetY     Y轴偏移      * */    public start(_dragObject: egret.DisplayObject,offsetX: number = 0,offsetY: number = 0,_checkPoint: egret.DisplayObject) {        this.offsetX = offsetX;        this.offsetY = offsetY;         //
        this.checkPoint = _checkPoint;        this.dragObject = _dragObject;
        this.dragObject.visible = true;        this.dragObject.touchEnabled = true;        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEend,this);

        this.canvas = document.getElementsByTagName("CANVAS")[0];
    }
    private onTouchBegin(e: egret.TouchEvent) {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            console.log("TOUCH_BEGIN");
    }

    private onTouchEend(e: egret.TouchEvent) {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.hitCheckTarget();
            console.log("TouchEend");
    }

    private canvas;
    public _lockIndex:number = 0;
    public onStartDrage(): void {
        //       egret.Ticker.getInstance().register(this.onEnterFrame,this);
        //       this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame2,this); 
          //        this.canvas.addEventListener('mousemove',this.onMove,this); 
        this._lockIndex = 0;
        var ref: Drag = this;
        this.canvas.addEventListener('mousemove',function(evt) {
//            ref.dd();
            if(ref._lockIndex == 0)
            {
                var canvas2: any = evt.currentTarget;
                var style = window.getComputedStyle(canvas2,null);
                var rect = canvas2.getBoundingClientRect();

                var _dragObject = ref.dd();
                
                if(!!window["ActiveXObject"] || "ActiveXObject" in window) 
                {
                    //                  alert("ie");
                    _dragObject.x = (evt.clientX - rect.left) * (canvas2.width / parseFloat(style["width"])) - 15;
                    _dragObject.y = (evt.clientY - rect.top) * (canvas2.height / parseFloat(style["height"])) - 160;
                }else{
                      //                    alert("不是ie");
                    if(evt.x) 
                    {
                        _dragObject.x = (evt.x - rect.left) * (canvas2.width / parseFloat(style["width"])) - 15;
                        _dragObject.y = (evt.y - rect.top) * (canvas2.height / parseFloat(style["height"])) - 160;
                    } else 
                    {
                        _dragObject.x = (evt.clientX - rect.left) * (canvas2.width / parseFloat(style["width"])) - 15;
                        _dragObject.y = (evt.clientY - rect.top) * (canvas2.height / parseFloat(style["height"])) - 160;
                    }
                }
                    
//                this.dragObject.x = canvas2.x -//                    ((this.dragObject.width * this.dragObject.scaleX) / 2)//                    - (this.dragObject.anchorOffsetX * (this.dragObject.width * this.dragObject.scaleX)) + this.offsetX;//                this.dragObject.y = canvas2.y -//                    ((this.dragObject.height * this.dragObject.scaleY) / 2) +//                    (this.dragObject.anchorOffsetY * (this.dragObject.height * this.dragObject.scaleY)) + this.offsetY; 
            }
        });
    }

    private dd(): any 
    {
//       console.log(this.dragObject);
       return this.dragObject;
    }

    private onTouchMove(e: egret.TouchEvent) {        if(this.dragObject) {            this.dragObject.x = e.stageX -                ((this.dragObject.width * this.dragObject.scaleX) / 2)                - (this.dragObject.anchorOffsetX * (this.dragObject.width * this.dragObject.scaleX)) + this.offsetX;            this.dragObject.y = e.stageY -                ((this.dragObject.height * this.dragObject.scaleY) / 2) +                (this.dragObject.anchorOffsetY * (this.dragObject.height * this.dragObject.scaleY)) + this.offsetY; 
            //            this.hitCheckTarget();
                
        }        else {            this.stop();
        }
    }

    public stop() {        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEend,this);        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);    }

    private dataObj: Object = new Object();
    private oldObj:Object = new Object();
    private hitCheckTarget(): void {
        if(this.dragObject == null || this.checkPoint == null)
        {
            this.hideDrag();
            return;
        }
        if(component.HitTestUtil.hitTest(this.dragObject,this.checkPoint)) 
        {
            console.log("开始："+ String((this.checkPoint as CheckPoint)._checkedCounts))
            if((this.checkPoint as CheckPoint)._checkedCounts == 0)
            {
                console.log("hitChecked：——" + String((this.checkPoint as CheckPoint)._checkedCounts));
                this._lockIndex = 1;
                switch(this.dragObject.name)
                {
                        case "part_1":
                        this.dragObject.x = this.checkPoint.x - 7;
                        this.dragObject.y = this.checkPoint.y - 5;
                        (this.parent as PracticePanel).addRecords("装上零件——通气帽左");
                            break;
                        case "part_2":
                        this.dragObject.x = this.checkPoint.x -5;
                        this.dragObject.y = this.checkPoint.y +1;
                        (this.parent as PracticePanel).addRecords("装上零件——通气帽右");
                            break;
                        case "tool_1":
                        this.dragObject.x = this.checkPoint.x -7;
                        this.dragObject.y = this.checkPoint.y -5;
                        (this.parent as PracticePanel).addRecords("装上工具——堵头左");
                            break;
                        case "tool_2":
                        this.dragObject.x = this.checkPoint.x -9;
                        this.dragObject.y = this.checkPoint.y -6;
                        (this.parent as PracticePanel).addRecords("装上工具——堵头右");
                            break;
                 }
              
                this.dataObj["dragObject"] = this.dragObject;
                this.dataObj["checkPoint"] = this.checkPoint;
                this.dataObj["isHit"] = true;
                this.dispatchEvent(new DataEvents(DataEvents.part_hide_index,this.dataObj));
                
                (this.checkPoint as CheckPoint).setChecked(true);
                (this.checkPoint as CheckPoint).setCheckDrag(this.dragObject);
//                return;
            } else 
            {
                 this.hideDrag();
//                 this.setRecord(this.dragObject.name);
//                return;
            }
          
        } else 
        {
            console.log("unhitChecked2：——" + String((this.checkPoint as CheckPoint)._checkedCounts));
            this.dragObject.visible = false;
            this.dataObj["dragObject"] = this.dragObject;
            this.dataObj["checkPoint"] = this.checkPoint;
            this.dataObj["isHit"] = false;
            this.dragObject.x = this.dragObject["_origX"];
            this.dragObject.y = this.dragObject["_origY"];
            this.dispatchEvent(new DataEvents(DataEvents.part_hide_index,this.dataObj));
            
            if(this.checkPoint != null)
            {
                if(this.checkPoint["checkedCounts"] > 0 && (this.checkPoint as CheckPoint).checkDrag == this.dragObject)
               {
                  (this.checkPoint as CheckPoint).setChecked(false);
               }
            }
            this.setRecord(this.dragObject.name);
        }
    }
    
    private hideDrag():void
    {
        if(this.checkPoint != null)
        {
            if(this.checkPoint["checkedCounts"] > 0 && (this.checkPoint as CheckPoint).checkDrag == this.dragObject) {
                (this.checkPoint as CheckPoint).setChecked(false);
            }
        }
        this.dragObject.visible = false;
        this.dataObj["dragObject"] = this.dragObject;
        this.dataObj["checkPoint"] = this.checkPoint;
        this.dataObj["isHit"] = false;
        this.dragObject.x = this.dragObject["_origX"];
        this.dragObject.y = this.dragObject["_origY"];
        this.dispatchEvent(new DataEvents(DataEvents.part_hide_index,this.dataObj));
        
        this.setRecord(this.dragObject.name);
    }
    
    private setRecord(_name:string):void
    {
        switch(_name) {
            case "part_1":
                (this.parent as PracticePanel).addRecords("拆下零件——通气帽左，放进零件箱中");
                break;
            case "part_2":
                (this.parent as PracticePanel).addRecords("拆下零件——通气帽右，放进零件箱中");
                break;
            case "tool_1":
                (this.parent as PracticePanel).addRecords("拆下工具——堵头左，放进工具箱中");
                break;
            case "tool_2":
                (this.parent as PracticePanel).addRecords("拆下工具——堵头右，放进工具箱中");
                break;
        }
    }}