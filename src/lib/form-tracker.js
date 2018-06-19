import Config from '../config'

export function FormTracker({ experiment = '', formvariant = '', variationname = '' }) {
  this.options = {
    formStarted: 0,
    formSubmitted: 0,
    formValid: 0,
    providedPhone: 0,
    mobileOptIn: 0
  }

  this.state = {
    result: '', // either started, completed or dropoff
    variationname, // variation name is a description identifier and should be 'current' if it's the baseline
    formvariant, // is for example whether the mobile or desktop is displayed
    experiment, // meant to define the specific experiment by name e.g. 'signMobilePhones1'
    loginstate: 0, // 0 is not logged in, 1 is guest login and 2 is an authenticated user
    validationerror: 0, // count of the number of fields that a validation error occurs before submission
    formexpand: 0, // number of times additional pieces of the form are displayed to the user
    sectionadvanced: 0, // maximum form section user gets to (normally for a multi step form)
    fieldfocused: -1, // maximum field index besides the submit button that receives focus
    fieldchanged: -1, // maximum field index that has a non default value,
    lastfieldchanged: '',
    lastfieldfocused: ''
  }

  this.leftForm = function leftForm() {
    this.track('form_abandoned', 'dropoff')
  }

  this.mobileFieldTracker = function mobileFieldTracker(optedIn, phoneFieldInteraction) {
    const { providedPhone, mobileOptIn } = this.options

    if (!providedPhone) {
      this.options.providedPhone = 1
      if (phoneFieldInteraction) console.log('interacted with phone field')
    }

    if (!mobileOptIn) {
      this.options.mobileOptIn = 1
      if (optedIn) console.log('opted in')
    }
  }

  this.submitForm = function submitForm(eventInfo) {
    Object.keys(eventInfo).forEach(key => {
      this.state[key] = eventInfo[key]
    })
    this.track('form_finished', 'completed')
  }

  this.formExpandTracker = function formExpandTracker() {
    this.state.formexpand += 1
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

  this.setForm = function setForm(ref) {
    if (ref) {
      this.form = ref
      this.state.formLength = ref.elements.length

      if (ref.id === 'mobile-sign' && !!(ref.offsetWidth || ref.offsetHeight || ref.getClientRects().length)) {
        this.state.formvariant = 'mobile'
        if (this.options.formStarted === 0) {
          this.startForm()
        }
      }

      if (ref.id === 'desktop-sign' && !!(ref.offsetWidth || ref.offsetHeight || ref.getClientRects().length)) {
        this.state.formvariant = 'desktop'
        if (this.options.formStarted === 0) {
          this.startForm()
        }
      }
    }
  }

  this.startForm = function startForm() {
    this.options.formStarted = 1
    this.track('form_started', 'started')
  }

  this.fieldIndex = function fieldIndex(fieldName) {
    for (let i = 0; i < this.form.elements.length; i += 1) {
      if (this.form.elements[i].name === fieldName) {
        return i
      }
    }
    return -1
  }

  this.updateFormProgress = function updateFormProgress(eventInfo) {
    const fieldName = eventInfo.currentfield
    this.state.lastfieldchanged = fieldName
    this.state.lastfieldfocused = fieldName

    if (eventInfo.fieldchanged) {
      if (fieldName === this.state.lastfieldchanged) return
      this.state.fieldchanged = Math.max(this.state.fieldchanged, this.fieldIndex(eventInfo.fieldchanged))
    }

    if (eventInfo.fieldfocused) {
      if (fieldName === this.state.lastfieldcfocused) return
      this.state.fieldfocused = Math.max(this.state.fieldfocused, this.fieldIndex(eventInfo.fieldfocused))
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
  this.track = function track(eventName, result) {
    this.options.formStarted = 1
    if (window.analytics) {
      window.analytics.track({
        event: eventName,
        properties: Object.assign(this.state, { result })
      })
    }
    if (Config.FAKE_ANALYTICS) {
      console.log(`Tracking event ${eventName} with current state object: ${JSON.stringify(this.state)} `)
    }
  }
}
