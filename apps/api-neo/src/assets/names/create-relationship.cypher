MATCH (name:Name)
WHERE name.name = $1
MATCH (user:User)
WHERE user.userId = $2
MERGE (name)-[:CREATED_BY]->(user)