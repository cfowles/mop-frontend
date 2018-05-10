import React from 'react'

class CustomTargetSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nameValue: '',
      emailValue: '',
      titleValue: '',
      targets: []
    }

    this.addTarget = this.addTarget.bind(this)
    this.deleteTarget = this.deleteTarget.bind(this)
    this.updateName = this.updateName.bind(this)
    this.updateTitle = this.updateTitle.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
  }

  updateName(e) {
    this.setState({
      nameValue: e.target.value
    })
  }

  updateEmail(e) {
    this.setState({
      emailValue: e.target.value
    })
  }

  updateTitle(e) {
    this.setState({
      titleValue: e.target.value
    })
  }

  addTarget(e) {
    const { nameValue, emailValue, titleValue, targets } = this.state
    e.preventDefault()
    const newTarget = {
      name: nameValue,
      email: emailValue,
      title: titleValue
    }

    targets.push(newTarget)
  }

  deleteTarget(e) {
    e.preventDefault()
    const targets = this.state.targets
    const indexOfValue = e.target.value
    targets.splice(indexOfValue, 1)
  }

  render() {
    const { targets } = this.state
    const addedTargetStyle = {
      backgroundColor: 'rgb(255, 255, 255)'
    }

    return (
      <div>
        <div id='selected_targets_div' className='selected_targets'></div>
        <div id='more_custom_group'>
          {targets ? targets.map((target, index) => (
            <div className='checkbox wrapper' key={index}>
              <label className='target_label' style={addedTargetStyle}> <input type='checkbox' value={index} checked onChange={this.deleteTarget} /> {target.name}, {target.title} &#40;{target.email}&#41; </label> </div>
          )) : ''}
          <div className='text wrapper small' id='text_custom_group_name_wrapper'>
            <input name='text_custom_group_name' id='custom_name' className='text' type='text' placeholder='Name' onChange={this.updateName} />
          </div>
          <div className='text wrapper small' id='text_custom_group_email_wrapper'>
            <input name='text_custom_group_email' id='custom_email' className='text' type='text' placeholder='Email Address (optional)' onChange={this.updateEmail} />
          </div>
          <div className='text wrapper small' id='text_custom_group_title_wrapper'>
            <input name='text_custom_group_title' id='custom_title' className='text' type='text' placeholder='Title or Position (optional)' onChange={this.updateTitle} />
          </div>
          <div id='someone_else_add'>
            <a onClick={this.addTarget} className='btn' id='add_this_target'>Add another target</a>
          </div>
        </div>
      </div>
    )
  }
}

export default CustomTargetSelect
