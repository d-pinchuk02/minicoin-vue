export default {
  install(Vue, options) {
    Vue.prototype.$info = function(content) {
      this.$toasted.info(content, {
        theme: "toasted-primary",
        position: "top-right",
        icon: "information",
        duration: 4000,
        action: {
          text: "OK",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    };

    Vue.prototype.$success = function(content) {
      this.$toasted.success(content, {
        theme: "toasted-primary",
        position: "top-right",
        icon: "check",
        duration: 4000,
        action: {
          text: "OK",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    };

    Vue.prototype.$error = function(content) {
      this.$toasted.error(content, {
        theme: "toasted-primary",
        position: "top-right",
        icon: "alert-circle",
        duration: 4000,
        action: {
          text: "OK",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        }
      });
    };
  }
};
