const raw = require('tinyreq');
const fs = require('fs');

var link = "https://miproximocolectivo.sanluis.gob.ar/MiProximoColectivo/LineaIdaVuelta/?id=65&sentido=ida";

raw(link, (err, body) => {

    if (err || body == "") {
        console.log(err);
        return;
    }

    console.log(body);

    var test = fs.createWriteStream('test.js', {
            flags: 'a'
        });

    test.write(body);
});