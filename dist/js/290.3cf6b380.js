"use strict";(self["webpackChunkticketshow_vue"]=self["webpackChunkticketshow_vue"]||[]).push([[290],{290:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{"data-bs-theme":t.appstore.app_theme}},[e("MovieCard",{attrs:{m:t.m}}),e("b-button",{staticClass:"my-4 mx-4 btn-secondary border-0",on:{click:function(e){t.compo=!t.compo}}},[t._v(" "+t._s(t.compo?"Hide Reviews":"Show Review")+" ")]),e("b-button",{staticClass:"my-4 mx-4 btn-secondary border-0",on:{click:function(e){return t.appstore.open_review_modal(t.m.id,0)}}},[t._v("Add your review ")]),t.compo?e("div",[t._l(t.reviews,(function(s){return e("div",{key:s.id,staticClass:"card w-100 rounded-5 border-0 py-5 my-3",staticStyle:{"min-height":"80px","font-style":"oblique","font-size":"small"}},[e("span",[t._v('"'+t._s(s.review)+'" ')]),e("b-row",{staticClass:"d-inline"},[e("b-rating",{staticClass:"ml-5 border-0",attrs:{inline:"",variant:"warning"},model:{value:s.rating,callback:function(e){t.$set(s,"rating",e)},expression:"r.rating"}}),e("span",{staticClass:"small disabled w-50 text-danger"},[t._v(" - "+t._s(s.username||s.email)+" ")])],1)],1)})),e("b-row")],2):t._e()],1)},i=[],o=s(3306),r=s(708),n=s(490),c={name:"ShowView",computed:{app(){return n.Z}},components:{MovieCard:r.Z},data(){return{compo:!0,m:{},reviews:{},appstore:(0,o.q)()}},async beforeMount(){try{console.log("sid",this.$route.params.id);const t=await fetch(this.appstore.api+"/shows?id="+this.$route.params.id,{method:"GET",headers:this.appstore.getheader()});200===t.status?this.m=await t.json():console.log(t.status,"Failed at TheatreList")}catch(t){console.log("Failed at TheatreList",t)}try{const t=await fetch(this.appstore.api+"/review?sid="+this.m.id,{method:"GET",headers:this.appstore.getheader()});200===t.status?this.reviews=await t.json():console.log(t.status,"Failed at TheatreList")}catch(t){console.log("Failed at TheatreList",t)}}},l=c,d=s(1001),p=(0,d.Z)(l,a,i,!1,null,null,null),u=p.exports}}]);
//# sourceMappingURL=290.3cf6b380.js.map