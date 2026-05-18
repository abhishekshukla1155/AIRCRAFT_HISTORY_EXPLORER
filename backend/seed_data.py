import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from aircraft.models import Aircraft, Era
from recommendation.models import Recommendation

def seed():
    print("Clearing old data...")
    Recommendation.objects.all().delete()
    Aircraft.objects.all().delete()
    Era.objects.all().delete()
    User.objects.filter(username='admin').delete()

    print("Creating superuser...")
    User.objects.create_superuser('admin', 'admin@example.com', 'admin')

    print("Creating eras...")
    ww2 = Era.objects.create(title="World War II", start_year=1939, end_year=1945, description="The Second World War.")
    cold_war = Era.objects.create(title="Cold War", start_year=1947, end_year=1991, description="Period of geopolitical tension between US and Soviet Union.")
    modern = Era.objects.create(title="Modern Era", start_year=1991, end_year=None, description="Post-Cold War modern aviation.")

    print("Creating aircraft...")
    f22 = Aircraft.objects.create(
        name="F-22 Raptor",
        manufacturer="Lockheed Martin",
        country="United States",
        first_flight=date(1997, 9, 7),
        speed="Mach 2.25",
        range="1,839 nmi",
        crew=1,
        role="Air superiority fighter",
        weapons="AIM-120 AMRAAM, AIM-9 Sidewinder, JDAM",
        engine_type="2x Pratt & Whitney F119-PW-100 turbofans",
        generation="5th Generation",
        war_usage="Syrian Civil War",
        description="The F-22 Raptor is a fifth-generation, single-seat, twin-engine, all-weather stealth tactical fighter aircraft."
    )
    f22.eras.add(modern)

    f14 = Aircraft.objects.create(
        name="F-14 Tomcat",
        manufacturer="Grumman",
        country="United States",
        first_flight=date(1970, 12, 21),
        speed="Mach 2.34",
        range="1,600 nmi",
        crew=2,
        role="Interceptor, air superiority fighter",
        weapons="AIM-54 Phoenix, AIM-7 Sparrow, AIM-9 Sidewinder",
        engine_type="2x General Electric F110-GE-400 afterburning turbofans",
        generation="4th Generation",
        war_usage="Vietnam War (evacuation), Operation Desert Storm",
        description="The F-14 Tomcat is an American supersonic, twin-engine, two-seat, twin-tail, variable-sweep wing fighter aircraft."
    )
    f14.eras.add(cold_war)

    sr71 = Aircraft.objects.create(
        name="SR-71 Blackbird",
        manufacturer="Lockheed Corporation",
        country="United States",
        first_flight=date(1964, 12, 22),
        speed="Mach 3.3",
        range="2,900 nmi",
        crew=2,
        role="Strategic reconnaissance",
        weapons="None",
        engine_type="2x Pratt & Whitney J58 continuous-bleed afterburning turbojets",
        generation="3rd Generation",
        war_usage="Vietnam War, Cold War reconnaissance",
        description="The Lockheed SR-71 Blackbird is a long-range, high-altitude, Mach 3+ strategic reconnaissance aircraft."
    )
    sr71.eras.add(cold_war)

    spitfire = Aircraft.objects.create(
        name="Supermarine Spitfire",
        manufacturer="Supermarine",
        country="United Kingdom",
        first_flight=date(1936, 3, 5),
        speed="362 mph",
        range="470 miles",
        crew=1,
        role="Fighter",
        weapons="8x .303 in Browning Mk II machine guns",
        engine_type="Rolls-Royce Merlin liquid-cooled V12",
        generation="Propeller Era",
        war_usage="World War II",
        description="The Supermarine Spitfire is a British single-seat fighter aircraft that was used by the Royal Air Force and other Allied countries before, during, and after World War II."
    )
    spitfire.eras.add(ww2)

    su57 = Aircraft.objects.create(
        name="Sukhoi Su-57",
        manufacturer="Sukhoi",
        country="Russia",
        first_flight=date(2010, 1, 29),
        speed="Mach 2",
        range="1,900 nmi",
        crew=1,
        role="Multirole fighter",
        weapons="R-77, R-74, Kh-38, guided bombs",
        engine_type="2x Saturn AL-41F1 afterburning turbofans",
        generation="5th Generation",
        war_usage="Syrian Civil War, Russo-Ukrainian War",
        description="The Sukhoi Su-57 is a twin-engine stealth multirole fighter aircraft developed by Sukhoi."
    )
    su57.eras.add(modern)

    concorde = Aircraft.objects.create(
        name="Concorde",
        manufacturer="Aérospatiale / BAC",
        country="France / United Kingdom",
        first_flight=date(1969, 3, 2),
        speed="Mach 2.04",
        range="3,900 nmi",
        crew=3,
        role="Supersonic airliner",
        weapons="None",
        engine_type="4x Rolls-Royce/Snecma Olympus 593 Mk 610 turbojets with reheat",
        generation="Supersonic Transport",
        war_usage="None",
        description="The Concorde is a Franco-British supersonic passenger airliner that operated from 1976 until 2003."
    )
    concorde.eras.add(cold_war, modern)

    b747 = Aircraft.objects.create(
        name="Boeing 747",
        manufacturer="Boeing Commercial Airplanes",
        country="United States",
        first_flight=date(1969, 2, 9),
        speed="Mach 0.85",
        range="7,790 nmi (747-8)",
        crew=2,
        role="Wide-body airliner",
        weapons="None",
        engine_type="4x Turbofans (P&W, GE, or Rolls-Royce)",
        generation="Jet Age",
        war_usage="None",
        description="The Boeing 747 is a large, long-range wide-body airliner manufactured by Boeing Commercial Airplanes in the United States."
    )
    b747.eras.add(cold_war, modern)

    wright = Aircraft.objects.create(
        name="Wright Flyer",
        manufacturer="Wright brothers",
        country="United States",
        first_flight=date(1903, 12, 17),
        speed="30 mph",
        range="Unknown",
        crew=1,
        role="Experimental",
        weapons="None",
        engine_type="Straight-4 water-cooled, 12 hp",
        generation="Pioneer Era",
        war_usage="None",
        description="The Wright Flyer was the first successful heavier-than-air powered aircraft, designed and built by the Wright brothers."
    )

    print("Creating recommendations...")
    Recommendation.objects.create(aircraft=f22, recommended_aircraft=su57, reason="Both are 5th-generation stealth fighters.", score=0.9)
    Recommendation.objects.create(aircraft=su57, recommended_aircraft=f22, reason="Both are 5th-generation stealth fighters.", score=0.9)
    Recommendation.objects.create(aircraft=concorde, recommended_aircraft=b747, reason="Both are iconic passenger airliners from the same era.", score=0.7)

    print("Seed complete!")

if __name__ == '__main__':
    seed()
