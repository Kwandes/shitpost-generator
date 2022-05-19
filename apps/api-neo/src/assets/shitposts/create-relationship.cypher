MATCH (shit:Shitpost)
WHERE shit.text = $1
MATCH (user:User)
WHERE user.userId = $2
MERGE (shit)-[:CREATED_BY]->(user)