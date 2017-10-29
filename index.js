const raw = require('tinyreq');
const fs = require('fs');

var num = 1;

// escribirdatos(num, "ida");
escribirdatos(num, "vuelta");


function escribirdatos(numero, sentido) {
    var link = "https://miproximocolectivo.sanluis.gob.ar/MiProximoColectivo/LineaIdaVuelta/?id=" + numero + "&sentido=" + sentido;
    raw(link, (err, body) => {

        if (err || body == "") {
            console.log(err);
            return;
        }

        var test = fs.createWriteStream('_' + numero + '.js', {
            flags: 'a'
        });
        /*
            body = JSON.parse(body);

            body.features.map((e,i) => {

                console.log(e);
                
            });
        */
        var escribe = false;
        var i = 0;
        if (sentido == "ida") {
            test.write("var _" + num + "_ida = {paths: [");
        }
        if (sentido == "vuelta") {
            test.write("]}; var _" + num + "_vuelta = {paths: [");
        }
        while (body[i] != null) {
            //console.log(body[i]);
            if (body[i] == "-") {
                if (!escribe) {
                    test.write('[');
                }
                escribe = true;
            }
            if (escribe && body[i] != " ") {
                test.write(body[i]);
                if (body[i] == ']') {
                    test.write(',');
                    escribe = false;
                }
            }
            i++;
        }
        if (sentido == "vuelta") {
            test.write("]};");
        }

        // test.write(body);
        //console.log(body[i]);

    });
}


// }