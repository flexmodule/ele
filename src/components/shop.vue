<template>

<div>
	<header>
		<div class="header-l">
			<span>分类</span>
			<em></em>
		</div>
		<div class="header-c">
			<span>排序</span>
			<em></em>
		</div>
		<div class="header-r">
			<span>筛选</span>
			<em></em>	
		</div>
	</header>
	<section v-if="keylistshow" class="listkey">
		<div class="keylist">
			<a>{{keyfirst.name}}</a>
			<a v-for="data,index in keylist" @click="selectkey(data.name,index)" :class="currentindex==index?blue:''">{{data.name}}</a>
		</div>
	</section>
	<section v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10" infinite-scroll-immediate-check="false" class="datalist" ref="listdata">
		<div class="datalist-child" v-for="data,bigindex in restaurant" @click="sellerskip(data.restaurant.id)">
			<div class="datalist-t">
				<img :src="reslogo(data.restaurant.image_path)">
				<div class="datalist-t-r">
					<div class="datalist-t-rt">
						<p><strong>{{data.restaurant.name}}</strong></p>
						<span>{{delivery(data)}}</span>
					</div>
					<div class="datalist-t-rb">
						<p><span>评价{{data.restaurant.rating}}</span>|<span>起送费¥{{data.restaurant.float_minimum_order_amount}}</span>|<span>配送费¥{{data.restaurant.float_delivery_fee}}</span></p>
						<p><span>{{distance(data)}}</span>|<span>{{time(data)}}分钟</span></p>
					</div>
				</div>
		    </div>
			<div class="datalist-b">
				<ul>
					<li v-for="dataus,index in data.foods" v-if="index>1?isnone(data.restaurant.id):isexp">
						<img class="foodimg" :src="foodimg(dataus.image_path)" alt="">
						<div class="img-right">
							<p>{{dataus.name}}</p>
							<p><span>月售{{dataus.month_sales}}份</span><span>好评率{{dataus.satisfy_rate}}</span></p>
							<p>¥{{dataus.price}}</p>
						</div>
					</li>
				</ul>
				<div class="openmore" @click.stop="openmore(data.restaurant.id)" v-if="data.foods.length>2?isShow:isDis">
					<span>展开更多商品<strong>{{morenum(data.foods.length)}}</strong>个</span><i :class="currentid!==data.restaurant.id?'iconfont icon-moreunfold':'iconfont icon-less'"></i>
				</div>
			</div>
		</div>
	</section>
	<section class="loadinfo">
		<span>{{loadtext}}</span>
	</section>
</div>

</template>

<script>
import router from "@/router";
import axios from "axios";
export default {

  name: 'shop',

  data () {
    return {
    	searchdata:null,
    	imgurl:"",
    	restaurant:[],
    	isshow:true,
    	isexp:true,
    	isShow:true,
    	isDis:false,
    	loading:false,
    	offset:0,
    	keylistshow:true,
    	loadtext:"正在加载中.....",
    	currentid:0,
    	isx:false,
    	selectkeydata:"",
    	currentindex:0,
    	blue:""
    }
  },
  mounted(){
  	if(this.$route.query.keyword){
  		axios.get(`/shopping/v2/restaurants/search?offset=0&limit=20&keyword=${this.$route.query.keyword}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
  			if(res.data.inside){
  				if(res.data.inside[0]){
  					this.searchdata=res.data.inside[0];
  				}else{
  					this.searchdata=res.data.inside[3];
  				}
  			}
  		this.restaurant=this.searchdata?this.searchdata.restaurant_with_foods:[]
  		console.log(res.data.inside)
  		console.log(this.searchdata.filter.single)  
  		console.log(this.searchdata.restaurant_with_foods)
  		if(this.searchdata){
  			if(this.searchdata.filter.multi){
  				this.keylistshow=true;
  			}else{
  				this.keylistshow=false;
  				this.$refs.listdata.style.marginTop="1.38rem";
  			}
  		}else{
  			this.keylistshow=false;
  			this.$refs.listdata.style.marginTop="1.38rem";
  		}	
  	})
  	};
  },
  methods:{
  	reslogo(url){
  		if(this.restaurant.length!=0){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/64x/`
  		}else{
  			return ""
  		}
  	},
  	foodimg(url){
  		if(this.restaurant.length!=0){
  		var image_path=url.slice(0,1)+"/"+url.slice(1,3)+"/"+url.slice(3)+"."+url.slice(32)
  		return `https://fuss10.elemecdn.com/${image_path}?imageMogr/format/webp/thumbnail/128x/`
  		}else{
  			return ""
  		}
  	},
  	delivery(txt){
  		return txt.restaurant.delivery_mode?txt.restaurant.delivery_mode.text:""
  	},
  	distance(data){
  		if(data.restaurant.distance>1000){
  			return (data.restaurant.distance/1000).toFixed(2)+"km"
  		}else{
  			return data.restaurant.distance+"m"
  		}
  	},
  	time(data){
  		return data.restaurant.order_lead_time+4
  	},
  	openmore(id){
  		if(this.currentid!=id){
  			this.isshow=!this.isshow;
  			this.currentid=id;
  		}else{
  			this.currentid=0;
  		}	
  	},
  	isnone(id){
  		if(id!=this.currentid){
  			return false;
  		}else{
  			this.isx=true;
  			return this.isx;
  		}
  	},
  	morenum(data){
  		if(data>2){
  			return data-2
  		}else{
  			return data
  		}
  	},
  	sellerskip(id){
  		router.push("/seller?id="+id);
  	},
  	selectkey(key,index){
  		this.currentindex=index;
  		this.selectkeydata=encodeURIComponent(key);
  		axios.get(`/shopping/v2/restaurants/search?offset=${this.offset}&limit=20&keyword=${this.$route.query.keyword}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&tags[]=${this.selectkeydata}`).then(res=>{
  			if(res.data.inside){
  				if(res.data.inside[0]){
  					this.searchdata=res.data.inside[0];
  				}else{
  					this.searchdata=res.data.inside[3];
  				}
  			}
  			this.restaurant=this.searchdata?this.searchdata.restaurant_with_foods:[]
  			if(this.searchdata){
  			if(this.searchdata.filter.multi){
  				this.keylistshow=true;
  			}else{
  				this.keylistshow=false;
  				this.$refs.listdata.style.marginTop="1.38rem";
  			}
  		}else{
  			this.keylistshow=false;
  			this.$refs.listdata.style.marginTop="1.38rem";
  		}
  		})
  	},
  	loadMore(){
  // delivery_mode[]=1&tags[]=%E9%9F%AD%E8%8F%9C
  		this.offset+=20;
  		if(this.$route.query.keyword){
  			if(this.selectkey==""){
  					axios.get(`/shopping/v2/restaurants/search?offset=${this.offset}&limit=20&keyword=${this.$route.query.keyword}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`).then(res=>{
  					if(Object.keys(res.data.inside).length!=0){
  						if(res.data.inside[0]){
  							this.searchdata=res.data.inside[0];
  						}else if(res.data.inside[3]){
  							this.searchdata=res.data.inside[3];
  						}else{
  							this.searchdata=res.data.inside[1];
  						}
  					}else{
  						this.loadtext="加载完成"
  						this.loading=true;
  					}
  					this.restaurant=[...this.restaurant,...this.searchdata.restaurant_with_foods]
  				})
  			}else{
  					axios.get(`/shopping/v2/restaurants/search?offset=${this.offset}&limit=20&keyword=${this.$route.query.keyword}&latitude=30.274151&longitude=120.155151&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5&tags[]=${this.selectkeydata}`).then(res=>{
  					if(Object.keys(res.data.inside).length!=0){
  						if(res.data.inside[0]){
  							this.searchdata=res.data.inside[0];
  						}else if(res.data.inside[3]){
  							this.searchdata=res.data.inside[3];
  						}else{
  							this.searchdata=res.data.inside[1];
  						}
  					}else{
  						this.loadtext="加载完成"
  						this.loading=true;
  					}
  					this.restaurant=[...this.restaurant,...this.searchdata.restaurant_with_foods]
  				})
  			}
  	}
  	}
  },
  computed:{
  	keylist(){
  		if(this.searchdata){
  			if(this.searchdata.filter.single){
  				return this.searchdata.filter.single
  			}else{
  				this.keylistshow=false;
  				return []
  			}
  		}else{
  			this.keylistshow=false;
  			return []
  		}

  	},
  	keyfirst(){
  		if(this.searchdata){
  			if(this.searchdata.filter.multi){
  				return this.searchdata.filter.multi[0]
  			}else{
  				this.keylistshow=false;
  				return []
  			}
  		}else{
  			this.keylistshow=false;
  			return []
  		}
  	},
  	datalist(){
  		return this.searchdata?this.searchdata.restaurant_with_foods:[]
  	},
  }
}
</script>

