//tick is needed
function ezTicker(opt){

	this.currentVal = 0;
	this.INTERVAL = 60*1000;
	this.DELAY = 2000;
	this.nextVal = null;
	this.incrementVal = 1;
	this.force = 0;
	this.ticker = null;

	if(opt.incrementVal && typeof(opt.incrementVal) == "number"){
		this.incrementVal = opt.incrementVal;
	};
	if(opt.currentVal && typeof(opt.currentVal) == "number"){
		this.currentVal = opt.currentVal;
	};
	if(opt.interval && typeof(opt.interval) == "number"){
		this.INTERVAL = opt.interval;
	};
	if(opt.delay && typeof(opt.delay) == "number"){
		this.DELAY = opt.delay;
	};
	if(opt.nextVal && typeof(opt.nextVal) == "number"){
		this.nextVal = opt.nextVal;
		this.incrementVal = ((this.nextVal - this.currentVal)*this.DELAY/this.INTERVAL).toFixed(0) - 0;
		this.makeForce();
	};
	if((opt.selecter && typeof(opt.selecter) == "string") || (opt.selecter && opt.selecter instanceof HTMLElement) || (opt.selecter && opt.selecter instanceof jQuery)){
		this.selecter = opt.selecter;
	};
	if(opt.force && typeof(opt.force) == "number"){
		this.force = opt.force;
	};

	if($(this.selecter).length == 0){
		console.info("选择器有误");
		return;
	}else{
		this.element = $(this.selecter);
		this.element.text(this.numberFormatter(this.currentVal));
	};
};

ezTicker.prototype = {
    update: function(nextVal,currentVal){
    	if(currentVal && typeof(currentVal) == "number"){
    		this.currentVal = currentVal;
    	}
		if(nextVal && typeof(nextVal) == "number"){
			this.nextVal = nextVal;
			this.incrementVal = ((this.nextVal - this.currentVal)*this.DELAY/this.INTERVAL).toFixed(0) - 0;
			this.makeForce();
		}else{
			console.info("update 参数有误，该方法需要传入一个number类型的参数");
			return;
		}
	},
	startTick: function(){
		try {
			if(this.nextVal){
				this.ticker = this.element.ticker({
					delay       : this.DELAY,
					separators  : true,
					incremental : $.proxy(function(){
						this.currentVal += this.incrementVal;
						return this.currentVal;
					},this)
				});
			}else{
				this.ticker = this.element.ticker({
					delay       : this.DELAY,
					separators  : true,
					incremental : this.incrementVal
				});
			}
		} catch (e) {
			console.error(e.name + ": " + e.message);
		}
	},
	stopTick: function(){
		if(this.ticker){
			this.ticker.stop();
		}
	},
	numberFormatter: function(s, n){   
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
	},
	makeForce: function(){
		if(this.force >0){
			if(this.incrementVal < 0){
				this.incrementVal = 0;
			}
		}
		if(this.force <0){
			if(this.incrementVal > 0){
				this.incrementVal = 0;
			}
		}
	}
};