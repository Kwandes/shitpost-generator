MATCH (user:User)
WHERE user.email= $1
RETURN user