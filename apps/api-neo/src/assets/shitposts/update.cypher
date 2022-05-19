MATCH (shit:Shitpost)
WHERE shit.shitpostId= $1
SET shit.text = $2, shit.sfw = $3, shit.isEnabled = $3
// create a new relationship for each tag
WITH shit
UNWIND $4 AS id
MATCH (tag:Tag)
WHERE tag.tagId = id
MERGE (shit)-[:IS_TAGGED]->(tag)
RETURN shit