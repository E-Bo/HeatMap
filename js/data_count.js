(function(){
    require.config({
        paths: {
            numberAnimate: 'js/numberAnimate/numberAnimate'
        }
    });

    require(
    [
        'numberAnimate'
    ],
    startDataCount
    );

    function startDataCount(){
        UpdateDataCount();
        UpdateSubDataCount();
    };

    function UpdateDataCount(){
        var newDataCount = $('#dataCount');
        newDataCount.numberAnimate();
        setCount(newDataCount,1422484938,3000,60000);
        var test = self.setInterval(function(){
            var tmp = Math.random() * 100 + Math.random() * 10000 +  Math.random() * 1000000;
            var targetCount =  newDataCount.numberAnimate('val').replaceAll(',','') - 0 + tmp;
            setCount(newDataCount,targetCount,3000,60000);
        },60*1000);
    };

    function UpdateSubDataCount(){
        var newSubDataCount = $('#subDataCount');
        newSubDataCount.numberAnimate();
        setCount(newSubDataCount,46872974,3000,60000);
        var test = self.setInterval(function(){
            var tmp = Math.random() * 100 + Math.random() * 10000 +  Math.random() * 1000000;
            var targetCount =  newSubDataCount.numberAnimate('val').replaceAll(',','') - 0 + tmp;
            setCount(newSubDataCount,targetCount,3000,60000);
        },60*1000);
    };

    function numberFormatter(s, n){   
        n = n > 0 && n <= 20 ? n : 0;   
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
        var l = s.split(".")[0].split("").reverse(),   
        r = s.split(".")[1];   
        t = "";   
        for(i = 0; i < l.length; i ++ ){
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
        }
        if(n > 0){
            return t.split("").reverse().join("") + "." + r; 
        }else{
            return t.split("").reverse().join(""); 
        }
    };

    String.prototype.replaceAll = function(s1,s2){    
        return this.replace(new RegExp(s1,"gm"),s2);    
    };

    function setCount(targetItem,count,interval,timeRange){
        var prevCount = targetItem.numberAnimate("val").replaceAll(',','') - 0;
        var step = ((count - prevCount)*interval/timeRange).toFixed(0) - 0;
        prevCount += step;
        targetItem.numberAnimate("set",numberFormatter(prevCount));

        window.clearInterval(updateCount);
        var updateCount = self.setInterval(function(){
            if(prevCount >= count){
                window.clearInterval(updateCount);
                return;
            };
            prevCount += step;
            targetItem.numberAnimate("set",numberFormatter(prevCount));
        },interval);
    };

})();