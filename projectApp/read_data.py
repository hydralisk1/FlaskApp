from sqlalchemy.ext.automap import automap_base
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from db_engine import eng

def get_planet_data():
    engine = create_engine(eng)
    Base = automap_base()
    Base.prepare(engine, reflect = True)

    Planets = Base.classes.planets

    session = Session(engine)

    query = session.query(Planets.name, Planets.host_star, Planets.radius_e, Planets.temp_f, Planets.habit_code)
    data = []
    keys = ["name", "host_star", "radius_e", "temp_k", "habit_code"]

    for row in query:
        temp_dict = {}
        for (key, i) in zip(keys, range(len(row))):
            temp_dict[key] = row[i]
        
        data.append(temp_dict)

    return data