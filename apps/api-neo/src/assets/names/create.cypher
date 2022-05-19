MERGE (name:Name {name: $1, gender: $2, isEnabled: $3, nameId: randomUUID()})
WITH name
UNWIND $4 AS id
MATCH (tag:Tag)
WHERE tag.tagId = id
CREATE (name)-[:IS_TAGGED]->(tag)
RETURN name