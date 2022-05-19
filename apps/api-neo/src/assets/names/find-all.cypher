MATCH (name:Name)
OPTIONAL MATCH (tag:Tag)<-[:IS_TAGGED]-(name)-[:CREATED_BY]->(user:User)
RETURN {
nameId: name.nameId,
name: name.name,
gender: name.gender,
isEnabled: name.isEnabled,
createdBy: user,
tags: collect(tag)
}