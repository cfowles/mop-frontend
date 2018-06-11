import Config from '../config'

export function FormTracker({ experimentId }) {
  this.state = {
    formStarted: 0,
    formFinished: 0,
    experiment_id: experimentId
  }

  this.startForm = function (eventInfo) {
    this.state.formStarted = 1
    this.track('form_started', eventInfo)
  }

  this.endForm = function (eventInfo) {
    this.state.formFinished = 1
    this.track('form_finished', eventInfo)
  }

  this.track = function (eventName, eventInfo) {
    if (window.analytics) {
      window.analytics.track({
        event: eventName,
        properties: {
          result: eventName,
          experiment_id: this.state.experiment_id,
          variation_name: eventInfo.cohort,
          guestlogin: eventInfo.guest
        }
      })
    }
    if (Config.FAKE_ANALYTICS) {
      console.log(`Tracking event: Event name ${eventName} - Experiment_id ${experimentId} - Variation ${eventInfo.cohort} - Guest? ${eventInfo.guest}`)
    }
  }
}
