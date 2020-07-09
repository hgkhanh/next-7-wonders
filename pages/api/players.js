
const faunadb = require('faunadb')

// your secret hash
const secret = process.env.FAUNADB_SECRET_KEY
const q = faunadb.query
const client = new faunadb.Client({ secret })

export default async (req, res) => {
    try {
        const getQuery = await client.query(
            q.Map(
                // iterate each item in result
                q.Paginate(
                    // make paginatable
                    q.Match(
                        // query index
                        q.Index('all_players') // specify source
                    )
                ),
                ref => q.Get(ref) // lookup each result by its reference
            )
        )

        // GET means Only get the playerLists
        if (req.method === 'GET') {
            // ok
            res.status(200).json(getQuery.data)
        }
        // PUT means Update playerLists
        else if (req.method === 'PUT' && req.body && req.body.players) {
            // console.log('1');
            // await sleep(2000);
            // Get the ref of the player document (only one doc in the players collection)
            // console.log('start the PUT, but wait 5s');
            // setTimeout(async () => {
            const ref = getQuery.data[0].ref;

            // console.log('2');
            // console.log(ref);
            const putQuery = await client.query(
                q.Update(
                    ref,
                    {
                        data: {
                            players: req.body.players
                        }
                    }
                )
            )
            // ok
            res.status(200).json(putQuery.data)

            // }, 5000);
        }
    } catch (e) {
        // something went wrong
        res.status(500).json({ error: e.message })
    }
}