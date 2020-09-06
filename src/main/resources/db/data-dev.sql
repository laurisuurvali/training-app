INSERT INTO ROLE    (status,   name)
            VALUES  ('ACTIVE', 'ROLE_USER'),
                    ('ACTIVE', 'ROLE_ADMIN');
INSERT INTO APP_USER    (status,  first_name,   last_name,    username,              password)
            VALUES      ('ACTIVE',   'Stanislav', 'Ratsinski',   's.ratsinski@gmail.com',    '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Lauri',   'Suurväli',      'laurisuurvali@gmail.com',  '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'lenin@hotmail.com',       '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'boss@hotmail.com',         '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'mom@hotmail.com',         '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'dad@hotmail.com',         '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'Uncle@hotmail.com',    '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'Aunt@hotmail.com',    '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'Krishna@hotmail.com',  '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Leonard',   'Ratsinski',   'Hari@hotmail.com',         '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
                        ('ACTIVE',   'Margarita', 'Leonova',     'ma.l@hotmail.com',        '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK');

INSERT INTO SUBSCRIPTION    (start_date)
            VALUES          (TO_DATE('01/08/2020', 'DD/MM/YYYY')),
                            (TO_DATE('01/08/2020', 'DD/MM/YYYY'));

INSERT INTO CHALLENGE   (challenge_name,                week_quantity)
            VALUES      ('Initial Super Challenge',      8),
                        ('Second Amazing Challenge',     9);

INSERT INTO USER_ROLE   (USER_ID, ROLE_ID)
            VALUES      (1,       1),
                        (1,       2),
                        (2,       1),
                        (2,       2),
                        (3,       1),
                        (4,       1),
                        (5,       1),
                        (6,       1);

UPDATE SUBSCRIPTION SET challenge_challenge_id = 1 WHERE subscription_id = 1;
UPDATE SUBSCRIPTION SET challenge_challenge_id = 2 WHERE subscription_id = 2;
UPDATE APP_USER SET subscription_id = 1 WHERE user_id = 1;
UPDATE APP_USER SET subscription_id = 1 WHERE user_id = 2;
UPDATE APP_USER SET subscription_id = 2 WHERE user_id = 3;
UPDATE APP_USER SET subscription_id = 2 WHERE user_id = 4;
