// 


// // Funktion der sætter fødder på store I'er og små l'er:: 
// function replace_letters(div_container) {


//     return replaced_string;
// }




function one_line_footer() {
        //$('.container, .container-fluid').append('<div class="col-xs-12"><h6 class="footerCopywrite"> <a href="../../../kemiC_visningsite/builds/development/om_projektet.html">Digitale læringsmaterialer  Copyright 2015</a></h6></div>')
    var thisyear = new Date().getFullYear(); // $(".container, .container-fluid").append("<div class='col-xs-12'><h6 class='footerCopywrite'> <a href='../pf_kem2015/om_projektet.html'>Digitale læringsmaterialer  Copyright 2015</a></h6></div>");
    $(".container, .container-fluid").append("<div class='col-xs-12'><h6 class='footerCopywrite'> <a href='https://www.vucdigital.dk'>© " + thisyear + " vucdigital</a></h6></div>");


    //Tjek om scriptet kører på vucdigital, hvis ja: kør google analytics: 
    if (window.location.href.indexOf("vucdigital.dk") > -1) {

        console.log('googleAnalyticsTest - 1');

        // Hvis cookie'en "vucUdvikling" ikke eksistere, så er det ikke et medlem af udviklingsteamet der besøger siden: aktiver da google analytics:
        if (!cookieClass.existCookie('vucUdvikling')) {

            console.log('googleAnalyticsTest - 2');

            //$(".container, .container-fluid").append("<div class='col-xs-12 vuc_footer'><h2>Digitale læringsmaterialer på voksenuddannelser</h2><h6 class='footerText'>Udviklet af et produktionsfællesskab mellem otte VUC’er til anvendelse på de deltagende skoler: <br/> Hf og VUC Nordsjælland, VUC Hvidovre-Amager, VUC Roskilde, VUC Vestegnen, VUF, VUC Storstrøm, VUC Aarhus og Københavns VUC (KVUC).</h6> <h6 class='footerCopywrite'> Copyright 2015 </h6></div >");
            (function(i, s, o, g, r, a, m) {
                i['GoogleAnalyticsObject'] = r;
                i[r] = i[r] || function() {
                    (i[r].q = i[r].q || []).push(arguments)
                }, i[r].l = 1 * new Date();
                a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0];
                a.async = 1;
                a.src = g;
                m.parentNode.insertBefore(a, m)
            })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

            ga('create', 'UA-62686407-1', 'auto');
            ga('send', 'pageview');
            console.log("GA COMPLETE");
        } else {
            $("body").prepend("<div class='label label-success' style='position:absolute;right:0; opacity:0.2' >dev mode</div>");
            console.log('googleAnalyticsTest - 3');
        }
    } else {
        console.log('googleAnalyticsTest - 4');
        $("body").prepend("<div class='label label-success' style='position:absolute;right:0; opacity:0.2' >dev mode</div>");
    }
}



/// INDLEJRINGS    FUNKTIONALITET  ///////

function embedlink(obj) {

    // alert($(".tab").length);

    var UrlVarStr = String(window.location);
    // var UrlVarStr = "https://www.vucdigital.dk/engelsk/";  // String(window.location)
    if (UrlVarStr.indexOf("https") !== -1)
        UrlVarStr = UrlVarStr.split("/", 3).join("/");
    else
        UrlVarStr = UrlVarStr.split("/", 3).join("/").replace("http", "https");

    console.log("embedlink - UrlVarStr: " + UrlVarStr);

    var HrefObj = obj.parent().parent().find("a").eq(0).attr("href").replace("../", "/");
    console.log("embedlink - HrefObj: " + HrefObj);

    var embedFronter = '<iframe height="570" width="100%" frameborder="0" src="' + UrlVarStr + HrefObj + '"></iframe>';
    // <<<<<<< HEAD
    var embedMoodle = embedFronter; //'<embed height="670" width="100%" src="' + UrlVarStr + HrefObj + '"></embed>';
    // =======
    // var embedMoodle = '<embed height="670" width="970" src="' + UrlVarStr + HrefObj + '"></embed>';
    // >>>>>>> 74fec925709b0def67b697ad47831c62fd4ebf36

    // var embedFronter = '<iframe height="570" width="820" src="http://eundervisning-wp.dk/pf_kem2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></iframe>';
    // var embedMoodle = '<embed height="670" width="970" src="http://eundervisning-wp.dk/pf_kem2015/' + obj.parent().parent().find("a").eq(0).attr("href") + '"></embed>';



    var embedArray = [embedFronter, embedMoodle];

    //var embedwrapping = "<div class='embedToggle'><p>Indsæt dette link i dit LMS eller på din webside</p><input class='embedtext' type='text' value='" + embedArray[0] + "'></input><div class='tabcontainer'><div class='tab_1 tab activetab'>Moodle</div><div class='tab_2 tab'>Fronter</div></div><div class='togglecontainer'><a class='MetaDataLink' href='https://www.youtube.com/watch?v=0cKkCRRTC_c'>Hjælp til indlejring i Moodle </a></div></div>";
    var embedwrapping = "<div class='embedToggle'><p>Indsæt dette link i dit LMS eller på din webside</p><input class='embedtext' type='text' value='" + embedArray[0] + "'></input><a class='MetaDataLink' target='_blank' href='https://www.youtube.com/watch?v=0cKkCRRTC_c'>Hjælp til indlejring i Moodle </a><a class='MetaDataLink' target='_blank' href='https://www.youtube.com/embed/kUsW0vEXeF4'>Hjælp til indlejring i Fronter </a></div></div>";

    var embedWidth;
    var embedHeight;


    // Klik på embedding knapper funktionalitet:

    //Hvis den man klikker på allerede har en parent...: 
    if (obj.parent().parent().find(".embedToggle").length > 0) {
        $(".embedToggle").slideUp(150, function() {

            $(".embedToggle").remove();
            // Animation complete.
        });

    } else {
        if ($(".embedToggle").length > 0) {
            // console.log("indeks: " + obj.parent().parent().index());
            $(".embedToggle").slideUp(150, function() {

                $(".embedToggle").remove();
                // Animation complete.
                obj.parent().parent().append(embedwrapping);
                $(".embedToggle").slideUp(0);
                $(".embedToggle").slideDown("slow");
                $(".tab").click(function() {

                    var indeks = $(this).index();
                    $(".tab").removeClass("activetab");
                    $(this).addClass("activetab");
                    //alert (indeks);
                    changeLink(indeks);
                });

            });
            //

        } else {
            //console.log("indeks: " + obj.parent().parent().index());
            obj.parent().parent().append(embedwrapping);
            $(".embedToggle").slideUp(0);
            $(".embedToggle").slideDown("slow");
            $(".tab").click(function() {

                var indeks = $(this).index();
                $(".tab").removeClass("activetab");
                $(this).addClass("activetab");
                //alert (indeks);
                changeLink(indeks);
            });
        }
        //alert(obj.parent().html());
    }


    //<p><iframe width="100%" height="800" frameborder="0" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html"></iframe></p>
    //<p><embed height="800px" src="http://eundervisning-wp.dk/pf_eng2015/vid_set_da.html" width="100%"></embed></p>


    function changeLink(indeks) {

        console.log("clickede på noget")

        $(".embedtext").val(embedArray[indeks]);

    }

    $(".embedtext").click(function() {
        $(this).select();
    });
}



