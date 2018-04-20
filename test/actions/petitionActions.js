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

describe('petitionActions', () => {
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
        done()
        fetchMock.restore()
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
        fetchMock.restore()
      }
    })
    signPetition(SIGNATURE, PETITION)(dispatch)
  })

  after(() => {
    Config.API_SIGN_PETITION = prevSign
    Config.API_WRITABLE = prevWritable
  })
})
