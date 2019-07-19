/*jslint browser: true*/
/*global $, jQuery, alert*/

"use strict";

var $window = $(window);
function GetLatestReleaseInfo() {
    $.getJSON("https://api.github.com/repos/arvin0/H5PracticeEditor/releases/latest").done(function(release) {
        InitDownloadButton(release, ".stg-download", 0);

        // if (release.assets[1] != undefined) {
        //     $(".stg-download-portable").show();

        //     InitDownloadButton(release, ".stg-download-portable", 1);
        // } else {
        //     $(".stg-download-portable").hide();
        // }
    });
}

function InitDownloadButton(release, className, index) {
    var asset = release.assets[index];
    var downloadCount = 0;
    for (var i = 0; i < release.assets.length; i++) {
        downloadCount += release.assets[i].download_count;
    }
    var oneHour = 60 * 60 * 1000;
    var oneDay = 24 * oneHour;
    var dateDiff = new Date() - new Date(asset.updated_at);
    var timeAgo;
    if (dateDiff < oneDay) {
        timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
    } else {
        timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
    }
    var releaseInfo = "Version: " + release.tag_name + "\nReleased: " + timeAgo + "\nDownload count: " + downloadCount.toLocaleString();
    $(className).attr("href", asset.browser_download_url);
    $(className).attr("title", "<a href='downloads/'><div>" + releaseInfo + "</div></a>");

    InitTooltip($(className));
}

function InitTooltip(obj, fadeDelay = 300) {
    obj.tooltip({
        trigger: "manual",
        html: true,
        animation: false
    }).on("mouseenter", function() {
        obj.tooltip("show");
    }).on("mouseleave", function() {
        setTimeout(function() {
            if (!obj.is(":hover") && !$(".tooltip").is(":hover")) {
                obj.tooltip("hide");
            }
        }, fadeDelay);
    });

    obj.parent().on("mouseleave", ".tooltip", function() {
        setTimeout(function() {
            if (!obj.is(":hover") && !$(".tooltip").is(":hover")) {
                obj.tooltip("hide");
            }
        }, fadeDelay);
    });

    if (obj.is(":hover")) {

        obj.tooltip("show");
    }
}

$(document).ready(function() {
    $(".stg-screenshots2").fancybox({
        padding: 5,
        margin: 0,
        autoSize: false,
        width: "90%",
        height: "90%",
        helpers: {
            overlay: {
                locked: false,
                css: {
                    "background": "rgba(0, 0, 0, 0.5)"
                }
            }
        },
        openEffect: "fade",
        closeEffect: "fade",
        iframe: {
            preload: false
        }
    });

    $(".stg-video").fancybox({
        padding: 5,
        margin: 0,
        autoSize: false,
        width: "1280px",
        height: "720px",
        helpers: {
            overlay: {
                locked: false,
                css: {
                    "background": "rgba(0, 0, 0, 0.5)"
                }
            }
        },
        openEffect: "fade",
        closeEffect: "fade",
        iframe: {
            preload: false
        }
    });

    GetLatestReleaseInfo();
});