// This function surrounds all letters (or clusters of letters) in LetterArray with span-tags with a class specified in LetterClassArray.
// NOTE: The delimiter should be a character (eg. "#"), or a combination of characters (eg. "-X-"), that does not exist in the target text.
// IMPORTANT: HTML-tags must not be present in the target-text. This could result in invalid/broken markup.
// EXAMPLE CALL:
//          MarkCertainCharactersAsSpecial([".AtomName", ".AtomSymbol"], ["H","L", "S"], ["FontGreen", "FontRed", "FontBlue"], "#");
// - which will make all L's red and all H's green in the text-strings associated with the target CSS classes ".AtomName" and ".AtomSymbol".
/*function MarkCertainCharactersAsSpecial(TargetSelectorArray, LetterArray, LetterClassArray, Delimiter) {
    for (var TargetSelector in TargetSelectorArray) {
        $(TargetSelectorArray[TargetSelector]).each(function(index, element) {
            for (var l in LetterArray) { // First surround all letters (or clusters of letters) in LetterArray with delimiters, eg. If letter = L and delimiter = #, then #L#.
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1) {
                    $(element).html(ElementText.replace(LetterArray[l], Delimiter + LetterArray[l] + Delimiter));
                }
            }

            for (var l in LetterArray) { // second, replace all delimited letters, eg. #L#, with <span class="MyClass">L</span>
                var LetterClass = (LetterClassArray.length == LetterArray.length) ? LetterClassArray[l] : LetterClassArray[0];
                var ElementText = $(element).text();
                if (ElementText.indexOf(LetterArray[l]) !== -1) {
                    $(element).html(ElementText.replace(Delimiter + LetterArray[l] + Delimiter, '<span class="' + LetterClass + '">' + LetterArray[l] + '</span>'));
                }
            }
        });
    }
}

*/

// Example of use:
//      UserMsgBox(".FeedbackWrap", "Hurra - korrekt svar!");
// where the class FeedbackWrap is the target selector in which the UserMsgBox will appear.
function UserMsgBox(TargetSelector, UserMsg) {
    console.log("bring up the box!");

    var HTML = "<div class = 'MsgBox_bgr'><div id='UserMsgBox'>";
    HTML += '<span class="CloseClass right glyphicon glyphicon-remove"></span><span class="clear"></span>';
    HTML += UserMsg;
    HTML += "</div> </div>";
    $
    $(TargetSelector).prepend(HTML);

    $(".MsgBox_bgr").fadeIn("slow");

    $(".MsgBox_bgr").click(function() {
        $(".MsgBox_bgr").fadeOut(200, function() {
            $(this).remove();
        });
    });
    $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
           $(".MsgBox_bgr").fadeOut(200, function() {
            $(this).remove();
        });
    }
});
}



/// INDLEJLRING SLUT !


$.fn.shuffle_div_position = function() {

    var allElems = this.get(),
        getRandom = function(max) {
            console.log("allElems" + allElems);
            return Math.floor(Math.random() * max);

        },
        shuffled = $.map(allElems, function() {
            var random = getRandom(allElems.length),
                randEl = $(allElems[random]).clone(true)[0];
            allElems.splice(random, 1);
            return randEl;
        });

    this.each(function(i) {
        $(this).replaceWith($(shuffled[i]));
    });
    console.log("shuffled");
    return $(shuffled);
};



function shuffle_Array(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}



// Hvis objektet ligger i en frame, så lave et link i toppen af dokumentet //

$(document).ready(function() {

    AddFavicon();
    isiniFrame();
    //getURLiFramed();


});

function getURLiFramed() {
    var url = (window.location != window.parent.location) ? document.referrer : document.location;

    return url;

}


function isiniFrame() {

    var isInIFrame = (window.location != window.parent.location);
    console.log("Er i rammen? : " + isInIFrame);
    if (isInIFrame) {
        //$("body").append("<div class='new_window_link'> Ser det mærkeligt ud? <a class='btn btn-info btn-xs embedlink' href='" + window.location.href + "' target='_blank'>  Åbn i nyt browservindue</a></div>");
        $("body").append("<div class='new_window_link'> <a class='btn btn-info btn-sm' href='" + window.location.href + "' target='_blank'>Se i fuld skærm <span class='glyphicon glyphicon-fullscreen'></span> </a></div>");

        $(".container-fluid").css("padding-top", "30px");
        return true;
    }
    return false;
}


// Her kan man se hvilke browsere der understøtter favicons:
//      https://en.wikipedia.org/wiki/Favicon
function AddFavicon() {

    $("head").append("<link rel='shortcut icon' href='../library/img/vuc_favicon.ico' type='image/x-icon'><link rel='icon' href='../library/img/vuc_favicon.ico' type='image/x-icon'>");
}


// MARK 16:05


