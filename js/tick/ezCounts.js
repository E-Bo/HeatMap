// ezTickPlus is needed
var ezCounts = function(option){
    this.counts = [];
    this.preValues = {};
    this.option = {
        container : (option.container && ((typeof(option.container) == "string") || (option.container instanceof HTMLElement) || (option.container instanceof jQuery))) ? option.container : null,
        interval : (option.interval && typeof(option.interval) == "number") ? option.interval : 60*1000,
        delay : (option.delay && typeof(option.delay) == "number") ? option.delay : 5000,
        className : (option.className && typeof(option.className == "string")) ? option.className : "tick-scroll"
    };
    if(this.option.container == null){
        return;
    }else{
        this.container = $(this.option.container);
    }
};

ezCounts.prototype = {
    setData: function(data){
        if (this.counts.length <= data.length) {
            for(var j = 0; j < this.counts.length; j++){
                this.counts[j].update(data[j].value, data[j].preValue ? data[j].preValue : this.preValues[data[j].name]);
                this.preValues[data[j].name] = data[j].value;
            }
            for(var i = this.counts.length; i < data.length; i++){
                var item = $('<span class="chart-count-item tick '+ this.option.className +'"></span>');
                this.container.prepend(item);
                var countTicker = new ezTicker({
                    currentVal: data[i].preValue ? data[i].preValue : this.preValues[data[i].name],
                    nextVal: data[i].value,
                    interval: this.option.interval,
                    delay: this.option.delay,
                    selecter: item
                });
                this.counts.push(countTicker);
                countTicker.startTick();
                this.preValues[data[i].name] = data[i].value;
            }
        }else{
            for(var j = data.length; j < this.counts.length; j++){
                var tmp = counts.shift();
                tmp.stopTick();
                tmp.element.remove();
                tmp = null;
            }
            for(var i = 0; i < data.length; i++){
                this.counts[i].update(data[i].value, data[i].preValue ? data[i].preValue : this.preValues[data[i].name]);
                this.preValues[data[i].name] = data[i].value;
            }
        };
    }
};