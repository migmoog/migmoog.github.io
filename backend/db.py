from sqlmodel import SQLModel, create_engine, Session, select
from dotenv import load_dotenv
from models import Thumbnail
import os

if not os.getenv("DATABASE_URL"):
    raise ValueError("DATABASE_URL environment variable is required for PostgreSQL")

engine = create_engine(os.getenv("DATABASE_URL"), echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

def create_base_projects():
    """Initialize database with base project data from init.sql."""
    with Session(engine) as session:
        try:
            # Check if data already exists
            existing_count = len(session.exec(select(Thumbnail)).all())
            if existing_count > 0:
                print(f"Database already has {existing_count} thumbnails, skipping initialization.")
                return False
        except Exception as e:
            # Table might not exist yet, that's ok - we'll create data anyway
            print(f"Table doesn't exist yet or query failed: {e}")
        
        # Create all thumbnail data from init.sql
        thumbnails_data = [
            # Games you made (section = 0, default)
            Thumbnail(
                title="Sh*t Rainbows Piss Thunder",
                link="https://www.newgrounds.com/portal/view/848623",
                img_src="/game_thumbnails/SRPT.png",
                info="Made for the Pride Month Game Jam, with my friends in Team Max Hog.",
                section=0
            ),
            Thumbnail(
                title="Zoo Game",
                link="https://www.newgrounds.com/portal/view/832888",
                img_src="/game_thumbnails/zoo_game.png",
                info="Made over the course of a year for fun. It was the first project I released with my team as \"Team Max Hog\" with my friend Ryan.",
                section=0
            ),
            Thumbnail(
                title="Profile Picture Party",
                link="https://www.newgrounds.com/portal/view/846327",
                img_src="/game_thumbnails/pfp_party.png",
                info="A game I made for Newgrounds holiday \"Pico Day.\" It was a formative experience where I learned to work with another programmer and asset creators besides artists.",
                section=0
            ),
            Thumbnail(
                title="Snowb4ll Fight",
                link="https://migmoog.itch.io/snowb4ll",
                img_src="/game_thumbnails/santajam.png",
                info="Made for the Secret Santa Game Jam in 2020. The theme was to make a game for someone based on their wish letter, and I made a strategy game for a man to play with his. Took around a month.",
                section=0
            ),
            Thumbnail(
                title="The Glutton's Purge",
                link="https://www.newgrounds.com/portal/view/786630",
                img_src="/game_thumbnails/glutton.png",
                info="A fan game for \"The Glutton's Spray\" by Levi Ramirez. I played the original and wanted more levels, so I made more myself.",
                section=0
            ),
            Thumbnail(
                title="Holy Crap A Yeti",
                link="https://migmoog.itch.io/yeti",
                img_src="/game_thumbnails/yeti.png",
                info="A minigame I made for Newgrounds \"Tankmas 2021,\" a collaboration where artists, musicians, and game developers contributed to a digital advent calendar.",
                section=0
            ),
            Thumbnail(
                title="Porb Dressup",
                link="https://www.newgrounds.com/portal/view/847270",
                img_src="/game_thumbnails/porb_dressup.png",
                info="A silly game I made in 3 hours for my friend Facu. It also gave me an identity crisis.",
                section=0
            ),
            Thumbnail(
                title="Think Positive",
                link="https://migmoog.itch.io/ngadvent2020",
                img_src="/game_thumbnails/think_positive.png",
                info="My first game entry into Newgrounds. It's a simple \"avoid the enemies\" game, and taught me a lot about following deadlines.",
                section=0
            ),
            Thumbnail(
                title="Into The Web Of Swine",
                link="https://www.newgrounds.com/portal/view/853764",
                img_src="/game_thumbnails/swine.png",
                info="Made for the Newgrounds Mobile Game Jam 2022. Made in a week and a half.",
                section=0
            ),
            Thumbnail(
                title="Clock Baby Paint Adventure",
                link="https://www.newgrounds.com/portal/view/853963",
                img_src="/game_thumbnails/clock_baby.png",
                info="Made in a single night for the Newgrounds holiday \"Clock Day\" in 2022.",
                section=0
            ),
            Thumbnail(
                title="People Party",
                link="https://www.newgrounds.com/portal/view/855389",
                img_src="/game_thumbnails/people_party.png",
                info="Match-3 game made over the course of a week for a client.",
                section=0
            ),
            # Game art contributions (section = 1)
            Thumbnail(
                title="Sludge And Sorcery",
                link="https://www.newgrounds.com/portal/view/765632",
                img_src="/game_thumbnails/s_and_s.png",
                info="Made for GBJAM 2021, I did the tilework.",
                section=1
            ),
            Thumbnail(
                title="The Markus Polo Hostage Situation",
                link="https://www.newgrounds.com/portal/view/817234",
                img_src="/game_thumbnails/markus_polo.png",
                info="Made for the Ludum Dare game jam, helped with the writing and made every art asset.",
                section=1
            ),
        ]
        
        # Add all thumbnails to the session
        for thumbnail in thumbnails_data:
            session.add(thumbnail)
        
        # Commit all changes
        session.commit()
        print(f"Successfully initialized PostgreSQL database with {len(thumbnails_data)} thumbnails.")
        return True