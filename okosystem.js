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

    $(".detalje_label").click(function() {
        var indeks = $(this).index(".detalje_label");
        show_info(indeks);
    });


});

/*----------  Subsection comment block  ----------*/

function generate_labels(state) {
    //console.log(state);
    for (var i = 0; i < jsonData.labels.length; i++) {
        var element = jsonData.labels[i];
        console.log(i + " punkt");

        //viewArray[state].append("<div><img class='gif' src=" + element.pics[state] + "></div>");

        $(".labels_container").append("<span class='btn btn-xs btn-default detalje_label'><span class='glyphicon glyphicon-search'> </span> " + element.element + "</span>");

        $(".detalje_label").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%")
            //$(".gif").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%");
    }
    console.log("break");
}


/*----------  vis information  ----------*/

function show_info(indeks) {
    console.log("I: " + indeks);
    //$(".container-fluid").append("<div class='info_container'><div class='info_box'><h4>" + jsonData.elementer[indeks].element + "</h4><img class='infopic' src='" + jsonData.elementer[indeks].pic + "'><p>" + jsonData.elementer[indeks].infotekst + "</p></div></div>")
    if (state == 0) {
        UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><img class='img-responsive' src='" + jsonData.labels[indeks].infopic + "'><p>" + jsonData.labels[indeks].infotekst + "</p>");
    } else if (state == 1) {

    } else if (state == 2) {
        UserMsgBox("body", "<h3>" + jsonData.labels[indeks].element + "</h3><div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' src='https://www.youtube.com/embed/" + jsonData.labels[indeks].genopretning_url + "?rel=0'></iframe></div>");

    }

    //viewArray[state].addClass("blur");
}

/*----------  Skift view på Søen  ----------*/

function toggleView() {

    var indeks = $(this).index();

    if (indeks == -1){
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
}

/*----------  Kør spørgsmål  ----------*/

function poseQuestion() {
    console.log("runder: " + runder);
    var spmData = jsonData[state_Array[state]];

    if (state != 2) {

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
            svar_Array = shuffle_Array(svar_Array);

            for (var i = 0; i < svar_Array.length; i++) {
                svarHTML += "<div class='answerChoice radioWrap'><label class='rdo_label'><input name='radioName' type='radio' value='" + i + "'><span class='svar_txt'>" + svar_Array[i] + " </span></label></div>"
            }

            $(".svar").html("</div>" + svarHTML + "<div class='btn btn-info btn_tjek'>Tjek svar</div>");

            $(".btn_tjek").click(tjek_svar);
        } else {
            $(".spm").html("<h3>Du har besvaret alle spørgsmål <span class='label label-success'>korrekt</span>");
            $(".svar").html("<div class='btn btn-info btn_forfra'>Tag quizzen igen</div>");
            $(".btn_forfra").click(function() {
                genstart_quiz();
            });
        }
    }
}

/*----------  Tjek svar  ----------*/


function tjek_svar() {
    var checked = $('input[name=radioName]:checked').val();
    var svar = svar_Array[checked];

    if (korrekt_svar == svar) {
        console.log("KORREKT")

        feedback(true);

    } else {
        console.log("FORKERT!");
        feedback(false);
    }

    console.log("svar: " + korrekt_svar + ", checked:" + $(".svar_txt").eq(checked).html());


}

/*----------  Visuel feedback:    ----------*/

function visuel_feedback() {

    $(".ubalance_container").append("<img class='img_overlay' src='" + jsonData.overlays[state].overlaypics[runder[1]] + "'>");
    $(".ubalance_container").find(".img_overlay").eq(1).fadeOut(0);
    $(".ubalance_container").find(".img_overlay").eq(1).fadeIn(1000, function(){
        $(".ubalance_container").find(".img_overlay").eq(0).remove();
        console.log($(".ubalance_container").find(".img_overlay").length);
    });



}

/*----------  feedback - 1 skridt bring skridt 2 op ved click  ----------*/


function feedback(svar) {
    /* Hvis vi er i balance mode */

    if (state == 0) {
        if (svar == true) {
            UserMsgBox("body", "<h3>Du har svaret <span class='label label-success'>korrekt</span></h3>");
        } else {
            UserMsgBox("body", "<h3>Du har svaret <span class='label label-danger'>forkert</span></h3><p>Klik på de enkelte elementer og lær mere om dem.</p>");
        }
        /* Hvis vi er i ubalance mode */
    } else {
        if (svar == true) {
            UserMsgBox("body", "<h3>Du har svaret <span class='label label-success'>korrekt</span></h3><p>Når du klikker videre, så observer hvad der sker med " + jsonData.balance_spm[runder[state]].svar + " på illustrationen.</p>");
        } else {
            UserMsgBox("body", "<h3>Du har svaret <span class='label label-danger'>forkert</span></h3>");
        }
    }

    $(".MsgBox_bgr").click(function() {
        if (svar == true) {
            if (state == 1) {
                visuel_feedback();
            }
            runder.splice(state, 1, runder[state] + 1);
            poseQuestion();
        }
    });
}

/*----------  Genstart quiz - ryd variabler   ----------*/

function genstart_quiz() {
    runder.splice(state, 1, 0);
    poseQuestion();
}
