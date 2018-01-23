<template>
	<div>
		<header>
			<div class="header-t">
				<router-link to="/" tag="div">
				<i class="iconfont icon-back"></i>
				</router-link>
			</div>
			<div class="header-c">
				<div class="header-c-l">
					<img :src="sellerimg(seller.image_path)"/>
				</div>
				<div class="header-c-r">
					<h3><strong>{{seller.name}}</strong></h3>
					<p><span>{{delivery(seller.delivery_mode)}}</span>/<span>{{seller.order_lead_time}}分钟送达</span>/<span>配送费¥{{seller.float_delivery_fee}}</span></p>
					<p>公告：{{seller.promotion_info}}</p>
				</div>
			</div>
			<div class="header-b">
				<span><i>{{activitytitle(seller.activities)}}</i>{{activity(seller.activities)}}</span>
				<span @click="floatingup()">{{activitylength(seller.activities)}}个活动<i></i></span>
			</div>
			<div class="shopcar">
				<i class="iconfont icon-cart"></i>
			</div>
		</header>
		<transition name="fade">
		<section class="activity" v-if="actisshow">
			<div class="activity-t">
				{{seller.name}}
			</div>
			<div class="activity-c activity-same">
				<div class="activity-same-c">
					<span>优惠信息</span>
				</div>
				<p v-for="data in seller.activities"><i>{{actinfo(data).icon_name}}</i>{{actinfo(data).description}}</p>
			</div>
			<div class="activity-b activity-same">
				<div class="activity-same-c">
					<span>商家公告</span>
				</div>
				<p>{{seller.promotion_info}}</p>
			</div>
			<div class="act-close">
				<i class="iconfont icon-close" @click="floatingdown()"></i>
			</div>
		</section>
		</transition>
		<section>
			<ul  class="nav">
				<li class="foods">
					<span class="active">商品</span>
				</li>
				<li class="ratings">
					<span>评价</span>
				</li>
				<li class="store">
					<span>店铺</span>
				</li>
			</ul>	
		</section>
	</div>
</template>

<script>
import axios from "axios";
export default {

  name: 'seller',

  data () {
    return {
    	seller:{},
    	sellerlogo:"",
    	actisshow:false
    }
  },
  mounted(){
  	axios.get(`/shopping/restaurant/${this.$route.query.id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=30.274151&longitude=120.155151`).then(res=>{
  	 	console.log(res.data);
  	 		this.seller=res.data?res.data:{};	
  });
  	axios.get(`/ugc/v2/restaurants/153959092/ratings?has_content=true&offset=0&limit=10`).then(res=>{
  	 	console.log(res.data);
  })
  },
  methods:{
  	sellerimg:function(url){
  		if(url){
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
  	}else{
  		return ""
  	}	
  	},
  	delivery:function(data){
  		return data?(data.text?data.text:""):""
  	},
  	activitytitle:function(data){
  		return data?(data[0]?data[0].icon_name:""):"";
  	},
  	activity:function(data){
  		return data?(data[0]?data[0].description:""):"";
  	},
  	activitylength:function(data){
  		return data?(data.length?data.length:""):""
  	},
  	actinfo:function(data){
  		return data?data:""
  	},
  	floatingup:function(){
  		this.actisshow=true;
  	},
  	floatingdown:function(){
  		this.actisshow=false;
  	}
  }
}
</script>

<style lang="scss" scoped>
header{
	font-size:0;
	padding:.1rem .2rem; 
	background:#6e6776;
	position:relative;
	.header-t{
		padding-bottom:.1rem;
		color:#fff;
		i{
			display:inline-block;
			color:#fff;
			font:.42rem "";
		}
	}
	.header-c{
		padding-top:.1rem;
		display:flex;
		color:#fff;
	}
	.header-c-l{
		margin-right:.2rem;
		img{
			width:1.12rem;
			height:1.12rem;
		}
	}
	.header-c-r{
		width:100%;
		overflow: hidden;
		-ms-text-overflow: ellipsis;
		white-space: nowrap;
		h3{
			font:.33rem "";
		}
		p{
			font:.21rem "";
			margin:.1rem 0;
			&:nth-child(2){
				span{
					margin:0 .04rem;
				}
			}
		}
	}
	.header-b{
		padding-top:.1rem;
		width:100%;
		display:flex;
		justify-content:space-between;
		span{
			&:nth-child(1){
				i{
			font-style:normal;
			padding:.02rem;
			background:rgb(112, 188, 70);
			margin-right:.1rem;
		}
			}
		}
		span{
			&:nth-child(2){
				i{
			font-style:normal;
			display:inline-block;
			border:.05rem solid #fff;
			border-top:.05rem solid transparent;
			border-right:.05rem solid transparent;
			border-bottom:.05rem solid transparent;
			margin-left:.1rem;
		}
			}
		}
		font:.22rem/.3rem "";
		color:#fff;
	}
	.shopcar{
		position:absolute;
		top:.1rem;
		right:.2rem;
		font:.35/.35rem "";
		color:#fff;
	}
	
}
.activity{
		position:absolute;
		padding:.6rem .5rem 1rem .5rem;
		box-sizing: border-box;
		top:0;
		left:0;
		color:#fff;
		z-index:2;
		width:100%;
		height:100%;
		background:#262626;
		.activity-t{
			font:.43rem/.43rem "";
			text-align:center;
		}
		.activity-same{
			margin:.5rem 0 .5rem 0;
			font-size:0;
			border-top:.02rem solid #555;
			i{
				font-style:normal;
			}
		}
		.activity-c{
			p{
				font:.18rem "";
				margin:.2rem 0;
				i{
					padding:.02rem;
					margin-right:.1rem;
					background:rgb(240, 115, 115);
				}
				&:nth-child(2){
					i{
						background:rgb(112, 188, 70);
					}
					
				}
			}
			
		}
		.activity-same-c{
				text-align:center;
				margin-bottom:.4rem;
				span{
				display:inline-block;
				font:.2rem "";
				margin:0 auto;
				padding:.1rem;
				background:#262626;
				border:.01rem solid #555;
				border-radius:.5rem;
				margin-top:-1rem;
			}
			}

		.activity-b{
			p{
			font:.26rem "";	
			}
		}
		.act-close{
			i{
				display:inline-block;
				width:.76rem;
			font:.6rem/.76rem "";
			color:#fff;
			border:.01rem solid #555;
			border-radius:50%;
			}
			position:absolute;
			text-align:center;
			bottom:.3rem;
			left:0;
			right:0;
			margin:auto;
		}
	}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.nav{
	font:.29rem/.69rem "";
	display:flex;
	list-style:none;
	border-bottom: .01rem solid #ddd;
	.foods,.ratings,.store{
		flex:1;
		text-align:center;
		span{
			display:inline-block;
			height:.64rem;
		}
		.active{
			color:#3190e8;
			border-bottom:.02rem solid #3190e8;
		}
	}
}
</style>