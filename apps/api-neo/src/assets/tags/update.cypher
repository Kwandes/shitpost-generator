MATCH (tag:Tag)
WHERE tag.tagId= $1
SET tag.tag = $2, tag.sfw = $3
RETURN tag