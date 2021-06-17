INSERT INTO user_permissions
  ("user_email", "permission")
VALUES
  ('yolanda_brekk21@yahoo.com', 'delete'),
  ('yolanda_brekk21@yahoo.com', 'update'),
  ('prince68@gmail.com', 'update'),
  ('emilio_cassin86@hotmail.com', 'delete'),
  ('kailey.abshire@hotmail.com', 'update'),
  ('kailey.abshire@hotmail.com', 'delete'),
  ('lenna96@yahoo.com', 'delete')
;

INSERT INTO users
(
  "email",
  "admin",
  "subscription_ends"
)
VALUES
(
  'lenna96@yahoo.com',
  true,
  DATETIME('NOW', '+5 DAYS')
),
(
  'jordy.batz15@gmail.com',
  true,
  DATETIME('NOW', '+6 DAYS')
),
(
  'alaina.gleichner@hotmail.com',
  false,
  DATETIME('NOW', '+3 DAYS')
),
(
  'emilio_cassin86@hotmail.com',
  false,
  DATETIME('NOW', '+4 DAYS')
),
(
  'kailey.abshire@hotmail.com',
  false,
  DATETIME('NOW', '+2 DAYS')
),
(
  'yolanda_brekk21@yahoo.com',
  true,
  DATETIME('NOW', '-5 DAYS')
),
(
  'prince68@gmail.com',
  false,
  DATETIME('NOW', '+1 DAYS')
);

INSERT INTO firmware_versions
(
  "major",
  "minor",
  "patch"
)
VALUES
( 1, 0, 0 ),
( 1, 9, 0 ),
( 1, 10, 0 ),
( 2, 0, 0 ),
( 10, 0, 0 ),
( 10, 0, 1 )
;

INSERT INTO devices
(
  "name",
  "user_email",
  "firmware_version_id"
)
VALUES
(
  'PC',
  'lenna96@yahoo.com',
  1
),
(
  'Phone',
  'lenna96@yahoo.com',
  2
),
(
  'Tablet',
  'lenna96@yahoo.com',
  3
),
(
  'Television',
  'lenna96@yahoo.com',
  4
),
(
  'Watch',
  'lenna96@yahoo.com',
  5
),
(
  'Robot',
  'lenna96@yahoo.com',
  6
),

(
  'PC',
  'jordy.batz15@gmail.com',
  2
),
(
  'Phone',
  'jordy.batz15@gmail.com',
  3
),
(
  'Tablet',
  'jordy.batz15@gmail.com',
  4
),
(
  'Television',
  'jordy.batz15@gmail.com',
  5
),
(
  'Watch',
  'jordy.batz15@gmail.com',
  6
),
(
  'Robot',
  'jordy.batz15@gmail.com',
  1
),

(
  'PC',
  'alaina.gleichner@hotmail.com',
  3
),
(
  'Phone',
  'alaina.gleichner@hotmail.com',
  4
),
(
  'Tablet',
  'alaina.gleichner@hotmail.com',
  5
),
(
  'Television',
  'alaina.gleichner@hotmail.com',
  6
),
(
  'Watch',
  'alaina.gleichner@hotmail.com',
  1
),
(
  'Robot',
  'alaina.gleichner@hotmail.com',
  2
),

(
  'PC',
  'emilio_cassin86@hotmail.com',
  4
),
(
  'Phone',
  'emilio_cassin86@hotmail.com',
  5
),
(
  'Tablet',
  'emilio_cassin86@hotmail.com',
  6
),
(
  'Television',
  'emilio_cassin86@hotmail.com',
  1
),
(
  'Watch',
  'emilio_cassin86@hotmail.com',
  2
),
(
  'Robot',
  'emilio_cassin86@hotmail.com',
  3
),

(
  'PC',
  'kailey.abshire@hotmail.com',
  4
),
(
  'Phone',
  'kailey.abshire@hotmail.com',
  5
),
(
  'Tablet',
  'kailey.abshire@hotmail.com',
  6
),
(
  'Television',
  'kailey.abshire@hotmail.com',
  1
),
(
  'Watch',
  'kailey.abshire@hotmail.com',
  2
),
(
  'Robot',
  'kailey.abshire@hotmail.com',
  3
),

(
  'PC',
  'yolanda_brekk21@yahoo.com',
  5
),
(
  'Phone',
  'yolanda_brekk21@yahoo.com',
  6
),
(
  'Tablet',
  'yolanda_brekk21@yahoo.com',
  1
),
(
  'Television',
  'yolanda_brekk21@yahoo.com',
  2
),
(
  'Watch',
  'yolanda_brekk21@yahoo.com',
  3
),
(
  'Robot',
  'yolanda_brekk21@yahoo.com',
  4
),

(
  'PC',
  'prince68@gmail.com',
  6
),
(
  'Phone',
  'prince68@gmail.com',
  1
),
(
  'Tablet',
  'prince68@gmail.com',
  2
),
(
  'Television',
  'prince68@gmail.com',
  3
),
(
  'Watch',
  'prince68@gmail.com',
  4
),
(
  'Robot',
  'prince68@gmail.com',
  5
);

INSERT INTO updates
(
  "device_id",
  "finished"
)
VALUES
( 1, datetime('now', '-1 HOURS') ),
( 2, NULL ),
( 3, datetime('now', '-20 DAYS') ),
( 4, datetime('now', '-20 HOURS') ),
( 5, datetime('now', '-1 HOURS') ),
( 6, datetime('now', '-1 DAYS') ),
( 6, datetime('now', '-12 DAYS') ),

( 7, datetime('now', '-1 DAYS') ),
( 8, NULL),
( 9, datetime('now', '-1 DAYS') ),
( 10, datetime('now', '-2 DAYS') ),
( 11, datetime('now', '-2 DAYS') ),
( 12, datetime('now', '-1 DAYS') ),
( 12, datetime('now', '-10 HOURS') ),

( 13, datetime('now', '-12 HOURS') ),
( 14, datetime('now', '-1 DAYS') ),
( 15, datetime('now', '-2 DAYS') ),
( 16, datetime('now', '-1 DAYS') ),
( 17, datetime('now', '-12 HOURS') ),
( 18, datetime('now', '-1 DAYS') ),
( 18, datetime('now', '-10 DAYS') ),

( 19, datetime('now', '-12 DAYS') ),
( 20, datetime('now', '-1 DAYS') ),
( 21, datetime('now', '-20 HOURS') ),
( 22, datetime('now', '-1 DAYS') ),
( 23, datetime('now', '-1 DAYS') ),
( 24, datetime('now', '-1 DAYS') ),
( 24, NULL),

( 25, datetime('now', '-20 DAYS') ),
( 27, datetime('now', '-1 DAYS') ),
( 29, datetime('now', '-20 DAYS') ),
( 31, datetime('now', '-1 DAYS') ),
( 33, datetime('now', '-1 DAYS') ),
( 35, datetime('now', '-1 DAYS') )
;
