import lodash from 'lodash';

declare module 'vue/types/vue' {
    interface Vue {
        _: lodash.LoDashStatic;
    }
}