<style lang="scss" scoped>
header{
	display:flex;
	width:100%;
	position:fixed;
	top:.7rem;
	background:#fff;
	.header-l,.header-c,.header-r{
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
.listkey{
	padding:.2rem;
	position:fixed;
	top:1.38rem;
	width:100%;
	box-sizing: border-box;
	background:#fff;
}
.keylist{
	font:.22rem/.56rem "";
	height:.56rem;
	display: block;
	width:100%;
    white-space: nowrap;
    overflow-x: auto;
    &::-webkit-scrollbar{
    	height:0;
    	width:0;
    }
    .blue{
    	color:#118dff;
    }
	a{
		display:inline-block;
		background:#f7f7f7;
		margin-right:.2rem;
		padding:0 .2rem;
		font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
	}
}
.datalist{
	margin-top:2.5rem;
	padding:.1rem .2rem;
	.datalist-t{
		display:flex;
		padding:.15rem 0;
		border-bottom:.01rem solid rgba(0,0,0,.1);
		img{
			width:.54rem;
			height:.54rem;
			margin-right:.1rem;
		}
	}
	.datalist-t-r{width:100%;}
	.datalist-t-rt{
		display:flex;
		justify-content:space-between;
		p{
			font:100 .24rem "";
		}
		span{
			display:inline-block;
			font-size:.2rem;
			text-align:center;
			color:#fff;
			background:#0085ff;
		}
	}
	.datalist-t-rb{
		display:flex;
		justify-content:space-between;
		p{
			font:400 .22rem "";
			color:#666;
		    font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
		    span{
		    	margin:0 .05rem;
		    }
		}
	}


	.datalist-b{
		li{
			display:flex;
			font-family: 'Helvetica Neue',Tahoma,Arial,PingFangSC-Regular,'Hiragino Sans GB','Microsoft Yahei',sans-serif;
			width:100%;
			font:.26rem "";
			padding:.15rem 0;
			border-bottom:.01rem solid rgba(0,0,0,.1);
			p{
				&:nth-child(2){
					font:.22rem "";
					color:#666;
				}
			}
			p{
				&:nth-child(3){
					font:.26rem "";
					color:red;
					margin-top:.2rem;
				}
			}
			.foodimg{
			width:1.08rem;
			height:1.08rem;
			margin-right:.2rem;
		}
		}
	}
	.openmore{
		text-align:center;
		font:.22rem/.7rem "";
		i{
			display:inline-block;
			vertical-align: middle;
		}
	}
}
.loadinfo{
	font:.4rem "";
	text-align:center;
	color:red;
}
</style>