var GeneralOverlayClass = {

    HowWhyData: "",

    ReturnAjaxData: function(Type, Url, Async, DataType) {
        $.ajax({
            type: Type,
            url: Url,
            async: Async,
            dataType: DataType,
            success: function(Data) {
                console.log("ReturnAjaxData: " + JSON.stringify(Data));
                HowWhyData = JSON.parse(JSON.stringify(Data));
                // JsonExternalData = JSON.parse(JSON.stringify(Data));
                // console.log("HowWhyData: " + HowWhyData);
            }
        }).fail(function() {
            alert("GeneralOverlayClass.ReturnAjaxData: Ajax failed to fetch data");
        });
    },


    ApplyOverlay_why: function(Selector, EleraningObj) {

        this.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");

        console.log("ApplyOverlay_why - HowWhyData: " + JSON.stringify(HowWhyData));

        $(Selector).before(HowWhyData.ButtonControler_why);

        var OverlayBtnText = HowWhyData.JsonWhyHow[EleraningObj].why_btntext;
        $("#OverlyContainerWhy .OverlayBtnText").html(OverlayBtnText);

        var thisObj = this;

        $(window).resize(function() {
            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER: 
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");
        });

        $(document).on('click', "#OverlayWhy", function(event) {
            event.preventDefault();

            // alert("WHY");

            if ($(".Overlay").length === 0) // Ensures that only one overlay is added.
                $(Selector).before(HowWhyData.OverlayMarkup);

            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER:
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");

            // $( ".Overlay" ).slideDown( "fast", function() {
            $(".Overlay").fadeIn("fast", function() {
                $(".OverlayTextContainer").fadeIn("fast");
            });

            var OverlayText, OverlayTextHeader;
            var ButtonId = $(this).prop("id");
            console.log("ButtonId: " + ButtonId);

            OverlayText = HowWhyData.JsonWhyHow[EleraningObj].why_content;
            OverlayTextHeader = "WHY";

            console.log("ButtonId: " + ButtonId + ", \nOverlayTextHeader: " + OverlayTextHeader + ", \nOverlayText: " + OverlayText);

            $(".OverlayTextHeader").html(OverlayTextHeader);
            $(".OverlayText").html('<h5>' + OverlayText + '</h5>');
        });

        this.CloseOverlays();

        console.log("FilterCssSelector: " + this.FilterCssSelector(".Overlay"));
    },


    ApplyOverlay_how: function(Selector, EleraningObj) {

        this.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");

        console.log("ApplyOverlay_how - HowWhyData: " + JSON.stringify(HowWhyData));

        $(Selector).before(HowWhyData.ButtonControler_how);

        var OverlayBtnText = HowWhyData.JsonWhyHow[EleraningObj].how_btntext;
        $("#OverlyContainerHow .OverlayBtnText").html(OverlayBtnText);

        var thisObj = this;

        $(window).resize(function() {
            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER: 
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");
        });

        $(document).on('click', "#OverlayHow", function(event) {
            event.preventDefault();

            // alert("HOW");

            if ($(".Overlay").length === 0) // Ensures that only one overlay is added.
                $(Selector).before(HowWhyData.OverlayMarkup);

            // AKTIVER KUN HVIS OVERLAY SKAL RAMME EN SPECIFIK WRAPPER:
            // thisObj.ResizeAndPositionOverlayWindow(Selector, ".Overlay");

            // $( ".Overlay" ).slideDown( "fast", function() {
            $(".Overlay").fadeIn("fast", function() {
                $(".OverlayTextContainer").fadeIn("fast");
            });

            var OverlayText, OverlayTextHeader;
            var ButtonId = $(this).prop("id");
            console.log("ButtonId: " + ButtonId);

            OverlayText = HowWhyData.JsonWhyHow[EleraningObj].how_content;
            OverlayTextHeader = "HOW";

            console.log("ButtonId: " + ButtonId + ", \nOverlayTextHeader: " + OverlayTextHeader + ", \nOverlayText: " + OverlayText);

            $(".OverlayTextHeader").html(OverlayTextHeader);
            $(".OverlayText").html('<h5>' + OverlayText + '</h5>');
        });

        this.CloseOverlays();

        console.log("FilterCssSelector: " + this.FilterCssSelector(".Overlay"));
    },


    CloseOverlays: function() {

        // Naar der klikkes paa overlayet skal overlayet lukke:
        $(document).on('click', ".Overlay", function(event) {
            event.preventDefault();
            $(".OverlayTextContainer").fadeOut("fast", function() {
                // $( ".Overlay" ).slideUp( "fast" );
                $(".Overlay").fadeOut("fast");
            });
        });

        // Naar der klikkes paa overlay-teksten skal overlayet lukke:
        $(document).on('click', ".OverlayTextContainer", function(event) {
            event.preventDefault();
            $(".OverlayTextContainer").fadeOut("fast", function() {
                // $( ".Overlay" ).slimsgdeUp( "fast" );
                $(".Overlay").fadeOut("fast");
            });
        });
    },


    FilterCssSelector: function(Selector) {
        return String(Selector).replace(/#/g, '').replace(/\./g, '');
    },


    // Resize overlayet til at matche billedet:
    ResizeAndPositionOverlayWindow: function(WindowSelector, OverlayWindowSelector) {
        var Pos = $(WindowSelector).offset();
        $(OverlayWindowSelector).css({
            position: "absolute",
            top: Pos.top + "px",
            left: Pos.left + "px"
        });
        console.log("Pos.top: " + Pos.top + ", Pos.left: " + Pos.left);

        $(OverlayWindowSelector).width($(WindowSelector).width());
        $(OverlayWindowSelector).height($(WindowSelector).height());
    }

};

var GeneralOverlayObj = Object.create(GeneralOverlayClass);

// GeneralOverlayObj.ReturnAjaxData("GET", "../library/json/HowWhyData.json", false, "json");


// Brug denne funktion til at initialisere et model html objekt, som du så kan putte indhold i: $("modal-body").html("Dit indhold her..")
function modal() {
    $("body").append("<div class='modal fade' id='myModal' role='dialog'>" +
        "<div class='modal-dialog'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header'>" +
        "<button type='button' class='close' data-dismiss='modal'>&times;</button>" +
        "</div>" +
        "<div class='modal-body'>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "< /div>");
}



// Funktion til at finde en streng i en streng

function allIndexOf(str, toSearch) {
    var counter = 0;
    for (var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        counter++;
    }
    return counter;
}

function showIosOverlay() {
    $(".embed-responsive-16by9").prepend("<img src='../library/img/iPad_videoquiz_overlay.png' class='ipad'>")
}


// This class makes a pager for controlling the CSS display-property of a number of pages (or containers) with a class of your own choosing.
// USAGE:
// ======
//
//      HTML:
//      =====
//              <span id="myPagerContainer"></span>
//
//              <div class="myPageClass"> PAGE 1 </div>
//              <div class="myPageClass"> PAGE 2 </div>
//              <div class="myPageClass"> PAGE 3 </div>
//
//      JS:
//      ===
//              You first need to make an instance of the object like so:
//
//                      var myPagerObj = Object.create(pagerClass);
//
//              then you initialize the pager with two arguments:
//
//                      myPagerObj.init("#myPagerContainer", ".myPageClass");
//
//              The first argument (here the id "#myPagerContainer") can be either an id or class. Use a class if you need two or more
//              pageres to control your pages. The pager will be dynamically created inside "#myPagerContainer".
//
//              The second argument need to be a class - the class has to be added to the containers you wish to control.
var pagerClass = {
    Range: 5, // The default number visible buttons on the pager. 
    ActiveLinkNum: 1, // The default active page number.
    PagerSelector: null,
    TargetSelectorChild: null,
    NumOfPages: null, // Contains the number of pages/containers once counted.
    init: function(PagerSelector, TargetSelectorChild) { // This "constructor" initiates the pager functionality.
        this.PagerSelector = PagerSelector;
        this.TargetSelectorChild = TargetSelectorChild;

        this.pager(); // Call the pager.
        this.pagerEvents(); // Set event-listners.
    },
    pager: function() {

        var Xthis = this;

        if (Xthis.NumOfPages === null) { // Count the number of pages the pager has to handle - and only do it once.
            Xthis.NumOfPages = 0;
            $(Xthis.TargetSelectorChild).each(function(index, element) {
                ++Xthis.NumOfPages;
            });
        }

        var HTML = '<ul class="PagerClass">';
        // HTML += '<li><span class="PagerButtonLeft">&lt;</span></li>'; 
        HTML += '<li><span class="PagerButtonLeft glyphicon glyphicon-chevron-left"></span></li>';

        for (var j = 1; j <= this.NumOfPages; j++) {
            HTML += '<li><a href="#" class="PagerButton btn btn-sm btn-info">' + j + '</a></li>';
        }

        // HTML += '<li> <span class="PagerButtonRight">&gt;</span> </li>';
        HTML += '<li> <span class="PagerButtonRight glyphicon glyphicon-chevron-right"></span> </li>';
        HTML += '</ul>';

        // Generate the pager:
        $(Xthis.PagerSelector).html(HTML);

        Xthis.showHide();

        console.log("ActiveLinkNum 1: " + this.ActiveLinkNum + ", NumOfPages: " + this.NumOfPages);
    },
    pagerEvents: function() { // Set event-listeners.

        var Xthis = this;

        $(Xthis.PagerSelector + " .PagerButtonLeft").click(function(e) {
            if (1 < Xthis.ActiveLinkNum) { // Only perform pager functionality if the "active" page is larger than one.
                Xthis.ActiveLinkNum -= 1;
                console.log("PagerButtonLeft - ActiveLinkNum 1: " + Xthis.ActiveLinkNum);

                $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
                $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

                Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.
            }
        });

        $(Xthis.PagerSelector + " .PagerButtonRight").click(function(e) {
            if (Xthis.ActiveLinkNum < Xthis.NumOfPages) { // Only perform pager functionality if the "active" page is smaller than the number of pages.
                Xthis.ActiveLinkNum += 1;
                console.log("PagerButtonRight - ActiveLinkNum 2: " + Xthis.ActiveLinkNum);

                $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
                $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

                Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.
            }

        });

        $(Xthis.PagerSelector + " .PagerButton").click(function(e) { // If a ".PagerButton" is pressed, then...
            e.preventDefault(); // Prevent the link-nature of the anchor-tag.

            Xthis.ActiveLinkNum = parseInt($(this).text()); // Get the number of the pressed ".PagerButton".
            console.log("PagerButton - ActiveLinkNum 3: " + Xthis.ActiveLinkNum);

            Xthis.showHide(); // Show the active page and hide other pages. Show the "range" of pagerButtons and hide other pagerButtons.

            $(Xthis.PagerSelector + " .PagerButton").removeClass("btn-info btn-primary");
            $(Xthis.PagerSelector + " .PagerButton").addClass("btn-info");

            var parentIndexNum; // The following code findes the parentIndexNum by adding the class "PagerMarker" and removing it again (the ".index()" method does not work here):
            $(this).closest(Xthis.PagerSelector).addClass("PagerMarker");
            $(Xthis.PagerSelector).each(function(index, element) {
                if ($(element).hasClass("PagerMarker")) {
                    parentIndexNum = index;
                    $(element).removeClass("PagerMarker");
                }
            });
            console.log("ON CLICK .PagerButton - parentIndexNum: " + parentIndexNum);

            var i = parseInt(Xthis.ActiveLinkNum) - 1;
            i = (i >= Xthis.NumOfPages) ? (parentIndexNum + 1) * parseInt(Xthis.NumOfPages) - i - 1 : i;
            $(Xthis.PagerSelector).each(function(index, element) {
                $(".PagerButton:eq(" + i + ")", element).toggleClass("btn-info btn-primary");
            });
        });
    },
    showHide: function() {

        var Xthis = this;

        // NOTE: the StartIndex is a startingpoint for a range of number that ensures an "interval" of shown ".PagerButton"'s at the boundaries for the range [1, 2, 3, ... , NumOfPages]
        var StartIndex = Xthis.ActiveLinkNum - Math.round((Xthis.Range - 1) / 2); // Find the startindex based on ActiveLinkNum.
        if (StartIndex < 1) StartIndex = 1; // Ajust startindex for low ActiveLinkNum
        if (Xthis.Range + StartIndex > Xthis.NumOfPages) StartIndex = Xthis.NumOfPages - Xthis.Range + 1; // Ajust startindex for high ActiveLinkNum

        $(Xthis.PagerSelector + " .PagerButton").hide(); // Hide all ".PagerButton"'s.
        $(Xthis.TargetSelectorChild).hide(); // Hide all pages.

        $(Xthis.PagerSelector).each(function(index1, element1) { // For each ".PagerButton" do...
            $(" .PagerButton", element1).each(function(index2, element2) { // For each ".PagerButton" do...
                if ((StartIndex <= index2 + 1) && (index2 + 1 < Xthis.Range + StartIndex)) { // If ".PagerButton" (and therfore also the "page") is in the range [StartIndex, StartIndex + Range], then...
                    $(element2).show(); // Show the ".PagerButton"'s in the range [StartIndex, StartIndex + Range].
                    if (parseInt($(element2).text()) == Xthis.ActiveLinkNum) {
                        $(element2).toggleClass("btn-info btn-primary"); // Set the pressed ".PagerButton" as btn-primary.
                        $(Xthis.TargetSelectorChild + ':eq(' + String(parseInt(Xthis.ActiveLinkNum) - 1) + ')').show(); // Show the page.
                    }
                }
            });
        });
    }
}



/*******************************************************
 *      objectStorageClass documentation
 *******************************************************
 *
 * BASIC USAGE:
 * ============
 *
 *  1.  Initialize a local storage object "lsObj" by using the two commands:
 *
 *          var lsObj = Object.create(objectStorageClass);
 *          lsObj.init("my_local_storage_object_name");
 *
 *      - where "my_local_storage_object_name" is a name of the object of your own choosing.
 *      You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *      initialize a local storage object (eg. "lsObj") once in your program.
 *
 *  2.  Next, load the name of a PREVIOUSLY stored/saved variable - e.g. "myVarName1":
 *
 *          var myVarName1 = lsObj.load("myVarName1");
 *
 *  3.  If myVarName1 == null, then the student has not made the e-learning exercise before: load your e-learning exercise start-scenario. 
 *      If myVarName1 != null, then the student has made the e-learning exercise before: myVarName1 has whatever value you have stored 
 *      in it from the last/previous "session" - load therefor the appropriate e-learning exercise scenario.
 *
 *  4.  To save a variable like "myVarName1" (do that at a appropriate point in your e-learning exercise), you do:
 *  
 *          lsObj.save("myVarName1", myVarName1);
 *
 *      "myVarName1" is now stored in "my_local_storage_object_name", and can be retrieved by the "load" shown step 2 above. You can save 
 *      as many variables inside "my_local_storage_object_name" as you nedd – you just do: 
 *
 *          lsObj.save("myVarName1", myVarName1);
 *          lsObj.save("myVarName2", myVarName2);
 *              ...
 *          lsObj.save("myVarNameN", myVarNameN);
 *
 *  5.  If you need to remove/delete the session, you do:
 *
 *          lsObj.delete():
 *
 *      - which will remove/delete the local storage object "my_local_storage_object_name".
 *
 * AUTOSAVE:
 * =========
 *
 *  1.  Initialize a local storage object "lsObj" by using the two commands:
 *
 *          var lsObj = Object.create(objectStorageClass);
 *          lsObj.init("my_local_storage_object_name");
 *
 *      - where "my_local_storage_object_name" is a name of the object of your own choosing.
 *      You always need to initialize a local storage object before you can use any commands like "load", "save", "delete" etc. You only need to
 *      initialize a local storage object (eg. "lsObj") once in your program.
 *
 *  2.  To start autosaving a variable "myVarName1", you do:
 *          
 *          lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec);
 *      
 *      - where "timeInMilliSec" is the time (in milliseconds) between each saving action of "myVarName1". You can have autosave on as many 
 *      variables as you need - you just do: 
 *
 *          lsObj.startAutoSave("myVarName1", myVarName1, timeInMilliSec1);
 *          lsObj.startAutoSave("myVarName2", myVarName2, timeInMilliSec2);
 *              ...
 *          lsObj.startAutoSave("myVarNameN", myVarNameN, timeInMilliSecN);
 *
 *  3.  If you for some reason need to limit the duration/number of times the startAutoSave-function performs its saving-action on a given 
 *      variable, you do:
 *
 *          lsObj.setAutoSaveMaxCount("myVarName1", maxSaveCount);
 *
 *      - where maxSaveCount is the maximum number of times the startAutoSave-function performs its saving-action.
 *
 *  4.  To stop the startAutoSave-function, you do:
 *
 *          lsObj.stopAutoSave("myVarName1");
 */

var objectStorageClass = {
    // defaultMsg : 'Du har lavet denne øvelse før.',
    localStorageObjName: null, // The name of the storage object.
    localStorageObjData: { timeStamp: null }, // The default storage object.
    init: function(localStorageObjName) {
        if (typeof(Storage) !== "undefined") {
            console.log("objectStorageClass.init - LocalStorage supported!");
            this.localStorageObjName = localStorageObjName;
            this.localStorageObjData.timeStamp = this.setTimeStamp();
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.init - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
        } else {
            console.log("objectStorageClass.init - LocalStorage NOT supported!");
        }
    },
    save: function(varName, varData) {
        if (typeof(Storage) !== "undefined") {
            console.log("objectStorageClass.save - LocalStorage supported!");

            this.localStorageObjData.timeStamp = this.setTimeStamp();
            console.log('objectStorageClass.save - timeStamp: ' + this.localStorageObjData.timeStamp);

            if (!this.localStorageObjData.hasOwnProperty(varName)) {
                console.log("objectStorageClass.save - 0");
                this.localStorageObjData[varName] = '';
            }

            console.log('objectStorageClass.save - varData: ' + JSON.stringify(varData));

            console.log("objectStorageClass.save - this.localStorageObjData 1 : " + JSON.stringify(this.localStorageObjData));
            this.localStorageObjData[varName] = varData;
            console.log("objectStorageClass.save - this.localStorageObjData 2 : " + JSON.stringify(this.localStorageObjData));
            console.log("objectStorageClass.save - typeof(this.localStorageObjData): " + typeof(this.localStorageObjData));


            try {
                localStorage.setItem(this.localStorageObjName, JSON.stringify(this.localStorageObjData));
            } catch (error) {
                console.log("objectStorageClass.save - LocalStorage error: " + error.message);
            }

        } else {
            console.log("objectStorageClass.save - LocalStorage NOT supported!");
        }
    },
    load: function(varName) {
        if (typeof(Storage) !== "undefined") {
            console.log("objectStorageClass.load - 0");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            console.log("objectStorageClass.load - localStorageObjName: " + this.localStorageObjName + ", localStorageObjData: " + JSON.stringify(localStorageObjData));
            if (localStorageObjData !== null) { // If the variable exists, then return it:
                console.log("objectStorageClass.load - A1");
                console.log("objectStorageClass.load - typeof(localStorageObjData):" + typeof(localStorageObjData) +
                    ", localStorageObjData.length: " + localStorageObjData.length +
                    ", localStorageObjData: " + JSON.stringify(localStorageObjData) +
                    ", localStorageObjData: " + localStorageObjData);

                // this.localStorageObjData = localStorageObjData;  // only needs overwriting when saving.
                if (localStorageObjData.hasOwnProperty(varName)) {
                    console.log("objectStorageClass.load - A2");
                    return localStorageObjData[varName];
                } else {
                    console.log("objectStorageClass.load - A3");
                    return null;
                }
            } else {
                console.log("objectStorageClass.load - A4");
                return null;
            }
        } else {
            console.log("objectStorageClass.load - LocalStorage NOT supported!");
            return null;
        }
    },
    delete: function(localStorageVarName) {
        if (typeof(Storage) !== "undefined") {
            console.log("objectStorageClass.delete - LocalStorage supported!");
            localStorage.removeItem(localStorageVarName);
        } else {
            console.log("objectStorageClass.delete - LocalStorage NOT supported!");
        }
    },
    exist: function(varName) {
        if (typeof(Storage) !== "undefined") {
            console.log("objectStorageClass.exist - LocalStorage supported!");
            var localStorageObjData = JSON.parse(localStorage.getItem(this.localStorageObjName));
            if (localStorageObjData !== null) {
                console.log("objectStorageClass.exist - this.localStorageObjName exist!!!");
                console.log('objectStorageClass.exist - typeof(localStorageObjData): ' + typeof(localStorageObjData) + ', localStorageObjData: ' + JSON.stringify(localStorageObjData));
                if (localStorageObjData.hasOwnProperty(varName)) {
                    console.log("objectStorageClass.exist." + varName + " - TRUE ");
                } else {
                    console.log("objectStorageClass.exist." + varName + " - FALSE ");
                }
            } else {
                console.log("objectStorageClass.exist - this.localStorageObjName does NOT exist!!!");
            }
        } else {
            console.log("objectStorageClass.exist - LocalStorage NOT supported!");
        }
    },
    setTimeStamp: function() {
        return new Date().getTime();
    },
    getTimeStamp: function() {
        return this.localStorageObjData.timeStamp;
    },
    startAutoSave: function(varName, varData, timeInMilliSec) { // Starts "auto save" of a variable "varName".
        console.log("objectStorageClass.startAutoSave - localStorageObjData 1: " + JSON.stringify(this.localStorageObjData));
        if (!this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
            console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj - OK!!");
            this.localStorageObjData.autoSaveTimeIdObj = {};
        }
        if (!this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
            console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj." + varName + " - OK!");
            this.localStorageObjData.autoSaveTimeIdObj[varName] = { id: 0, saveCount: 0, maxSaveCount: null }; // "maxSaveCount = null" makes it save indefinitely.
        }
        console.log("objectStorageClass.startAutoSave - jsonData 2: " + JSON.stringify(this.localStorageObjData));
        console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj." + varName + " - START");
        var xthis = this;
        var LSA = this.localStorageObjData.autoSaveTimeIdObj[varName];
        LSA.id = setInterval(function() {
            xthis.save(varName, varData);
            ++LSA.saveCount;
            console.log("objectStorageClass.startAutoSave - autoSaveTimeIdObj." + varName + " - SAVE " + LSA.saveCount);
            if ((LSA.maxSaveCount !== null) && (LSA.saveCount >= LSA.maxSaveCount)) {
                xthis.stopAutoSave(varName);
            }
        }, timeInMilliSec);
    },
    stopAutoSave: function(varName) { // Stops "auto save" of a variable "varName".
        if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
            if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
                console.log("objectStorageClass.stopAutoSave - autoSaveTimeIdObj." + varName + " - STOP");
                clearInterval(this.localStorageObjData.autoSaveTimeIdObj[varName].id);
            }
        }
    },
    setAutoSaveMaxCount: function(varName, maxSaveCount) { // Sets the maximum number of times the function startAutoSave saves the variable varName. Set maxSaveCount to null for making it save indefinitely.
        if (this.localStorageObjData.hasOwnProperty('autoSaveTimeIdObj')) {
            if (this.localStorageObjData.autoSaveTimeIdObj.hasOwnProperty(varName)) {
                console.log("objectStorageClass.setAutoSaveMaxCount - autoSaveTimeIdObj." + varName + ".maxSaveCount - SET");
                this.localStorageObjData.autoSaveTimeIdObj[varName].maxSaveCount = maxSaveCount;
            }
        }
    }
}


