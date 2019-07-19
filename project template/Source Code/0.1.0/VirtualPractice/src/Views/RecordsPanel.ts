/**
 * 实训记录 面板
 * @author 彭祥
 *
 */
class RecordsPanel extends egret.Sprite {
    public constructor() {
        super();
        this.initData();
    }

    private _txt_info: eui.Label;
    private initData(): void {
        var recordsPanel = new eui.Component();
        recordsPanel.skinName = "resource/eui_skins/Panel/RecordsPanelSkin.exml";
        this.addChild(recordsPanel);
        recordsPanel.x = 0;
        recordsPanel.y = 0;

        recordsPanel["btn_close"].addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnClose,this);

        this._txt_info = recordsPanel.getChildByName("txt_info") as eui.Label;
        this._txt_info.lineSpacing = 3;//行间距
    }

    private onBtnClose(e: egret.TouchEvent): void {
        this.visible = false;
    }

    public AddMsg(param1: String,param2: String = "normal"): void {
        var str: string;
        var time: string;
        switch(param2) {
            case "right":
                {
                    str = "#0000ff";
                    break;
                }
            case "wrong":
                {
                    str = "#FF3333";
                    break;
                }
            case "normal":
                {
                    str = "#000000";
                    break;
                }
            default:
                {
                    str = "#999999";
                    break;
                }
        }

         time = this.getTime3();
//                info_txt.htmlText = info_txt.htmlText + ("<p align=\'left\'><font size=\'16\' face=\'微软雅黑\' LETTERSPACING=\'1\' color=\'" + str + "\'>" + time + param1 + "</font></p>");
         if(this._txt_info.text == "")
        {
             this._txt_info.text = time + param1;
        }else
        {
             this._txt_info.text = this._txt_info.text + "\r" + time + param1;
        }
        return;
    }

    private getTime3(): string {
        var str: string = "";
        var mydata: Date = new Date();
        var hour: String = this.getPrefixNum(mydata.getHours());
        var minute: String = this.getPrefixNum(mydata.getMinutes());
        var second: String = this.getPrefixNum(mydata.getSeconds());

        str = "[" + hour + ":" + minute + ":" + second + "]   ";

        return str;
    }

    private getPrefixNum(param1: Number): String {
        if(param1 < 10 && param1 >= 0) {
            return "0" + param1.toString();
        }
        return param1.toString();
    }
}
