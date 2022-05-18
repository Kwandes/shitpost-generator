// contraints
CREATE CONSTRAINT unique_user_email IF NOT EXISTS
FOR (u:User)
REQUIRE (u.email, u.userId) IS UNIQUE;
// actual data
MERGE (admin:User {email: 'admin@example.com', password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K', role: 'admin', userId: '17631e48-c5de-432f-826e-a1461a2928ed'})
MERGE (user:User {email: 'user@example.com', password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K', role: 'user', userId:'238777fb-67ff-483f-96a9-24cd993ffb88'})
MERGE (cursed:Tag {tag: 'Cursed', sfw: false , tagId: randomUUID()})
MERGE (random:Tag {tag: 'Random', sfw: true , tagId: randomUUID()})
MERGE (ttrpg:Tag {tag: 'TTRPG', sfw: true , tagId: randomUUID()})
MERGE (shA:Shitpost {text: 'Test Shitpost A', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (shB:Shitpost {text: 'Test Shitpost B', sfw: false , isEnabled: true , shitpostId: randomUUID()})
MERGE (shC:Shitpost {text: 'Test Shitpost C', sfw: true , isEnabled: false , shitpostId: randomUUID()})
// relationships
MERGE (shA)-[:CREATED_BY]-(admin)
MERGE (shB)-[:CREATED_BY]-(admin)
MERGE (shC)-[:CREATED_BY]-(user)
MERGE (cursed)-[:CREATED_BY]-(admin)
MERGE (random)-[:CREATED_BY]-(admin)
MERGE (ttrpg)-[:CREATED_BY]-(user)
MERGE (shA)-[:IS_TAGGED]-(cursed)
MERGE (shA)-[:IS_TAGGED]-(random)
MERGE (shB)-[:IS_TAGGED]-(cursed)
MERGE (shC)-[:IS_TAGGED]-(ttrpg)