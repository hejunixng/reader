import CreateApi from 'vue-create-api';
import Vue from 'vue';
import Toast from '../components/common/Toast.vue';
import Popup from '../components/common/popu.vue';
import GroupDialog from '../components/shlef/ShelfGroupDialog.vue'


// 注册createapr
Vue.use(CreateApi);
Vue.createAPI(Toast, true)//使用组件
Vue.createAPI(Popup, true)
Vue.createAPI(GroupDialog, true)

Vue.mixin({
    methods:{
        // 组件
        totast(text){
            return this.$createToast({
                $props:text
            })
        },
        simpleToast(text) {
            const totast = this.totast({
              text: text
            })
            totast.show()
            totast.updateText(text)
          },
        popup(settings) {
            return this.$createPopup({
              $props: settings
            })
          },
          dialog(settings) {
            return this.$createGroupDialog({
              $props: settings
            })
          }
    }
})