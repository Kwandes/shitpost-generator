// contraints
CREATE CONSTRAINT unique_user_email IF NOT EXISTS
FOR (u:User)
REQUIRE u.email IS UNIQUE;
CREATE CONSTRAINT unique_shitpost IF NOT EXISTS
FOR (shit:Shitpost)
REQUIRE shit.text IS UNIQUE;
CREATE CONSTRAINT unique_tag IF NOT EXISTS
FOR (tag:Tag)
REQUIRE tag.tag IS UNIQUE;
CREATE CONSTRAINT unique_name IF NOT EXISTS
FOR (name:Name)
REQUIRE name.name IS UNIQUE;
// actual data
MERGE (user:User {email: 'user@example.com', password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K', role: 'user', userId:'17631e48-c5de-432f-826e-a1461a2928ed'})
MERGE (admin:User {email: 'admin@example.com', password: '$2b$10$QItH8MlMrmcye0WB1n4SuuMyRAv2gR66C/qpzXAoeTgAI7Ew2dr0K', role: 'admin', userId: '238777fb-67ff-483f-96a9-24cd993ffb88'})
MERGE (scifi:Tag {tag: 'SciFi', sfw: false , tagId: 'fd4784a9-87a7-4d84-85eb-d0bdd4bb44c4'})
MERGE (religion:Tag {tag: 'Religion', sfw: false , tagId: 'd25353dc-8122-4290-ab44-3145359ebb6f'})
MERGE (games:Tag {tag: 'Games', sfw: false , tagId: '08000a57-3979-437e-9d99-789bb4042fcd'})
MERGE (anime:Tag {tag: 'Anime', sfw: false , tagId: 'd55f0c62-12b1-4bd1-8ce4-62e4a5bf6ced'})
MERGE (schoolLife:Tag {tag: 'SchoolLife', sfw: false , tagId: '77379b86-ce2e-4f40-a95e-2dde765ef884'})
MERGE (nerd:Tag {tag: 'Nerd', sfw: false , tagId: 'e3fb1e43-91d1-4766-812f-4cca4ef8d818'})
MERGE (ttrpg:Tag {tag: 'TTRPG', sfw: true , tagId: '10cb01b4-50d5-425a-b022-da2a5802f56b'})
MERGE (cursed:Tag {tag: 'Cursed', sfw: false , tagId:'d81cfb49-1885-46c8-be02-96859ea39485'})
MERGE (music:Tag {tag: 'Music', sfw: true , tagId:'676590c0-e871-4cd6-b2fb-73a216809059'})
MERGE (food:Tag {tag: 'Food', sfw: true , tagId: 'b7f8e213-f04b-4632-9459-f2a86f683760'})
MERGE (random:Tag {tag: 'Random', sfw: true , tagId: 'c831e05d-3c40-4647-bd36-bc34f57dd2b4'})
MERGE (harryPotter:Tag {tag: 'Harry Potter', sfw: true , tagId: 'c831e05d-3c40-4647-bd36-bc34f57dd2b4'})
MERGE (sha1:Shitpost {text: 'Twinks fuck up me. Cats consume me.', sfw: false , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha2:Shitpost {text: 'Just dont trust monsters.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha3:Shitpost {text: 'God i love eels. God i love eels so much I love eels because they destroy corn.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha4:Shitpost {text: 'What if you were at the grocery store AND then you started to think deeply about heterosexuality', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha5:Shitpost {text: 'I think its wrong to roll across the plains AND spread the good word about wolves.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha6:Shitpost {text: "I'm NOT a person. I'm a bunch of legos AND I flirt
WITH neurotypicals.", sfw: false , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha7:Shitpost {text: 'I am NOT a model I just manipulate poop emoji.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha8:Shitpost {text: 'I am NOT a model I just dream about transtrenders.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha9:Shitpost {text: 'It is NOT polite to pretend to care about flesh.', sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (sha10:Shitpost {text: "I only use the 'bleeding cowboys' font because I pray to the bog.", sfw: true , isEnabled: true , shitpostId: randomUUID()})
MERGE (n1:Name {name: 'Jasmine Gallagher', gender: 'feminine', isEnabled: true , nameId: randomUUID()})
MERGE (n2:Name {name: 'Megatron Owen (Meg)', gender: 'feminine', isEnabled: true , nameId: randomUUID()})
MERGE (n3:Name {name: 'Nadia Bowen', gender: 'feminine', isEnabled: true , nameId: randomUUID()})
MERGE (n4:Name {name: 'Lee Martinez', gender: 'androgynous', isEnabled: true , nameId: randomUUID()})
MERGE (n5:Name {name: 'Ader Titsoff', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n6:Name {name: 'Sir Cumference', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n7:Name {name: 'Harry Azcrac', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n8:Name {name: 'Kenny Dewitt', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n9:Name {name: 'Lou Sirr', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n10:Name {name: 'Lou Briccant', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n11:Name {name: 'Mary Juana', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n12:Name {name: 'Nick O’ Teen', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n13:Name {name: 'Sal Ami', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n14:Name {name: 'Sheeza Freak', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n15:Name {name: 'Bill Board', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n16:Name {name: 'Bud Light', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n17:Name {name: 'Cara Van', gender: 'meme', isEnabled: true , nameId: randomUUID()})
MERGE (n18:Name {name: 'Chris Cross', gender: 'masculine', isEnabled: true , nameId: randomUUID()})
// relationships
MERGE (sha2)-[:CREATED_BY]-(user)
MERGE (sha3)-[:CREATED_BY]-(user)
MERGE (sha4)-[:CREATED_BY]-(user)
MERGE (sha5)-[:CREATED_BY]-(user)
MERGE (sha7)-[:CREATED_BY]-(admin)
MERGE (sha8)-[:CREATED_BY]-(admin)
MERGE (sha9)-[:CREATED_BY]-(admin)
MERGE (religion)-[:CREATED_BY]-(user)
MERGE (anime)-[:CREATED_BY]-(user)
MERGE (schoolLife)-[:CREATED_BY]-(user)
MERGE (ttrpg)-[:CREATED_BY]-(admin)
MERGE (cursed)-[:CREATED_BY]-(admin)
MERGE (random)-[:CREATED_BY]-(admin)
MERGE (n2)-[:CREATED_BY]-(admin)
MERGE (n3)-[:CREATED_BY]-(user)
MERGE (n5)-[:CREATED_BY]-(user)
MERGE (n6)-[:CREATED_BY]-(user)
MERGE (n8)-[:CREATED_BY]-(user)
MERGE (n10)-[:CREATED_BY]-(admin)
MERGE (n12)-[:CREATED_BY]-(admin)
MERGE (n13)-[:CREATED_BY]-(admin)
MERGE (sha1)-[:IS_TAGGED]-(cursed)
MERGE (sha2)-[:IS_TAGGED]-(ttrpg)
MERGE (sha2)-[:IS_TAGGED]-(games)
MERGE (sha2)-[:IS_TAGGED]-(cursed)
MERGE (sha2)-[:IS_TAGGED]-(religion)
MERGE (sha2)-[:IS_TAGGED]-(scifi)
MERGE (sha3)-[:IS_TAGGED]-(cursed)
MERGE (sha3)-[:IS_TAGGED]-(religion)
MERGE (sha4)-[:IS_TAGGED]-(random)
MERGE (sha5)-[:IS_TAGGED]-(random)
MERGE (sha5)-[:IS_TAGGED]-(ttrpg)
MERGE (sha6)-[:IS_TAGGED]-(random)
MERGE (sha6)-[:IS_TAGGED]-(ttrpg)
MERGE (sha6)-[:IS_TAGGED]-(schoolLife)
MERGE (sha7)-[:IS_TAGGED]-(cursed)
MERGE (sha7)-[:IS_TAGGED]-(random)
MERGE (sha8)-[:IS_TAGGED]-(cursed)
MERGE (sha8)-[:IS_TAGGED]-(random)
MERGE (sha9)-[:IS_TAGGED]-(cursed)
MERGE (sha9)-[:IS_TAGGED]-(ttrpg)
MERGE (sha9)-[:IS_TAGGED]-(random)
MERGE (sha10)-[:IS_TAGGED]-(random)
MERGE (n1)-[:IS_TAGGED]-(ttrpg)
MERGE (n2)-[:IS_TAGGED]-(random)
MERGE (n3)-[:IS_TAGGED]-(ttrpg)
MERGE (n4)-[:IS_TAGGED]-(harryPotter)
MERGE (n5)-[:IS_TAGGED]-(cursed)
MERGE (n6)-[:IS_TAGGED]-(cursed)
MERGE (n7)-[:IS_TAGGED]-(cursed)
MERGE (n7)-[:IS_TAGGED]-(harryPotter)
MERGE (n8)-[:IS_TAGGED]-(cursed)
MERGE (n10)-[:IS_TAGGED]-(cursed)
MERGE (n11)-[:IS_TAGGED]-(cursed)
MERGE (n12)-[:IS_TAGGED]-(cursed)
MERGE (n13)-[:IS_TAGGED]-(cursed)
MERGE (n13)-[:IS_TAGGED]-(food)
MERGE (n14)-[:IS_TAGGED]-(cursed)
MERGE (n15)-[:IS_TAGGED]-(random)
MERGE (n16)-[:IS_TAGGED]-(random)
MERGE (n16)-[:IS_TAGGED]-(food)
MERGE (n17)-[:IS_TAGGED]-(random)
MERGE (n18)-[:IS_TAGGED]-(random)