/*============================================
=            Initialize variables            =
============================================*/
var viewArray = [$(".balance_container"), $(".ubalance_container")],/* array der holder div'erne indhold */

    state = 0, /*----------  hvilken tilstand : balance elle ublance?  ----------*/
    
    state_Array = ["balance_spm", "ubalance_spm"], /*----------  variabler til at tilgå json pba sø state  ----------*/
    
    svar_array = [],
    
    /*----------  indeholder korrekte svar  ----------*/
    
    korrekt_svar;

    runder = [0, 0]; /*----------  hvilken runde spørgsmål er vi i?  ----------*/
    

/*=====  End of Initialize variables  ======*/


$(document).ready(function() {
    viewArray[1].fadeOut(0);
    $('li').click(toggleView);
    poseQuestion(runder[state]);

    init(state);
});
function init(state){
    console.log(state);
        for (var i = 0; i < jsonData.elementer.length; i++) {
        var element = jsonData.elementer[i];
        console.log(i + " punkt");

        viewArray[state].append("<div class='ikon_container'></div>")



        viewArray[state].append("<div ><img class='img-responsive gif' src=" + element.pic + "></div>");
        viewArray[state].append("<span class='btn btn-xs btn-default detalje_label'><span class='glyphicon glyphicon-search'> </span> " + element.element + "</span>");
        $(".gif").eq(i).css("left", element.balance_pos[0] + "%").css("top", element.balance_pos[1] + "%")
        //$(".gif").eq(i).css("left", zp.simplegif_position[0] + "%").css("top", zp.simplegif_position[1] + "%")
    }
}

/*----------  Skift view på Søen  ----------*/

function toggleView() {

    state = $(this).index();

    for (i in viewArray) {
        viewArray[i].hide()
    }
    viewArray[state].show();

    poseQuestion();
}

/*----------  Kør spørgsmål  ----------*/

function poseQuestion() {

    var spmData = jsonData[state_Array[state]];

    $(".spm_numbers").html("Spørgsmål " + runder[state] + " / " + spmData.length + ":");
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
}

/*----------  Tjek svar  ----------*/


function tjek_svar() {
    var checked = $('input[name=radioName]:checked').val();
    var svar = svar_Array[checked];

    if (korrekt_svar == svar){
        console.log("KORREKT")
        runder.splice(state_Array, 1, runder[state] +1);
        poseQuestion();
    }else{
        console.log("FORKERT!");
    }

    console.log("svar: " + korrekt_svar +", checked:" + $(".svar_txt").eq(checked).html()); 



}
