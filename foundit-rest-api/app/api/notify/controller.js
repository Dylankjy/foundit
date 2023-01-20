const express = require('express')
const router = express.Router()

const env = require('../../config')

const AWS = require('aws-sdk')
const sns = new AWS.SNS({
    accessKeyId: env.services.AWS.ACCESS_KEY_ID,
    secretAccessKey: env.services.AWS.SECRET_ACCESS_KEY,
    region: env.services.AWS.REGION
})


router.post('/', (req, res) => {
    // #swagger.tags = ['Notify']
    // #swagger.description = 'Add email to AWS SNS topic'

    const { email } = req.body

    if (!email) {
        return res.status(400).json({
            'code': 400,
            'name': 'Bad Request',
            'message': 'Missing email address'
        })
    }

    const params = {
        Protocol: 'email',
        TopicArn: env.services.AWS.SNS.TOPIC_ARN,
        Endpoint: email
    }

    sns.subscribe(params, (err, data) => {
        if (err) {
            return res.status(500).json({
                'code': 500,
                'name': 'Internal Server Error',
                'message': err.message
            })
        }

        return res.json({
            'code': 200,
            'name': 'OK',
            'message': 'Email address added to SNS topic'
        })
    })
})

module.exports = router
