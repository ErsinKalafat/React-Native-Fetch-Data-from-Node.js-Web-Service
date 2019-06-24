var express = require('express');
var mysql = require('mysql');
var app = express();

var baglanti = mysql.createPool({
    connectionLimit: 50,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yazlab2proje2'
});

app.get('/TumHaberler', function (req, resp) {
    baglanti.getConnection(function (error, tempConnect) {
        if (!!error) {
            tempConnect.release();
            console.log('HATALI BAĞLANTI');
        } else {
            console.log('BAŞARILI BAĞLANTI');
            tempConnect.query("SELECT * FROM haberler", function (error, rows) {
                tempConnect.release();
                if (!!error)
                    console.log('HATALI SORGU');
                else
                    resp.json(rows);
            })
        }
    });
});

app.listen(1337);