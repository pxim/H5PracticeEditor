/**
 * 练习模块 主界面
 * @author 彭祥 
 *
 */
class PracticePanel extends eui.Component {
    public constructor() {
        super();
        this.initdata();
    }

    /**
    * 练习模块—实训记录界面
    */
    private _trainRecordsPanel: RecordsPanel;
    
    /**
     * 练习模块—操作规范界面
     */
    private _standardPanel: StandardPanel;
    
    /**
     * 练习模块—零件界面
     */
    public _partsPanel: PartsPanel;
    
    /**
     * 练习模块-工具界面
     */
    public _toolsPanel: ToolsPanel;
    

    /**
     * 练习主界面里
     * 存储小面板的数组
     */
    private _littlePanelAry: Array<any> = new Array();

    private initdata(): void {
        this.skinName = "resource/eui_skins/Panel/PracticePanelSkin.exml";

        this["btn_trainRecords"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_standard"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_parts"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_tools"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_restart"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_backHomrpage"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);
        this["btn_nextScene"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTrainRecordsClick,this);

        this._trainRecordsPanel = new RecordsPanel();
        this.addChildAt(this._trainRecordsPanel,this.numChildren - 1);
        this._trainRecordsPanel.x = 300;
        this._trainRecordsPanel.y = 90;
        this._littlePanelAry.push(this._trainRecordsPanel);
        this.closelittlPanel(this._trainRecordsPanel);
        this._trainRecordsPanel.visible = false;
        
        //        this._standardPanel = new StandardPanel();
        //        this.addChildAt(this._standardPanel,this.numChildren - 1);
        //        this._standardPanel.x = 300;
        //        this._standardPanel.y = 90;
        //        this._littlePanelAry.push(this._standardPanel);
        //        this.closelittlPanel(this._standardPanel);
        //        this._standardPanel.visible = false;
        
        this._partsPanel = new PartsPanel();
        this.addChildAt(this._partsPanel,this.numChildren - 1);
        this._partsPanel.x = 300;
        this._partsPanel.y = 90;
        //        this._partsPanel = this["partsPanel2"] as PartsPanel;
        this._littlePanelAry.push(this._partsPanel);
        this.closelittlPanel(this._partsPanel);
        this._partsPanel.visible = false;
        this._partsPanel.addEventListener(DataEvents.show_part_index,this.onShowPart,this);


        this._toolsPanel = new ToolsPanel();
        this.addChildAt(this._toolsPanel,this.numChildren - 1);
        this._toolsPanel.x = 300;
        this._toolsPanel.y = 90;
        this._littlePanelAry.push(this._toolsPanel);
        this.closelittlPanel(this._toolsPanel);
        this._toolsPanel.visible = false;
        this._toolsPanel.addEventListener(DataEvents.show_tool_index,this.onShowTool,this);

        for(var i: number = 0;i < this.numChildren;i++) {
            if(this.getChildAt(i).name.indexOf("part_") != -1) {
                this.getChildAt(i).visible = false;
                this.getChildAt(i)["_origX"] = this.getChildAt(i).x;
                this.getChildAt(i)["_origY"] = this.getChildAt(i).y;
            }

            if(this.getChildAt(i).name.indexOf("tool_") != -1) {
                this.getChildAt(i).visible = false;
                this.getChildAt(i)["_origX"] = this.getChildAt(i).x;
                this.getChildAt(i)["_origY"] = this.getChildAt(i).y;
            }
        }
        
        //        console.log(egret.Capabilities.isMobile);
        if(egret.Capabilities.isMobile == false) {
            this["desktopToolkit"].visible = false;
        } else {
            this["desktopToolkit"].visible = true;
        }
    }
    
    /**
     * 实训记录
     * @param e
     */
    private onTrainRecordsClick(e: egret.TouchEvent): void {
        var target = e.currentTarget;
        switch(target) {
            case this["btn_trainRecords"]://实训记录
                //                this.dispatchEvent(new DataEvents(DataEvents.btn_trainRecords_click));
                this.onTrainRecordsPanel();
                break;
            case this["btn_standard"]://拆装规范
                //                this.dispatchEvent(new DataEvents(DataEvents.btn_standard_click));
                this.onStandardPanel();
                break;
            case this["btn_parts"]://零件
                //                this.dispatchEvent(new DataEvents(DataEvents.btn_parts_click));
                this.onPartsPanel();
                break;
            case this["btn_tools"]://工具
                //                this.dispatchEvent(new DataEvents(DataEvents.btn_tools_click));
                this.onToolsPanel();
                break;
            case this["btn_restart"]://重新开始
                this.dispatchEvent(new DataEvents(DataEvents.btn_restart_click));
                break;
            case this["btn_backHomrpage"]://返回主界面
                this.dispatchEvent(new DataEvents(DataEvents.btnBackbomepag_click));
                break;
            case this["btn_nextScene"]: //下一个场景
                //                this.dispatchEvent(new DataEvents(DataEvents.btn_nextScene_click));
                this.onBtnNextSceneClick();
                break;
        }
    }
    
    /**
  * 场景序列，初始化场景 1
  */
    private _sceneIndex: number = 1;
    /**
 * 场景动画MC
 */
    private scene2: Scene2View;
    /**
 * 下一个转场效果
 * @param e
 */
    private onBtnNextSceneClick(): void {
        if(this._sceneIndex == 1) {
            if(this.scene2 == null) {
                this.scene2 = new Scene2View();
                this.addChild(this.scene2);
                this.addRecords("播放第一个场景转换动画");
            }
        } else if(this._sceneIndex == 2) {
            //            this.removeChild(this.scene2);
            //            this.scene2 = null;
            var scene3 = new Scene3View();
            this.addChild(scene3);
            this.addRecords("播放第二个场景转换动画");
            this._sceneIndex = 3;
            //            this.scene2.visible = false;
        }
    }
    
    /** 
     * 打开，关闭 练习模块——实训记录面板
     * @param e
     */
    private onTrainRecordsPanel(): void {
        if(this._trainRecordsPanel == null) {
            this._trainRecordsPanel = new RecordsPanel();
            this.addChildAt(this._trainRecordsPanel,this.numChildren - 1);
            this._trainRecordsPanel.x = 300;
            this._trainRecordsPanel.y = 90;

            this._littlePanelAry.push(this._trainRecordsPanel);
            this.closelittlPanel(this._trainRecordsPanel);
        } else {
            if(this._trainRecordsPanel.visible == true) {
                this._trainRecordsPanel.visible = false;
            } else {
                this._trainRecordsPanel.visible = true;
                this.closelittlPanel(this._trainRecordsPanel);
            }
        }
    }
    
    
    /**
     * 打开，关闭 练习模块——拆装规范面板
     * @param e
     */
    private onStandardPanel(): void {

        if(this._standardPanel == null) {
            this._standardPanel = new StandardPanel();
            this.addChildAt(this._standardPanel,this.numChildren - 1);
            this._standardPanel.x = 300;
            this._standardPanel.y = 90;

            this._littlePanelAry.push(this._standardPanel);
            this.closelittlPanel(this._standardPanel);
        } else {
            if(this._standardPanel.visible == true) {
                this._standardPanel.visible = false;
            } else {
                this._standardPanel.visible = true;
                this.closelittlPanel(this._standardPanel);
            }
        }
    }
    
    
    /**
     * 打开，关闭 练习模块——零件面板
     * @param e
     */
    private onPartsPanel(): void {
        if(this._partsPanel == null) {
            this._partsPanel = new PartsPanel();
            this.addChildAt(this._partsPanel,this.numChildren - 1);
            this._partsPanel.x = 300;
            this._partsPanel.y = 90;

            this._littlePanelAry.push(this._partsPanel);
            this.closelittlPanel(this._partsPanel);
        } else {
            if(this._partsPanel.visible == true) {
                this._partsPanel.visible = false;
            } else {
                this._partsPanel.visible = true;
                this.closelittlPanel(this._partsPanel);
            }
        }
    }
    
    /**
     * 打开，关闭 练习模块——工具面板
     * @param e
     */
    private onToolsPanel(): void {
        if(this._toolsPanel == null) {
            this._toolsPanel = new ToolsPanel();
            this.addChildAt(this._toolsPanel,this.numChildren - 1);
            this._toolsPanel.x = 300;
            this._toolsPanel.y = 90;

            this._littlePanelAry.push(this._toolsPanel);
            this.closelittlPanel(this._toolsPanel);
        } else {
            if(this._toolsPanel.visible == true) {
                this._toolsPanel.visible = false;
            } else {
                this._toolsPanel.visible = true;
                this.closelittlPanel(this._toolsPanel);
            }
        }
    }
   
    /**
     * 面板按钮点击时，切换关闭其他面板
     * @param mc
     */
    private closelittlPanel(mc): void {
        this.setChildIndex(mc,this.numChildren - 1)
        for(var i: number = 0;i < this._littlePanelAry.length;i++) {
            if(this._littlePanelAry[i] != mc) {
                this._littlePanelAry[i].visible = false;
            }
        }
    }

    private onShowPart(e: DataEvents): void {
        var index: number = e.params as number;

        var partMC = this["part_" + index];
        if(partMC != null) {
            partMC.visible = true;
            this.setChildIndex(partMC,this.numChildren - 1);
            //                  this.scene2.visible = false;
            //					partMC.onStartDrage();
            //					partMC.incomingData(index);
            this.onDrag(partMC);
        }
    }

    private onShowTool(e: DataEvents): void {
        var index: number = e.params as number;
        var toolMC = this["tool_" + index];
        if(toolMC != null) {
            toolMC.visible = true;
            this.setChildIndex(toolMC,this.numChildren - 1);
            //                  this.scene2.visible = false;
            //					partMC.onStartDrage();
            //					partMC.incomingData(index);
            this.onDrag(toolMC);
        }
    }

    private _drag: Drag;
    /**
     * 拖动功能
     */
    private onDrag(mc: egret.DisplayObject): void {
        //            this._drag = new Drag();
        //            this.stage.addChild(this._drag);
        var index = mc.name.substr(5);
        //开始拖拽
        var cpoint;
        if(this.scene2 == null) {
            cpoint = null;
        } else {
            cpoint = this.scene2["cPoint_" + index + "_2"]
        }
        //        this._drag.start(mc,1,-150,cpoint);
        //        this._drag.onStartDrage();
        (mc as Drag).start(mc,1,-150,cpoint);
        (mc as Drag).onStartDrage();
        //停止拖拽
        //        drag.stop();
        //        this._drag.addEventListener(DataEvents.part_hide_index,this.onPartHideIndex,this);
        (mc as Drag).addEventListener(DataEvents.part_hide_index,this.onPartHideIndex,this);
    }

    private onPartHideIndex(e: DataEvents): void {
        var dataObj = e.params;
        if(dataObj["isHit"] == false) {
            var index = dataObj["dragObject"].name.substr(5);
            var dragObjectName: string = dataObj["dragObject"].name;
            if(dragObjectName.indexOf("part_") != -1) {
                this._partsPanel.showPart(index);

            } else if(dragObjectName.indexOf("tool_") != -1) {
                this._toolsPanel.showPart(index);
            }
            this.onHandle();
        } else {
            switch(dataObj["dragObject"].name) {
                case "tool_1":
                    this._condi_1 = dataObj;
                    this.onHandle();
                    break;
                case "tool_2":
                    this._condi_2 = dataObj;
                    this.onHandle();
                    break;
            }
        }
    }

    private _condi_1: Object;
    private _condi_2: Object;
    private onHandle(): void {
        if(this._sceneIndex < 3) {
            if(this._condi_1 != null && this._condi_2 != null) {
                if(this._condi_1["isHit"] == true && this._condi_2["isHit"] == true) {

                    this._sceneIndex = 2;
                    this["btn_nextScene"].visible = true;
                    this.setChildIndex(this["btn_nextScene"],this.numChildren - 1);
                } else 
                {
                    this["btn_nextScene"].visible = false;
                }
            } else if(this._sceneIndex > 1)
            {
                this["btn_nextScene"].visible = false;
            }
        }
    }

    public addRecords(str: string): void {
        this._trainRecordsPanel.AddMsg(str);
    }
}
