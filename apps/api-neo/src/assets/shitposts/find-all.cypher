MATCH (shit:Shitpost)
OPTIONAL MATCH (tag:Tag)<-[:IS_TAGGED]-(shit)-[:CREATED_BY]->(user:User)
RETURN {
shitpostId: shit.shitpostId,
text: shit.text,
sfw: shit.sfw,
isEnabled: shit.isEnabled,
createdBy: user,
tags: collect(tag)
}