/*******************************************************
 *      cookieClass documentation
 *******************************************************
 *
 * BASIC USAGE:
 * ============
 *
 *  1.  Initialize a local cookie object "cObj" by using the command:
 *
 *          var cObj = Object.create(cookieClass);
 *
 *      The object "cObj" only needs to be created once. Alternatively, you can substitute "cObj" with "cookieClass" 
 *      in the following calls (eg: cookieClass.setCookie('myCookie', myCookieData, 30); ), since "cookieClass" does 
 *      not contain internal variables.
 *
 *  2.  To set the cookie "myCookie" with the variable myCookieData with a expiration data of 30 days, you do:
 *
 *          cObj.setCookie('myCookie', myCookieData, 30);
 *
 *  3.  To get the content of the cookie "myCookie", you do:
 *  
 *          var myCookieData = cObj.getCookie('myCookie');
 *
 *      - "myCookieData" will contain the data of the cookie "myCookie" if the cookie exist, or it will contain the 
 *      value "null" if the cookie does not exist.
 *
 *  4.  To delete the cookie "myCookie", you do:
 *  
 *          cObj.deleteCookie('myCookie');
 *
 *  4.  To check is the cookie "myCookie" exist, you do:
 *  
 *          var bool = cObj.existCookie('myCookie');
 *
 *      - bool will have the value "true" if the cookie exist or "false" if it does not exist. 
 *
 */
