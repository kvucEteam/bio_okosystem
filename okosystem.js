/*============================================
=            Initialize variables            =
============================================*/
var state = 0,

    /*----------  hvor meget ubalance er der?  ----------*/
    ubalance_niveau = 0,

    viewArray = [$(".balance_container"), $(".ubalance_container"), $(".genopretnings_container")],
    state_Array = ["balance_spm", "ubalance_spm"],
    /*----------  variabler til at tilgå json pba sø state  ----------*/

    svar_array = [],

    /*----------  indeholder korrekte svar  ----------*/

    korrekt_svar,

    runder = [0, 0, 0]; /*----------  hvilken runde spørgsmål er vi i?  ----------*/


/*=====  End of Initialize variables  ======*/


$(document).ready(function() {
    $("#explanationwrapper").html(explanation(jsonData.userInterface.explanation));
    $('.instr_container').html(instruction(jsonData.userInterface.instruktion));
    $('li').click(toggleView);
    poseQuestion(runder[state]);

    generate_labels(state);
    toggleView();
    $(".balance_detalje_label").click(function() {
        var indeks = $(this).index(".balance_detalje_label");
        show_info(indeks);
    });

    $(".genopretning_detalje_label").click(function() {
        var indeks = $(this).index(".genopretning_detalje_label");
        show_info(indeks);
    });

    $(".btn_closeGUI").click(function() {
        console.log("Hej");
        $(".spm_togggle_container").slideToggle();
        var isVisible = $(".btn_closeGUI").hasClass("glyphicon-chevron-up");

        if (isVisible == true) {

            //$(".gui_container").css("background-color", "#999");
            $(".btn_closeGUI").switchClass("glyphicon-chevron-up", "glyphicon-chevron-down");

        } else {

            //$(".gui_container").css("background-color", "white");
            $(".btn_closeGUI").switchClass("glyphicon-chevron-down", "glyphicon-chevron-up");
            $(".skjult").remove();

        }
    });

    viewArray[1].fadeOut(0);
    viewArray[2].fadeOut(0);



});

/*----------  Subsection comment block  ----------*/

function generate_labels(state) {
    //console.log(state);
    for (var i = 0; i < jsonData.labels.length; i++) {
        var element = jsonData.labels[i];
        console.log(i + " punkt");
        //viewArray[state].append("<div><img class='gif' src=" + element.pics[state] + "></div>");
        $(".balance_labels_container").append("<span class='btn btn-xs btn-default balance_detalje_label'><span class='glyphicon glyphicon-info-sign'> </span> " + element.element + "</span>");
        $(".balance_detalje_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%")
            //$(".gif").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%");
    }

    for (var i = 0; i < jsonData.genopretning_labels.length; i++) {
        var element = jsonData.genopretning_labels[i];
        console.log(i + " punkt");
        //viewArray[state].append("<div><img class='gif' src=" + element.pics[state] + "></div>");
        $(".genopretning_labels_container").append("<span class='btn btn-xs btn-default genopretning_detalje_label'><span class='glyphicon glyphicon-play'> </span> " + element.element + "</span>");
        $(".genopretning_detalje_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%")
            //$(".gif").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%");
    }
    console.log("break");
}


/*----------  vis information  ----------*/

