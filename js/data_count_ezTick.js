(function(){
    var dataCurrentVal = 162006992;
    var dataNextVal = 162073125;
    var subDataCurrentVal = 32821249;
    var subDataNextVal = 32863128;
    var INTERVAL = 60*1000;
    var DELAY = 5000;

    var dataTicker = new ezTicker({
        currentVal: dataCurrentVal,
        interval: INTERVAL,
        delay: DELAY,
        nextVal: dataNextVal,
        selecter: "#dataCount"
    });

    var subDataTicker = new ezTicker({
        currentVal: subDataCurrentVal,
        interval: INTERVAL,
        delay: DELAY,
        nextVal: subDataNextVal,
        selecter: "#subDataCount"
    });

    dataTicker.startTick();
    subDataTicker.startTick();

    var setTicker = function(){
        dataNextVal += ((Math.random()*10 + Math.random()*100 + Math.random()*1000).toFixed(0) - 0 + 10000);
        dataTicker.update(dataNextVal);
        subDataNextVal += ((Math.random()*10 + Math.random()*100 + Math.random()*1000).toFixed(0) - 0 + 2000);
        subDataTicker.update(subDataNextVal);
    };

    var timer = self.setInterval(function(){
        setTicker();
    },INTERVAL);

    var topCountData = [
        {
            name: "湖北",
            value: 463621,
            preValue: 392421
        },
        {
            name: "上海",
            value: 703130,
            preValue: 601213
        },
        {
            name: "北京",
            value: 884525,
            preValue: 714525
        },
        {
            name: "广东",
            value: 1123231,
            preValue: 1011318

        },
        {
            name: "浙江",
            value: 1194912,
            preValue: 1083242
        }
    ];

    var bottomCountData = [
        {
            name: "网银专业版",
            value: 613000,
            preValue: 521321
        },
        {
            name: "网上支付",
            value: 1123100,
            preValue: 1001289
        },
        {
            name: "手机银行",
            value: 1332213,
            preValue: 1121631
        },
        {
            name: "一网通主站",
            value: 1532193,
            preValue: 1414121

        },
        {
            name: "网银大众版",
            value: 2591200,
            preValue: 2216412
        }
    ];

    var topCounts = new ezCounts({
        container : ".chart-count-container.top",
        interval : INTERVAL,
        delay : DELAY
    });

    var bottomCounts = new ezCounts({
        container : ".chart-count-container.bottom",
        interval : INTERVAL,
        delay : DELAY
    });

    // topCounts.setData(topCountData);
    // bottomCounts.setData(bottomCountData);

    //time

    var now = moment().format('HH:mm:ss');
    var timeHolder = $("#timeHolder");
    timeHolder.text(now);
    var nowTimer = self.setInterval(function(){
        now = moment().format('HH:mm:ss');
        timeHolder.text(now);
    },200);
})();