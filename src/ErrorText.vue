<template>
    <transition name="fade">
	<div v-if='errors' id='error-message'>
        <p v-for="(error, index) in errors" :key="index">
            {{error}}
        </p>
    </div>
    </transition>
</template>

<script>
import Bus from './Bus.js'

export default {
	data: function() {
		return {
			errors: null
		}
	},
	created: function() {
		Bus.$on('showErr', this.showError);
	},
	methods: {
		showError: function(err) {
            this.errors = err;
            console.log(err);
            setTimeout(() => {
                this.errors = null;
            }, 1200);
        }
	}
}

</script>

<style type="text/css">

#error-message {
    position: fixed;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1060;
    min-width: 300px;
    min-height: 50px;
    background: black;
    opacity: 0.5;
    font-size: 20pt;
    font-weight: bold;
    color: white;
}

#error-message.fade-enter-active, #error-message.fade-leave-active {
  transition: opacity .5s;
}

#error-message.fade-enter-to {
    opacity: 0.5;
}
#error-message.fade-enter, #error-message.fade-leave-to {
  opacity: 0;
}

</style>