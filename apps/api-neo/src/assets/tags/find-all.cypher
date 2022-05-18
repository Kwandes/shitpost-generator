MATCH (tag:Tag)
OPTIONAL MATCH (tag)-[:CREATED_BY]->(user:User)
RETURN {
tagId: tag.tagId,
tag: tag.tag,
sfw: tag.sfw,
createdBy: user
}