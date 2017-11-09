
var eth = require("./eth.js");
var sql = require("./sql.js");
var api = require("./api.js");

// Say hello
api.get("/", function (req, next) {
    return next(true, "Basic API endpoint MTX-POC", null, {});
});

// Check if valid token
api.get("/logged", function (req, next) {
    var token = req.query.token || "";
    sql.session(token, next);
});

api.get("/v1/tournaments", function (req, next) {

    var page = req.query.page;
    if(page != null)
    {
        if(page == 0)
        {
            var tournaments = 
                { 
                    "tournaments" :
                        [
                {
                  "address": "0xb794f5ea0ba39494ce839613fffba74279579268",
                  "title": "A Cure for the Zika Virus",
                  "bounty": 100
                },
                {
                  "address": "0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e",
                  "title": "A Solution to Global Warming",
                  "bounty": 50
                },
                {
                  "address": "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
                  "title": "The Perfect Battery",
                  "bounty": 80
                },
                {
                  "address": "0xc257274276a4e539741ca11b590b9447b26a8051",
                  "title": "A Fourth Bounty",
                  "bounty": 10
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Fifth Bounty",
                  "bounty": 10491
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Sixth Bounty",
                  "bounty": 1927
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Seventh Bounty",
                  "bounty": 9
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Eighth Bounty",
                  "bounty": 6
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Ninth Bounty",
                  "bounty": 123
                },
                {
                  "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                  "title": "A Tenth Bounty",
                  "bounty": 123127391
                }
                ]
        }

            return next(true, tournaments);
        }
        else if(page == 1)
        {
            var tournaments = 
            { 
                "tournaments" :
                    [
                        {
                          "address": "0xb794f5ea0ba39494ce839613fffba74279579268",
                          "title": "An Eleventh Bounty",
                          "bounty": 100
                        },
                        {
                          "address": "0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e",
                          "title": "A Twelvth Bounty",
                          "bounty": 50
                        },
                        {
                          "address": "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
                          "title": "A Thirteenth Bounty",
                          "bounty": 80
                        },
                        {
                          "address": "0xc257274276a4e539741ca11b590b9447b26a8051",
                          "title": "A Fourteenth Bounty",
                          "bounty": 10
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Fifteenth Bounty",
                          "bounty": 10491
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Sixteenth Bounty",
                          "bounty": 1927
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Seventeenth Bounty",
                          "bounty": 9
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "An Eighteenth Bounty",
                          "bounty": 6
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Ninteenth Bounty",
                          "bounty": 123
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Twentyth Bounty",
                          "bounty": 123127391
                        }
                    ]
            }

            return next(true, tournaments);
        }
        else
        {
            var tournaments = 
            { 
                "tournaments" :
                    [
                        {
                          "address": "0xb794f5ea0ba39494ce839613fffba74279579268",
                          "title": "Bounty",
                          "bounty": 1
                        },
                        {
                          "address": "0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e",
                          "title": "Bounty",
                          "bounty": 2
                        },
                        {
                          "address": "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
                          "title": "Bounty",
                          "bounty": 3
                        },
                        {
                          "address": "0xc257274276a4e539741ca11b590b9447b26a8051",
                          "title": "Bounty",
                          "bounty": 4
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 5
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 6
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 7
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 8
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 9
                        },
                        {
                          "address": "  0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "Bounty",
                          "bounty": 10
                        }
                    ]
            }

            return next(true, tournaments);
        }
    }
    
});

api.get("/v1/tournament", function (req, next) {
    if(!req.query.id)
    {
        return next(false, null);
    }

    var tournamentID = req.query.id;
    var tournamentContent = 
    {
            "title": "A Cure for the Zika Virus",
            "bounty": 100,
            "description": "(description of this tournament).",
            "submissions" :
            [
            {
                "address": "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2",
                "title": "Novel Approach to Tyro3 Receptor Inhibition"
                
            },
            {
                "address": "0x51f9c432a4e59ac86282d6adab4c2eb8919160eb",
                "title": "Mertk Receptor RNA Transfection"
            },
            {
                "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
                "title": "Axl Receptor Blocking Techniques"
            }
            ]
        }

    var tournament = {}
    tournament[tournamentID] = tournamentContent

    return next(true, tournament);
});

