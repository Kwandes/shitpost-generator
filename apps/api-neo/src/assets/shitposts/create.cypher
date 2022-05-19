MERGE (shit:Shitpost {text: $1, sfw: $2, isEnabled: $3, shitpostId: randomUUID()})
WITH shit
UNWIND $4 AS id
MATCH (tag:Tag)
WHERE tag.tagId = id
CREATE (shit)-[:IS_TAGGED]->(tag)
RETURN shit