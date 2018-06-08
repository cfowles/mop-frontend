import Config from '../config'

export function FormTracker() {
  this.state = {}

  this.startForm = function (eventInfo) {
    this.state.formStarted = 1
    this.track('form_started', eventInfo)
  }

  this.endForm = function (eventInfo) {
    this.state.formFinished = 1
    this.track('form_finished', eventInfo)
  }

  this.track = function (eventName, eventInfo) {
    // console.log('eventInfo: '+ eventInfo + ' and event name:' + eventName);
    window.analytics.track({
      event: eventName,
      properties: {
        result: eventName,
        experiment_id: Config.SEGMENT_TEST_ID,
        variation_name: eventInfo.cohort,
        guestlogin: eventInfo.guest,
        user: eventInfo.user_info
      }
    })
  }
}
