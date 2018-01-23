<template>
<div>
	<header id="header">
		<i class="iconfont icon-back" @click="handleclick"></i>
		<span>{{this.titlename}}</span>
	</header>
	<section class="nav">
		<div class="nav-l">
			<span>分类</span>
			<em></em>
		</div>
		<div class="nav-c">
			<span>排序</span>
			<em></em>
		</div>
		<div class="nav-r">
			<span>筛选</span>
			<em></em>	
		</div>
	</section>
	<section class="rec-seller">
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
</div>


</template>

<script>
import axios from "axios";
import router from "@/router";
export default {

  name: 'kindlist',

  data () {
    return {
    	sellerlist:[],
    	titlename:"",
    	currentid:0,
    	isact:true,
    }
  },
  mounted(){
  	console.log(this.$route.query.target_name);
  	this.titlename=this.$route.query.target_name;
  	var idarr=this.$route.query.restaurant_category_ids?this.$route.query.restaurant_category_ids.split(","):[];
  	var idstr=""
  	for(var i=0;i<idarr.length;i++){
  		idstr+="&restaurant_category_ids[]="+idarr[i];
  	}
  	console.log(idstr)
  	axios.get(`/shopping/restaurants?latitude=30.274151&longitude=120.155151&keyword=&offset=0&limit=20&extras[]=activities&extras[]=tags&terminal=h5&brand_ids[]=${idstr}`).then(res=>{
  		console.log(res.data)
  		this.sellerlist=res.data;
  	});
  },
  methods:{
  	handleclick(){
  		router.push("/");
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
  }
}
</script>

<style lang="scss" scoped>
#header{
	position:fixed;
	top:0;
	width:100%;
	background:#0af;
	font:700 .25rem/.74rem "";
	color:#fff;
	text-align:center;
	i{
		position:absolute;
		left:.2rem;
	}
}
.nav{
	display:flex;
	width:100%;
	position:fixed;
	top:.74rem;
	background:#fff;
	border-bottom:.01rem solid rgba(0,0,0,.1);
	.nav-l,.nav-c,.nav-r{
		font:.25rem/.68rem "";
		flex:1;
		text-align:center;
		em{
			border:.1rem solid #000;
			border-left:.1rem solid transparent;
			border-right:.1rem solid transparent;
			border-bottom:.1rem solid transparent;
			display:inline-block;
			vertical-align: middle;
		}
	}
}
.rec-seller{
	margin-top:1.52rem;
	i{
		font-style: normal;
	}
	b{
		font-weight: 100;
	}
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
</style>


