import Config from '../config'

export function FormTracker({ experimentId }) {
  this.state = {
    formStarted: 0,
    formSubmitted: 0,
    experiment_id: experimentId,
    result: '',
    variationName: '',
    eventInfo: {},
    fieldLength: 0,
    mobileFormLength: 0,
    desktopFormLength: 0,
    formElements: {},
    currentfield: '',
    mobile: false,
    loginstate: 0, // 0 is not logged in, 1 is guest login and 2 is an authenticated user
    validationerror: 0, // count of the number of fields that a validation error occurs before submission
    formexpand: 0, // number of times additional pieces of the form are displayed to the user
    sectionadvanced: 0, // maximum form section user gets to (normally for a multi step form)
    fieldfocused: -1, // maximum field index besides the submit button that receives focus
    fieldchanged: -1 // maximum field index that has a non default value
  }

  this.submitForm = function submitForm(eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    this.track('form_finished')
  }

  this.formExpandTracker = function formExpandTracker() {
    this.state.formexpand = 1
  }

  this.getForm = function getForm(formHTML, formPropsId) {
    const mobileForm = formHTML.getElementsByClassName('sign-form')[0]
    const desktopForm = formHTML.getElementsByClassName('sign-form')[1]
    if (mobileForm || desktopForm) {
      this.state.mobileFormLength = mobileForm.length
      this.state.desktopFormLength = desktopForm.length

      if (formPropsId === 'desktop-sign') {
        this.state.mobile = false
        for (let k = 0; k < desktopForm.length; k += 1) {
          this.state.formElements[k] = desktopForm.elements[k].name
        }
      }

      if (formPropsId === 'mobile-sign') {
        this.state.mobile = true
        for (let k = 0; k < mobileForm.length; k += 1) {
          this.state.formElements[k] = mobileForm.elements[k].name
        }
      }
    }
  }

  this.getMaxField = function getMaxField(key, stateField) {
    if (stateField === 'fieldchanged') {
      if (this.state.fieldchanged === -1) {
        this.state.fieldchanged = key
      }
      if (this.state.fieldchanged !== -1 && (parseInt(key, 10) > parseInt(this.state.fieldchanged, 10))) {
        this.state.fieldchanged = key
      }
    }

    if (stateField === 'fieldfocused') {
      if (this.state.fieldfocused === -1) {
        this.state.fieldfocused = key
      }
      if (this.state.fieldfocused > -1 && (parseInt(key, 10) > parseInt(this.state.fieldfocused, 10))) {
        this.state.fieldfocused = key
      }
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

  this.startForm = function startForm(fieldName, eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    this.track('form_started')
  }

  this.updateFormProgress = function updateFormProgress(eventInfo) {
    const fieldName = eventInfo.currentfield
    const fieldLength = eventInfo.fieldLength
    const formElements = this.state.formElements

    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
      if (!this.state.formStarted) {
        Object.keys(formElements).forEach(i => {
          if (formElements[i] === fieldName && fieldLength) {
            this.getMaxField(i, 'fieldchanged')
            this.getMaxField(i, 'fieldfocused')
          }
          if (formElements[i] === fieldName && !fieldLength) {
            this.getMaxField(i, 'fieldfocused')
          }
        })
        this.startForm(fieldName, eventInfo)
      }
      if (this.state.formStarted) {
        Object.keys(formElements).forEach(k => {
          if (formElements[k] === fieldName && fieldLength) {
            this.getMaxField(k, 'fieldchanged')
            this.getMaxField(k, 'fieldfocused')
          }
          if (formElements[k] === fieldName && !fieldLength) {
            this.getMaxField(k, 'fieldfocused')
          }
        })
      }
    })
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
    const { variationName, loginstate, validationerror, sectionadvanced, fieldfocused, fieldchanged } = this.state
    if (window.analytics) {
      window.analytics.track({
        event: eventName,
        properties: {
          result: eventName,
          experiment_id: experimentId,
          variation_name: variationName,
          guestlogin: loginstate,
          validationerror,
          sectionadvanced,
          fieldfocused,
          fieldchanged
        }
      })
    }
    if (Config.FAKE_ANALYTICS) {
      console.log(`Tracking event ${eventName} with current state object:${JSON.stringify(this.state)}`)
    }
  }
}
