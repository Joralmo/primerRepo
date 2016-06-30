jQuery(document).ready(function($) {
  $('.modal-trigger').leanModal();
  (function () {
    var QUEUE = MathJax.Hub.queue;
    var math = null, box = null;
    var HIDEBOX = function () {box.style.visibility = "hidden"}
    var SHOWBOX = function () {box.style.visibility = "visible"}
    QUEUE.Push(function () {
      math = MathJax.Hub.getAllJax("MathOutput")[0];
      box = document.getElementById("box");
      SHOWBOX();
    });
    window.UpdateMath = function (TeX) {
      QUEUE.Push(
        HIDEBOX,
        ["resetEquationNumbers",MathJax.InputJax.TeX],
        ["Text",math,"\\displaystyle{"+TeX+"}"],
        SHOWBOX
        );
    }
  })();
  if (MathJax.Hub.Browser.isMSIE) {
    MathInput.onkeypress = function () {
      if (window.event && window.event.keyCode === 13) {this.blur(); this.focus()}
    }
  }
  parser = function(string){
    var miValor = string;
    var enviar=false;
    for(var i=0;i<miValor.length;i++){
      miValor=miValor.replace("/","\\over");
      miValor=miValor.replace("(","{");
      miValor=miValor.replace(")","}");
    }
    if(miValor.indexOf("sqrt") != -1){
      var raiz="";
      enviar=true;
      for(var i=0;i<miValor.length;i++){
        if(miValor[i]!="s"){
          raiz+=miValor[i];
        }else{
          raiz+="\\"+miValor[i];
        }
      }
    }
    if(enviar==false){
      UpdateMath(miValor);
    }else if(raiz!=null){
      UpdateMath(raiz);
    }
  }
});
