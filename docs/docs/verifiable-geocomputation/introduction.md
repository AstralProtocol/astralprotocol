# Spatial.sol 

Enabling Onchain Geospatial Computation on the EVM

## Overview

This proposal outlines a research and development project aimed at creating a comprehensive collection of spatial data structures and geospatial algorithms—collectively known as **Spatial.sol** — optimized for deployment on the Ethereum Virtual Machine (EVM). Our goal is to enable a new vertical of location-based decentralized applications (dapps) by providing developers with open-source, gas-efficient, and secure geospatial computational tools that operate directly onchain.

## Background

Astral has been at the forefront of building open-source decentralized geospatial tools and infrastructure for Web3. Our ongoing work includes:

- **Location Proof Protocol:** A user-controlled, composable, and verifiable framework for proving location.
- **Spatial Registries:** Described [here](https://ethereum-magicians.org/t/verifiable-spatial-data-registries/6688).
- **Spatial.sol (prototype)**

While these initiatives have validated the potential of onchain geospatial technologies, a critical missing piece remains: the ability to efficiently perform geospatial computations on the EVM. This module will fill that gap by developing spatial data structures and algorithms that empower developers to build location-based dapps with rich spatial functionalities. We intend to expand this work in the future by implementing verifiable geocomputation systems in cryptographic protocols, but this first phase focuses on a smart contract implementation.

## Objectives

The primary objectives of the Spatial.sol project are to:

1. **Design and Develop EVM-Optimized Spatial Data Structures:** Create representations for geographic primitives (points, lines, polygons, cells) that balance gas efficiency, precision, and compatibility with established geospatial standards (e.g., GeoJSON) and spatial reference systems (e.g., WGS84).
2. **Research and Implement Geospatial Algorithms:** Develop and optimize algorithms for measuring distance, calculating bearings, determining areas, testing topological relationships (e.g., point-in-polygon, intersection), and other common geospatial operations.
3. **Facilitate Onchain Geospatial Computations:** Provide robust, user-friendly libraries of geospatial tools that can be readily integrated to build location-based decentralized applications, including in Solidity, Python, and Typescript.
4. **Produce Comprehensive Documentation:** Generate docs, tutorials, examples, workshops and technical reports to ease the adoption and implementation of these tools by the developer community.

## Proposed Work and Methodology

### Phase 1: Spatial Data Structures (Milestone 01)

- **Review and Analysis:**  
  Conduct a systematic, ground-up review of existing spatial data structures and their limitations in the context of the EVM. Essentially, figure out an EVM-compatible alternative to [GeoJSON](https://geojson.org/) or [shapefile](https://en.wikipedia.org/wiki/Shapefile) formats.
- **Design:**  
  Develop new spatial data primitives optimized for smart contracts, including representations for:
  - **Locations (coordinates, cells)**
  - **Linestrings**
  - **Polygons**
  - **Raster data structures** such as grids and hex tiles
- **Implementation and Testing:**  
  Create a reference implementation in Solidity along with helper functions for encoding and decoding geospatial data (e.g., between GeoJSON and EVM-compatible formats).
- **Deliverables:**
  - An open-source technical report detailing design decisions, trade-offs, and recommendations.
  - A fully-documented, EVM-compatible alpha implementation of spatial data structures.
  - Helper libraries to facilitate integration into other projects.

### Phase 2: Geospatial Algorithm Development (Milestone 02)

- **Research Use Cases and Algorithms:**  
  Identify the most critical geospatial algorithms needed for onchain computations by engaging with potential application domains (e.g., supply chain, insurance, local currencies, regenerative finance). In essence, implement EVM-compatible translations of the most useful algorithms from [Turf.js](https://turfjs.org/) or [GDAL](https://gdal.org/).
- **Algorithm Design and Prioritization:**  
  Evaluate and prioritize algorithms based on utility, efficiency, and complexity. Note that many of these will be infeasible or impractical to implement onchain, but it's still useful to consider them for the sake of completeness. Candidates include:
  - **Measurement Algorithms:** Distance, bearing, area calculations.
  - **Transformations and Conversions:** Coordinate mutation, location conversion, unit conversion.
  - **Spatial Relationships:** Determining if points lie within a polygon, or identifying spatial intersections.
  - **Aggregation and Clustering:** Implementation of KMeans, DBSCAN, or similar clustering techniques.
  - **Spatial Indexing:** R-trees, quadtrees, or other spatial indexing structures.
  - **Spatial Analysis:** Spatial statistics, spatial interpolation, or other geospatial analysis techniques.
- **Implementation and Benchmarking:**  
  Develop implementations of these algorithms in Solidity, accompanied by comprehensive testing and gas consumption benchmarks.
- **Deliverables:**
  - A detailed research document outlining recommended algorithm designs and their prioritization.
  - An EVM-based library of geospatial algorithms with extensive documentation and test cases.
  - Performance benchmarks and security audits to ensure robust onchain performance.

## Expected Impact

By developing Spatial.sol, we aim to:

- **Work towards safeguarded AI:** By providing a suite of tools for onchain geospatial computation, we hope to progress towards "geofenced AI", as alluded to by [Tegmark and Omohundro (2023)](https://arxiv.org/abs/2309.01933) and [Dalrymple et al. (2024)](https://arxiv.org/abs/2405.06624).
- **Unlock New Use Cases:** Empower developers to build novel location-based dapps across various sectors, including logistics, urban planning, gaming, and more.
- **Enhance Developer Efficiency:** Provide a robust, well-documented suite of tools that reduces the time and complexity associated with implementing onchain geospatial computations.
- **Foster a Vibrant Ecosystem:** Offer open-source infrastructure and tooling that can be widely adopted, encouraging innovation in the decentralized geospatial space.
- **Promote User-Controlled Geospatial Data:** Facilitate the transition from centralized location-based services to decentralized, user-controlled alternatives that uphold privacy and security.

## Conclusion

The Spatial.sol project is designed to address a critical need in the decentralized ecosystem by enabling verifiable geospatial computation. By developing optimized spatial data structures and geospatial algorithms for the EVM, we will provide the necessary building blocks for a new generation of location-based services. We believe this work will not only fill an important technological gap but also stimulate innovation across multiple sectors that rely on location-based digital technologies.