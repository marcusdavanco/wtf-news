import { AtpAgent } from '@atproto/api'
import * as dotenv from 'dotenv'
import { CronJob } from 'cron'
import * as process from 'process'

dotenv.config()

const agent = new AtpAgent({
	service: 'https://bsky.social',
})

async function main() {
	await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
	await agent.post({
		text: 'This is a test post from the Bluesky API',
	})
	console.log('Just posted!')
}

main()

const scheduleExpressionMinute = '* * * * *'
const scheduleExpression = '0 */3 * * *'

const job = new CronJob(scheduleExpression, main)
// const job = new CronJob(scheduleExpressionMinute, main)

job.start()
