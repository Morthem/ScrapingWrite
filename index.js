const raw = require('tinyreq');
const fs = require('fs');

var sentido = "ida"
// 
for (var i = 1; i < 68; i++) {
    escribirdatos(i, sentido);
}

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
        var escribe = false;
        var i = 0;
        if (sentido == "ida") {
            test.write("var _" + numero + "_ida = {paths: [");
        }
        if (sentido == "vuelta") {
            test.write("]}; var _" + numero + "_vuelta = {paths: [");
        }
        while (body[i] != null) {
            if (body[i] == "-") {
                if (!escribe) {
                    test.write('{lng:');
                } else {
                    test.write('lat:')
                }
                escribe = true;
            }
            if (escribe && body[i] != " ") {
                if (body[i] != ']') {
                    test.write(body[i]);
                } else {
                    test.write('}');
                }
                if (body[i] == ']') {
                    test.write(',');
                    escribe = false;
                }
            }
            i++;
        }
        if (sentido == "vuelta") {
            test.write("]};");
        } else {
            escribirdatos(numero, "vuelta");
        }

    });
}


// }