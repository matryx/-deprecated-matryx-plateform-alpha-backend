
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

api.get("/v1/ready", function (req, next) {
    return next(true, null);
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
                          "title": "Suborbital Spaceplane Airfoil Design",
                          "bounty": 1000
                        },
                        {
                          "address": "0xe853c56864a2ebe4576a807d26fdc4a0ada51919",
                          "title": "Cure for the Zika Virus",
                          "bounty": 920000
                        },
                        {
                          "address": "0x281055afc982d96fab65b3a49cac8b878184cb16",
                          "title": "Synthetic Carboxysome Production Method",
                          "bounty": 819200
                        },
                        {
                          "address": "0x6f46cf5569aefa1acc1009290c8e043747172d89",
                          "title": "Dry Battery Cell Structure",
                          "bounty": 20000
                        },
                        {
                          "address": "0x90e63c3d53e0ea496845b7a03ec7548b70014a91",
                          "title": "A Fifth Bounty",
                          "bounty": 5
                        },
                        {
                          "address": "0xab7c74abc0c4d48d1bdad5dcb26153fc8780f83e",
                          "title": "A Sixth Bounty",
                          "bounty": 6
                        },
                        {
                          "address": "0x53d284357ec70ce289d6d64134dfac8e511c8a3d",
                          "title": "A Seventh Bounty",
                          "bounty": 7
                        },
                        {
                          "address": "0xf4b51b14b9ee30dc37ec970b50a486f37686e2a8",
                          "title": "A Eighth Bounty",
                          "bounty": 8
                        },
                        {
                          "address": "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae",
                          "title": "A Ninth Bounty",
                          "bounty": 9
                        },
                        {
                          "address": "0xf27daff52c38b2c373ad2b9392652ddf433303c4",
                          "title": "A Tenth Bounty",
                          "bounty": 10
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
                          "address": "0x3d2e397f94e415d7773e72e44d5b5338a99e77d9",
                          "title": "An Eleventh Bounty",
                          "bounty": 11
                        },
                        {
                          "address": "0xb8487eed31cf5c559bf3f4edd166b949553d0d11",
                          "title": "A Twelvth Bounty",
                          "bounty": 12
                        },
                        {
                          "address": "0xc257274276a4e539741ca11b590b9447b26a8051",
                          "title": "A Thirteenth Bounty",
                          "bounty": 13
                        },
                        {
                          "address": "0x00a651d43b6e209f5ada45a35f92efc0de3a5184",
                          "title": "A Fourteenth Bounty",
                          "bounty": 14
                        },
                        {
                          "address": "0x61edcdf5bb737adffe5043706e7c5bb1f1a56eea",
                          "title": "A Fifteenth Bounty",
                          "bounty": 15
                        },
                        {
                          "address": "0x1b3cb81e51011b549d78bf720b0d924ac763a7c2",
                          "title": "A Sixteenth Bounty",
                          "bounty": 16
                        },
                        {
                          "address": "0x6f52730dba7b02beefcaf0d6998c9ae901ea04f9",
                          "title": "A Seventeenth Bounty",
                          "bounty": 17
                        },
                        {
                          "address": "0x5ffc99b5b23c5ab8f463f6090342879c286a29be",
                          "title": "An Eighteenth Bounty",
                          "bounty": 18
                        },
                        {
                          "address": "0x35da6abcb08f2b6164fe380bb6c47bd8f2304d55",
                          "title": "A Ninteenth Bounty",
                          "bounty": 19
                        },
                        {
                          "address": "0xf1ce0a98efbfa3f8ebec2399847b7d88294a634e",
                          "title": "A Twentyth Bounty",
                          "bounty": 20
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
                          "address": "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
                          "title": "Bounty",
                          "bounty": 21
                        },
                        {
                          "address": "0x07ee55aa48bb72dcc6e9d78256648910de513eca",
                          "title": "Bounty",
                          "bounty": 22
                        },
                        {
                          "address": "0x51f9c432a4e59ac86282d6adab4c2eb8919160eb",
                          "title": "Bounty",
                          "bounty": 23
                        },
                        {
                          "address": "0x8f7147aaa34d9ae583a7aa803e8df9bd6b4cc185",
                          "title": "Bounty",
                          "bounty": 24
                        },
                        {
                          "address": "0xf0160428a8552ac9bb7e050d90eeade4ddd52843",
                          "title": "Bounty",
                          "bounty": 25
                        },
                        {
                          "address": "0x3cfc056462a06d3d146a2c6e73e5a48ea3798f24",
                          "title": "Bounty",
                          "bounty": 26
                        },
                        {
                          "address": "0x900d0881a2e85a8e4076412ad1cefbe2d39c566c",
                          "title": "Bounty",
                          "bounty": 27
                        },
                        {
                          "address": "0x3bf86ed8a3153ec933786a02ac090301855e576b",
                          "title": "Bounty",
                          "bounty": 28
                        },
                        {
                          "address": "0xbf09d77048e270b662330e9486b38b43cd781495",
                          "title": "Bounty",
                          "bounty": 29
                        },
                        {
                          "address": "0x3de8c14c8e7a956f5cc4d82beff749ee65fdc358",
                          "title": "Bounty",
                          "bounty": 30
                        }
                    ]
            }

            return next(true, tournaments);
        }
    }
    else
    {
        return next(false, null);
    }
    
});

