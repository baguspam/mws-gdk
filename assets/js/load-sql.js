html5sql.openDatabase("dbmzp", "Mazpamz", 5*1024*1024);

function loadDb(m) {
  
  html5sql.process(
    [
      "DROP TABLE IF EXISTS tb_menu",
      "DROP TABLE IF EXISTS tb_page",
      "DROP TABLE IF EXISTS tb_materi",
      "CREATE TABLE IF NOT EXISTS tb_menu (id INTEGER PRIMARY KEY AUTOINCREMENT, nama_menu VARCHAR (30), icon VARCHAR (30), url_menu VARCHAR (25))",
      "CREATE TABLE tb_page (id INTEGER PRIMARY KEY AUTOINCREMENT, title_h2 VARCHAR (100), description TEXT, url_page VARCHAR (150), count_like  INTEGER)",
      "CREATE TABLE tb_materi (id INTEGER PRIMARY KEY AUTOINCREMENT, nama_materi VARCHAR (25),"+
          "keterangan TEXT, link_materi VARCHAR (300))",
    ],
    function(){

    },
    function(error, statement){
      console.error("Error: " + error.message + " when processing " + statement);
    }
  );
  html5sql.logInfo = true;
  html5sql.logErrors = true;
  html5sql.putSelectResultsInArray = true;

  //GET JSON
  var xhr = new XMLHttpRequest();
  var url = "assets/data/data_all.json";
  xhr.onreadystatechange=function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      myFunction(xhr.responseText);
    }
  }
  xhr.open("GET", url, true);
  xhr.send();

    function myFunction(response) {
      var arr = JSON.parse(response);
      var b;
      //tb_menu
      for(b = 0; b < arr.menu.length;b++){
        html5sql.process(
        [
          {
            "sql":"INSERT INTO tb_menu (id, nama_menu, icon, url_menu) VALUES (?,?,?,?);",
            "data":[ arr.menu[b].id, arr.menu[b].strNameMenu, arr.menu[b].strIcon, arr.menu[b].strUrlMenu],
            "success": function(transaction, results){
              
            },
          }
        ],
        function(){
                    
          },
          function(error, statement){
            console.error("Error: " + error.message + " when processing " + statement);
          }        
        );
      }

      //tb_page
      for(b = 0; b < arr.page.length;b++){
        html5sql.process(
        [
          {
            "sql":"INSERT INTO tb_page (id, title_h2, description, url_page, count_like) VALUES (?,?,?,?,?);",
            "data":[ arr.page[b].id, arr.page[b].strTitleh2, arr.page[b].strDesc, arr.page[b].strUrlPage, arr.page[b].intCountLike ],
            "success": function(transaction, results){
              //Show success
            },
          }
        ],
        function(){
                    
          },
          function(error, statement){
            console.error("Error: " + error.message + " when processing " + statement);
          }        
        );
      }

      //tb_page
      for(b = 0; b < arr.materi.length;b++){
        html5sql.process(
        [
          {
            "sql":"INSERT INTO tb_materi (id, nama_materi, keterangan, link_materi) VALUES (?,?,?,?);",
            "data":[ arr.materi[b].id, arr.materi[b].strNameMateri, arr.materi[b].strDesc, arr.materi[b].strUrlLink],
            "success": function(transaction, results){
              //Show success
            },
          }
        ],
        function(){
                    
          },
          function(error, statement){
            console.error("Error: " + error.message + " when processing " + statement);
          }        
        );
      }


  
      if(m==="m"){
        //console.log("menu");
        loadMenu(); 
      }else if(m==="mp"){
        loadMenu(); 
        loadDetailPage(); 
      }else if(m==="me"){
        var url_string = window.location.href;
        var url = new URL(url_string);
        var myPage = url.searchParams.get("page");
        loadMenu(); 
        if(myPage === "tugas") {
          loadDetailPage();
        }
        
      }else if(m==="mnt"){
        //console.log("mnt"); 
        loadMenu(); 
        loadPage(); 
        loadMateri(); 
      }else{

      }
      
  }
  //alert('Sukses Sinkron');

  
};