function show_info(indeks) {
    console.log("I: " + indeks);
    //$(".container-fluid").append("<div class='info_container'><div class='info_box'><h4>" + jsonData.elementer[indeks].element + "</h4><img class='infopic' src='" + jsonData.elementer[indeks].pic + "'><p>" + jsonData.elementer[indeks].infotekst + "</p></div></div>")
    if (state == 0) {
        UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><div class='col-xs-2'></div><div class='col-xs-8'><img class='img-responsive' src='" + jsonData.labels[indeks].infopic + "'></div><div class='col-xs-12'><p>" + jsonData.labels[indeks].infotekst + "</p></div>");
        //UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><div class='col-xs-8'><img class='img-responsive' src='" + jsonData.labels[indeks].infopic + "'><p></div><div class='col-xs-4>'" + jsonData.labels[indeks].infotekst + "</p></div>");

    } else if (state == 1) {

    } else if (state == 2) {
        UserMsgBox("body", "<h3>" + jsonData.genopretning_labels[indeks].element + "</h3><div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.genopretning_labels[indeks].genopretning_url + "?rel=0' allowfullscreen></iframe></div>");

    }

    //viewArray[state].addClass("blur");
}

/*----------  Skift view på Søen  ----------*/

function toggleView() {

    var indeks = $(this).index();

    if (indeks == -1) {
        indeks = state;
    }

    if (state != indeks) {
        state = indeks;

        for (i in viewArray) {
            viewArray[i].fadeOut(0)
        }
        viewArray[state].fadeIn(500);

        poseQuestion();
    }
    if (state == 0) {
        $(".genopretning_labels_container").hide();
        $(".balance_labels_container").show();
        $(".bg_image").attr("src", "img/BG_balance.png");

    } else if (state == 1) {
        $(".balance_labels_container, .genopretning_labels_container").hide();
        $(".gui_container").show();
        $(".bg_image").attr("src", "img/BG_ubalance.png");
    } else if (state == 2) {
        $(".balance_labels_container").hide();
        $(".genopretning_labels_container").show();
        $(".bg_image").attr("src", "img/genopretning.png");

    }
}

/*----------  Kør spørgsmål  ----------*/

function poseQuestion() {
    $(".gui_container").fadeIn(1500);

    console.log("posing q");
    $(".feedback_container").hide();
    $(".btn_tjek").show();
    console.log("runder: " + runder);
    var spmData = jsonData[state_Array[state]];

    if (state != 2) {
        $(".spm_numbers").show();

        if (runder[state] < spmData.length) {

            $(".spm_numbers").html("Spørgsmål " + (runder[state] + 1) + " / " + spmData.length);
            $(".spm").html(spmData[runder[state]].spm);

            svar_Array = [];
            var svarHTML = "<div class='answerWrap'>";

            for (var i = 0; i < spmData[runder[state]].forkerte_svar.length; i++) {
                svar_Array.push(spmData[runder[state]].forkerte_svar[i]);
            }
            svar_Array.push(spmData[runder[state]].svar);

            korrekt_svar = spmData[runder[state]].svar;
            //svar_Array = shuffle_Array(svar_Array);

            for (var i = 0; i < svar_Array.length; i++) {
                svarHTML += "<div class='answerChoice radioWrap'><label class='rdo_label'><input name='radioName' type='radio' value='" + i + "'><span class='svar_txt'>" + svar_Array[i] + " </span></label></div>"
            }

            $(".svar").html("</div>" + svarHTML);

            $(".btn_tjek").click(tjek_svar);
        } else {
            $(".spm").html("Du har besvaret alle spørgsmålene i quizzen <h4><span class='label_slut label label-success'>Korrekt</span></h4><p>Du kan tage quizzen igen eller undersøge en af de andre faner.");
            $(".svar").html("<div class='btn btn-primary btn_forfra'>Tag quizzen igen</div><div class='Clear'></div>");
            $(".btn_tjek").hide();
            $(".btn_forfra").click(function() {
                genstart_quiz();
            });
        }
    } else {
        $(".spm_numbers").hide(); //html("Spørgsmål " + (runder[state] + 1) + " / " + spmData.length);
        $(".spm").html("Se videoerne om genopretning af søens balance.");
        $(".svar").html("");
        $(".btn_tjek").hide();
    }
    $(".radioWrap").shuffle_div_position();
}

/*----------  Tjek svar  ----------*/


function tjek_svar() {
    var checked = $('input[name=radioName]:checked').val();
    var svar = svar_Array[checked];
    console.log("checked: " + checked);
    if (typeof(checked) != "undefined") {
        if (korrekt_svar == svar) {
            console.log("KORREKT")

            feedback(true, checked);

        } else {
            console.log("FORKERT!");
            feedback(false, checked);
        }
    }
    console.log("svar: " + korrekt_svar + ", checked:" + $(".svar_txt").eq(checked).html());


}

/*----------  Visuel feedback:    ----------*/

function visuel_feedback() {


    if (state == 0) {

        if (runder[state] < jsonData.overlays[state].overlaypics.length) {
            $(".gui_container").fadeOut(100);

            $(".balance_container").prepend("<img class='balance_overlay img_overlay img-responsive' src='" + jsonData.overlays[state].overlaypics[runder[0]] + "'>");
            //console.log("OL_length: " + $(".ubalance_overlay").length);

            $(".balance_overlay").eq(0).fadeOut(0);
            $(".balance_overlay").eq(1).fadeOut(3000);


            $(".balance_overlay").eq(0).fadeIn(3000, function() {
                $(".balance_overlay").eq(1).remove();

                console.log($(".balance_container").find(".img_overlay").length);
                runder.splice(state, 1, runder[state] + 1);
                poseQuestion();
            });
        } else {
            runder.splice(state, 1, runder[state] + 1);
            poseQuestion();
        }
    } else if (state == 1) {
        $(".gui_container").fadeOut(100);

        $(".ubalance_container").prepend("<img class='ubalance_overlay img_overlay img-responsive' src='" + jsonData.overlays[state].overlaypics[runder[1]] + "'>");
        console.log("OL_length: " + $(".ubalance_overlay").length);

        $(".ubalance_overlay").eq(0).fadeOut(0);
        $(".ubalance_overlay").eq(1).fadeOut(3000);

        $(".ubalance_overlay").eq(0).fadeIn(3000, function() {
            $(".ubalance_overlay").eq(1).remove();

            console.log($(".ubalance_container").find(".img_overlay").length);
            runder.splice(state, 1, runder[state] + 1);
            poseQuestion();
        });

    }


    //$(".ubalance_overlay").eq(1).fadeIn(1500);


}


/*----------  feedback - 1 skridt bring skridt 2 op ved click  ----------*/


function feedback(svar, checked) {
    $(".feedback_container").show();
    /* Hvis vi er i balance mode */

    if (state == 0) {
        // alert("state: " + state);
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_true + "</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {
            if (jsonData.balance_spm[runder[state]].feedback_false[checked] != "") {
                $(".feedback_container").html("<h4><span class='label label-danger'>Forkert</span></h4><p class='feedback_txt'>" + jsonData.balance_spm[runder[state]].feedback_false[checked] + "</p>");
            } else {
                $(".feedback_container").html("<h4><span class='label label-danger'>Forkert</span></h4><p class='feedback_txt'>Klik på de enkelte elementer og læs om dem.</p>");
            }
        }
        /* Hvis vi er i ubalance mode */
    } else if (state == 1) {
        if (svar == true) {
            $(".feedback_container").html("<h4><span class='label label-success'>Korrekt</span></h4><p class='feedback_txt'>Klik på fortsæt og se hvordan processen påvirker søen.</p><div class='btn btn-xs btn-primary ok_btn'>Fortsæt</div>");
            $(".btn_tjek").hide();
        } else {
            //alert(jsonData.ubalance_spm[runder[state]].feedback);
            $(".feedback_container").html("<h4><span class='label label-danger'>Forkert</span></h4><p class='feedback_txt'>" + jsonData.ubalance_spm[runder[state]].feedback_false[checked] + "</p>");
        }
    }

    $(".ok_btn").click(function() {
        console.log("ok BTN");
        if (svar == true) {
            visuel_feedback();

        }
    });
}

/*----------  Genstart quiz - ryd variabler   ----------*/

function genstart_quiz() {
    runder.splice(state, 1, 0);
    poseQuestion();
    if (state == 0) {
        $(".balance_container").html('<img class="img_overlay img-responsive ubalance_overlay" src="img/balance01.png"  />');
    } else if (state == 1) {
        $(".ubalance_container").html('<img class="img_overlay img-responsive ubalance_overlay" src="img/balance01.png" />');
    }
}
