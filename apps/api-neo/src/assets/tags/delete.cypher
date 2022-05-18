MATCH (t:Tag {tagId: $1})
DETACH DELETE t