INSERT INTO ROLE    (status,   name)
VALUES  ('ACTIVE', 'ROLE_USER'),
        ('ACTIVE', 'ROLE_ADMIN');

INSERT INTO APP_USER    (status,     first_name,   last_name,    username,              password)
VALUES      ('ACTIVE',   'Stanislav', 'Ratsinski',   's.ra@hotmail.com', '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
            ('ACTIVE',   'Leonard',   'Ratsinski',   'leo@hotmail.com',  '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK'),
            ('ACTIVE',    'Margarita', 'Leonova',    'ma.l@hotmail.com', '$2a$04$AM7ufAiabz8axmplAVXUI.95FpvD1o33zQMJmBKEkFkFr/Y/VbBHK');

INSERT INTO SUBSCRIPTION    (start_date)
VALUES          (TO_DATE('17/12/2015', 'DD/MM/YYYY')),
                (TO_DATE('17/02/2018', 'DD/MM/YYYY'));

INSERT INTO CHALLENGE   (challenge_name,                week_quantity)
VALUES      ('Initial Super Challenge',      8),
            ('Second Amazing Challenge',     9);

INSERT INTO USER_ROLE   (USER_ID, ROLE_ID)
VALUES      (1,       1),
            (1,       2),
            (2,       1),
            (3,       1);

INSERT INTO MEAL        (MEAL_NAME,      CALORIES)
VALUES      ('Soup',    200);

UPDATE SUBSCRIPTION SET challenge_challenge_id = 1 WHERE subscription_id = 1;
UPDATE SUBSCRIPTION SET challenge_challenge_id = 2 WHERE subscription_id = 2;
UPDATE APP_USER SET subscription_id = 1 WHERE user_id = 2;
UPDATE APP_USER SET subscription_id = 2 WHERE user_id = 3;