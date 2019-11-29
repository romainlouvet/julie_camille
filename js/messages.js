$.getJSON("http://mobileagri.homeip.net:8080/messages", function (data, status) {
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    var i = 0;
    $.each(data, function (index, value) {
        var date = new Date(value.date);

        // les noms de jours / mois
        var jours = new Array("dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi",
                              "samedi");
        var mois = new Array("janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet",
                             "aout", "septembre", "octobre", "novembre", "decembre");

        var month = date.getMonth()+1;
        // on recupere la date
        // on construit le message
        // var message = jours[date.getDay()] + " ";   // nom du jour
        var message = date.getDate() + "/" + month;


        $("#by-" + index).html("" + value.admin);
        $("#posted_date-" + index).html("le " + message);
        $("#text-" + index).html(value.text);
        i++;
    });

    for (j = i; j < 10; j++) {
        // do something
        $("#box-" + j).html("");
    }

});

$("#envoyer").click(function () {
    console.log("name:" + $("#name").val());

    var data = "{ \"text\": \"" + $("#message").val() + "\", \"admin\": \"" + $("#name").val()
               + "\"}";
    console.log(data);
    $.ajax({
               url: "http://mobileagri.homeip.net:8080/message",
               type: "POST",
               data: data,
               contentType: "application/json; charset=utf-8",
               dataType: "json",
               success: function (data, status) {
                   alert("Votre message a bien été envoyé !\nIl est actuellement en attente de validation pour apparaitre sur le site.");
                   //recharge la page courante
                   location.reload();
               },
               error: function(XMLHttpRequest, textStatus, errorThrown) {
                   alert("Status: " + textStatus+"\nIl y a actuellement une erreur, veuillez réessayer ultérieurement.");
               }

           })

    /* $.post("http://localhost:8080/message",
            {
              text: $("#message").val(),
              admin: $("#name").val()
            },
            function(data, status){
              alert("Data: " + data + "\nStatus: " + status);
            }, "json");*/
});