var cookieClass = {
    setCookie: function(cookieName, cookieValue, numOfDays) {
        var d = new Date();
        d.setTime(d.getTime() + (numOfDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        // document.cookie = cookieName + "=" + cookieValue + "; " + expires;                                     // WARNING: Does not work on on firefox and Chrome!!! Cookiestatus works on server AND localhost in firefox
        document.cookie = cookieName + "=" + cookieValue + "; " + expires + "; path=/"; // Cookiestatus does NOT work on server OR localhost in firefox. OK in ckrome on server AND localhost
        // document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";domain=.vucdigital.dk;path=/";    // Cookiestatus does NOT work on server OR localhost in firefox. OK in ckrome on server AND localhost
    },
    getCookie: function(cookieName) {
        var name = cookieName + "=";
        var cookieArray = document.cookie.split(';');
        for (var n in cookieArray) {
            console.log('getCookie - cookieArray[' + n + ']: ' + cookieArray[n]);
            var cArr = cookieArray[n].split('=');
            if (cArr[0].trim() == cookieName) {
                return cArr[1].trim();
            }
        }
        return null;
    },
    deleteCookie: function(cookieName) {
        document.cookie = cookieName + "=;expires=Wed; 01 Jan 1970";
    },
    existCookie: function(cookieName) {
        console.log("existCookie - getCookie(cookieName): _" + this.getCookie(cookieName) + "_ String(getCookie(cookieName)): _" + String(this.getCookie(cookieName)) + "_");
        console.log("existCookie - typeof(String(null)): " + typeof(String(null)));
        var bool = ((this.getCookie(cookieName) !== null) && (String(this.getCookie(cookieName)) != 'null') && (String(this.getCookie(cookieName)) != '')) ? true : false;
        console.log("existCookie - bool: " + bool);
        return bool;

    }
}


function instruction(instructionText) {
    var HTML = '<div class="col-xs-12 col-md-8">';
    HTML += '<h4 class="instruktion">';
    HTML += '<div class="left glyphicon glyphicon-arrow-right"></div>';
    HTML += '<div class="left instructionText">' + instructionText + '</div>';
    HTML += '</h4>';
    HTML += '<div class="Clear"></div>';
    HTML += '</div>';
    HTML += '<div class="Clear"></div>';
    return HTML;
}


function instruction_8col(instructionText) {
    var HTML = '<div class="col-xs-12 col-md-8">';
    HTML += '<h4 class="instruktion">';
    HTML += '<div class="left glyphicon glyphicon-arrow-right"></div>';
    HTML += '<div class="left instructionText">' + instructionText + '</div>';
    HTML += '</h4>';
    HTML += '<div class="Clear"></div>';
    HTML += '</div>';
    HTML += '<div class="Clear"></div>';
    return HTML;
}


function explanation(explanationText) {
    var HTML = '<div class="explanation col-xs-12 col-md-8">';
    HTML += '<div class="left glyphicon glyphicon-bookmark"></div>';
    HTML += '<div class="left explanationText">' + explanationText + '</div>';
    HTML += '<div class="Clear"></div>';
    HTML += '</div>';
    return HTML;
}

function enable_audio() {

    $("body").append("<audio id='audio_correct' ><source src='../library/sound_effects/correct_new.mp3' type='audio/mpeg'></audio>");
    $("body").append("<audio id='audio_error' ><source src='../library/sound_effects/error_new.mp3' type='audio/mpeg'></audio>");
    //$(".container-fluid").prepend("<div class='btn_sound btn_mute btn btn-default'><span class='glyphicons glyphicons-volume-up'></span></div>");
    //$(".container-fluid").prepend("<div>OST</h1>");//Add html for error and correct
    //Add sound_off icon 

    console.log("audio enabled");

    //document.getElementById('audio_correct').play();
    $(".btn_mute").click(function() {
        if (document.getElementById('audio_correct').muted == false) {
            document.getElementById('audio_correct').muted = true;
            document.getElementById('audio_error').muted = true;
            $(".btn_mute").html("<span class='glyphicons glyphicons-mute'></span>");
            console.log("off");
        } else {
            console.log("on");
            document.getElementById('audio_correct').muted = false;
            document.getElementById('audio_error').muted = false;
            $(".btn_mute").html("<span class='glyphicons glyphicons-volume-up'></span>");
        }

    });
    //$(".audio_correct").play();

}

function error_sound() {
    //document.getElementById('audio_error').load();
    //console.log("error sound paused");
    var correct_sound = document.getElementById('audio_correct');
    var error_sound = document.getElementById('audio_error');
    correct_sound.pause();
    correct_sound.currentTime = 0;
    error_sound.pause();
    error_sound.currentTime = 0;
    //console.log("error sound played");
    error_sound.play();

}

function correct_sound() {
    var correct_sound = document.getElementById('audio_correct');
    var error_sound = document.getElementById('audio_error');
    correct_sound.pause();
    correct_sound.currentTime = 0;
    error_sound.pause();
    error_sound.currentTime = 0;
    //console.log("correct_sound sound paused");
    //play correct_sound();
    //document.getElementById('audio_correct').load();
    correct_sound.play();
    //console.log("correct_sound sound played");
}


////////////////////
////////////////////////////////////////////////////////
// detect browser size --> opfordr brugeren til at vende sin skærm: 

function rotateCheck() {
    var size = findBootstrapEnvironment();
    var mobile_browser = detectmob();
    //alert(size);
    if (size == "ExtraSmall") { //} && mobile_browser) {
        UserMsgBox("body", "<H3> Roter din skærm</h3><img class='img-responsive' src='../library/img/rotate_screen.png'>");


        $(window).resize(function() {
            $(".MsgBox_bgr").remove();
            location.reload();
        });

    }

}

function findBootstrapEnvironment() {
    var envs = ["ExtraSmall", "Small", "Medium", "Large"];
    var envValues = ["xs", "sm", "md", "lg"];

    var $el = $('<div>');
    $el.appendTo($('body'));

    for (var i = envValues.length - 1; i >= 0; i--) {
        var envVal = envValues[i];

        $el.addClass('hidden-' + envVal);
        if ($el.is(':hidden')) {
            $el.remove();
            return envs[i]
        }
    };
}

function detectmob() {
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
    } else {
        return false;
    }
}
// How to use this function:
// =========================
// Call the function from your html-file with the following parameters:
//
//      getAjaxData("GET", "path_to_my_json_file", false, "json");
//
// - where "path_to_my_json_file" is the path to the JSON-file that needs to be loaded, eg. "json/myJsonFile.json".
// Just leave the call to the other perameters of the function ("Type", "Async", "DataType") as they are in the above
// example.
// 
// IMPORTANT: 
// ==========
// The function call declares the global variable "jsonData" which will contain the JSON data contained in the file "path_to_my_json_file".
// You should be able to just use the variable "jsonData" in your program.
function getAjaxData(Type, Url, Async, DataType) {
    $.ajax({
        type: Type,
        url: Url,
        async: Async,
        dataType: DataType,
        success: function(Data) {
            //console.log("ReturnAjaxData: " + JSON.stringify(Data));
            window.jsonData = JSON.parse(JSON.stringify(Data)); // NOTE: The call "window.jsonData" declares the variable "jsonData" as a global variable.
        }
    }).fail(function() {
        alert("Ajax failed to fetch data - the requested quizdata might not exist...");
    });
}


//==============================================================================
//          Datatypes for text, images and video
//==============================================================================
// {
//     "type": "img",
//     "src": "img/06_Elna_Statistisk_aarbog_1920_side_27_js.jpg",
//     "alt": "Lokalt billede..."
// }, {
//     "type": "text",
//     "text": "Mødeindkaldelse ledsaget af artikel skrevet af Louis Pio..."
// }, {
//     "type": "video",
//     "src": "https://player.vimeo.com/video/129639593"
// }
// {   
//     "type" : "columnData",
//     "columnData": [
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
// {   
//     "type" : "columnData",
//     "columnData": [          <-----------------  It takes 1 to N columns: columns 1 to 3 gets their own columns, 4 columns and up stacks in one column.
//         {"column":"<b>CASE 1</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"},
//         {"column":"<b>CASE 2</b><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>"}
//     ]
// }
carouselClass = {
    randomSlides: false,
    bsColum: "col-10-center", // OPTIONS: "col-XX-center", "col-XX". NOTE: XX has to an even number if "center" has to work properly.
    init: function(jsonCarouselData) {
        if (this.randomSlides) {
            jsonCarouselData.carouselData.slides = this.shuffelArray(jsonCarouselData.carouselData.slides);
        }
        this.setEventListeners(jsonCarouselData);
        return this.returnCarouselHtml(jsonCarouselData);;
    },
    returnCarouselHtml: function(jsonCarouselData) {

        var HTML = '';

        var center = (this.bsColum.indexOf('center') !== -1) ? true : false;
        var colMain = parseInt(this.bsColum.split('-')[1]);
        var colSide = Math.round((12 - colMain) / 2);
        console.log("returnCarouselHtml - , center: " + center + ", colMain: " + colMain + ",colSide: " + colSide);

        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        HTML += '<div id="questionCarousel" class="carousel slide col-xs-12 col-md-' + colMain + '" data-ride="carousel" data-interval="false">' +
            '<ol class="carousel-indicators hidden-xs">' +
            this.returnCarouselIndicators(jsonCarouselData) +
            '</ol>' +
            '<div class="carousel-inner" role="listbox">' +
            this.returnCarouselSlide(jsonCarouselData) +
            '</div>' +
            '<a class="left carousel-control" href="#questionCarousel" role="button" data-slide="prev">' +
            '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>' +
            '<span class="sr-only">Previous</span>' +
            '</a>' +
            '<a class="right carousel-control" href="#questionCarousel" role="button" data-slide="next">' +
            '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>' +
            '<span class="sr-only">Next</span>' +
            '</a>' +
            '</div>';
        HTML += (center) ? '<div class="col-md-' + colSide + '"></div>' : '';
        return HTML;
    },


    returnCarouselIndicators: function(jsonCarouselData) {
        var HTML = '';
        for (var i in jsonCarouselData.carouselData.slides) {
            HTML += '<li data-target="#questionCarousel" data-slide-to="' + i + '"' + ((i == 0) ? ' class="active"' : '') + '></li>';
        };
        console.log("returnCarouselIndicators: " + HTML);

        return HTML;
    },
    returnCarouselSlide: function(jsonCarouselData) {
        console.log("returnCarouselItem2 - jsonCarouselData: " + JSON.stringify(jsonCarouselData));
        var slideData = jsonCarouselData.carouselData.slides;
        console.log("returnCarouselItem2 - slideData: " + slideData.length);
        var HTML = '';

        for (var i = 0; i < slideData.length; i++) {
            HTML += '<div id="slide_' + i + '" class="item' + ((i == 0) ? ' active' : '') + '">';

            HTML += (slideData[i].hasOwnProperty('header')) ? '<h2 class="columnHeading">' + slideData[i].header + '</h2>' : '';

            HTML += this.returnCarouselItem(i, slideData);

            HTML += '</div>';
        }

        console.log("returnCarouselItem2: " + HTML);

        return HTML;
    },
    returnCarouselItem: function(slideNum, slideData) {

        var HTML = '';

        HTML += (slideData[slideNum].hasOwnProperty('overlay')) ? '<div class="carouselOverlay">' + slideData[slideNum].overlay + '</div>' : '';

        HTML += '<div id="question_' + slideNum + '" class="question">'; // <------ ADDED 2/5-2016

        switch (slideData[slideNum].type) {
            case "img":
                HTML += '<img class="img-responsive" src="' + slideData[slideNum].src + '" alt="' + slideData[slideNum].alt + '"/>';
                break;
            case "text":
                HTML += '<div class="TextHolder">' + slideData[slideNum].text + '</div>';
                break;
            case "video":
                HTML += '<div class="embed-responsive embed-responsive-16by9 col-xs-12 col-md-12">' +
                    '<iframe class="embed-responsive-item" src="' + slideData[slideNum].src + '?rel=0&iv_load_policy=3" allowfullscreen="1"></iframe>' +
                    '</div>';
                break;
            case "columnData":
                console.log("SLIDE TEST 1");
                for (var j in slideData[slideNum].columnData) {
                    console.log("SLIDE TEST 2");
                    var l = slideData[slideNum].columnData.length;
                    var bsColNum = ((l == 1) ? '12' : ((l == 2) ? '6' : ((l == 3) ? '4' : '12')));
                    HTML += '<div class="analysis column col-xs-12 col-md-' + bsColNum + '">' + slideData[slideNum].columnData[j].column + '</div>';
                }
                break;
            default:
                alert('Invalid "type"');
        }

        HTML += '</div>';

        console.log("returnCarouselItem: " + HTML);

        return HTML;
    },
    shuffelArray: function(ItemArray) {
        var NumOfItems = ItemArray.length;
        var NewArray = ItemArray.slice(); // Copy the array...
        var Item2;
        var TempItem1;
        var TempItem2;
        for (var Item1 = 0; Item1 < NumOfItems; Item1++) {
            Item2 = Math.floor(Math.random() * NumOfItems);
            TempItem1 = NewArray[Item1];
            TempItem2 = NewArray[Item2];
            NewArray[Item2] = TempItem1;
            NewArray[Item1] = TempItem2;
        }
        return NewArray;
    },
    setEventListeners: function(jsonCarouselData) {
        $(document).on('click', "#questionCarousel .item", function(event) {
            console.log('setEventListeners - CLICK - #questionCarousel .item - index: ' + $(this).prop('id'));

            // document.location.href = jsonCarouselData.carouselData.slides[$(this).index()].slideLink;        // Opens in the same window and tab

            var win = window.open(jsonCarouselData.carouselData.slides[$(this).index()].slideLink, '_blank'); // Opens in the same window, but a new tab
            win.focus();
        });
    }
}

function wordCount(val) {
    var wom = val.match(/\S+/g);
    return {
        charactersNoSpaces: val.replace(/\s+/g, '').length,
        characters: val.length,
        words: wom ? wom.length : 0,
        lines: val.split(/\r*\n/).length
    };
}


function safariWarning() {


    // SEE:  
    // http://sixrevisions.com/javascript/browser-detection-javascript/
    // http://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
    // https://jsfiddle.net/9atsffau/

    if (Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0) {
        //UserMsgBox("body", '<h4>ADVARSEL</h4> <p>Du/i arbejder på en Mac og bruger browseren Safari. <br> Denne øvelse virker desværre ikke optimalt på Safari-platformen. Du vil ikke kunne downloade wordfilen til sidst i øvelsen.</p><br> <p>Brug i stedet <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
        UserMsgBox("body", '<h4>ADVARSEL</h4> <p>Denne øvelse virker desværre ikke optimalt på dit styresystem og browser. Du vil ikke kunne downloade wordfilen til sidst i øvelsen.</p><br> <p>Hvis du er på en Mac, så brug fx <b>Chrome</b> (<a href="https://www.google.dk/chrome/browser/desktop/">Hent den her</a>) eller <b>Firefox</b>  (<a href="https://www.mozilla.org/da/firefox/new/">Hent den her</a>).</p><br> <p>Mvh <a href="https://www.vucdigital.dk">vucdigital.dk</a> </p>');
    }
    // SEE:  https://jsfiddle.net/9atsffau/
}

function getUrlVars()   
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
