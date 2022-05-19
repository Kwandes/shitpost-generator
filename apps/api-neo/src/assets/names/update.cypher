MATCH (name:Name)
WHERE name.nameId= $1
SET name.name = $2, name.isEnabled = $3, name.gender = $4
// create a new relationship for each tag
WITH name
UNWIND $5 AS id
MATCH (tag:Tag)
WHERE tag.tagId = id
MERGE (name)-[:IS_TAGGED]->(tag)
RETURN name