api.get("/v1/submission", function(req, next) {
    if(!req.query.id)
    {
        return next(false, null);
    }
    var submissionID = req.query.id;
    var submissionBody = 
    {
        "title" : "Novel Approach to Tyro3 Receptor Inhibition",
        "references":
        [
        "0x3d2e397f94e415d7773e72e44d5b5338a99e77d9",
        "0xc257274276a4e539741ca11b590b9447b26a8051",
        "0xf0160428a8552ac9bb7e050d90eeade4ddd52843"
        ],
        "contributors":
        [
        "0x5ffc99b5b23c5ab8f463f6090342879c286a29be",
        "0xb8487eed31cf5c559bf3f4edd166b949553d0d11",
        "0xe853c56864a2ebe4576a807d26fdc4a0ada51919"
        ],
        "body":
        {
            "Items":["{\"rangeKeys\":[\"t\",\"u\",\"v\",\"w\"],\"rangePairs\":[{\"min\":{\"exclusive\":false,\"rawText\":\"0\"},\"max\":{\"exclusive\":false,\"rawText\":\"0\"}},{\"min\":{\"exclusive\":false,\"rawText\":\"0\"},\"max\":{\"exclusive\":false,\"rawText\":\"pi\"}},{\"min\":{\"exclusive\":false,\"rawText\":\"0\"},\"max\":{\"exclusive\":false,\"rawText\":\"2*pi\"}},{\"min\":{\"exclusive\":false,\"rawText\":\"0\"},\"max\":{\"exclusive\":false,\"rawText\":\"0\"}}],\"ExpressionKeys\":[0,1,2],\"ExpressionValues\":[\"(2*cos(u)*cos(v))^3\",\"(2*sin(u)*cos(v))^3\",\"(2*sin(v))^3\"]}"]
        }
    }
    var submission = {}
    submission[submissionID] = submissionBody

    return next(true, submission);
});

api.post("/v1/submit", function(req, next)
{
    if(!req.body)
    {
        return next(false, null);
    }

    var title = req.body.title;
    var references = req.body.references;
    var contributors = req.body.contributors;
    var submissionBody = req.body.submissionBody;

    var submission = 
    {
        "title": title,
        "references": references,
        "contributors": contributors,
        "submissionBody": submissionBody
    }

    // Add submission to IPFS node here!
    
    // Make CreateSubmission Contract call here!

    return next(true, submission);

});

// Count all submissions
api.get("/count", function (req, next) {
    var token = req.query.token || "";
    sql.session(token, function (success, user, error) {
        if (!success) {
            return next(false, null, error);
        }
        sql.count(next);
    });
});

// Get one submission
api.get("/get", function (req, next) {
    var token = req.query.token || "";
    var id = req.query.id || 0;
    sql.session(token, function (success, user, error) {
        if (!success) {
            return next(false, null, error);
        }
        sql.get(id, next);
    });
});

// Get list of sub
api.get("/list", function (req, next) {
    var token = req.query.token || "";
    var id = req.query.id || 0;
    var size = req.query.size || 10;
    sql.session(token, function (success, user, error) {
        if (!success) {
            return next(false, null, error);
        }
        sql.list(id, size, next);
    });
});

// Upload a new file
api.post('/upload', function (req, next) {
    var token = req.body.token || "";
    var token2 = req.query.token || "";
    var title = req.body.title;
    var desc = req.body.desc;
    var data = req.body.data;
    sql.session(token || token2, function (success, user, error) {
        if (!success) {
            return next(false, null, error);
        }
        sql.upload(user.id, title, desc, data, next);
    });
});

// Post auth
api.post("/auth", function (req, next) {
    // Read some info
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || "Unknown";
    var agent = req.headers['user-agent'] || "Unknown";
    var key = req.body.key || req.query.key || "";
    // Check if user exists with that key
    sql.getUser(key, function (success, results, error) {
        // On failure
        if (!success) {
            return next(false, null, error);
        }
        // Login ang stop if user already exists
        if (results.length > 0) {
            var user = results[0];
            return sql.makeToken(user.id, ip, agent, next);
        }
        // Signup if user does not exist
        eth.checkBalance(key, function (success, results, error) {
            // Failure
            if (!success) {
                return next(false, results, error);
            }
            // Success, then create object
            sql.makeUser(key, function (success, results, error) {
                // Failure
                if (!success) {
                    return next(false, null, error);
                }
                // Get the newly created user
                sql.getUser(key, function (success, results, error) {
                    // On failure
                    if (!success) {
                        return next(false, null, error);
                    }
                    if (results.length <= 0) {
                        return next(false, null, "user not created");
                    }
                    // Done
                    var user = results[0];
                    return sql.makeToken(user.id, ip, agent, next);
                });
            });
        });

    });
});

api.start();
