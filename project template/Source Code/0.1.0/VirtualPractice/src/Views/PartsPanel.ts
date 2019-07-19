/**
 * 零件模块 面板
 * @author 彭祥
 *
 */
class PartsPanel extends eui.Component {
    public constructor() {
        super();
        this.initData();
    }

    private partsPanel: eui.Component;
    public initData(): void {
        this.skinName = "resource/eui_skins/Panel/PartsPanelSkin.exml";

        this["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClose,this);

        for(var i: number = 0;i < this.numChildren;i++) {
            if(this.getChildAt(i).name.indexOf("partBtn_") != -1) {
                this.getChildAt(i).visible = false;
                this.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPartBtnClick,this);
            }
        }
    }
	
	
    /**
     * 关闭此节目
     * @param e
     */
    private onBtnClose(e: egret.TouchEvent): void {
        this.visible = false;
    }
    
    
    /**
     * 显示零件
     * @param index
     */
    public showPart(index: number): void {
        if(this["partBtn_" + index] != null) {
            this["partBtn_" + index].visible = true;
        }
    }
    
    
    /**
     * 隐藏零件
     * @param index
     */
    public hidePart(index: number): void {
        if(this["partBtn_" + index] != null) {
            this["partBtn_" + index].visible = false;
        }
    }
    private onPartBtnClick(e: egret.TouchEvent): void {
        var target = e.currentTarget;
        var index: number = parseInt(e.currentTarget.name.substr(8));

        target.visible = false;//隐藏工具
        this.visible = false;//关闭此面板
        this.dispatchEvent(new DataEvents(DataEvents.show_part_index,index));
        //            this.hitCheckTarget();
		
//        var parents: PracticePanel = this.parent as PracticePanel;
//        var partMC = parents["part_" + index];
//        if(partMC != null) {
//            partMC.visible = true;
//            parents.setChildIndex(partMC,parents.numChildren - 1);
//            //                  this.scene2.visible = false;
//            //					partMC.onStartDrage();
//            //					partMC.incomingData(index);
//            //            this.onDrag(partMC);
//            this.dragObject = partMC;
//            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
//        }
    }

    private dragObject: eui.Image = new eui.Image();
    private onTouchMove(e: egret.TouchEvent) {        if(this.dragObject) {            this.dragObject.x = e.stageX -                ((this.dragObject.width * this.dragObject.scaleX) / 2)                - (this.dragObject.anchorOffsetX * (this.dragObject.width * this.dragObject.scaleX)) + 1;            this.dragObject.y = e.stageY -                ((this.dragObject.height * this.dragObject.scaleY) / 2) +                (this.dragObject.anchorOffsetY * (this.dragObject.height * this.dragObject.scaleY)) - 150; 
            //            this.hitCheckTarget();        }        else {            //            this.stop();
        }
    }
}
