import { expect } from 'chai'
import sinon from 'sinon'
import fetchMock from 'fetch-mock'
import Config from '../../src/config'

import { signPetition } from '../../src/actions/petitionActions'

const SQS_RESPONSE = {
  SendMessageResponse: {
    ResponseMetadata: { RequestId: 'abc' },
    SendMessageResult: {
      MD5OfMessageAttributes: 'def',
      MD5OfMessageBody: 'ghi',
      MessageId: 'jkl3',
      SequenceNumber: null
    }
  }
}

const SIGNATURE = {
  signature: true,
  anything: true
}

const PETITION = {
  petition: true,
  anything: true
}

describe('petitionActions signPetition configured as prod', () => {
  let prevSign
  let prevWritable
  before(() => {
    prevSign = Config.API_SIGN_PETITION
    prevWritable = Config.API_WRITABLE
    Config.API_SIGN_PETITION = 'https://petitions.example.com/api-v1-signatures'
    Config.API_WRITABLE = true
  })

  it('calls sign petition endpoint', done => {
    fetchMock.post('https://petitions.example.com/api-v1-signatures', SQS_RESPONSE)
    const dispatch = sinon.spy(() => {
      if (dispatch.callCount === 2) {
        expect(fetchMock.lastUrl()).to.equal('https://petitions.example.com/api-v1-signatures')
        const opts = fetchMock.lastOptions()
        expect(opts.method).to.equal('POST')
        expect(opts.body).to.equal(JSON.stringify(SIGNATURE))

        expect(dispatch.firstCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUBMIT'
        )
        expect(dispatch.secondCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUCCESS'
        )
        expect(dispatch.secondCall.args[0].messageId).to.equal('jkl3')
        expect(dispatch.secondCall.args[0].petition).to.equal(PETITION)
        done()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  it('dispatches failure if endpoint returns invalid json', done => {
    fetchMock.post('https://petitions.example.com/api-v1-signatures', { status: 200 })
    const dispatch = sinon.spy(() => {
      if (dispatch.callCount === 2) {
        expect(dispatch.firstCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUBMIT'
        )
        expect(dispatch.secondCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_FAILURE'
        )
        done()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  it('dispatches failure when `fetch` throws (network error)', done => {
    fetchMock.post('https://petitions.example.com/api-v1-signatures', { throws: new TypeError() })
    const dispatch = sinon.spy(() => {
      if (dispatch.callCount === 2) {
        expect(dispatch.firstCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUBMIT'
        )
        expect(dispatch.secondCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_FAILURE'
        )
        done()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  afterEach(() => fetchMock.restore())

  after(() => {
    Config.API_SIGN_PETITION = prevSign
    Config.API_WRITABLE = prevWritable
  })
})


describe('petitionActions signPetition configured dev', () => {
  let prevApi
  let prevWritable
  before(() => {
    prevWritable = Config.API_WRITABLE
    prevApi = Config.API_URI
    Config.API_WRITABLE = false
    Config.API_URI = 'http://localhost:4174'
  })

  afterEach(() => fetchMock.restore())

  it('doesn’t fetch and returns success', done => {
    fetchMock.mock('*', 200)
    const dispatch = sinon.spy(() => {
      if (dispatch.callCount === 2) {
        expect(fetchMock.called()).to.equal(false)
        expect(dispatch.firstCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUBMIT'
        )
        expect(dispatch.secondCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUCCESS'
        )
        expect(dispatch.secondCall.args[0].petition).to.equal(PETITION)
        done()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  it('can write to fake api', done => {
    Config.API_WRITABLE = 'fake'
    fetchMock.get('http://localhost:4174/signatures.json', SQS_RESPONSE)
    const dispatch = sinon.spy(() => {
      if (dispatch.callCount === 2) {
        expect(fetchMock.lastUrl()).to.equal('http://localhost:4174/signatures.json')
        const opts = fetchMock.lastOptions()
        expect(opts.method).to.equal('GET')
        expect(opts.body).to.equal(undefined)
        expect(dispatch.firstCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUBMIT'
        )
        expect(dispatch.secondCall.args[0].type).to.equal(
          'PETITION_SIGNATURE_SUCCESS'
        )
        expect(dispatch.secondCall.args[0].petition).to.equal(PETITION)
        done()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  after(() => {
    Config.API_WRITABLE = prevWritable
    Config.API_URI = prevApi
  })
})
