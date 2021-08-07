const router = require('express').Router();
const Subscription = require('../models/subscription.model');


// First endpoint for /subscriptions/ will deliver list of subscription
router.route('/').get((req,res) => {
    Subscription.find()
        .then(subs => res.json(subs))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;
