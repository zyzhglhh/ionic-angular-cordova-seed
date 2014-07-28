$(document).ready(function() {

  $baseurl = 'http://' + window.location.host + '/checkin';

  /*function getbarcode() {
    $.ajax({
      type: "get",
      url: $baseurl + '/lp.php?c=sendurl&a=sendurl',
      timeout: 3000,
      //dataType:"jsonp", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
      //jsonp:"callback",
      success: function(data, textStatus, jqXHR) {

        console.dir(data);
        //alert(textStatus + "\n" + jqXHR);

        var data = $.parseJSON(data);

        if (data.err_code != 0) {
          $(".container img").attr("src", "");
        } else {
          $(".container img").attr("src", $baseurl + '/' + data.data.imgurl);
          //alert(data.data.imgurl);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {

        alert(jqXHR + "\n" + textStatus + "\n" + errorThrown);
      }
    });
  }*/
  //setInterval(getbarcode,1000);//只能调用全局函数，在ready中的getbarcode就不能被发现
  setInterval(function() {
    $.ajax({
      type: "get",
      url: $baseurl + '/lp.php?c=sendurl&a=sendurl',
      //timeout: 3000,
      //dataType:"jsonp", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
      //jsonp:"callback",
      success: function(data, textStatus, jqXHR) {

        console.dir(data);
        //alert(textStatus + "\n" + jqXHR);

        var data = $.parseJSON(data);

        if (data.err_code != 0) {
          $(".container img").attr("src", "");
        } else {
          $(".container img").attr("src", $baseurl + '/' + data.data.imgurl);
          //alert(data.data.imgurl);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {

        alert(jqXHR + "\n" + textStatus + "\n" + errorThrown);
      }
    });
  }, 3000);
});