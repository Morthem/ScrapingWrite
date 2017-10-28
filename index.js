const raw = require('tinyreq');
const fs = require('fs');

var link = "https://miproximocolectivo.sanluis.gob.ar/MiProximoColectivo/LineaIdaVuelta/?id=1&sentido=ida";
var escribe = false;
var simbolo = '-';

raw(link, (err, body) => {

    if (err || body == "") {
        console.log(err);
        return;
    }

    var test = fs.createWriteStream('test.js', {
        flags: 'a'
    });

    for (var i = 0; i < 50; i++) {
        console.log(body[i]);
        if (body[i] == "-") {
            if (!escribe) {
                test.write('[');
            }
            escribe = true;
        }
        if (escribe) {
            test.write(body[i]);
            if (body[i] == ']') {
                test.write(',');
                escribe = false;
            }
        }
    }

    // test.write(body);
    //console.log(body[i]);

});

// }