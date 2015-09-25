(function(){
    require.config({
        paths: {
            echarts: 'js/echarts'
        },
        packages: [
            {
                name: 'BMap',
                location: 'js/bmap-ext',
                main: 'bmap-ext'
            }
        ]
    });

    require(
    [
        'echarts',
        'echarts/chart/map',
        'echarts/chart/line',
        'echarts/chart/pie'
    ],
    drawCharts
    );

    var BGColor = '1b1b1b';

    var BarLabelColor = 'rgba(255,255,255,0.7)';
    var BarLineColor = 'rgba(255,255,255,0.9)';

    var page = function(){
        this.navItems = $(".nav-item");
        this.tabItems = $(".tab-item");
        this.tabName = $(".js-main-title");
        if(this.navItems.map(function(){if($(this).hasClass('active')){return $(this)}}).length > 0){
            this.activeNavItem = this.navItems.map(function(){if($(this).hasClass('active')){return $(this)}});
        }else{
            this.activeNavItem = $(this.navItems[0]);
            this.activeNavItem.addClass('active');
        }
        this.tabName.find('span').text(this.activeNavItem.attr('data-tab-name'));
        if(this.tabItems.map(function(){if($(this).hasClass('active')){return $(this)}}).length > 0){
            this.activeTabItem = this.tabItems.map(function(){if($(this).hasClass('active')){return $(this)}});
        }else{
            this.activeTabItem = $(this.tabItems[0]);
            this.activeTabItem.addClass('active');
        }
        this.navItems.on('click',{page: this},this.clickNavItem);
    }

    page.prototype = {
        clickNavItem : function(e){
            e.data.page.activeNavItem.removeClass('active');
            e.data.page.activeTabItem.removeClass('active');
            e.data.page.activeNavItem = $(this);
            e.data.page.activeTabItem = e.data.page.tabItems.map(function(){
                if(this.id == e.data.page.activeNavItem.attr('data-control')){
                    return $(this);
                }
            });
            e.data.page.tabName.find("span").text(e.data.page.activeNavItem.attr('data-tab-name'));
            e.data.page.activeNavItem.addClass('active');
            e.data.page.activeTabItem.addClass('active');
        }
    }

    function init(){
        var app = new page();
    }

    function drawCharts(ec){
        init();
        drawMap(ec);
        drawPieTop(ec);
        drawPieBottom(ec);
    };

    var Themes = {
        blue:{
            barColor: {
                topBarColor: 'rgba(14, 188, 242, 1)',
                bottomBarColor: 'rgba(14, 200, 200, 1)',
                labelColor: 'rgba(255,255,255,0.7)',
                axisColor: 'rgba(255,255,255,0.9)'
            },
            pointColor: [
                'rgba(239,242,14,1)',
                'rgba(14,242,14,1)',
                'rgba(14, 234, 242, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(14, 241, 242, 1)'
            ],
            mapBorderColor: 'rgba(100,179,237,1)',
            mapBGColor: 'rgba(100,179,237,0.05)',
            circleColor:{
                t5Color: "#ffffff",
                t10Color: "#78FB36",
                t20Color: "#E29425"
            },
            areaColor:{
                labelColor: 'rgba(96,192,221,0.8)',
                lineColor: 'rgba(96,192,221,0.3)',
                areaColor: 'rgba(96,192,221,0.1)',
                axisColor: 'rgba(96,192,221,0.5)'
            }
        },
        black:{
            barColor:{
                topBarColor: 'rgba(14, 188, 242, 1)',
                bottomBarColor: 'rgba(14, 200, 200, 1)',
                labelColor: 'rgba(255,255,255,0.7)',
                axisColor: 'rgba(255,255,255,0.9)'
            },
            pointColor: [
                'rgba(255, 255, 255, 1)',
                'rgba(14, 207, 242, 1)',
                'rgba(15,92,191,1)',
                'rgba(255, 255, 255, 1)',
                'rgba(14, 241, 242, 1)'
            ],
            mapBorderColor: 'rgba(100,179,237,1)',
            mapBGColor: 'rgba(100,179,237,0.05)',
            circleColor:{
                t5Color: "#ffffff",
                t10Color: "#03a3ff",
                t20Color: "rgba(14, 200, 200, 1)"
            },
            areaColor:{
                labelColor: 'rgba(96,192,221,0.8)',
                lineColor: 'rgba(96,192,221,0.3)',
                areaColor: 'rgba(96,192,221,0.1)',
                axisColor: 'rgba(96,192,221,0.5)'
            }
        },
        purple:{
            barColor:{
                topBarColor: 'rgba(180, 101, 246, 1)',
                bottomBarColor: 'rgba(90, 161, 242, 1)',
                labelColor: 'rgba(255,255,255,0.7)',
                axisColor: 'rgba(255,255,255,0.9)'
            },
            pointColor: [
                'rgba(255, 255, 255, 1)',
                '#39fea4',
                '#2b94ff',
                'rgba(90, 191, 242, 1)',
                'rgba(91,16,101,1)',
                'rgba(255, 255, 255, 1)',
                'rgba(14, 241, 242, 1)'
            ],
            mapBorderColor: 'rgba(180, 171, 246, 1)',
            mapBGColor: 'rgba(180, 101, 246, 0.05)',
            circleColor:{
                t5Color: "#B69AF3",
                t10Color: "#F5D5B4",
                t20Color: "#66C072"
            },
            areaColor:{
                labelColor: 'rgba(255,255,255,0.8)',
                lineColor: 'rgba(255,255,255,0.3)',
                areaColor: 'rgba(255,255,255,0.1)',
                axisColor: 'rgba(255,255,255,0.5)'
            }
        },
        green:{
            barColor:{
                topBarColor: '#F8C33C',
                bottomBarColor: '#7E55F8',
                labelColor: 'rgba(255,255,255,0.7)',
                axisColor: 'rgba(255,255,255,0.9)'
            },
            pointColor: [
                'rgba(255, 255, 255, 1)',
                '#3CF749',
                '#7E55F8',
                'rgba(90, 191, 242, 1)',
                'rgba(91,16,101,1)',
                'rgba(255, 255, 255, 1)',
                'rgba(14, 241, 242, 1)'
            ],
            mapBorderColor: 'rgba(70,242,183,1)',
            mapBGColor: 'rgba(70,242,183,0.05)',
            circleColor:{
                t5Color: "#ffffff",
                t10Color: "#3CF749",
                t20Color: "#F9B06E"
            },
            areaColor:{
                labelColor: 'rgba(255,255,255,0.8)',
                lineColor: 'rgba(255,255,255,0.3)',
                areaColor: 'rgba(255,255,255,0.1)',
                axisColor: 'rgba(255,255,255,0.5)'
            }
        },
        red:{
            barColor:{
                topBarColor: '#F8C33C',
                bottomBarColor: '#30BCED',
                labelColor: 'rgba(255,255,255,0.7)',
                axisColor: 'rgba(255,255,255,0.9)'
            },
            pointColor: [
                'rgba(255, 255, 255, 1)',
                '#F7DD18',
                '#0C93F0',
                'rgba(90, 191, 242, 1)',
                'rgba(91,16,101,1)',
                'rgba(255, 255, 255, 1)',
                'rgba(14, 241, 242, 1)'
            ],
            mapBorderColor: 'rgba(255,164,106,1)',
            mapBGColor: 'rgba(255,134,106,0.05)',
            circleColor:{
                t5Color: "#ffffff",
                t10Color: "#F9B06E",
                t20Color: "#0DE0FC"
            },
            areaColor:{
                labelColor: 'rgba(255,255,255,0.8)',
                lineColor: 'rgba(255,255,255,0.3)',
                areaColor: 'rgba(255,255,255,0.1)',
                axisColor: 'rgba(255,255,255,0.5)'
            }
        }
    };

    var seletedTheme = "purple";

    $('body').addClass(seletedTheme);
    var barColor = Themes[seletedTheme].barColor;
    var pointColor = Themes[seletedTheme].pointColor;
    var mapBorderColor = Themes[seletedTheme].mapBorderColor;
    var mapBGColor = Themes[seletedTheme].mapBGColor;
    var circleColor = Themes[seletedTheme].circleColor;
    var areaColor = Themes[seletedTheme].areaColor;

    function drawPieTop(ec){
        var ezPieTop = ec.init(document.getElementById('pieChartTop'));
        pieTopOption = {
            backgroundColor: 'rgba(0,0,0,0)',
            color: [
                '#FE8463','#FAD860','#23C48D','#02C0F7','#5F7CD9',
                '#D4425C','#EE9D00','#23C48D','#02C0F7','#5F7CD9',
                '#FE8463','#FAD860','#9BCA63','#60C0DD','#26C0C0','#0084C6',
                '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
                '#B5C334'
            ],
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}%"
            },
            legend: {
                show: false,
                data:['浙江','广东','北京','上海','湖北'],
                textStyle: {
                    color: "auto"
                }
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'面积模式',
                    type:'pie',
                    radius : ['18%', '55%'],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    itemStyle:{
                        normal:{
                            label:{
                                formatter: "{b} : {c}%",
                                textStyle: {
                                    fontSize: 15
                                }
                            }
                        }
                    },
                    data:[
                        {value:17, name:'浙江'},
                        {value:17, name:'广东'},
                        {value:16, name:'北京'},
                        {value:13, name:'上海'},
                        {value:12, name:'湖北'}
                    ]
                }
            ]
        };
        ezPieTop.setOption(pieTopOption);
    };

    function drawPieBottom(ec){
        var ezPieBottom = ec.init(document.getElementById('pieChartBottom'));
        pieBottomOption = {
            backgroundColor: 'rgba(0,0,0,0)',
            color: [
                '#FE8463','#FAD860','#23C48D','#02C0F7','#5F7CD9',
                '#D4425C','#EE9D00','#23C48D','#02C0F7','#5F7CD9','#0084C6',
                '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
                '#B5C334'
            ],
            title : {
                text: '',
                subtext: ''
            },
            tooltip : {
                trigger: 'item',
                formatter: "{b} : {c}%"
            },
            legend: {
                show: false,
                data:['网银大众版','手机银行','网上支付','网银专业版','企业银行']
            },
            toolbox: {
                show : false,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {
                        show: true, 
                        type: ['pie']
                    },
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            series : [
                {
                    name:'面积模式',
                    type:'pie',
                    radius : ['18%', '55%'],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    itemStyle:{
                        normal:{
                            label:{
                                formatter: "{b}\n{c}%",
                                textStyle: {
                                    fontSize: 15
                                }
                            },
                            labelLine:{
                                length:20
                            }
                        }
                    },
                    data:[
                        {value:25, name:'网银大众版'},
                        {value:12, name:'手机银行'},
                        {value:11, name:'网上支付'},
                        {value:6, name:'网银专业版'},
                        {value:5, name:'企业银行'}
                    ]
                }
            ]
        };

        ezPieBottom.setOption(pieBottomOption);
    };

    function drawMap(ec){
        var ezNameMap = {
            '乌鲁木齐': '新疆',
            '哈尔滨': '黑龙江',
            '长春': '吉林',
            '沈阳':'辽宁',
            '北京': '北京',
            '天津': '天津',
            '呼和浩特': '内蒙古',
            '石家庄': '河北',
            '太原': '山西',
            '济南': '山东',
            '银川':'宁夏',
            '西安':'陕西',
            '郑州':'河南',
            '兰州':'甘肃',
            '西宁':'青海',
            '重庆':'重庆',
            '成都':'四川',
            '拉萨':'西藏',
            '昆明':'云南',
            '贵阳':'贵州',
            '南宁':'广西',
            '香港':'香港',
            '澳门':'澳门',
            '台北':'台湾',
            '海口':'海南',
            '福州':'福建',
            '广州':'广东',
            '杭州':'浙江',
            '南昌':'江西',
            '长沙':'湖南',
            '武汉':'湖北',
            '合肥':'安徽',
            '南京':'江苏',
            '上海':'上海'
        };

        var ezMap = ec.init(document.getElementById('map'));

        var placeList = [
            {name:'青岛', geoCoord:[120.33, 36.07]},
            {name:'上海', geoCoord:[121.48, 31.22]},
            {name:'威海', geoCoord:[122.1, 37.5]},
            {name:'厦门', geoCoord:[118.1, 24.46]},
            {name:'福州', geoCoord:[119.3, 26.08]},
            {name:'张家口', geoCoord:[114.87, 40.82]},
            {name:'宁波', geoCoord:[121.56, 29.86]},
            {name:'广州', geoCoord:[113.23, 23.16]},
            {name:'延安', geoCoord:[109.47, 36.6]},
            {name:'太原', geoCoord:[112.53, 37.87]},
            {name:'深圳', geoCoord:[114.07, 22.62]},
            {name:'珠海', geoCoord:[113.52, 22.3]},
            {name:'海口', geoCoord:[110.35, 20.02]},
            {name:'大连', geoCoord:[121.62, 38.92]},
            {name:'沈阳', geoCoord:[123.38, 41.8]},
            {name:'苏州', geoCoord:[120.62, 31.32]},
            {name:'南昌', geoCoord:[115.89, 28.68]},
            {name:'三亚', geoCoord:[109.511909, 18.252847]},
            {name:'吉林', geoCoord:[126.57, 43.87]},
            {name:'呼和浩特', geoCoord:[111.65, 40.82]},
            {name:'成都', geoCoord:[104.06, 30.67]},
            {name:'桂林', geoCoord:[110.28, 25.29]},
            {name:'北海', geoCoord:[109.12, 21.49]},
            {name:'西安', geoCoord:[108.95, 34.27]},
            {name:'绍兴', geoCoord:[120.58, 30.01]},
            {name:'重庆', geoCoord:[106.54, 29.59]},
            {name:'台州', geoCoord:[121.420757, 28.656386]},
            {name:'南京', geoCoord:[118.78, 32.04]},
            {name:'滨州', geoCoord:[118.03, 37.36]},
            {name:'贵阳', geoCoord:[106.71, 26.57]},
            {name:'北京', geoCoord:[116.46, 39.92]},
            {name:'徐州', geoCoord:[117.2, 34.26]},
            {name:'乌鲁木齐', geoCoord:[87.68, 43.77]},
            {name:'枣庄', geoCoord:[117.57, 34.86]},
            {name:'杭州', geoCoord:[120.19, 30.26]},
            {name:'开封', geoCoord:[114.35, 34.79]},
            {name:'济南', geoCoord:[117, 36.65]},
            {name:'德阳', geoCoord:[104.37, 31.13]},
            {name:'温州', geoCoord:[120.65, 28.01]},
            {name:'天津', geoCoord:[117.2, 39.13]},
            {name:'富阳', geoCoord:[119.95, 30.07]},
            {name:'郑州', geoCoord:[113.65, 34.76]},
            {name:'哈尔滨', geoCoord:[126.63, 45.75]},
            {name:'洛阳', geoCoord:[112.44, 34.7]},
            {name:'秦皇岛', geoCoord:[119.57, 39.95]},
            {name:'株洲', geoCoord:[113.16, 27.83]},
            {name:'石家庄', geoCoord:[114.48, 38.03]},
            {name:'莱芜', geoCoord:[117.67, 36.19]},
            {name:'常德', geoCoord:[111.69, 29.05]},
            {name:'保定', geoCoord:[115.48, 38.85]},
            {name:'合肥', geoCoord:[117.27, 31.86]},
            {name:'武汉', geoCoord:[114.31, 30.52]},
            {name:'大庆', geoCoord:[125.03, 46.58]}
        ];

        var placeListMin = [
            {name:'北京', geoCoord:[116.46, 39.92]},
            {name:'上海', geoCoord:[121.48, 31.22]},
            {name:'广州', geoCoord:[113.23, 23.16]},
            {name:'深圳', geoCoord:[114.07, 22.62]},
            {name:'杭州', geoCoord:[120.19, 30.26]},
            {name:'成都', geoCoord:[104.06, 30.67]},
            {name:'天津', geoCoord:[117.2, 39.13]},
            {name:'厦门', geoCoord:[118.1, 24.46]},
            {name:'武汉', geoCoord:[114.31, 30.52]},
            {name:'温州', geoCoord:[120.65, 28.01]},
            {name:'哈尔滨', geoCoord:[126.63, 45.75]},
            {name:'长沙', geoCoord:[113, 28.21]},
            {name:'重庆', geoCoord:[106.54, 29.59]},
            {name:'石家庄', geoCoord:[114.48, 38.03]},
            {name:'吉林', geoCoord:[126.57, 43.87]},
            {name:'宁波', geoCoord:[121.56, 29.86]},
            {name:'大连', geoCoord:[121.62, 38.92]},
            {name:'太原', geoCoord:[112.53, 37.87]},
            {name:'沈阳', geoCoord:[123.38, 41.8]},
            {name:'乌鲁木齐', geoCoord:[87.68, 43.77]}
        ];

        var placeListT5 = [
            {name:'北京', geoCoord:[116.46, 39.92]},
            {name:'上海', geoCoord:[121.48, 31.22]},
            {name:'广州', geoCoord:[113.23, 23.16]},
            {name:'深圳', geoCoord:[114.07, 22.62]},
            {name:'杭州', geoCoord:[120.19, 30.26]}
        ];
        var placeListT10 = [
            {name:'成都', geoCoord:[104.06, 30.67]},
            {name:'天津', geoCoord:[117.2, 39.13]},
            {name:'厦门', geoCoord:[118.1, 24.46]},
            {name:'武汉', geoCoord:[114.31, 30.52]},
            {name:'温州', geoCoord:[120.65, 28.01]}
        ];
        var placeListT20 = [
            {name:'哈尔滨', geoCoord:[126.63, 45.75]},
            {name:'长沙', geoCoord:[113, 28.21]},
            {name:'重庆', geoCoord:[106.54, 29.59]},
            {name:'石家庄', geoCoord:[114.48, 38.03]},
            {name:'吉林', geoCoord:[126.57, 43.87]},
            {name:'宁波', geoCoord:[121.56, 29.86]},
            {name:'大连', geoCoord:[121.62, 38.92]},
            {name:'太原', geoCoord:[112.53, 37.87]},
            {name:'沈阳', geoCoord:[123.38, 41.8]},
            {name:'乌鲁木齐', geoCoord:[87.68, 43.77]}
        ];

        var placeListAll = [
            {name:'海门', geoCoord:[121.15, 31.89]},
            {name:'鄂尔多斯', geoCoord:[109.781327, 39.608266]},
            {name:'招远', geoCoord:[120.38, 37.35]},
            {name:'舟山', geoCoord:[122.207216, 29.985295]},
            {name:'齐齐哈尔', geoCoord:[123.97, 47.33]},
            {name:'盐城', geoCoord:[120.13, 33.38]},
            {name:'赤峰', geoCoord:[118.87, 42.28]},
            {name:'青岛', geoCoord:[120.33, 36.07]},
            {name:'乳山', geoCoord:[121.52, 36.89]},
            {name:'金昌', geoCoord:[102.188043, 38.520089]},
            {name:'泉州', geoCoord:[118.58, 24.93]},
            {name:'莱西', geoCoord:[120.53, 36.86]},
            {name:'日照', geoCoord:[119.46, 35.42]},
            {name:'胶南', geoCoord:[119.97, 35.88]},
            {name:'南通', geoCoord:[121.05, 32.08]},
            {name:'拉萨', geoCoord:[91.11, 29.97]},
            {name:'云浮', geoCoord:[112.02, 22.93]},
            {name:'梅州', geoCoord:[116.1, 24.55]},
            {name:'文登', geoCoord:[122.05, 37.2]},
            {name:'上海', geoCoord:[121.48, 31.22]},
            {name:'攀枝花', geoCoord:[101.718637, 26.582347]},
            {name:'威海', geoCoord:[122.1, 37.5]},
            {name:'承德', geoCoord:[117.93, 40.97]},
            {name:'厦门', geoCoord:[118.1, 24.46]},
            {name:'汕尾', geoCoord:[115.375279, 22.786211]},
            {name:'潮州', geoCoord:[116.63, 23.68]},
            {name:'丹东', geoCoord:[124.37, 40.13]},
            {name:'太仓', geoCoord:[121.1, 31.45]},
            {name:'曲靖', geoCoord:[103.79, 25.51]},
            {name:'烟台', geoCoord:[121.39, 37.52]},
            {name:'福州', geoCoord:[119.3, 26.08]},
            {name:'瓦房店', geoCoord:[121.979603, 39.627114]},
            {name:'即墨', geoCoord:[120.45, 36.38]},
            {name:'抚顺', geoCoord:[123.97, 41.97]},
            {name:'玉溪', geoCoord:[102.52, 24.35]},
            {name:'张家口', geoCoord:[114.87, 40.82]},
            {name:'阳泉', geoCoord:[113.57, 37.85]},
            {name:'莱州', geoCoord:[119.942327, 37.177017]},
            {name:'湖州', geoCoord:[120.1, 30.86]},
            {name:'汕头', geoCoord:[116.69, 23.39]},
            {name:'昆山', geoCoord:[120.95, 31.39]},
            {name:'宁波', geoCoord:[121.56, 29.86]},
            {name:'湛江', geoCoord:[110.359377, 21.270708]},
            {name:'揭阳', geoCoord:[116.35, 23.55]},
            {name:'荣成', geoCoord:[122.41, 37.16]},
            {name:'连云港', geoCoord:[119.16, 34.59]},
            {name:'葫芦岛', geoCoord:[120.836932, 40.711052]},
            {name:'常熟', geoCoord:[120.74, 31.64]},
            {name:'东莞', geoCoord:[113.75, 23.04]},
            {name:'河源', geoCoord:[114.68, 23.73]},
            {name:'淮安', geoCoord:[119.15, 33.5]},
            {name:'泰州', geoCoord:[119.9, 32.49]},
            {name:'南宁', geoCoord:[108.33, 22.84]},
            {name:'营口', geoCoord:[122.18, 40.65]},
            {name:'惠州', geoCoord:[114.4, 23.09]},
            {name:'江阴', geoCoord:[120.26, 31.91]},
            {name:'蓬莱', geoCoord:[120.75, 37.8]},
            {name:'韶关', geoCoord:[113.62, 24.84]},
            {name:'嘉峪关', geoCoord:[98.289152, 39.77313]},
            {name:'广州', geoCoord:[113.23, 23.16]},
            {name:'延安', geoCoord:[109.47, 36.6]},
            {name:'太原', geoCoord:[112.53, 37.87]},
            {name:'清远', geoCoord:[113.01, 23.7]},
            {name:'中山', geoCoord:[113.38, 22.52]},
            {name:'昆明', geoCoord:[102.73, 25.04]},
            {name:'寿光', geoCoord:[118.73, 36.86]},
            {name:'盘锦', geoCoord:[122.070714, 41.119997]},
            {name:'长治', geoCoord:[113.08, 36.18]},
            {name:'深圳', geoCoord:[114.07, 22.62]},
            {name:'珠海', geoCoord:[113.52, 22.3]},
            {name:'宿迁', geoCoord:[118.3, 33.96]},
            {name:'咸阳', geoCoord:[108.72, 34.36]},
            {name:'铜川', geoCoord:[109.11, 35.09]},
            {name:'平度', geoCoord:[119.97, 36.77]},
            {name:'佛山', geoCoord:[113.11, 23.05]},
            {name:'海口', geoCoord:[110.35, 20.02]},
            {name:'江门', geoCoord:[113.06, 22.61]},
            {name:'章丘', geoCoord:[117.53, 36.72]},
            {name:'肇庆', geoCoord:[112.44, 23.05]},
            {name:'大连', geoCoord:[121.62, 38.92]},
            {name:'临汾', geoCoord:[111.5, 36.08]},
            {name:'吴江', geoCoord:[120.63, 31.16]},
            {name:'石嘴山', geoCoord:[106.39, 39.04]},
            {name:'沈阳', geoCoord:[123.38, 41.8]},
            {name:'苏州', geoCoord:[120.62, 31.32]},
            {name:'茂名', geoCoord:[110.88, 21.68]},
            {name:'嘉兴', geoCoord:[120.76, 30.77]},
            {name:'长春', geoCoord:[125.35, 43.88]},
            {name:'胶州', geoCoord:[120.03336, 36.264622]},
            {name:'银川', geoCoord:[106.27, 38.47]},
            {name:'张家港', geoCoord:[120.555821, 31.875428]},
            {name:'三门峡', geoCoord:[111.19, 34.76]},
            {name:'锦州', geoCoord:[121.15, 41.13]},
            {name:'南昌', geoCoord:[115.89, 28.68]},
            {name:'柳州', geoCoord:[109.4, 24.33]},
            {name:'三亚', geoCoord:[109.511909, 18.252847]},
            {name:'自贡', geoCoord:[104.778442, 29.33903]},
            {name:'吉林', geoCoord:[126.57, 43.87]},
            {name:'阳江', geoCoord:[111.95, 21.85]},
            {name:'泸州', geoCoord:[105.39, 28.91]},
            {name:'西宁', geoCoord:[101.74, 36.56]},
            {name:'宜宾', geoCoord:[104.56, 29.77]},
            {name:'呼和浩特', geoCoord:[111.65, 40.82]},
            {name:'成都', geoCoord:[104.06, 30.67]},
            {name:'大同', geoCoord:[113.3, 40.12]},
            {name:'镇江', geoCoord:[119.44, 32.2]},
            {name:'桂林', geoCoord:[110.28, 25.29]},
            {name:'张家界', geoCoord:[110.479191, 29.117096]},
            {name:'宜兴', geoCoord:[119.82, 31.36]},
            {name:'北海', geoCoord:[109.12, 21.49]},
            {name:'西安', geoCoord:[108.95, 34.27]},
            {name:'金坛', geoCoord:[119.56, 31.74]},
            {name:'东营', geoCoord:[118.49, 37.46]},
            {name:'牡丹江', geoCoord:[129.58, 44.6]},
            {name:'遵义', geoCoord:[106.9, 27.7]},
            {name:'绍兴', geoCoord:[120.58, 30.01]},
            {name:'扬州', geoCoord:[119.42, 32.39]},
            {name:'常州', geoCoord:[119.95, 31.79]},
            {name:'潍坊', geoCoord:[119.1, 36.62]},
            {name:'重庆', geoCoord:[106.54, 29.59]},
            {name:'台州', geoCoord:[121.420757, 28.656386]},
            {name:'南京', geoCoord:[118.78, 32.04]},
            {name:'滨州', geoCoord:[118.03, 37.36]},
            {name:'贵阳', geoCoord:[106.71, 26.57]},
            {name:'无锡', geoCoord:[120.29, 31.59]},
            {name:'本溪', geoCoord:[123.73, 41.3]},
            {name:'克拉玛依', geoCoord:[84.77, 45.59]},
            {name:'渭南', geoCoord:[109.5, 34.52]},
            {name:'马鞍山', geoCoord:[118.48, 31.56]},
            {name:'宝鸡', geoCoord:[107.15, 34.38]},
            {name:'焦作', geoCoord:[113.21, 35.24]},
            {name:'句容', geoCoord:[119.16, 31.95]},
            {name:'北京', geoCoord:[116.46, 39.92]},
            {name:'徐州', geoCoord:[117.2, 34.26]},
            {name:'衡水', geoCoord:[115.72, 37.72]},
            {name:'包头', geoCoord:[110, 40.58]},
            {name:'绵阳', geoCoord:[104.73, 31.48]},
            {name:'乌鲁木齐', geoCoord:[87.68, 43.77]},
            {name:'枣庄', geoCoord:[117.57, 34.86]},
            {name:'杭州', geoCoord:[120.19, 30.26]},
            {name:'淄博', geoCoord:[118.05, 36.78]},
            {name:'鞍山', geoCoord:[122.85, 41.12]},
            {name:'溧阳', geoCoord:[119.48, 31.43]},
            {name:'库尔勒', geoCoord:[86.06, 41.68]},
            {name:'安阳', geoCoord:[114.35, 36.1]},
            {name:'开封', geoCoord:[114.35, 34.79]},
            {name:'济南', geoCoord:[117, 36.65]},
            {name:'德阳', geoCoord:[104.37, 31.13]},
            {name:'温州', geoCoord:[120.65, 28.01]},
            {name:'九江', geoCoord:[115.97, 29.71]},
            {name:'邯郸', geoCoord:[114.47, 36.6]},
            {name:'临安', geoCoord:[119.72, 30.23]},
            {name:'兰州', geoCoord:[103.73, 36.03]},
            {name:'沧州', geoCoord:[116.83, 38.33]},
            {name:'临沂', geoCoord:[118.35, 35.05]},
            {name:'南充', geoCoord:[106.110698, 30.837793]},
            {name:'天津', geoCoord:[117.2, 39.13]},
            {name:'富阳', geoCoord:[119.95, 30.07]},
            {name:'泰安', geoCoord:[117.13, 36.18]},
            {name:'诸暨', geoCoord:[120.23, 29.71]},
            {name:'郑州', geoCoord:[113.65, 34.76]},
            {name:'哈尔滨', geoCoord:[126.63, 45.75]},
            {name:'聊城', geoCoord:[115.97, 36.45]},
            {name:'芜湖', geoCoord:[118.38, 31.33]},
            {name:'唐山', geoCoord:[118.02, 39.63]},
            {name:'平顶山', geoCoord:[113.29, 33.75]},
            {name:'邢台', geoCoord:[114.48, 37.05]},
            {name:'德州', geoCoord:[116.29, 37.45]},
            {name:'济宁', geoCoord:[116.59, 35.38]},
            {name:'荆州', geoCoord:[112.239741, 30.335165]},
            {name:'宜昌', geoCoord:[111.3, 30.7]},
            {name:'义乌', geoCoord:[120.06, 29.32]},
            {name:'丽水', geoCoord:[119.92, 28.45]},
            {name:'洛阳', geoCoord:[112.44, 34.7]},
            {name:'秦皇岛', geoCoord:[119.57, 39.95]},
            {name:'株洲', geoCoord:[113.16, 27.83]},
            {name:'石家庄', geoCoord:[114.48, 38.03]},
            {name:'莱芜', geoCoord:[117.67, 36.19]},
            {name:'常德', geoCoord:[111.69, 29.05]},
            {name:'保定', geoCoord:[115.48, 38.85]},
            {name:'湘潭', geoCoord:[112.91, 27.87]},
            {name:'金华', geoCoord:[119.64, 29.12]},
            {name:'岳阳', geoCoord:[113.09, 29.37]},
            {name:'长沙', geoCoord:[113, 28.21]},
            {name:'衢州', geoCoord:[118.88, 28.97]},
            {name:'廊坊', geoCoord:[116.7, 39.53]},
            {name:'菏泽', geoCoord:[115.480656, 35.23375]},
            {name:'合肥', geoCoord:[117.27, 31.86]},
            {name:'武汉', geoCoord:[114.31, 30.52]},
            {name:'大庆', geoCoord:[125.03, 46.58]}
        ];

        mapOption = {
            backgroundColor: "rgba(0,0,0,0)",
            color: pointColor,
            title : {
                text: '',
                subtext:'',
                x:'center',
                textStyle : {
                    color: '#fff'
                }
            },
            tooltip : {
                trigger: 'item',
                formatter: function(params){
                    return params.name;
                }
            },
            legend: {
                show: true,
                orient: 'horizontal',
                x:15,
                y:20,
                data:['高','中','低'],
                textStyle : {
                    color: '#fff'
                }
            },
            toolbox: {
                show : false,
                orient : 'vertical',
                x: 'right',
                y: 'center',
                feature : {
                    mark : {show: true},
                    dataView : {show: false, readOnly: false},
                    restore : {show: true},
                    saveAsImage : {show: false}
                }
            },
            series : [
                {
                    name: '低',
                    type: 'map',
                    roam: false,
                    hoverable: false,
                    mapType: 'china',
                    itemStyle:{
                        normal:{
                            borderColor: mapBorderColor,
                            borderWidth:1,
                            areaStyle:{
                                // color: BGColor
                                color: mapBGColor
                            },
                            label:{
                                show:false,
                                textStyle: {
                                    color: BGColor
                                }
                            }
                        },
                        emphasis:{
                            borderWidth:2,
                            borderColor:'rgba(255,255,255,1)',
                            areaStyle:{
                                color: BGColor
                            },
                            label:{
                                show:false,
                                textStyle: {
                                    color: '#FFF'
                                }
                            }
                        }
                    },
                    data : [],
                    markPoint : {
                        symbol : 'diamond',
                        symbolSize: 2,
                        large: true,
                        effect : {
                            show: true,
                            shadowBlur: 0,
                            period: 5
                        },
                        // symbol:'emptyCircle',
                        // symbolSize : function (v){
                        //     return 2 + Math.log(v);
                        // },
                        // effect : {
                        //     show: true,
                        //     shadowBlur : 0,
                        //     period: 10
                        // },
                        data : (function(){
                            var data = [];
                            var len = 600;
                            var geoCoord;
                            while(len--) {
                                geoCoord = placeListAll[len % placeListAll.length].geoCoord;
                                data.push({
                                    name : placeListAll[len % placeListAll.length].name + len,
                                    value : 10000,
                                    geoCoord : [
                                        geoCoord[0] - Math.random() * 2,
                                        geoCoord[1] + Math.random() * 3
                                        // geoCoord[0],
                                        // geoCoord[1]
                                    ]
                                })
                            }
                            return data;
                        })()
                    }
                },
                {
                    name: '中',
                    type: 'map',
                    mapType: 'china',
                    data : [],
                    markPoint : {
                        symbol : 'diamond',
                        symbolSize: 4,
                        large: true,
                        effect : {
                            show: true,
                            shadowBlur: 0,
                            period: 6
                        },
                        // symbol:'emptyCircle',
                        // symbolSize : function (v){
                        //     return 5 + Math.log(v);
                        // },
                        // effect : {
                        //     show: true,
                        //     shadowBlur : 0,
                        //     period: 15
                        // },
                        data : (function(){
                            var data = [];
                            var len = 300;
                            var geoCoord
                            while(len--) {
                                geoCoord = placeListAll[len % placeListAll.length].geoCoord;
                                data.push({
                                    name : placeListAll[len % placeListAll.length].name + len,
                                    value : 50000,
                                    geoCoord : [
                                        geoCoord[0] - Math.random(),
                                        geoCoord[1] + Math.random()*2
                                        // geoCoord[0],
                                        // geoCoord[1]
                                    ]
                                })
                            }
                            return data;
                        })()
                    }
                },
                {
                    name: '高',
                    type: 'map',
                    mapType: 'china',
                    data : [],
                    markPoint : {
                        symbol : 'diamond',
                        symbolSize: 6,
                        large: true,
                        effect : {
                            show: true,
                            shadowBlur: 0,
                            period: 7
                        },
                        // symbol:'emptyCircle',
                        // symbolSize : function (v){
                        //     return 10 + Math.log(v);
                        // },
                        // effect : {
                        //     show: true,
                        //     shadowBlur : 0,
                        //     period: 20
                        // },
                        data : (function(){
                            var data = [];
                            var len = placeListAll.length;
                            while(len--) {
                                data.push({
                                    name : placeListAll[len].name,
                                    value : 90000,
                                    geoCoord : placeListAll[len].geoCoord
                                })
                            }
                            return data;
                        })()
                    }
                }
            ]
        };

        ezMap.setOption(mapOption);

        var index = 0;
        var delList = [];
        var markPointPL = placeListMin;
        var serieId = 0;
        var addMP = self.setInterval(function(){
            if(index >= markPointPL.length){
                // window.clearInterval(addMP);
                // return;
                index = 0;
            }

            if(index <= 5 ){
                serieId = 0;
            }else if( index <=10){
                serieId = 1;
            }else{
                serieId = 2;
            }

            ezMap.addMarkPoint(
                serieId,
                {
                    data: [
                        {
                            name:markPointPL[index].name,
                            value: Math.random() * 80 * (3 - serieId),
                            geoCoord:markPointPL[index].geoCoord
                        }
                    ]
                }
            );

            delList.push({
                name: markPointPL[index].name,
                serieId: serieId 
            });

            self.setTimeout(function(){
                var delItem =  delList.shift();
                ezMap.delMarkPoint(
                    delItem.serieId,
                    delItem.name
                );
            },3000);

            index ++ ;
        },300);

        self.setTimeout(function(){
            console
        },2000);
    };
    // min 最小值  max 最大值  solitNum 分多少份  fixed 保留的小数
    function calcRange(min,max,splitNum,fixed){
        if(!fixed || typeof(fixed) != "number"){
            fixed = 0;
        }
        if(min >= max || splitNum < 2 || typeof(min) != "number" || typeof(max) != "number" || typeof(splitNum) != "number"){
            console.info(传入参数有误);
            return;
        }
        var Y = max - min;
        var X = Math.log(Y+1);
        var outPut = [];
        outPut.push(min);
        for(var i = 1 ; i < splitNum; i++){
            var _tmpX = X*i/splitNum;
            outPut.push(Math.exp(_tmpX).toFixed(fixed) - 1 + min);
        }
        outPut.push(max);
        return outPut;
    };

    function calcData(data,splitNum){
        var min = data[data.length - 1].value;
        var max = data[0].value;
        var outPut = [];
        var range = calcRange(min,max,splitNum);
        var start = 1;
        var _tmp = []
        for(var i = 0; i < data.length; i++){
            if(data[i].value < range[start]){
                _tmp.push(data[i]);
            }else{
                start++ ;
                if(start >= range.length){
                    _tmp.push(data[i]);
                    outPut.push(_tmp);
                    _tmp = [];
                }else{
                    outPut.push(_tmp);
                    _tmp = [];
                    _tmp.push(data[i]);
                }
            }
        }
    }
})();