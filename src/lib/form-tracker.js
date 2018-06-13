import Config from '../config'

export function FormTracker({ experimentId }) {
  this.state = {
    formStarted: 0,
    formFinished: 0,
    experiment_id: experimentId,
    result: '',
    variation_name: '',
    eventInfo: {},
    formLength: 0,
    formElements: {},
    currentfield: '',
    loginstate: 0, // 0 is not logged in, 1 is guest login and 2 is an authenticated user
    validationerror: 0, // count of the number of fields that a validation error occurs before submission
    formexpand: 0, // number of times additional pieces of the form are displayed to the user
    sectionadvanced: 0, // maximum form section user gets to (normally for a multi step form)
    fieldfocused: -1, // maximum field index besides the submit button that receives focus
    fieldchanged: -1 // maximum field index that has a non default value
  }

  // TODO: this login stuff will have more logic

  this.endForm = function endForm(eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    this.track('form_finished')
  }

  this.formExpandTracker = function formExpandTracker() {
    this.state.formexpand += 1
  }

  this.getForm = function getForm(formHTML) {
    const form = formHTML.getElementsByClassName('sign-form')[0]
    if (form) {
      this.state.formLength = form.length
      for (let k = 0; k < form.length; k += 1) {
        this.state.formElements[k] = form.elements[k].name
      }
    }
  }

  this.getMaxFieldChanged = function getMaxFieldChanged(key) {
    if (this.state.fieldchanged === -1) {
      this.state.fieldchanged = key
    }
    if (this.state.fieldchanged !== -1 && (parseInt(key, 10) > parseInt(this.state.fieldchanged, 10))) {
      this.state.fieldchanged = key
    }
  }

  this.getMaxFieldFocused = function getMaxFieldFocused(key) {
    if (this.state.fieldfocused === -1) {
      this.state.fieldfocused = key
      console.log('this.statefield focuse', this.state.fieldfocused);
    }
    if (this.state.fieldfocused > -1 && (parseInt(key, 10) > parseInt(this.state.fieldfocused, 10))) {
      this.state.fieldfocused = key
      console.log('growing', this.state.fieldfocused);
    }
  }

  this.loginState = function loginState(userInfo) {
    if (userInfo.anonymous) {
      this.state.loginstate = 0
    }

    if (!userInfo.anonymous && !userInfo.signonId) {
      this.state.loginstate = 1
    }

    if (!userInfo.anonymous && userInfo.signonId) {
      this.state.loginstate = 2
    }
  }

  this.startForm = function startForm(fieldName) {
    this.state.formStarted = 1
    this.state.currentfield = fieldName
    this.track('form_started')
  }

  this.focusEvent = function focusEvent(fieldName) {
    Object.keys(this.state.formElements).forEach(key => {
      if (this.state.formElements[key] === fieldName) {
        this.getMaxFieldFocused(key)
      }
    })
  }

  this.updateFormProgress = function updateFormProgress(eventInfo) {
    const fieldName = eventInfo.currentfield
    const formElements = this.state.formElements

    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })

    if (this.state.formStarted === 0) {
      this.startForm(fieldName)
    }

    if (this.state.formStarted) {
      Object.keys(formElements).forEach(key => {
        if (formElements[key] === fieldName) {
          this.getMaxFieldChanged(key)
        }
      })
      this.focusEvent(fieldName)
    }
  }

  this.validationErrorTracker = function validationErrorTracker(eventObj) {
    Object.keys(eventObj).forEach(key => {
      this.state.eventInfo[key] = eventObj[key]
      if (!eventObj[key] && Object.prototype.hasOwnProperty.call(eventObj.required, key)) {
        this.state.validationerror += 1
      }
    })
  }

  // method that actually sends to segment

  this.track = function track(eventName) {
    const { variation_name, loginstate, validationerror, sectionadvanced, fieldfocused, fieldchanged } = this.state

    if (window.analytics) {
      window.analytics.track({
        event: eventName,
        properties: {
          result: eventName,
          experiment_id: experimentId,
          variation_name: variation_name,
          guestlogin: loginstate,
          validationerror: validationerror || 0,
          sectionadvanced: sectionadvanced || 0,
          fieldfocused: fieldfocused || -1,
          fieldchanged: fieldchanged || -1
        }
      })
    }
    if (Config.FAKE_ANALYTICS) {
      console.log(`Tracking event ${eventName} with current state object:${JSON.stringify(this.state)}`)
    }
  }
}
