MATCH (user:User)
WHERE user.userId= $1
SET user.email = $2, user.password = $3, user.role=$4
RETURN user