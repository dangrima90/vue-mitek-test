<template>
  <div class="hello">
    <h1>{{ isMobile }}</h1>
    <p>BankId: {{ bankId }}</p>
    <p>Language: {{ language }}</p>
    <h1>{{ msg }}</h1>
    <button @click="click">Hello World</button>
    <!-- <vue-tel-input
      enabledCountryCode
      validCharactersOnly
      placeholder=""
      :value="tel"
    /> -->
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { mapActions, mapGetters } from 'vuex'
import store from '@/store'

// import { isMobile } from 'mobile-device-detect'

export default defineComponent({
  name: 'HelloWorld',

  props: {
    msg: String
  },

  computed: {
    ...mapGetters({
      bankId: 'bankId',
      language: 'language'
    })
  },
  
  data() {
    return {
      isMobile: true,
      tel: ""
    }
  },

  created() {
    this.setBankId('02')
    store.dispatch('setLanguage', 'fr')
  },

  methods: {
    ...mapActions({
      setBankId: 'setBankId'
    }),
    click() {
      console.log("Hello world")
      document.querySelector('div video[autoplay="true"]').play()

      let recentHint = null
      let attemptTimer = null

      // camera started
      
      window.mitekScienceSDK.on('CAMERA_DISPLAY_STARTED', function (result) {
        console.log('Camera Display Started', result)  
        window.mitekScienceSDK.cmd('SHOW_HINT', 'First Message')
      })

      
      window.mitekScienceSDK.on('FRAME_PROCESSING_FEEDBACK', function (result) {
        recentHint = result.key

        if (recentHint !== null) {
          console.log(recentHint)
          
          window.mitekScienceSDK.cmd('SHOW_HINT', result.key)
        }
      })

      
      window.mitekScienceSDK.on('FRAME_PROCESSING_STARTED', function () {
        console.log('started capture>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        
        attemptTimer = setTimeout(function () {
          console.log('Timeout')
          
          clearTimeout(attemptTimer)
          
          window.mitekScienceSDK.cmd('SDK_STOP')
        }, 25000)
      })
      
      window.mitekScienceSDK.on('FRAME_CAPTURE_RESULT', function (result) {
        console.log('Auto capture result', result)
        
        clearTimeout(attemptTimer)
      })
      
      window.mitekScienceSDK.on('SDK_ERROR', function (err) {
        console.log(err)
      })
      
      window.mitekScienceSDK.cmd('CAPTURE_AND_PROCESS_FRAME', {
        mode: 'AUTO_CAPTURE',
        documentType: 'DL_FRONT',
        mitekSDKPath: '/vendors/mitek/mitekSDK/',
        options: {
          qualityPercent: 80, // value between 50 to 100 recommended
          hintFrequencyMS: 1200, // how long the hint message displays (in MS) / note: 2400 recommended for screen readers
          hintAriaLive: 2, // screen reader setting for hint updates value (0=off / 1=polite / 2=assertive)
          guidePaddingLevel: 1, // size of the overlay guide  (1=large, 2=medium, 3=small) / note: 1 is recommended
          hintMessageSize: 2, // set the size of the hint message (1=small / 2=medium / 3=large)
          disableSmileDetection: false, // disable smile detection
          faceDetectionLevel: 1, // determines how strict face detection is (1=lenient, 2=moderate, 3=strict)
          videoContainerId: null, // (optionally) embed the video in a custom HTML container
          videoRecordingEnabled: false, // (optionally) record the video session / returned as a dataURL
          audioRecordingEnabled: false, // (optionally) also record audio / only applies if videoRecordingEnabled = true)
          videoQuality: 70, // (optionally) value between 30 to 100 recommended (normalized bitrate of video / only applies if videoRecordingEnabled = true)
          videoRecordingMessage: 'Recording' // (optionally) override the default "Recording" message / Note: set to "" to disable icon and message
        }
      })
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
