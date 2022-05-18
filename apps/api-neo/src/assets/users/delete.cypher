MATCH (u:User {userId: $1})
DETACH DELETE u