api.get("/v1/tournament", function (req, next) {
    if(!req.query.id)
    {
        return next(false, "id null");
    }
    var tournamentID = req.query.id;

    var page = req.query.page;
    if(page != null)
    {
        if(page == 0)
        {
            var tournamentContent = 
            {
                "title": "Suborbital Spaceplane Airfoil Design",
                "bounty": 100,
                "description": "The process of airfoil design proceeds from a knowledge of \
                the relationship between geometry and pressure distribution. Airfoil design is \
                application specific. Some airfoils need only to minimize drag force while others \
                need to maximize lift. As our aircraft needs to reach upper atmosphere as quickly as \
                possible, this tournament focuses on the latter; See Section IV for technical specifications.",
                "submissions" :
                [
                {
                    "address": "0xa0e239b0abf4582366adaff486ee268c848c4409",
                    "title": "Lift-to-drag maximization for single airfoil at M = 0.63"
                    
                },
                {
                    "address": "0x851b7f3ab81bd8df354f0d7640efcd7288553419",
                    "title": "High Lift, Low Aspect Ratio Airfoil"
                },
                {
                    "address": "0x32be343b94f860124dc4fee278fdcbd38c102d88",
                    "title": "Low Reynolds Number Airfoil"
                }
                ]
            }

            var tournament = {}
            tournament[tournamentID] = tournamentContent

            return next(true, tournament);
        }
        else if(page == 1)
        {
            var tournamentContent = 
            {
                "title": "The Perfect Battery",
                "bounty": 3,
                "description": "(description of this tournament).",
                "submissions" :
                [
                {
                    "address": "0x2bde3b9c0129be4689e245ba689b9b0ae4ac666d",
                    "title": "Submission 4"
                    
                },
                {
                    "address": "0xb62ef4c58f3997424b0cceab28811633201706bc",
                    "title": "Submission 5"
                },
                {
                    "address": "0xa1a45e91164cdab8fa596809a9b24f8d4fdbe0f3",
                    "title": "Submission 6"
                }
                ]
            }

            var tournament = {}
            tournament[tournamentID] = tournamentContent

            return next(true, tournament);
        }
        else
        {
            var tournamentContent = 
            {
                "title": "The Perfect Battery",
                "bounty": 3,
                "description": "(description of this tournament).",
                "submissions" :
                [
                {
                    "address": "0xaf10cc6c50defff901b535691550d7af208939c5",
                    "title": "Submission 7"
                    
                },
                {
                    "address": "0xc78310231aa53bd3d0fea2f8c705c67730929d8f",
                    "title": "Submission 8"
                },
                {
                    "address": "0xf2b595c7327ef29b537e0981ef99d62257a73136",
                    "title": "Submission 9"
                }
                ]
            }

            var tournament = {}
            tournament[tournamentID] = tournamentContent

            return next(true, tournament);
        }
    }
    else
    {
        return next(false, "page null");
    }
    
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

    var tournament = req.body.tournament;
    var title = req.body.title;
    var references = req.body.references;
    var contributors = req.body.contributors;
    var submissionBody = req.body.submissionBody;

    var submission = 
    {
        "tournament": tournament,
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
