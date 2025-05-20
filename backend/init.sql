-- initialize table
CREATE TABLE IF NOT EXISTS 'thumbnails' (
    'title' TEXT NOT NULL,
    'link' TEXT NOT NULL,
    'img_source' TEXT NOT NULL,
    'info' TEXT
);

-- all the examples
INSERT INTO 'thumbnails' ('title', 'link', 'img_source', 'info') VALUES
('Sh*t Rainbows Piss Thunder', 'https://www.newgrounds.com/portal/view/848623', '/game_thumbnails/SRPT.png', 'Made for the Pride Month Game Jam, with my friends in Team Max Hog.'),
('Zoo Game', 'https://www.newgrounds.com/portal/view/832888', '/game_thumbnails/zoo_game.png', 'Made over the course of a year for fun. It was the first project I released with my team as "Team Max Hog" with my friend Ryan.'),
('Profile Picture Party', 'https://www.newgrounds.com/portal/view/846327', '/game_thumbnails/pfp_party.png', 'A game I made for Newgrounds holiday "Pico Day." It was a formative experience where I learned to work with another programmer and asset creators besides artists.'),
('Snowb4ll Fight', 'https://migmoog.itch.io/snowb4ll', '/game_thumbnails/santajam.png', 'Made for the Secret Santa Game Jam in 2020. The theme was to make a game for someone based on their wish letter, and I made a strategy game for a man to play with his. Took around a month.'),
('The Glutton''s Purge', 'https://www.newgrounds.com/portal/view/786630', '/game_thumbnails/glutton.png', 'A fan game for "The Glutton''s Spray" by Levi Ramirez. I played the original and wanted more levels, so I made more myself.'),
('Holy Crap A Yeti', 'https://migmoog.itch.io/yeti', '/game_thumbnails/yeti.png', 'A minigame I made for Newgrounds "Tankmas 2021," a collaboration where artists, musicians, and game developers contributed to a digital advent calendar.'),
('Porb Dressup', 'https://www.newgrounds.com/portal/view/847270', '/game_thumbnails/porb_dressup.png', 'A silly game I made in 3 hours for my friend Facu. It also gave me an identity crisis.'),
('Think Positive', 'https://migmoog.itch.io/ngadvent2020', '/game_thumbnails/think_positive.png', 'My first game entry into Newgrounds. It''s a simple "avoid the enemies" game, and taught me a lot about following deadlines.'),
('Into The Web Of Swine', 'https://www.newgrounds.com/portal/view/853764', '/game_thumbnails/swine.png', 'Made for the Newgrounds Mobile Game Jam 2022. Made in a week and a half.'),
('Clock Baby Paint Adventure', 'https://www.newgrounds.com/portal/view/853963', '/game_thumbnails/clock_baby.png', 'Made in a single night for the Newgrounds holiday "Clock Day" in 2022.'),
('People Party', 'https://www.newgrounds.com/portal/view/855389', '/game_thumbnails/people_party.png', 'Match-3 game made over the course of a week for a client.');