<template>
	<div class="discover">
		<section class="disul">
			<ul>
				<li v-for="data in datalist">
					<div class="datalist-l">
						<p><strong>{{data.title}}</strong></p>
						<p>{{data.subtitle}}</p>
					</div>
					<img :src="disimg(data.main_pic_hash)"/>
				</li>
			</ul>
		</section>
		<section class="banner">
			<img src="https://fuss10.elemecdn.com/b/6d/656006edcd86033a1b32b23ddea37jpeg.jpeg?imageMogr/format/webp/" />
		</section>
		<section class="foodrec same-foodrec">
            <h3><span><em class="line-left"></em><u class="iconfont icon-good"></u><i>美食热推</i><em class="line-right"></em></span></h3>
            <p class="titeintro">你的口味我都懂得</p>
            <div class="foodul">
            	<a class="fooda" v-for="data,index in foodreclist" v-if="index>2?false:true">
            		<img :src="foodrec(data)"/>
            		<h4>{{dataname(data)}}</h4>
            		<p>¥{{dataprice(data)}}</p>
            	</a>
            </div>
            <div class="lookmore">
            	查看更多 >
            </div>
		</section>
		<section class="dayprice same-foodrec">
            <h3><span><em class="line-left"></em><u class="iconfont icon-discount"></u><i>天天特价</i><em class="line-right"></em></span></h3>
            <p class="titeintro">特价商品，一网打尽</p>
            <div class="foodul">
            	<a class="fooda" v-for="data,index in daypricelist" v-if="index>2?false:true">
            		<img :src="dayprice(data)"/>
            		<h4>{{dataname(data)}}</h4>
            		<p>¥{{dataprice(data)}} <s>¥{{originalprice(data)}}</s></p>
            	</a>
            </div>
            <div class="lookmore">
            	查看更多 >
            </div>
		</section>
		<section class="timegift same-foodrec">
            <h3><span><em class="line-left"></em><u class="iconfont icon-remind1"></u><i>限时好礼</i><em class="line-right"></em></span></h3>
            <p class="titeintro">金币换豪礼</p>
            <div class="foodul">
            	<a class="fooda" v-for="data,index in daypricelist" v-if="index>2?false:true">
            		<img :src="dayprice(data)"/>
            		<h4>{{dataname(data)}}</h4>
            		<p>¥{{dataprice(data)}} <s>¥{{originalprice(data)}}</s></p>
            	</a>
            </div>
            <div class="lookmore">
            	查看更多 >
            </div>
		</section>		
	</div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {

  name: 'discover',

  data () {
    return {
    	datalist:[],
    	foodreclist:[],
    	daypricelist:[]
    }
  },
  methods:{
  	disimg(url){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  	},
  	foodrec(data){
  		if(data.foods[0]){
  			var url=data.foods[0].image_hash;
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  		}
  	},
  	dayprice(data){
  		if(data.foods[0]){
  			var url=data.foods[0].image_path;
  			var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/`
  		}
  	},
  	originalprice(data){
  		if(data.foods[0]){
  			return data.foods[0].original_price;
  		}
  	},
  	dataname(data){
  		if(data.foods[0]){
  			return data.foods[0].name;
  		}else{
  			return "";
  		}
  	},
  	dataprice(data){
  		if(data.foods[0]){
  			return data.foods[0].price;
  		}else{
  			return "";
  		}
  	}
  },
  mounted(){
  	axios.get("/member/v1/discover?platform=1&block_index=0").then(res=>{
  		this.datalist=res.data[1];
  	});
  	axios.get("/hotfood/v1/guess/likes?latitude=30.274151&longitude=120.155151&offset=0&limit=10&columns=2&request_id=5b5c815f-d6e8-416c-9b3a-35fb94962601&tag_id=-1&extras=%5B%22activities%22%5D").then(res=>{
  		this.foodreclist=res.data;
  	});
  	axios.get("/shopping/v1/sale_list_index?type=special_food&latitude=30.274151&longitude=120.155151&params=%7B%7D").then(res=>{
  		this.daypricelist=res.data.query_list;
  	});
  	axios.get("/hotfood/v1/guess/likes?latitude=30.274151&longitude=120.155151&offset=0&limit=3&request_id=b55d6d0f-24cb-4fec-a4da-6649f6ee35e9&tag_id=-1&columns=1").then(res=>{
  		console.log(res.data);
  	});
  }
}
</script>

<style lang="scss" scoped>
.discover{
	background:#ededed;
}

.disul{
	background:#fff;
	ul{
		margin-top:.74rem;
		overflow: hidden;
		li{
			display:flex;
			justify-content:space-between;
			width:50%;
			float:left;
			padding:.25rem;
			box-sizing: border-box;
			border-bottom:.01rem solid rgba(0,0,0,.1);
			border-right:.01rem solid rgba(0,0,0,.1);
			img{
				width:.76rem;
				height:.76rem;
			}

		}
		.datalist-l{
			p{
				&:nth-child(1){
					font:.32rem "";
					color:rgb(245, 120, 93);
					margin-bottom:.2rem;
				}
				&:nth-child(2){
					font:.24rem "";
					color:#999;
				}
			}
		}
	}
}
.banner{
	font-size:0;
	padding:.2rem 0;
	display:block;
	img{
		width:100%;
	}
}

.line-left:before,.line-right:after{
			content:"";
			height:.01rem;
			width:.25rem;
			background:#333;
			display:inline-block;
			vertical-align: middle;
		}
		.line-left:after,.line-right:before{
			content:"";
			width:.1rem;
			height:.1rem;
			border-radius:50%;
			background:#333;
			display:inline-block;
			vertical-align: middle;
		}
.same-foodrec{
	background:#fff;
	font-size: 0;
	padding:.2rem 0;
	margin-bottom:.2rem;
	h3{
		text-align:center;
		i{
			font-style: normal;
			margin:0 .1rem;
		}
		u{
			text-decoration:none;
			color:red;
			margin-left:.1rem;
		}
		font:700 .3rem "";
	}
	.titeintro{
		font:.22rem "";
		text-align:center;
		margin-bottom:.12rem;
	}
	.foodul{
		padding:.2rem;
		box-sizing: border-box;
		.fooda{
			display:inline-block;
			width:33.3%;
			overflow:hidden;
			img{
				width:1.89rem;
				height:1.87rem;
			}
		}
		h4{
			font:.24rem/.5rem "";
			overflow:hidden;
			width:100%;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		p{
			font:.22rem/.3rem "";
			color:red;
			s{
				color:#333;
			}
		}
	}
	.lookmore{
		font:.24rem/.56rem "";
		text-align:center;
	}
}
.timegift{
	margin-bottom:.85rem;
}
</style>