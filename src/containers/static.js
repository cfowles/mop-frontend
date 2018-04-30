import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadStaticPage } from '../actions/staticPageActions'

import StaticComponent from 'Theme/static'

const getId = routes => routes && routes[routes.length - 1].wordpressId

class Static extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadStaticPage(getId(this.props.routes)))
  }

  componentWillReceiveProps(nextProps) {
    if (getId(this.props.routes) !== getId(nextProps.routes)) {
      this.props.dispatch(loadStaticPage(getId(nextProps.routes)))
    }
  }

  render() {
    /* eslint-disable react/no-danger */
    const page = this.props.page
    if (!this.props.page) return null
    return (
      <StaticComponent>
        <h1>{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </StaticComponent>
    )
  }
}
function mapStateToProps(store, { routes }) {
  return {
    page: store.staticPageStore[getId(routes)]
  }
}

Static.propTypes = {
  page: PropTypes.object,
  dispatch: PropTypes.func,
  routes: PropTypes.array
}

export default connect(mapStateToProps)(Static)
