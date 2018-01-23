<template>

<div class="common">			
				<header id="header" v-if="isshow()">
					<i class="iconfont icon-back" @click="handleclick"></i>
					<span>{{title()}}</span>
				</header>
				<router-view></router-view>
	            <footer>
				<ul class="footul">
					<li v-for="data in foottext">
						<router-link :to="data.roulink" tag="div" active-class="active">
							<i :class="data.icon"></i>
							<span>{{data.navtext}}</span>
						</router-link>
					</li>
				</ul>
			</footer>
</div>

	
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {

  name: 'common',

  data () {
    return {
    	foottext:[{icon:'iconfont icon-operation',navtext:"外卖",roulink:"/common/home"},{icon:'iconfont icon-compass',navtext:"发现",roulink:"/common/discover"},{icon:'iconfont icon-form',navtext:"订单",roulink:"/common/order"},{icon:'iconfont icon-account',navtext:"我的",roulink:"/common/profile"}],

    }
  },
  methods:{
  		handleclick(){
  		router.push("/");
  	  },
  	 isshow(){
  	 	if(window.location.pathname=="/common/home"){
  	 		return false;
  	 	}else{
  	 		return true;
  	 	}
  	 },
  	 title(){
  	 	return this.$store.state.hometitle;
  	 }
  }
}
</script>

<style lang="scss" scoped>
.common{
	height:100%;
}
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
footer{
	position:fixed;
	bottom:0;
	background:#fff;
	width:100%;
	padding:.1rem 0;
	font:.2rem "";
	.active{
		color:#0089dc;
	}
	.footul{
		width:100%;
		display:flex;
		list-style:none;
		li{ text-align:center;
			flex:1;
			i{
				display:block;
					font:.34rem "";
					margin-bottom:.05rem;
			}
			a{color:#555;
				text-decoration:none;}
		}
	}
}
</style>