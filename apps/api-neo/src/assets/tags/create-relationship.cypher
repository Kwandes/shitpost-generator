MATCH (tag:Tag)
WHERE tag.tag = $1
MATCH (user:User)
WHERE user.userId = $2
MERGE (tag)-[:CREATED_BY]->(user)