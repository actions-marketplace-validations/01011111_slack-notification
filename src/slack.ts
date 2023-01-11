import { debug } from '@actions/core'
import fetch from 'node-fetch'

interface SlackElement {
  type: string
  text: string
}

interface SlackBlock {
  type: string
  text?: {
    type: string
    text: string
  }
  accessory?: {
    type: string
    text: {
      type: string
      text: string
    }
    value: string
    url: string
    action_id: string
  }
  elements?: SlackElement[]
}

interface SlackPayload {
  blocks: SlackBlock[]
}

export const generatePayload = (org: string, repo: string, ref: string, sha: string, runId: number, success: boolean): SlackPayload => {
  const payload = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: success ? `${repo} ${ref} deployment was successful :rocket:` : `${repo} ${ref} deployment failed :x:`
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Workflow'
          },
          value: `workflow_${runId}}`,
          url: `https://github.com/${org}/${repo}/actions/runs/${runId}`,
          action_id: 'button-action'
        }
      },
      {
        type: 'context',
        elements: [
          {
            type: 'plain_text',
            text: repo
          },
          {
            type: 'plain_text',
            text: ref
          },
          {
            type: 'plain_text',
            text: sha
          }
        ]
      }
    ]
  }
  return payload
}

export const sendSlackMessage = async (payload: string, slackWebhookURL: string): Promise<void> => {
  debug(`payload: ${payload}`)

  await fetch(slackWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: payload
  })
}
