(function(){
    var countOpt = {
        useEasing : false, 
        useGrouping : true, 
        separator : ',', 
        decimal : '.', 
        prefix : '', 
        suffix : ''
    }
    var ezDataCount = new countUp('dataCount',1321412221,9931412221,0,60,countOpt);
    var ezSubDataCount = new countUp('subDataCount',32821249,83152451,0,60,countOpt);
    ezDataCount.start();
    ezSubDataCount.start();

})();