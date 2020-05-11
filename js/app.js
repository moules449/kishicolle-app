$(function() {
  
  // 「スキャンする」を押したときのイベント
  $("#ScanButton").click(function() {
    scanBarcode();
    return false;
  });
  
  // 「ブラウザで開く」を押したときのイベント
  $("#BrowserOpenButton").click(function() {
    // invokeBrowserを用いてブラウザでURLを開く
    monaca.invokeBrowser($("#ResultMessage").text());
    return false;
  });
 
});
 
// 「スキャンする」を押したときに実行される関数
function scanBarcode() {
  // BarcodeScannerプラグインを利用してスキャン
  window.plugins.barcodeScanner.scan(
    // 成功時に実行されるコールバック（キャンセル時も含む）
    function(result) {
      // キャンセルされたら何もしない
      if (result.cancelled) {
        return;
      }
      
      // 結果テキストを表示
      $("#ResultMessage").text(result.text);
      
      if (result.text == "テスト") {
        $("#testMessage").text("内部処理成功！");
      }
      
      if (result.text.indexOf("kishicolle") === 0) {    //もしresultの中に"kishicolle"があるならば
        $("#testMessage").text("岸コレループ");
        var str1 = result.text;
        $("#testMessage3").text(str1);
          var name = str1.substr(str1.indexOf("_")+1);  //アンダーバーから一つ後ろの文字からすべて切り取る
        $("#logMessage1").text(name);
          var number = name.substr(0,2);    // nameの１文字目から２文字切り取る
        $("#logMessage2").text(number);
          
          var category = 0;
          if (number == 01){
              category = "ochiai_library";
          }else if(number == 02){
              category = "specimen/bird";
          }else if(number == 03){
              category = "specimen/other";
          }else if(number == 04){
              category = "scientific_materials";
          }else if(number == 05){
              category = "local_material";
          }else{
              alert("不正な値です。");
              return;
          }
          
          var url = "kishicolle/" + category + "/" + name + ".html";
          $("#logMessage3").text(url);
          myNavigator.pushPage(url);
      }
      
      // URLなら「ブラウザで開く」ボタンを表示
      if (result.text.indexOf("http") === 0) {
        $("#BrowserOpenButton").show();
      } else {
        $("#BrowserOpenButton").hide();
      }
    },
    // エラー時に実行されるコールバック
    function(error) {
      $("#ResultMessage").text(error);
    }
  );
}