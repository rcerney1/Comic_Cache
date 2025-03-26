from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    product_one = Product(
        owner_id=1, price=25, name='The Amazing Spider-Man',
        description = 'A classic comic featuring Spider-Man in one of his first adventures.',
        category=1)
    product_two = Product(
        owner_id=2, price=30, name='The Dark Knight Returns',
        description='A gritty Batman story from Frank Miller that redefined the character.',
        category=2)
    product_three = Product(
        owner_id=1, price=40, name='X-Men #1', 
        description='The first issue of X-Men, featuring the original team of mutants created by Stan Lee and Jack Kirby.',
        category=1)
    product_four = Product(
        owner_id=2, price=45, name='Watchmen #1', 
        description='The start of the groundbreaking series by Alan Moore and Dave Gibbons.',
        category=2)
    product_five = Product(
        owner_id=3, price=20, name='Superman #75', 
        description='The famous issue where Superman faces off against Doomsday in the Death of Superman storyline.',
        category=2)
    product_six = Product(
        owner_id=3, price=30, name='Iron Man #1', 
        description='The first solo issue featuring Iron Man, a Marvel Comics classic.',
        category=1)
    product_seven = Product(
        owner_id=1, price=50, name='Captain America Comics #1', 
        description='The historic first appearance of Captain America, where he punches Hitler on the cover.',
        category=1)
    product_eight = Product(
        owner_id=2, price=60, name='The Incredible Hulk #181', 
        description='The first full appearance of Wolverine, one of Marvel’s most popular characters.',
        category=1)
    product_nine = Product(
        owner_id=3, price=35, name='Fantastic Four #1', 
        description='The comic that launched Marvel’s first family of superheroes, created by Stan Lee and Jack Kirby.',
        category=1)
    product_ten = Product(
        owner_id=1, price=55, name='Detective Comics #27', 
        description='The debut of Batman, an iconic moment in comic book history.',
        category=2)
    product_eleven = Product(
        owner_id=2, price=25, name='The Flash #123', 
        description='The story that introduced the concept of the multiverse, with Jay Garrick and Barry Allen teaming up.',
        category=2)
    product_twelve = Product(
        owner_id=3, price=45, name='Green Lantern/Green Arrow #76', 
        description='A groundbreaking issue tackling social and political issues, written by Dennis O’Neil.',
        category=2)
    db.session.add_all([
        product_one, product_two, product_three, product_four, product_five, product_six,
        product_seven, product_eight, product_nine, product_ten, product_eleven, product_twelve
    ])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()