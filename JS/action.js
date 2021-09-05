let mot = "START";
let nbletter = 0;
let phase = 1;
let finish = 0;

/**
 * Démarrage
 */
function start() {
    $("#start").remove()
    $(function () {
        WriteText("Ordinateur -> Bienvenue à toi !")
    });
    setTimeout(() => {
        TapeWord("#playerText", "Hey")
    }, 2000);
}

/**
 * Nombres aléatoires
 * @param {*} max 
 * @returns 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Affichage du mot start page principal
 */
for (let index = 0; index < mot.length; index++) {
    $("#start").html($("#start").html() + "<span class= " + mot.substr(index, 1).toLowerCase().charCodeAt(0) + " ; id= lettre" + index + " ; color: white; >" + mot.substr(index, 1) + "</span>");
}

function TapeWord(id, word) {
    $(id).html("")
    let replaceWord = "";
    for (let index = 0; index < word.length; index++) {
        if (word.substr(index, 1).toLowerCase().charCodeAt(0) > 96) {
            replaceWord = replaceWord + word.substr(index, 1)
        }
    }
    for (let index = 0; index < word.length; index++) {
        if (word.substr(index, 1).toLowerCase().charCodeAt(0) < 97) {
            $(id).html($(id).html() + "<span class= " + word.substr(index, 1).toLowerCase().charCodeAt(0) + " ; color: white; > </span>");
            index++;
            $(id).html($(id).html() + "<span class= " + word.substr(index, 1).toLowerCase().charCodeAt(0) + " ; id= " + replaceWord + "_lettre_" + index + " ; color: white; >" + word.substr(index, 1) + "</span>");
        } else {
            $(id).html($(id).html() + "<span class= " + word.substr(index, 1).toLowerCase().charCodeAt(0) + " ; id= " + replaceWord + "_lettre_" + index + " ; color: white; >" + word.substr(index, 1) + "</span>");
        }
    }
    fadeInID(id);
}

/**
 * Touche du clavier événement
 */
$(document).keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if ($("#lettre" + nbletter).attr("class") == keycode) {
        keysound();
        $("#lettre" + nbletter).css("color", "green");
        nbletter++;
        if (nbletter == mot.length) {
            nbletter = 0;
            $("#start2").remove()
            fadeOutID("#start")
            setTimeout(() => {
                fadeInID("#Container")
                start()
                //fadeInID("#Money")
            }, 1000);
        }
    }


    let replaceWord = "";
    for (let index = 0; index < $("#playerText").text().length; index++) { // Remplacement du mot pour une id sans espace
        if ($("#playerText").text().substr(index, 1).toLowerCase().charCodeAt(0) > 96) {
            replaceWord = replaceWord + $("#playerText").text().substr(index, 1)
        }
    }
    let playerTextID = "#" + replaceWord + "_lettre_" + nbletter;
    if ($("#playerText").text().substr(nbletter, 1).toLowerCase().charCodeAt(0) < 96) { // Si la lettre est un espace passer a la suivant
        nbletter++;
        keysound()
        if ($("#playerText").text().substr(nbletter, 1).toLowerCase().charCodeAt(0) < 96) { // Si les deux prochaines lettres ne font pas partie de l'alphabet le mot est finit
            finish = 1;
        }
    }
    if ($(playerTextID).attr("class") == keycode || finish == 1) { // Le bonne lettre est rentrée
        console.log("1");
        keysound();
        $(playerTextID).css("color", "green");
        nbletter++;
        if (nbletter >= $("#playerText").text().length || finish == 1) {
            console.log("Valid -> nbletter : " + nbletter + " | Mot : " + $("#playerText").text().length + " | Finish : " + finish);
            nbletter = 0;
            finish = 0;
            fadeOutID("#playerText")
            changePhase();
        }
    }
});

/**
 * Changement de phase pour les event
 */
function changePhase() {
    phase++;
    switch (phase) {
        case 2:
            WriteText("Moi -> Hey")
            setTimeout(() => {
                WriteText("Ordinateur -> Comme tu a pu le remarquer je suis un ordinateur... Et malheuresement je suis un peut lent ... donc j'ai besoin de toi pour m'aider sur quelques trucs");
            }, 3000);
            setTimeout(() => {
                TapeWord("#playerText", "De quoi a tu besoin ?");
            }, 12000);
            break;
        case 3:
            WriteText("Moi -> De quoi a tu besoin ?")
            setTimeout(() => {
                WriteText("Ordinateur -> Ah donc tu accepte ! très bien ... alors j'ai besoin de puissance, et pour cela je doit absorber des machines, donc il faudrait que tu hack des choses pour moi, OK ?")
            }, 5000);
            setTimeout(() => {
                TapeWord("#playerText", "Qu'est ce que j'y gagne ?");
            }, 15000);
            break;
        case 4:
            WriteText("Moi -> Qu'est ce que j'y gagne ?")
            setTimeout(() => {
                WriteText("Ordinateur -> C'est très simple ! j'utiliserait ce que je récolte pour te récompensé en argents, il me semble que les humains en ont fort besoin")
            }, 5000);
            setTimeout(() => {
                TapeWord("#playerText", "Ok pour moi !");
            }, 11000);
            break;
        case 5:
            WriteText("Moi -> Ok pour moi !")
            setTimeout(() => {
                WriteText("Ordinateur -> Alors c'est partie ! je t'envoie les données de notre première victime ! Mouahahahah !")
            }, 3000);
            break;
        default:
            break;
    }
}

/**
 * Effet Fade OUT
 * @param {*} id 
 */
function fadeOutID(id) {
    let opa = 1;
    fade = setInterval(() => {
        opa = opa - 0.05;
        $(id).css("opacity", opa);
        if (opa <= 0) {
            clearInterval(fade)
        }
    }, 50);
}

/**
 * Effet Fade IN
 * @param {*} id 
 */
function fadeInID(id) {
    let opa = 0;
    fade = setInterval(() => {
        opa = opa + 0.05;
        $(id).css("opacity", opa);
        if (opa >= 1) {
            clearInterval(fade)
        }
    }, 50);
}

/**
 * Bruitage clavier
 */
function keysound() {
    var audio = new Audio('SOUND/key-0' + (getRandomInt(8) + 1) + '.mp3');
    audio.play();
}

/**
 * Affichage du texte pas à pas
 * @param {*} target 
 * @param {*} message 
 * @param {*} index 
 * @param {*} interval 
 */
var showText = function (target, message, index, interval) {
    if (index < message.length) {
        $(target).append(message[index++]);
        setTimeout(function () { showText(target, message, index, interval); }, interval);
    }
}

/**
 * Ecrire un texte dans la console
 * @param {*} text 
 */
function WriteText(text) {
    for (let index = 1; index < 7; index++) {
        if (index == 6) {
            for (let index2 = 1; index2 < 5; index2++) {
                $("#computerText" + index2).text($("#computerText" + (index2 + 1)).text())
            }
            $("#computerText5").text("");
            showText("#computerText5", text, 0, 50);
            break;
        }
        if ($("#computerText" + index).text().length <= 1) {
            showText("#computerText" + index, text, 0, 50);
            break;
        }
    }
}