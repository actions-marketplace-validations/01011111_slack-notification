# Slacktification

## Requirements

You need to create a Slack app and add a webhook to it. You can find more information about how to do that [here](https://api.slack.com/messaging/webhooks).
After configuring your app to post messages to a channel, you will get a webhook URL. You will need to pass this URL to the action as an input.

## Usage

```yaml
uses: 01011111/slack-notification@v1.0.1
  if: success()
  with:
    slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
    success: 'true'

uses: 01011111/slack-notification@v1.0.1
  if: failure()
  with:
    slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
    success: 'false'
```

This is the only configuration you need to start sending notification to Slack.

### Only send notifications after specific steps

```yaml
release-notification:
  runs-on: ubuntu-latest
  needs:
    - deploy

  steps:
    - uses: 01011111/slack-notification@v1.0.1
      if: success()
      with:
        slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
        success: 'true'
    
    - uses: 01011111/slack-notification@v1.0.1
      if: failure()
      with:
        slack_webhook_url: ${{ secrets.SLACK_WEBHOOK_URL }}
        success: 'false'
```

You can use the `needs` keyword to only send notifications after specific steps.
