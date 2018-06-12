import Config from '../config'

export function FormTracker({ experimentId }) {
  this.state = {
    formStarted: 0,
    formFinished: 0,
    experiment_id: experimentId,
    cohort: '',
    result: '',
    variation_name: '',
    loginstate: 0, // 0 is not logged in, 1 is guest login and 2 is an authenticated user
    validationerror: 0, // count of the number of fields that a validation error occurs before submission
    formexpand: 0, // number of times additional pieces of the form are displayed to the user
    sectionadvanced: 0, // maximum form section user gets to (normally for a multi step form)
    fieldfocused: -1, // maximum field index besides the submit button that receives focus
    fieldchanged: -1 // maximum field index that has a non default value
  }

  this.startForm = function () {
    this.state.formStarted = 1
    this.track('form_started')
  }

  this.endForm = function (eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    this.track('form_finished')
  }

  this.updateFormProgress = function (eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    if (this.state.formStarted === 0) {
      this.startForm()
    }
  }

  this.track = function (eventName) {
    const { cohort, loginstate, validationerror, sectionadvanced, fieldfocused, fieldchanged } = this.state

    if (window.analytics) {
      window.analytics.track({
        event: eventName,
        properties: {
          result: eventName,
          experiment_id: experimentId,
          variation_name: cohort,
          guestlogin: loginstate || 0,
          validationerror: validationerror || 0,
          sectionadvanced: sectionadvanced || 0,
          fieldfocused: fieldfocused || -1,
          fieldchanged: fieldchanged || -1
        }
      })
    }
    if (Config.FAKE_ANALYTICS) {
      console.log(`Tracking event:${JSON.stringify(this.state)}`)
    }
  }
}
