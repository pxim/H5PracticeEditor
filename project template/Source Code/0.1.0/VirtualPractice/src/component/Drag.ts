
 * @author 彭祥
 */
class Drag extends eui.Component {
    private checkPoint: egret.DisplayObject = new egret.DisplayObject();

    }
        this.checkPoint = _checkPoint;
        this.dragObject.visible = true;

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
                    
//                this.dragObject.x = canvas2.x -
            }
        });
    }

    private dd(): any 
    {
//       console.log(this.dragObject);
       return this.dragObject;
    }

    private onTouchMove(e: egret.TouchEvent) {
            //            this.hitCheckTarget();
                
        }
        }
    }



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
    }