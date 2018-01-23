<template>
<div>
	<header>
			<div class="header-l">
				<i class="iconfont icon-map"></i>
				<b>杭州市江干区九堡镇九和路7号</b>
				<em></em>
			</div>
			<div class="header-r">
				<div class="header-r-l">
					<p>{{weather.temperature}}°</p>
					<p>{{weather.description}}</p>
				</div>
				<img :src="weatherpic()"/>
			</div>
		</header><!-- /header -->
		<section class="search" ref="searchkey" :style="judge?fix:sta">
			<div class="search-child" ref="skip">
				<i class="iconfont icon-search"></i>
				<span>搜索商家、商品名称</span>
			</div>
		</section>
		<section class="keyword">			
	  		<div ref="mybox" class="keyword-child">
	  			<span v-for="data in keyword" @click="switchword(data.word)">
		  			{{data.word}}
	  			</span>
	  		</div>
		</section>
		<section class="banner">
			<img src="https://fuss10.elemecdn.com/1/4f/423cd895f75b33a0139470c435257png.png?imageMogr/format/webp/thumbnail/!750x210r/gravity/Center/crop/750x210/">
		</section>
		<section class="recom">
			<swipe class="my-swipe">
			  <swipe-item class="slide1">
			  		<a class="recom-a" v-for="data,index in recommon" v-if="index>7?false:true" @click="switchseller(data.name,data.link)">
			  			<div class="recom-img">
			  				<img :src="recimg(data.image_hash)"/>
			  			</div>
			  			<span>{{data.name}}</span>
			  		</a>
			  </swipe-item>
			  <swipe-item class="slide2">
			  		<a class="recom-a" v-for="data,index in recommon" v-if="index<8?false:true" @click="switchseller(data.name,data.link)">
			  			<div class="recom-img">
			  				<img :src="recimg(data.image_hash)"/>
			  			</div>
			  			<span>{{data.name}}</span>
			  		</a>
			  </swipe-item>
			</swipe>
		</section>
		<section class="activity">
			<div class="activity-t">
				<div class="activity-t-l activity-t-same">
					<h3>限量抢购</h3>
					<p>超值美味 9.9元起</p>
					<p><span>300人</span>正在抢 ></p>
					<img src="//fuss10.elemecdn.com/b/e1/0fa0ed514c093a7138b0b9a50d61fpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
				</div>
				<div class="activity-t-r activity-t-same">
					<h3>热卖套餐</h3>
					<p>销量最高，好评最多</p>
					<p>TOP 100 ></p>
					<img src="//fuss10.elemecdn.com/d/d4/16ff085900d62b8d60fa7e9c6b65dpng.png?imageMogr/format/webp/thumbnail/!240x160r/gravity/Center/crop/240x160/">
				</div>
			</div>
			<div class="activity-b">
				<div class="activity-b-l activity-b-same">
					<h3>天天特价</h3>
					<p><span>低至1折</span></p>
					<img src="//fuss10.elemecdn.com/5/06/ddb537220b8c56d4ef6ae22718984png.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">
				</div>
                <div class="activity-b-c activity-b-same">
					<h3>乐享鲜果</h3>
					<p><span>鲜果乐享7折</span></p>
					<img src="//fuss10.elemecdn.com/a/98/8010e87e876a7bf137597bf7fd324png.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">
				</div>
				<div class="activity-b-r activity-b-same">
					<h3>品质优选</h3>
					<p><span>尖货来袭</span></p>
					<img src="//fuss10.elemecdn.com/a/b5/dcb5bff74242e06b3c2efee1cbffcpng.png?imageMogr/format/webp/thumbnail/!232x154r/gravity/Center/crop/232x154/">
				</div>
			</div>
		</section>
		<section class="rec-seller">
			<h4>推荐商家</h4>
			<div class="seller-list" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
				<div class="seller-list-child" v-for="data in sellerlist" @click="sellerskip(data.id)">
					<div class="seller-list-t">
						<img :src="sellerimg(data.image_path)" class="sellerimg"/>
						<div class="img-right">
							<div class="img-right-t">
								<strong>{{data.name}}</strong>
								<span><i>{{supporta(data)}}</i><i>{{supportb(data)}}</i></span>
							</div>
							<div class="img-right-c">
								<span>评价{{data.rating}} 月售{{data.recent_order_num}}单</span>
								<span>{{delivery(data)}}</span>
							</div>
							<div class="img-right-b">
								<span>¥{{data.float_minimum_order_amount}}起送|配送费¥{{data.float_delivery_fee}}</span>
								<span><i>{{distance(data)}}</i>|{{data.order_lead_time}}分钟</span>
							</div>
						</div>
					</div>
					<div class="seller-list-b">
						<h3>
							<img :src="koubeiimg(data)"/>
							<span>{{koubei(data)}}</span>
						</h3>
						<em></em>
						<div class="seller-list-b-child">
							<div class="seller-list-bl">
								<p v-for="dataus,order in data.activities" v-if="order>1?noact(data.id):isact"><i>{{dataus.icon_name}}</i>{{dataus.description}}</p>
							</div>
							<div class="seller-list-br" @click.stop="activity(data.id)" v-if="data.activities.length>2?true:false">
								<span>{{data.activities.length}}</span>个活动
								<i :class="currentid!==data.id?'xiajian':'shangjian'"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="loadinfo">
			{{loadtext}}
		</section>
		<section>
			
		</section>
		
