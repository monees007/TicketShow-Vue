"use strict";(self["webpackChunkticketshow_vue"]=self["webpackChunkticketshow_vue"]||[]).push([[527],{8527:function(e,t,s){s.r(t),s.d(t,{default:function(){return h}});var a=function(){var e=this,t=e._self._c;return t("b-container",{staticClass:"d-flex flex-column justify-content-center h-100",attrs:{id:"rox","data-bs-theme":e.appstore.app_theme,fluid:""}},[t("div",{staticClass:"mb-3"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.search,expression:"search"}],staticClass:"slk h1 bg-primary",attrs:{"data-bs-theme":e.appstore.app_theme,list:"datalist",placeholder:"Select a Theatre to continue",type:"search"},domProps:{value:e.search},on:{change:e.load_data,focusin:function(t){e.theatres_list=e.storeE.theatre_list},focusout:e.load_data,input:function(t){t.target.composing||(e.search=t.target.value)}}}),t("datalist",{attrs:{id:"datalist"}},e._l(e.theatres_list,(function(e){return t("option",{key:e.id,domProps:{value:e.name}})})),0),t("b-form-select",{staticClass:"slk h1 bg-primary text-secondary",class:(e.appstore.app_theme,""),attrs:{"data-bs-theme":e.appstore.app_theme},on:{change:e.load_data},model:{value:e.days,callback:function(t){e.days=t},expression:"days"}},[t("b-form-select-option",{attrs:{value:"7"}},[e._v("Last Week")]),t("b-form-select-option",{attrs:{value:"15"}},[e._v("Last 15 days")]),t("b-form-select-option",{attrs:{value:"30"}},[e._v("Last Month")]),t("b-form-select-option",{attrs:{value:"365"}},[e._v("Last Year")])],1)],1),t("b-row",{directives:[{name:"show",rawName:"v-show",value:e.selected_theatre,expression:"selected_theatre"}]},[t("b-col",{staticClass:"col-12 col-md-4"},[t("b-card",{staticClass:"mb-3 bg-opacity-25"},[t("h4",[e._v("Total Revenue")]),t("h1",[e._v("₹"+e._s(e.total_revenue))])]),t("b-card",{staticClass:"mb-3 bg-opacity-25"},[t("h4",[e._v("Tickets Sold")]),t("h1",[e._v(e._s(e.ticket_sold))])]),t("b-card",{staticClass:"mb-3 bg-opacity-25"},[t("h4",[e._v("Shows")]),t("h1",[e._v(e._s(e.no_of_shows))])]),t("apexchart",{staticClass:"mt-4",attrs:{options:e.radial_options,series:e.radial_series,height:"390",type:"pie"}})],1),t("b-col",{staticClass:"col-12 col-md-8 p-0 ma-0",staticStyle:{height:"max-content"}},[t("apexchart",{staticClass:"p-0 mb-3 bg-secondary card bg-opacity-25",attrs:{options:e.line_options,series:e.line_series,type:"line"}}),t("apexchart",{staticClass:"p-0 mb-3 bg-secondary card bg-opacity-25",attrs:{options:e.bar_options,series:e.bar_series,height:"430",type:"bar"}})],1)],1)],1)},o=[],l=s(3306),i=s(6151),r={name:"StatsView",data:function(){return{days:7,total_revenue:0,ticket_sold:0,no_of_shows:0,appstore:(0,l.q)(),storeE:(0,i.E)(),theatres_list:[],retrieved_data:[],selected_theatre:null,search:"",line_series:[{name:"Revenue Collected",data:[1.4,2,2.5,1.5,2.5,2.8,3.8]},{name:"Tickets Sold",data:[20,29,37,36,44,45,50]}],label_x:[],line_options:{dataLabels:{enabled:!1},colors:["#FF1654","#247BA0"],stroke:{width:[4,4],curve:"smooth"},plotOptions:{bar:{columnWidth:"20%"}},xaxis:{categories:this.label_x,convertedCatToNumeric:!1,labels:{style:{colors:"#aaa",fontSize:"15px"}}},yaxis:[{axisTicks:{show:!0},axisBorder:{show:!0,color:"#FF1654"},labels:{style:{colors:"#FF1654",fontSize:"15px"},formatter:function(e){const t=[{value:1,symbol:""},{value:1e3,symbol:"k"},{value:1e6,symbol:"M"},{value:1e9,symbol:"G"},{value:1e12,symbol:"T"},{value:1e15,symbol:"P"},{value:1e18,symbol:"E"}],s=/\.0+$|(\.[0-9]*[1-9])0+$/;let a=t.slice().reverse().find((function(t){return e>=t.value}));return"₹"+(a?(e/a.value).toFixed(1).replace(s,"$1")+a.symbol:"0")}},title:{text:"Revenue Collected",style:{color:"#FF1654"}}},{opposite:!0,axisTicks:{show:!0},axisBorder:{show:!0,color:"#247BA0"},labels:{style:{colors:"#247BA0",fontSize:"15px"}},title:{text:"Tickets Sold",style:{color:"#247BA0"}}}],tooltip:{shared:!1,intersect:!0,x:{show:!1}},legend:{horizontalAlign:"left",offsetX:40,fontSize:"14px",labels:{colors:void 0,useSeriesColors:!0}}},radial_series:[76,67,61,90],radial_options:{plotOptions:{radialBar:{offsetY:0,startAngle:0,endAngle:270,hollow:{margin:5,size:"30%",background:"#87777A",image:void 0},dataLabels:{enabled:!1,name:{enabled:!1,show:!1},value:{enabled:!1,show:!1}}}},colors:["#421821","#753033","#532025","#642829"],labels:["Vimeo","Messenger","Facebook","LinkedIn"],legend:{show:!0,floating:!1,fontSize:"13px",position:"bottom",offsetX:0,offsetY:0,labels:{colors:"#ccc",useSeriesColors:!1},markers:{size:0},formatter:function(e,t){return e+":  ₹"+t.w.globals.series[t.seriesIndex]},itemMargin:{vertical:3}},responsive:[{breakpoint:480,options:{legend:{show:!1}}}]},bar_series:[{name:"Ticket Sold",data:[]},{name:"Revenue",data:[]}],bar_options:{title:{text:"Performance of each show",style:{colors:["#fff"],fontSize:"21px"}},colors:["#421821","#753033"],plotOptions:{bar:{borderRadius:10,horizontal:!1,style:{}}},legend:{fontSize:"14px",labels:{colors:"#ccc",useSeriesColors:!1}},dataLabels:{enabled:!1},tooltip:{shared:!0,intersect:!1,theme:"dark",y:{formatter:function(e,{seriesIndex:t}){return 1===t?"₹"+e:e}}},xaxis:{categories:[],convertedCatToNumeric:!1,labels:{style:{colors:"#aaa",fontSize:"15px"}}},yaxis:[{show:!1},{show:!1}]}}},beforeMount(){this.storeE.getData(1),this.theatres_list=this.storeE.theatre_list},methods:{async load_data(){this.selected_theatre=this.theatres_list.find((e=>e.name===this.search));const e=this.appstore;if(this.selected_theatre)try{this.loading=!0;const t=await fetch(e.api+"/stat/theatre?id="+this.selected_theatre.id+"&days="+this.days,{method:"GET",headers:e.getheader()});if(200===t.status){const e=await t.json();this.retrieved_data=e,this.total_revenue=e["total_revenue"],this.ticket_sold=e["ticket_sold"],this.no_of_shows=e["no_of_shows"],this.line_series=[{name:"Revenue Collected",data:e["revenue_per_day"]},{name:"Tickets Sold",data:e["ticket_sold_per_day"]}];let s=JSON.parse(JSON.stringify(this.line_options));s.yaxis=[{axisTicks:{show:!1},axisBorder:{show:!0,color:"#FF1654"},labels:{style:{colors:"#FF1654",fontSize:"15px"},formatter:function(e){const t=[{value:1,symbol:""},{value:1e3,symbol:"k"},{value:1e6,symbol:"M"},{value:1e9,symbol:"G"},{value:1e12,symbol:"T"},{value:1e15,symbol:"P"},{value:1e18,symbol:"E"}],s=/\.0+$|(\.[0-9]*[1-9])0+$/;let a=t.slice().reverse().find((function(t){return e>=t.value}));return"₹"+(a?(e/a.value).toFixed(1).replace(s,"$1")+a.symbol:"0")}},title:{text:"Revenue Collected",style:{color:"#FF1654"}}},{opposite:!0,axisTicks:{show:!1},axisBorder:{show:!0,color:"#247BA0"},labels:{style:{colors:"#247BA0",fontSize:"15px"}},title:{text:"Tickets Sold",style:{color:"#247BA0"}}}],s.xaxis.categories=e["label"],this.line_options=s,this.bar_series=e.bar_series;let a=JSON.parse(JSON.stringify(this.bar_options));a.xaxis.categories=e["shows_names"],this.bar_options=a;let o=JSON.parse(JSON.stringify(this.radial_options));o.labels=e["shows_names"],this.radial_options=o,console.log(e.bar_series[1]),this.radial_series=e.bar_series[1].data.map((e=>Math.floor(e))),this.loading=!1}else console.log(t.status,"Failed to load bulk running")}catch(t){console.log("Failed to load bulk running ",t)}}}},n=r,c=s(1001),d=(0,c.Z)(n,a,o,!1,null,"bed6a406",null),h=d.exports}}]);
//# sourceMappingURL=527.9cd025eb.js.map