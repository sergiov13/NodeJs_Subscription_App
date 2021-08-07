const router = require('express').Router();
const Subscription = require('../models/subscription.model');


// First endpoint for /subscriptions/ will deliver list of subscription
router.route('/').get((req,res) => {
    Subscription.find()
        .then(subs => res.json(subs))
        .catch(err => res.status(400).json('Error: ' + err))
})


//Receive add subscription in body creating object and handling push to DB
router.route('/add').post((req, res) => {
    console.log('Receiving add POST' + req.body.customerId);
    const customerId = req.body.customerId;
    const productName = req.body.productName;
    const domain = req.body.domain;
    const startDate = Date.parse(req.body.startDate);
    const durationMonths = req.body.durationMonths;

    //New Object
    const newSubscription = new Subscription({
        customerId,
        productName,
        domain,
        startDate,
        durationMonths,
    })

    //Push to db and handling of promise
    newSubscription.save()
        .then(() => res.status(200).json("Subscription Added"))
        .catch(err => res.status(400).json('Error: ' + err ))
});

//Fetch of subscription By id and Get
router.route('/:id').get((req,res) => {
    Subscription.findById(req.params.id)
        .then(() => res.json(subscription))
        .catch(err => res.status(400).json('Error: '+err))
});


//will delete straight from ID / Might need to refactor later to add verification and error handling
router.route('/:id').delete((req,res) => {
    Subscription.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json('Subscription Deleted'))
        .catch(err => res.status(400).json('Error: '+err))
})


//update route will receive POST and save new modified subscription
router.route('/update/:id').post((req,res) => {

    Subscription.findById(req.params.id)
        .then(subscription => {
            subscription.customerId = req.body.customerId;
    		subscription.productName = req.body.productName;
    		subscription.domain = req.body.domain;
    		subscription.startDate = Date.parse(req.body.startDate);
    		subscription.durationMonths = req.body.durationMonths;
            
            subscription.save()
                .then(() => res.json('Subscription updated'))
                .catch(err => res.status(400).json('Error: '+err));
        })
        .catch(err => res.status(400).json('Error: '+err))
})

module.exports = router;
