$(document).ready(function() {

  //alert(last_pid);
  //var last_pid = 0;

  //app.initialize();
  /*var latitude;
  var longitude;
  var timestamp;*/
  var g_position;
  
  $("#arrived").click(function() {

    // onSuccess Callback
    // This method accepts a Position object, which contains the
    // current GPS coordinates
    //
    /*var onSuccess = function(position) {
      alert('Latitude: ' + position.coords.latitude + '\n' +
        'Longitude: ' + position.coords.longitude + '\n' +
        'Altitude: ' + position.coords.altitude + '\n' +
        'Accuracy: ' + position.coords.accuracy + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
        'Heading: ' + position.coords.heading + '\n' +
        'Speed: ' + position.coords.speed + '\n' +
        'Timestamp: ' + position.timestamp + '\n');
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);*/

    function genbarcode(position) {
      var generate = 0;
      //alert(generate+'---'+position.timestamp+'---'+position.coords.longitude);
      $.ajax({
        type: "post",
        async: false, //这里必须为同步，不然本ajax的返回值会慢于顺序语句，本ajax的success函数会排在return后面执行，导致generate的值不能被赋1；
        url: 'http://' + kget('op_domain') + '/checkin/lp.php?c=checkin&a=genbarcode',
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
          username: kget('op_username'),
          celluuid: device.uuid //'35AFD5C8-E9EB-4FFE-9E0B-410ABDD32FA4' //device.uuid
        },
        dataType: "json", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
        //jsonp: "callback",
        success: function(data) {

          //console.dir(data);

          if (data.err_code != 0) {
            $("#result").text(data.err_code + "： " + data.err_msg);
          } else {
            generate = 1;
            //alert(generate+'---'+position.timestamp);
          }
        },
        error: function() {
          alert(arguments[1]+"#1");
        }
      });
      //alert(generate+'---'+position.timestamp+'---'+position.coords.longitude);
      return generate;
    }

    // onSuccess Callback
    //   This method accepts a `Position` object, which contains
    //   the current GPS coordinates
    //
    function onSuccess(position) {
      $.ajax({
        type: "post",
        url: 'http://' + kget('op_domain') + '/checkin/lp.php?c=checkin&a=checklocation',
        data: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          username: kget('op_username')
        },
        dataType: "json", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
        //jsonp: "callback",
        success: function(data) {

          //console.dir(data);

          if (data.err_code != 0) {
            $("#result").text(data.err_code + "： " + data.err_msg);
            //alert(data.err_code);
          } else {
            if (data.data.arrived == 'confirmed') {
              //alert(data.err_msg);
              var generate = genbarcode(position);
              //alert('generate:'+generate);
              if (generate == 1) {
                $("#scan").removeClass("hidden");
                $("#result").html('');
                g_position = position;
              }
              else {
                $("#result").text('生成二维码失败，请点击“我到了”重新生成！');
                $("#scan").addClass("hidden");
              }
            }
            if (data.data.arrived == 'negative') {
              $("#result").prepend('骗纸，到了再点过～～～<br>Latitude: ' + position.coords.latitude + '<br>' +
                                'Longitude: ' + position.coords.longitude);
              $("#scan").addClass("hidden");
            }
          }
        },
        error: function() {
          alert(arguments[1]+"#2");
        }
      });
      /*$("#result").html('Latitude: ' + position.coords.latitude + '<br>' +
        'Longitude: ' + position.coords.longitude + '<br>' +
        'Altitude: ' + position.coords.altitude + '<br>' +
        'Accuracy: ' + position.coords.accuracy + '<br>' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '<br>' +
        'Heading: ' + position.coords.heading + '<br>' +
        'Speed: ' + position.coords.speed + '<br>' +
        'Timestamp: ' + position.timestamp + '<br>');*/
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n #3');
    }

    // Options: throw an error if no update is received every 30 seconds.
    //
    /*var watchID = navigator.geolocation.watchPosition(onSuccess, onError, {
      timeout: 30000
    });*/
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  });






  $("#scan").click(function() {
    cordova.plugins.barcodeScanner.scan(
      function(result) {
        $.ajax({
          type: "post",
          url: 'http://' + kget('op_domain') + '/checkin/lp.php?c=checkin&a=checkin',
          data: {
            token: kget('op_token'),
            barcodevalue: result.text,
            barcodeformat: result.format,
            username: kget('op_username'),
            celluuid: device.uuid, //'35AFD5C8-E9EB-4FFE-9E0B-410ABDD32FA4', //device.uuid,
            latitude: g_position.coords.latitude,
            longitude: g_position.coords.longitude
          },
          timeout:5000,
          //dataType:"jsonp", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
          //jsonp:"callback",
          success: function(data, textStatus, jqXHR) {

            //console.dir(data);
            //alert(textStatus + "\n" + jqXHR);

            var data = $.parseJSON(data);

            if (data.err_code != 0) {
              $("#result").text(data.err_code + "： " + data.err_msg);
              $("#scan").addClass("hidden");
            } else {
              $("#result").text(data.data.name + "于" + data.data.datetime + "，签到成功！");
              $("#scan").addClass("hidden");
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            alert(textStatus + "\n" + errorThrown + "#4");
          }
        });
      },
      function(error) {
        alert("Scanning failed: " + error + "#5");
      }
    );
    /*$.ajax({
      type: "post",
      async: false,
      url: 'http://' + kget('op_domain') + '/checkin/lp.php?c=checkin&a=checkin',
      data: {
        token: kget('op_token'),
        barcodevalue: "result.text",
        barcodeformat: "result.format",
        username: kget('op_username')
      },
      dataType: "jsonp", //如果dataType:"json"已经指定,就不能再执行下面的$.parseJSON(data);相当于对json再次解析
      jsonp: "callback",
      success: function(data) {

        console.dir(data);

        if (data.err_code != 0) {
          $("#result").text(data.err_code + "： " + data.err_msg);
        } else {
          $("#result").text(data.data.username + "于" + data.data.datetime + "点，签到成功！");
        }
      },
      error: function() {
        alert(arguments[1]);
      }
    });*/

  /*cordova.plugins.barcodeScanner.scan(
      function (result) {
          alert("We got a barcode\r\n" +
                "Result: " + result.text + "\r\n" +
                "Format: " + result.format + "\r\n" +
                "Cancelled: " + result.cancelled + "=====");
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      }
    );*/
  });

});