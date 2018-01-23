import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex);
const KEY_WORD="keyword"
const HOME_TITLE="hometitle"
const store = new Vuex.Store({
	state:{
		keywordlist:null,
		hometitle:"发现"
	},
	actions:{
		getkeyword:function(store,payload){
			axios.get(payload).then(res=>{
  		store.commit("keyword",res.data)
  		})
		},

		// https://restapi.ele.me/shopping/restaurants?latitude=30.274151&longitude=120.155151&offset=20&limit=20&extras[]=activities&extra_filters=home&terminal=h5
		// https://restapi.ele.me/shopping/restaurants?latitude=30.274151&longitude=120.155151&keyword=&offset=0&limit=20&extras[]=activities&terminal=h5&brand_ids[]=&restaurant_category_ids[]=209&restaurant_category_ids[]=211&restaurant_category_ids[]=212&restaurant_category_ids[]=213&restaurant_category_ids[]=214&restaurant_category_ids[]=215&restaurant_category_ids[]=216&restaurant_category_ids[]=217&restaurant_category_ids[]=218&restaurant_category_ids[]=219&restaurant_category_ids[]=221&restaurant_category_ids[]=222&restaurant_category_ids[]=223&restaurant_category_ids[]=224&restaurant_category_ids[]=225&restaurant_category_ids[]=226&restaurant_category_ids[]=227&restaurant_category_ids[]=228&restaurant_category_ids[]=229&restaurant_category_ids[]=230&restaurant_category_ids[]=231&restaurant_category_ids[]=232&restaurant_category_ids[]=234&restaurant_category_ids[]=235&restaurant_category_ids[]=236&restaurant_category_ids[]=237&restaurant_category_ids[]=238&restaurant_category_ids[]=263&restaurant_category_ids[]=264&restaurant_category_ids[]=265&restaurant_category_ids[]=266&restaurant_category_ids[]=267&restaurant_category_ids[]=268&restaurant_category_ids[]=269
		
	},
	mutations:{
		[KEY_WORD]:function(state,payload){
			state.keywordlist=payload;
		},
		[HOME_TITLE]:function(state,payload){
			state.hometitle=payload;
		}
	}
})
export default store;