</div>		
</template>

<script>
import axios from "axios";
import router from "@/router";
import "vue-swipe/dist/vue-swipe.css"; 
import { Swipe, SwipeItem } from 'vue-swipe';
export default {
  name: 'home',
  data () {
    return {
    	weather:{},
    	imgurl:"",
    	initx:null,
    	recommon:[],
    	sellerlist:[],
    	koubeishow:true,
    	isrow:true,
    	isact:true,
    	loadtext:"正在加载......",
    	loading:false,
    	fix:"position:fixed;top:0;z-index:2;",
    	sta:"position:static;",
    	judge:false,
    	currentid:0,
    	linkinfo:""
    	
    }
  },
  methods:{
  	weatherpic(){
  		if(Object.keys(this.weather).length!=0){
  		var weather_image_hash=this.weather.image_hash.slice(0,1)+"/"+this.weather.image_hash.slice(1,3)+"/"+this.weather.image_hash.slice(3)
  		this.imgurl=`//fuss10.elemecdn.com/${weather_image_hash}.png?imageMogr/format/webp/thumbnail/!69x69r/gravity/Center/crop/69x69/`
  		return this.imgurl
  		}
  	},
  	recimg(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!90x90r/gravity/Center/crop/90x90/`
  	},
  	sellerimg(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
  	},
  	supporta:function(data){
  		return data.supports[0]?data.supports[0].icon_name:""
  	},
  	supportb:function(data){
  		return data.supports[1]?data.supports[1].icon_name:""
  	},
  	delivery:function(data){
  		return data.delivery_mode?data.delivery_mode.text:""
  	},
  	distance:function(data){
  		if(data.distance>1000){
  			return (data.distance/1000).toFixed(2)+"km"
  		}else{
  			return data.distance+"m"
  		}
  	},
  	koubei:function(data){
  		return data.recommend?data.recommend.reason:"";
  	},
  	koubeiimg:function(data){
  		if(data.recommend.image_hash){
  			var image_path=data.recommend.image_hash.slice(0,1)+"/"+data.recommend.image_hash.slice(1,3)+"/"+data.recommend.image_hash.slice(3)+"."+data.recommend.image_hash.slice(32)
  		return `//fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!60x60r/gravity/Center/crop/60x60/`
  	}else{
  		this.koubeishow=false;
  		return ""
  	}	
  	},
  	activity:function(id){
  		if(this.currentid!=id){
  			this.isrow=!this.isrow;
  			this.currentid=id;
  		}else{
  			this.currentid=0;
  		}
  		
  	},
  	noact:function(id){
  		if(this.currentid!=id){
  			return false;
  		}else{
  			return true;
  		}
  	},
  	bodyscroll:function(){
  		var scrolltop=document.documentElement.scrollTop||document.body.scrollTop;
  		if(scrolltop>76){
  			this.judge=true;
  		}else{
  			this.judge=false;
  		}
  	},
  	sellerskip:function(id){
  		window.removeEventListener("scroll",this.bodyscroll,false);
  		router.push("/seller?id="+id);
  	},
  	loadMore(){
  		this.offset+=20;
  		axios.get(`/shopping/restaurants?latitude=30.274151&longitude=120.155151&offset=${this.offset}&limit=20&extras[]=activities&extra_filters=home&terminal=h5`).then(res=>{
  		if(res.data.length!=0){
  			this.sellerlist=[...this.sellerlist,...res.data];
  		}else{
  			this.loadtext="加载完成"
  			this.loading=true;
  		}
  	})
  	},
  	switchword(key){
  		router.push("/search/shop?keyword="+key)
  	},
  	switchseller(name,linkdata){
  		var linkd=decodeURIComponent(linkdata);
  		var category_ids;
  		if(linkd.split("?")[1].split("&")[1].split("=")[0]=="target"){
  			category_ids=JSON.parse(linkd.split("?")[1].split("&")[1].split("=")[1]).restaurant_category_id.join(",");
  		}else if(linkd.split("?")[1].split("&")[2].split("=")[0]=="target"){
  			if(JSON.parse(linkd.split("?")[1].split("&")[2].split("=")[1]).restaurant_category_id){
  				category_ids=JSON.parse(linkd.split("?")[1].split("&")[2].split("=")[1]).restaurant_category_id.join(",");
  			}else{
  				category_ids=""
  			}
  		}else{
  			category_ids=""
  		}
  		router.push("/kindlist?target_name="+name+"&restaurant_category_ids="+category_ids)
  	}
  },
  mounted(){
  	axios.get("/bgs/weather/current?latitude=30.274151&longitude=120.155151").then(res=>{
  		this.weather=res.data;
  	});
  	if(!this.$store.state.keywordlist){
  		this.$store.dispatch("getkeyword","/shopping/v3/hot_search_words?latitude=30.274151&longitude=120.155151")
  	};
  	axios.get("/shopping/v2/entries?latitude=30.274151&longitude=120.155151&templates[]=main_template").then(res=>{
  		this.recommon=res.data[0].entries;
  	});
  	axios.get("/shopping/restaurants?latitude=30.274151&longitude=120.155151&offset=0&limit=20&extras[]=activities&extra_filters=home&terminal=h5").then(res=>{
  		this.sellerlist=res.data?res.data:[];
  	
  	});
  	var that=this;
  	if(window.location.pathname=="/common/home"){
  		window.addEventListener("scroll",that.bodyscroll,false);
  	}
  	this.$refs.skip.onclick=function(){
  		window.removeEventListener("scroll",that.bodyscroll,false);
  		router.push("/search");
  	}
  	
  },
  computed:{
  	keyword:function(){
  		return this.$store.state.keywordlist;
  	},
  	
  },
  components:{
  	swipe:Swipe,
  	"swipe-item":SwipeItem
  }
}
</script>
<style lang="scss" scoped>
header{
	background:#0085ff;
	height:.76rem;
	display:flex;
	justify-content: space-between;
	.header-l{
		font:.16rem/.76rem "";
		margin-left:.05rem;
		color:#fff;
		i,b,em{
			display:inline-block;
			vertical-align: middle;	
		}
		b{
			width:2.83rem;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
		em{
			border:.08rem solid #fff;
			border-left:.08rem solid transparent;
			border-right:.08rem solid transparent;
			border-bottom:.08rem solid transparent;
		}
	}
	.header-r{
		color:#fff;
		display:flex;
		margin-right:.15rem;
		.header-r-l{
			font:.09rem/.12rem "";
			p{
				margin-top:.15rem;
				text-align:center;
			}

		}
		img{
				width:.36rem;
				height:.46rem;
				margin-top:.15rem;
			}
	}
}
.search{
	width:100%;
	box-sizing: border-box;
	background:#0085ff;
	padding:.22rem;
	.search-child{
		width:100%;
		height:.61rem;
		background:#fff;
		margin:0 auto;
		text-align:center;
		font:.20rem/.61rem "";
		i{
			font-size:.1rem;
		}
	}
}

.keyword{
	background:#0085ff;
	padding:.05rem .22rem;
	span{
		color:#fff;
	}
}
.keyword-child{
	width:100%;
	color:#fff;
	white-space: nowrap;
    overflow-x: auto;
    &::-webkit-scrollbar{
    	height:0;
    	width:0;
    }
	font:.26rem/.61rem "";
	height:.61rem;
}
.banner{
	display:block;
	img{
		width:100%;
	}
}
.recom{
	padding:0 .2rem;
	.my-swipe {
	  height:2.8rem;
	  width:100%;
	  font-size:.3rem;
	}
	.recom-a{
		display:inline-block;
		width:25%;
		text-align:center;
		.recom-img{
			font-size:0;
			width:.64rem;
			height:.64rem;
			margin:0 auto;
			img{
				width:100%;
				height:100%;
			}
		}
		span{
			display:block;
			font:.22rem "";
			color:#666;
			margin-top:.2rem;
		}
}
}
.activity{
	padding:0 .3rem;
	.activity-t,.activity-b{display:flex;}
	.activity-t-same{
		width:50%;
		padding-top:.2rem;
		padding-left:.2rem;
		&:nth-child(1){
					margin-right:.05rem;
				}
		background:#f4f4f4;
		h3{
			font:.34rem "";
			color:red;
		}
		p{
			&:nth-child(2){
				font:.26rem "";
				color:#666;
			}
		}
		p{
			&:nth-child(3){
				font:.24rem "";
				color:#666;
				span{color:red;}
			}
		}
		img{
			widht:2.04rem;
			height:1.36rem;
		}
	}
	.activity-b-same{
		margin-top:.05rem;
		width:33%;
		margin-right:.05rem;
		background:#f4f4f4;
		h3{
			font:700 .32rem "";
			text-align:center;
			margin-top:.15rem;
		}
		p{
			font:.16rem "";
			text-align:center;
			margin-top:.15rem;
			color:#666;
			span{
				border:1px solid #666;
				padding:.05rem;
			}
		}
		img{
			width:1.8rem;
			height:1.3rem;
		}
	}
}
.rec-seller{
	i{
		font-style: normal;
	}
	b{
		font-weight: 100;
	}
	border-top:.2rem solid #f4f4f4;
	margin-top:.3rem;
	padding:.1rem .3rem;
	h4{
		font:700 .3rem "";
		margin:.2rem 0;
	}
	.seller-list-t{
		width:100%;
		display:flex;
		.sellerimg{
			width:1.1rem;
			height:1.1rem;
			margin-right:.2rem;
		}
		.img-right{
			width:100%;
		}
		.img-right-t,.img-right-c,.img-right-b{
			width:100%;
		    display:flex;
		    justify-content:space-between;
		    margin-bottom:.1rem;
		}
		.img-right-t{
			font:.3rem "";
			strong{
				display:inline-block;
				width:3.5rem;
				overflow:hidden;
				white-space: nowrap;
				text-overflow:ellipsis;
			}
			span{
				display:inline-block;
				font:.22rem "";
				i{	
					margin-right:.1rem;
				}
			}
		}
		.img-right-c{
			font:.2rem "";
			color:#666;
			font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
			span{
				&:nth-child(2){
					background:#0085ff;
					color:#fff;
				}
			}
		}
		.img-right-b{
			font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
			font:.2rem "";
		}
	}
	.seller-list-b{
		margin:0 0 .15rem 1.3rem;
		font-size:0;
		padding:.1rem 0;

		h3{
			font:.22rem "";
			margin-bottom:.1rem;
			img{
				width:.17rem;
				height:.17rem;
			}
		}
		em{
			display:inline-block;
			width:100%;
			border-bottom:.02rem solid rgb(204, 204, 204);
			margin-bottom:.1rem;
		}
		.seller-list-b-child{
			width:100%;
		    display:flex;
		    justify-content:space-between;
		    margin-top:.1rem;
		}
		.seller-list-bl{
			width:3.4rem;
			p{
				margin:.03rem 0;
				i{
					margin-right:.1rem;
					padding:.01rem;
					background:rgb(240, 115, 115);
					color:#fff;
				}
				&:nth-child(1){
					i{
						background:rgb(112, 188, 70);
					}
					}
			}
			font:.22rem "";
		}
		.seller-list-br{
			font:.22rem "";	
			.xiajian{
				display:inline-block;
				border:.05rem solid #000;
				border-right:.05rem solid transparent;
				border-bottom:.05rem solid transparent;
				border-left:.05rem solid transparent;
			}
			.shangjian{
				display:inline-block;
				border:.05rem solid #000;
				border-right:.05rem solid transparent;
				border-top:.05rem solid transparent;
				border-left:.05rem solid transparent;
			}
		}
	}
}
.loadinfo{
	font:.3rem "";
	text-align:center;
	color:red;
	margin-bottom:.9rem;
}

</style>






<!-- 定位接口   https://restapi.ele.me/bgs/poi/reverse_geo_coding?latitude=30.274151&longitude=120.155151 -->

