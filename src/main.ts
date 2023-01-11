import { getInput, debug, setFailed } from '@actions/core'
import { context } from '@actions/github'
import { generatePayload, sendSlackMessage } from './slack'

async function run (): Promise<void> {
  try {
    const org = context.repo.owner
    const repo = context.repo.repo
    const ref = context.ref
    const sha = context.sha
    const runId = context.runId
    debug(`org: ${org}`)
    debug(`repo: ${repo}`)
    debug(`ref: ${ref}`)
    debug(`sha: ${sha}`)
    debug(`runId: ${runId}`)

    const success = getInput('success') === 'true'

    const slackWebhookURL = getInput('slack_webhook_url')

    const payload = generatePayload(org, repo, ref, sha, runId, success)
    await sendSlackMessage(JSON.stringify(payload), slackWebhookURL)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run().catch(err => { throw err })
