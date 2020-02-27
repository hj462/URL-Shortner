const router = require("express").Router();
const URLS = require("../models/urls");
const DNS = require('dns');

router.route("/new").post((req, res) => {
  const raw_url = req.body.original_url;
  DNS.lookup(raw_url, function (err, address){
    if (err) {
      res.json({"error" : "invalid URL"});
    }
  })
  const count = URLS.estimatedDocumentCount({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      const short_url = new URLS({
        url: raw_url,
        short_url: result + 1
      });
      short_url
        .save()
        .then(result => {
          console.log("URL Created");
          res.status(200).json({
            original_url: raw_url,
            short_url: result["short_url"]
          });
        })
        .catch(error => {
          console.log("Error is " + error);
          res.status(400);
        });
    }
  });
});

router.route("/:short_id").get((req, res) => {
  const short_id = req.params.short_id;

  URLS.findOne({ short_url: short_id }, function(err, data) {
    console.log(data);
    if (err) {
      console.log(err);
    } else if(data) {
      res.redirect('https://' + data.url);
    }
  });
});

module.exports = router;
