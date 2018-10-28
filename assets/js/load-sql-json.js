var xhr = new XMLHttpRequest();
xhr.open('GET', 'assets/database/mzp.db', true);
xhr.responseType = 'arraybuffer';

xhr.onload = function(e) {
  var uInt8Array = new Uint8Array(this.response);
  var db = new SQL.Database(uInt8Array);
    var myMenu = db.prepare("SELECT * FROM tb_menu");
    while(myMenu.step()) { //
        var row = myMenu.getAsObject();
        var printDiv = document.getElementById('myShowMenu');
        printDiv.innerHTML += '<a href="'+row['url_menu']+'"><i class="'+row['icon']+'"></i> &nbsp;'+row['nama_menu']+'</a>';
    }

    //tb_Page
    var stmt1 = db.prepare("SELECT * FROM tb_page");
    var printDiv1 = document.getElementById('myShowJson');
    var xim1 = '{"page": [';
    while(stmt1.step()) { //
        var row = stmt1.getAsObject();
        xim1 += '{"id": '+row['id']+', '+
                      '"strTitleh2": "'+row['title_h2']+'", '+
                      '"strDesc": "'+row['description']+'", '+
                      '"strUrlPage": "'+row['url_page']+'", '+
                      '"intCountLike": "'+row['count_like']+'"}, ';
    }
    xim1 = xim1.substr(0, xim1.length-2);
    xim1 +=']}';
    printDiv1.innerHTML = xim1 ;

    //tb_Menu
    var stmt2 = db.prepare("SELECT * FROM tb_menu");
    var printDiv2 = document.getElementById('myShowJson2');
    var xim2 = '{"menu": [';
    while(stmt2.step()) { //
        var row = stmt2.getAsObject();
        xim2 += '{"id": '+row['id']+', '+
                      '"strNameMenu": "'+row['nama_menu']+'", '+
                      '"strUrlMenu": "'+row['url_menu']+'", '+
                      '"strIcon": "'+row['icon']+'"}, ';
    }
    xim2 = xim2.substr(0, xim2.length-2);
    xim2 +=']}';
    printDiv2.innerHTML = xim2 ;

    //tb_Menu
    var stmt3 = db.prepare("SELECT * FROM tb_materi");
    var printDiv3 = document.getElementById('myShowJson3');
    var xim3 = '{"materi": [';
    while(stmt3.step()) { //
        var row = stmt3.getAsObject();
        xim3 += '{"id": '+row['id']+', '+
                      '"strNameMateri": "'+row['nama_materi']+'", '+
                      '"strDesc": "'+row['keterangan']+'", '+
                      '"strUrlLink": "'+row['link_materi']+'"}, ';
    }
    xim3 = xim3.substr(0, xim3.length-2);
    xim3 +=']}';
    printDiv3.innerHTML = xim3 ;

    //JSON all
    var printDiv4 = document.getElementById('myShowJson4');
    var xim4 = '{"menu": [';
    while(stmt2.step()) { //
        var row = stmt2.getAsObject();
        xim4 += '{"id": '+row['id']+', '+
                      '"strNameMenu": "'+row['nama_menu']+'", '+
                      '"strUrlMenu": "'+row['url_menu']+'", '+
                      '"strIcon": "'+row['icon']+'"}, ';
    }
    xim4 = xim4.substr(0, xim4.length-2);
    //page
    xim4 += '], "page": [';
    while(stmt1.step()) { //
        var row = stmt1.getAsObject();
        xim4 += '{"id": '+row['id']+', '+
                      '"strTitleh2": "'+row['title_h2']+'", '+
                      '"strDesc": "'+row['description']+'", '+
                      '"strUrlPage": "'+row['url_page']+'", '+
                      '"intCountLike": "'+row['count_like']+'"}, ';
    }
    xim4 = xim4.substr(0, xim4.length-2);
    //materi
    xim4 += '], "materi": [';
    while(stmt3.step()) { //
        var row = stmt3.getAsObject();
        xim4 += '{"id": '+row['id']+', '+
                      '"strNameMateri": "'+row['nama_materi']+'", '+
                      '"strDesc": "'+row['keterangan']+'", '+
                      '"strUrlLink": "'+row['link_materi']+'"}, ';
    }
    xim4 = xim4.substr(0, xim4.length-2);
    xim4 +=']}';
    printDiv4.innerHTML = xim4 ;

  
};
xhr.send();