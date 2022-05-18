MATCH (user:User)
WHERE user.userId= $1
RETURN user