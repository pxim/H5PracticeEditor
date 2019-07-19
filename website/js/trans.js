/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

function Translate(d, index) {
    var l = GetFirstBrowserLanguage();

    if (l == "en" || l != "pt")
        return;

    if (l.length > 2)
        l = l.substring(0, 2);

    var t = new Language(l);

    switch (index) {   
        case 0: //Main
            //d.title = t.Str("Title", d);
            d.getElementById("Description").innerHTML = t.Str("Description", d);

            d.getElementById("Downloads").innerHTML = t.Str("Downloads", d);
            d.getElementById("Screenshot").innerHTML = t.Str("Screenshot", d);
            d.getElementById("Changelog").innerHTML = t.Str("Changelog", d);
            //d.getElementById("Chat").innerHTML = t.Str("Chat", d);

            d.getElementById("Download").innerHTML = t.Str("Download", d);
            //d.getElementById("Help").innerHTML = t.Str("Help", d);
            //d.getElementById("Source").innerHTML = t.Str("Source", d);
            //d.getElementById("Donate").innerHTML = t.Str("Donate", d);
            d.getElementById("More").innerHTML = t.Str("More", d);
            d.getElementById("Features").innerHTML = t.Str("Features", d);

            //document.getElementById("txFooter").innerHTML = t.Str("Footer");
            break;   
        case 1: //Downloads

            break;
        case 2: //Donate

            break;
    }
}

var GetFirstBrowserLanguage = function() {
    var nav = window.navigator,
        browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'],
        i, language;

    //Support for HTML 5.1 "navigator.languages".
    if (Array.isArray(nav.languages)) {
        for (i = 0; i < nav.languages.length; i++) {
            language = nav.languages[i];
            if (language && language.length) {
                return language;
            }
        }
    }

    //Support for other well known properties in browsers.
    for (i = 0; i < browserLanguagePropertyKeys.length; i++) {
        language = nav[browserLanguagePropertyKeys[i]];
        if (language && language.length) {
            return language;
        }
    }

    return null;
};

function Language(lang) {
    var pt = {
        Description: "Gravador de tela, webcam e quadro virtual com um editor integrado.",
        Title: "H5PracticeEditor - A h5 car parts disassembling animation editor",
        Download: "Download",
        Help: "Manual do Usuário",
        Source: "Código Fonte",
        Donate: "Doações",
        More: "Mais Imagens",
        Features: "Recursos",
    };

    var __construct = function() {
        if (eval('typeof ' + lang) == 'undefined') {
            lang = "en";
        }
        return;
    }()

    this.Str = function(str, d, defaultStr) {
        var retStr = eval('eval(lang).' + str);
        if (typeof retStr != 'undefined') {
            return retStr;
        } else {
            if (typeof defaultStr != 'undefined') {
                return defaultStr;
            } else {
                return d.getElementById(str).innerHTML; // eval('en.' + str);
            }
        }
    }
}