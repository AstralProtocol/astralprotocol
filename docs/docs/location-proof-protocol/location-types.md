# Location Types

## v0.1

To ensure location proofs are as versatile as possible, we are giving users / developers the option of creating proofs that adhere to any
location type.

This requires creating a standardized set of categories for "location types" that include various ways of representing locations such as
different coordinate systems, H3 strings, geohashes, and more. The purpose of this is to ensure interoperability and clarity in geospatial
data management, while still offering flexibility for different proof types.

:::tip Alpha Locations

**Initially, location proofs will use WGS84 decimal degree coordinates, ordered as `[longitude, latitude]`.**

These coordinate pairs will be formatted as strings, converted to bytes for storage onchain. The working `locationType` will be set to
`DecimalDegrees<string>`.

:::

If you would like to develop proofs that use an alternative location encoding (like those listed below), reach out on
[Telegram](https://t.me/+UkTOSXnDcDM5ZTBk).

### Future Categories of Location Types

1. **Geographic Coordinates (Lat/Long)**
   - **Decimal Degrees**: Standard longitude and latitude (e.g., `[-122.4194, 37.7749]`).
   - **Degrees, Minutes, Seconds (DMS)**: Latitude and longitude in degrees, minutes, and seconds (e.g., `37°46'30" N, 122°25'10" W`).
2. **Projected Coordinates**
   - **Universal Transverse Mercator (UTM)**: Uses a series of zones for global coverage (e.g., `10S 551000 4182000`).
   - **State Plane Coordinate System (SPCS)**: Used in the United States (e.g., `X: 2000000, Y: 500000` in a specific state plane zone).
3. **Geohashes**
   - **Geohash**: A hierarchical spatial data structure which subdivides space into buckets of grid shape (e.g., `9q8yyz`).
4. **H3 Hexagons**
   - **H3**: A hierarchical hexagonal grid system used for spatial indexing (e.g., `85283473fffffff`).
5. **Plus Codes**
   - **Open Location Code (OLC)**: Developed by Google, it's a code that represents an area anywhere on Earth (e.g., `7FG8V4VC+G7`).
6. **Grid References**
   - **Military Grid Reference System (MGRS)**: Used by NATO militaries for locating points on the Earth (e.g., `33TWN8382558454`).
   - **British National Grid (OSGB)**: Used in Great Britain (e.g., `TQ 298828`).
7. **Place Names / Addresses**
   - **Postal Address**: Standard mailing address (e.g., `1600 Amphitheatre Parkway, Mountain View, CA`).
   - **Named Locations**: Known place names (e.g., `Eiffel Tower`).
8. **What3Words References**
   - **W3W**: A geocoding system that encodes geographic coordinates into three dictionary words (e.g., ///filled.count.soap).

Formal specification of the location types and how they are represented is in development, and will be documented here.

### Diverse Spatial Reference Systems

Location proofs may not always relate to Earth-based coordinates but could be relative to other objects or within different spatial
reference systems, such as:

- Being with a person at a particular time
- Location in a metaverse space
- Presence in a vehicle or a specific room

Astral's Location Proof Protocol aims to support location proofs within a wide range of different spatial reference systems, both global and
relative. However, initial development of the protocol will focus on positioning objects / events on Earth.