function loadMenu(){
  html5sql.putSelectResultsInArray = true;
  html5sql.process(
    [
      "SELECT * FROM tb_menu"
    ],
    function(transaction, results, arrx) {
      var jumku=arrx.length;
      
      if(jumku>1){
          var out, c;
          var printDiv = document.getElementById('myShowMenu');
           for(c = 0; c < arrx.length;c++){
            printDiv.innerHTML += '<a href="'+arrx[c].url_menu+'"><i class="'+arrx[c].icon+'"></i> &nbsp;'+arrx[c].nama_menu+'</a>';
          }
          
        }else{
          printDiv.innerHTML = '<a href="./"><i class="fa fa-home"></i> &nbsp;Beranda</a>';
        }
    },
    function(error, statement){
      console.error("Error: " + error.message + " when processing " + statement);
    }   
  );

  html5sql.logInfo = true;
  html5sql.logErrors = true;

}

function loadPage(){
  html5sql.putSelectResultsInArray = true;
  html5sql.process(
    [
      "SELECT * FROM tb_page"
    ],
    function(transaction, results, row) {
      var jumku=row.length;
      
      if(jumku>1){
          var out, c;
          var printDiv = document.getElementById('myShowPage');
           for(c = 0; c < row.length;c++){
            printDiv.innerHTML += '<div class="card card-mz-9 animated fadeInUp">'+
              '<div class="container-card">'+
                '<h2 class="left-15">'+row[c].title_h2+'</h2>'+ 
                '<div class="divider"></div>'+
                '<p class="about-desc text-justify">'+
                  row[c].description+
              '</p>'+
              '<div class="divider"></div>'+
              '<div class="button text-right">'+
                '<button class="readmore" style="float: left;margin-right:5px;" onclick="myLike(this)" value="'+row[c].id+'-'+row[c].count_like+'"><span><i class="fa fa-heart" ></i> &nbsp;'+row[c].count_like+' Like</span></button>'+
                '<button class="readmore share-container" style="float: left;" onclick="btnShare()" ><i class="fa fa-share-alt"></i> &nbsp;Share</button>'+
                '<a href="'+row[c].url_page+'"><button class="readmore">Readmore »</button></a>'+
              '</div>'+
              '</div>'+
            '</div>';
          }
          
        }else{
          //null
        }
    },
    function(error, statement){
      console.error("Error: " + error.message + " when processing " + statement);
    }   
  );

  html5sql.logInfo = true;
  html5sql.logErrors = true;

}

function loadMateri(){
  html5sql.putSelectResultsInArray = true;
  html5sql.process(
    [
      "SELECT * FROM tb_materi"
    ],
    function(transaction, results, row) {
      var jumku=row.length;
      
      if(jumku>1){
          var out, c;
          var printDiv = document.getElementById('myShowMateri');
           for(c = 0; c < row.length;c++){
            var d=c+1;
            printDiv.innerHTML += '<tr>'+
            '<td>'+d+'.</td>'+
            '<td>'+row[c].nama_materi+'</td>'+
            //'<td class="text-center"><a href="materi.html?id='+row[c].id+'" target="_blank"><i class="fa fa-search"></i> Lihat Materi</a> &nbsp;|&nbsp; '+
            '<td class="text-center">&nbsp; '+
            '<a href="'+row[c].link_materi+'" target="_blank" rel="noopener"><i class="fa fa-download"></i> Download Materi</a></td>'+
          '</tr>';
          }
          
        }else{
          //null
        }
    },
    function(error, statement){
      console.error("Error: " + error.message + " when processing " + statement);
    }   
  );

  html5sql.logInfo = true;
  html5sql.logErrors = true;

}

function loadDetailPage(){
    html5sql.putSelectResultsInArray = true;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var myId = url.searchParams.get("id");
    var myPage = url.searchParams.get("page");
    html5sql.process(
      [
        "SELECT * FROM tb_page WHERE id='"+myId+"'"
      ],
      function(transaction, results, row) {
        var jumku=row.length;
        
        if(jumku>0){
            if(myPage === "tugas"){
              document.getElementById('myTitle').innerHTML = row[0].title_h2;
              document.getElementById('editor1').innerHTML = row[0].description;
            }else{
              document.getElementById('myTitle').innerHTML = row[0].title_h2;
              document.getElementById('myDescription').innerHTML = row[0].description;
            }
            
          }else{
            //null
          }
      },
      function(error, statement){
        console.error("Error: " + error.message + " when processing " + statement);
      }); 
    html5sql.logInfo = true;
      html5sql.logErrors = true;
}