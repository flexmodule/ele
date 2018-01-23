<template>
	<div>
		<header>
			<div class="header-l">
			    <router-link to="/" tag="div">
				  <i class="iconfont icon-back"></i>
				</router-link>
			</div>
			<div class="header-c">
				<em class="iconfont icon-search"></em>
				<input type="text" placeholder="输入商家、商品名称" @input="inputdata()" v-model="searchkey">
			</div>
			<div class="header-r">
				<input type="button" value="搜索" @click="handleclick(searchkey)">
			</div>
	    </header>
	    <section v-if="isshow" class="keyword-search">
	    	<div class="history-search h-search">
	    		<h3><strong>历史搜索</strong><i class="iconfont icon-delete"></i></h3>
	    		<div class="keyword">
	    			<ul>
	    				
	    			</ul>
	    		</div>
	    	</div>
	    	<div class="hot-search h-search">
	    		<h3><strong>热门搜索</strong></h3>
	    		<div class="keyword">
	    				<span v-for="data in keyword" @click="handleclick(data.word)">{{data.word}}</span>
	    		</div>
	    	</div>
	    </section>
	    <router-view></router-view>
	</div>
</template>

<script>
import router from "@/router";
export default {
  name: 'search',
  data () {
    return {
    	isshow:true,
    	searchkey:"",
    }
  },
  mounted(){
  	if(!this.$store.state.keywordlist){
  		this.$store.dispatch("getkeyword","/shopping/v3/hot_search_words?latitude=30.274151&longitude=120.155151")
  	};
  	if(Object.keys(this.$route.query).length!=0){
  		this.searchkey=this.$route.query.keyword;
  		this.isshow=false;
  	};
  	console.log(window.location.pathname)
  },
  computed:{
  	keyword:function(){
  		return this.$store.state.keywordlist;
  	}
  },
  methods:{
  	handleclick(word){
  		this.isshow=false;
  		this.searchkey=word;
  		router.push("/search/shop?keyword="+encodeURIComponent(word))
  	},
  	inputdata(){
  		if(Object.keys(this.$route.query).length!=0){
  		router.push("/search");
  		this.isshow=true;
  	};
  	}
  }
}
</script>

<style lang="scss" scoped>
header{
	 width:100%;
	position:fixed;
    top:0;
    box-sizing: border-box;
	display:flex;
	justify-content:space-between;
background:#fff;
height:.7rem;
padding:.2rem .2rem 0 .1rem;
font-size: 0;
.header-l{
	padding:.02rem;
	i{
		display:inline-block;
		width:.19rem;
		height:.38rem;
		margin-top:.05rem;
		font:.38rem "";
	}
}
.header-c{
	width:3.8rem;
	background:#f8f8f8;
	padding:.1rem;
	em{
		display:inline-block;
		width:.24rem;
		height:.18rem;
		font:.18rem "";
	}
	input{
		border:0;
		width:3.56rem;
		background:#f8f8f8;
		&:focus{
			outline:none;
	}
}
}
.header-r{
	input{
		border:0;
		background:none;
		font:700 .24rem "";
		margin-top:.1rem;
		outline:none;
	}
}
}
.clear{
	clear:both;
}
.keyword-search{
		margin-top:.7rem;
		border-top:.01rem solid #fff;
}
.h-search{
	padding:.2rem .3rem;
	h3{
		font:.22rem/.24rem "";
	}
	.keyword{
		font-size:0;
		span{
			list-style:none;
			border-radius:.02rem;
			background:#f7f7f7;
			display:inline-block;
			padding:.15rem;
			font:.22rem "";
			margin:.2rem .2rem 0 0;
		}
	}
}
.history-search{
	display:none;
	h3{
		display:flex;
		justify-content:space-between;
		i{
			font:.1rem "";
		}
	}
}
</style>