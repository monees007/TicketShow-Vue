"use strict";(self["webpackChunkticketshow_vue"]=self["webpackChunkticketshow_vue"]||[]).push([[708],{7708:function(t,e,a){a.r(e),a.d(e,{default:function(){return d}});var s=function(){var t=this,e=t._self._c;return e("div",{key:t.appstore.review_id,staticStyle:{width:"100vh"}},[e("div",{staticClass:"d-flex align-items-center w-100 flex-row px-3"},[e("b-row",{staticClass:"w-100"},[e("hr"),e("h1",{staticClass:"align-items-start my-3",staticStyle:{"min-width":"fit-content","font-size":"xxx-large"}},[t._v(" "+t._s(t.t.name)+" ")]),e("span",{staticClass:"d-none mx-3 d-md-block disabled my-1"},[t._v(" "+t._s(t.t.place))]),e("hr")])],1),e("b-button",{staticClass:"my-4 mx-4",staticStyle:{background:"saddlebrown"},on:{click:function(e){t.compo=!t.compo}}},[t._v(" "+t._s(t.compo?"Hide Reviews":"Show Review")+" ")]),e("b-button",{staticClass:"my-4 mx-4",staticStyle:{background:"saddlebrown"},on:{click:function(e){return t.appstore.open_review_modal(t.t.id,1)}}},[t._v("Add your review ")]),t.compo?e("div",[t._l(t.reviews,(function(a){return e("div",{key:a.id,staticClass:"card w-100 bg-dark text-light text-warning rounded-5 border-1 py-5 my-4",staticStyle:{"min-height":"80px","font-style":"oblique","font-size":"small"}},[e("span",[t._v('"'+t._s(a.review)+'" ')]),e("b-row",{staticClass:"d-inline"},[e("b-rating",{staticClass:"ml-5 bg-dark border-0",attrs:{inline:"",variant:"warning"},model:{value:a.rating,callback:function(e){t.$set(a,"rating",e)},expression:"r.rating"}}),e("span",{staticClass:"small disabled w-50 text-warning"},[t._v(" - "+t._s(a.username||a.email)+" ")])],1)],1)})),e("b-row")],2):t._e()],1)},i=[],r=a(3306),n={name:"TheatreView",async beforeMount(){try{const t=await fetch(this.appstore.api+"/theatre?id="+this.$route.params.id,{method:"GET",headers:this.appstore.getheader()});if(200===t.status){let e=await t.json();this.t=e,console.log(e)}else console.log(t.status,"Failed at Theatre")}catch(t){console.log("Failed at Theatre",t)}try{const t=await fetch(this.appstore.api+"/review?tid="+this.t.id,{method:"GET",headers:this.appstore.getheader()});if(200!==t.status)throw console.log(t.status,"Failed at TheatreList"),new TypeError("Token expired");{let e=await t.json();this.reviews=e}}catch(t){console.log("Failed at TheatreList",t)}},data(){return{t:{name:"323",place:"32",rating:3,comments:[]},reviews:{},appstore:(0,r.q)(),compo:!0}}},o=n,l=a(1001),c=(0,l.Z)(o,s,i,!1,null,null,null),d=c.exports}}]);
//# sourceMappingURL=708.7acc8bcd.js.map